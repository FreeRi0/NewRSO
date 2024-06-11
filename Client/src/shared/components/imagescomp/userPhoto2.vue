<template>
    <div class="avatar-upload my_photo__edit">
        <!-- Заглушка по умолчанию  -->
        <div class="avatar-preview my_photo__plug" >
            <img :src="photo" alt="Фото пользователя" v-if="photo" />

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Фото пользователя(пусто)"
                v-else

            />
        </div>
        <!-- Добавить фото -->
        <uploadPhoto2
            v-if="add"
            :photo="photo"
            @uploadUserPic="uploadUserPic"
        ></uploadPhoto2>
    </div>
</template>
<script setup>
import { uploadPhoto2 } from '.';
const emit = defineEmits(['uploadUserPic, updateUserPic']);

const props = defineProps({
    photo: String,
    add: Boolean
});

const uploadUserPic = (userPic) => {
    // console.log('photoUser', userPic);
    emit('uploadUserPic', userPic);
    // console.log('userPic Uploaded!');
};
</script>
