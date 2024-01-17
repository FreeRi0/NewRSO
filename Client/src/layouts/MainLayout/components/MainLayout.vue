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

import { useRoleStore } from '@layouts/store/role';
const roleStore = useRoleStore();
roleStore.getRoles();

//запрос на коммандира

// запрос по хб
// import { useAppStore } from '@features/store/index';
// import { storeToRefs } from 'pinia';

// const userStore = useAppStore();
// userStore.getUser();
// const user = storeToRefs(userStore);
// console.log('lalala', user.user.value);
</script>
