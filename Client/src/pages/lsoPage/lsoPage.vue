<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <h1 class="title title--lso">ЛСО</h1>
        <BannerComp class="user-metric mt-3">
            <template #banner>
                <div class="user-data__wrapper">
                    <div class="Squad-HQ__name">
                        <h4>{{ squadHQ.name }}</h4>
                    </div>
                    <div class="slogan">
                        <p>{{ squadHQ.slogan }}</p>
                    </div>
                    <div class="user-data__list-wrapper">
                        <ul class="Squad-HQ__list">
                            <li class="Squad-HQ__university">
                                <p>{{ squadHQ.university }}</p>
                            </li>
                            <li class="Squad-HQ__date">
                                <p>Дата создания ЛСО</p>
                                <img
                                    src="@/app/assets/icon/calendar.svg"
                                    alt="calendar"
                                />
                                <time datetime="2022-09-10">10.09.2022</time>
                            </li>
                        </ul>
                    </div>
                    <div class="squad-data__contacts-wrapper">
                        <div class="squad-data__contacts">
                            <div class="squad-data__participant-counter">
                                <span>356 участников</span>
                            </div>
                            <div class="squad-data__social-network">
                                <div class="squad-data__link-vk">
                                    <a href="https://vk.com" target="_blank">
                                        <img
                                            src="@/app/assets/icon/vk-blue.svg"
                                        />
                                    </a>
                                </div>
                                <div class="squad-data__link-telegram">
                                    <a href="https://t.me" target="_blank">
                                        <img
                                            src="@/app/assets/icon/telegram-blue.svg"
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <div class="squad-data__link-share-link">
                                    <a href="#" target="_blank">
                                        <img
                                            src="@/app/assets/icon/to-share-link.svg"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <router-link to="/" class="user-data__link"
                            >Редактировать страницу</router-link
                        >
                    </div>
                </div>
            </template>
        </BannerComp>
        <AboutSquad></AboutSquad>
        <v-row class="mt-8">
            <v-col v-for="n in 4" :key="n" class="d-flex">
                <photos></photos>
            </v-col>
        </v-row>
        <SquadParticipants></SquadParticipants>
    </div>
</template>
<script setup>
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { BannerComp } from '@features/baner/components';
import AboutSquad from './components/AboutSquad.vue';
import { photos } from '@shared/components/imagescomp';
import SquadParticipants from './components/SquadParticipants.vue';
import { ref } from 'vue';

const squadHQ = ref({
    name: 'СCО «Инвар»',
    slogan: 'Через тернии к звездам!',
    university: 'Коми государственный педагогический институт',
});

const pages = [
    { pageTitle: 'Личный кабинет', href: '#' },
    { pageTitle: 'ССО «Инвар»', href: '#' },
];
</script>
<style scoped lang="scss">
.title {
    //-----------------------------------общий класс для всех заголовков h1
    // font-family: ;
    font-size: 52px;
    line-height: 62px;
    font-weight: 700;
    color: #35383f;

    &--lso {
        margin-bottom: 50px;
    }
}
.user-data__wrapper {
    margin: 20px 0 12px 298px;
}
/* Данные отряда */
.Squad-HQ__name {
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
.slogan {
    margin-top: 20px;
    margin-bottom: 9.5px;
}
.Squad-HQ__list {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 380px 300px;
}
.Squad-HQ__list li {
    border-right: none;
    height: 20px;
    margin: 0;
}
.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}
.Squad-HQ__date {
    display: flex;
}
.Squad-HQ__date p {
    margin-right: 22px;
}
.user-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}
.squad-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;
}
.squad-data__contacts {
    display: grid;
}
.squad-data__contacts {
    display: flex;
    flex-direction: column;
}
.squad-data__social-network {
    display: flex;
    justify-content: space-between;
    margin: 16px 16px 0px 0px;
}

@media (max-width: 1110px) {
    .Squad-HQ__list {
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    }
    .Squad-HQ__university p {
        border-right: 0;
        margin-right: 0;
        padding-right: 0;
    }
    .Squad-HQ__list li {
        margin-bottom: 8px;
    }
}
@media (max-width: 790px) {
    .squad-data__contacts-wrapper {
        flex-direction: column;
    }
    .user-data__link {
        align-self: start;
    }
    .squad-data__social-network {
        justify-content: start;
        margin: 16px 16px 20px 0px;
        gap: 12px;
    }
}
@media (max-width: 730px) {
    .user-data__wrapper {
        margin: 20px 0 12px 265px;
    }
    .user-metric {
        grid-template-columns: 15px 135px 135px 2fr 16px;
    }
}
@media (max-width: 690px) {
    .user-metric {
        grid-template-columns: 3fr 0fr 16fr 1fr;
    }
    .user-data__wrapper {
        margin: 105px 5px 20px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .Squad-HQ__university p {
        text-align: center;
    }
    .Squad-HQ__list li {
        justify-content: center;
    }
    .squad-data__contacts {
        align-self: center;
    }
}
@media (max-width: 430px) {
    .user-metric {
        grid-template-columns: 6fr 0fr 16fr 1fr;
    }
}
@media (max-width: 415px) {
    .Squad-HQ__list {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        row-gap: 30px;
    }
}
</style>
