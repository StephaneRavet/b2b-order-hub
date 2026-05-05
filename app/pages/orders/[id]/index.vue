<script setup lang="ts">
import type { Order } from '#server/types/order'

const route = useRoute()
const orderId = route.params.id

const { data: order, pending, error } = await useFetch<Order>(`/api/orders/${orderId}`, {
    server: false,
})

const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })
</script>

<template>
    <div v-if="pending" class="state">Chargement...</div>
    <div v-else-if="error" class="state state--error">Erreur : {{ error.message }}</div>
    <article v-else-if="order" class="order">
        <header class="order-head">
            <div>
                <NuxtLink to="/orders" class="back">← Retour</NuxtLink>
                <h1>Commande #{{ order.id }}</h1>
            </div>
            <span :class="['status', `status--${order.status}`]">{{ order.status }}</span>
        </header>

        <dl class="meta">
            <div>
                <dt>Client</dt>
                <dd>#{{ order.customerId }}</dd>
            </div>
            <div>
                <dt>Créée le</dt>
                <dd>{{ formatDate(order.createdAt) }}</dd>
            </div>
            <div>
                <dt>Articles</dt>
                <dd>{{ order.items.length }}</dd>
            </div>
        </dl>

        <section>
            <h2>Articles</h2>
            <table class="items">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th class="num">Quantité</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in order.items" :key="item.productId">
                        <td>#{{ item.productId }}</td>
                        <td class="num">{{ item.quantity }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </article>
</template>

<style scoped>
.state {
    padding: 2rem;
    color: var(--text-muted);
}

.state--error {
    color: #fca5a5;
}

.order {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.order-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
}

.back {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
}

.order-head h1 {
    margin: 0;
    font-size: 1.5rem;
}

.meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin: 0;
    padding: 1rem 1.25rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 8px;
}

.meta div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.meta dt {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-muted);
}

.meta dd {
    margin: 0;
    font-size: 0.95rem;
    color: var(--text);
}

section h2 {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    font-weight: 600;
}

.items {
    width: 100%;
    border-collapse: collapse;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
}

.items th,
.items td {
    padding: 0.6rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

.items tbody tr:last-child td {
    border-bottom: 0;
}

.items th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    font-weight: 500;
    background: #0f1521;
}

.items .num {
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.status {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: #1f2937;
    color: #d1d5db;
    white-space: nowrap;
}

.status--paid { background: #064e3b; color: #6ee7b7; }
.status--shipped { background: #1e3a8a; color: #93c5fd; }
.status--delivered { background: #14532d; color: #86efac; }
.status--cancelled { background: #7f1d1d; color: #fca5a5; }
.status--pending { background: #78350f; color: #fcd34d; }
</style>
