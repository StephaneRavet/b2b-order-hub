const PRICE_FMT = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const DATE_FMT = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' })
const DATETIME_FMT = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
})

export const formatPrice = (n: number) => PRICE_FMT.format(n)

export const formatDate = (iso: string, withTime = false) =>
    (withTime ? DATETIME_FMT : DATE_FMT).format(new Date(iso))
