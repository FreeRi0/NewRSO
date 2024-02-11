<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование местного штаба</h1>
        <FormLocal
            :participants="true"
            :headquarter="headquarter"
            :members="members"
            :submited="submited"
            :is-commander-loading="isCommanderLoading"
            :is-members-loading="isMembersLoading"
            :is-error="isError"
            :is-error-members="isErrorMembers"
            v-if="headquarter && isError && isErrorMembers && !loading"
            @submit.prevent="changeHeadquarter"
            @select-emblem="onSelectEmblem"
            @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem"
            @delete-banner="onDeleteBanner"
            @update-member="onUpdateMember"
        ></FormLocal>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { FormLocal } from '@features/FormLocal';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { usePage } from '@shared';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const user = storeToRefs(userStore);
const meId = user.currentUser.value.id;

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const meRoles = roles.roles.value;

const educComId = roles.roles.value.educationalheadquarter_commander?.id;
const regionComId = roles.roles.value.regionalheadquarter_commander?.id;
const districtComId = roles.roles.value.districtheadquarter_commander?.id;
const centralComId = roles.roles.value.centralheadquarter_commander;
const localComId = roles.roles.value.localheadquarter_commander?.id;
const detComId = roles.roles.value.detachment_commander?.id;

const router = useRouter();
const route = useRoute();
let id = route.params.id;

const headquarter = ref(null);
const members = ref([]);

const { replaceTargetObjects } = usePage();

const loading = ref(false);
const isCommanderLoading = ref(false);

const getHeadquarter = async () => {
    loading.value = true;
    isCommanderLoading.value = true;
    await HTTP.get(`locals/${id}/`, {
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
            loading.value = false;
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

const getMembers = async () => {
    try {
        isMembersLoading.value = true;
        setTimeout(async () => {
            const membersResponse = await HTTP.get(`locals/${id}/members/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            });

            members.value = membersResponse.data;
            if (members.value.length) {
                members.value.forEach((member) => {
                    member.position = member.position.id;
                });
            }
            isMembersLoading.value = false;
        }, 1000);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

onMounted(() => {
    getMembers();
    getHeadquarter();
});

const onUpdateMember = (event, id) => {
    const targetMember = members.value.find((member) => member.id === id);
    const firstkey = Object.keys(event)[0];
    targetMember[firstkey] = event[firstkey];
};

const submited = ref(false);

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

const getErrors = () => {
    if (isError.value.non_field_errors) return isError.value.non_field_errors;
    if (isError.value.detail) return isError.value.detail;
    else return 'Заполните обязательные поля';
};

const changeHeadquarter = async () => {
    try {
        const formData = new FormData();

        formData.append('name', headquarter.value.name);
        formData.append('founding_date', headquarter.value.founding_date);
        formData.append(
            'regional_headquarter',
            headquarter.value.regional_headquarter,
        );
        formData.append('city', headquarter.value.city);

        if (
            !educComId ||
            !regionComId ||
            !districtComId ||
            !centralComId ||
            !localComId ||
            !detComId
        ) {
            formData.append('commander', headquarter.value.meId);
        } else formData.append('commander', headquarter.value.commander);

        formData.append('commander', headquarter.value.commander);
        formData.append('social_vk', headquarter.value.social_vk);
        formData.append('social_tg', headquarter.value.social_tg);
        formData.append('slogan', headquarter.value.slogan);
        formData.append('about', headquarter.value.about);

        for (let member of members.value) {
            await HTTP.patch(
                `/locals/${id}/members/${member.id}/`,
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

        await HTTP.patch(`/locals/${id}/`, formData, {
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
            name: 'LocalHQ',
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
