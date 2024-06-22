<template>
    <div class="MyPage">
        <form class="userBio" @submit.prevent="AddAbout">
            <p>Кратко о себе</p>
            <TextArea class="mt-4 bio" name="about" placeholder="Напиши что-нибудь" v-model:value="bio"
                :max-length="400"></TextArea>
            <!-- <pre>{{ user.value }}</pre> -->
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
            <Button :loaded="isLoading" :disabled="isLoading" type="submit" label="Сохранить"></Button>
            <div class="d-flex"></div>
        </form>

        <div class="mt-8 photoWrapper">
                <user-photo 
                    v-for="(photo, index) in media" 
                    :key="index"
                    class="photo-item" 
                    :photo="photo" 
                    :add="true" 
                    :number="index"
                    @uploadUserPic="uploadUserPic"
                />
        </div>
    </div>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { TextArea } from '@shared/components/inputs';
import { userPhoto } from '@shared/components/imagescomp';
import { ref, onMounted, inject, computed } from 'vue';
import { HTTP } from '@app/http';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
const emit = defineEmits(['uploadUserPic, updateUserPic', 'changeBio']);

const userStore = useUserStore();
let currentUser = storeToRefs(userStore);

let bio = ref(currentUser.currentUser.value.bio);

const media = ref({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
});
const isError = ref({});
const isLoading = ref(false);
const swal = inject('$swal');

const counterSquad = computed(() => {
    return bio.value?.length || 0;
});

const uploadUserPic = (userPic, index) => {
    getMedia();
    media.value[index] = userPic;
    emit('uploadUserPic', userPic, index);
};

const getMedia = async () => {
    try {
        const response = await HTTP.get(`/rsousers/me/media/`,);
        media.value = response.data;
        delete media.value.banner;
        delete media.value.photo;
    } catch (error) {
        console.log('failed ' + error);
    }
};

const AddAbout = async () => {
    try {
        isLoading.value = false;
        const response = await HTTP.patch(
            '/rsousers/me/',
            { bio: bio.value },

        );
        isLoading.value = false;
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        emit('changeBio', response.data.bio);
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
        isLoading.value = false;
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

onMounted(() => {
    getMedia();
});
</script>
<style lang="scss" scoped>
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

    @media screen and (max-width: 575px) {
        height: 373px;
        width: 280px;
        margin-right: 0;
    }
}

.photo-item:last-child{
    margin-right: 0px;
}

.photoWrapper {
    display: flex;

    @media screen and (max-width: 768px) {
        // flex-wrap: wrap;
        display: grid;
        grid-template-columns: 0.28fr 0.28fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        justify-content: center;
    }

    @media screen and (max-width: 575px) {
        grid-template-columns: 0.28fr;
    }
}
</style>
@shared/components/inputs/imagescomp
