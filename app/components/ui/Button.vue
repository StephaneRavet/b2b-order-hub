<script setup lang="ts">
defineProps<{
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    variant?: 'default' | 'primary' | 'ghost'
}>()
</script>

<template>
    <button
        :type="type ?? 'button'"
        :disabled="disabled"
        :class="['ui-button', variant ? `ui-button--${variant}` : null]"
    >
        <slot />
    </button>
</template>

<style scoped>
.ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-width: 2.25rem;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.875rem;
    transition: border-color 0.15s, background 0.15s, opacity 0.15s;
}

.ui-button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.ui-button--primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #0b0f17;
}

.ui-button--ghost {
    background: transparent;
}
</style>
