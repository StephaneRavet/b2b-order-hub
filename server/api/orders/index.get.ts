import type { Order } from '#server/types/order'
import { orders } from '~~/server/utils/fixtures'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const perPage = Number(query.perPage) || 20
  const status = String(query.status || '')
  const q = String(query.q || '').trim()

  let filtered: Order[] = orders
  if (status) filtered = filtered.filter((o) => o.status === status)
  if (q) filtered = filtered.filter((o) => String(o.id).includes(q))

  const start = (page - 1) * perPage

  return {
    items: filtered.slice(start, start + perPage),
    total: filtered.length,
    page,
    perPage,
  }
})
