<template>
    <div class="user-metric__top">
        <div class="user-metric__top-img-wrapper">
            <!-- Заглушка Банер -->

            <img
                :src="banner"
                alt="Баннер отряда"
                v-if="banner"
            />

            <img
                src="@/app/assets/user-banner.jpg"
                alt="Баннер отряда(пусто)"
                v-else
            />

        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const imgDataSquadUrl = ref('');
const route = useRoute();
const id = route.params.id;
const props = defineProps({
    banner: String
})



// const viewBanner = async () => {
//     await HTTP.get(`/detachments/${id}/`, {
//         headers: {
//              Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
//         },
//     })
//         .then((response) => {
//             imgDataSquadUrl.value = response.data;
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

// viewBanner();
</script>
<style lang="scss"></style>
