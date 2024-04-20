<script setup>

    import { onMounted, ref, watch } from 'vue';
    import { getOrders } from '../../services/order.js';
    import Pagination from '../Pagination.vue';

    const orders = ref([]);

    const url = ref(null);

    watch(url, async () => {
        orders.value = await getOrders(url.value)

    }, {immediate: true});



</script>

<template>
        <section class="orders-container">
            <RouterLink :to="{name: 'orders.create'}">Crea un ordine</RouterLink>
            <div class="order-wrapper" v-for="order in orders?.data" :key="order.id">
                <header>
                    <h3>{{order.status_label}}</h3>
                </header>
                <div>
                    <p>Prezzo: {{order.price}} €</p>
                    <p>Sconto: {{order.discount}} €</p>
                </div>

                <div>
                    <p>{{order.starts_at}}</p>
                    <p>{{order.ends_at}}</p>
                </div>
                <RouterLink :to="{name: 'orders.edit', params:{id:order.id}, order}">Edit</RouterLink>
            </div>
        </section>

        <Pagination
            :meta="orders?.meta"
            @navigate="(destination) => url = destination"
        />
</template>

<style scoped>

    .order-wrapper {
        border: 2px solid white;
        border-radius: 20px;
        padding: 1rem;
        margin-bottom: 1rem;
    }

</style>