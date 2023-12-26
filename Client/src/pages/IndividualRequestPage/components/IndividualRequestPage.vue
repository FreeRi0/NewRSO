<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <p class="main_title">Индивидуальная заявка</p>
        <p class="subtitle">Подал:</p>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img
                    :src="request.user.media.photo"
                    alt="logo"
                    v-if="request.user.media"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ request.user.first_name }}
                </p>
                <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ request.user.date_of_birth }}</p>
                </div>
            </div>
        </div>
        <p class="subtitle">Укажите размер футболки:</p>
        <p>{{ request.size }}</p>
        <p class="subtitle">Расскажите о себе:</p>
        <p>{{ request.about }}</p>
        <p class="subtitle">Сопутствующие документы:</p>
        <div class="file">
            <div class="file_name">
                <img class="file_img" src="/assets/file_dock.svg" />{{
                    request.file
                }}
            </div>
            <a class="download_text" :href="request.file" target="_blank">
                <img class="download_img" src="/assets/download.svg" />
                скачать файл
            </a>
        </div>
        <div class="button">
            <button type="submit" class="deny_button">Отклонить</button>
            <button type="submit" class="submit_button">Одобрить</button>
        </div>
    </div>
</template>

<script setup>
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { ref } from 'vue';
const pages = ref([
    { pageTitle: 'Мероприятия', href: '#' },
    { pageTitle: 'Мистер и Мисс РСО | Санкт-пете...', href: '#' },
    { pageTitle: 'Заявка на участие', href: '#' },
]);
const request = {
    id: 1,
    user: {
        media: {
            photo: '123as',
        },
        first_name: 'Kolya Kolya',
        date_of_birth: '01.01.2000',
    },
    size: 'XL',
    about: 'Я классный парень, готов помогать на мероприятии, работать 24/7. Легко нахожу общий язык со всеми.',
    file: 'Согласие_на_обработку_перс_данных_Васильев.png',
};
</script>

<style lang="scss" scoped>
.file_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.file_name {
    display: flex;
    flex-wrap: nowrap;
    color: #35383f;
    font-size: 16px;
    font-style: normal;
    align-items: center;
    font-weight: 400;
    line-height: 20px;
    text-decoration-line: underline;
}
.download_text {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: #1f7cc0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.download_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 40px;
    margin-right: 4px;
}
.file {
    display: flex;
    flex-wrap: nowrap;
}
.container {
    margin: 0 auto;
    padding: 60px 130px;
}
.deny_button {
    border-radius: 10px;
    border: 2px solid #35383f;
    padding: 16px 32px;
}
.submit_button {
    border-radius: 10px;
    background: #39bfbf;
    padding: 16px 32px;
    margin-left: 20px;
    color: #fff;
}
.button {
    padding-top: 60px;
    //margin-left: 20px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
}
.main_title {
    margin: 40px 0px;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.subtitle {
    margin: 20px 0px;
    leading-trim: both;
    text-edge: cap;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;
    input {
        width: 24px;
        height: 24px;
    }
}
.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;
    padding: 4px 20px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-left: 12px;
    width: 100%;
    margin-bottom: 12px;
}
.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.horizontallso-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}
.horizontallso-item__list-full {
    color: #35383f;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}
.horizontallso {
    display: flex;
    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;
        img {
            display: flex;
            position: relative;
            align-items: center;
        }
    }
}
</style>
