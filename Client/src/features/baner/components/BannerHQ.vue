<template>
    <div class="hq-metric" v-if="headquarter">
        <hqBanner :banner="headquarter.banner"></hqBanner>
        <hqAvatar :emblem="headquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ headquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p>{{ headquarter.slogan }}</p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__university">
                            <p>{{ edict.name }}</p>
                        </li>
                        <li class="Squad-HQ__date">
                            <p>Дата создания штаба</p>
                            <img
                                src="@/app/assets/icon/calendar.svg"
                                alt="calendar"
                            />
                            <time datetime="2022-09-10">{{
                                headquarter.founding_date
                            }}</time>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__participant-counter-HQ">
                            <span
                                >{{
                                    headquarter.participants_count
                                }}
                                участников</span
                            >
                        </div>
                        <div class="hq-data__social-network">
                            <div class="hq-data__link-vk">
                                <a
                                    :href="headquarter.social_vk"
                                    target="_blank"
                                >
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram">
                                <a
                                    :href="headquarter.social_tg"
                                    target="_blank"
                                >
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a href="#" target="_blank">
                                    <img
                                        src="@/app/assets/icon/to-share-link.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <!-- <pre>{{ userId }} {{ headquarter.commander.id }}</pre> -->
                        </div>
                    </div>

                    <router-link
                        v-if="
                            userId === headquarter?.commander?.id || IsTrusted
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'EditHQ',
                            params: { id: headquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="localHeadquarter">
        <hqBanner :banner="localHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="localHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ localHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p>{{ localHeadquarter.slogan }}</p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Local">
                        <li class="Squad-HQ__date-local">
                            <time datetime="2022-09-10"
                                >{{ localHeadquarter.founding_date }} — дата
                                проведения первого Общего собрания МШ</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{
                                    localHeadquarter.participants_count
                                }}
                                участников</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{
                                    districtHeadquarter.members_count
                                }}
                                действующих членов</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div class="hq-data__link-vk">
                                <a
                                    :href="localHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram">
                                <a
                                    :href="localHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
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
                        v-if="
                            userId === localHeadquarter?.commander?.id ||
                            IsTrusted
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'FormLocal',
                            params: { id: localHeadquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="districtHeadquarter">
        <hqBanner :banner="districtHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="districtHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ districtHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p>{{ districtHeadquarter.slogan }}</p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Reg">
                        <li class="Squad-HQ__date-Reg">
                            <time datetime="2022-09-10"
                                >{{ districtHeadquarter.founding_date }} — дата
                                начала функционирования ОШ</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{
                                    districtHeadquarter.participants_count
                                }}
                                участников</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{
                                    districtHeadquarter.members_count
                                }}
                                действующих членов</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div class="hq-data__link-vk">
                                <a
                                    :href="districtHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram">
                                <a
                                    :href="districtHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
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
                        v-if="
                            userId === districtHeadquarter?.commander?.id ||
                            IsTrusted
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'FormDH',
                            params: { id: districtHeadquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="regionalHeadquarter">
        <hqBanner :banner="regionalHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="regionalHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ regionalHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p>{{ regionalHeadquarter.slogan }}</p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Reg">
                        <li class="Squad-HQ__date-Reg">
                            <time datetime="2022-09-10"
                                >{{ regionalHeadquarter.conference_date }} —
                                дата учредительной конференции РШ</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{
                                    regionalHeadquarter.participants_count
                                }}
                                участников</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{
                                    regionalHeadquarter.members_count
                                }}
                                действующих членов</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div class="hq-data__link-vk">
                                <a
                                    :href="regionalHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram">
                                <a
                                    :href="regionalHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
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
                        v-if="
                            userId === regionalHeadquarter?.commander?.id ||
                            IsTrusted
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'EditingOfRS',
                            params: { id: regionalHeadquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else>
        <hqBanner :banner="centralHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="centralHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ centralHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p>{{ centralHeadquarter.slogan }}</p>
                </div>
                <div class="working_slogan">
                    <p>
                        {{ centralHeadquarter.working_years }} лет на благо
                        страны!
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__date-central">
                            <time datetime="2022-09-10"
                                >{{
                                    centralHeadquarter.rso_founding_congress_date
                                }}
                                — дата первого Учредительного Съезда РСО</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{
                                    centralHeadquarter.participants_count
                                }}
                                участников</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{
                                    centralHeadquarter.members_count
                                }}
                                действующих членов</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts-central">
                        <div class="hq-data__social-network-central">
                            <div class="hq-data__link-vk">
                                <a
                                    :href="centralHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <img src="@/app/assets/icon/vk-blue.svg" />
                                </a>
                            </div>
                            <div class="hq-data__link-telegram">
                                <a
                                    :href="centralHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <img
                                        src="@/app/assets/icon/telegram-blue.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a href="#" target="_blank">
                                    <img
                                        src="@/app/assets/icon/to-share-link.svg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <!-- <pre>{{ centralHeadquarter.commander.id }}</pre> -->
                        </div>
                    </div>
                    <router-link
                        v-if="
                            userId === centralHeadquarter?.commander?.id ||
                            IsTrusted
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'FormCentral',
                        }"
                        >Редактировать штаб</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { hqAvatar } from '@shared/components/imagescomp';
