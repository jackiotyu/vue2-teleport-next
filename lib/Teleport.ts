import { defineComponent, CreateComponentPublicInstance } from 'vue';
type ChildNode = CreateComponentPublicInstance<unknown, unknown> & {
    com?: Vue.VNode[];
    multiSlot: boolean;
    setCom(slots: unknown, multiSlot: unknown): void;
};
type BaseData = {
    child: ChildNode;
    isV2TPN: true;
};

const tag = 'Teleport';

const removeNode = (el: Node) => {
    const parentNode = el.parentNode;
    parentNode && parentNode.removeChild(el);
}

const Teleport = defineComponent({
    name: tag,
    abstract: true,
    props: {
        to: [String, HTMLElement],
        disabled: Boolean,
        /**
         * When set to `true`, it will receive all slot content, but an additional node will be added in the outer.
         * When set to `false`, no additional outer layer node will be added, but only the content of the first slot will be rendered.
         * The default is `false`.
         */
        multiSlot: Boolean,
    },
    data() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        const child: ChildNode = new (this.$root.constructor as Vue.VueConstructor)({
            name: 'TeleportChild',
            // @ts-expect-error parent
            parent: this,
            data() {
                return {
                    com: context.$slots.default,
                    multiSlot: context.multiSlot,
                };
            },
            methods: {
                setCom(
                    slots: Vue.VNode[] | undefined,
                    multiSlot: boolean | undefined,
                ) {
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
        const base = { child, isV2TPN: true } as BaseData;
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
        this.child.$destroy();
        removeNode(this.child.$el)
    },
    render() {
        this.child.setCom(this.$slots.default || [], this.multiSlot);
        return null;
    },
    methods: {
        check() {
            removeNode(this.child.$el)
            if (this.disabled) {
                const parentNode = this.$el.parentNode;
                parentNode && parentNode.insertBefore(this.child.$el, this.$el);
            } else {
                const targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to;
                targetEl && targetEl.appendChild(this.child.$el);
            }
        },
    },
});

export default Teleport;
