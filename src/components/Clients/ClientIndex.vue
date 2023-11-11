<script setup>
    import { ref, watch } from 'vue';

    import { getClients } from '../../services/client.js';
    import Pagination from '../Pagination.vue';

    let clients = ref([]);

    const url = ref(null);

    watch(url, async () => {
        clients.value = await getClients(url.value)
    }, {immediate: true});


</script>

<template>

    <section class="client-container">
        <RouterLink :to="{name: 'clients.create'}">Aggiungi un cliente</RouterLink>
        <div class="client-wrapper" v-for="client in clients?.data" :key="client.id">
            <header>
                <h3>{{client.full_name}}</h3>
                <p>{{client.phone}}</p>
            </header>

            <RouterLink :to="{name: 'clients.edit', params:{id:client.id}}">Edit</RouterLink>
        </div>
    </section>

    <Pagination
        :meta="clients?.meta"
        @navigate="(destination) => url = destination"
    />

</template>

<style scoped>

    .client-wrapper {
        border: 2px solid white;
        border-radius: 20px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
</style>