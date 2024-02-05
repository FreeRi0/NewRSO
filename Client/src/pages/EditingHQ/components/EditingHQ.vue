<template>
    <div class="container">
        <h1 class="title title--mb">Редактирование штаба СО ОО</h1>

        <FormHQ
            :participants="true"
            :headquarter="headquarter"
            :members="members"
            :submited="submited"
            :is-members-loading="isMembersLoading"
            :is-error="isError"
            :is-error-members="isErrorMembers"
            v-if="headquarter && isError && isErrorMembers"
            @submit.prevent="changeHeadquarter"
            @select-file="onSelectFile"
            @reset-emblem="onResetEmblem"
            @select-banner="onSelectBanner"
            @reset-banner="onResetBanner"
            @update-member="onUpdateMember"
        ></FormHQ>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { FormHQ } from '@features/FormHQ';
// import axios from 'axios';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
let id = route.params.id;

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
    HTTP.get(`educationals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            headquarter.value = response.data;
            if (headquarter.value.educational_institution) {
                headquarter.value.educational_institution =
                    headquarter.value.educational_institution.id;
            }
            if (headquarter.value.commander) {
                headquarter.value.commander = headquarter.value.commander.id;
            }
            console.log(response);
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
            const membersResponse = await HTTP.get(
                `educationals/${id}/members/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );

            members.value = membersResponse.data;
            // members.value.forEach((member) => {
            //     if (positions.value.length) {
            //         const position = positions.value.find((item) => {
            //             return item.name === member.position;
            //         });
            //         console.log('объект должности - ', position);
            //         member.position = position.id;
            //     }
            // });
            isMembersLoading.value = false;
        }, 1000);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

// const getMembers = async () => {
//     HTTP.get(`educationals/${id}/members/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             members.value = response.data;
//             console.log('участники штаба - ', response);
//             members.value.forEach((member) => {
//                 if (positions.value) {
//                     const position = positions.value.find((item) => {
//                         return item.name === member.position;
//                     });
//                     console.log('объект должности - ', positions.value);
//                     member.position = position.id;
//                 }
//             });
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

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

const changeHeadquarter = async () => {
    const formData = new FormData();
    formData.append('name', headquarter.value.name);
    formData.append(
        'educational_institution',
        headquarter.value.educational_institution,
    );
    formData.append('founding_date', headquarter.value.founding_date);
    formData.append(
        'regional_headquarter',
        headquarter.value.regional_headquarter,
    );
    formData.append('city', headquarter.value.city);
    formData.append('commander', headquarter.value.commander);
    formData.append('social_vk', headquarter.value.social_vk);
    formData.append('social_tg', headquarter.value.social_tg);
    formData.append('slogan', headquarter.value.slogan);
    formData.append('about', headquarter.value.about);

    for (let member of members.value) {
        HTTP.patch(
            `/educationals/${id}/members/${member.id}/`,
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
        )
            .then((response) => {
                console.log(response.data);
            })
            // .catch((error) => {
            //     console.error('There was an error!', error);
            .catch(({ response }) => {
                isErrorMembers.value = response.data;
                console.error('There was an error!', response.data);
                console.log('Ошибки отправки формы', isErrorMembers.value);
                swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `ошибка - ${isErrorMembers.value.non_field_errors}`,
                    showConfirmButton: false,
                    timer: 2500,
                });
            });
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
            console.log(response.data);
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
                title: `ошибка - ${isError.value.non_field_errors}`,
                showConfirmButton: false,
                timer: 2500,
            });
        });
};
</script>

<style lang="scss"></style>
