<template>
    <div class="squad-metric">
        <squadBanner></squadBanner>
        <squadAvatar></squadAvatar>
        <div class="squad-metric__bottom">
            <div class="squad-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ squad.name }}</h4>
                </div>
                <div class="slogan">
                    <p>{{ squad.slogan }}</p>
                </div>
                <div class="squad__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__university">
                            <p>{{ educt.name }}</p>
                        </li>
                        <li class="Squad-HQ__date">
                            <p>Дата создания ЛСО</p>
                            <img
                                src="@/app/assets/icon/calendar.svg"
                                alt="calendar"
                            />
                            <time datetime="2022-09-10">{{
                                squad.founding_date
                            }}</time>
                        </li>
                    </ul>
                </div>
                <div class="squad-data__contacts-wrapper">
                    <div class="squad-data__contacts">
                        <div class="squad-data__participant-counter">
                            <span>{{ member.length }} участников</span>
                        </div>
                        <div class="squad-data__social-network">
                            <div class="squad-data__link-vk">
                                <a href="https://vk.com" target="_blank">
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="squad-data__link-telegram">
                                <a href="https://t.me" target="_blank">
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="squad-data__link-share-link">
                                <a href="#" target="_blank">
                                    <img
                                        src="@/app/assets/icon/to-share-link.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <!-- <p>{{ squad.members }}</p> -->
                        </div>
                    </div>
                    <router-link to="/" class="user-data__link"
                        >Редактировать страницу</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { squadAvatar } from '@shared/components/imagescomp';
import { squadBanner } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
const squad = ref({});
const member = ref({});
const educt = ref({});

const route = useRoute();
const id = route.params.id;
const aboutSquad = async () => {
    await HTTP.get(`/detachments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            squad.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const aboutEduc = async () => {
    await HTTP.get(`/eduicational_institutions/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            educt.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const aboutMembers = async () => {
    await HTTP.get(`/detachments/${id}/members/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            member.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};
onMounted(() => {
    aboutSquad();
    aboutMembers();
    aboutEduc();
});
</script>
<style lang="scss" scoped>
// .profile-settings-top {
//     padding-top: 40px;
//     margin-bottom: 40px;
// }

.squad-metric {
    display: grid;
    grid-template-columns: 30px 135px 135px 2fr 16px;
    grid-template-rows: 100px 100px 112px auto;
    margin-bottom: 40px;
    /*  */
    border-radius: 10px 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(244, 244, 244, 0);
    &__bottom {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 3;
        grid-row-end: 5;
    }
}

.ps__title {
    margin: 40px 0;
}

.ps__title h2 {
    /* Desktop/H-1 */
    font-family: 'Akrobat';
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #35383f;
}

/* Данные пользователя */
.squad-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 32px 300px;
}

.squad-data__name {
    margin-bottom: 32px;
}

.squad-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.squad-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.squad-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.squad-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.squad-data__list p,
.squad-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.squad-data__introductions {
    display: flex;
    align-items: center;
}

.squad-data__introductions p,
.squad-data__introductions img {
    margin-right: 5px;
}

.Squad-HQ__name {
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
.slogan {
    margin-top: 20px;
    margin-bottom: 9.5px;
}
.Squad-HQ__list {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 380px 300px;
}
.Squad-HQ__list li {
    border-right: none;
    height: 20px;
    margin: 0;
}
.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}
.Squad-HQ__date {
    display: flex;
}
.Squad-HQ__date p {
    margin-right: 22px;
}
.user-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}
.squad-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;
}
.squad-data__contacts {
    display: grid;
}
.squad-data__contacts {
    display: flex;
    flex-direction: column;
}
.squad-data__social-network {
    display: flex;
    justify-content: space-between;
    margin: 16px 16px 0px 0px;
}
</style>
