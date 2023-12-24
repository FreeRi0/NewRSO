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
                            <a class="header__nav-link" href="#">Мероприятия</a>
                        </li>
                        <li class="header__nav-item">
                            <a class="header__nav-link" href="/FAQ"
                                >Полезная информация</a
                            >
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
                        <!--прописать в span кнопки логику изменения ее названия-->
                        <span>Карачаево-Черкесское региональное отделение</span>
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
                        <Input
                            class="nav-user__input"
                            placeholder="Выберите свой регион"
                            name="your-region"
                            id="your-region"
                            type="text"
                        />

                        <div>
                            <Button
                                class="nav-user__button-agree"
                                label="Да, все верно"
                                color="primary"
                                size="large"
                                @click="show = !show"
                            ></Button>
                            <Button
                                class="nav-user__button-change"
                                label="Выбрать другой"
                                size="large"
                            ></Button
                            ><!--если переход на другую страницу, то переделать на ссылку-->
                        </div>
                    </div>
                </div>

                <div class="nav-user__menu user-menu" v-if="user">
                    <Dropdown
                        :items="userPages"
                        :image="true"
                        url="/assets/avatar-user.svg"
                        desc="Фотография пользователя"
                    />
                    <Button v-if="user" @click="LogOut" label="Выйти"></Button>
                    <p v-else>Not auth</p>
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { Dropdown } from '@shared/components/dropdown';
import { Button } from '@shared/components/buttons';
import { Input } from '@shared/components/inputs';
import { HTTP } from '@app/http';
import { ref, onMounted, watch } from 'vue';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';

const router = useRouter();

const pages = ref([
    { title: 'ЛСО', link: '/allSquads' },
    { title: 'Штабы СО ОО', link: '/AllHeadquarters' },
    { title: 'Местные штабы', link: '/LocalHeadquarters' },
    { title: 'Региональные штабы', link: '/RegionalHeadquarters' },
    { title: 'Окружные штабы', link: '/DistrictHeadquarters' },
    { title: 'Центральный штаб', link: '#' },
]);

const userPages = ref([
    { title: 'Моя страница', link: '/UserPage/' },
    { title: 'Мой отряд', link: '/allSquads' },
    { title: 'Штаб СО ОО', link: '/AllHeadquarters' },
    { title: 'Местный штаб', link: '/LocalHeadquarters' },
    { title: 'Региональный штаб', link: '/RegionalHeadquarters' },
    { title: 'Окружной штаб', link: '/DistrictHeadquarters' },
    { title: 'Активные заявки', link: '#' },
    { title: 'Поиск участников', link: '#' },
    { title: 'Членский взнос', link: '/contributorPay' },
    { title: 'Оформление справок', link: '/references' },
    { title: 'Настройки профиля', link: '/PersonalData' },
    { title: 'Выйти из ЛК', link: '#' },
]);

const show = ref(false);

const isOpen = ref(false);
const user = ref(null);


const removeClass = () => {
    const menu = navMenu.value;
    menu.classList.toggle('no-visible');
};


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

const LogOut = () => {
    localStorage.removeItem('Token');
    router.push('/');
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
});
</script>

<style lang="scss">
//убрала тег scoped потому что стили к кнопке dropdown не применялись

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    color: #35383f;
    position: relative;

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
        display: grid;
        grid-template-columns: auto auto auto;
        column-gap: 32px;
        align-items: center;
        min-width: 328px;
        max-width: 445px;

        @media (max-width: 1024px) {
            position: absolute;
            right: 0;
            top: calc(100%);
            padding: 28px;
            border-radius: 10px;
            grid-template-columns: 1fr;
            row-gap: 8px;
            background-color: #1f7cc0;
            z-index: 2;

            a {
                color: #ffffff;
            }
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
        padding: 16px 0;
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
        padding: 16px 0;

        svg {
            display: none;

            @media (max-width: 1024px) {
                display: block;
                stroke: #ffffff;
            }
        }

        @media (max-width: 1024px) {
            color: #ffffff;
        }
    }

    &__list {
        position: absolute;
        top: 100%;
        display: grid;
        row-gap: 8px;
        padding: 8px 28px;
        max-height: 820px; //---------------
        overflow-y: auto;
        border-radius: 0 0 10px 10px;
        background-color: #ffffff;
        z-index: 2;

        @media (max-width: 1024px) {
            position: relative;
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
            background-color: rgba(0, 0, 0, 0.2);

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
        padding: 16px 0;
        width: max-content;
    }
}

.user-menu {
    .dropdown {
        &__box-image {
            margin-right: 12px;
            width: 56px;

            @media (max-width: 1024px) {
                margin-right: 0;
            }

            @media (max-width: 360px) {
                width: 36px;
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
            min-width: 328px;
            padding: 28px;
            border-radius: 10px;
            background-color: #1f7cc0;

            @media (max-width: 1024px) {
                position: absolute;
                right: 96px;
                padding: 28px;
            }

            @media (max-width: 768px) {
                right: 84px;
            }

            @media (max-width: 360px) {
                right: 56px;
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
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    column-gap: 48px;
    // column-gap: 20px;
    align-items: center;
    max-width: 383px;
    flex-grow: 1;

    &__application-count a {
        display: block;
        width: 36px;
        height: 36px;
        background-image: url('../../../app/assets/icon/bell-light.svg');
    }

    &__location {
        max-width: 169px;

        @media (max-width: 360px) {
            display: flex;
            min-width: auto;
        }
    }

    &__button {
        font-size: 14px;

        @media (max-width: 360px) {
            width: 20px;
            height: 36px;
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

    @media (max-width: 1024px) {
        margin-left: auto;
        column-gap: 60px;
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
@shared/components/selects/inputs
