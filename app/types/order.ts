export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export type OrderItem = {
  productId: number
  quantity: number
}

export type Order = {
  id: number
  customerId: number
  items: OrderItem[]
  status: OrderStatus
  createdAt: string
}
