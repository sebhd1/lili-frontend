<script setup>

    import Pagination from './Pagination.vue';
    import { onMounted, ref } from 'vue';

    let entities = ref([]);
    let urlWithQuery = ref(null);

    const props = defineProps({
        endpoint: {
            type: Function,
            required: true,
        },

        modelValue: null,
    });

    defineEmits([
        'update:modelValue'
    ]);

    function isSelected(id) {
        return props.modelValue == id;
    }


    onMounted(async() => {
        entities.value = await props.endpoint()
    });
</script>

<template>

    <div>
        <div
            class="modal-content"
            v-for="entity in entities?.data"
            :key="entity.id"
        >
            <slot
                :data="entity"
                :selected="isSelected(entity.id)"
            />
            <button
                @click.prevent="$emit('update:modelValue', entity.id)"
                type="button"
                :disabled="isSelected(entity.id)"
            >{{ isSelected(entity.id) ? 'Selezionato' : 'Seleziona' }}
            </button>

        </div>
        <Pagination
            :meta="entities?.meta"
            @navigate="(destination) => urlWithQuery = destination"
        />
    </div>

</template>

<style scoped>

</style>