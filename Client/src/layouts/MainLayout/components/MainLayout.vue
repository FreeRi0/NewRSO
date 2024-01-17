<template>
    <div>
        <app-breadcrumbs />

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { AppBreadcrumbs } from '@shared';
</script>
