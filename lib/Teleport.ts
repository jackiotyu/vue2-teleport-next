import { defineComponent, CreateComponentPublicInstance } from 'vue';
type ChildNode = CreateComponentPublicInstance<unknown, unknown> & {
    com?: Vue.VNode[];
    to: unknown;
    disabled: unknown;
    multiSlot: boolean;
    setCom(slots: unknown, to: unknown, disabled: unknown, multiSlot: unknown): void;
};
type BaseData = {
    child: ChildNode;
    isV2TPN: true;
};

const tag = 'Teleport';

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
                    to: context.to,
                    disabled: context.disabled,
                    multiSlot: context.multiSlot,
                };
            },
            methods: {
                setCom(
                    slots: Vue.VNode[] | undefined,
                    to: string | HTMLElement | undefined,
                    disabled: boolean | undefined,
                    multiSlot: boolean | undefined,
                ) {
                    // eslint-disable-next-line vue/no-mutating-props
                    this.to = to;
                    // eslint-disable-next-line vue/no-mutating-props
                    this.disabled = disabled;
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
        to() {
            this.check();
        },
        disabled() {
            this.check();
        },
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
        this.child.$el.parentNode?.removeChild(this.child.$el);
    },
    render() {
        this.child.setCom(this.$slots.default || [], this.to, this.disabled, this.multiSlot);
        return null;
    },
    methods: {
        check() {
            this.child.$el.parentNode?.removeChild(this.child.$el);
            if (this.disabled) {
                this.$el.parentNode?.insertBefore(this.child.$el, this.$el);
            } else {
                const targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to;
                targetEl && targetEl.appendChild(this.child.$el);
            }
        },
    },
});

export default Teleport;
