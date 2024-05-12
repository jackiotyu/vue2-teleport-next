<!--
Modal component with customizable slots and CSS transitions.
-->

<template>
    <div>
        <button id="show-modal" @click="showModal = true">Show Modal</button>

        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showModal" @close="showModal = false">
            <template #header>
                <h3>Custom Header</h3>
            </template>
            </modal>
        </Teleport>
    </div>
</template>

<script>
import Teleport from '../lib/Teleport';
import Modal from './Modal.vue';
export default {
    components: {
        Teleport,
        Modal,
    },
    data() {
        return {
            showModal: false,
        }
    }
}
</script>
