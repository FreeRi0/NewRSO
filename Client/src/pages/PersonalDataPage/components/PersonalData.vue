<template>
    <div class="container">
        <div class="mt-14">
            <h2 class="profile-title">Настройки профиля</h2>
            <BannerComp
                :user="user"
                :education="education"
                class="mt-3"
                :edited="true"
            ></BannerComp>
            <!--Табы-->
            <div class="d-flex mt-9 mb-9 buttonWrap">
                    <button
                        class="contributorBtn"
                        :class="{ active: picked === tab.name }"
                        v-for="tab in tabs"
                        :key="tab.id"
                        @click="picked = tab.name"
                    >
                        {{ tab.name }}
                    </button>
            </div>
            <AccordionsPersonal
                v-if="picked == 'Персональные данные'"
            ></AccordionsPersonal>
            <userData
                v-else-if="picked == 'Моя страница' || picked == ''"
            ></userData>
            <privateProfile
                v-else-if="picked == 'Настройки приватности'"
            ></privateProfile>
            <changePassword
                v-else-if="picked == 'Логин и пароль'"
            ></changePassword>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { AccordionsPersonal } from '@features/PersonalAccordions/components';
import { privateProfile } from '@features/PrivateProfile/components';
import { changePassword } from '@features/ChangePassword/components';
import { BannerComp } from '@features/baner/components';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { userData } from '@features/userData/components';

const user = ref({});
const education = ref({});

// const route = useRoute();
// let id = route.params.id;

const getUser = async () => {
    await HTTP.get('/rsousers/me/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

// onBeforeRouteUpdate(async (to, from) => {
//     if (to.params.id !== from.params.id) {
//         getUser();
//     }
// });

// watch(
//     () => route.params.id,

//     (newId, oldId) => {
//         id = newId;
//         getUser();
//     },
// );

onMounted(() => {
    getUser();
});

const picked = ref('');
const tabs = ref([
    {
        id: '1',
        name: 'Моя страница',
    },
    {
        id: '2',
        name: 'Персональные данные',
    },
    {
        id: '3',
        name: 'Настройки приватности',
    },
    {
        id: '4',
        name: 'Логин и пароль',
    },
]);
const pages = ref([
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'Настройка профиля', href: '#' },
]);
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
