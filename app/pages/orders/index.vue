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
</script>

<template>
    <div>
        <h1>📦 Mes commandes</h1>
        <div v-if="pending">Chargement...</div>
        <div v-else-if="error">Erreur : {{ error.message }}</div>
        <div v-else class="orders-grid">
            <OrderCard v-for="order in data?.items ?? []" :key="order.id" :order="order" />
        </div>
    </div>
</template>

<style scoped>
.orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
}
</style>