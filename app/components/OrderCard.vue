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
  <article :class="['order-card', { highlight }]">
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
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-elevated);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.order-card:hover {
  border-color: var(--border-strong);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
  color: var(--text);
}

.meta {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.status {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: #1f2937;
  color: #d1d5db;
}

.status--paid { background: #064e3b; color: #6ee7b7; }
.status--shipped { background: #1e3a8a; color: #93c5fd; }
.status--delivered { background: #14532d; color: #86efac; }
.status--cancelled { background: #7f1d1d; color: #fca5a5; }
.status--pending { background: #78350f; color: #fcd34d; }
</style>