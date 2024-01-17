<template>
    <ul class="breadcrumb__list">
        <app-breadcrumb
            v-for="(breadcrumb, index) in breadcrumbs"
            :key="breadcrumb.path"
            :breadcrumb="breadcrumb"
            :active="index === breadcrumbs.length - 1"
        />
    </ul>
</template>

<script setup lang="ts">
import AppBreadcrumb from './AppBreadcrumb.vue';
import { useBreadcrumbsStore } from '@shared/index';

const { breadcrumbs } = useBreadcrumbsStore();
</script>

<style scoped lang="scss">
.breadcrumb__list {
    list-style-type: none;
    display: inline-block;
}
</style>
