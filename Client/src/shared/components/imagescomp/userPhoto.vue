<template>
    <div class="avatar-upload my_photo__edit">
        <!-- Заглушка по умолчанию  -->
        <div class="avatar-preview my_photo__plug">
            <img :src="photo" alt="Фото пользователя" v-if="photo" />

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Фото пользователя(пусто)"
                v-else
            />
        </div>
        <!-- Добавить фото -->
        <uploadPhoto
            @uploadUserPic="uploadUserPic"
            v-if="add"
            :photo="photo"
            :number="props.number"
        ></uploadPhoto>
    </div>
</template>
<script setup>
import { uploadPhoto } from '.';
const emit = defineEmits(['uploadUserPic, updateUserPic']);

const uploadUserPic = (userPic, number) => {
    console.log(userPic);
    emit('uploadUserPic', userPic, number);
};

const props = defineProps({
    photo: String,
    add: Boolean,
    number: Number,
});
</script>

<style lang="scss">
.my_photo__edit {
    display: grid;
    grid-template-columns: 1fr 68px;
    grid-template-rows: 1fr 68px;
    border-radius: 10px;
}
.avatar-preview,
.my_photo__plug {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    border-radius: 10px;
}

.my_photo__add,
.avatar-edit {
    display: grid;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    justify-content: center;
    align-content: center;
    z-index: 9;
}

.avatar-preview img,
.my_photo__plug img {
    width: 100%;
    height: 371px;
    object-fit: cover;
    border-radius: 10px;
}
</style>
