<template>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="!loading && (!eventsList.length)">Список заявок пуст</p>
    <template v-else>
        <div class="participants__actions">
            <div class="participants__actions-select mr-3">
                <sortByEducation placeholder="Выберите действие" variant="outlined" clearable v-model="action"
                    :options="actionsList"></sortByEducation>
            </div>
            <div class="d-flex align-center">
                <div class="contributor-sort__all">
                    <input type="checkbox" v-model="isCheckedAll" @change="onChooseAll" />
                </div>
                <div class="ml-3">Выбрать всё</div>
            </div>
        </div>

        <div class="participants__list">
            <template v-for="event in eventsList" :key="event.id">
                <applicationCompetitionItem :event="event" @select="onToggleSelectCompetition" />
            </template>
            <template v-if="selectedEventList.length">
                <p class="text_total">Итого: {{ selectedEventList.length }}</p>
                <selectedApplicationEventItem v-for="event in selectedEventList" :action="action"
                    :event="event" :key="event.id" @select="onToggleSelectCompetition" />
            </template>
        </div>

        <div class="error" v-if="isError.non_field_errors">
            {{ "" + isError.non_field_errors }}
        </div>

        <div class="participants__btn" v-if="selectedEventList.length">
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
const isCheckedAll = ref(false);
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
    { 
        value: "Отклонить", 
        name: "Отклонить",
    },
]);


const viewEvents = async (event_pk, application_type) => {
    try {
        const { data } = await HTTP.get(`/events/${event_pk}/applications/`);
        for(let i in data.results) {
            if (application_type == "Персональная") {
                data.results[i].personal = true;
            } else {
                data.results[i].personal = false;
            }
            data.results[i].chosen = false;
            data.results[i].group = false;
            data.results[i].event.application_type = "Многоэтапная";
        }
        eventsList.value = [...eventsList.value, ...data.results];
    } catch (error) {
        console.log("an error occured " + error);
    }
};

const viewMultistageEvents = async (event) => {
    try {
        const { data } = await HTTP.get(`/events/${event.id}/multi_applications/all/`);
        for(let i in data) {
            data[i].chosen = false;
            data[i].multi = true;
            data[i].event = event;
            if(!data[i].is_approved) {
                eventsList.value.push(data[i])
            }
        }
    } catch (error) {
        console.log("an error occured " + error);
    }
}

const viewGroupEvents = async (event_pk) => {
    try {
        const { data } = await HTTP.get(
            `/events/${event_pk}/group_applications/all/`
        );
        for(let i in data.results) {
            data.results[i].group = true;
            data.results[i].chosen = false;
        }
        eventsList.value = [...eventsList.value, ...data.results];
    } catch (error) {
        console.log("an error occured " + error);
    }
};

const events = async (id) => {
    loading.value = true;
    try {
        const { data } = await HTTP.get(`/events/?active_organizer_user_id=${id}`);
        const myEvents = data.results;
        for (let i in myEvents) {
            if(myEvents[i].application_type === "Групповая") {
                viewGroupEvents(myEvents[i].id);
            } else if (myEvents[i].application_type === "Персональная") {
                viewEvents(myEvents[i].id), myEvents[i].application_type;
            } else {
                viewMultistageEvents(myEvents[i]);
            }
        }
    } catch (error) {
        console.log("an error occured" + error);
    }
    loading.value = false;
};

const onChooseAll = () => {
    if (isCheckedAll.value){
        for(let event of eventsList.value){
            event.chosen = true;
        }
        selectedEventList.value = eventsList.value;
    } else {
        selectedEventList.value = [];
        for(let event of eventsList.value){
            event.chosen = false;
        }
    }
}

const onToggleSelectCompetition = (event, checked) => {
    if (checked) {
        event.chosen = checked;
        selectedEventList.value = [...selectedEventList.value, event];
    } else {
        event.chosen = checked;
        selectedEventList.value = selectedEventList.value.filter(
            (a) => a.id !== event.id,
        );
    }
};

const confirmApplication = async (event, id) => {
    try {
        if(event.event.application_type === "Групповая") {
            await HTTP.post(
                `/events/${event.event.id}/group_applications/all/${id}/approve/`,
                {},
            );
        } 
        else if (event.event.application_type === "Персональная") {
            await HTTP.post(
                `/events/${event.event.id}/applications/${id}/confirm/`,
                {},
            );
        } else {
            await HTTP.post(
                `/events/${event.event.id}/multi_applications/confirm/${id}/`,
                {},
            );
        }
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

const cancelApplication = async (event, id) => {
    try {
        if(event.event.application_type === "Групповая") {
            await HTTP.delete(
                `/events/${event.event.id}/group_applications/all/${id}/reject`,
                {}
            );
        } 
        else if (event.event.application_type === "Персональная") {
            await HTTP.delete(
                `/events/${event.event.id}/applications/${id}/`,
                {}
            );
        } else {
            await HTTP.post(
                `/events/${event.event.id}/multi_applications/delete/${id}/`,
                {},
            );
        }
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
        for (const event of selectedEventList.value) {
            if (action.value === "Одобрить") {
                await confirmApplication(event, event.id);
                await userStore.getCountApp();
            } else {
                await cancelApplication(event, event.id);
                await userStore.getCountApp();
            }

            eventsList.value = eventsList.value.filter((event) => event.id != event.id);
            selectedEventList.value = selectedEventList.value.filter(
                (event) => event.id != event.id
            );
            selectedEv.value = [...selectedEventList.value, ...selectedGroupEventsList.value]
        }
    } catch (e) {
        console.log("error action", e);
    }
};

watch(selectedEventList, (selectedEventList) => {
    isCheckedAll.value =
    eventsList.value.length == selectedEventList.length;
});

onMounted(async () => {
    await events(userStore.currentUser.id);
    setTimeout(() => console.log(eventsList.value), 1000);
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
