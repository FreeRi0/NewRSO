<template>
    <div class="privateProfile">
        <div class="privateProfile-sort">
            <form class="privateProfile-filters" method="post" @submit.prevent="ChangePrivate">
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мой номер телефона
                    </div>
                    <sortByEducation placeholder="Все" variant="outlined" clearable
                        v-model="privateData.privacy_telephone" :options="privacies"></sortByEducation>

                    <p class="error" v-if="isError.privacy_telephone">
                        {{ 'Настройка ' + isError.privacy_telephone }}
                    </p>
                </div>
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мою электронную почту
                    </div>

                    <sortByEducation placeholder="Все" variant="outlined" clearable v-model="privateData.privacy_email"
                        :options="privacies"></sortByEducation>
                    <p class="error" v-if="isError.privacy_email">
                        {{ '' + isError.privacy_email }}
                    </p>
                </div>

                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мои ссылки на соцсети
                    </div>
                    <sortByEducation placeholder="Все" variant="outlined" clearable v-model="privateData.privacy_social"
                        :options="privacies"></sortByEducation>

                    <p class="error" v-if="isError.privacy_social">
                        {{ '' + isError.privacy_social }}
                    </p>
                </div>
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит информацию обо мне
                    </div>
                    <sortByEducation placeholder="Все" variant="outlined" clearable v-model="privateData.privacy_about"
                        :options="privacies"></sortByEducation>

                    <p class="error" v-if="isError.privacy_about">
                        {{ '' + isError.privacy_about }}
                    </p>
                </div>
                <div class="privateProfile-select">
                    <div class="privateProfile-text">
                        Кто видит мои фотографии
                    </div>
                    <sortByEducation placeholder="Все" variant="outlined" clearable v-model="privateData.privacy_photo"
                        :options="privacies"></sortByEducation>

                    <p class="error" v-if="isError.privacy_photo">
                        {{ '' + isError.privacy_photo }}
                    </p>
                </div>

                <p class="error" v-if="isError.detail">
                    {{ '' + isError.detail }}
                </p>
                <Button type="submit" label="Сохранить" color="primary"></Button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { Select, sortByEducation } from '@shared/components/selects';
import { Button } from '@shared/components/buttons';
import { ref, computed, onMounted, inject } from 'vue';
import { HTTP } from '@app/http';

const swal = inject('$swal');
const isError = ref([]);
const privacies = ref([
    {
        value: 'Все',
        name: 'Все',
    },
    {
        value: 'Члены отряда',
        name: 'Члены отряда',
    },
    { value: 'Руководство', name: 'Руководство' },
]);

const privateData = ref({
    privacy_photo: null,
    privacy_email: null,
    privacy_social: null,
    privacy_about: null,
    privacy_photo: null,
});

const getPrivate = async () => {
    try {
        const response = await HTTP.get('/rsousers/me/privacy/',);
        privateData.value = response.data;
    } catch (error) {
        console.log('failed ' + error);
    }
};


const ChangePrivate = async () => {
    try {
        const response = await HTTP.patch(
            '/rsousers/me/privacy/',
            privateData.value,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        // emit('changeBio', response.data.bio);
    } catch (error) {
        console.log('errr', error);
        isError.value = error.response.data;
        console.error('There was an error!', error);
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
    getPrivate();
});
</script>
<style lang="scss">
.privateProfile-select {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    padding-bottom: 28px;
    align-items: center;

    @media screen and (max-width: 575px) {
        grid-template-columns: 1fr;
    }
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
    max-width: 680px;

    @media screen and (max-width: 575px) {
        padding-right: 16px;
        padding-left: 16px;
    }
}
</style>
