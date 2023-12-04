<template>
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
                v-model="banner"
                :width="1100"
                :height="200"
                url="api/v1/users/me/media/"
                :params="params"
                :headers="headers"
                :no-circle="true"
                img-format="jpg"
                langType="ru"
            ></my-upload>
        </div>
        <v-menu min-width="200px" rounded v-if="!imgDataUrl">
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
                            Добавить банер
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-menu>
        <v-menu min-width="200px" rounded v-else>
            <template v-slot:activator="{ props }">
                <v-btn class="user-metric__baner-add" icon v-bind="props">
                    <v-avatar size="large">
                        <v-icon icon="mdi-pencil"></v-icon>
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
                            Редактировать банер
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn rounded variant="text" @click="deleteFile()">
                            Удалить банер
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-menu>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import myUpload from 'vue-image-crop-upload';
const banner = ref(false);

const params = ref({
    name: 'avatar',
});

const headers = ref({
    smail: '*_~',
    token: 'Token ' + localStorage.getItem('Token'),
});

const imgDataUrl = ref(null);

const toggleShow = () => {
    banner.value = !banner.value;
};

const cropSuccess = (data, field) => {
    console.log('-------- crop success --------');
    if (field == 'baner') {
        imgDataUrl.value = data;
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

const deleteFile = () => {
    imgDataUrl.value = '';
};
</script>
<style lang="scss">
.user-metric__top {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 100px;
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 2;
    border-radius: 10px 10px 0px 0px;
    &-img-wrapper {
        display: grid;
        grid-template-columns: 3fr;
        grid-template-rows: 200px;
        grid-column-start: 1;
        grid-column-end: 6;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0px 0px;
    }
}

.user-metric__baner-add {
    display: grid;
    align-items: end;
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 2;
    grid-row-end: 3;
    margin: 0 16px 16px 0;
}
</style>
