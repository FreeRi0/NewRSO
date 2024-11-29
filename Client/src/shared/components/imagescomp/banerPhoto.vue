<template>  
    <div class="user-metric__top">  
        <div class="user-metric__top-img-wrapper">  
            <!-- Заглушка Банер -->  
            <img v-if="banner" :src="banner" alt="Баннер личной страницы" />  
            <img v-else src="@/app/assets/user-banner.jpg" alt="Баннер личной страницы (пусто)" />  
        </div>  
        
        <v-menu min-width="200px" rounded v-if="props.edited">  
            <template v-slot:activator="{ props }">  
                <v-btn class="user-metric__avatar-add" icon v-bind="props">  
                    <v-avatar size="large">  
                        <v-icon :icon="banner ? 'mdi-pencil' : 'mdi-plus'"></v-icon>  
                    </v-avatar>  
                </v-btn>  
            </template>  
            <v-card>  
                <v-card-text>  
                    <div class="mx-auto text-center">  
                        <v-dialog v-model="dialog" width="1024">  
                            <template v-slot:activator="{ props }">  
                                <v-btn rounded variant="text" v-bind="props">  
                                    {{ banner ? 'Редактировать' : 'Загрузить' }} баннер  
                                </v-btn>  
                            </template>  
                            <v-card>  
                                <v-card-title>  
                                    <span class="text-h5">Загрузите ваш баннер</span>  
                                </v-card-title>  
                                <v-card-text>  
                                    <v-container>  
                                        <v-row>  
                                            <v-file-input @change="selectBanner" type="file" show-size  
                                                prepend-icon="mdi-camera" counter />  
                                        </v-row>  
                                        <v-row class="align-center justify-end">  
                                            <v-btn v-if="preview" class="button-wrapper mt-5" @click="cropImage()"  
                                                prepend-icon="crop" variant="plain">Обрезать фото</v-btn>  
                                        </v-row>  
                                        <v-row>  
                                            <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="preview" />  
                                        </v-row>  
                                    </v-container>  
                                </v-card-text>  
                                <v-card-actions>  
                                    <v-spacer></v-spacer>  
                                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">  
                                        Закрыть  
                                    </v-btn>  
                                    <v-btn :disabled="!media" color="blue-darken-1" variant="text" type="submit"  
                                        @click="banner ? updateBanner() : uploadBanner()">  
                                        Загрузить  
                                    </v-btn>  
                                </v-card-actions>  
                                <p class="error" v-if="isError.detail">{{ isError.detail }}</p>  
                            </v-card>  
                        </v-dialog>  
                        <v-divider class="my-3" v-if="banner"></v-divider>  
                        <v-btn v-if="banner" rounded variant="text" @click="deleteBanner()">  
                            Удалить баннер  
                        </v-btn>  
                    </div>  
                </v-card-text>  
            </v-card>  
        </v-menu>  
    </div>  
</template>

<script setup>
import { ref, inject } from 'vue';
import { HTTP } from '@app/http';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const dialog = ref(false);
const preview = ref(null);
const isError = ref([]);
const swal = inject('$swal');

const emit = defineEmits(['uploadWall', 'updateWall', 'deleteWall']);

const props = defineProps({
    banner: String,
    edited: {
        type: Boolean,
        default: false,
    }
});

const media = ref(null);
const cropper = ref();

const showSuccessAlert = (message) => {
    swal.fire({
        position: 'top-center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
    });
};

const showErrorAlert = (error) => {
    isError.value = error;
    console.error('There was an error!', error);
    swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'ошибка',
        showConfirmButton: false,
        timer: 1500,
    });
};

const cropImage = () => {
    if (cropper.value) {
        const { canvas } = cropper.value.getResult();
        preview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            media.value = new File([blob], "photo1.jpg", { type: "image/jpeg" });
        }, 'image/jpeg');
    }
};

const selectBanner = (event) => {
    media.value = event.target.files[0];
    preview.value = URL.createObjectURL(media.value);
};

const handleBannerRequest = async (method, url, action) => {
    dialog.value = true;
    const formData = new FormData();
    formData.append('banner', media.value);

    try {
        const response = await HTTP[method](url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        showSuccessAlert('успешно');
        dialog.value = false;
        emit(action, response.data.banner);
    } catch ({ response }) {
        showErrorAlert(response.data);
    }
};

const uploadBanner = () => {
    handleBannerRequest('patch', '/rsousers/me/media/', 'uploadWall');
};

const updateBanner = () => {
    handleBannerRequest('put', '/rsousers/me/media/', 'updateWall');
};

const deleteBanner = async () => {
    try {
        const response = await HTTP.put('/rsousers/me/media/', { banner: null });
        showSuccessAlert('успешно');
        emit('deleteWall', response.data.banner);
    } catch ({ response }) {
        showErrorAlert(response.data);
    }
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

    &-sp {
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

    &-hq {
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

}


@media (max-width: 690px) {
    .user-metric__top {
        grid-template-rows: 16px 100px;
    }
}

@media screen and (min-width: 320px) and (max-width: 480px) {
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
            height: 100%;
            object-fit: cover;
            border-radius: 10px 10px 0px 0px;

        }

        &-hq {
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

    }
}
</style>
