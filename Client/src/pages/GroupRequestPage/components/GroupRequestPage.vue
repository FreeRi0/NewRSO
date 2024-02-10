<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <p class="main_title">Групповая заявка</p>
        <p class="subtitle">Подал:</p>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img
                    :src="requestHQ.hq.media.photo"
                    alt="logo"
                    v-if="requestHQ.hq.media"
                />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ requestHQ.hq.name }}
                </p>
            </div>
        </div>
        <div class="download">
            <a class="download_text">
                <img class="download_img" src="/assets/download.svg" />
                скачать список
            </a>
        </div>
        <div
            class="horizontallso-item__wrapper"
            v-for="value in requestUser.user"
            :key="value.id"
        >
            <div class="horizontallso-img">
                <img :src="value.media.photo" alt="logo" v-if="value.media" />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ value.first_name }}
                </p>
                <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ value.date_of_birth }}</p>
                </div>
            </div>
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
const requestUser = ref({
    id: 1,
    user: [
        {
            media: {
                photo: '123',
            },
            first_name: 'Kolya 1',
            date_of_birth: '01.01.2001',
        },
        {
            media: {
                photo: '123',
            },
            first_name: 'Kolya 2',
            date_of_birth: '01.01.2002',
        },
        {
            media: {
                photo: '123',
            },
            first_name: 'Kolya 3',
            date_of_birth: '01.01.2003',
        },
    ],
});
const requestHQ = ref({
    id: 1,
    hq: {
        media: {
            photo: '123124',
        },
        name: 'ССервО "Ромашка"',
    },
});
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
.download {
    float: right;
    margin-bottom: 12px;
    margin-top: 40px;
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
    margin-bottom: 24px;
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
    //margin-left: 12px;
    width: 100%;
    margin-top: 12px;
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
