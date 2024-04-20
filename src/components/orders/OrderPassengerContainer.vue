<script setup>
import OrderPassenger from './OrderPassenger.vue';

const props = defineProps({
    passengers:{
        type:Array,
        required: false,
        default: [
            {
                name: 'Susanna',
                surname: 'Panna'
            },
            {
                name: 'Puttana',
                surname: 'xD'
            },
            {
                name: 'Elettronica',
                surname: 'Figaxis'
            },
            {
                name: 'Gennara',
                surname: 'Filth'
            },
        ]
    }
});
</script>

<template>

    <div class="passengers-container">
        <OrderPassenger disabled>
            <p>Tu</p>
        </OrderPassenger>

        <OrderPassenger
            v-for="index in 8"
            :key="index"
            :passenger="passengers[index -1] ?? null"
        />

    </div>

</template>

<style scoped>

    .passengers-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 1fr;
        gap: 4rem 2rem;
    }


    @media screen and (min-width: 768px) {
        .passengers-container {
            grid-template-columns: repeat(3, 1fr);
        }
    }

</style>