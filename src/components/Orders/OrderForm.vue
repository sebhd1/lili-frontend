<script setup>

    import useFetchEntity from '../../composables/fetchEntity.js';
    import { createOrder, showOrder, updateOrder } from '../../services/order.js';
    import { computed, ref } from 'vue';
    import { useAppStore } from '../../stores/app.js';
    import { getStatus } from '../../services/common.js';
    import RelationInput from '../RelationInput.vue';
    import GetAllClients from '../GetAllClients.vue';
    import GetAllServices from '../GetAllServices.vue';

    const modalActive = ref(false);

    const toggleModal = () => {
        modalActive.value = !modalActive.value;
    }

    const props = defineProps({
        id: null,
        order: {
            type: Object,
            required: false,
        }
    });
    const emit = defineEmits([
        'create-order',
        'update-order',
    ]);

    const form = {
        status: null,
        price: null,
        discount: null,
    }

    const store = useAppStore();

    const {entity: order, saveEntity: saveOrder} = useFetchEntity(props.id, form,{
        get: showOrder,
        create: createOrder,
        update: updateOrder,
    }, {

        async onBeforeMounted() {
            if (!(store.enums.status ?? false)) {
                store.enums.status = await getStatus();
            }
        },
        onUpdate(newOrder) {
            emit('update-order', newOrder)
        },
        onCreate(order) {
            emit('create-order', order)
        },

        onAfterSave() {
            if(!props.order) {
                redirect()
            }
        }
    });

    const buttonText = computed(() => {
        return order.value ? 'Edit' : 'Create';
    });

</script>

<template>

    <form @submit.prevent="saveOrder" id="order-form">
        <div>
            <label for="status">Status:</label>
            <select name="status" id="status" required v-model="form.status">
                <option :value="null">Seleziona lo stato</option>
                <option
                    v-for="(statusLabel, statusValue) of store.enums.status"
                    :key="statusValue"
                    :value="statusValue"
                >
                    {{statusLabel}}
                </option>
            </select>
        </div>

        <div>
            <label for="price">Prezzo:</label>
            <input
                id="price"
                type="number"
                placeholder="19,99"
                step="any"
                v-model.number="form.price"
                required
            >
        </div>

        <div>
            <label for="discount">Sconto:</label>
            <input
                id="discount"
                type="number"
                v-model.number="form.discount"
            >
        </div>

        <relation-input :modal-active="modalActive">
            <GetAllClients/>
        </relation-input>
        <button @click.prevent="toggleModal" type="button">Apri modale</button>

        <button type="submit">{{buttonText}}</button>
    </form>


</template>

<style scoped>

</style>