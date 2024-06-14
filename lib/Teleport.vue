<script lang="ts">
import { CreateComponentPublicInstance, VNode, VueConstructor } from 'vue';
type ChildNode = CreateComponentPublicInstance<unknown, unknown> & {
    com?: VNode[];
    multiSlot: boolean;
    setCom(slots: unknown, multiSlot: unknown): void;
};
type BaseData = {
    child: ChildNode;
};
const tag = 'teleport';
const removeNode = (el: Node) => {
    const parentNode = el && el.parentNode;
    parentNode && parentNode.removeChild(el);
};
export default {
    name: tag,
    abstract: true,
    props: {
        to: {
            type: [String, HTMLElement],
            required: true,
        },
        disabled: Boolean,
        /**
         * When set to `true`, it will receive all slot content, but an additional node will be added in the outer.
         * When set to `false`, no additional outer layer node will be added, but only the content of the first slot will be rendered.
         * The default is `false`.
         */
        multiSlot: Boolean,
    },
    data() {
        const child: ChildNode = new (this.constructor as VueConstructor)({
            name: tag + '-inner',
            // @ts-expect-error parent
            parent: this.$parent,
            abstract: true,
            data: () => {
                return {
                    com: this.$slots.default,
                    multiSlot: this.multiSlot,
                };
            },
            methods: {
                setCom(slots: VNode[] | undefined, multiSlot: boolean | undefined) {
                    // eslint-disable-next-line vue/no-mutating-props
                    this.multiSlot = multiSlot;
                    this.com = slots;
                },
            },
            render(h) {
                // TODO Need to remove root
                if (this.multiSlot) return h('div', this.com);
                return this.com[0];
            },
        });
        const base = { child } as BaseData;
        return Object.preventExtensions(base);
    },
    watch: {
        to: 'check',
        disabled: 'check',
    },
    mounted() {
        this.$el.textContent = tag;
        this.$nextTick(() => {
            this.child.$mount();
            this.check();
        });
    },
    beforeDestroy() {
        removeNode(this.child.$el);
        this.child.$destroy();
    },
    render() {
        // fix order after siblings change.
        if (this.disabled && (this.$el || {}).previousSibling !== this.child.$el) this.check();
        this.child.setCom(this.$slots.default || [], this.multiSlot);
        return null;
    },
    methods: {
        check() {
            const rootEl = this.$el;
            const childEl = this.child.$el;
            if (!rootEl || !childEl) return;
            removeNode(childEl);
            if (this.disabled) {
                const parentNode = rootEl && rootEl.parentNode;
                parentNode && parentNode.insertBefore(childEl, rootEl);
            } else {
                const targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to;
                targetEl && targetEl.appendChild(childEl);
            }
        },
    },
};
</script>
