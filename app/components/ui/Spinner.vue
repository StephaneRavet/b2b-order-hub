<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
    <div class="ui-spinner" role="status" aria-live="polite">
        <span class="ui-spinner__dot" />
        <span class="ui-spinner__dot" />
        <span class="ui-spinner__dot" />
        <span v-if="label" class="ui-spinner__label">{{ label }}</span>
    </div>
</template>

<style scoped>
.ui-spinner {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 1rem 0;
    color: var(--text-muted);
    font-size: 0.875rem;
}

.ui-spinner__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: ui-spinner-bounce 1s infinite ease-in-out both;
}

.ui-spinner__dot:nth-child(1) {
    animation-delay: -0.32s;
}

.ui-spinner__dot:nth-child(2) {
    animation-delay: -0.16s;
}

.ui-spinner__label {
    margin-left: 0.5rem;
}

@keyframes ui-spinner-bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
}
</style>
