<template>
    <div class="user-metric__top">
        <div class="user-metric__top-img-wrapper">
            <!-- Заглушка Банер -->

            <img
                v-if="imgDataUrl"
                :src="imgDataUrl.media.banner"
                alt="Баннер личной страницы"
            />

            <img
                v-else
                src="@/app/assets/user-banner.jpg"
                alt="Баннер личной страницы(пусто)"
            />
        </div>
        <v-menu min-width="200px" rounded v-if="!file">
            <template v-slot:activator="{ props }">
                <v-btn class="user-metric__avatar-add" icon v-bind="props">
                    <v-avatar size="large">
                        <v-icon icon="mdi-plus"></v-icon>
                    </v-avatar>
                </v-btn>
            </template>
            <v-card>
                <v-card-text>
                    <v-row justify="center">
                        <v-dialog v-model="dialog" width="1024">
                            <template v-slot:activator="{ props }">
                                <v-btn rounded variant="text" v-bind="props">
                                    Добавить баннер
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5"
                                        >Загрузите ваш баннер</span
                                    >
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-file-input
                                                @change="selectBanner"
                                                show-size
                                                prepend-icon="mdi-camera"
                                                counter
                                            ></v-file-input>
                                        </v-row>
                                        <v-row>
                                            <v-card class="mt-5 mx-auto">
                                                <img
                                                    v-if="preview"
                                                    :src="preview"
                                                />
                                            </v-card>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue-darken-1"
                                        variant="text"
                                        @click="dialog = false"
                                    >
                                        Закрыть
                                    </v-btn>
                                    <v-btn
                                        :disabled="!file"
                                        color="blue-darken-1"
                                        variant="text"
                                        type="submit"
                                        @click="uploadBanner()"
                                    >
                                        Загрузить
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row>
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
                        <v-row justify="center">
                            <v-dialog v-model="dialog" width="1024">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        rounded
                                        variant="text"
                                        v-bind="props"
                                    >
                                        Редактировать баннер
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5"
                                            >Загрузите ваш банер</span
                                        >
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-file-input
                                                    @change="selectBanner"
                                                    show-size
                                                    prepend-icon="mdi-camera"
                                                    counter
                                                ></v-file-input>
                                            </v-row>
                                            <v-row>
                                                <v-card class="mt-5 mx-auto">
                                                    <img
                                                        v-if="preview"
                                                        :src="preview"
                                                    />
                                                </v-card>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue-darken-1"
                                            variant="text"
                                            @click="dialog = false"
                                        >
                                            Закрыть
                                        </v-btn>
                                        <v-btn
                                            :disabled="!file"
                                            color="blue-darken-1"
                                            variant="text"
                                            type="submit"
                                            @click="updateBanner()"
                                        >
                                            Загрузить
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                        <v-divider class="my-3"></v-divider>
                        <v-btn rounded variant="text" @click="deleteBanner()">
                            Удалить баннер
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
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;
const dialog = ref(false);
const imgDataUrl = ref(null);
const preview = ref(null);
const file = ref(null);

const viewBanner = async () => {
    await HTTP.get(`/rsousers/${id}/`, {
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

viewBanner();

const selectBanner = (event) => {
    file.value = event.target.files[0];
    preview.value = URL.createObjectURL(file.value);
};

const uploadBanner = async () => {
    dialog.value = true;
    const formData = new FormData();
    formData.append('banner', file.value);
    await HTTP.post('/rsousers/me/media/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            dialog.value = false;
            viewBanner();
            console.log(response, 'banner uploaded');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const updateBanner = async () => {
    const fd = new FormData();
    fd.append('banner', file.value);
    dialog.value = true;
    await HTTP.put('/rsousers/me/media/', fd, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            dialog.value = false;
            viewBanner();
            console.log(response, 'banner updated');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const deleteBanner = async () => {
    await HTTP.delete('/rsousers/me/media/', {
        headers: {
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            console.log(response, 'deleted');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
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
