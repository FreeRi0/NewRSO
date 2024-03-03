<template>
    <div class="container">
        <header class="header">
            <ul class="header__logo">
                <li class="header__logo-rso">
                    <a href="https://трудкрут.рф/" target="_blank">
                        <img
                            src="@app/assets/logo/logo-rso-tablet.svg"
                            width="60"
                            height="56"
                            alt="Логотип сайта трудкрут.рф"
                        />
                    </a>
                </li>

                <li class="header__logo-labor-cool">
                    <a href="https://trudkrutshop.ru/" target="_blank">
                        <img
                            src="@app/assets/logo/logo-shop-tablet.png"
                            width="56"
                            height="56"
                            alt="Логотип сайта trudkrutshop.ru"
                        />
                    </a>
                </li>
            </ul>

            <nav class="header__nav header__nav--order">
                <button
                    class="header__button-mobile-menu"
                    type="button"
                    @click="removeClass()"
                ></button>
                <div ref="navMenu" class="header__nav-container no-visible">
                    <div class="header__overlay" @click="removeClass()"></div>
                    <ul class="header__nav-list">
                        <li
                            class="header__nav-item"
                            v-if="Object.keys(userStore.currentUser).length"
                        >
                            <div class="nav-menu-item">
                                <Dropdown title="Структура" :items="pages" />
                            </div>
                        </li>
                        <!-- <li class="header__nav-item disable">
                            <a class="header__nav-link" href="/actionSquads">
                                Мероприятия
                            </a>
                        </li> -->
                        <li class="header__nav-item competition__nav-item">
                            <a
                                class="header__nav-link competition__link"
                                href="/Competition"
                            >
                                Конкурс
                            </a>
                        </li>
                        <li class="header__nav-item">
                            <a class="header__nav-link" href="/FAQ">
                                Полезная информация
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav class="header__nav nav-user">
                <div
                    class="nav-user__application-count"
                    v-if="Object.keys(userStore.currentUser).length && (roles.roles.value.regionalheadquarter_commander || roles.roles.value.detachment_commander) "
                >
                    <!--ССЫЛКА НА СТРАНИЦУ АКТИВНЫЕ ЗАЯВКИ?-->
                    <router-link :to="'active'">
                        <img
                            src="@app/assets/icon/bell-light.svg"
                            width="36"
                            height="36"
                            alt="Иконка уведомления"
                        />
                    </router-link>
                    <!--Если есть активные заявки (isActive = true), ниже отображается их количество:-->
                    <div
                        v-if="userStore.count.count"
                        class="nav-user__quantity-box"
                    >
                        <span v-if="userStore.count.count < 100">{{
                            userStore.count.count
                        }}</span>
                        <span v-else>99+</span>
                    </div>
                </div>

                <div
                    class="nav-user__location"
                    v-if="
                        Object.keys(userStore.currentUser).length &&
                        !userStore.isLoading
                    "
                >
                    <button class="nav-user__button" @click="show = !show">
                        <!-- <img
                            class="nav-user__button-mobile"
                            src="@app/assets/icon/icon-location.svg"
                            width="36"
                            height="36"
                            alt="Иконка геолокации"
                        /> -->

                        <span
                            v-if="
                                userStore.currentUser?.region &&
                                !isLoading.isLoading.value
                            "
                        >
                            <div
                                v-for="item in regionalsStore.filteredMyRegional"
                            >
                                <p>{{ item.name }}</p>
                            </div>
                        </span>

                        <p v-else-if="isLoading.isLoading.value">
                            Загрузка региона...
                        </p>

                        <span v-else>Выберите региональное отделение</span>
                    </button>

                    <div
                        class="header__overlay"
                        @click="show = !show"
                        v-if="show"
                    ></div>

                    <div class="nav-user__location-container" v-if="show">
                        <button
                            type="button"
                            @click="show = !show"
                            class="nav-user__location-close"
                        >
                            x
                        </button>
                        <label for="your-region">Ваш регион</label>
                        <regionsDropdown
                            open-on-clear
                            id="reg"
                            name="regdrop"
                            placeholder="Выберите регион обучения"
                            v-model="region"
                            @update:value="changeValue"
                            address="/regions/"
                            class="mb-2 region-input"
                        ></regionsDropdown>

                        <div>
                            <Button
                                type="submit"
                                class="nav-user__button-agree mt-2 mx-auto"
                                label="Да, все верно"
                                color="primary"
                                size="large"
                                @click="updateRegion"
                            ></Button>
                        </div>
                    </div>
                </div>
                <div
                    class="nav-user__location"
                    v-if="!Object.keys(userStore.currentUser).length"
                >
                    <button class="nav-user__button" @click="show = !show">
                        <span v-if="regionAction">
                            {{ regionAction }}
                        </span>
                        <span v-else>Выберите региональное отделение</span>
                    </button>

                    <div
                        class="header__overlay"
                        @click="show = !show"
                        v-if="show"
                    ></div>

                    <div class="nav-user__location-container" v-if="show">
                        <button
                            type="button"
                            @click="show = !show"
                            class="nav-user__location-close"
                        >
                            x
                        </button>
                        <label for="your-region">Ваш регион</label>
                        <regionsDropdown
                            open-on-clear
                            id="reg"
                            name="regdrop"
                            placeholder="Выберите регион обучения"
                            v-model="regionAction"
                            @update:value="changeValue"
                            class="mb-2 region-input"
                            address="/regions/"
                            :value-change="true"
                        ></regionsDropdown>

                        <div>
                            <Button
                                type="submit"
                                class="nav-user__button-agree mt-2 mx-auto"
                                label="Да, все верно"
                                color="primary"
                                size="large"
                                @click="close()"
                            ></Button>
                        </div>
                    </div>
                </div>
                <div
                    class="nav-user__menu user-menu"
                    v-if="
                        Object.keys(userStore.currentUser).length &&
                        !userStore.isLoading
                    "
                >
                    <img
                        v-if="!Object.keys(userStore.currentUser).length"
                        src="@app/assets/user-avatar.png"
                        alt="Фото бойца (заглушка)"
                    />

                    <Dropdown
                        v-if="Object.keys(userStore.currentUser).length"
                        :items="userPages"
                        :image="true"
                        :url="userStore.currentUser?.media?.photo"
                        desc="Фотография пользователя"
                        @updateUser="userUpdate"
                    />
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { Dropdown } from '@shared/components/dropdown';
import { Button } from '@shared/components/buttons';
import {
    Select,
    sortByEducation,
    regionsDropdown,
} from '@shared/components/selects';
import { HTTP } from '@app/http';
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter, onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useUserStore } from '@features/store/index';
import { useRegionalsStore } from '@features/store/regionals';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
    quantityActive: {
        type: Number,
    },
});

