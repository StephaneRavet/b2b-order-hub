import { z } from 'zod'
import type { OrderStatus } from '#shared/types/order'
import { orders } from '#server/utils/fixtures'

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
}

const statusSchema = z.object({
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']),
})

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const order = orders.find((o) => o.id === id)
  if (!order) throw createError({ statusCode: 404 })

  const { status } = statusSchema.parse(await readBody(event))
  const allowed = ALLOWED_TRANSITIONS[order.status]

  if (!allowed.includes(status)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Unprocessable Entity',
      data: {
        violations: [{
          propertyPath: 'status',
          message: `Cannot transition from ${order.status} to ${status}`,
        }],
      },
    })
  }

  order.status = status
  return order
})
