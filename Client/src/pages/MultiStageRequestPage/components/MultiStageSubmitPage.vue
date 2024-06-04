<template>
    <div class="container" v-if="!loading">
        <p class="main_title">Многоэтапная заявка</p>
        <div v-if="!processApplication">
            <multi-stage-submit-first :me="meInfo" :event="eventInfo" :route="route" />
        </div>
        <div v-else><multi-stage-submit-second :route="route" /></div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import MultiStageSubmitFirst from './FirstStage/MultiStageSubmitFirst.vue';
import MultiStageSubmitSecond from './SecondStage/MultiStageSubmitSecond.vue';

const loading = ref(true);
const route = useRoute();

const processApplication = ref(false);

const eventInfo = ref({});
const meInfo = ref({});
const meCommander = ref({});
const applications = ref([]);

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
        const { data } = await HTTP.get(`/events/${route.params.id}`,);
        eventInfo.value = data;
    } catch (e) {
        console.log('getEventInfo error', e);
    }
};

const getMeInfo = async () => {
    try {
        const { data } = await HTTP.get(`/users/me/`,);
        meInfo.value = data;
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
        loading.value = false;
    } catch (e) {
        loading.value = false;
        console.log('getApplicationinfo error', e);
    }
};

onMounted(async () => {
    await getEventInfo();
    await getMeInfo();
    await getMeCommander();
    await getApplicationinfo();
});
</script>

<style scoped lang="scss">
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
    padding-bottom: 60px;
}
</style>
