<script setup lang="ts">
import {
    ORDER_STATUS_LABELS,
    ORDER_STATUSES,
    type OrderStatus,
    type OrdersPage,
} from '#server/types/order'

const PER_PAGE = 20

const page = useRouteQuery<number>('page', { default: 1 })
const status = useRouteQuery<OrderStatus | ''>('status', { default: '', resetKeys: ['page'] })
const search = useRouteQuery<string>('q', { default: '', resetKeys: ['page'] })

const { data, pending, error, refresh } = await useFetch<OrdersPage>('/api/orders', {
    query: { page, status, q: search, perPage: PER_PAGE },
})
</script>

<template>
    <div class="orders">
        <header class="orders__head">
            <h1>📦 Commandes</h1>
            <div class="orders__filters">
                <SearchInput
                    v-model="search"
                    label="Recherche"
                    placeholder="Filtrer par ID…"
                    class="orders__search"
                />
                <UiSelect v-model="status" label="Statut" class="orders__status">
                    <option value="">Tous</option>
                    <option v-for="s in ORDER_STATUSES" :key="s" :value="s">
                        {{ ORDER_STATUS_LABELS[s] }}
                    </option>
                </UiSelect>
            </div>
        </header>

        <UiSpinner v-if="pending" label="Chargement…" />
        <UiAlert v-else-if="error" :error="error" @retry="refresh()" />
        <UiEmpty v-else-if="!data?.items.length" message="Aucune commande à afficher." />

        <ul v-else class="orders__list">
            <li v-for="order in data.items" :key="order.id">
                <NuxtLink :to="`/orders/${order.id}`" class="order-row card card--interactive">
                    <div class="order-row__main">
                        <strong>#{{ order.id }}</strong>
                        <UiBadge :variant="order.status">{{ order.status }}</UiBadge>
                    </div>
                    <div class="order-row__meta">
                        <span class="order-row__total">{{ formatPrice(order.total) }}</span>
                        <time>{{ formatDate(order.createdAt) }}</time>
                    </div>
                </NuxtLink>
            </li>
        </ul>

        <Pagination
            v-if="data"
            v-model="page"
            :total="data.total"
            :per-page="data.perPage"
        />
    </div>
</template>

<style scoped>
.orders {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.orders__head {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.orders__head h1 {
    margin: 0;
    font-size: 1.5rem;
}

.orders__filters {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 1rem;
}

.orders__search {
    flex: 1 1 240px;
    min-width: 240px;
}

.orders__status {
    min-width: 200px;
}

.orders__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.5rem;
}

.order-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1.1rem;
    color: var(--text);
    text-decoration: none;
}

.order-row:hover {
    text-decoration: none;
}

.order-row__main {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.order-row__meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--text-muted);
    font-size: 0.875rem;
}

.order-row__total {
    color: var(--text);
    font-variant-numeric: tabular-nums;
    font-weight: 600;
}
</style>
