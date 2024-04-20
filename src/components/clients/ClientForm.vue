<script setup>
    import { computed, ref } from 'vue';
    import { createClient, showClient, updateClient } from '../../services/client.js';
    import { useRouter } from 'vue-router';
    import useFetchEntity from '../../composables/fetchEntity.js';

    const props = defineProps({
        id: null,
        client: {
            type: Object,
            required: false,
        }
    });

    const emit = defineEmits([
        'create-client',
        'update-client',
    ]);

    const form = {
        name: null,
        surname: null,
        phone: null,
    }

    const router = useRouter();

    const {entity: client, saveEntity: saveClient} = useFetchEntity(props.id, form,{
        get: showClient,
        create: createClient,
        update: updateClient,
    }, {
        onUpdate(newClient) {
            emit('update-client', newClient)
        },
        onCreate(client) {
            emit('create-client', client)
        },

        onAfterSave() {
            if(!props.client) {
                redirect()
            }
        }
    });


    const buttonText = computed(() => {
        return client.value ? 'Edit' : 'Create';
    });

    function redirect() {

        if(!(form.name || form.surname || form.phone)) {
            throw new Error('Some required fields are empty!');
        }
        router.push({
            name: 'clients.index',
        })
    }
</script>

<template>

    <form @submit.prevent="saveClient" id="client-form">
        <div>
            <label for="name">Nome:</label>
            <input
                id="name"
                type="text"
                placeholder="E.g. Viviana"
                v-model.trim="form.name"
                required
            >
        </div>

        <div>
            <label for="surname">Cognome:</label>
            <input
                id="surname"
                type="text"
                placeholder="E.g. Rossi"
                v-model.trim="form.surname"
                required
            >
        </div>

        <div>
            <label for="phone">Numero di telefono:</label>
            <input
                id="phone"
                type="tel"
                placeholder="E.g. +39 1234 555 ..."
                v-model.trim="form.phone"
                required
            >
        </div>

        <button type="submit">{{ buttonText }}</button>
    </form>

</template>

<style scoped>

</style>