<script setup>

import Pagination from './Pagination.vue';
import { onMounted, ref } from 'vue';
import { getClients } from '../services/client.js';

let clients = ref([]);



onMounted(async() => {
    clients.value = await getClients()
});
</script>

<template>

    <div>

        <div
            class="modal-content"
            v-for="client in clients?.data"
            :key="client.id"
        >
            <header>
                <p>{{ client.full_name }}</p>
                <p>{{ client.phone }}</p>
            </header>

        </div>
        <Pagination
            :meta="clients?.meta"
            @navigate="(destination) => url = destination"
        />
    </div>

</template>

<style scoped>

</style>