import { faker } from '@faker-js/faker'
import { ORDER_STATUSES, type Order } from '#server/types/order'
import type { Product } from '~/types/product'

faker.seed(42)

export const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  sku: faker.string.alphanumeric(6).toUpperCase(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  stock: faker.number.int({ min: 0, max: 1000 }),
}))

export const orders: Order[] = Array.from({ length: 25 }, (_, i) => {
  const items = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
    productId: faker.number.int({ min: 1, max: 50 }),
    quantity: faker.number.int({ min: 1, max: 20 }),
    unitPrice: Number(faker.commerce.price({ min: 5, max: 500 })),
  }))
  const total = items.reduce((sum, it) => sum + it.quantity * it.unitPrice, 0)
  return {
    id: i + 1,
    customerId: faker.number.int({ min: 1, max: 10 }),
    items,
    status: faker.helpers.arrayElement(ORDER_STATUSES),
    total: Number(total.toFixed(2)),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
  }
})
