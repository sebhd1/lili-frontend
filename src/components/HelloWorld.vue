<script setup>

    import { onMounted } from 'vue';
    import axios from 'axios';

    onMounted(async () => await getData())



</script>

<template>
    <button type="button" @click.prevent="async () => console.log(await login())">Login</button>
    <button type="button" @click.prevent="logout">Logout</button>
</template>

<style scoped>

</style>
