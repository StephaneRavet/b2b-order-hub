<script setup lang="ts">
import type { Order } from '#server/types/order'

definePageMeta({
    validate: (route) => /^\d+$/.test(route.params.id as string),
})

const route = useRoute()
const orderId = Number(route.params.id)

const { data: order, pending, error, refresh } = await useFetch<Order>(
    `/api/orders/${orderId}`,
)
</script>

<template>
    <div class="order-page">
        <NuxtLink to="/orders" class="back">← Retour à la liste</NuxtLink>

        <UiSpinner v-if="pending" label="Chargement…" />
        <UiAlert v-else-if="error" :error="error" @retry="refresh()" />

        <article v-else-if="order" class="order">
            <header class="order-head">
                <h1>Commande #{{ order.id }}</h1>
                <UiBadge :variant="order.status">{{ order.status }}</UiBadge>
            </header>

            <dl class="meta card">
                <div>
                    <dt>Client</dt>
                    <dd>#{{ order.customerId }}</dd>
                </div>
                <div>
                    <dt>Créée le</dt>
                    <dd>{{ formatDate(order.createdAt, true) }}</dd>
                </div>
                <div>
                    <dt>Articles</dt>
                    <dd>{{ order.items.length }}</dd>
                </div>
                <div>
                    <dt>Total</dt>
                    <dd>{{ formatPrice(order.total) }}</dd>
                </div>
            </dl>

            <section>
                <h2>Lignes</h2>
                <table class="items card">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th class="num">Qté</th>
                            <th class="num">P.U.</th>
                            <th class="num">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.items" :key="item.productId">
                            <td>#{{ item.productId }}</td>
                            <td class="num">{{ item.quantity }}</td>
                            <td class="num">{{ formatPrice(item.unitPrice) }}</td>
                            <td class="num">{{ formatPrice(item.quantity * item.unitPrice) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="num"><strong>Total</strong></td>
                            <td class="num"><strong>{{ formatPrice(order.total) }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </article>
    </div>
</template>

<style scoped>
.order-page {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.back {
    font-size: 0.875rem;
    color: var(--text-muted);
}

.order {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.order-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
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

.items tfoot td {
    border-top: 1px solid var(--border);
    border-bottom: 0;
}

.items .num {
    text-align: right;
    font-variant-numeric: tabular-nums;
}
</style>
