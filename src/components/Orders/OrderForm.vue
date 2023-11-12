<script setup>

    import useFetchEntity from '../../composables/fetchEntity.js';
    import { createOrder, showOrder, updateOrder } from '../../services/order.js';
    import { computed, } from 'vue';
    import { useAppStore } from '../../stores/app.js';
    import { getStatus } from '../../services/common.js';
    import Modal from '../Modal.vue';
    import RelationInput from '../RelationInput.vue';
    import { getClients } from '../../services/client.js';
    import { getServices } from '../../services/service.js';
    import useModal from '../../composables/modal.js';


    const {modalActive: clientModalActive, toggleModal: toggleClientModal} = useModal();
    const {modalActive: serviceModalActive, toggleModal: toggleServiceModal} = useModal();


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
        client_id: null,
        service_id: null,
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
                redirect();
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

        <Modal v-model="clientModalActive">
            <RelationInput
                v-model="form.client_id"
                :endpoint="getClients"
                :key="`client-${form.client_id}`"
            >
                <template #default="{data:client, selected, setSelection}">
                    <div>
                        <p>{{ client.full_name }}</p>
                        <p>{{ client.phone }}</p>
                        <button
                            @click.prevent="setSelection(client.id)"
                            type="button"
                            :disabled="selected"
                        >{{ selected ? 'Selezionato' : 'Seleziona' }}
                        </button>
                    </div>
                </template>
            </RelationInput>
        </Modal>

        <Modal v-model="serviceModalActive">
            <RelationInput
                v-model="form.service_id"
                :endpoint="getServices"
                :key="`service-${form.service_id}`"
            >
                <template #default="{data:service, selected}">

                    <p>{{ service.name }}</p>
                    <button
                        @click.prevent="form.service_id = service_id"
                        type="button"
                        :disabled="selected"
                    >{{ selected ? 'Selezionato' : 'Seleziona' }}
                    </button>
                </template>
            </RelationInput>
        </Modal>

        <button @click.prevent="toggleClientModal" type="button">Scegli Cliente</button>
        <button @click.prevent="toggleServiceModal" type="button">Scegli Servizio</button>

        <button type="submit">{{buttonText}}</button>
    </form>
</template>

<style scoped>

</style>