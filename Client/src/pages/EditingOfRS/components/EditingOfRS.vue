<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование регионального штаба</h1>
        <FormRS
            :participants="true"
            :headquarter="headquarter"
            :members="members"
            :submited="submited"
            :is-error="isError"
            :is-error-members="isErrorMembers"
            v-if="headquarter && isError && isErrorMembers && !loading"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
            @update-member="onUpdateMember"
        ></FormRS>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { FormRS } from '@features/FormRS';
import axios from 'axios';
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
const regions = ref([]);

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

const getRegions = async () => {
    await HTTP.get('regions/')

        .then((res) => {
            regions.value = res.data;
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const loading = ref(false);

const getHeadquarter = async () => {
    loading.value = true;
    await HTTP.get(`regionals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            headquarter.value = response.data;
            console.log(response.data);
            if (regions.value.length) {
                const region = regions.value.find((item) => {
                    return item.name === headquarter.value.region;
                });
                headquarter.value.region = region.id;
                console.log(region.id);
            }
            if (headquarter.value.commander) {
                headquarter.value.commander = headquarter.value.commander.id;
            }
            replaceTargetObjects([headquarter.value]);
            loading.value = false;
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
    HTTP.get(`regionals/${id}/members/`, {
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
    getRegions();
    getMembers();
    getPositions();
    getHeadquarter();
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
        formData.append(
            'district_headquarter',
            headquarter.value.district_headquarter,
        );
        formData.append('region', headquarter.value.region);
        formData.append('city', headquarter.value.city);
        formData.append('commander', headquarter.value.commander);
        formData.append('social_vk', headquarter.value.social_vk);
        formData.append('social_tg', headquarter.value.social_tg);
        formData.append('founding_date', headquarter.value.founding_date);
        formData.append('conference_date', headquarter.value.conference_date);
        formData.append('registry_number', headquarter.value.registry_number);
        formData.append(
            'name_for_certificates',
            headquarter.value.name_for_certificates,
        );
        formData.append('case_name', headquarter.value.case_name);
        formData.append('legal_address', headquarter.value.legal_address);
        formData.append('requisites', headquarter.value.requisites);
        formData.append('slogan', headquarter.value.slogan);
        formData.append('about', headquarter.value.about);

        // здесь поменяла
        for (let member of members.value) {
            await HTTP.patch(
                `/regionals/${id}/members/${member.id}/`,
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

        headquarter.value.registry_date
            ? formData.append('registry_date', headquarter.value.registry_date)
            : formData.append('registry_date', '');

        if (isEmblemChange.value)
            fileEmblem.value
                ? formData.append('emblem', fileEmblem.value)
                : formData.append('emblem', '');
        if (isBannerChange.value)
            fileBanner.value
                ? formData.append('banner', fileBanner.value)
                : formData.append('banner', '');

        await HTTP.patch(`/regionals/${id}/`, formData, {
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
            name: 'RegionalHQ',
            params: { id: headquarter.value.id },
        });
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

<style lang="scss"></style>
