<script setup>


    defineProps({
        modelValue: {
            type: Boolean,
        }
    });

    const emit = defineEmits(['update:modelValue']);

    function closeModal() {
        emit('update:modelValue', false)
    }

</script>

<template>
    <transition name="modal-toggle">
        <div v-show="modelValue" class="modal" @click.prevent.self="closeModal">
            <div v-show="modelValue" class="modal-inner">
                <slot/>
            </div>
        </div>
    </transition>


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

    .modal {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.35);
        overflow: hidden;

        & .modal-inner {
            box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,0.15);
            background: rgb(36,36,36);
            padding: 2rem;
            width: 90%;
            max-height: 90%;
            border-radius: 20px;
            overflow: auto;
        }
    }

</style>