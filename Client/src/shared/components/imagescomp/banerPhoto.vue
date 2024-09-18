<template>
    <div class="user-metric__top">
        <div class="user-metric__top-img-wrapper">
            <!-- Заглушка Банер -->

            <img v-if="banner" :src="banner" alt="Баннер личной страницы" />

            <img v-else src="@/app/assets/user-banner.jpg" alt="Баннер личной страницы(пусто)" />
        </div>
        <v-menu min-width="200px" rounded v-if="!props.banner && props.edited">
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
                                    Изменить баннер
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
                                        @click="uploadBanner()">
                                        Загрузить
                                    </v-btn>
                                </v-card-actions>
                                <p class="error" v-if="isError.detail">
                                    {{ isError.detail }}
                                </p>
                            </v-card>
                        </v-dialog>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-menu>
        <v-menu min-width="200px" rounded v-else-if="props.banner && props.edited">
            <template v-slot:activator="{ props }">
                <v-btn class="user-metric__avatar-add banner" icon v-bind="props" >
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
                                    <v-btn rounded variant="text" v-bind="props">
                                        Редактировать баннер
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">Загрузите ваш банер</span>
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
                                            @click="updateBanner()">
                                            Загрузить
                                        </v-btn>
                                    </v-card-actions>
                                    <p class="error" v-if="isError.detail">
                                        {{ isError.detail }}
                                    </p>
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
import { ref, inject } from 'vue';
import { HTTP } from '@app/http';
// import { useRoute } from 'vue-router';
// const route = useRoute();
// const id = route.params.id;
const dialog = ref(false);
// const imgDataUrl = ref(null);
const preview = ref(null);
const isError = ref([]);
const swal = inject('$swal');
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const emit = defineEmits(['uploadWall, updateWall', 'deleteWall']);

const props = defineProps({
    banner: String,
    edited: {
        type: Boolean,
        default: false,
    }
});
// const file = ref(null);
const media = ref({
    banner: null,
});
const cropper = ref();

const cropImage = () => {
    if (cropper.value) {
        const { canvas } = cropper.value.getResult();
        preview.value = canvas.toDataURL('image/jpeg')
        canvas.toBlob((blob) => {
            media.value = new File([blob], "photo1.jpg", { type: "image/jpeg" })
        }, 'image/jpeg');
    }
};

const selectBanner = (event) => {
    media.value = event.target.files[0];
    preview.value = URL.createObjectURL(media.value);
};

const uploadBanner = async () => {
    dialog.value = true;
    const formData = new FormData();
    formData.append('banner', media.value);
    await HTTP.patch('/rsousers/me/media/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
        },
    })
        .then((response) => {
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            dialog.value = false;
            // console.log('resp', response.data);
            emit('uploadWall', response.data.banner);
            // console.log(response, 'banner uploaded');
        })
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};

const updateBanner = async () => {
    dialog.value = true;
    const formData = new FormData();
    formData.append('banner', media.value);
    await HTTP.put('/rsousers/me/media/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
        },
    })
        .then((response) => {
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            dialog.value = false;
            emit('updateWall', response.data.banner);
            // console.log(response, 'banner uploaded');
        })
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};
const deleteBanner = async () => {
    await HTTP.put(
        '/rsousers/me/media/',
        { banner: null },
    )
        .then((response) => {
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            emit('deleteWall', response.data.banner);
            // console.log(response, 'deleted');
        })
    .catch(({ response }) => {
        isError.value = response.data;
        console.error('There was an error!', response.data);
        swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'ошибка',
            showConfirmButton: false,
            timer: 1500,
        });
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
    &-sp{
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
    &-hq{
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

}

.user-metrichq__baner-add {
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

@media screen and (max-width: 320px) and (max-height:462px) {
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
        width: 91.13%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0px 0px;
        transform: translateX(-1px);
        

    }
    
    &-hq{
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
