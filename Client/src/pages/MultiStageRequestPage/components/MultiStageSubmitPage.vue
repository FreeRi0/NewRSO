<template>
    <div class="container">
        <p class="main_title">Многоэтапная заявка</p>
        <p class="subtitle" v-if="permissonDeny">
            Вы не можете подавать заявку
        </p>
        <div v-else-if="!processApplication">
            <multi-stage-submit-first
                :me="meInfo"
                :event="eventInfo"
                :route="route"
            />
        </div>
        <div v-else-if="juniorHQ"><multi-stage-submit-second /></div>
        <p class="subtitle" v-else>Вы уже подали заявку</p>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import MultiStageSubmitSecond from './MultiStageSubmitSecond.vue';
import MultiStageSubmitFirst from './MultiStageSubmitFirst.vue';

const route = useRoute();

const juniorHQ = ref(false);
const permissonDeny = ref(false);
const processApplication = ref(false);

const eventInfo = ref({});
const meInfo = ref({});
const meCommander = ref({});
const applications = ref([]);

const checkJuniorHQ = async () => {};

const checkApplicationOnProcess = async () => {
    if (applications.value.length) {
        for (const app of applications.value) {
            if (app.organizer_id == meInfo.value.id)
                processApplication.value = true;
        }
    }
};

const getEventInfo = async () => {
    try {
        const { data } = await HTTP.get(`/events/${route.params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        eventInfo.value = data;
        console.log(eventInfo.value);
    } catch (e) {
        console.log('getEventInfo error', e);
    }
};

const getMeInfo = async () => {
    try {
        const { data } = await HTTP.get(`/users/me/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        meInfo.value = data;
        console.log(meInfo.value);
    } catch (e) {
        console.log('getMeInfo error', e);
    }
};

const getMeCommander = async () => {
    try {
        const { data } = await HTTP.get(
            `/rsousers/${meInfo.value.id}/commander/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        meCommander.value = data;
        console.log(data);
    } catch (e) {
        console.log('getMeCommander error', e);
    }
};

const getApplicationinfo = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/multi_applications/all`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        applications.value = data;
        await checkApplicationOnProcess();
        console.log(applications.value);
    } catch (e) {
        permissonDeny.value = true;
        console.log(permissonDeny.value);
        console.log('getApplicationinfo error', e);
    }
};

onMounted(async () => {
    await getEventInfo();
    await getMeInfo();
    await getMeCommander();
    await getApplicationinfo();
    if (processApplication.value) {
        await checkJuniorHQ();
    }
});
</script>

<style scoped lang="scss">
.container {
    margin: 0 auto;
    padding: 0px 130px 60px 130px;
}
.main_title {
    margin: 40px 0px;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.subtitle {
    font-style: normal;
    height: 26px;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
    margin-bottom: 24px;
}
.container {
    margin: 0 auto;
    padding: 0px 130px 60px 130px;
}
</style>
