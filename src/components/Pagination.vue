<script setup>
    defineProps({
        meta: {
            type: Object,
            required: false,
        }
    });

    defineEmits([
        'navigate'
    ]);


</script>

<template>
    <div class="pagination" v-if="meta">
        <button
            v-for="(link, index) in meta.links" :key="index"
            :class="{ 'active': link.active }"
            type="button"
            @click.prevent="$emit('navigate', link.url)"
            v-html="link.label"
            :disabled="link.url === null"
        ></button>
    </div>
</template>

<style scoped>
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    .active {
        background: white;
        color: black;
    }
</style>