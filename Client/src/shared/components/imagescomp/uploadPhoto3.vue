<template>
    <div class="avatar-edit my_photo__add">
        <v-menu min-width="200px" rounded v-if="!props.photo">
            <template v-slot:activator="{ props }">
                <v-btn class="user-metric__baner-add" icon v-bind="props">
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
                                    Добавить фото
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
                                    <v-btn :disabled="!userPhotos" color="blue-darken-1" variant="text" type="submit"
                                        @click="uploadPhoto()">
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
                                    <v-btn rounded variant="text" v-bind="props">
                                        Редактировать фото
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
                                        <v-btn :disabled="!userPhotos" color="blue-darken-1" variant="text"
                                            type="submit" @click="updatePhoto()">
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
                        <v-btn rounded variant="text" @click="deletePhoto()">
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
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const emit = defineEmits(['uploadUserPic, updateUserPic']);

const props = defineProps({
    photo: String,
});

const dialog = ref(false);
let preview = ref(null);
// const showPhoto = ref(false);
const isError = ref([]);
const swal = inject('$swal');
const cropper = ref();

const userPhotos = ref({
    photo3: null,
});

const cropImage = () => {
    if (cropper.value) {
        const { canvas } = cropper.value.getResult();
        preview.value = canvas.toDataURL('image/jpeg')
        canvas.toBlob((blob) => {
            userPhotos.value.photo3 = new File([blob], "photo1.jpg", { type: "image/jpeg" })
        }, 'image/jpeg');
    }
};

const selectFile = (event) => {
    userPhotos.value.photo3 = event.target.files[0];
    preview.value = URL.createObjectURL(userPhotos.value.photo3);
};

const uploadPhoto = async () => {
    dialog.value = true;
    const formData = new FormData();
    formData.append('photo3', userPhotos.value.photo3);

    await HTTP.patch('/rsousers/me/media/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
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
            emit('uploadUserPic', response.data.photo3);
            dialog.value = false;
            // console.log(response, 'photo uploaded');
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
const updatePhoto = async () => {
    let fd = new FormData();
    fd.append('photo3', userPhotos.value.photo3);
    dialog.value = true;
    await HTTP.put('/rsousers/me/media/', fd, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
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
            emit('uploadUserPic', response.data.photo3);
            dialog.value = false;
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

const deletePhoto = async () => {
    await HTTP.put('/rsousers/me/media/', userPhotos.value,)
        .then((response) => {
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
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
