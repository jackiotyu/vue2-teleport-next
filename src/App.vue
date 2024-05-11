<template>
    <div>
        <button @click="onToggleDisable">{{ disabled ? 'Enable' : 'Disable' }}</button>
        <button @click="onToggleDisable2">{{ disabled2 ? 'Enable2' : 'Disable2' }}</button>
        <button @click="onChangeTarget">move to {{ to }}</button>
        <button @click="onChangeTarget2">move 2 to {{ to2 }}</button>
        <button @click="to2 = 'body'">move 2 to body</button>
        <button @click="to2 = '.target2'">move 2 to target2</button>
        <Teleport :to="to" :disabled="disabled">
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
            <!-- <Teleport :to="to" :disabled="disabled">
                <div>G</div>
            </Teleport> -->
        </Teleport>
        <h1>before</h1>
        <div class="target">target node</div>
        <h1>after</h1>
        <div class="target2">target node</div>
        <h1>1111</h1>

        <button @click="modalOpen = true">Open full-screen modal! (With teleport!)</button>

        <Teleport to="body">
        <div v-show="modalOpen" class="modal">
            <div v-if="modalOpen">
            I'm a teleported modal! (My parent is "body")
            <button @click="modalOpen = false">Close</button>
            </div>
        </div>
        </Teleport>
    </div>
</template>

<script>
import Teleport from '../lib/Teleport';

export default {
    components: {
        Teleport,
    },
    data() {
        return {
            to: 'body', // selector of the target element
            to2: 'body',
            disabled: true,
            disabled2: true,
            modalOpen: false,
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
          this.to2 = this.to2 === 'body' ? '.target2' : 'body';
        }
    },
};
</script>
