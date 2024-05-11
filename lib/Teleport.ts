import { defineComponent, CreateComponentPublicInstance } from 'vue';

type BaseData = {
    comment: Comment;
};

type TeleportInstance = CreateComponentPublicInstance<unknown, unknown, BaseData>;

const getComponentChildrenNode = (context: TeleportInstance): HTMLElement[] => {
    // @ts-expect-error must has children
    return context!.$vnode!.componentOptions!.children.map((i) => i.elm).filter((i) => i);
};

const getFragment = (context: TeleportInstance): DocumentFragment => {
    // Using a fragment is faster because it'll trigger only a single reflow
    // See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    // Inspire by https://github.com/Mechazawa/vue2-teleport
    const fragment = document.createDocumentFragment();
    getComponentChildrenNode(context).forEach((node) => fragment.appendChild(node));
    return fragment;
};

const Teleport = defineComponent({
    name: 'Teleport',
    abstract: true,
    props: {
        to: [String, HTMLElement],
        disabled: Boolean,
    },
    directives: {
        fragments: {
            inserted: function (el, binding, vnode) {
                // Inspire by https://stackoverflow.com/questions/47511674/a-way-to-render-multiple-root-elements-on-vuejs-with-v-for-directive
                const componentInstance = vnode.context as unknown as TeleportInstance;
                if (!componentInstance) return;
                getFragment(componentInstance);
                const parent = el.parentElement;
                // TODO Should resolve direct parent is fragment node.
                parent && parent.replaceChild(componentInstance.comment, el);
            },
        },
    },
    data() {
        const base = {
            comment: document.createComment('Teleport'),
        } as BaseData;
        return Object.preventExtensions(base);
    },
    mounted() {
        this.check();
    },
    updated() {
        this.check();
    },
    beforeUnmount() {
        getFragment(this);
    },
    render(h) {
        return h('span', { directives: [{ name: 'fragments' }] }, this.$slots.default);
    },
    methods: {
        check() {
            this.disabled ? this.revert() : this.transfer();
        },
        revert() {
            // Insert slot children before comment node
            this.comment.parentNode?.insertBefore(getFragment(this), this.comment);
        },
        transfer() {
            const targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to;
            if (!targetEl) return;
            targetEl.appendChild(getFragment(this));
        },
    },
});

export default Teleport;