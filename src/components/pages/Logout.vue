<script setup>
import { logout } from '../../services/auth.js'
</script>

<template>
    <h2>Sei sicuro di voler uscire?</h2>
    <button type="button" @click.prevent="async () => await logout()">Logout</button>
</template>

<style scoped>

</style>