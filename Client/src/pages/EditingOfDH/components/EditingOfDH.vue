<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование окружного штаба</h1>
        <FormDH
            :participants="true"
            :headquarter="headquarter"
            :members="members"
            :submited="submited"
            :is-error="isError"
            :is-error-members="isErrorMembers"
            v-if="headquarter && isError && isErrorMembers"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
            @update-member="onUpdateMember"
        >
        </FormDH>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { FormDH } from '@features/FormDH';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { usePage } from '@shared';

const router = useRouter();
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
    await HTTP.get(`districts/${id}/`, {
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
    HTTP.get(`districts/${id}/members/`, {
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

const isError = ref({});
const isErrorMembers = ref({});
const swal = inject('$swal');

const changeHeadquarter = async () => {
    try {
        const formData = new FormData();

    formData.append('name', headquarter.value.name);
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);

        for (let member of members.value) {
            await HTTP.patch(
                `/districts/${id}/members/${member.id}/`,
                {
                    position: member.position,
                    is_trusted: member.is_trusted,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
        }

        if (isEmblemChange.value)
            fileEmblem.value
                ? formData.append('emblem', fileEmblem.value)
                : formData.append('emblem', '');
        if (isBannerChange.value)
            fileBanner.value
                ? formData.append('banner', fileBanner.value)
                : formData.append('banner', '');

        await HTTP.patch(`/districts/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        router.push({
            name: 'DistrictHQ',
            params: { id: headquarter.value.id },
        })
    } catch (err) {
        isError.value = err.response.data;
        isErrorMembers.value = err.response.data;
        if (isError.value || isErrorMembers.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка - заполните обязательные поля`,
                showConfirmButton: false,
                timer: 2500,
            });
        } 
    }
};
</script>
