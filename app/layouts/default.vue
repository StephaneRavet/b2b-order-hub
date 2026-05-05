<template>
    <header class="app-header">
        <NuxtLink to="/">🏠 Home</NuxtLink>
    </header>
    <main class="app-main">
        <slot />
    </main>
</template>

<style scoped>
.app-header {
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--border);
    background: var(--bg-elevated);
}

.app-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}
</style>