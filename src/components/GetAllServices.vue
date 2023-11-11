<script setup>

    import { onMounted, ref } from 'vue';
    import { getServices } from '../services/service.js';
    import Pagination from './Pagination.vue';

    let services = ref([]);



    onMounted(async() => {
        services.value = await getServices()
    });
</script>

<template>

    <div>

        <div
            class="modal-content"
            v-for="service in services?.data"
            :key="service.id"
        >
            <header>
                <p>{{ service.name }}</p>
                <p>{{ service.fee }}</p>
            </header>

        </div>
        <Pagination
            :meta="service?.meta"
            @navigate="(destination) => url = destination"
        />
    </div>

</template>

<style scoped>

</style>