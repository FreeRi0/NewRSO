<template>
    <div class="user-metric__top">
        <div class="user-metric__top-img-wrapper">
            <!-- Заглушка Банер -->

            <!-- <img
                :src="imgDataUrl.banner"
                alt="Баннер личной страницы"
                v-if="imgDataUrl"
                v-show="true"
            /> -->

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Баннер личной страницы(пусто)"
            />
            <!-- url="http://127.0.0.1:8000/api/v1/users/me/media/" -->

            <my-upload
                field="banner"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                :width="1100"
                @change="onChangeFileUpload"
                :height="200"
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
import { ref, onMounted } from 'vue';
import myUpload from 'vue-image-crop-upload';
import { HTTP } from '@app/http';

const imgDataUrl = ref(null);
const show = ref(false);
const file = ref(null);

const viewBanner = async () => {
    await HTTP.get('/users/me/media/', {
        headers: {
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            imgDataUrl.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

// viewBanner();

const onChangeFileUpload = (event) => {
    file.value = event.target.files[0];
};

const params = ref({
    name: 'banner',
});

const headers = ref({
    smail: '*_~',
    token: 'Token ' + localStorage.getItem('Token'),
});

const toggleShow = () => {
    show.value = !show.value;
    let data = new FormData();
    data.append('banner', file.value);
    HTTP.post('/users/me/media/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then(function (response) {
            console.log(response.data, 'sucsess');
        })
        .catch(function (error) {
            console.log('FAILURE!!', error);
        });
};

const cropSuccess = (field, data) => {
    console.log('-------- crop success --------');
    if (field == 'banner') {
        imgDataUrl.value = data;
    }
};

const cropUploadSuccess = (data, field) => {
    console.log(data);
    console.log('-------- upload success --------');
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

@media (max-width: 690px) {
    .user-metric__top {
        grid-template-rows: 16px 100px;
    }
}
</style>
