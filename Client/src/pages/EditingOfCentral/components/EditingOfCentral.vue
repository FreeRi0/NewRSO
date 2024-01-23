<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование центрального штаба</h1>
        <FormCentr
            :participants="true"
            :headquarter="headquarter"
            :members="members"
            :submited="submited"
            v-if="headquarter"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
            @update-member="onUpdateMember"
        >
        </FormCentr>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { FormCentr } from '@features/FormCentr';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { usePage } from '@shared';

const route = useRoute();
let id = route.params.id;

const { replaceTargetObjects } = usePage();

const submited = ref(false);

const headquarter = ref(null);
const members = ref([]);
const positions = ref([]);

const getPositions = async () => {
    HTTP.get('positions/')

        .then((res) => {
            positions.value = res.data;
            console.log('должности - ', res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const getHeadquarter = async () => {
    await HTTP.get(`centrals/1/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            headquarter.value = response.data;
            if (headquarter.value.commander) {
                headquarter.value.commander = headquarter.value.commander.id;
            }
            replaceTargetObjects([headquarter.value]);
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

const getMembers = async () => {
    HTTP.get(`centrals/${id}/members/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            members.value = response.data;
            members.value.forEach((member) => {
                if (positions.value) {
                    const position = positions.value.find((item) => {
                        return item.name === member.position;
                    });
                    member.position = position.id;
                }
            });
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

// watch(
//     () => route.params.id,

//     (newId, oldId) => {
//         id = newId;
//         getHeadquarter();
//     },
// );

onMounted(() => {
    getHeadquarter();
    getMembers();
    getPositions();
});

const onUpdateMember = (event, id) => {
    const targetMember = members.value.find((member) => member.id === id);
    const firstkey = Object.keys(event)[0];
    targetMember[firstkey] = event[firstkey];
    console.log(event);
};

/**
 * переменные на удаление фото из БД
 */
const isEmblemChange = ref(false);
const isBannerChange = ref(false);

const fileEmblem = ref(null);
const fileBanner = ref(null);

const onSelectEmblem = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onSelectBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};

const onDeleteEmblem = (file) => {
    isEmblemChange.value = true;
    fileEmblem.value = file;
};
const onDeleteBanner = (file) => {
    isBannerChange.value = true;
    fileBanner.value = file;
};

const swal = inject('$swal');

const changeHeadquarter = async () => {
    const formData = new FormData();

    formData.append('name', headquarter.value.name);
    formData.append(
        'detachments_appearance_year',
        headquarter.value.detachments_appearance_year,
    );
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append(
        'rso_founding_congress_date',
        headquarter.value.rso_founding_congress_date,
    );
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);

    if (isEmblemChange.value)
        fileEmblem.value
            ? formData.append('emblem', fileEmblem.value)
            : formData.append('emblem', '');
    if (isBannerChange.value)
        fileBanner.value
            ? formData.append('banner', fileBanner.value)
            : formData.append('banner', '');

    HTTP.patch('/centrals/1/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            submited.value = true;
            swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'успешно',
                showConfirmButton: false,
                timer: 1500,
            });
        })
        .catch((error) => {
            console.error('There was an error!', error);
            swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'ошибка',
                showConfirmButton: false,
                timer: 1500,
            });
        });
};
</script>

<style lang="scss"></style>
