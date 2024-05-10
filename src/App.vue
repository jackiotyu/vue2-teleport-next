<template>
    <div>
        <button @click="onToggleDisable">{{ disabled ? 'Enable' : 'Disable' }}</button>
        <button @click="onChangeTarget">move to {{ to }}</button>
        <vue-teleport :to="to" :disabled="disabled">
            <div>A</div>
            <div>B</div>
            <div>C</div>
        </vue-teleport>
        <h1>before</h1>
        <div class="target">target node</div>
        <h1>after</h1>
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
            disabled: false,
        };
    },
    methods: {
        onToggleDisable() {
          this.disabled = !this.disabled;
        },
        onChangeTarget() {
          this.to = this.to === 'body' ? '.target' : 'body';
        }
    },
};
</script>
