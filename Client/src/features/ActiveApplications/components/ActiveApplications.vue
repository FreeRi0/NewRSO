<template>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="!loading && !participantList.length">Список заявок пуст</p>

    <template v-else>
        <div class="participants__actions">
            <v-select
                variant="outlined"
                class="form__field participants__actions-select"
                :items="actionsList"
                v-model="action"
                placeholder="Выберите действие"
            />

            <input
                type="checkbox"
                @click="select"
                v-model="checkboxAll"
            />
        </div>
        <div class="participants__list">
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

        <div class="participants__btn" v-if="selectedParticipantList.length">
            <Button
                class="save"
                type="button"
                label="Сохранить"
                @click="onAction"
            ></Button>
        </div>
        <div class="clear_select" v-else></div>
    </template>
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
const selectedParticipantList = ref([]);

const loading = ref(false);
const action = ref('Одобрить');
const actionsList = ref(['Одобрить', 'Отклонить']);

const viewParticipants = async () => {
    try {
        loading.value = true;
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
                loading.value = false;
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
                loading.value = false;
            }
        }, 100);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const onToggleSelectCompetition = (participant, checked) => {
    // console.log('participant', participant.selected);
    // console.log('checked', checked);
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

const cancelApplication = async (id) => {
    try {
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

const onAction = async () => {
    try {
        for (const application of selectedParticipantList.value) {
            if (action.value === 'Одобрить') {
                console.log('app', application.user.id, application);
                await confirmApplication(application.user.id);
            } else {
                await cancelApplication(application.user.id);
            }
            participantList.value = participantList.value.filter(
                (participant) => participant.id != application.user.id,
            );
            selectedParticipantList.value =
                selectedParticipantList.value.filter(
                    (participant) => participant.id != application.user.id,
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
</script>

<style lang="scss" >
.participants__actions {
    display: flex;
    // display: grid;
    // width: 100%;
    // justify-content: flex-end;
    // margin-bottom: 40px;
    // //width: 224px;
    // padding: 4px, 16px, 4px, 16px;
    // border-radius: 10px;
    // border: 1px;
    // gap: 10px;
}

// .v-input__control {
//     width: 229px;
// }

.participants__actions-select {
    background-color: inherit;
    min-width: 224px;
    height: 48px;
    border-radius: 10px;
}
</style>
