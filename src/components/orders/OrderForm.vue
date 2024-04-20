<script setup>

    import useFetchEntity from '../../composables/fetchEntity.js';
    import { createOrder, showOrder, updateOrder } from '../../services/order.js';
    import { computed, ref, watch, } from 'vue';
    import { useAppStore } from '../../stores/app.js';
    import { getStatus } from '../../services/common.js';
    import Modal from '../Modal.vue';
    import RelationInput from '../RelationInput.vue';
    import { getServices } from '../../services/service.js';
    import useModal from '../../composables/modal.js';
    import { useRouter } from 'vue-router';
    import OrderPassengerContainer from './OrderPassengerContainer.vue';


    const {modalActive: serviceModalActive, toggleModal: toggleServiceModal} = useModal();

    const router = useRouter();


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
        starts_at: null,
        ends_at: null,
        service_id: null,
    };


    const startsAt = ref(null);

    watch(startsAt, () => {
        if (!startsAt.value) {
            return null;
        }

        const dateString = (new Date(startsAt.value)).toISOString();
        form.starts_at = dateString.substring(0, dateString.lastIndexOf(':'));
    });

    watch(() => form.starts_at,() => {
        startsAt.value = new Date(form.starts_at)
    });

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

        async onAfterMounted(entity) {
            if (!entity) {
                form.status ??= 'pending'
            }
        },
        onUpdate(newOrder) {
            emit('update-order', newOrder)
        },
        onCreate(order) {
            emit('create-order', order)
            console.log(order)
        },

        onAfterSave() {
            /*if(!props.order) {
                redirect();
            }*/
        }
    });

   /* function redirect() {

        if(!(form.status || form.surname || form.phone)) {
            throw new Error('Some required fields are empty!');
        }
        router.push({
            name: 'orders.index',
        })
    }*/

    const buttonText = computed(() => {
        return order.value ? 'Edit' : 'Create';
    });

</script>

<template>

    <form @submit.prevent="saveOrder" id="order-form">

        <OrderPassengerContainer />

        <div v-if="order?.id">
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

        <div>
            <label for="starts-at">Inizia il:</label>
            <input
                id="starts-at"
                type="datetime-local"
                v-model="startsAt"
                required
            >
        </div>

        <div>
            <label for="ends-at">Finisce il:</label>
            <input
                id="ends-at"
                type="datetime-local"
                v-model="endsAt"

            >
        </div>

        <Modal v-model="serviceModalActive">
            <RelationInput
                v-model="form.service_id"
                :endpoint="getServices"
                :key="`service-${form.service_id}`"
            >
                <template #default="{data:service, selected}">
                    <p>{{ service.name }}</p>
                </template>
            </RelationInput>
        </Modal>

        <button @click.prevent="toggleServiceModal" type="button">Scegli Servizio</button>

        <button type="submit">{{buttonText}}</button>
    </form>
</template>

<style scoped>

    #order-form {
        padding: 2rem;
    }

</style>