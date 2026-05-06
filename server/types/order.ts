export const ORDER_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'En attente',
    paid: 'Payées',
    shipped: 'Expédiées',
    delivered: 'Livrées',
    cancelled: 'Annulées',
}

export type OrderItem = {
    productId: number
    quantity: number
    unitPrice: number
}

export type Order = {
    id: number
    customerId: number
    items: OrderItem[]
    status: OrderStatus
    total: number
    createdAt: string
}

export type OrdersPage = {
    items: Order[]
    total: number
    page: number
    perPage: number
}
