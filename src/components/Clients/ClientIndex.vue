<script setup>
    import { ref, watch } from 'vue';

    import { getClients } from '../../services/client.js';

    let clients = ref([]);

    const url = ref(null);

    watch(url, async () => {
        clients.value = await getClients(url.value)
    }, {immediate: true});


</script>

<template>

    <section class="services-container">
        <div class="service-wrapper" v-for="client in  clients?.data" :key="client.id">
            <header>
                <h3>{{client.full_name}}</h3>
                <p>{{client.phone}}</p>
            </header>

<!--            <RouterLink :to="{name: 'clients.edit', params:{id:client.id}, client}">Edit</RouterLink>-->
        </div>
    </section>

<!--    <Pagination
        :meta="services?.meta"
        @navigate="(destination) => url = destination"
    />-->

</template>

<style scoped>

    .service-wrapper {
        border: 2px solid white;
        border-radius: 20px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
</style>