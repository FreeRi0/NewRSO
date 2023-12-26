<template>
        <div class="user-metric__avatar">
            <!-- Аватар пользователя  -->

            <img :src="imageUrl.media.photo" alt="Аватарка" v-if="imageUrl" />
            <img
                id="profile-pic"
                src="@app/assets/user-avatar.png"
                alt="Аватарка(пусто)"
                v-else
            />
        </div>
    <!-- <img v-if="imageUrl" :src="imageUrl.photo" alt="ava" /> -->
    <div>
        <label
            >File
            <input
                type="file"
                id="file"
                ref="file"
                @change="onChangeFileUpload"
            />
        </label>
        <button @click="submitForm()">Upload</button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const file = ref(null);
const imageUrl = ref(null);

const viewAvatar = async () => {
    await HTTP.get(`/users/${id}/`, {
        headers: {
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            imageUrl.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

viewAvatar();

const onChangeFileUpload = (event) => {
    file.value = event.target.files[0];
};

const submitForm = async () => {
    let formData = new FormData();
    formData.append('photo', file.value);
    await HTTP.post('/users/me/media/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then(function (response) {
            console.log(response.data, 'sucsess');
        })
        .catch(function (error) {
            console.log('FAILURE!!', error);
        });
};
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
