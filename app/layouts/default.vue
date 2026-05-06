<script setup lang="ts">
const { isAuthenticated, user, logout } = useAuth()
</script>

<template>
    <header class="app-header">
        <NuxtLink to="/">🏠 Home</NuxtLink>
        <div v-if="isAuthenticated" class="app-header__user">
            <span class="app-header__name">{{ user?.name }}</span>
            <UiButton type="button" variant="ghost" @click="logout">
                Déconnexion
            </UiButton>
        </div>
    </header>
    <main class="app-main">
        <slot />
    </main>
</template>

<style scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--border);
    background: var(--bg-elevated);
}

.app-header__user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.app-header__name {
    font-size: 0.875rem;
    color: var(--text-muted);
}

.app-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}
</style>