<template>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="!loading && (!eventsList.length && !groupEventsList.length)">Список заявок пуст</p>
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
            <template v-for="event in eventsList" :key="event.id">
                <applicationCompetitionItem :event="event" :is-group="false" @select="onToggleSelectCompetition" />

            </template>
            <template v-for="event in groupEventsList" :key="event.id">
                <applicationCompetitionItem :event="event" :is-group="true" @select="onToggleSelectGroupCompetition" />
            </template>
            <template v-if="selectedEv.length">
                <p class="text_total">Итого: {{ selectedEv.length }}</p>

                <selectedApplicationEventItem v-for="event in selectedEventList" :action="action" :is-group="false"
                    :event="event" :key="event.id" @select="onToggleSelectCompetition" />
                <selectedApplicationEventItem v-for="event in selectedGroupEventsList" :is-group="true" :action="action"
                    :event="event" :key="event.id" @select="onToggleSelectGroupCompetition" />
            </template>
        </div>

        <div class="error" v-if="isError.non_field_errors">
            {{ "" + isError.non_field_errors }}
        </div>

        <div class="participants__btn" v-if="selectedEv.length">
            <Button class="save" type="button" label="Сохранить" @click="onAction"></Button>
        </div>

    </template>
</template>
<script setup>
import {
    applicationCompetitionItem,
    selectedApplicationEventItem,
} from "@entities/Competitions/components";
import { storeToRefs } from "pinia";
import { Button } from "@shared/components/buttons";
import { HTTP } from "@app/http";
import { sortByEducation } from "@shared/components/selects";
import { ref, onMounted, inject, computed, watch } from "vue";
import { useUserStore } from "@features/store/index";
import { useEventsStore } from "@features/store/events";

const eventsStore = useEventsStore();
const userStore = useUserStore();
const ev = ref([]);
const eventsList = ref([]);
const groupEventsList = ref([]);
const selectedGroupEventsList = ref([]);
const selectedEv = ref([]);
const selectedEventList = ref([]);
const checkboxAll = ref(false);
const isError = ref([]);
const swal = inject("$swal");
const loading = ref(false);
const action = ref("Одобрить");

let userId = computed(() => {
    return userStore.currentUser.id;
});


const actionsList = ref([
    {
        value: "Одобрить",
        name: "Одобрить",
    },
    { value: "Отклонить", name: "Отклонить" },
]);


const viewEvents = async (event_pk) => {
    loading.value = true;
    try {

        const eventsRequest = await HTTP.get(`/events/${event_pk}/applications/`);
        eventsList.value = [...eventsList.value, ...eventsRequest.data.results];

        selectedEventList.value = [];
        selectedGroupEventsList.value = [];

    } catch (error) {

        console.log("an error occured " + error);
    }
    loading.value = false;
};

const viewGroupEvents = async (event_pk) => {
    loading.value = true;
    try {

        const eventsGroupRequest = await HTTP.get(
            `/events/${event_pk}/group_applications/all/`
        );
        groupEventsList.value = [
            ...groupEventsList.value,
            ...eventsGroupRequest.data.results,
        ];

    } catch (error) {

        console.log("an error occured " + error);
    }
    loading.value = false;
};

const events = async (id) => {
    try {

        const eventsRequest = await HTTP.get(`/events/?active_organizer_user_id=${id}`);
        ev.value = eventsRequest.data.results;
        for (let i in eventsRequest.data.results) {
            viewEvents(eventsRequest.data.results[i].id);
            viewGroupEvents(eventsRequest.data.results[i].id);
        }

    } catch (error) {
        console.log("an error occured" + error);
    }
};



const select = (event) => {
    selectedEventList.value = [];
    selectedGroupEventsList.value = [];
    if (event.target.checked) {
        for (let index in eventsList.value) {
            eventsList.value[index].selected = true;
            selectedEventList.value.push(eventsList.value[index]);
            selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
        }
        for (let index in groupEventsList.value) {
            groupEventsList.value[index].selected = true;
            selectedGroupEventsList.value.push(groupEventsList.value[index]);
            selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
        }

    } else {
        for (let index in eventsList.value) {
            eventsList.value[index].selected = false;
        }
        for (let index in groupEventsList.value) {
            groupEventsList.value[index].selected = false;
        }
    }
};

