<template>
    <h1 v-if="variant === 'h1'" v-bind="$attrs" class="heading h1">
        <slot />
    </h1>
    <h2 v-if="variant === 'h2'" v-bind="$attrs" class="heading h2">
        <slot />
    </h2>
    <h3 v-if="variant === 'h3'" v-bind="$attrs" class="heading h3">
        <slot />
    </h3>
</template>
<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: 'h1' | 'h2' | 'h3' | 'h4';
    }>(),
    {
        variant: 'h1',
    },
);
</script>
<style scoped>
.h1 {
    --font-size: 52px;
    --font-weight: 700;
}
.h2 {
    --font-size: 40px;
    --font-weight: 600;
}
.h3 {
    --font-size: 32px;
    --font-weight: 600;
}

@media screen and (max-width: 768px) {
    .h1 {
        --font-size: 40px;
        --font-weight: 600;
    }
    .h2 {
        --font-size: 32px;
        --font-weight: 600;
    }
    .h3 {
        --font-size: 24px;
        --font-weight: 600;
    }
}

.heading {
    color: rgb(62, 65, 72);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
}
</style>
