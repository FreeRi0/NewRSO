<template>
    <div>
        <div class="container">
            <p class="notify__text">
                Рады приветствовать на&nbsp;нашем сайте, который
                мы&nbsp;запустили к&nbsp;старту мероприятий юбилейного года РСО.
                Обычно при запуске платформ и&nbsp;одновременной
                регистрации/работе пользователей с&nbsp;разных устройств могут
                появляться неполадки. Если вы&nbsp;с&nbsp;ними столкнетесь,
                то&nbsp;сообщите нам об&nbsp;этом по&nbsp;адресу электронной
                почты:
                <a href="mailto:rso.login@yandex.ru">rso.login@yandex.ru</a> или
                <a href="https://t.me/LK_RSO_Support">напишите нам в&nbsp;Телеграм</a>.
            </p>
            <!-- <div
                v-if="
                    currentUser.currentUser.value.is_verified === false &&
                    isAuth
                "
                class="required_verification"
            >
                <p>
                    Обращаем внимание, что срок формирования отрядов-
                    участников заканчивается 30 марта 2024 года.
                    Всем участникам Конкурса необходимо обратиться для верификации в свой РШ.<br />
                    Для прохождения верификации перейдите на страницу «Настройки
                    профиля» — «Персональные данные». Заполните все обязательные
                    поля, нажмите на кнопку «Отправить данные на верификацию».
                    Далее ожидайте одобрения заявки командиром РШ либо
                    командиром ЛСО, если вы состоите в отряде.
                </p>
            </div> -->
        </div>

        <app-breadcrumbs v-if="!hidden" :breadcrumbs="breadcrumbs" />

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { AppBreadcrumbs, useBreadcrumbsStore } from '@shared/index';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@features/store/index';
const { breadcrumbs, hidden } = storeToRefs(useBreadcrumbsStore());
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { usePositionsStore } from '@features/store/positions';
import { useEducationalsStore } from '@features/store/educationals';
import { useSquadsStore } from '@features/store/squads';
import { HTTP } from '@app/http';
import { useDistrictsStore } from '@features/store/districts';

const roleStore = useRoleStore();
const userStore = useUserStore();
const regionsStore = useRegionalsStore();
const positionsStore = usePositionsStore();
const isVerify = ref(false);
const competition_pk = 1;

// const updateToken = async () => {
//     try {
//         const resp = await HTTP.post('/jwt/refresh/', { refresh: localStorage.getItem('refresh_token') });
//         localStorage.setItem('jwt_token', resp.data.access);
//         localStorage.setItem('refresh_token', resp.data.refresh);
//     } catch (e) {
//         console.error('Error refreshing token:', e);
//     }
// };

// const verifyToken = async () => {
//     try {
//         const resp = await HTTP.post('/jwt/verify/', { token: localStorage.getItem('jwt_token') })
//         if (resp.status == 200) {

//         } else if (resp.status == 401) {
//             updateToken()
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }



const squadsStore = useSquadsStore();
const currentUser = storeToRefs(userStore);

onMounted(() => {
    // setTimeout(() => {
    //     verifyToken();
    // }, 500)

    userStore.getUser(currentUser);
    roleStore.getRoles();
    positionsStore.getPositions();
    squadsStore.getAreas();
    roleStore.getUserParticipantsStatus(competition_pk);

    regionsStore.getRegions();
});

</script>

<style scoped lang="scss">
.notify__text {
    max-width: 980px;
    margin: 28px auto;
    text-align: center;
    font-family: 'Bert Sans';
    font-size: 14px;
    line-height: 22px;
    color: #35383f;

    &>a {
        text-decoration: underline;
    }

    a:last-child {
        color: #1f7cc0;
        text-decoration: none;
    }
}

.required_verification {
    border: 1px solid #a3a3a3;
    border-radius: 7px;
    text-align: center;
    padding: 28px 15px 28px 15px;
    margin-bottom: 30px;
}

.required_verification p {
    max-width: 1180px;
    font-size: 16px;
    font-family: 'Akrobat';
    font-weight: 500;
    line-height: 22px;
    color: #000000;

    @media (max-width: 1024px) {
        max-width: 980px;
    }

    @media (max-width: 768px) {
        max-width: 700px;
    }
}
</style>
