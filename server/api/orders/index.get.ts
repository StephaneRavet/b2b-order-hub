import type { Order } from '~/types/order'
import { orders } from '~~/server/utils/fixtures'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 20
  const status = String(query.status || '')

  let filtered: Order[] = orders
  if (status) {
    filtered = filtered.filter((o) => o.status === status)
  }

  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    items: filtered.slice(start, end),
    total: filtered.length,
    page,
    perPage,
  }
})
