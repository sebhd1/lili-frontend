<script setup>
    import { ref, watch } from 'vue';
    import { getServices } from '../../services/service.js';
    import Pagination from '../Pagination.vue';

    const services = ref([]);

    const url = ref(null);

    watch(url, async () => {
        services.value = await getServices(url.value)
    }, {immediate: true});


</script>

<template>
    <section class="services-container">
        <RouterLink :to="{name: 'services.create'}">Crea un servizio</RouterLink>
        <div class="service-wrapper" v-for="service in services?.data" :key="service.id">
            <header>
                <h3>{{service.name}} -
                    <span>{{service.frequency_label}}</span>
                </h3>
            </header>
            <div>
                <p>{{ service.description ?? 'descrizione non definita' }}</p>
                <p>Prezzo standard: {{service.fee}} €</p>
                <p>Costi extra: {{service.additional_fee}} €</p>
            </div>
            <RouterLink :to="{name: 'services.edit', params:{id:service.id}}">Edit</RouterLink>
        </div>
    </section>

    <Pagination
        :meta="services?.meta"
        @navigate="(destination) => url = destination"
    />
</template>

<style scoped>
    .service-wrapper {
        border: 2px solid white;
        border-radius: 20px;
        padding: 1rem;
        margin-bottom: 1rem;
    }

</style>