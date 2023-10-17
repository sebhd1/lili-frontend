<script setup>
    import { onMounted } from 'vue';
    import axios from 'axios';

    onMounted(async () => await getData())

    async function getData() {
        try {
            const res = await axios.get("/api/services");

            console.log(res.data);
        }
        catch (e) {
            console.warn(e);
        }
    }

</script>

<template>
    <div>
        <button type="button" @click.prevent="async () => console.log(await getData())">get service</button>
    </div>
</template>

<style scoped>

</style>