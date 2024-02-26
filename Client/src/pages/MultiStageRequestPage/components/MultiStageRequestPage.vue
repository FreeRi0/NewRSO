<template>
    <div class="container">
        <p class="main_title">Многоэтапная заявка</p>
        <div v-if="applications.length > 0">
            <p class="subtitle">Подал:</p>
            <div
                class="horizontallso-item__wrapper"
                v-for="headquarter in headquarters"
                :key="headquarter.id"
            >
                <div class="horizontallso-img">
                    <img
                        class="competition__avatar_circle"
                        :src="headquarter?.emblem"
                        alt="logo"
                    />
                </div>
                <div class="containerHorizontal">
                    <p class="horizontallso-item__list-full">
                        {{ headquarter?.district_headquarter?.name }}
                        {{ headquarter?.regional_headquarter?.name }}
                        {{ headquarter?.local_headquarter?.name }}
                        {{ headquarter?.educational_headquarter?.name }}
                        {{ headquarter?.detachment?.name }}
                    </p>
                </div>
            </div>
            <div class="document">
                <p class="subtitle" v-if="files">Сопутствующие документы:</p>
                <div class="file" v-for="file in files" :key="file">
                    <div class="file_name">
                        <img class="file_img" src="/assets/file_dock.svg" />
                        <a :href="file.document" target="_blank">{{
                            file.document.slice(file.document.indexOf('_') + 1)
                        }}</a>
                    </div>
                    <a
                        class="download_text"
                        :href="file.document"
                        target="_blank"
                    >
                        <img class="download_img" src="/assets/download.svg" />
                        скачать файл
                    </a>
                </div>
            </div>
            <div class="button">
                <button @click="onCancel" type="submit" class="deny_button">
                    Отклонить
                </button>
                <button @click="onAccept" type="submit" class="submit_button">
                    Одобрить
                </button>
            </div>
        </div>
        <p v-else class="subtitle">Заявок нет</p>
        <p v-else class="subtitle">Заявок нет</p>
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

const getApplicationsInfo = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/multi_applications/all/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        for (const obj of data) {
            console.log(obj);
            if (!obj.is_approved) applications.value.push(obj);
        }
        //console.log(applications.value);
        //console.log(applications.value.length);
    } catch (e) {
        console.log('getApplicationInfo error', e);
    }
};

const getFilesInfo = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/user_documents/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        for (const file of data) {
            if (
                file.user.id == applications.value[0].organizer_id &&
                file.event.id == route.params.id
            )
                files.value.push(file);
        }
        //files.value = data;
        console.log(data);
        console.log(applications.value);
    } catch (e) {
        console.log('getFilesInfo error', e);
    }
};

const getHeadquarters = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/multi_applications/detail/${applications.value[0].organizer_id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        headquarters.value = data;
        //console.log(headquarters.value);
    } catch (e) {
        console.log('getHeadquarters error', e);
    }
};

const onCancel = async () => {
    try {
        await HTTP.delete(
            `/events/${route.params.id}/multi_applications/delete/${applications.value[0].organizer_id}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        applications.value.shift();
        redirect();
    } catch (e) {
        console.log('onCancel error', e);
    }
};

const onAccept = async () => {
    try {
        await HTTP.post(
            `/events/${route.params.id}/multi_applications/confirm/${applications.value[0].organizer_id}/`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        applications.value.shift();
        redirect();
    } catch (e) {
        console.log('onAccept error', e);
    }
};

const redirect = async () => {
    console.log(applications.value);
    if (applications.value.length == 0)
        router.push({
            name: 'MultiStageRequest',
            params: {
                id: route.params.id,
                applicationId: applications.value[0].organizer_id,
            },
        });
    else
        router.push({
            name: 'Action',
            params: {
                id: route.params.id,
            },
        });
};
onMounted(async () => {
    await getApplicationsInfo();
    if (applications.value.length > 0) {
        await getFilesInfo();
        await getHeadquarters();
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
    margin-left: 12px;
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
    padding: 0px 130px 60px 130px;
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
