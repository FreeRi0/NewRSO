<template>
    <div class="container" v-if="!loading">
        <p class="main_title">Групповая заявка</p>
        <p class="subtitle">Подал:</p>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img class="avatar_circle" :src="application.headquarter_author.banner" alt="logo" />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ application.headquarter_author.name }}
                </p>
            </div>
        </div>
        <div class="download" @click="downloadList">
            <a class="download_text">
                <img class="download_img" src="/assets/download.svg" />
                скачать список
            </a>
        </div>
        <div class="horizontallso-item__wrapper" v-for="user in application.applicants" :key="user.id">
            <div class="horizontallso-img">
                <img class="avatar_circle" :src="user.user.avatar.photo" alt="avatar" />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ user.user.first_name + ' ' + user.user.last_name }}
                </p>
                <div class="horizontallso-item__list-date">
                    <span style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "></span>
                    <p>{{ user.user.date_of_birth }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { onMounted, ref } from 'vue';

import { useRoute } from 'vue-router';
import * as XLSX from 'xlsx';


const route = useRoute();

const loading = ref(true);
const application = ref({});
console.log(route.params);
const getApplicatonsList = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.eventId}/group_applications/all/${route.params.id}`,

        );
        application.value = data;
        loading.value = false;
    } catch (e) {
        console.log('getApplicatonsList error', e);
    }
};

const downloadList = () => {
    const workbook = XLSX.utils.book_new();

    const worksheet_data = [
        ["ФИО", "Почта", "Телефон", "Членский взнос"],
        ...application.value.applicants.map(item => [`${item.user.last_name} ${item.user.first_name} ${item.user.patronymic_name}`, item.user.email, item.user.phone_number, item.user.membership_fee ? 'Оплачен' : 'Не оплачен'])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members.xlsx';
    document.body.appendChild(a);
    a.click();
}

onMounted(async () => {
    await getApplicatonsList();
    // console.log(applicationsList.value);
});
</script>

<style lang="scss" scoped>
.file_img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 8px;
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

.download {
    float: right;
    margin-bottom: 12px;
    margin-top: 40px;
    cursor: pointer;
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

.container {
    margin: 0 auto;
    padding-bottom: 60px;
    padding-top: 0px;
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

.button {
    padding-top: 60px;
    //margin-left: 20px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
}

.main_title {
    // margin: 40px 0px;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 40px;
}

.subtitle {
    margin-bottom: 24px;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    height: 48px;
    width: 48px;

    input {
        width: 24px;
        height: 24px;
    }
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
    //margin-left: 12px;
    width: 100%;
    margin-top: 12px;
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

.horizontallso {
    display: flex;

    &-img {
        align-items: center;
        width: 36px;
        height: 36px;
        justify-content: start;

        img {
            display: flex;
            position: relative;
            align-items: center;
        }
    }
}

.avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}
</style>