const onToggleSelectCompetition = (event, checked) => {
    if (checked) {
        event.selected = checked;
        selectedEventList.value.push(event);
        selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
    } else {
        event.selected = checked;
        selectedEventList.value = selectedEventList.value.filter((c) => c.id !== event.id);
        selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
    }
};

const onToggleSelectGroupCompetition = (event, checked) => {
    if (checked) {
        event.selected = checked;
        selectedGroupEventsList.value.push(event);
        selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
    } else {
        event.selected = checked;
        selectedGroupEventsList.value = selectedGroupEventsList.value.filter((c) => c.id !== event.id);
        selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
    }
};



const confirmApplication = async (event_pk, id) => {
    try {
        const approveReq = await HTTP.post(
            `/events/${event_pk}/applications/${id}/confirm/`,
            {},
        );
        swal.fire({
            position: "top-center",
            icon: "success",
            title: "успешно",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log("errr", error);
        isError.value = error.response.data;
        console.error("There was an error!", error);
        if (isError.value) {
            swal.fire({
                position: "center",
                icon: "error",
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const confirmGroupApplication = async (event_pk, id) => {
    try {
        const approveReq = await HTTP.post(
            `/events/${event_pk}/group_applications/all/${id}/approve/`,
            {},
        );
        swal.fire({
            position: "top-center",
            icon: "success",
            title: "успешно",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log("errr", error);
        isError.value = error.response.data;
        console.error("There was an error!", error);
        if (isError.value) {
            swal.fire({
                position: "center",
                icon: "error",
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
            {}
        );
        swal.fire({
            position: "top-center",
            icon: "success",
            title: "успешно",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log("errr", error);
        isError.value = error.response.data;
        console.error("There was an error!", error);
        if (isError.value) {
            swal.fire({
                position: "center",
                icon: "error",
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const cancelGroupApplication = async (event_pk, id) => {
    try {
        const rejectReq = await HTTP.delete(
            `/events/${event_pk}/group_applications/all/${id}/reject`,
            {}
        );
        swal.fire({
            position: "top-center",
            icon: "success",
            title: "успешно",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        console.log("errr", error);
        isError.value = error.response.data;
        console.error("There was an error!", error);
        if (isError.value) {
            swal.fire({
                position: "center",
                icon: "error",
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
            if (action.value === "Одобрить") {
                await confirmApplication(application.event.id, application.id);
                await userStore.getCountApp();
            } else {
                await cancelApplication(application.event.id, application.id);
                await userStore.getCountApp();
            }

            eventsList.value = eventsList.value.filter((event) => event.id != application.id);
            selectedEventList.value = selectedEventList.value.filter(
                (event) => event.id != application.id
            );
            selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
        }
        for (const applicationGroup of selectedGroupEventsList.value) {
            if (action.value === "Одобрить") {
                await confirmGroupApplication(applicationGroup.event.id, applicationGroup.id);
                await userStore.getCountApp();
            } else {
                await cancelGroupApplication(applicationGroup.event.id, applicationGroup.id);
                await userStore.getCountApp();
            }

            groupEventsList.value = groupEventsList.value.filter((event) => event.id != applicationGroup.id);
            selectedGroupEventsList.value = selectedGroupEventsList.value.filter(
                (event) => event.id != applicationGroup.id
            );
            selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
        }
    } catch (e) {
        console.log("error action", e);
    }
};

onMounted(async () => {
    await events(userStore.currentUser.id);
    await viewEvents();
    await viewGroupEvents();
});
</script>

<style>
.error {
    color: #db0000;
    font-size: 14px;
    font-weight: 600;
    font-family: "Acrobat";
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}
</style>
