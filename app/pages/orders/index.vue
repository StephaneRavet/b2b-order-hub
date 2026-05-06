<script setup lang="ts">
import type { Order } from '#server/types/order'

type OrdersResponse = {
    items: Order[]
    total: number
    page: number
    perPage: number
}

const { data, pending, error } = await useFetch<OrdersResponse>('/api/orders', {
    server: false,
})

const search = ref('')
const filtered = computed(() =>
    (data.value?.items ?? []).filter((o) => String(o.id).includes(search.value)),
)
</script>

<template>
    <div>
        <h1>📦 Mes commandes</h1>
        <div v-if="pending">Chargement...</div>
        <div v-else-if="error">Erreur : {{ error.message }}</div>
        <template v-else>
            <SearchInput v-model="search" />
            <div class="orders-grid">
                <OrderCard v-for="order in filtered" :key="order.id" :order="order" />
            </div>
        </template>
    </div>
</template>

<style scoped>
h1 {
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
}

.orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
}
</style>