<script setup lang="ts">
const value = defineModel<string>({ default: '' })
</script>

<template>
    <input v-model="value" type="search" placeholder="Rechercher…" class="search-input" />
</template>

<style scoped>
.search-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    margin-bottom: 1rem;
}

.search-input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
</style>
