<template>
    <ul class="breadcrumb__list container">
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 40px;
    font-family: "Akrobat";
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    color: #35383f;
    padding-top: 60px;
    
    @media (max-width: 360px) {
        margin-bottom: 20px;
    }
}
</style>
