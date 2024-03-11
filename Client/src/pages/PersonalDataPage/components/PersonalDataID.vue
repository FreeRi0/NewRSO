<template>
    <div class="container">
        <div class="mt-14">
            <h2 class="profile-title">Настройки профиля</h2>
            <Wall
                :user="privateUser.privateUser.value"
                :education="education"
                :user_region="region"
                :position="roles.positions.value"
                :commander="roles.userRoles.value"
                class="mt-3"
            ></Wall>
            <AccordionsPersonal
                :button="false"
                :user="privateUser.privateUser.value"
            ></AccordionsPersonal>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { AccordionsPersonal } from '@features/PersonalAccordions/components';
import { Wall } from '@features/baner/components';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const roleStore = useRoleStore();
const router = useRouter();
const privateUser = storeToRefs(userStore);
const roles = storeToRefs(roleStore);
const education = ref({});
const route = useRoute();
let id = route.params.id;

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        userStore.getPrivateUserId(id);
        roleStore.getPositions(id);
        roleStore.getUserRoles(id);
    }
});

watch(
    () => route.params.id,

    (newId) => {
        id = newId;
        userStore.getPrivateUserId(id);
        roleStore.getPositions(id);
        roleStore.getUserRoles(id);
    },
);
onMounted(() => {
    if (
        roleStore.roles.regionalheadquarter_commander?.id ||
        roleStore.roles.detachment_commander?.id
    ) {
        userStore.getPrivateUserId(id);
        roleStore.getPositions(id);
        roleStore.getUserRoles(id);
    } else {
        router.push({
            name: 'userpage',
            params: { id: route.params.id },
        });
    }
});
</script>
<style lang="scss" scoped>
.profile-title {
    font-size: 40px;
    margin-bottom: 40px;
}

.contributorBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 10px 24px;
    width: 100%;
    margin: 7px;
    @media screen and (max-width: 768px) {
        padding: 8px 20px;
    }
}
.buttonWrap {
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
}

.active {
    background-color: #1c5c94;
    color: white;
}
</style>
