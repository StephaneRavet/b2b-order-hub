<!-- app/components/OrderCard.vue -->
<script setup lang="ts">
import type { Order } from '#server/types/order'

interface Props {
  order: Order
  highlight?: boolean
}

withDefaults(defineProps<Props>(), { highlight: false })
</script>

<template>
  <article :class="['order-card', 'card', 'card--interactive', { highlight }]">
    <header>
      <h3>Commande #{{ order.id }}</h3>
      <span :class="['status', `status--${order.status}`]">{{ order.status }}</span>
    </header>
    <p class="meta">{{ order.items.length }} article(s)</p>
  </article>
</template>

<style scoped>
.order-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
}

.order-card.highlight {
  border-color: var(--accent);
  background: #16213a;
}

.order-card header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.order-card h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.meta {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-muted);
}
</style>