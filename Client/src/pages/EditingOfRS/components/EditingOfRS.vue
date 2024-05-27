<template>
    <div class="container">
        <h1 class="title title--lso">Редактирование регионального штаба</h1>
        <!-- здесь поменяла -->
        <FormRS
            :participants="true"
            :headquarter="headquarter"
            :members="regionalsStore.members"
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
        ></FormRS>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { FormRS } from '@features/FormRS';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { usePage } from '@shared';
// здесь поменяла
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { storeToRefs } from 'pinia';

// здесь поменяла
const userStore = useUserStore();
const regionalsStore = useRegionalsStore();
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
// const members = ref(regionalsStore.members);

// const positions = ref([]);
// const regions = ref([]);

// const getPositions = async () => {
//     HTTP.get('positions/')

//         .then((res) => {
//             positions.value = res.data;
//             console.log('должности - ', res.data);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

// const getRegions = async () => {
//     await HTTP.get('regions/')

//         .then((res) => {
//             regions.value = res.data;
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };
const { replaceTargetObjects } = usePage();

const loading = ref(false);
const isCommanderLoading = ref(false);

const getHeadquarter = async () => {
    loading.value = true;
    isCommanderLoading.value = true;
    await HTTP.get(`regionals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            headquarter.value = response.data;
            if (headquarter.value.region) {
                headquarter.value.region = headquarter.value.region.id;
            }
            // if (regions.value.length) {
            //     const region = regions.value.find((item) => {
            //         return item.name === headquarter.value.region;
            //     });
            //     headquarter.value.region = region.id;
            //     console.log(region.id);
            // }
            if (headquarter.value.commander) {
                headquarter.value.commander = headquarter.value.commander;
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

// const getMembers = async () => {
//     try {
//         isMembersLoading.value = true;
//         setTimeout(async () => {
//             const membersResponse = await HTTP.get(`regionals/${id}/members/`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Token ' + localStorage.getItem('Token'),
//                 },
//             });

//             members.value = membersResponse.data.results;
//             /*if (members.value.length) {
//                 members.value.forEach((member) => {
//                     member.position = member.position?.id;
//                 });
//             }*/
//             isMembersLoading.value = false;
//         }, 1000);
//     } catch (error) {
//         console.log('an error occured ' + error);
//     }
// };

onMounted(() => {
    // getRegions();
    // getPositions();
    regionalsStore.getRegionalsMembers(id)
    getHeadquarter();
});

const onUpdateMember = (event, id) => {
    const memberIndex = members.value.findIndex((member) => member.id === id);
    const firstkey = Object.keys(event)[0];
    members.value[memberIndex].change = true;
    if (firstkey == 'position')
        members.value[memberIndex].position.id = event[firstkey];
    else members.value[memberIndex][firstkey] = event[firstkey];
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

// здесь поменяла
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
            'district_headquarter',
            headquarter.value.district_headquarter,
        );
        formData.append('region', headquarter.value.region);
        formData.append('city', headquarter.value.city);
        // здесь поменяла
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

        for (let member of members.value) {
            if (member.change) {
                await HTTP.patch(
                    `/regionals/${id}/members/${member.id}/`,
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
    } catch (error) {
        isError.value = error;
        isErrorMembers.value = error;
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
