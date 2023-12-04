<template>
    <div class="user-metric__avatar-wrapper">
        <div class="user-metric__avatar">
            <!-- Аватар пользователя  -->

            <img
                :src="imgAvatarUrl.photo"
                alt="Аватарка"
                v-if="imgAvatarUrl"
                v-photo="true"
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
                v-model="photo"
                @change="selectFile"
                :width="300"
                :height="300"
                :params="params"
                :headers="headers"
                :no-square="true"
                img-format="png"
                langType="ru"
            ></my-upload>
        </div>
        <!-- Иконки редактирования аватар -->
        <v-menu min-width="200px" rounded v-if="!imgAvatarUrl">
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
                        <v-btn rounded variant="text" @click="toggleShowAvatar()">
                            Добавить аватар
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
                        <v-btn rounded variant="text" @click="toggleEditShowAvatar()">
                            Редактировать аватар
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn rounded variant="text" @click="deleteAvatar()">
                            Удалить аватар
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
import axios from 'axios';

const photo = ref(null);
const imgAvatarUrl = ref(null);

let formData = new FormData();
formData.append('file', photo.value);

const params = ref({
    name: 'avatar'
});

const headers = ref({
    smail: '*_~',
    // Authorization: 'Token ' + localStorage.getItem('Token'),
});

const viewAvatar = async() => {
    await axios
         .get('api/v1/users/me/media/', {
             headers: {
                 Authorization: 'Token ' + localStorage.getItem('Token'),
             },
         })
         .then((response) => {
            imgAvatarUrl.value = response.data;
            console.log(imgAvatarUrl.value);
         })
        .catch(function (error) {
             console.log('an error occured ' + error);
         });
}

viewAvatar()

const selectFile = (event) => {
    photo.value = event.target.files[0];
}

const toggleShowAvatar = async() => {
    photo.value = !photo.value;
    console.log(photo.value, 'sssdd');
    let formData = new FormData();
    formData.append('image', photo.value);

    await axios
        .post('api/v1/users/me/media/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            console.log(response, 'avatar uploaded');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const toggleEditShowAvatar = async() => {
    photo.value = !photo.value;

    let formData = new FormData();
    formData.append('image', photo.value);

    await axios
        .put('api/v1/users/me/media/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            console.log(response, 'avatar edited');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const cropSuccess = (data, field) => {
    console.log('-------- crop success --------');
    if (field == 'avatar') {
        imgAvatarUrl.value = data;
    }
    console.log(imgAvatarUrl.value, 'url');
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


const deleteAvatar = async() => {

    await axios
         .delete('api/v1/users/me/media/', {
             headers: {
                 Authorization: 'Token ' + localStorage.getItem('Token'),
             },
         })
         .then((response) => {
             return response.data;
             console.log(response.data, 'avatar deleted');
         })
        .catch(function (error) {
             console.log('an error occured ' + error);
         });

          imgAvatarUrl.value = '';
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

.vue-image-crop-upload .vicp-wrap .vicp-operate a {
    padding: 4px 12px;
    border-radius: 10px;
    height: 42px;
    color: white;
    background: var(--primary);
    border: 1px solid var(--primary);
    &:hover {
        color: white;
        background: var(--primary);
    }
}
</style>
