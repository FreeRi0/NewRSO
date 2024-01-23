<template>
    <div class="container">
        <h1 class="title title--mb">Редактирование ЛСО</h1>

        <FormUnit
            :participants="true"
            :detachment="detachment"
            :members="members"
            :submited="submited"
            :is-error="isError"
            :is-error-members="isErrorMembers"
            v-if="detachment && isError && isErrorMembers"
            @submit.prevent="changeDetachment"
            @select-file="onSelectFile"
            @reset-emblem="onResetEmblem"
            @select-banner="onSelectBanner"
            @reset-banner="onResetBanner"
            @select-photo-one="onSelectPhotoOne"
            @reset-photo-one="onResetPhotoOne"
            @select-photo-two="onSelectPhotoTwo"
            @reset-photo-two="onResetPhotoTwo"
            @select-photo-three="onSelectPhotoThree"
            @reset-photo-three="onResetPhotoThree"
            @select-photo-four="onSelectPhotoFour"
            @reset-photo-four="onResetPhotoFour"
            @update-member="onUpdateMember"
        ></FormUnit>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { FormUnit } from '@features/FormUnit';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { usePage } from '@shared';

const router = useRouter();
const route = useRoute();
console.log(route);
let id = route.params.id;

const detachment = ref(null);
const members = ref([]);
const positions = ref([]);
const areas = ref([]);
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

const getAreas = async () => {
    HTTP.get('areas/')

        .then((res) => {
            areas.value = res.data;
            console.log('направления - ', res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const getRegions = async () => {
    HTTP.get('regions/')

        .then((res) => {
            regions.value = res.data;
            console.log('регионы - ', res.data);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const { replaceTargetObjects } = usePage();

const getDetachment = async () => {
    console.log('id отряда для редактирования - ', id);
    HTTP.get(`/detachments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            detachment.value = response.data;

            if (areas.value) {
                const area = areas.value.find((item) => {
                    return item.name === detachment.value.area;
                });
                detachment.value.area = area.id;
            }
            if (regions.value) {
                const region = regions.value.find((item) => {
                    return item.name === detachment.value.region;
                });
                detachment.value.region = region.id;
            }
            if (detachment.value.educational_institution) {
                detachment.value.educational_institution =
                    detachment.value.educational_institution.id;
            }
            if (detachment.value.commander) {
                detachment.value.commander = detachment.value.commander.id;
            }
            replaceTargetObjects([detachment.value]);
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        getDetachment();
    }
});

const getMembers = async () => {
    HTTP.get(`detachments/${id}/members/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            members.value = response.data;
            // console.log('участники штаба - ', response);
            members.value.forEach((member) => {
                if (positions.value) {
                    const position = positions.value.find((item) => {
                        return item.name === member.position;
                    });
                    // console.log('объект должности - ', position);
                    member.position = position.id;
                }
            });
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
    // console.log(id);
};

// watch(
//     () => route.params.id,

//     (newId, oldId) => {
//         id = newId;
//         getDetachment();
//     },
// );

onMounted(() => {
    getDetachment();
    getMembers();
    getPositions();
    getAreas();
    getRegions();
});

const onUpdateMember = (event, id) => {
    const targetMember = members.value.find((member) => member.id === id);
    const firstkey = Object.keys(event)[0];
    targetMember[firstkey] = event[firstkey];
    console.log(event);
};

const submited = ref(false);
const fileEmblem = ref(null);
const fileBanner = ref(null);
const filePhotoOne = ref(null);
const filePhotoTwo = ref(null);
const filePhotoThree = ref(null);
const filePhotoFour = ref(null);

const swal = inject('$swal');

const isEmblemChange = ref(false);
const isBannerChange = ref(false);
const isPhotoOne = ref(false);
const isPhotoTwo = ref(false);
const isPhotoThree = ref(false);
const isPhotoFour = ref(false);

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
const onSelectPhotoOne = (file) => {
    isPhotoOne.value = true;
    filePhotoOne.value = file;
};
const onResetPhotoOne = (file) => {
    isPhotoOne.value = true;
    filePhotoOne.value = file;
};
const onSelectPhotoTwo = (file) => {
    isPhotoTwo.value = true;
    filePhotoTwo.value = file;
};
const onResetPhotoTwo = (file) => {
    isPhotoTwo.value = true;
    filePhotoTwo.value = file;
};
const onSelectPhotoThree = (file) => {
    isPhotoThree.value = true;
    filePhotoThree.value = file;
};
const onResetPhotoThree = (file) => {
    isPhotoThree.value = true;
    filePhotoThree.value = file;
};
const onSelectPhotoFour = (file) => {
    isPhotoFour.value = true;
    filePhotoFour.value = file;
};
const onResetPhotoFour = (file) => {
    isPhotoFour.value = true;
    filePhotoFour.value = file;
};

const isError = ref({});
const isErrorMembers = ref({});

const changeDetachment = async () => {
    const formData = new FormData();
    formData.append('name', detachment.value.name);
    formData.append('area', detachment.value.area);
    formData.append('founding_date', detachment.value.founding_date);
    formData.append('region', detachment.value.region);
    formData.append('city', detachment.value.city);
    formData.append(
        'educational_institution',
        detachment.value.educational_institution,
    );
    formData.append('commander', detachment.value.commander);
    formData.append('social_vk', detachment.value.social_vk);
    formData.append('social_tg', detachment.value.social_tg);
    formData.append('slogan', detachment.value.slogan);
    formData.append('about', detachment.value.about);

    for (let member of members.value) {
        HTTP.patch(
            `/detachments/${id}/members/${member.id}/`,
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
    if (isPhotoOne.value)
        filePhotoOne.value
            ? formData.append('photo1', filePhotoOne.value)
            : formData.append('photo1', '');
    if (isPhotoTwo.value)
        filePhotoTwo.value
            ? formData.append('photo2', filePhotoTwo.value)
            : formData.append('photo2', '');
    if (isPhotoThree.value)
        filePhotoThree.value
            ? formData.append('photo3', filePhotoThree.value)
            : formData.append('photo3', '');
    if (isPhotoFour.value)
        filePhotoFour.value
            ? formData.append('photo4', filePhotoFour.value)
            : formData.append('photo4', '');

    HTTP.patch(`/detachments/${id}/`, formData, {
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
                name: 'lso',
                params: { id: detachment.value.id },
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
