<template>
    <div class="container">
        <p class="main_title">Многоэтапная заявка</p>
        <p class="subtitle">Подал:</p>
        <div class="horizontallso-item__wrapper" v-for="application in applications" :key="application.id">
            <div class="horizontallso-img">
                <img class="competition__avatar_circle" :src="application?.emblem" alt="logo" v-if="application.emblem"/>
                <img v-else src="@app/assets/user-avatar.png" alt="photo" />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ application?.district_headquarter?.name }}
                    {{ application?.regional_headquarter?.name }}
                    {{ application?.local_headquarter?.name }}
                    {{ application?.educational_headquarter?.name }}
                    {{ application?.detachment?.name }}
                </p>
            </div>
        </div>
        <div class="document">
            <p class="subtitle" v-if="files.length">Сопутствующие документы:</p>
            <div class="file" v-for="file in files" :key="file">
                <div class="file_name">
                    <img class="file_img" src="/assets/file_dock.svg" />
                    <a :href="file.document" target="_blank">{{
                        file.document.slice(file.document.indexOf('_') + 1)
                        }}</a>
                </div>
                <a class="download_text" :href="file.document" target="_blank">
                    <img class="download_img" src="/assets/download.svg" />
                    скачать файл
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const headquarters = ref({});
const applications = ref([]);
const files = ref([]);
console.log(route.params);
const getApplicationsInfo = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.eventId}/multi_applications/detail/${route.params.id}/`,
        );
        for (const obj of data) {
            if (!obj.is_approved) applications.value.push(obj);
        }
        console.log(applications.value);
    } catch (e) {
        console.log('getApplicationInfo error', e);
    }
};

const getFilesInfo = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/user_documents/`,
        );
        for (const file of data.results) {
            if (
                file.user.id == applications.value[0].organizer_id &&
                file.event.id == route.params.id
            )
                files.value.push(file);
        }
    } catch (e) {
        console.log('getFilesInfo error', e);
    }
};

onMounted(async () => {
    await getApplicationsInfo();
    if (applications.value.length > 0) {
        await getFilesInfo();
    }
});
</script>

<style scoped>
.main_title {
    margin: 40px 0px;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.subtitle {
    margin: 20px 0px;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.horizontallso-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 4px 20px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    /* margin-left: 12px; */
    margin-bottom: 12px;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.horizontallso-item__list-date {
    width: 95px;
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}

.horizontallso-item__list-full {
    color: #35383f;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}

.file_name {
    display: flex;
    flex-wrap: nowrap;
    color: #35383f;
    font-size: 16px;
    font-style: normal;
    align-items: center;
    font-weight: 400;
    line-height: 20px;
    text-decoration-line: underline;
}

.download_text {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: #1f7cc0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.download_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 40px;
    margin-right: 4px;
}

.file {
    display: flex;
    flex-wrap: nowrap;
}

.button {
    padding-top: 60px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
}

.deny_button {
    border-radius: 10px;
    border: 2px solid #35383f;
    padding: 16px 32px;
}

.submit_button {
    border-radius: 10px;
    background: #39bfbf;
    padding: 16px 32px;
    margin-left: 20px;
    color: #fff;
}

.container {
    margin: 0 auto;
    padding-bottom: 60px;
}

.competition__avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}

.competition__avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}
</style>
