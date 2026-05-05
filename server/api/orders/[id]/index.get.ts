import { orders } from '~~/server/utils/fixtures'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const order = orders.find((o) => o.id === id)

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  return order
})