import { hqBanner } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { useRoleStore } from '@layouts/store/role';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
const roleStore = useRoleStore();
const userStore = useUserStore();
const user = storeToRefs(userStore);
let userId = computed(() => {
    return user.currentUser.value.id;
});
const edict = ref({});

const roles = storeToRefs(roleStore);
let educComId = roles.roles.value.educationalheadquarter_commander;
let regionComId = roles.roles.value.regionalheadquarter_commander;
let districtComId = roles.roles.value.districtheadquarter_commander;
let centralComId = roles.roles.value.centralheadquarter_commander;
let localComId = roles.roles.value.localheadquarter_commander;
const props = defineProps({
    banner: {
        type: String,
    },
    emblem: {
        type: String,
    },
    headquarter: {
        type: Object,
        required: true,
    },
    districtHeadquarter: {
        type: Object,
        required: true,
    },
    localHeadquarter: {
        type: Object,
        required: true,
    },
    regionalHeadquarter: {
        type: Object,
        required: true,
    },
    centralHeadquarter: {
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

const aboutEduc = async () => {
    try {
        let id = props.headquarter.educational_institution.id;
        console.log('headquarter', props.headquarter);
        console.log('id', id);
        const response = await HTTP.get(`/eduicational_institutions/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });

        edict.value = response.data;
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

const IsTrusted = computed(() => {
    return props.member.find(
        (item) => item.user.id === userId.value && item.is_trusted === true,
    );
});
watch(
    () => props.headquarter,

    (newheadquarter) => {
        if (Object.keys(props.headquarter).length === 0) {
            return;
        }
        aboutEduc();
    },
);
onMounted(() => {
    aboutEduc();
});
</script>
<style lang="scss" scoped>
.hq-metric {
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
.hq-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 16px 300px;
}

.hq-data__name {
    margin-bottom: 32px;
}

.hq-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.hq-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.hq-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.hq-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.hq-data__list p,
.hq-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.hq-data__introductions {
    display: flex;
    align-items: center;
}

.hq-data__introductions p,
.hq-data__introductions img {
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
    margin-top: 28px;
    margin-bottom: 9.5px;
}
.working_slogan {
    margin-bottom: 9.5px;
}
.Squad-HQ__list {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}
.Squad-HQ__list-Reg {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}
.Squad-HQ__list-Local {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.Squad-HQ__list li,
.Squad-HQ__list-Local li,
.Squad-HQ__list-Reg li {
    border-right: none;
    margin: 0;
}

.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}
.Squad-HQ__date,
.Squad-HQ__date-local,
.Squad-HQ__date-Reg {
    display: flex;
}
.Squad-HQ__date-local time,
.Squad-HQ__date-Reg time,
.Squad-HQ__date-central time {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}
.Squad-HQ__date p {
    margin-right: 22px;
}
.hq-data__participant-counter-HQ span {
    border-right: none;
}
.hq-data__participant-counter span {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.hq-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'BertSans';
    letter-spacing: 1.2px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}
.hq-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;
}

.hq-data__contacts {
    display: flex;
    flex-direction: column;
}

.hq-data__social-network {
    display: flex;
    justify-content: space-between;
    margin: 12px 0 0;
}
.hq-data__social-network-Reg,
.hq-data__social-network-central {
    display: flex;
    // justify-content: space-between;
    margin: 12px 0 0;
    column-gap: 12px;
}

@media ((max-width: 1095px)) {
    .Squad-HQ__university p {
        border-right: none;
    }
    .hq-data__wrapper {
        margin: 22px 0 16px 260px;
    }
}
@media ((max-width: 841px)) {
    .Squad-HQ__date-local time,
    .Squad-HQ__date-central time {
        border-right: none;
    }
}

@media ((max-width: 768px)) {
    .hq-metric {
        grid-template-columns: 10px 135px 135px 2fr 16px;
    }
    .hq-data__wrapper {
        margin: 22px 0 16px 240px;
    }
    .hq-data__contacts-wrapper {
        display: grid;
        row-gap: 20px;
    }
    .hq-data__contacts {
        align-items: start;
    }
    .hq-data__social-network {
        column-gap: 12px;
    }
    .Squad-HQ__date-Reg time {
        border-right: none;
    }
}
@media ((max-width: 590px)) {
    .hq-data__wrapper {
        margin: 0px 0 16px 18px;
    }
    .hq-metric__bottom {
        grid-row-start: 4;
    }
    .Squad-HQ__date p {
        margin-right: 10px;
    }
}
</style>
