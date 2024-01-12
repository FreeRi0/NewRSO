<template>
    <div class="container">
        <header class="header">
            <ul class="header__logo">
                <li class="header__logo-rso">
                    <a href="https://трудкрут.рф/" target="_blank">
                        <img
                            src="@app/assets/logo/logo-rso-tablet.svg"
                            width="60"
                            height="58"
                            alt="Логотип сайта трудкрут.рф"
                        />
                    </a>
                </li>

                <li class="header__logo-labor-cool">
                    <a href="https://trudkrutshop.ru/" target="_blank">
                        <img
                            src="@app/assets/logo/logo-shop-tablet.svg"
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
                        <li class="header__nav-item" v-if="user">
                            <div class="nav-menu-item">
                                <Dropdown title="Структура" :items="pages" />
                            </div>
                        </li>
                        <li class="header__nav-item">
                            <a class="header__nav-link" href="/actionSquads"
                                >Мероприятия</a
                            >
                        </li>
                        <li class="header__nav-item">
                            <a class="header__nav-link" href="/FAQ"
                                >Полезная информация</a
                            >
                        </li>
                        <li class="header__nav-item">
                            <a class="header__nav-link" href="#">КОНКУРС!</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav class="header__nav nav-user">
                <div class="nav-user__application-count">
                    <a href=""
                        ><!--КОЛОКОЛЬЧИК ЭТО ССЫЛКА?? ЧТО ПРОИСХОДИТ ПРИ НАЖАТИИ??-->
                        <img
                            src="@app/assets/icon/bell-light.svg"
                            width="36"
                            height="36"
                            alt="Иконка уведомления"
                        />
                    </a>
                    <div class="nav-user__quantity"></div>
                </div>

                <div class="nav-user__location" v-if="user">
                    <button class="nav-user__button" @click="show = !show">
                        <!-- <img
                            class="nav-user__button-mobile"
                            src="@app/assets/icon/icon-location.svg"
                            width="36"
                            height="36"
                            alt="Иконка геолокации"
                        /> -->

                        <span v-if="user?.user_region?.reg_region"
                            >{{
                                regionals[user?.user_region?.reg_region - 1]
                                    .name
                            }}
                        </span>

                        <span v-else>Выберите региональное отделение</span>
                    </button>
                    <!-- <p>{{ user?.user_region?.reg_region }}</p> -->
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
                        <Select
                            variant="outlined"
                            clearable
                            name="select_education"
                            id="select-education"
                            placeholder="Ваш регион"
                            v-model="user.region"
                            address="regions/"
                        ></Select>

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
                <!-- <p>id: {{ user.id }}</p>
                <router-link  :to="{ name: 'userpage', params: { id: user.id } }">Моя страница</router-link> -->
                <div class="nav-user__menu user-menu" v-if="user">
                    <Dropdown
                        :items="userPages"
                        :image="true"
                        :url="user?.media?.photo"
                        desc="Фотография пользователя"
                    />

                    <!-- <img :src="user?.media?.photo" alt="userphoto"> -->
                    <!--
                    <Button v-if="user" @click="LogOut" label="Выйти"></Button> -->
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { Dropdown } from '@shared/components/dropdown';
import { Button } from '@shared/components/buttons';
// import { Input } from '@shared/components/inputs';
import { Select } from '@shared/components/selects';
import { HTTP } from '@app/http';
import { ref, onMounted, watch } from 'vue';
import { useRouter, onBeforeRouteUpdate, useRoute } from 'vue-router';

const router = useRouter();

const route = useRoute();
let id = route.params.id;

const pages = ref([
    { title: 'ЛСО', link: '/allSquads' },
    { title: 'Штабы СО ОО', link: '/AllHeadquarters' },
    { title: 'Местные штабы', link: '/LocalHeadquarters' },
    { title: 'Региональные штабы', link: '/RegionalHeadquarters' },
    { title: 'Окружные штабы', link: '/DistrictHeadquarters' },
    { title: 'Центральный штаб', link: '/CentralHQ' },
]);

