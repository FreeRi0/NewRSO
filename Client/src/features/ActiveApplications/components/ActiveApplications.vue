<template>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="!loading && !participantList.length">Список заявок пуст</p>

    <template v-else>
        <div class="competitions__actions">
            <v-select
                variant="outlined"
                class="form__field competitions__actions-select"
                :items="actionsList"
                v-model="action"
                placeholder="Выберите действие"
            />
        </div>
        <div class="competitions__list">
            <template
                v-for="participant in participantList"
                :key="participant.id"
            >
                <referenceItem
                    :participant="participant"
                    @select="onToggleSelectCompetition"
                />
            </template>
            <template v-if="selectedParticipantList.length">
                <p class="text_total">
                    Итого: {{ selectedParticipantList.length }}
                </p>

                <checkedReferencesItem
                    v-for="participant in selectedParticipantList"
                    :action="action"
                    :participant="participant"
                    :key="participant.id"
                    @select="onToggleSelectCompetition"
                />
            </template>
        </div>

        <div class="competitions__btns" v-if="selectedParticipantList.length">
            <Button
                class="save"
                type="button"
                label="Сохранить"
                @click="onAction"
            ></Button>
        </div>
        <div class="clear_select" v-else></div>
    </template>
    <!-- <div v-if="participants.length > 0">
        <referenceItem
            v-for="participant in participants"
            :participant="participant"
            @change="changePeoples"
            :selectedParticipants="selectedPeoples"
            :key="participant.user.id"
        />
    </div>
    <p v-else>Заявок нет...</p> -->

    <!-- <div
                    class="contributor-sort__all mb-8"
                    v-if="participants?.length > 0"
                >
                    <input
                        type="checkbox"
                        @click="select"
                        v-model="checkboxAll"
                    />
                </div>
                <activeApplications
                    @change="changePeoples"
                    :participants="participants"
                    :selected-peoples="selectedPeoples"
                    @approve="approveParticipant"
                    @reject="rejectParticipant"
                    v-if="!isLoading"
                />
                <v-progress-circular
                    class="circleLoader"
                    v-else
                    indeterminate
                    color="blue"
                ></v-progress-circular>
                <div class="selectedItems" v-if="selectedPeoples.length > 0">
                    <h3>Итого: {{ selectedPeoples.length }}</h3>

                    <checkedAppList
                        @change="changePeoples"
                        @approve="approveParticipant"
                        @reject="rejectParticipant"
                        :participants="selectedPeoples"
                    ></checkedAppList>
                </div> -->
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { ref, onMounted, onActivated } from 'vue';
import { referenceItem } from '@entities/ReferencesPeoples';
import { checkedReferencesItem } from '@entities/ReferencesPeoples';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const participantList = ref([]);
// const commanderIds = ref();
const selectedParticipantList = ref([]);

const loading = ref(false);
const action = ref('Одобрить');
const actionsList = ref(['Одобрить', 'Отклонить']);

// const getMeCommander = async () => {
//     try {
//         const { data } = await HTTP.get('/rsousers/me_commander/', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         });
//         commanderIds.value = data;
//     } catch (e) {
//         console.log('error getMeCommander', e);
//     }
// };

// const getAllCompetition = async () => {
//     try {
//         const { data } = await HTTP.get(`/competitions/`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         });
//         allCompetition.value = data;
//     } catch (e) {
//         console.log('error getAllCompetition', e);
//     }
// };

// const getCompetitionsJunior = async () => {
//     for (const competitionId of allCompetition.value) {
//         try {
//             loading.value = true;
//             const { data } = await HTTP.get(
//                 `/competitions/${competitionId.id}/applications/me`,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: 'Token ' + localStorage.getItem('Token'),
//                     },
//                 },
//             );
//             if (!data.is_confirmed_by_junior)
//                 competitionsList.value = [...competitionsList.value, data];
//         } catch (e) {
//             console.log('error getCompetitionsJunior', e);
//         } finally {
//             loading.value = false;
//         }
//     }
// };

// const getCompetitions = async () => {
//     for (const competitionId of allCompetition.value) {
//         try {
//             loading.value = true;
//             const { data } = await HTTP.get(
//                 `/competitions/${competitionId.id}/applications/`,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: 'Token ' + localStorage.getItem('Token'),
//                     },
//                 },
//             );

//             competitionsList.value = data.filter(
//                 (c) => c.is_confirmed_by_junior || !c.detachment,
//             );
//         } catch (e) {
//             console.log('error getCompetitions', e);
//         } finally {
//             loading.value = false;
//         }
//     }
// };

const viewParticipants = async () => {
    try {
        // isLoading.value = true;
        let id =
            roles.roles.value.regionalheadquarter_commander?.id ??
            roles.roles.value.detachment_commander?.id;
        const regComReq = ref(null);
        const detComReq = ref(null);
        setTimeout(async () => {
            if (roles.roles.value.regionalheadquarter_commander) {
                const regComReq = await HTTP.get(
                    `/regionals/${id}/verifications/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                participantList.value = regComReq.data;
                // isLoading.value = false;
            } else if (roles.roles.value.detachment_commander) {
                const detComReq = await HTTP.get(
                    `/detachments/${id}/verifications/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                participantList.value = detComReq.data;
                // isLoading.value = false;
            }
        }, 100);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const onToggleSelectCompetition = (participant, checked) => {
    console.log('participant', participant.selected);
    console.log('checked', checked);
    if (checked) {
        participant.selected = checked;
        selectedParticipantList.value.push(participant);
    } else {
        participant.selected = checked;
        selectedParticipantList.value = selectedParticipantList.value.filter(
            (c) => c.id !== participant.id,
        );
    }
};

const confirmApplication = async (id) => {
    try {
        // let { id, ...rest } = participant;
        const approveReq = await HTTP.post(
            `rsousers/${id}/verify/`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
    } catch (error) {
        console.log('errr', error);
    }
};

const cancelApplication = async () => {
    try {
        let { id, ...rest } = participant;
        const rejectReq = await HTTP.delete(
            `/rsousers/${id}/verify/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
            {},
        );
    } catch (error) {
        console.log('errr', error);
    }
};

// const cancelApplication = async (id, competitionId) => {
//     await HTTP.delete(
//         `/competitions/${competitionId}/applications/${id}`,
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Token ' + localStorage.getItem('Token'),
//             },
//         },
//         {},
//     );
// };

const onAction = async () => {
    try {
        for (const application of selectedParticipantList.value) {
            if (action.value === 'Одобрить') {
                // console.log('app', application.id);
                await confirmApplication();
            } else {
                await cancelApplication();
            }
            participantList.value = participantList.value.filter(
                (participant) =>
                    participant.id != application.id,
            );
            selectedParticipantList.value =
                selectedParticipantList.value.filter(
                    (participant) =>
                        participant.id != application.id,
                );
        }
        await viewParticipants();
    } catch (e) {
        console.log('error action', e);
    }
};

onMounted(async () => {
    await viewParticipants();
});

onActivated(async () => {
    await viewParticipants();
});
// import { referenceItem } from '@entities/ReferencesPeoples/components';
// const emit = defineEmits(['change']);
// const props = defineProps({
//     participants: {
//         type: Array,
//         required: true,
//     },
//     selectedPeoples: {
//         type: Array,
//     },
// });

// const changePeoples = (CheckedUser, UserId) => {

//     emit('change', CheckedUser, UserId);
//     console.log('UserId', UserId)
// };
</script>
