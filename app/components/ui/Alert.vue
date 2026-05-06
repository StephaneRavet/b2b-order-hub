<script setup lang="ts">
defineProps<{
    error?: { message?: string; statusCode?: number } | null
    message?: string
}>()

defineEmits<{ retry: [] }>()
</script>

<template>
    <div class="ui-alert" role="alert">
        <div class="ui-alert__body">
            <strong>Erreur</strong>
            <span>{{ message ?? error?.message ?? 'Une erreur est survenue.' }}</span>
        </div>
        <button type="button" class="ui-alert__retry" @click="$emit('retry')">
            Réessayer
        </button>
    </div>
</template>

<style scoped>
.ui-alert {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1rem;
    background: #2a1313;
    border: 1px solid #7f1d1d;
    border-radius: 8px;
    color: #fca5a5;
    font-size: 0.875rem;
}

.ui-alert__body {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.ui-alert__retry {
    background: #7f1d1d;
    border-color: #b91c1c;
    color: #fee2e2;
}

.ui-alert__retry:hover {
    border-color: #fca5a5;
}
</style>
