<script lang="ts">
import { defineComponent } from 'vue';
export const fragmentAttr = 'data-v2tp-fg' as const;

export default defineComponent({
    name: 'Teleport',
    abstract: true,
    props: {
        to: [String, HTMLElement],
        disabled: Boolean,
    },
    directives: {
        fragments: {
            inserted: function (el) {
                const children = Array.from(el.children);
                const parent = el.parentElement;
                children.forEach((item) => {
                    parent && parent.appendChild(item);
                });
                parent && parent.removeChild(el);
            },
        },
    },
    data() {
        const base = {
            parentRoot: null,
        } as { parentRoot: HTMLElement | null };
        return Object.preventExtensions(base) ;
    },
    mounted() {
        this.getParentRoot();
        this.handleCheck();
    },
    updated() {
        this.handleCheck();
    },
    beforeUnmount() {
        this.getFragment();
    },
    render(h) {
        return h('span', { directives: [{ name: 'fragments' }], attrs: { [fragmentAttr]: true } }, this.$slots.default);
    },
    methods: {
        // @ts-ignore
        getComponentChildrenNode(): HTMLElement[] {
            // @ts-ignore
            return this.$vnode.componentOptions.children.map((i) => i.elm).filter((i) => i);
        },
        getFragment() {
            // Using a fragment is faster because it'll trigger only a single reflow
            // See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
            // Inspire by https://github.com/Mechazawa/vue2-teleport
            const fragment = document.createDocumentFragment();
            this.getComponentChildrenNode().forEach((node) => fragment.appendChild(node));
            return fragment;
        },
        handleCheck() {
            this.disabled ? this.revert() : this.transfer();
        },
        revert() {
            if (!this.parentRoot) return;
            this.parentRoot.appendChild(this.getFragment());
        },
        transfer() {
            let targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to;
            if (!targetEl) return;
            targetEl.appendChild(this.getFragment());
        },
        // @ts-ignore
        getParentRoot(): HTMLElement {
            let parent = this.$parent;
            // @ts-ignore
            while (parent && parent.$el && parent.$el.attributes[fragmentAttr]) {
                parent = parent.$parent;
            }
            // @ts-ignore
            this.parentRoot = parent.$el || document.body as HTMLElement;
        },
    },
});
</script>
