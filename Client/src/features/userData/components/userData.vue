<template>
    <div class="MyPage">
        <form
            action="#"
            class="userBio"
            method="post"
            @submit.prevent="AddAbout"
        >
            <p>Кратко о себе</p>
            <TextArea
                class="mt-4"
                name="about"
                placeholder="Напиши что нибудь"
                v-model:value="user.bio"
                :max-length="400"
            ></TextArea>
            <div class="form__counter">{{ counterSquad }} / 400</div>
            <p class="error" v-if="isError.last_name">
                {{ 'Фамилия пользователя, ' + isError.last_name }}
            </p>
            <p class="error" v-if="isError.first_name">
                {{ 'Имя пользователя, ' + isError.first_name }}
            </p>
            <p class="error" v-if="isError.gender">
                {{ 'Гендер, ' + isError.gender }}
            </p>
            <Button
                :loaded="isLoading"
                :disabled="isLoading"
                type="submit"
                label="сохранить"
            ></Button>
            <div class="d-flex">
            </div>
        </form>

        <div class="mt-8 d-flex">
            <userPhoto
                class="photo-item"
                :photo="media.photo1"
                :add="true"
            ></userPhoto>
            <userPhoto2
                class="photo-item"
                :photo="media.photo2"
                :add="true"
            ></userPhoto2>
            <userPhoto3
                class="photo-item"
                :photo="media.photo3"
                :add="true"
            ></userPhoto3>
            <userPhoto4
                class="photo-item"
                :photo="media.photo4"
                :add="true"
            ></userPhoto4>
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { TextArea } from '@shared/components/inputs';
import { userPhoto, userPhoto2, userPhoto3, userPhoto4 } from '@shared/components/imagescomp';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { ref, onMounted, watch, inject, computed } from 'vue';
import { HTTP } from '@app/http';

const user = ref({
    bio: '',
});

const media = ref({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
});
const del = ref('');
const isError = ref([]);
const isLoading = ref(false);
const swal = inject('$swal');
const route = useRoute();

const counterSquad = computed(() => {
    return user.value.bio.length || 0;
});
let id = route.params.id;

const getUser = async () => {
    await HTTP.get(`/rsousers/me/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

const getMedia = async () => {
    await HTTP.get(`/rsousers/me/media/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            media.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

const AddAbout = async () => {
    isLoading.value = true;
    await HTTP.patch(`/rsousers/me/`, user.value, {
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
            user.value = response.data;
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


onMounted(() => {
    getUser();
    getMedia();
});
</script>
<style lang="scss">
.MyPage {
    border: 1px solid #0000001a;
    border-radius: 10px;
    padding: 40px;
    margin-bottom: 80px;
}

.userBio {
    max-width: 900px;
}

.photo-item {
    width: 260px;
    margin-right: 20px;
}
</style>
