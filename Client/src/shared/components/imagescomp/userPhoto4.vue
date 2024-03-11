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
        <uploadPhoto4
            v-if="add"
            :photo="photo"
            @uploadUserPic="uploadUserPic"
        ></uploadPhoto4>
    </div>
</template>
<script setup>
import { uploadPhoto4} from '.';
const emit = defineEmits(['uploadUserPic, updateUserPic']);

const props = defineProps({
    photo: String,
    add: Boolean
});

const uploadUserPic = (userPic) => {
    emit('uploadUserPic', userPic);
};

</script>

<style>


</style>