<template>
    <div class="MyPage">
        <form action="#" method="post" @submit.prevent="AddAbout">
            <p>Кратко о себе</p>
            <TextArea
                class="mt-2"
                name="about"
                placeholder="Напиши что нибудь"
                v-model:value="userBio.bio"
            ></TextArea>
            <Button
                :loaded="isLoading"
                :disabled="isLoading"
                type="submit"
                label="сохранить"
            ></Button>
        </form>

        <v-row class="mt-8">
            <v-col v-for="n in 4" :key="n" class="d-flex">
                <userPhoto
                    :photos="user?.media?.photo1"
                    :add="true"
                ></userPhoto>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { TextArea } from '@shared/components/inputs';
import { userPhoto } from '@shared/components/imagescomp';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { ref, onMounted, watch, inject } from 'vue';
import { HTTP } from '@app/http';

// const data = ref({
//     bio: '',
// });
const userBio = ref({
    bio: ''
});
const isError = ref([]);
const isLoading = ref(false);
const swal = inject('$swal');
const route = useRoute();
let id = route.params.id;

const getUser = async () => {
    await HTTP.get(`/rsousers/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            userBio.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

const AddAbout = async () => {
    isLoading.value = true;
    await HTTP.patch(`/rsousers/me/`, userBio.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            isLoading.value = false;
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            userBio.value = response.data;
            console.log(response.data);
        })
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            isLoading.value = false;
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        getUser();
    }
});

watch(
    () => route.params.id,

    (newId, oldId) => {
        id = newId;
        getUser();
    },
);

onMounted(() => {
    getUser();
});
</script>
<style lang="scss">
.MyPage {
    border: 1px solid #0000001a;
    border-radius: 10px;
    padding: 40px;
    margin-bottom: 80px;
}
</style>
