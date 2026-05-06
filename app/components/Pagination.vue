<script setup lang="ts">
const page = defineModel<number>({ required: true })
const props = defineProps<{ total: number; perPage: number }>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))

function go(p: number) {
    if (p < 1 || p > pageCount.value) return
    page.value = p
}
</script>

<template>
    <nav v-if="total > perPage" class="pagination" aria-label="Pagination">
        <UiButton :disabled="page <= 1" @click="go(page - 1)">←</UiButton>
        <span class="pagination__status">Page {{ page }} / {{ pageCount }}</span>
        <UiButton :disabled="page >= pageCount" @click="go(page + 1)">→</UiButton>
    </nav>
</template>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
}

.pagination__status {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
}
</style>
