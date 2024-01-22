<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <p class="main_title">Индивидуальная заявка</p>
        <p class="subtitle">Подал:</p>
        <div class="horizontallso-item__wrapper">
            <div class="horizontallso-img">
                <img :src="user.media.photo" alt="logo" v-if="user.media" />
                <img
                    src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                    alt="photo"
                    v-else
                />
            </div>
            <div class="containerHorizontal">
                <p class="horizontallso-item__list-full">
                    {{ user.first_name }}
                </p>
                <div class="horizontallso-item__list-date">
                    <span
                        style="
                            border-left: 2px solid #b6b6b6;
                            padding-right: 8px;
                        "
                    ></span>
                    <p>{{ user.date_of_birth }}</p>
                </div>
            </div>
        </div>
        <template v-if="issue?.length">
            <div
                class="subtitle_container"
                v-for="value in application.answers"
                :key="value.id"
            >
                <p class="subtitle">
                    {{ getIssueById(value.issue)?.issue }}
                </p>
                <p>{{ value.answer }}</p>
            </div>
        </template>
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
        <div class="button">
            <button
                type="submit"
                class="deny_button"
                @click="declineApplication()"
            >
                Отклонить
            </button>
            <button
                type="submit"
                class="submit_button"
                @click="acceptApplication()"
            >
                Одобрить
            </button>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
const router = useRouter();
let applicationId = route.params.id;
const eventId = 8;
const user = ref({});
const application = ref({});
const issue = ref(null);
const form = ref({});
const swal = inject('$swal');
const pages = ref([
    { pageTitle: 'Мероприятия', href: '#' },
    { pageTitle: 'Мистер и Мисс РСО | Санкт-пете...', href: '#' },
    { pageTitle: 'Заявка на участие', href: '#' },
]);

const requestEvent = async () => {
    await HTTP.get(`/events/${eventId}/applications/${applicationId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            application.value = response.data;
            //console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

const requestUser = async () => {
    await HTTP.get(`/rsousers/${application.value.user}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            user.value = response.data;
            //console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

const requestIssue = async () => {
    await HTTP.get(`/events/${application.value.event}/issues/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            issue.value = response.data;
            //console.log(response.data);
        })
        .catch(function (error) {
            console.log('failed ' + error);
        });
};

const getIssueById = (id) => {
    //console.log(issue.value);
    //console.log(id);
    return issue.value?.find((el) => el.id === id);
};

const redirect = async () => {
    const responce = await HTTP.get(`/events/${eventId}/applications/`, {
        headers: {
            '   Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
    console.log(responce.data);
    router.push({
        name: 'IndividualRequest',
        params: {
            id: responce.data?.[0]?.id,
        },
    });
};

const declineApplication = async () => {
    await HTTP.delete(`/events/${eventId}/applications/${applicationId}`, {
        headers: {
            '   Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
    setTimeout(() => {
        redirect();
    }, 0);
};

const acceptApplication = async () => {
    try {
        const response = await HTTP.post(
            `/events/${eventId}/applications/${applicationId}/confirm/`,
            form.value,
            {
                headers: {
                    '   Content-Type': 'application/json',
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
        form.value = response.data;
        console.log(response.data);
        setTimeout(() => {
            redirect();
        }, 0);
    } catch (error) {
        console.error('There was an error!', error);
        swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'ошибка',
            showConfirmButton: false,
            timer: 1500,
        });
    }
};

onBeforeRouteUpdate(async (to) => {
    applicationId = to.params.id;
    await requestEvent();
    await requestUser();
    await requestIssue();
});

onMounted(async () => {
    await requestEvent();
    await requestUser();
    await requestIssue();
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
.container {
    margin: 0 auto;
    padding-bottom: 60px;
    padding-left: 130px;
    padding-right: 130px;
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
</style>
