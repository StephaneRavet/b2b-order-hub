export type Density = 'compact' | 'comfy'
export type PerPage = 10 | 20 | 50

export const useOrdersPrefsStore = defineStore('ordersPrefs', () => {
    const perPage = ref<PerPage>(20)
    const density = ref<Density>('comfy')
    const lastVisitedAt = ref<string | null>(null)

    const rowPadding = computed(() =>
        density.value === 'compact' ? '0.4rem 0.8rem' : '0.85rem 1.1rem',
    )

    function isNew(createdAt: string): boolean {
        if (!lastVisitedAt.value) return false
        return new Date(createdAt) > new Date(lastVisitedAt.value)
    }

    function markVisited() {
        lastVisitedAt.value = new Date().toISOString()
    }

    return { perPage, density, lastVisitedAt, rowPadding, isNew, markVisited }
}, {
    persist: true,
})
