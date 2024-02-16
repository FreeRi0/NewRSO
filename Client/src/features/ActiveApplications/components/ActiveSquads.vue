<template>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="!loading && !detachmentList.length">Список заявок пуст</p>

    <template v-else>
        <div class="participants__actions">
            <div class="participants__actions-select mr-3">
                <sortByEducation
                    placeholder="Выберете действие"
                    variant="outlined"
                    clearable
                    v-model="action"
                    :options="actionsList"
                ></sortByEducation>
            </div>
            <!-- <div class="contributor-sort__all">
                <input
                    type="checkbox"
                    @click="selectSquads"
                    v-model="checkboxAllSquads"
                />
            </div> -->
        </div>
        <div class="participants__list">
            <template v-for="detachment in detachmentList" :key="detachment.id">
                <enteredSquad
                    :detachment="detachment"
                    @select="onToggleSelectCompetition"
                />
            </template>
            <template v-if="selectedDetachmentList.length">
                <p class="text_total">
                    Итого: {{ selectedDetachmentList.length }}
                </p>

                <checkedEnteredSquadItem
                    v-for="detachment in selectedDetachmentList"
                    :action="action"
                    :detachment="detachment"
                    :key="detachment.id"
                    @select="onToggleSelectCompetition"
                />
            </template>
        </div>

        <div class="participants__btn" v-if="selectedDetachmentList.length">
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
import { sortByEducation } from '@shared/components/selects';
import { ref, onMounted, onActivated, inject } from 'vue';
import { enteredSquad } from '@entities/Squads/components';
import { checkedEnteredSquadItem } from '@entities/Squads';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const detachmentList = ref([]);
const selectedDetachmentList = ref([]);
const checkboxAllSquads = ref(false);
const isError = ref([]);
const swal = inject('$swal');
const loading = ref(false);
const action = ref('Одобрить');
// const actionsList = ref(['Одобрить', 'Отклонить']);
const actionsList = ref([
    {
        value: 'Одобрить',
        name: 'Одобрить',
    },
    { value: 'Отклонить', name: 'Отклонить' },
]);
const viewDetachments = async () => {
    try {
        if (!roles.roles.value.detachment_commander) return;
        loading.value = true;
        let id = roles.roles.value.detachment_commander?.id;
        setTimeout(async () => {
            const detComRequest = await HTTP.get(
                `/detachments/${id}/applications/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            detachmentList.value = detComRequest.data;
            loading.value = false;
        }, 100);
        selectedDetachmentList.value = [];
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const onToggleSelectCompetition = (detachment, checked) => {
    // console.log('participant', participant.selected);
    // console.log('checked', checked);
    if (checked) {
        detachment.selected = checked;
        selectedDetachmentList.value.push(detachment);
    } else {
        detachment.selected = checked;
        selectedDetachmentList.value = selectedDetachmentList.value.filter(
            (c) => c.id !== detachment.id,
        );
    }
};

const confirmApplication = async (id, application_pk) => {
    try {
        const approveReq = await HTTP.post(
            `/detachments/${id}/applications/${application_pk}/accept/`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log('errr', error);
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

const cancelApplication = async (id, application_pk) => {
    try {
        const rejectReq = await HTTP.delete(
            `/detachments/${id}/applications/${application_pk}/accept/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
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
        console.log('errr', error);
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
        for (const application of selectedDetachmentList.value) {
            if (action.value === 'Одобрить') {
                console.log('app', application.id, application);
                await confirmApplication(
                    roles.roles.value.detachment_commander?.id,
                    application.id,
                );
            } else {
                await cancelApplication(
                    roles.roles.value.detachment_commander?.id,
                    application.id,
                );
            }
            detachmentList.value = detachmentList.value.filter(
                (detachment) => detachment.id != application.id,
            );
            selectedDetachmentList.value = selectedDetachmentList.value.filter(
                (detachment) => detachment.id != application.id,
            );
        }
        await viewDetachments();
    } catch (e) {
        console.log('error action', e);
    }
};

// const selectSquads = (event) => {
//     selectedDetachmentList.value = [];
//     console.log('fffss', checkboxAllSquads.value, event);
//     if (event.target.checked) {
//         console.log('fffss', checkboxAllSquads.value, event);
//         for (let index in detachmentList.value) {
//             console.log('arr', selectedDetachmentList.value);
//             selectedDetachmentList.value.push(detachmentList.value[index]);
//         }
//     }
// };

onMounted(async () => {
    await viewDetachments();
});

onActivated(async () => {
    await viewDetachments();
});
</script>
<style lang="scss"></style>
