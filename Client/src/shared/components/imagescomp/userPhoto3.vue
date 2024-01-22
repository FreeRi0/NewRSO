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
        <uploadPhoto3 v-if="add" :photo="photo"></uploadPhoto3>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue';
import { HTTP } from '@app/http';
import { uploadPhoto3} from '.';

const props = defineProps({
    photo: String,
    add: Boolean
});

</script>