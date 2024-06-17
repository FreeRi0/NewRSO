<template>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="!loading && !participantList.length">Список заявок пуст</p>

    <template v-else>
        <div class="participants__actions">
            <div class="participants__actions-select mr-3">
                <sortByEducation placeholder="Выберите действие" variant="outlined" clearable v-model="action"
                    :options="actionsList"></sortByEducation>
            </div>
            <div class="d-flex align-center">
                <div class="contributor-sort__all">
                    <input type="checkbox" @click="select" placeholder="Выбрать все" v-model="checkboxAll" />
                </div>
                <div class="ml-3">Выбрать всё</div>
            </div>
        </div>
        <div class="participants__list">
            <template v-for="participant in participantList" :key="participant.id">
                <referenceItem :participant="participant" @select="onToggleSelectCompetition" />
            </template>
            <template v-if="selectedParticipantList.length">
                <p class="text_total">
                    Итого: {{ selectedParticipantList.length }}
                </p>

                <checkedReferencesItem v-for="participant in selectedParticipantList" :action="action"
                    :participant="participant" :key="participant.id" @select="onToggleSelectCompetition" />
            </template>
        </div>

        <div class="participants__btn" v-if="selectedParticipantList.length">
            <Button class="save" type="button" label="Сохранить" @click="onAction" :disabled="!action"></Button>
        </div>
        <div class="clear_select" v-else></div>
    </template>
</template>
<script setup>
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { ref, onMounted, onActivated, inject } from 'vue';
import { referenceItem } from '@entities/ReferencesPeoples';
import { checkedReferencesItem } from '@entities/ReferencesPeoples';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
import { sortByEducation } from '@shared/components/selects';
import { useUserStore } from "@features/store/index";
import { ParticipantsList } from '@features/Participants/components';
const userStore = useUserStore();
const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const participantList = ref([]);
const selectedParticipantList = ref([]);
const checkboxAll = ref(false);
const loading = ref(false);
const isError = ref([]);
const swal = inject('$swal');
const action = ref('Одобрить');
// const actionsList = ref(['Одобрить', 'Отклонить']);
const actionsList = ref([
    {
        value: 'Одобрить',
        name: 'Одобрить',
    },
    { value: 'Отклонить', name: 'Отклонить' },
]);

const viewParticipants = async () => {
    try {
        loading.value = true;
        const regComReq = ref(null);
        const detComReq = ref(null);

        if (roleStore.roles.regionalheadquarter_commander?.id) {
            const regComReq = await HTTP.get(

                `/regionals/${roleStore.roles.regionalheadquarter_commander?.id}/verifications/`

            );
            participantList.value = regComReq.data;
            loading.value = false;
        } else if (roleStore.roles.detachment_commander?.id) {
            const detComReq = await HTTP.get(
                `/detachments/${roleStore.roles.detachment_commander?.id}/verifications/`,

            );
            participantList.value = detComReq.data;
            loading.value = false;
        }
        selectedParticipantList.value = [];
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const select = (event) => {
    selectedParticipantList.value = [];
    if (event.target.checked) {
        for (let index in participantList.value) {
            participantList.value[index].selected = true;
            selectedParticipantList.value.push(participantList.value[index]);
        }
    } else {
        for (let index in participantList.value) {
            participantList.value[index].selected = false;
        }
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

const confirmApplication = async (id) => {
    try {
        const approveReq = await HTTP.post(
            `rsousers/${id}/verify/`,
            {},
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        isError.value = error.response.data;
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const cancelApplication = async (id) => {
    try {
        const rejectReq = await HTTP.delete(
            `/rsousers/${id}/verify/`,
            {},
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        isError.value = error.response.data;
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const onAction = async () => {
    try {
        for (const application of selectedParticipantList.value) {
            if (action.value === 'Одобрить') {

                await confirmApplication(application.user.id);
                await userStore.getCountApp();
            } else {
                await cancelApplication(application.user.id);
                await userStore.getCountApp();
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
</script>

<style lang="scss">
.participants__actions {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    margin-bottom: 20px;
}

.checked {
    margin-bottom: 80px;
}

.participants__actions-select {
    background-color: inherit;
    width: 224px;
    height: 48px;
    border-radius: 10px;
}

.contributor-sort__all {
    padding: 11px 12px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;

    input {
        width: 24px;
        height: 24px;
    }
}

// .participants__list {
//     padding-bottom: 80px;
// }
.text_total {
    margin-top: 60px;
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: bold;
}
</style>
