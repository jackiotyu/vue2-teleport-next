<template>
    <div>
        <button @click="onToggleDisable">{{ disabled ? 'Enable' : 'Disable' }}</button>
        <button @click="onToggleDisable2">{{ disabled2 ? 'Enable2' : 'Disable2' }}</button>
        <button @click="onChangeTarget">move to {{ to }}</button>
        <button @click="onChangeTarget2">move 2 to {{ to2 }}</button>
        <button @click="to2 = 'body'">move 2 to body</button>
        <button @click="to2 = '.target2'">move 2 to target2</button>
        <button @click="isHide = !isHide">toggle isHide {{ isHide }}</button>
        <button @click="onUnshift">unshift</button>
        <button @click="onPush">push</button>
        <button @click="onPop">pop</button>
        <button @click="onShift">shift</button>
        <h1>t1</h1>
        <Teleport :to="to" :disabled="disabled" multiSlot>
            <div>A</div>
            <transition>
                <section class="ddd" v-show="true">
                    222
                    <Teleport :to="to2" :disabled="disabled2">
                        <div>D</div>
                    </Teleport>
                    333
                </section>
            </transition>
            <Teleport :to="to2" :disabled="disabled2">
                <div>G</div>
            </Teleport>
        </Teleport>
        <h1>t1</h1>
        <h1>before</h1>
        <div class="target">target node</div>
        <h1>after</h1>
        <div class="modal-content" v-if="disabled">
            <button @click="modalOpen = true">Open full-screen modal! (With teleport!)</button>
            <button @click="disabledModal = !disabledModal">{{ disabledModal ? 'enabled' : 'disabled' }}</button>
            <p v-for="i in list" :key="`list${i}`">{{ i }}</p>
            <h2 v-if="!isHide">other1</h2>
            <Teleport to="body" :disabled="disabledModal" multiSlot>
                <ModalEle v-model="modalOpen"></ModalEle>
                <h2 v-if="!isHide">other2</h2>
            </Teleport>
            <p v-for="i in list" :key="`list2${i}`">{{ i }}</p>
        </div>
        <h1>2222</h1>
        <h1>1111</h1>
    </div>
</template>

<script>
import Teleport from '../lib/Teleport.vue';
import ModalEle from './components/ModalEle.vue';

export default {
    components: {
        Teleport,
        ModalEle,
    },
    data() {
        return {
            to: 'body', // selector of the target element
            to2: 'body',
            disabled: true,
            disabled2: true,
            disabledModal: false,
            modalOpen: false,
            isHide: false,
            list: ['list'],
        };
    },
    methods: {
        onToggleDisable() {
            this.disabled = !this.disabled;
        },
        onChangeTarget() {
            this.to = this.to === 'body' ? '.target' : 'body';
        },
        onToggleDisable2() {
            this.disabled2 = !this.disabled2;
        },
        onChangeTarget2() {
            this.isHide = !this.isHide;
            this.to2 = this.to2 === 'body' ? '.target2' : 'body';
        },
        onUnshift() {
            this.list.unshift(Math.random());
        },
        onPush() {
            this.list.push(Math.random());
        },
        onPop() {
            this.list.pop();
        },
        onShift() {
            this.list.shift();
        }
    },
};
</script>
