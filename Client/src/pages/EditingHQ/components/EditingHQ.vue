<template>
    <div class="container">
        <h1 class="title title--mb">Редактирование штаба СО ОО</h1>

        <FormHQ :participants="true" :headquarter="headquarter" :members="educationalsStore.members"
            :submited="submited" :is-commander-loading="isCommanderLoading" :is-members-loading="isMembersLoading"
            :is-error="isError" :is-error-members="isErrorMembers" v-if="headquarter && isError && isErrorMembers"
            @submit.prevent="changeHeadquarter" @select-file="onSelectFile" @reset-emblem="onResetEmblem"
            @select-banner="onSelectBanner" @reset-banner="onResetBanner" @update-member="onUpdateMember"></FormHQ>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { FormHQ } from '@features/FormHQ';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useEducationalsStore } from '@features/store/educationals';

const router = useRouter();
const route = useRoute();
let id = route.params.id;

const submited = ref(false);

const headquarter = ref(null);
const educationalsStore = useEducationalsStore();

const isCommanderLoading = ref(false);

const getHeadquarter = async () => {
    isCommanderLoading.value = true;
    HTTP.get(`educationals/${id}/`,)
        .then((response) => {
            headquarter.value = response.data;
            if (headquarter.value.educational_institution.name) {
                headquarter.value.educational_institution.name =
                    headquarter.value.educational_institution.name;
            }
            if (headquarter.value.commander) {
                headquarter.value.commander = headquarter.value.commander;
            }
            // console.log(response);
            isCommanderLoading.value = false;
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        getHeadquarter();
    }
});

const isMembersLoading = ref(false);



onMounted(() => {
    educationalsStore.getEducationalsMembers(id);
    getHeadquarter();
});

const onUpdateMember = (event, id) => {
    const memberIndex = educationalsStore.members.findIndex((member) => member.id === id);
    const firstkey = Object.keys(event)[0];
    educationalsStore.members[memberIndex].change = true;
    if (firstkey == 'position')
        educationalsStore.members[memberIndex].position.id = event[firstkey];
    else educationalsStore.members[memberIndex][firstkey] = event[firstkey];
};

const isEmblemChange = ref(false);
const isBannerChange = ref(false);

const fileEmblem = ref(null);
const fileBanner = ref(null);

const onSelectFile = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onResetEmblem = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onSelectBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};
const onResetBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};

const isError = ref({});
const isErrorMembers = ref({});
const swal = inject('$swal');

const getErrors = () => {
    if (isError.value.non_field_errors) return isError.value.non_field_errors;
    if (isError.value.detail) return isError.value.detail;
    else return 'Заполните обязательные поля';
};

const changeHeadquarter = async () => {
    const formData = new FormData();
    formData.append('name', headquarter.value.name);
    formData.append(
        'educational_institution',
        headquarter.value.educational_institution.id,
    );
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append(
        'regional_headquarter',
        headquarter.value.regional_headquarter,
    );
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander.id);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);

    for (let member of educationalsStore.members) {
        if (member.change) {
            await HTTP.patch(
                `/educationals/${id}/members/${member.id}/`,
                {
                    position: member.position.id,
                    is_trusted: member.is_trusted,
                }
            )
                .then((response) => {
                    member.position = response.data.position;
                    member.is_trusted = response.is_trusted;
                    member.change = false;
                })
                .catch(function ({ response }) {
                    isErrorMembers.value = response.data;
                    console.error('There was an error!', response.data);
                    // console.log('Ошибки отправки формы', isErrorMembers.value);
                    swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `ошибка - ${isErrorMembers.value.non_field_errors}`,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                });
        }
    }

    if (isEmblemChange.value)
        fileEmblem.value
            ? formData.append('emblem', fileEmblem.value)
            : formData.append('emblem', '');
    if (isBannerChange.value)
        fileBanner.value
            ? formData.append('banner', fileBanner.value)
            : formData.append('banner', '');

    HTTP.patch(`/educationals/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            // submited.value = true;
            // console.log(response.data);
            swal.fire({
                position: 'center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
            router.push({
                name: 'HQ',
                params: { id: headquarter.value.id },
            });
        })
        // .catch((error) => {
        //     console.error('There was an error!', error);
        .catch(({ response }) => {
            isError.value = response.data;
            console.error('There was an error!', response.data);
            console.log('Ошибки отправки формы', isError.value);
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ошибка - ${getErrors()}`,
                showConfirmButton: false,
                timer: 2500,
            });
        });
};
</script>

<style lang="scss"></style>
