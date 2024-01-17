<template>
    <div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { useRoleStore } from '@layouts/store/role';
const roleStore = useRoleStore();
roleStore.getRoles();

//запрос на коммандира
</script>
