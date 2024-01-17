<template>
    <li :class="classes">
        <router-link
            :to="{
                name: breadcrumb.name,
                params: breadcrumb.params,
                query: breadcrumb.query,
            }"
        >
            {{ breadcrumb.label }}
        </router-link>

        <span v-if="!active" class="breadcrumb__separator">/</span>
    </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { BreadcrumbProps } from '../types';

const props = withDefaults(defineProps<BreadcrumbProps>(), {
    active: false,
});

const classes = computed(() => ({
    breadcrumb: true,
    active: props.active,
}));
</script>

<style scoped lang="scss">
.breadcrumb {
    display: inline-block;
}

.breadcrumb__separator {
    margin-left: 4px;
    margin-right: 4px;
}
.breadcrumb.active {
    color: blue;
}
</style>
