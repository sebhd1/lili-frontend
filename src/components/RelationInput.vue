<script setup>


    defineProps({
        modalActive: {
            type: Boolean,
            required: true,
        }
    });

</script>

<template>
    <transition-group name="modal-animation">
        <div v-show="modalActive">
            <transition name="modal-animation-inner">
                <div v-show="modalActive" class="modal-inner">
                    <!--- Modal Content can be clients or services--->
                    <slot />
                </div>
            </transition>
        </div>
    </transition-group>


</template>

<style scoped>

    header {
        padding: 0.50rem;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        border-radius: 20px;
        margin-bottom: 1rem;

        &:hover {
            border-color: darkgreen;
            color: green;
        }
    }

</style>