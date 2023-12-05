<template>
    <div class="user-metric__avatar-wrapper">
        <div class="user-metric__avatar">
            <!-- Аватар пользователя  -->

            <img :src="file.photo" alt="Аватарка" v-if="file" v-photo="true" />
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
                    <div class="mx-auto text-center">
                        <v-btn
                            rounded
                            variant="text"
                            @click="toggleShowAvatar()"
                        >
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
                        <v-btn
                            rounded
                            variant="text"
                            @click="toggleEditShowAvatar()"
                        >
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
import { HTTP } from '@app/http';

const photo = ref(null);
const file = ref(null);

const params = ref({
    name: 'avatar',
});

const headers = ref({
    smail: '*_~',
    // Authorization: 'Token ' + localStorage.getItem('Token'),
});

const viewAvatar = async () => {
    await HTTP
        .get('/users/me/media/', {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then((response) => {
            file.value = response.data;
            console.log(file.value);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

viewAvatar();

const selectFile = (event) => {
    photo.value = event.target.files[0];
};

const toggleShowAvatar = async () => {
    photo.value = !photo.value;
    console.log(photo.value, 'sssdd');
};

const toggleEditShowAvatar = async () => {
    photo.value = !photo.value;

    let formData = new FormData();
    formData.append('image', photo.value);

    await HTTP
        .put('/users/me/media/', formData, {
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

const cropSuccess = async (data, field) => {
    console.log('-------- crop success --------');
    if (field == 'avatar') {
        // imgAvatarUrl.value = data;

        const blob = await (
            await fetch(
                'data:image/png;base64,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',
            )
        ).blob();
        const file = new File([blob], 'avatar.png', { type: blob.type });
        console.log(file, 'url');
    }
};

const cropUploadSuccess = async(data, field) => {
    console.log('-------- upload success --------');
    let formData = new FormData();
        formData.append('image', photo.value);

        await HTTP
            .post('/users/me/media/', formData, {
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
    console.log('field: ' + field);
};

const cropUploadFail = (status, field) => {
    console.log('-------- upload fail --------');
    console.log(status);
    console.log('field: ' + field);
};

const deleteAvatar = async () => {
    await HTTP
        .delete('/users/me/media/', {
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

    file.value = '';
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
