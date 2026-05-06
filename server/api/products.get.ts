import type { Product } from '#shared/types/product'

const products: Product[] = [
  { id: 1, sku: 'A100', name: 'Vis M6', price: 0.50, stock: 1500 },
  { id: 2, sku: 'B200', name: 'Boulon M8', price: 1.20, stock: 800 },
]

export default defineEventHandler(async () => {
  // simule la latence réseau pour rester réaliste
  await new Promise((r) => setTimeout(r, 200))
  return products
})
