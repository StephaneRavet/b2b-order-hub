<script setup lang="ts">
defineProps<{ message?: string }>()
</script>

<template>
    <div class="ui-empty">
        <p>{{ message ?? 'Aucun résultat.' }}</p>
        <slot />
    </div>
</template>

<style scoped>
.ui-empty {
    padding: 2.5rem 1rem;
    text-align: center;
    color: var(--text-muted);
    border: 1px dashed var(--border);
    border-radius: 8px;
    background: var(--bg-elevated);
}

.ui-empty p {
    margin: 0 0 0.5rem;
    font-size: 0.95rem;
}
</style>
