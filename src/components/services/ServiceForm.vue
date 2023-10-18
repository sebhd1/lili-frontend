<script setup>
    import { onMounted, ref } from 'vue';
    import { useAppStore } from '../../stores/app.js';
    import { getFrequency } from '../../services/common.js';

    const service = ref({
        frequency: null,
        name: null,
        description: null,
        fee: null,
        additional_fee: null,
    });

    const store = useAppStore();

    onMounted(async() => {
        if(!(store.enums.frequency ?? false)) {
            store.enums.frequency = await getFrequency();
        }
    });

</script>

<template>
    <form action="">
        <div>
            <label for="frequency">Frequenza:</label>
            <select name="frequency" id="frequency" required v-model="service.frequency">
                <option :value="null">Seleziona la frequenza</option>
                <option
                    v-for="(frequencyLabel, frequencyValue) of store.enums.frequency"
                    :key="frequencyValue"
                    :value="frequencyValue"
                >
                    {{frequencyLabel}}
                </option>
            </select>
        </div>

        <div>
            <label for="name">Nome:</label>
            <input
                v-model.trim="service.name"
                id="name"
                placeholder="E.g. Trasporto bambini"
                type="text"
                required
            >
        </div>

        <div>
            <label for="description">Descrizione:</label>
            <textarea
                v-model.trim="service.description"
                id="description"
                name="description"
                placeholder="E.g. descrizione del servizio"
            ></textarea>
        </div>

        <div>
            <label for="fee">Prezzo:</label>
            <input
                v-model.number="service.fee"
                id="fee"
                type="number"
                required
            >
        </div>

        <div>
            <label for="additional_fee">Costi extra:</label>
            <input
                v-model.number="service.additional_fee"
                id="additional_fee"
                type="number"
            >
        </div>

        <button type="submit">Crea</button>
    </form>

</template>

<style scoped>

</style>