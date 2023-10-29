<template>
    <div class="avatar-upload my_photo__edit">
        <!-- Заглушка по умолчанию  -->
        <div class="avatar-preview my_photo__plug">
            <img
                :src="imgPhotoUrl"
                alt="Фото пользователя"
                v-if="imgPhotoUrl"
                v-show="true"
            />

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Фото пользователя(пусто)"
                v-else
            />

            <my-upload
                field="photo"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="showPhoto"
                :width="280"
                :height="370"
                url="https://httpbin.org/post"
                :params="params"
                :headers="headers"
                :no-circle="true"
                img-format="jpg"
                langType="ru"
            ></my-upload>
        </div>
        <!-- Добавить фото -->
        <div class="avatar-edit my_photo__add">
            <v-menu min-width="200px" rounded v-if="!imgPhotoUrl">
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
                                @click="addPhoto"
                            >
                                Добавить фото
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
            <v-menu min-width="200px" rounded v-else>
                <template v-slot:activator="{ props }">
                    <v-btn class="user-metric__avatar-add" icon v-bind="props">
                        <v-avatar size="large">
                            <v-icon icon="mdi-pencil"></v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">
                            <v-btn rounded variant="text" @click="addPhoto">
                                Редактировать фото
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                rounded
                                variant="text"
                                @click="deletePhoto()"
                            >
                                Удалить фото
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import myUpload from 'vue-image-crop-upload';

const showPhoto = ref(false);

const params = ref({
    token: '123456798',
    name: 'image',
});

const headers = ref({
    smail: '*_~',
});

const imgPhotoUrl = ref(null);

const addPhoto = () => {
    showPhoto.value = !showPhoto.value;
};

const cropSuccess = (data, field) => {
    console.log('-------- crop success --------');
    if (field == 'photo') {
        imgPhotoUrl.value = data;
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

const deletePhoto = () => {
    imgPhotoUrl.value = '';
};
</script>
<style lang="scss">
 .my_photo__edit {
    display: grid;
    grid-template-columns: 1fr 68px;
    grid-template-rows: 1fr 68px;
    border-radius: 10px;
}
.avatar-preview,
.my_photo__plug {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    border-radius: 10px;
}

.my_photo__add,
.avatar-edit {
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    justify-content: center;
    align-content: center;
    z-index: 9;
}

.avatar-preview img,
.my_photo__plug img {
    width: 100%;
    height: 371px;
    object-fit: cover;
    border-radius: 10px;
}
</style>
