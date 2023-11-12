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
                :setSelection="(entityId) => $emit('update:modelValue', entityId)"
                :data="entity"
                :selected="modelValue == entity.id"
            />

        </div>
        <Pagination
            :meta="entities?.meta"
            @navigate="(destination) => urlWithQuery = destination"
        />
    </div>

</template>

<style scoped>

</style>