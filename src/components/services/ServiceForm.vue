<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useAppStore } from '../../stores/app.js';
    import { getFrequency } from '../../services/common.js';
    import { createService, showService, updateService } from '../../services/service.js';

    const service = ref(null);

    const props = defineProps({
        id: null,
        service:{
            type: Object,
            required: false,
        }
    });

    const emit = defineEmits([
        'create-service',
        'update-service',
    ]);

    const form = {
        frequency: null,
        name: null,
        description: null,
        fee: null,
        additional_fee: null,
    };

    onMounted(async () => {
        service.value = props.service;
        if (props.id && !service.value) {
            service.value = (await showService(props.id)).data;
        }
        Object.assign(form, service.value);
    });

    const buttonText = computed(() => {
        return service.value ? 'Edit' : 'Create';
    });

    const store = useAppStore();

    onMounted(async () => {
        if(!(store.enums.frequency ?? false)) {
            store.enums.frequency = await getFrequency();
        }
    });

async function saveService() {
    let eventName = null;
    let target = null;

    if(props.id) {
       target = await updateService(form);
       eventName = 'update-service';
    }
    else {
        target = await createService(form);
        eventName = 'create-service';
    }
    emit(eventName, target);
}

</script>

<template>
    <form @submit.prevent="saveService" id="service-creation">
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

        <button type="submit">{{buttonText}}</button>
    </form>

</template>

<style scoped>
</style>