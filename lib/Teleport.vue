<script lang="ts">
import { CreateComponentPublicInstance, VNode, VueConstructor } from 'vue';
type ChildNode = CreateComponentPublicInstance<unknown, unknown> & {
    com?: VNode[];
    multiSlot: boolean;
    setCom(slots: unknown, multiSlot: unknown): void;
};
type BaseData = {
    child: ChildNode;
    end: Comment,
};
const tag = 'teleport';
const removeNode = (el: Node) => {
    const parentNode = el.parentNode;
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
        const child: ChildNode = new (this.$root.constructor as VueConstructor)({
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
        const end = document.createComment(tag + ' end');
        const base = { child, end } as BaseData;
        return Object.preventExtensions(base);
    },
    watch: {
        to: 'check',
        disabled: 'check',
    },
    mounted() {
        let parentNode = this.$el.parentNode;
        parentNode && parentNode.insertBefore(this.end, this.$el.nextSibling);
        this.$el.textContent = tag + ' start';
        this.$nextTick(() => {
            this.child.$mount();
            this.check();
        });
    },
    beforeDestroy() {
        removeNode(this.child.$el);
        removeNode(this.end);
        this.child.$destroy();
    },
    render() {
        this.child.setCom(this.$slots.default || [], this.multiSlot);
        return null;
    },
    methods: {
        check() {
            removeNode(this.child.$el);
            if (this.disabled) {
                const parentNode = this.$el.parentNode;
                parentNode && parentNode.insertBefore(this.child.$el, this.$el.nextSibling);
            } else {
                const targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to;
                targetEl && targetEl.appendChild(this.child.$el);
            }
        },
    },
};
</script>