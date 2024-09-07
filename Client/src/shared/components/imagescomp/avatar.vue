<template>
    <div class="user-metric__avatar-wrapper">
        <div class="user-metric__avatar">
            <!-- Аватар пользователя  -->

            <img v-if="avatar" :src="avatar" alt="avatarka" />
            <img v-else id="profile-pic" src="@app/assets/user-avatar.png" alt="Аватарка(пусто)" />
        </div>

        <!-- Иконка добавления аватара -->
        <v-menu min-width="200px" rounded v-if="!props.avatar && props.edited">
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
                                    Загрузить аватар
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">Загрузите ваше фото</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-file-input @change="selectFile" type="file" show-size
                                                prepend-icon="mdi-camera" counter />
                                        </v-row>
                                        <v-row class="align-center justify-end">
                                            <v-btn v-if="preview" class="button-wrapper mt-5" @click="cropImage()"
                                                prepend-icon="crop" variant="plain">Обрезать фото</v-btn>
                                        </v-row>
                                        <v-row v-if="preview">
                                            <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="preview"
                                                @change="onChangeCrop" :stencil-component="CircleStencil
                                                    " />
                                            <Preview :width="120" :height="120" :image="result.image" :coordinates="result.coordinates
                                                " class="mt-9" style="border-radius: 50%" />
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                        Закрыть
                                    </v-btn>
                                    <v-btn :disabled="!media" color="blue-darken-1" variant="text" type="submit"
                                        @click="uploadAvatar()">
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

        <v-menu min-width="200px" rounded v-else-if="props.avatar && props.edited">
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
                                    <v-btn rounded variant="text" v-bind="props">
                                        Редактировать аватар
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">Загрузите ваше фото</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-file-input @change="selectFile" type="file" show-size
                                                    prepend-icon="mdi-camera" counter />
                                            </v-row>
                                            <v-row class="align-center justify-end">
                                                <v-btn v-if="preview" class="button-wrapper mt-5" @click="cropImage()"
                                                    prepend-icon="crop" variant="plain">Обрезать фото</v-btn>
                                            </v-row>
                                            <v-row v-if="preview">
                                                <Cropper ref="cropper" class="cropper mt-5 mx-auto" :src="preview"
                                                    @change="onChangeCrop" :stencil-component="CircleStencil
                                                        " />
                                                <Preview :width="120" :height="120" :image="result.image" :coordinates="result.coordinates
                                                    " class="mt-9" style="border-radius: 50%" />
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                            Закрыть
                                        </v-btn>
                                        <v-btn :disabled="!media" color="blue-darken-1" variant="text" type="submit"
                                            @click="updateAvatar()">
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

                        <v-btn rounded variant="text" @click="deleteAvatar()">
                            Удалить фото
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
import { Cropper, Preview, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    avatar: String,
    edited: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['upload', 'update', 'delete']);
const media = ref({
    photo: null,
});
const cropper = ref();
let result = ref({
    coordinates: null,
    image: null,
});

// const route = useRoute();
const dialog = ref(false);
const preview = ref(null);
const isError = ref([]);
const swal = inject('$swal');

const cropImage = () => {
    if (cropper.value) {
        const { canvas } = cropper.value.getResult();
        preview.value = canvas.toDataURL('image/jpeg');
        canvas.toBlob((blob) => {
            media.value = new File([blob], 'photo1.jpg', {
                type: 'image/jpeg',
            });
        }, 'image/jpeg');
    }
};

const onChangeCrop = ({ coordinates, image }) => {
    result.value.coordinates = coordinates;
    result.value.image = image;
};

const selectFile = (event) => {
    media.value = event.target.files[0];
    preview.value = URL.createObjectURL(media.value);
};

const uploadAvatar = async () => {
    dialog.value = true;
    const formData = new FormData();
    // console.log('upload');

    formData.append('photo', media.value);
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
            emit('upload', response.data.photo);
            // console.log(response, 'avatar uploaded');
        })
        .catch(({ response }) => {
            console.log('err', response);
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
const updateAvatar = async () => {
    let fd = new FormData();
    fd.append('photo', media.value);
    dialog.value = true;
    await HTTP.put('/rsousers/me/media/', fd, {
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
            emit('update', response.data.photo);
            // console.log(response, 'updated');
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

const deleteAvatar = async () => {
    await HTTP.patch(
        '/rsousers/me/media/',
        { photo: null },
    )
        .then((response) => {
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });

            emit('delete', response.data.photo);
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

.user-metric__avatar {
    /*    display: grid;*/
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    width: 80%;
    height: 100%;
    border-radius: 50%;
    @media screen and (max-width: 320px) and (max-height:462px) {
    /*    display: grid;*/
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(3px)
}
    &-wrapper {
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
    &-add {
        display: grid;
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        
    }
}

.user-metric__avatar img {
    width: 90%;
    height: 90%;
    clip-path: circle(50%);
    object-fit: cover;
    border-radius: 50%;
}


.parent{

 .v-btn--icon.v-btn--density-default {
    background: rgba(0, 0, 0, 0.4);
    margin-right: 25px;

    @media screen and (max-width: 320px) and (max-height: 462px) {
        &:nth-of-type(1) { // Указываем, какой элемент таргетить
            margin-right: 15px;
            transform: translateY(120px) translateX(-20px);
        }
    }
}
}

.v-btn--icon.v-btn--density-default {
    background: rgba(0, 0, 0, 0.4);
    margin-right: 25px;
    transform: translateY(0px) translateX(0px);


    @media screen and (max-width: 320px) and (max-height: 462px) {
        margin-right: 25px;
        transform: translateY(20px) translateX(5px);
        &.banner{
            margin-right: 15px;
            transform: translateY(-80px) translateX(-20px);
        }
    }
}

.v-btn--icon {
    border-radius: 50%;
    border: 2px solid white;
    color: white;
    
    
    
}

.v-avatar i {
    color: white;
}


</style>
