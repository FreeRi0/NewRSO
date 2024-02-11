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
                v-for="(participant, index) in participantList"
                :key="participant.user.id"
            >
                <!-- <active-competition-item
                    v-if="
                        competition.is_confirmed_by_junior ||
                        (competition.junior_detachment?.id ==
                            commanderIds.detachment_commander?.id &&
                            !competition.is_confirmed_by_junior) ||
                        !competition.detachment
                    "
                    :competition="competition"
                    :commander-ids="commanderIds"
                    :position="index"
                    @select="onToggleSelectCompetition"
                /> -->

                <referenceItem
                    :participant="participant"
                    :commander-ids="commanderIds"
                    :position="index"
                    @select="onToggleSelectCompetition"
                />
            </template>
            <template v-if="selectedParticipantList.length">
                <p class="text_total">
                    Итого: {{ selectedParticipantList.length }}
                </p>

                <!-- <active-competition-item-select
                    v-for="competition in selectedCompetitionsList"
                    :key="competition.id"
                    :competition="competition"
                    :action="action"
                    :commander-ids="commanderIds"
                    @select="onToggleSelectCompetition"
                /> -->
                <checkedReferencesItem
                    v-for="participant in selectedParticipantList"
                    :action="action"
                    :participant="participant"
                    :commander-ids="commanderIds"
                    :key="participant.user.id"
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
import { ref } from 'vue';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { ref, onMounted, onActivated } from 'vue';
import { referenceItem } from '@entities/ReferencesPeoples';
import { checkedReferencesItem } from '@entities/ReferencesPeoples';

const participantList = ref([]);
const commanderIds = ref();
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
                participants.value = regComReq.data;
                isLoading.value = false;
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
                participants.value = detComReq.data;
                isLoading.value = false;
            }
        }, 1000);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const onToggleSelectCompetition = (participant, checked) => {
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

// const confirmApplication = async (id, participantId) => {
//     if (commanderIds.value.regionalheadquarter_commander?.id == null) {
//         await HTTP.put(
//             `/competitions/${competitionId}/applications/${id}/`,
//             {
//                 is_confirmed_by_junior: true,
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Token ' + localStorage.getItem('Token'),
//                 },
//             },
//         );
//     } else {
//         await HTTP.post(
//             `/competitions/${competitionId}/applications/${id}/confirm/`,
//             {},
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: 'Token ' + localStorage.getItem('Token'),
//                 },
//             },
//         );
//     }
// };

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
                console.log(application.id);
                await confirmApplication(
                    application.id,
                    application.participant.id,
                );
            } else {
                await cancelApplication(
                    application.id,
                    application.participant.id,
                );
            }
            participantList.value = participantList.value.filter(
                (participant) => participant.id != application.id,
            );
            selectedParticipantList.value =
                selectedParticipantList.value.filter(
                    (participant) => participant.id != application.id,
                );
        }

        if (commanderIds.value.regionalheadquarter_commander?.id == null)
            await getCompetitionsJunior();
        else await getCompetitions();
    } catch (e) {
        console.log('error action', e);
    }
};

onMounted(async () => {
    await getAllCompetition();
    await getMeCommander();
    if (commanderIds.value.regionalheadquarter_commander?.id == null)
        await getCompetitionsJunior();
    else await getCompetitions();
});

onActivated(async () => {
    await getAllCompetition();
    await getMeCommander();
    if (commanderIds.value.regionalheadquarter_commander?.id == null)
        await getCompetitionsJunior();
    else await getCompetitions();
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
