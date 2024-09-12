<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование центрального штаба</h1>
        <FormCentr :participants="true" :headquarter="headquarter" :members="members" :submited="submited"
            :is-commander-loading="isCommanderLoading" :is-members-loading="isMembersLoading" :is-error="isError"
            :is-error-members="isErrorMembers" v-if="headquarter && isError && isErrorMembers && !loading"
            @change-headquarter="changeHeadquarter" @select-emblem="onSelectEmblem" @select-banner="onSelectBanner"
            @delete-emblem="onDeleteEmblem" @delete-banner="onDeleteBanner" @update-search-member="onUpdateSearchMember"
            @update-member="onUpdateMember" @delete-member="onDeleteMember">
        </FormCentr>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { FormCentr } from '@features/FormCentr';
import { HTTP } from '@app/http';
import { useRoute, useRouter } from 'vue-router';
import { usePage } from '@shared';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const user = storeToRefs(userStore);
const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);

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
const timerSearchMember = ref(null);
const searchMemberString = ref('');

const { replaceTargetObjects } = usePage();

const loading = ref(false);
const isCommanderLoading = ref(false);

const getHeadquarter = async () => {
    loading.value = true;
    isCommanderLoading.value = true;
    await HTTP.get(`/centrals/${id}/`,)
        .then((response) => {
            headquarter.value = response.data;
            // if (headquarter.value.commander) {
            //     headquarter.value.commander = headquarter.value.commander.id;
            // }
            replaceTargetObjects([headquarter.value]);
            loading.value = false;
            isCommanderLoading.value = false;
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};


const isMembersLoading = ref(false);

const getMembers = async (name) => {
    isMembersLoading.value = true;
    HTTP.get(`/centrals/${id}/members/?search=${name}`,)
        .then((response) => {
            members.value = response.data.results;
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        })
        .finally(() => {
            isMembersLoading.value = false;
        });
};

watch(
    () => route.params.id,

    async (newId) => {
        id = newId;
        await getHeadquarter();
    },
    {
        immediate: true,
        deep: true,
    },
);




const onUpdateSearchMember = (event) => {
    clearTimeout(timerSearchMember.value);

    timerSearchMember.value = setTimeout(() => {
        if (searchMemberString.value == event.target.value) return;
        else searchMemberString.value = event.target.value;

        if (event.target.value) getMembers(event.target.value);
        else members.value = [];
    }, 400);
};

const onUpdateMember = (event, id) => {
    const memberIndex = members.value.findIndex((member) => member.id === id);
    const firstkey = Object.keys(event)[0];
    members.value[memberIndex].change = true;
    if (firstkey == 'position')
        members.value[memberIndex].position.id = event[firstkey];
    else members.value[memberIndex][firstkey] = event[firstkey];
    if (firstkey == 'is_trusted') {
        const payload = {
            id_trusted: event[firstkey],
        }
        try {
            HTTP.patch(
                `/detachments/${route.params.id}/members/${id}/`,
                payload
            )
        } catch (e) {
            console.log(e);
        }
    }
};

const onDeleteMember = (id) => {
    const memberIndex = members.value.findIndex((member) => member.id === id);
    members.value.splice(memberIndex, 1);
    // members.value[memberIndex].change = true;
}

/**
 * переменные на удаление фото из БД
 */
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

        if (
            !educComId ||
            !regionComId ||
            !districtComId ||
            !centralComId ||
            !localComId ||
            !detComId
        ) {
            formData.append('commander', headquarter.value.meId);
        } else formData.append('commander', headquarter.value.commander.id);

        formData.append('commander', headquarter.value.commander.id);
        formData.append('social_vk', headquarter.value.social_vk);
        formData.append('social_tg', headquarter.value.social_tg);
        formData.append('slogan', headquarter.value.slogan);
        formData.append('about', headquarter.value.about);

        for (let member of members.value) {
            if (member.change) {
                await HTTP.patch(
                    `/centrals/${id}/members/${member.id}/`,
                    {
                        position: member.position.id,
                        is_trusted: member.is_trusted,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                )
                    .then((response) => {
                        member.position = response.data.position;
                        member.is_trusted = response.is_trusted;
                        member.change = false;
                    })
                    .catch(function (error) {
                        console.log('an error occured ' + error);
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

        await HTTP.patch(`/centrals/1/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
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
            name: 'CentralHQ',
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
