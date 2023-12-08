<template>
    <img v-if="imageUrl" :src="imageUrl.photo" alt="ava">
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

const file = ref(null);
const imageUrl = ref(null);

const viewAvatar = async () => {
    await HTTP.get('/users/me/media/', {
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
    await HTTP
        .post('/users/me/media/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        })
        .then(function (response) {
            console.log(response.data, "sucsess")
        })
        .catch(function (error) {
            console.log('FAILURE!!', error);
        });
};


</script>
<style lang="scss"></style>
