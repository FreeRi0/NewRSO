<template>
    <div class="container" v-if="!loading">
        <template v-if="applicationsList.length">
            <p class="main_title">Групповая заявка</p>
            <p class="subtitle">Подал:</p>
            <div class="horizontallso-item__wrapper">
                <div class="horizontallso-img">
                    <img class="avatar_circle" :src="applicationsList[0].headquarter_author.banner" alt="logo" />
                </div>
                <div class="containerHorizontal">
                    <p class="horizontallso-item__list-full">
                        {{ applicationsList[0].headquarter_author.name }}
                    </p>
                </div>
            </div>
            <div class="download" @click="downloadList">
                <a class="download_text">
                    <img class="download_img" src="/assets/download.svg" />
                    скачать список
                </a>
            </div>
            <div class="horizontallso-item__wrapper" v-for="user in applicationsList[0].applicants" :key="user.id">
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
            <div class="button">
                <button type="submit" class="deny_button" @click="onDeny">
                    Отклонить
                </button>
                <button type="submit" class="submit_button" @click="onSubmit">
                    Одобрить
                </button>
            </div>
        </template>
        <p class="subtitle" v-else>Заявок сейчас нет</p>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { onMounted, ref } from 'vue';

import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';


const route = useRoute();
const router = useRouter();

const loading = ref(true);
const applicationsList = ref({});

const getApplicatonsList = async () => {
    try {
        const { data } = await HTTP.get(
            `/events/${route.params.id}/group_applications/all/`,

        );
        applicationsList.value = data.results;
        loading.value = false;
    } catch (e) {
        console.log('getApplicatonsList error', e);
    }
};

const onSubmit = async () => {
    try {
        await HTTP.post(
            `/events/${route.params.id}/group_applications/all/${applicationsList.value[0].id}/approve/`,
            {},

        );

        await relocate();
    } catch (e) {
        console.log('onSubmit error', e);
    }
};

const onDeny = async () => {
    try {
        await HTTP.delete(
            `/events/${route.params.id}/group_applications/all/${applicationsList.value[0].id}/reject/`,

        );

        await relocate();
    } catch (e) {
        console.log('onDeny error', e);
    }
};

const relocate = async () => {
    if (applicationsList.value[1]) {
        router.push({
            name: 'GroupRequest',
            params: {
                id: applicationsList.value[1].id,
            },
        });
    } else {
        router.push({
            name: 'Action',
            params: {
                id: applicationsList.value[0].headquarter_author.id,
            },
        });
    }
};

const downloadList = () => {
    const workbook = XLSX.utils.book_new();

    const downloadTemp = [];
    
    applicationsList.value[0].applicants.map(item => { 
        downloadTemp.push({
            last_name: item.user.last_name,
            first_name: item.user.first_name,
            patronymic_name: item.user.patronymic_name,
            email: item.user.email,
            phone_number: item.user.phone_number,
            membership_fee: item.user.membership_fee ? item.user.membership_fee = "Оплачен" : item.user.membership_fee = "Не оплачен",
        });
    })

    const worksheet_data = [
        ["ФИО", "Почта", "Телефон", "Членский взнос"],
        ...downloadTemp.map(item => [`${item.last_name} ${item.first_name} ${item.patronymic_name}`, item.email, item.phone_number, item.membership_fee])
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
