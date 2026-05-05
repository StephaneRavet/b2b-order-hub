import { faker } from '@faker-js/faker'
import type { Order } from '~/types/order'
import type { Product } from '~/types/product'

faker.seed(42)

export const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  sku: faker.string.alphanumeric(6).toUpperCase(),
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price()),
  stock: faker.number.int({ min: 0, max: 1000 }),
}))

const STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'] as const

export const orders: Order[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  customerId: faker.number.int({ min: 1, max: 10 }),
  items: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
    productId: faker.number.int({ min: 1, max: 50 }),
    quantity: faker.number.int({ min: 1, max: 20 }),
  })),
  status: faker.helpers.arrayElement(STATUSES),
  createdAt: faker.date.recent({ days: 30 }).toISOString(),
}))
