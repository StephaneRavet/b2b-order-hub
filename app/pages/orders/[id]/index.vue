<script setup lang="ts">
import type { Order } from '#server/types/order'

const route = useRoute()
const orderId = route.params.id

const { data: order, pending, error } = await useFetch<Order>(`/api/orders/${orderId}`, {
    server: false,
})
</script>

<template>
    <div v-if="pending">Chargement...</div>
    <div v-else-if="error">Erreur : {{ error.message }}</div>
    <div v-else>
        <h1>Commande #{{ order?.id }}</h1>
        <pre>{{ order }}</pre>
    </div>
</template>