const emit = defineEmits(['changeReg']);

const roleStore = useRoleStore();
const regionalsStore = useRegionalsStore();
const userStore = useUserStore();
const roles = storeToRefs(roleStore);

const isLoading = storeToRefs(regionalsStore);

const quantityIsActive = ref(props.quantityActive);

const router = useRouter();

const region = ref('');

const regionAction = ref(null);

const userUpdate = (userData) => {
    userStore.currentUser = userData;
};

const pages = ref([
    { title: 'ЛСО', link: '/allSquads', show: true },
    { title: 'Штабы СО ОО', link: '/AllHeadquarters', show: true },
    { title: 'Местные штабы', link: '/LocalHeadquarters', show: true },
    { title: 'Региональные штабы', link: '/RegionalHeadquarters', show: true },
    { title: 'Окружные штабы', link: '/DistrictHeadquarters', show: true },
    { title: 'Центральный штаб', link: '/CentralHQ/1', show: true },
]);

const userPages = computed(() => [
    {
        title: 'Моя страница',
        name: 'mypage',
        show: true,
    },
    {
        title: 'Мой отряд',
        name: 'lso',
        params: {
            id: userStore.currentUser?.detachment_id
                ? userStore.currentUser?.detachment_id
                : roleStore.roles?.detachment_commander?.id,
        },
        show:
            userStore.currentUser?.detachment_id ||
            roleStore.roles?.detachment_commander,
    },
    {
        title: 'Штаб СО ОО',
        name: 'HQ',
        path: 'regionals',
        params: {
            id: userStore.currentUser?.educational_headquarter_id
                ? userStore.currentUser?.educational_headquarter_id
                : roleStore.roles?.educationalheadquarter_commander?.id,
        },
        show:
            userStore.currentUser?.educational_headquarter_id ||
            roleStore.roles?.educationalheadquarter_commander,
    },
    {
        title: 'Местный штаб',
        name: 'LocalHQ',
        path: 'locals',
        params: {
            id:
                /*userStore.currentUser?.local_headquarter_id ??
                headquartersIds.value.find((hq) => hq.path === 'locals')?.id,*/
                userStore.currentUser?.local_headquarter_id
                    ? userStore.currentUser?.local_headquarter_id
                    : roleStore.roles?.localheadquarter_commander?.id,
        },
        show:
            userStore.currentUser?.local_headquarter_id ||
            roleStore.roles?.localheadquarter_commander,
    },
    {
        title: 'Региональный штаб',
        name: 'RegionalHQ',
        path: 'regionals',
        params: {
            id:
                /*userStore.currentUser?.regional_headquarter_id ??
                headquartersIds.value.find((hq) => hq.path === 'regionals')?.id,*/
                userStore.currentUser?.regional_headquarter_id
                    ? userStore.currentUser?.regional_headquarter_id
                    : roleStore.roles?.regionalheadquarter_commander?.id,
        },
        show:
            userStore.currentUser?.regional_headquarter_id ||
            roleStore.roles?.regionalheadquarter_commander,
    },
    {
        title: 'Окружной штаб',
        name: 'DistrictHQ',
        path: 'districts',
        params: {
            id:
                /*userStore.currentUser?.district_headquarter_id ??
                headquartersIds.value.find((hq) => hq.path === 'districts')?.id,*/
                userStore.currentUser?.district_headquarter_id
                    ? userStore.currentUser?.district_headquarter_id
                    : roleStore.roles?.districtheadquarter_commander?.id,
        },
        show:
            userStore.currentUser?.district_headquarter_id ||
            roleStore.roles?.districtheadquarter_commander,
    },
    {
        title: 'Центральный штаб',
        name: 'CentralHQ',
        params: {
            id: userStore.currentUser?.central_headquarter_id,
        },
        show: true,
    },
    {
        title: 'Активные заявки',
        name: 'active',
        show:
            roleStore.roles?.regionalheadquarter_commander ||
            roleStore.roles?.detachment_commander,
    },
    {
        title: 'Поиск участников',
        link: 'roster',
        show:
            roleStore.roles?.centralheadquarter_commander ||
            roleStore.roles?.districtheadquarter_commander ||
            roleStore.roles?.regionalheadquarter_commander,
    },
    {
        title: 'Членский взнос',
        name: 'contributorPay',
        show: roleStore.roles?.regionalheadquarter_commander,
    },
    {
        title: 'Оформление справок',
        name: 'references',
        show: roleStore.roles?.regionalheadquarter_commander,
    },
    { title: 'Настройки профиля', name: 'personaldata', show: true },
    { title: 'Выйти из ЛК', button: true, show: true },
]);

