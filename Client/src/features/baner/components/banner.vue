<template>
    <div class="user-metric">
        <div class="user-metric__top">
            <div class="user-metric__top-img-wrapper">
                <!-- Заглушка Банер -->

                <img
                    :src="imgDataUrl"
                    alt="Баннер личной страницы"
                    v-if="imgDataUrl"
                    v-show="true"
                />

                <img
                    src="@/app/assets/user-banner.jpg"
                    alt="Баннер личной страницы(пусто)"
                    v-else
                />

                <my-upload
                    field="baner"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    v-model="show"
                    :width="1100"
                    :height="200"
                    url="https://httpbin.org/post"
                    :params="params"
                    :headers="headers"
                    :no-circle="true"
                    img-format="jpg"
                    langType="ru"
                ></my-upload>
            </div>
            <v-menu min-width="200px" rounded>
                <template v-slot:activator="{ props }">
                    <v-btn class="user-metric__baner-add" icon v-bind="props">
                        <v-avatar size="large">
                            <v-icon icon="mdi-plus"></v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">
                            <v-btn
                                class="btn"
                                rounded
                                variant="text"
                                @click="toggleShow"
                            >
                                Добавить баннер
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn rounded variant="text" @click="deleteFile()">
                                Удалить баннер
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </div>
        <!-- Иконки редактирования банер -->

        <div class="user-metric__avatar-wrapper">
            <div class="user-metric__avatar">
                <!-- Аватар пользователя  -->

                <img
                    :src="imgAvatarUrl"
                    alt="Аватарка"
                    v-if="imgAvatarUrl"
                    v-showAvatar="true"
                />
                <img
                    id="profile-pic"
                    src="@app/assets/user-avatar.png"
                    alt="Аватарка(пусто)"
                    v-else
                />

                <my-upload
                    field="avatar"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    v-model="showAvatar"
                    :width="300"
                    :height="300"
                    url="https://httpbin.org/post"
                    :params="params"
                    :headers="headers"
                    :no-square="true"
                    img-format="png"
                    langType="ru"
                ></my-upload>
            </div>
            <!-- Иконки редактирования аватар -->
            <v-menu min-width="200px" rounded>
                <template v-slot:activator="{ props }">
                    <v-btn class="user-metric__avatar-add" icon v-bind="props">
                        <v-avatar size="large">
                            <v-icon icon="mdi-plus"></v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">
                            <v-btn
                                rounded
                                variant="text"
                                @click="toggleShowAvatar"
                            >
                                Добавить аватар
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                rounded
                                variant="text"
                                @click="deleteAvatar()"
                            >
                                Удалить аватар
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </div>
        <div class="user-metric__bottom">
            <!-- Данные пользователя  -->
            <div class="user-data__wrapper">
                <div class="user-data__name">
                    <h4>Иванов Иван Иванович</h4>
                </div>
                <div class="user-data__list-wrapper">
                    <ul class="user-data__list">
                        <li class="user-data__title"><p>Кандидат</p></li>

                        <li class="user-data__regional-office">
                            <p>Ленинградское отделение</p>
                        </li>
                    </ul>
                </div>
                <!-- Контакты пользователя  -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import myUpload from 'vue-image-crop-upload';

const show = ref(false);
const showAvatar = ref(false);

const params = ref({
    token: '123456798',
    name: 'avatar',
});

const headers = ref({
    smail: '*_~',
});

const imgDataUrl = ref(null);
const imgAvatarUrl = ref(null);

const toggleShow = () => {
    show.value = !show.value;
};

const toggleShowAvatar = () => {
    showAvatar.value = !showAvatar.value;
};

const cropSuccess = (data, field) => {
    console.log('-------- crop success --------');
    if (field == 'baner') {
        imgDataUrl.value = data;
    } else if (field == 'avatar') {
        imgAvatarUrl.value = data;
    }
};

const cropUploadSuccess = (data, field) => {
    console.log('-------- upload success --------');
    console.log(data);
    console.log('field: ' + field);
};

const cropUploadFail = (status, field) => {
    console.log('-------- upload fail --------');
    console.log(status);
    console.log('field: ' + field);
};

// const deleteFile = (field) => {
//     if (field == 'baner') {
//         imgDataUrl.value = '';
//     } else if (field == 'avatar') {
//         imgAvatarUrl.value = '';
//     }
// };

const deleteFile = () => {
    imgDataUrl.value = '';
};

const deleteAvatar = () => {
    imgAvatarUrl.value = '';
};
</script>
<style lang="scss" scoped>
.profile-settings-top {
    padding-top: 40px;
    margin-bottom: 40px;
}

.breadcrumbs-container ul {
    display: flex;
    list-style: none;
}

.breadcrumbs-slesh {
    margin: 0 4px;
}

.breadcrumbs-container a {
    display: block;
    text-decoration: none;
    /* хлебные_крошки */
    font-family: 'Akrobat';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.breadcrumbs-container a.active {
    display: block;
    text-decoration: none;
    /* хлебные_крошки */
    font-family: Akrobat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #1f7cc0;
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

/* Баннер с данными пользователя */
.user-metric {
    display: grid;
    grid-template-columns: 30px 135px 135px 2fr 64px;
    grid-template-rows: 100px 100px 112px auto;
    margin-bottom: 40px;
    /*  */
    border-radius: 10px 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(244, 244, 244, 0);
}

.user-metric__top {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 100px;
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 2;
    border-radius: 10px 10px 0px 0px;
}

.user-metric__top-img-wrapper {
    display: grid;
    grid-template-columns: 3fr;
    grid-template-rows: 200px;
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 3;
}

.user-metric__top img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
}

/* Иконки редактирования банер */
.user-metric__baner-add {
    display: grid;
    align-items: end;
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 2;
    grid-row-end: 3;
    margin: 0 16px 16px 0;
}

.user-metric__bottom {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
}

.user-metric__avatar-wrapper {
    display: grid;
    grid-template-columns: 160px 90px;
    grid-template-rows: 130px 80px;
    align-content: center;
    justify-content: center;
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
}

.user-metric__avatar {
    /*    display: grid;*/
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    width: 80%;
    height: 100%;
    border-radius: 50%;
}

.user-metric__avatar img {
    width: 90%;
    height: 90%;
    clip-path: circle(50%);
    object-fit: cover;
    border-radius: 50%;
}

/* Иконки редактирования аватар */
/* Иконка Изменить аватар */
.user-metric__avatar-add {
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
}

/* Данные пользователя */
.user-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 32px 300px;
}

.user-data__name {
    margin-bottom: 32px;
}

.user-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.user-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.user-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.user-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.user-data__list p,
.user-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.user-data__introductions {
    display: flex;
    align-items: center;
}

.user-data__introductions p,
.user-data__introductions img {
    margin-right: 5px;
}
</style>
