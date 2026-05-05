import { z } from 'zod'

const orderSchema = z.object({
  customerId: z.number().int().positive(),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
  })).min(1, 'At least one item is required'),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = orderSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Unprocessable Entity',
      data: {
        violations: result.error.issues.map((i) => ({
          propertyPath: i.path.join('.'),
          message: i.message,
        })),
      },
    })
  }

  return {
    id: Math.floor(Math.random() * 10000),
    ...result.data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
})
