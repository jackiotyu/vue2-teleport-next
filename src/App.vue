<template>
    <div>
        <button @click="onToggleDisable">{{ disabled ? 'Enable' : 'Disable' }}</button>
        <button @click="onToggleDisable2">{{ disabled2 ? 'Enable2' : 'Disable2' }}</button>
        <button @click="onChangeTarget">move to {{ to }}</button>
        <button @click="onChangeTarget2">move 2 to {{ to2 }}</button>
        <button @click="to2 = 'body'">move 2 to body</button>
        <button @click="to2 = '.target2'">move 2 to target2</button>
        <vue-teleport :to="to" :disabled="disabled">
            <div>A</div>
            <section class="ddd">
                222
                <vue-teleport :to="to2" :disabled="disabled2">
                    <div>D</div>
                </vue-teleport>
                333
            </section>
            <div>
                <vue-teleport :to="to" :disabled="disabled">
                    <div>G</div>
                </vue-teleport>
            </div>
        </vue-teleport>
        <h1>before</h1>
        <div class="target">target node</div>
        <h1>after</h1>
        <div class="target2">target node</div>
        <h1>1111</h1>
    </div>
</template>

<script>
import VueTeleport from '../lib/Teleport.vue';

export default {
    components: {
        VueTeleport,
    },
    data() {
        return {
            to: 'body', // selector of the target element
            to2: 'body',
            disabled: true,
            disabled2: true,
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
