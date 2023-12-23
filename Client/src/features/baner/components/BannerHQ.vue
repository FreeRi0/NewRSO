<template>
    <div class="hq-metric">
        <hqBanner :banner="hq.banner"></hqBanner>
        <hqAvatar :emblem="hq.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ headquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p>{{ headquarter.slogan }}</p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__university">
                            <p>{{ edict.name }}</p>
                        </li>
                        <li class="Squad-HQ__date">
                            <p>Дата создания ЛСО</p>
                            <img
                                src="@/app/assets/icon/calendar.svg"
                                alt="calendar"
                            />
                            <time datetime="2022-09-10">{{
                                hq.founding_date
                            }}</time>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__participant-counter">
                            <span>{{ member.length }} участников</span>
                        </div>
                        <div class="hq-data__social-network">
                            <div class="hq-data__link-vk">
                                <a href="https://vk.com" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram">
                                <a href="https://t.me" target="_blank">
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a href="#" target="_blank">
                                    <img
                                        src="@/app/assets/icon/to-share-link.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <router-link to="/edithq" class="hq-data__link"
                        >Редактировать штаб</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { hqAvatar } from '@shared/components/imagescomp';
import { hqBanner } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const props = defineProps({
    banner: {
        type: String,
    },
    emblem: {
        type: String,
    },
    headquarter: {
        type: Object,
        required: true,
    },
    edict: {
        type: Object,
    },
    member: {
        type: Object,
    },
});
</script>
<style lang="scss" scoped>
.hq-metric {
    display: grid;
    grid-template-columns: 30px 135px 135px 2fr 16px;
    grid-template-rows: 100px 100px 112px auto;
    margin-bottom: 40px;
    /*  */
    border-radius: 10px 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(244, 244, 244, 0);
    &__bottom {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 3;
        grid-row-end: 5;
    }
}

.ps__title {
    margin: 40px 0;
}

.ps__title h2 {
    /* Desktop/H-1 */
    font-family: 'Akrobat';
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #35383f;
}

/* Данные пользователя */
.hq-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 32px 300px;
}

.hq-data__name {
    margin-bottom: 32px;
}

.hq-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.hq-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.hq-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.hq-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.hq-data__list p,
.hq-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.hq-data__introductions {
    display: flex;
    align-items: center;
}

.hq-data__introductions p,
.hq-data__introductions img {
    margin-right: 5px;
}

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
.hq-data__link {
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
.hq-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;
}
.hq-data__contacts {
    display: grid;
}
.hq-data__contacts {
    display: flex;
    flex-direction: column;
}
.hq-data__social-network {
    display: flex;
    justify-content: space-between;
    margin: 16px 16px 0px 0px;
}
</style>
