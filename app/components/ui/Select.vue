<script setup lang="ts">
const value = defineModel<string>({ default: '' })
defineProps<{ label?: string }>()
</script>

<template>
    <label class="ui-select">
        <span v-if="label" class="ui-select__label">{{ label }}</span>
        <select v-model="value" class="ui-select__control">
            <slot />
        </select>
    </label>
</template>

<style scoped>
.ui-select {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
}

.ui-select__label {
    color: var(--text-muted);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.ui-select__control {
    width: 100%;
    min-width: 180px;
}
</style>
