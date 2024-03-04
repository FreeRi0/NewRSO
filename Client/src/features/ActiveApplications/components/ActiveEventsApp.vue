<template>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="!loading && !eventsList.length">Список заявок пуст</p>
    <template v-else>
        <div class="participants__actions">
            <div class="participants__actions-select mr-3">
                <sortByEducation
                    placeholder="Выберите действие"
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
            <template v-for="event in eventsList" :key="event.id">
                <applicationCompetitionItem
                    :event="event"
                    @select="onToggleSelectCompetition"
                />
            </template>
            <template v-if="selectedEventList.length">
                <p class="text_total">Итого: {{ selectedEventList.length }}</p>

                <selectedApplicationEventItem
                    v-for="event in selectedEventList"
                    :action="action"
                    :event="event"
                    :key="event.id"
                    @select="onToggleSelectCompetition"
                />
            </template>
        </div>

        <div class="participants__btn" v-if="selectedEventList.length">
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
import {
    applicationCompetitionItem,
    selectedApplicationEventItem,
} from '@entities/Competitions/components';
import { useRoleStore } from '@layouts/store/role';
import { storeToRefs } from 'pinia';
import { Button } from '@shared/components/buttons';
import { HTTP } from '@app/http';
import { sortByEducation } from '@shared/components/selects';
import { ref, onMounted, onActivated, inject } from 'vue';

const roleStore = useRoleStore();
const roles = storeToRefs(roleStore);
const eventsList = ref([]);
const selectedEventList = ref([]);
const checkboxAllEvents = ref(false);
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

const viewEvents = async () => {
    try {
        let event_pk = 4;
        const eventsRequest = await HTTP.get(
            `/events/${event_pk}/applications/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        eventsList.value = eventsRequest.dataж;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const onToggleSelectCompetition = (event, checked) => {
    // console.log('participant', participant.selected);
    // console.log('checked', checked);
    if (checked) {
        event.selected = checked;
        selectedEventList.value.push(event);
    } else {
        event.selected = checked;
        selectedEventList.value = selectedEventList.value.filter(
            (c) => c.id !== event.id,
        );
    }
};

const confirmApplication = async (id, event_pk) => {
    try {
        const approveReq = await HTTP.post(
            `/events/${event_pk}/applications/${id}/confirm/`,
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

const cancelApplication = async (id, event_pk) => {
    try {
        const rejectReq = await HTTP.delete(
            `/events/${event_pk}/applications/${id}/`,
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
        for (const application of selectedEventList.value) {
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
            eventsList.value = eventsList.value.filter(
                (event) => event.id != application.id,
            );
            selectedEventList.value = selectedEventList.value.filter(
                (event) => event.id != application.id,
            );
        }
        await viewEvents();
    } catch (e) {
        console.log('error action', e);
    }
};

onMounted(async () => {
    await viewEvents();
});

onActivated(async () => {
    await viewEvents();
});
</script>
