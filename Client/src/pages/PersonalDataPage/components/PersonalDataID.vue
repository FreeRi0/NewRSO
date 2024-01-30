<template>
    <div class="container">
        <div class="mt-14">
            <h2 class="profile-title">Настройки профиля</h2>
            <banner
                :user="privateUser.privateUser.value"
                :education="education"
                class="mt-3"
                :edited="false"
            ></banner>
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
import { banner } from '@features/baner/components';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const privateUser = storeToRefs(userStore);

const education = ref({});
const route = useRoute();
let id = route.params.id;

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        userStore.getPrivateUserId(id);
    }
});

watch(
    () => route.params.id,

    (newId) => {
        id = newId;
        userStore.getPrivateUserId(id);
    },
);
onMounted(() => {
    userStore.getPrivateUserId(id);
})

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
