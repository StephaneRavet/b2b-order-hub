<script setup lang="ts">
defineProps<{ variant?: string }>()
</script>

<template>
    <span :class="['status', variant ? `status--${variant}` : null]">
        <slot />
    </span>
</template>
