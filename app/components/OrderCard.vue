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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.order-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.order-card.highlight {
  border-color: #2563eb;
  background: #f8fafc;
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
  color: #111827;
}

.meta {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.status {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: #f3f4f6;
  color: #374151;
}

.status--paid { background: #ecfdf5; color: #047857; }
.status--shipped { background: #eff6ff; color: #1d4ed8; }
.status--delivered { background: #f0fdf4; color: #15803d; }
.status--cancelled { background: #fef2f2; color: #b91c1c; }
.status--pending { background: #fffbeb; color: #b45309; }
</style>