let show = ref(false);

const isOpen = ref(false);

const navMenu = ref(null);

const removeClass = () => {
    const menu = navMenu.value;
    menu.classList.toggle('no-visible');
};

const headquartersIds = ref([]);
const headquertersNames = ref([
    {
        path: 'educationals',
        id: 'educational_headquarter_id',
        parentPath: 'locals',
        parentHqId: 'local_headquarter',
    },
    {
        path: 'locals',
        id: 'local_headquarter_id',
        parentPath: 'regionals',
        parentHqId: 'regional_headquarter',
    },
    {
        path: 'regionals',
        id: 'regional_headquarter_id',
        parentPath: 'districts',
        parentHqId: 'district_headquarter',
    },
    {
        path: 'dirstricts',
        id: 'district_headquarter_id',
        parentPath: 'centrals',
        parentHqId: 'central_headquarter',
    },
]);

const updateRegion = async () => {
    try {
        const updateRegResponse = await HTTP.patch(
            '/rsousers/me/',
            {
                region: region.value,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );

        region.value = updateRegResponse.data.region.id;

        show.value = !show.value;
        userStore.currentUser.region = updateRegResponse.data.region;
        regionalsStore.searchMyRegionals(updateRegResponse.data.region);

        // userStore.getUser();
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const close = () => {
    // regionAction.value = regionAction;
    show.value = !show.value;
};

watch(
    () => userStore.currentUser,
    (newUser, oldUser) => {
        if (Object.keys(userStore.currentUser).length === 0) {
            return;
        }
        region.value = userStore.currentUser.region.id;
        regionalsStore.searchMyRegionals(userStore.currentUser.region);
    },
);

watch(
    () => roleStore.roles,
    (newRole, oldRole) => {
        if (Object.keys(roleStore.roles).length === 0) {
            return;
        }
        userStore.getCountApp();
    },
);

// onMounted(() => {
//         userStore.getCountApp();
// });
</script>

<style lang="scss">
//убрала тег scoped потому что стили к кнопке dropdown не применялись

.header {
    display: grid;
    grid-template-columns: 146px 1.3fr 1fr;
    column-gap: 76px;
    align-items: center;
    padding: 13px 0;
    font-family: 'BertSans', sans-serif;
    font-size: 16px;
    line-height: 21px;
    font-weight: 400;
    color: #35383f;
    position: relative;
    border-bottom: 1px solid #d9d9d9;

    @media (max-width: 1024px) {
        display: flex;
        column-gap: 0;
        padding: 0;
        min-height: 88px;
    }

    @media (max-width: 768px) {
        padding: 0;
        min-height: 60px;
    }

    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
    }

    a {
        color: #35383f;
    }

    &__logo {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        column-gap: 30px;

        @media (max-width: 1440px) {
            width: 146px;
            column-gap: 30px;
        }

        @media (max-width: 1024px) {
            width: 140px;
            column-gap: 24px;
        }

        @media (max-width: 768px) {
            width: 88px;
            // height: 36px;
            column-gap: 12px;
        }
    }

    &__logo-labor-cool {
        img {
            @media (max-width: 768px) {
                width: 36px;
                height: 36px;
            }
        }
    }

    &__nav--order {
        @media (max-width: 1024px) {
            order: 3;
        }
    }

    &__nav-container {
        .header__overlay {
            display: none;

            @media (max-width: 1024px) {
                display: block;
            }
        }

        &.no-visible {
            @media (max-width: 1024px) {
                display: none;
            }
        }
    }

    &__nav-list {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        column-gap: 14px;
        // font-family: 'BertSans', sans-serif;
        // font-size: 16px;
        // font-weight: 400;
        // line-height: 21px;
        max-width: 520px;

        @media (max-width: 1024px) {
            position: absolute;
            right: 0;
            top: calc(100%);
            min-width: 415px;
            padding: 28px;
            border-radius: 10px;
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 8px;
            background-color: #1f7cc0;
            z-index: 2;
            font-family: 'Akrobat';
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;

            a {
                color: #ffffff;
            }
        }

        @media (max-width: 768px) {
            min-width: 0;
            max-width: 415px;
            width: 100%;
        }
    }

    &__button-mobile-menu {
        display: none;
        position: relative;

        @media (max-width: 1024px) {
            display: block;
            width: 36px;
            height: 36px;
            margin-left: 60px;
            padding: 6px 4px;

            &::before {
                position: absolute;
                content: '';
                width: 24px;
                height: 1px;
                top: 8px;
                left: 6px;
                right: 6px;
                background-color: #35383f;
                box-shadow:
                    0 10px 0 0#35383f,
                    0 20px 0 0#35383f;
            }
        }

        @media (max-width: 768px) {
            margin-left: 20px;
        }
    }

    &__nav-item {
        @media (max-width: 1024px) {
            &:not(:last-child) {
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
        }
    }

    &__nav-item.disable {
        & > a {
            cursor: not-allowed;
        }
    }

    &__nav-link {
        display: block;
        padding: 5px 0;

        @media (max-width: 1024px) {
            padding: 11px 0;
        }
    }
}
//----------------------------------------------------------------------------------------

//Стили для блоков с выпадающим меню
.dropdown {
    .dropdown__button {
        position: sticky;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 5px 0;

        @media (max-width: 1024px) {
            color: #ffffff;
            padding: 16px 0;
        }

        @media (max-width: 768px) {
            color: #ffffff;
            padding: 10px 0;
        }

        svg {
            display: none;

            @media (max-width: 1024px) {
                display: block;
                stroke: #ffffff;
            }
        }
    }

    &__list {
        position: absolute;
        top: 100%;
        display: grid;
        row-gap: 8px;
        padding: 28px 28px;
        max-height: 820px;
        width: 328px;
        font-family: 'Akrobat';
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
        overflow-y: auto;
        border-radius: 10px;
        background-color: #1f7cc0;
        z-index: 2;

        @media (max-width: 1024px) {
            position: relative;
            width: 100%;
            padding: 0;
            background-color: #1f7cc0;
        }
    }

    &__item {
        position: relative;

        &:not(:last-child)::before {
            position: absolute;
            content: '';
            height: 1px;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(255, 255, 255, 0.2);

            @media (max-width: 1024px) {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }

        @media (max-width: 1024px) {
            padding: 0 20px;
        }
    }

    &__link {
        display: block;
        padding: 11px 0;
        width: max-content;
    }
}

.nav-menu-item {
    .dropdown__link {
        color: #ffffff;

        @media (max-width: 1024px) {
            color: #ffffff;
        }
    }
}

.user-menu {
    img {
        width: 56px;
    }
    .dropdown {
        &__box-image {
            margin-right: 12px;
            width: 56px;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            @media (max-width: 1024px) {
                margin-right: 0;
            }

            @media (max-width: 768px) {
                width: 36px;
                height: 36px;
            }
        }

        svg {
            display: block;
            width: 14px;
            height: 14px;
            stroke: #35383f;

            @media (max-width: 1024px) {
                display: none;
            }
        }

        &__list {
            right: 0;
            width: 328px;
            padding: 28px;
            border-radius: 10px;
            background-color: #1f7cc0;

            @media (max-width: 1024px) {
                position: absolute;
                right: 96px;
                padding: 28px;
            }

            @media (max-width: 768px) {
                right: 0;
            }
        }

        &__item {
            &:not(:last-child)::before {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }

        &__link {
            color: #ffffff;
        }
    }
}
//------------------------------------------------------------------------------------

.nav-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 18px;
    min-width: 242px;
    max-width: 383px;
    flex-grow: 1;

    @media (max-width: 1024px) {
        margin-left: auto;
        column-gap: 60px;
    }

    @media (max-width: 768px) {
        column-gap: 20px;
        width: 148px;
        min-width: 0px;
        max-width: 148px;
        margin-left: auto;
    }

    &__application-count {
        position: relative;
    }

    &__application-count a {
        display: block;
        width: 36px;
        height: 36px;
    }

    &__quantity-box {
        position: absolute;
        top: -7px;
        left: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Akrobat';
        font-size: 12px;
        line-height: 14px;
        width: 20px;
        height: 14px;
        background-color: #ffffff;
        color: #db0000;
    }

    &__location {
        max-width: 169px;

        @media (max-width: 768px) {
            display: flex;
        }
    }

    &__button {
        font-size: 14px;
        line-height: 18.5px;

        @media (max-width: 768px) {
            width: 36px;
            height: 36px;
            background-image: url('../../../app/assets/icon/location-mark.svg');
            background-position: center;

            span {
                display: none;
            }
        }
    }

    &__location-container {
        position: absolute;
        top: 100%;
        right: 0;
        width: 503px;
        height: 192px;
        padding: 32px 48px;
        border-radius: 10px;
        border: 1px solid #939393;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        z-index: 2;

        label {
            margin-bottom: 4px;
        }

        div {
            display: flex;
            justify-content: space-between;
        }
    }

    &__location-close {
        width: 24px;
        height: 24px;
        background-image: url('../../../app/assets/icon/close-location.svg');
        margin-left: auto;
        margin-right: -40px;
        margin-top: -24px;
    }
}

.btn.nav-user__button-agree,
.btn.nav-user__button-change {
    margin: 0;
    max-width: 175px;
    min-height: 52px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    text-transform: none;
}

.btn.nav-user__button-change {
    max-width: 212px;
    padding: 16px 40px;
    color: #35383f;
    border: 2px solid #35383f;
    background-color: #ffffff;
}

.v-input__control {
    padding-right: 4px 0;
    width: 100%;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
}
</style>
