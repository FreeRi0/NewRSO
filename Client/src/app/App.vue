<template>
    <router-view v-slot="{ Component }">
        <Header @change="changeReg" />
        <keep-alive>
            <component :is="Component"></component>
        </keep-alive>
        <Footer />
    </router-view>
</template>

<script setup>
import { Header } from '@widgets/AppHeader';
import { Footer } from '@widgets/AppFooter';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const currentUser = storeToRefs(userStore);

const changeReg = (reg) => {
    // console.log('reg', reg);
    currentUser.currentUser.value.region.name = reg.name;
};
</script>
