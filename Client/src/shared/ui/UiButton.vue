<template>
    <button :class="['button', variant, { active }]">
        <slot />
    </button>
</template>
<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: 'primary' | 'secondary' | 'tertiary';
        active?: boolean;
    }>(),
    {
        variant: 'primary',
        active: false,
    },
);
</script>
<style scoped>
.primary {
    --font-size: 20px;
    --font-weight: 400;
    --bg-color: transparent;
    --color: rgb(28, 92, 148);
    --border: 2px solid rgb(28, 92, 148);
    --border-radius: 30px;
    --padding: 10px 24px;
    --bg-color-active: rgb(28, 92, 148);
    --color-active: rgb(255, 255, 255);
    --border-active: 2px solid rgb(28, 92, 148);
}

.secondary {
    --font-size: 16px;
    --font-weight: 400;
    --bg-color: rgb(57, 191, 191);
    --color: rgb(255, 255, 255);
    --border: none;
    --border-radius: 10px;
    --padding: 12px 32px;
    --bg-color-active: rgb(28, 92, 148);
    --color-active: rgb(255, 255, 255);
    --border-active: none;
}

.tertiary {
    --font-size: 16px;
    --font-weight: 400;
    --bg-color: transparent;
    --color: rgb(53, 56, 63);
    --border: 1px solid rgb(53, 56, 63);
    --border-radius: 10px;
    --padding: 8px;
    --bg-color-active: transparent;
    --color-active: rgb(53, 56, 63);
    --border-active: 1px solid rgb(53, 56, 63);
}

@media screen and (max-width: 768px) {
    .primary {
        --font-size: 16px;
        --padding: 8px 20px;
    }
}

@media screen and (max-width: 360px) {
    .primary {
        --font-size: 14px;
        --padding: 8px 16px;
    }
}

.button {
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    color: var(--color);
    background-color: var(--bg-color);
    border: var(--border);
    border-radius: var(--border-radius);
    padding: var(--padding);
    display: flex;
    justify-content: center;
    align-items: center;
}

.button.active {
    color: var(--color-active);
    background-color: var(--bg-color-active);
    border: var(--border-active);
}
</style>
