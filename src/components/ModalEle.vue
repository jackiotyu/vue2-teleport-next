<template>
    <div v-show="value" class="modal">
        <div v-if="value">
        I'm a teleported modal! (My parent is "body")
        <button @click="$emit('change-value', !value)">Close</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: Boolean,
        },
        model: {
            event: 'change-value',
            prop: 'value'
        },
        beforeDestroy() {
            console.log('beforeDestroy')
        }
    }
</script>

<style lang="scss" scoped>

</style>