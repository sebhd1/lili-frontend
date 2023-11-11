import { onMounted, ref } from 'vue';


export default function useFetchEntity(id, form, api = {}, hooks = {}) {

    const entity = ref(null);

    onMounted(async() => {
        if(typeof hooks.onBeforeMounted === 'function'){
            await hooks.onBeforeMounted.call(this, entity)
        }

        if (id && !entity.value) {
            entity.value = (await api.get(id)).data;

            if(typeof hooks.onFetch === 'function'){
                await hooks.onFetch.call(this, entity)
            }
        }
        Object.assign(form, entity.value);

        if(typeof hooks.onAfterMounted === 'function'){
            await hooks.onAfterMounted.call(this, entity)
        }
    });

    async function saveEntity() {
        let target = null;

        if(typeof hooks.onBeforeSave === 'function'){
            target = await hooks.onBeforeSave.call(this, entity.value)
        }
        if(id && typeof api.update === 'function') {
            target = await api.update(form);
            if(typeof hooks.onUpdate === 'function'){
                await hooks.onUpdate.call(this, target, entity.value)
            }
        }
        else if (typeof api.create === 'function') {
            target = await api.create(form);
            if(typeof hooks.onCreate === 'function'){
                await hooks.onCreate.call(this, target, entity.value)
            }
        }

        if(typeof hooks.onAfterSave === 'function'){
            await hooks.onAfterSave.call(this, target, entity.value)
        }
    }

    return {entity, saveEntity}
}