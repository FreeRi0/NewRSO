<template>
    <div class="squad-metric">
        <squadBanner :banner="squad.banner"></squadBanner>
        <squadAvatar :emblem="squad.emblem"></squadAvatar>
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
                            <!-- <p >Коми государственный педагогический институт</p> -->
                            <p>{{ edict.name }}</p>
                            <!-- <p>{{ squad.educational_institution }}</p> -->
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
                        </div>
                    </div>
                    <router-link
                        :to="{
                            name: 'EditLSO',
                            params: { id: squad.id },
                        }"
                        class="user-data__link"
                        >Редактировать страницу</router-link
                    >
                </div>
            </div>
            <!-- <div v-else>Загрузка....</div> -->
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { squadAvatar } from '@shared/components/imagescomp';
import { squadBanner } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';

const props = defineProps({
    banner: {
        type: String,
    },
    emblem: {
        type: String,
    },
    squad: {
        type: Object,
        required: true,
    },
    edict: {
        type: Object,
    },
    member: {
        type: Object,
    },
});

const edict = ref({});

// const isEmpty = computed(() => {
//     for (let i in props.squad) {
//        console.log("Объект пуст")
//     }
//     console.log("Объект есть")
// });

const aboutEduc = async () => {
    let id = props.squad.educational_institution;
    console.log('squad', props.squad);
    console.log('id', id);
    await HTTP.get(`/eduicational_institutions/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            edict.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onMounted(() => {
    aboutEduc();
});

watch(
    () => props.squad,

    (newSquad, oldSquad) => {
        if (Object.keys(props.squad).length === 0) {
            return;
        }
        aboutEduc();
    },
);
</script>
<style lang="scss" scoped>
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
        padding: 20px 0px 16px 300px;
        @media screen and (max-width: 768px) {
            padding: 20px 00px 16px 300px;
        }
        @media screen and (max-width: 575px) {
            padding: 116px 14px 16px 14px;
        }
    }
}

// .squad-data__participant-counter {
//     margin-top: 20px;
// }

/* Данные пользователя */
.squad-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
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
    // display: grid;
    // grid-template-columns: 360px 250px;
    display: flex;
    flex-wrap: wrap;
}
.Squad-HQ__list li {
    border-right: none;
    height: 20px;
    margin: 0;
    @media screen and (max-width: 1024px) {
        height: auto;
    }
}
.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
    display: inline-block;
    @media screen and (max-width: 1024px) {
        border-right: none;
        margin-bottom: 10px;
        margin-right: 0;
        padding-right: 0;
    }
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
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
}

.squad-data__contacts {
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }
}
.squad-data__social-network {
    display: flex;
    justify-content: space-between;
    margin-top: 17px;
}
</style>
