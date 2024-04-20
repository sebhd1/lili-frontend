<script setup>

import Navigation from './components/Navigation.vue';



</script>

<template>

    <Suspense>
        <Navigation/>
    </Suspense>

  <RouterView/>
</template>

<style scoped>

</style>
