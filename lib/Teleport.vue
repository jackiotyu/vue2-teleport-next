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
            inserted: function (el, binding, vnode) {
                const componentInstance = vnode.context as any;
                componentInstance.getFragment();
                let parent = el.parentElement;
                // TODO 处理上一级是teleport的情况
                // parent && parent.attributes[fragmentAttr]s
                parent && parent.replaceChild(componentInstance.comment, el);
            },
        },
    },
    data() {
        const base = {
            comment: document.createComment(fragmentAttr),
        } as {
            comment: Comment;
        };
        return Object.preventExtensions(base);
    },
    mounted() {
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
            // 把注释节点转为实际子节点
            this.comment.parentNode?.insertBefore(this.getFragment(), this.comment);
        },
        transfer() {
            let targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to;
            if (!targetEl) return;
            targetEl.appendChild(this.getFragment());
        },
        // @ts-ignore
        getParentRoot(): HTMLElement {
            let parentNode = this.comment.parentNode;
            // @ts-ignore
            while (parentNode && parentNode.attributes[fragmentAttr]) {
                parentNode = parentNode.parentNode;
            }
            // @ts-ignore
            return parentNode || document.body as HTMLElement;
        },
    },
});
</script>
