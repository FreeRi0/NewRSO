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
            <div class="d-flex align-center">
                <div class="contributor-sort__all">
                    <input
                        type="checkbox"
                        @click="select"
                        placeholder="Выбрать все"
                        v-model="checkboxAll"
                    />
                </div>
                <div class="ml-3">Выбрать всё</div>
            </div>
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

        <div class="error" v-if="isError.non_field_errors">
            {{ '' + isError.non_field_errors }}
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
const ev = ref([]);
const eventsList = ref([]);
const selectedEventList = ref([]);
const checkboxAll = ref(false);
const isError = ref([]);
const swal = inject('$swal');
const loading = ref(false);
const action = ref('Одобрить');

const actionsList = ref([
    {
        value: 'Одобрить',
        name: 'Одобрить',
    },
    { value: 'Отклонить', name: 'Отклонить' },
]);

const viewEvents = async (event_pk) => {
    try {
        const eventsRequest = await HTTP.get(
            `/events/${event_pk}/applications/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        eventsList.value = [...eventsList.value, ...eventsRequest.data.results];
        selectedEventList.value = [];
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const events = async () => {
    try {
        const eventsRequest = await HTTP.get(`/events/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token' + localStorage.getItem('Token'),
            },
        });
        ev.value = eventsRequest.data.results;
        for (let i in eventsRequest.data.results) {
            viewEvents(eventsRequest.data.results[i].id);
        }
    } catch (error) {
        console.log('an error occured' + error);
    }
};

const select = (event) => {
    selectedEventList.value = [];
    if (event.target.checked) {
        for (let index in eventsList.value) {
            eventsList.value[index].selected = true;
            selectedEventList.value.push(eventsList.value[index]);
        }
    } else {
        for (let index in eventsList.value) {
            eventsList.value[index].selected = false;
        }
    }
};

const onToggleSelectCompetition = (event, checked) => {
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

const confirmApplication = async (event_pk, id) => {
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

const cancelApplication = async (event_pk, id) => {
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
                await confirmApplication(application.event.id, application.id);
            } else {
                await cancelApplication(application.event.id, application.id);
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
    await events();
    await viewEvents();
});

// onActivated(async () => {
//     await events();
// });
</script>

<style>
.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Acrobat';
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}
</style>
