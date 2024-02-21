<template>
    <div class="container">
        <p class="main_title">Многоэтапная заявка</p>
        <p class="subtitle">Подал:</p>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ headquarter.name }}
                </p>
            </div>
        </div>
        <div class="document">
            <p class="subtitle">Сопутствующие документы:</p>
            <div class="file">
                <div class="file_name">
                    <img class="file_img" src="/assets/file_dock.svg" />{{
                        application.documents?.[0]
                    }}
                </div>
                <a
                    class="download_text"
                    :href="application.documents"
                    target="_blank"
                >
                    <img class="download_img" src="/assets/download.svg" />
                    скачать файл
                </a>
            </div>
        </div>
        <div class="button">
            <button type="submit" class="deny_button">Отклонить</button>
            <button type="submit" class="submit_button">Одобрить</button>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const headquarters = ref({});
const application = ref({});

const getApplicationInfo = async () => {
    try{
        const { data } = HTTP.get(`/events/${route.params.id}/multi_applications/all`, {
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
        });
        application.value = data;
    } catch(e) {
        console.log('getApplicationInfo error', e);
    }
}

const getHeadquarters = async () => {
    try {
        const {data} = HTTP.get(`/events/${route.params.id}/multi_applications/detail/${application.value.organizer_id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            }
        });
        headquarters.value = data;
    } catch(e) {
        console.log('getHeadquarters error', e);
    }
}

onMounted(async () => {
    await getApplicationInfo();
    await getHeadquarters();
    console.log(application.value);
    console.log(headquarters.value);
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
    align-items: baseline;
    align-items: center;
    padding: 4px 20px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-left: 12px;
    width: 100%;
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
</style>
