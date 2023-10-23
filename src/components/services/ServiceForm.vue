<script setup>
    import { onMounted, ref } from 'vue';
    import { useAppStore } from '../../stores/app.js';
    import { getFrequency } from '../../services/common.js';
    import { createService } from '../../services/service.js';

    const props = defineProps({
        id: null,
        service:{
            type: Object,
            required: false,
        }
    })

    defineEmits([
        'create-service'
    ]);

    const form = ref({
        frequency: props.service?.frequency,
        name: props.service?.name,
        description: props.service?.description,
        fee: props.service?.fee,
        additional_fee: props.service?.additional_fee,
    });

    const store = useAppStore();

    onMounted(async() => {
        if(!(store.enums.frequency ?? false)) {
            store.enums.frequency = await getFrequency();
        }
    });

</script>

<template>
    <form @submit.prevent="async () => await createService(form)" id="service-creation">
        <div>
            <label for="frequency">Frequenza:</label>
            <select name="frequency" id="frequency" required v-model="form.frequency">
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
                v-model.trim="form.name"
                id="name"
                placeholder="E.g. Trasporto bambini"
                type="text"
                required
            >
        </div>

        <div>
            <label for="description">Descrizione:</label>
            <textarea
                v-model.trim="form.description"
                id="description"
                name="description"
                placeholder="E.g. descrizione del servizio"
            ></textarea>
        </div>

        <div>
            <label for="fee">Prezzo:</label>
            <input
                v-model.number="form.fee"
                id="fee"
                type="number"
                required
            >
        </div>

        <div>
            <label for="additional_fee">Costi extra:</label>
            <input
                v-model.number="form.additional_fee"
                id="additional_fee"
                type="number"
            >
        </div>

        <button type="submit">Crea</button>
    </form>

</template>

<style scoped>
</style>