const userPages = ref([
    { title: 'Моя страница', link: `/UserPage/` },
    { title: 'Мой отряд', link: '/allSquads' },
    { title: 'Штаб СО ОО', link: '/AllHeadquarters' },
    { title: 'Местный штаб', link: '/LocalHeadquarters' },
    { title: 'Региональный штаб', link: '/RegionalHeadquarters' },
    { title: 'Окружной штаб', link: '/DistrictHeadquarters' },
    { title: 'Центральный штаб', link: '/CentralHQ' },
    { title: 'Активные заявки', link: '/active' },
    { title: 'Поиск участников', link: '#' },
    { title: 'Членский взнос', link: '/contributorPay' },
    { title: 'Оформление справок', link: '/references' },
    { title: 'Настройки профиля', link: '/PersonalData' },
    { title: 'Выйти из ЛК', button: true },
]);

let show = ref(false);

const isOpen = ref(false);
const user = ref({
    region: null,
});

const navMenu = ref(null);

const removeClass = () => {
    const menu = navMenu.value;
    menu.classList.toggle('no-visible');
};

const regions = ref({});

const regionals = ref([]);

const getUser = async () => {
    await HTTP.get('/rsousers/me/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            console.log(user.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const updateRegion = async () => {
    await HTTP.patch('/rsousers/me/region/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            show = !show;
            console.log(user.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const getRegions = async () => {
    await HTTP.get(`/regions/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            regions.value = response.data;
            console.log(regions.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const getRegionals = async () => {
    await HTTP.get(`/regionals/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            regionals.value = response.data;
            console.log(regionals.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

// onBeforeRouteUpdate(async (to, from) => {
//     if (to.params.id !== from.params.id) {
//         getUser();
//     }
// });

// watch(
//     () => router.params.id,

//     (newId, oldId) => {
//         id = newId;
//         getUser();
//     },
// );

onMounted(() => {
    getUser();
    getRegions();
    getRegionals();
});
</script>

<style lang="scss">
//убрала тег scoped потому что стили к кнопке dropdown не применялись

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    color: #35383f;
    position: relative;
    border-bottom: 1px solid #d9d9d9;

    @media (max-width: 1024px) {
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
        column-gap: 30px;
        max-width: 146px;
        margin-right: 25px;

        @media (max-width: 1024px) {
            column-gap: 24px;
        }

        @media (max-width: 768px) {
            width: 88px;
            column-gap: 12px;
            margin-right: 36px;
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
        // display: grid;
        // grid-template-columns: auto auto auto;
        column-gap: 12px;
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        // min-width: 415px;
        max-width: 445px;

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

    &__nav-link {
        display: block;
        padding: 5px 0;

        @media (max-width: 1024px) {
            padding: 16px 0;
        }
    }
}

// .header__nav-container {
// .header__overlay {
//     display: none;

//     @media (max-width: 1024px) {
//         display: block;
//     }
// }

// &.no-visible {
//     @media (max-width: 1024px) {
//         display: none;
//     }
// }
// }
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
        max-height: 820px; //---------------
        width: 328px;
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
    }
}

.user-menu {
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
            // min-width: 328px;
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
    // display: grid;
    // grid-template-columns: min-content 1fr min-content;
    column-gap: 18px;
    // column-gap: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 242px;
    max-width: 383px;
    flex-grow: 1;
    margin-left: 25px;

    @media (max-width: 1024px) {
        margin-left: auto;
        column-gap: 60px;
    }

    @media (max-width: 768px) {
        column-gap: 20px;

        min-width: 148px;
        max-width: 204px;
        flex-grow: 1;
        // margin-left: 54px;
    }

    &__application-count a {
        display: block;
        width: 36px;
        height: 36px;
        background-image: url('../../../app/assets/icon/bell-light.svg');
    }

    &__location {
        max-width: 169px;

        @media (max-width: 768px) {
            display: flex;
            // min-width: auto;
        }
    }

    &__button {
        font-size: 14px;

        @media (max-width: 768px) {
            width: 36px;
            height: 36px;
            // margin-top: 5px;
            background-image: url('../../../app/assets/icon/location-mark.svg');
            background-position: center;
            // order: 1;

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

        // input {
        //   margin-bottom: 32px;
        //   font-weight: 600;
        // }

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
    min-height: 52px; //----свойство height из компонента не применилось(?)/удалить?
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
