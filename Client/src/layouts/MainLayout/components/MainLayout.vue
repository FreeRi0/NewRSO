<template>
    <div>
        <app-breadcrumbs v-if="!hidden" :breadcrumbs="breadcrumbs" />

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { AppBreadcrumbs, useBreadcrumbsStore } from '@shared/index';
import { storeToRefs } from 'pinia';

const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());

// import { useRoleStore } from '@layouts/store/role';
// const roleStore = useRoleStore();
// roleStore.getRoles();

//запрос на коммандира
</script>
