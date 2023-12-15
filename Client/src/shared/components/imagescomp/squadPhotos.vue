<template >
 <div class="avatar-upload my_photo__edit">
        <!-- Заглушка по умолчанию  -->
        <div class="avatar-preview my_photo__plug">
            <img
                :src="squadPhotosUrl.photo2"
                alt="Фото отряда"
                v-if="squadPhotosUrl.photo2"
                v-show="true"
            />

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Фото отряда(пусто)"
                v-else-if="!squadPhotosUrl.photo2"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const squadPhotosUrl = ref('');
const route = useRoute();
const id = route.params.id;


const viewPhoto = async () => {
    await HTTP.get(`/detachments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            squadPhotosUrl.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

viewPhoto();

</script>
<style lang="scss">

</style>