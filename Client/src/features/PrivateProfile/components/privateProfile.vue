<template>
    <div class="privateProfile">
        <div class="privateProfile-sort">
            <form
                class="privateProfile-filters"
                method="post"
                @submit.prevent="ChangePrivate"
            >
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мой номер телефона
                    </div>
                    <Select
                        variant="outlined"
                        clearable
                        class="changePrivate"
                        v-model="privateData.privacy_telephone"
                        :names="educations"
                    ></Select>
                </div>
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мою электронную почту
                    </div>
                    <Select
                        variant="outlined"
                        clearable
                        class="changePrivate"
                        v-model="privateData.privacy_email"
                        :names="educations"
                    ></Select>
                </div>
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мои ссылки на соцсети
                    </div>
                    <Select
                        variant="outlined"
                        clearable
                        class="changePrivate"
                        v-model="privateData.privacy_social"
                        :names="educations"
                    ></Select>
                </div>
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит информацию обо мне
                    </div>
                    <Select
                        variant="outlined"
                        clearable
                        class="changePrivate"
                        v-model="privateData.privacy_about"
                        :names="educations"
                    ></Select>
                </div>
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мои фотографии
                    </div>
                    <Select
                        variant="outlined"
                        clearable
                        class="changePrivate"
                        v-model="privateData.privacy_photo"
                        :names="educations"
                    ></Select>
                </div>
                <Button
                    type="submit"
                    label="Сохранить"
                    color="primary"
                ></Button>
                <!-- <Button
                    v-else
                    type="button"
                    @click="updateChangePrivate"
                    label="Обновить"
                    color="primary"
                ></Button> -->
            </form>
        </div>
    </div>
</template>
<script setup>
import { Select } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import { ref, computed, onMounted } from 'vue';
import { HTTP } from '@app/http';

const isSave = ref(true);
const educations = ref([
    {
        value: 'all',
        name: 'all',
    },
    {
        value: 'detachment_members',
        name: 'detachment_members',
    },
    { value: 'management_members', name: 'management_members' },
]);

const privateData = ref({
    privacy_photo: null,
    privacy_email: null,
    privacy_social: null,
    privacy_about: null,
    privacy_photo: null,
});

const getPrivate = async () => {
    await HTTP.get('/rsousers/me/privacy/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            privateData.value = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

onMounted(() => {
    getPrivate()
})


const ChangePrivate = async () => {
    await HTTP.post('/rsousers/me/privacy/', privateData.value, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            console.log(response.data);
            isSave.value = false;
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        })

        .catch(({ error }) => {
            console.log('There was an error!', error);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};

// const updateChangePrivate = async () => {};
</script>
<style lang="scss">
.privateProfile-select {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    padding-bottom: 28px;
    align-items: center;
}
.changePrivate {
    width: 200px;
}

.privateProfile-text {
    font-size: 20px;
    font-weight: 500;
    font-family: Akrobat;
}

.privateProfile-filters {
    border-radius: 10px;
    border: 1px solid var(--__, #dee2e5);
    background: #fff;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 40px;
    padding-bottom: 20px;
    margin-bottom: 80px;
    margin-top: 40px;
    width: 680px;
}
</style>
