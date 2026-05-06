<script setup lang="ts">
const value = defineModel<string>({ default: '' })
defineProps<{ label?: string; placeholder?: string }>()
</script>

<template>
    <label class="search-input">
        <span v-if="label" class="search-input__label">{{ label }}</span>
        <input
            v-model="value"
            type="search"
            :placeholder="placeholder ?? 'Rechercher…'"
            class="search-input__control"
        />
    </label>
</template>

<style scoped>
.search-input {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
}

.search-input__label {
    color: var(--text-muted);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.search-input__control {
    width: 100%;
    font-size: 0.875rem;
}
</style>
