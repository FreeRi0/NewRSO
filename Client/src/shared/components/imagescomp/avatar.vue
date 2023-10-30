<template>
    <div class="user-metric__avatar-wrapper">
        <div class="user-metric__avatar">
            <!-- Аватар пользователя  -->

            <img
                :src="imgAvatarUrl"
                alt="Аватарка"
                v-if="imgAvatarUrl"
                v-showAvatar="true"
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
                v-model="showAvatar"
                :width="300"
                :height="300"
                url="https://httpbin.org/post"
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
                        <v-btn rounded variant="text" @click="toggleShowAvatar">
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
                        <v-btn rounded variant="text" @click="toggleShowAvatar">
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

const showAvatar = ref(false);

const params = ref({
    token: '123456798',
    name: 'avatar',
});

const headers = ref({
    smail: '*_~',
});

const toggleShowAvatar = () => {
    showAvatar.value = !showAvatar.value;
};

const cropSuccess = (data, field) => {
    console.log('-------- crop success --------');
    if (field == 'avatar') {
        imgAvatarUrl.value = data;
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
const deleteAvatar = () => {
    imgAvatarUrl.value = '';
};

const imgAvatarUrl = ref(null);
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
