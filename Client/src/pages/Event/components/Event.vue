<template>
    <div class="eventt">
        <div class="container">
            <h1 class="title title--lso">
                {{ eventsStore.event.name }}
            </h1>
            <div class="banner_wrap" id="ankor">
                <div>
                    <img v-if="eventsStore.event.banner" :src="eventsStore.event.banner" alt="Баннер мероприятия" />
                    <v-progress-circular class="circleLoader" v-else indeterminate color="blue"></v-progress-circular>
                </div>
                <div class="banner_wrap_btn">
                    <router-link v-if="isOrganizer" :to="{
                        name: 'editAction',
                        params: { id: eventsStore.event.id },
                    }" class="user-data__link">Редактировать мероприятие</router-link>
                    <Button
                        v-else-if="(!eventsStore.status.is_participant && !eventsStore.status.is_applicant) && eventsStore.event.application_type === 'Персональная'"
                        class="form-button" type="button" @click="AddApplication()" label="Подать заявку" variant="text"
                        size="large"></Button>
                    <router-link
                        v-else-if="(!eventsStore.status.is_participant && !eventsStore.status.is_applicant) && eventsStore.event.application_type === 'Групповая'"
                        :to="{ name: 'GroupSubmit' }">
                        <Button class="form-button" type="button" label="Подать заявку" variant="text"
                            size="large"></Button></router-link>

                    <router-link
                        v-else-if="(!eventsStore.status.is_participant && !eventsStore.status.is_applicant) && eventsStore.event.application_type === 'Мультиэтапная'"
                        :to="{ name: 'MultiStageSubmit' }">
                        <Button class="form-button" type="button" label="Подать заявку" variant="text"
                            size="large"></Button></router-link>

                    <Button v-else-if="eventsStore.status.is_applicant" type="button"
                        class="form-button form-button--grey" variant="text" label="Заявка на рассмотрении"
                        size="large"></Button>

                    <div v-else-if="eventsStore.status.is_participant" class="user-data__link">
                        Вы участник
                    </div>
                </div>
            </div>
            <h2 class="title event_about">О мероприятии</h2>
            <div class="d-flex">
                <div class="category">{{ eventsStore.event.direction }}</div>
                <div class="category ml-3">{{ eventsStore.event.scale }}</div>
            </div>
            <div class="text event_type_wrap">
                {{ eventsStore.event.description }}
            </div>

            <div class="event">
                <div class="event-cols-2">
                    <img src="@app/assets/icon_items/list.svg" class="mr-3" alt="" />
                    Форма заявки: {{ eventsStore.event.application_type }}
                </div>
                <div class="event-cols-2">
                    <img src="@app/assets/icon_items/clock.svg" class="mr-3" alt="" />
                    Начало мероприятия:
                    {{ eventsStore.event.time_data?.start_date }},
                    {{ eventsStore.event.time_data?.start_time }}
                </div>
            </div>

            <div class="event">
                <div class="event-cols-2">
                    <img src="@app/assets/icon_items/group.svg" class="mr-3" alt="" />
                    Планируемое число участников:
                    {{ eventsStore.event.participants_number }}
                </div>
                <div class="event-cols-2">
                    <img src="@app/assets/icon_items/clock.svg" class="mr-3" alt="g" />
                    Окончание мероприятия:
                    {{ eventsStore.event.time_data?.end_date }},
                    {{ eventsStore.event.time_data?.end_time }}
                </div>
            </div>
            <div class="event">
                <div class="event-cols-2">
                    <img src="@app/assets/icon_items/label.svg" class="mr-3" alt="" />
                    Адрес: {{ eventsStore.event.address }}
                </div>
                <div class="event-cols-2">
                    <img src="@app/assets/icon_items/clock.svg" class="mr-3" alt="" />
                    Начало регистрации:
                    {{ eventsStore.event.time_data?.start_date }},
                    {{ eventsStore.event.time_data?.start_time }}
                </div>
            </div>
            <div class="event">
                <div class="event-cols-2">
                    <img src="@app/assets/icon/linkRef.svg" class="mr-3 event-cols-2_ref" alt="linkRef" />
                    <a :href="eventsStore.event.conference_link">Ссылка на мероприятие</a>
                </div>
                <div class="event-cols-2">
                    <img src="@app/assets/icon_items/clock.svg" class="mr-3" alt="" />
                    Окончание регистрации:
                    {{ eventsStore.event.time_data?.registration_end_date }},
                    {{ eventsStore.event.time_data?.registration_end_time }}
                </div>
            </div>

            <!-- Организаторы -->
            <div
                v-if="(CentralLevel && isOrganizer) || ((DistrictLevel && isOrganizer) || roleStore.roles.centralheadquarter_commander) ||
                    ((RegLevel && isOrganizer) || (roleStore.roles.centralheadquarter_commander || ddd)) || ((LocalLevel && isOrganizer) || (roleStore.roles.centralheadquarter_commander || ddd || lll)) || ((EducLevel && isOrganizer) || (roleStore.roles.centralheadquarter_commander || ddd || lll || edd)) || ((DetLevel && isOrganizer) || (roleStore.roles.centralheadquarter_commander || ddd || lll || edd || det))">
                <h2 class="title event_org">Организаторы</h2>
                <div v-if="eventsStore.organizators" class="card_wrap">
                    <div v-for="organizator in eventsStore.organizators" :key="organizator.id">
                        <router-link :to="{ name: 'userpage', params: { id: organizator.organizer?.id } }"
                            class="event_card_wrap">
                            <div class="round-img">
                                <img :src="organizator.organizer?.avatar.photo" alt="photo"
                                    v-if="organizator.organizer?.avatar.photo" />
                                <img src="@app/assets/user-avatar.png" alt="photo" v-else />
                            </div>
                            <div class="text text--organizer">
                                {{ organizator.organizer?.last_name }}
                                {{ organizator.organizer?.first_name }}
                                {{ organizator.organizer?.patronymic_name }}
                            </div>
                            <div class="text text--position">{{ organizator?.position?.position }}</div>

                        </router-link>


                    </div>
                </div>
            </div>

            <!-- Контактные лица -->
            <template v-if="isContact.length && isAuth">
                <h2 class="title event_contact">Контактные лица</h2>
                <div class="card_wrap">
                    <div v-for="organizator in isContact" :key="organizator.id">
                        <router-link :to="{ name: 'userpage', params: { id: organizator.organizer?.id } }"
                            class="event_card_wrap">
                            <div class="round-img">
                                <img :src="organizator.organizer?.avatar.photo" alt="photo"
                                    v-if="organizator.organizer?.avatar.photo" />
                                <img src="@app/assets/user-avatar.png" alt="photo" v-else />
                            </div>
                            <div class="text text--organizer">
                                {{ organizator.organizer?.last_name }}
                                {{ organizator.organizer?.first_name }}
                                {{ organizator.organizer?.patronymic_name }}
                            </div>
                            <div class="text text--position">{{ organizator?.position?.position }}</div>

                        </router-link>
                    </div>
                </div>
            </template>

            <!-- Участники -->
            <div class="event__nav">
                <h3 class="title event_members">Участники</h3>
                <div class="d-flex">
                    <Button type="button" label="Уже идут" class="memberBtn mr-2" :class="{ active: picked === true }"
                        @click="picked = true"></Button>

                    <Button type="button" label="Ожидают одобрения" class="memberBtn"
                        :class="{ active: picked === false }" @click="picked = false"></Button>
                </div>
            </div>

            <section class="section_wrap" v-if="picked === true">
                <ul class="list_wrap" v-if="eventsStore.members.length">
                    <li v-for="participant in eventsStore.members.slice(0, 6)" :key="participant">
                        <router-link :to="{ name: 'userpage', params: { id: participant.user.id } }">
                            <img class="participant_img" :src="participant.user?.avatar?.photo"
                                v-if="participant.user?.avatar?.photo" alt="avatar" />
                            <img class="participant_img" src="@app/assets/user-avatar.png" v-else alt="avatar" />
                            <div class="text text--participant_name mt-7">
                                {{ participant.user.first_name }}
                            </div>


                        </router-link>
                    </li>
                </ul>
                <p class="text-center mt-10" v-else>Участников не найдено..</p>
                <div class="squad-participants__link">
                    <div v-if="eventsStore.members.length >= 6" class="squad-participants__link">
                        <router-link :to="{
                            name: 'actionparticipants',
                            params: { id: eventsStore.event.id },
                        }">
                            <div class="squad__wrapper-route text-center mt-10">
                                Показать всех
                            </div>
                        </router-link>
                    </div>
                </div>
            </section>
            <section class="section_wrap" v-else="picked === false">
                <ul class="list_wrap" v-if="eventsStore.status.is_applicant">
                    <li v-for="participant in eventsStore.applications.slice(
                        0,
                        6,
                    )" :key="participant">
                        <router-link :to="{ name: 'userpage', params: { id: participant.user.id } }">
                            <img class="participant_img" :src="participant.user?.avatar?.photo"
                                v-if="participant.user?.avatar?.photo" alt="avatar" />
                            <img class="participant_img" src="@app/assets/user-avatar.png" v-else alt="avatar" />
                            <div class="text text--participant_name mt-7">
                                {{ participant.user.first_name }}
                            </div>

                        </router-link>
                    </li>
                </ul>
                <p class="text-center mt-10" v-else>Участников не найдено...</p>
                <div v-if="eventsStore.applications.length >= 6" class="squad-participants__link">
                    <router-link :to="{
                        name: 'actionparticipants',
                        params: { id: eventsStore.event.id },
                    }">
                        <div class="squad__wrapper-route text-center mt-10">
                            Показать всех
                        </div>
                    </router-link>
                </div>
            </section>
            <!-- Другие мероприятия -->
            <h2 class="title event_others event_border">Другие мероприятия</h2>
            <div class="other_events_wrap">
                <router-link :to="{ path: `/actionSquads/${items.id}`, hash: '#ankor', params: { id: items.id } }"
                    class="event_item" v-for="items in eventsStore.events" v-show="items.id !== eventsStore.event.id">
                    <v-card class="mx-auto" min-width="280" height="210" :image="items.banner" :id="items.id">
                    </v-card>
                    <p class="event_item_title">{{ items.name }}</p>
                    <div class="d-flex justify-space-between mb-3">
                        <p class="event_item_date">
                            {{
                                new Date(
                                    items.time_data.start_date,
                                ).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                            }}
                        </p>
                        <div class="d-flex align-center event_item_count">
                            {{ items.participants_number }}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                <circle cx="12" cy="8" r="2.5" stroke="#35383F" stroke-linecap="round" />
                                <path
                                    d="M13.7679 6.5C13.9657 6.15743 14.2607 5.88121 14.6154 5.70625C14.9702 5.5313 15.3689 5.46548 15.7611 5.51711C16.1532 5.56874 16.5213 5.73551 16.8187 5.99632C17.1161 6.25713 17.3295 6.60028 17.4319 6.98236C17.5342 7.36445 17.521 7.76831 17.3939 8.14288C17.2667 8.51745 17.0313 8.8459 16.7175 9.08671C16.4037 9.32751 16.0255 9.46985 15.6308 9.49572C15.2361 9.52159 14.8426 9.42983 14.5 9.23205"
                                    stroke="#35383F" />
                                <path
                                    d="M10.2321 6.5C10.0343 6.15743 9.73935 5.88121 9.38458 5.70625C9.02981 5.5313 8.63113 5.46548 8.23895 5.51711C7.84677 5.56874 7.47871 5.73551 7.18131 5.99632C6.88391 6.25713 6.67053 6.60028 6.56815 6.98236C6.46577 7.36445 6.47899 7.76831 6.60614 8.14288C6.73329 8.51745 6.96866 8.8459 7.28248 9.08671C7.5963 9.32751 7.97448 9.46985 8.36919 9.49572C8.76391 9.52159 9.15743 9.42983 9.5 9.23205"
                                    stroke="#35383F" />
                                <path
                                    d="M12 12.5C16.0802 12.5 17.1335 15.8022 17.4054 17.507C17.4924 18.0524 17.0523 18.5 16.5 18.5H7.5C6.94771 18.5 6.50763 18.0524 6.59461 17.507C6.86649 15.8022 7.91976 12.5 12 12.5Z"
                                    stroke="#35383F" stroke-linecap="round" />
                                <path
                                    d="M19.2964 15.4162L18.8113 15.5377L19.2964 15.4162ZM13.0869 12.5859L12.7177 12.2488L12.0972 12.9283L13.0049 13.0791L13.0869 12.5859ZM17.1811 16.5L16.7008 16.639L16.8053 17H17.1811V16.5ZM15.4998 12C16.5275 12 17.2493 12.5027 17.7781 13.2069C18.3175 13.9253 18.6343 14.8306 18.8113 15.5377L19.7814 15.2948C19.5902 14.5315 19.2327 13.4787 18.5778 12.6065C17.9124 11.7203 16.92 11 15.4998 11V12ZM13.4562 12.923C13.9565 12.375 14.6105 12 15.4998 12V11C14.2826 11 13.3734 11.5306 12.7177 12.2488L13.4562 12.923ZM13.0049 13.0791C15.3055 13.4614 16.2788 15.1801 16.7008 16.639L17.6614 16.361C17.1903 14.7326 16.0188 12.5663 13.1689 12.0927L13.0049 13.0791ZM18.3948 16H17.1811V17H18.3948V16ZM18.8113 15.5377C18.8651 15.7526 18.7073 16 18.3948 16V17C19.2655 17 20.015 16.2277 19.7814 15.2948L18.8113 15.5377Z"
                                    fill="#35383F" />
                                <path
                                    d="M10.913 12.5859L10.995 13.0791L11.9027 12.9283L11.2823 12.2488L10.913 12.5859ZM4.70355 15.4162L5.18857 15.5377L4.70355 15.4162ZM6.8188 16.5V17H7.19465L7.29911 16.639L6.8188 16.5ZM8.50011 12C9.38944 12 10.0434 12.375 10.5438 12.923L11.2823 12.2488C10.6266 11.5306 9.71735 11 8.50011 11V12ZM5.18857 15.5377C5.36566 14.8306 5.6824 13.9253 6.22179 13.2069C6.7506 12.5027 7.47238 12 8.50011 12V11C7.07993 11 6.08755 11.7203 5.42211 12.6065C4.76725 13.4787 4.40968 14.5315 4.21853 15.2948L5.18857 15.5377ZM5.6051 16C5.29259 16 5.13477 15.7526 5.18857 15.5377L4.21853 15.2948C3.9849 16.2277 4.73436 17 5.6051 17V16ZM6.8188 16H5.6051V17H6.8188V16ZM7.29911 16.639C7.72116 15.1801 8.69448 13.4614 10.995 13.0791L10.831 12.0927C7.98113 12.5663 6.80962 14.7326 6.3385 16.361L7.29911 16.639Z"
                                    fill="#35383F" />
                            </svg>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="eventsScale mr-3">
                            {{ items.scale }}
                        </div>
                        <div class="eventsScale">
                            {{ items.direction }}
                        </div>
                    </div>
                </router-link>
            </div>
            <template v-if="
                eventsStore.totalEvents &&
                eventsStore.totalEvents > eventsStore.eventsLimit
            ">
                <Button @click="next" class="event__show_btn" v-if="eventsStore.events.length < eventsStore.totalEvents"
                    label="Показать еще"></Button>
                <Button @click="prev" v-else label="Свернуть все"></Button>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, inject } from 'vue';
import { Button } from '@shared/components/buttons';
import { useRoute, useRouter } from 'vue-router';
import { HTTP } from '@app/http';
import { usePage } from '@shared';
import { useUserStore } from '@features/store/index';
import { useRoleStore } from '@layouts/store/role';
import { useEventsStore } from '@features/store/events';
import { useRegionalsStore } from '@features/store/regionals';
import { useSquadsStore } from '@features/store/squads';
import { useLocalsStore } from '@features/store/local';
import { useEducationalsStore } from '@features/store/educationals';
const route = useRoute();
const router = useRouter();
const { replaceTargetObjects } = usePage();
const data = ref({});

const picked = ref(true);
const swal = inject('$swal');
const eventsStore = useEventsStore();
const userStore = useUserStore();
const regionalsStore = useRegionalsStore();
const squadsStore = useSquadsStore();
const localsStore = useLocalsStore();
const roleStore = useRoleStore();
const educationalsStore = useEducationalsStore();
const isContact = ref([]);
const isAuth = ref(!!localStorage.getItem('Token'));

const next = () => {
    eventsStore.getNextFilteredEvents();
};
const prev = () => {
    eventsStore.getFilteredEvents(
        eventsStore.event.scale,
        eventsStore.event.direction,
    );
};
let userId = computed(() => {
    return userStore.currentUser.id;
});


const ddd = computed(() => {
    return regionalsStore.regionals.find((item) => item.district === roleStore.roles.districtheadquarter_commander?.id);
})

const lll = computed(() => {
    return localsStore.locals.find((item) => item.
        regional_headquarter
        === roleStore.roles.regional_headquarter_commander?.id);
})

const edd = computed(() => {
    return educationalsStore.educationals.find((item) => item?.
        regional_headquarter
        === roleStore.roles.regional_headquarter_commander?.id || item?.local_headquarter === roleStore.roles.local_headquarter_commander?.id);
})

const det = computed(() => {
    return squadsStore.squads.find((item) => item?.
        regional_headquarter
        === roleStore.roles.regional_headquarter_commander?.id || item?.local_headquarter === roleStore.roles.local_headquarter_commander?.id || item?.educational_headquarter === roleStore.roles.educational_headquarter_commander?.id
    );
})
const UserApplication = computed(() => {
    return eventsStore.applications.find(
        (item) => item.user.id === userId.value,
    );
});

const CentralLevel = computed(() => {
    return eventsStore.organizators.find(
        (item) => item?.position?.level === 'CentralHeadquarter',
    );
});

const IsCreator = computed(() => {
    return eventsStore.organizators.find(
        (item) => item?.position.headquarter_id === roleStore.roles.regionalheadquarter_commander?.id || item?.position.headquarter_id === roleStore.roles?.centralheadquarter_commander?.id || item?.position.headquarter_id === roleStore.roles?.districtheadquarter_commander?.id || item?.position.headquarter_id === roleStore.roles?.localheadquarter_commander?.id || item?.position.headquarter_id === roleStore.roles?.educationalheadquarter_commander?.id || item?.position.headquarter_id === roleStore.roles?.detachment_commander?.id
        ,
    );
});


const DistrictLevel = computed(() => {
    return eventsStore.organizators.find(
        (item) => item?.position?.level === 'DistrictHeadquarter',
    );
});
const LocalLevel = computed(() => {
    return eventsStore.organizators.find(
        (item) => item?.position?.level === 'LocalHeadquarter',
    );
});
const RegLevel = computed(() => {
    return eventsStore.organizators.find(
        (item) => item?.position?.level === 'RegionalHeadquarter',
    );
});
const EducLevel = computed(() => {
    return eventsStore.organizators.find(
        (item) => item?.position?.level === 'EducationalHeadquarter',
    );
});
const DetLevel = computed(() => {
    return eventsStore.organizators.find(
        (item) => item?.position?.level === 'Detachment',
    );
});



const isOrganizer = computed(() => {
    return eventsStore.organizators.find(
        (item) => item.organizer.id === userId.value,
    );
});

const IsMember = computed(() => {
    return eventsStore.members.find((item) => item.user.id === userId.value);
});

const AddApplication = async () => {
    try {
        let id = eventsStore.event.id;
        const sendResponse = await HTTP.post(
            `/events/${id}/applications/`,
            data.value,
            {
                headers: {
                    'Content-Type': 'application/json',
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
        eventsStore.getAppEvents(route.params.id);
        console.log('responseee', sendResponse.data);
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// watch(
//     () => userStore.currentUser,
//     (newUser) => {
//         return userStore.currentUser?.id
//     },
//     {
//         immediate: true,
//     },
// );

watch(
    () => route.params.id,

    async (newId) => {
        if (!newId) return;
        await eventsStore.getEventId(newId);
        await eventsStore.getStatus(newId, userStore.currentUser?.id);
        await eventsStore.getEventMembers(newId);
        await eventsStore.getEventOrganizators(newId);
        await eventsStore.getAppEvents(newId);
        await replaceTargetObjects([eventsStore.event]);
    },
    {
        immediate: true,
    },
);




watch(
    () => eventsStore.organizators,
    (newOrganizators) => {
        isContact.value = newOrganizators.filter(
            (item) => item.is_contact_person === true,
        );
    },
    {
        immediate: true,
    },
);

watch(
    () => eventsStore.event,
    () => {
        eventsStore.getFilteredEvents(
            eventsStore.event.scale,
            eventsStore.event.direction,
        );
    },
);
</script>

<style lang="scss" scoped>
.event {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;

    &_about {
        font-size: 32px;
        font-weight: 600;
        font-family: 'Akrobat';
        margin: 40px 0px;
    }

    &__show {
        &_btn {
            margin-top: 60px;
        }
    }

    &_item {
        max-width: 280px;
        width: 100%;

        &_banner {
            border-radius: 10px;
            height: 210px;
            width: 100%;
        }

        &_title {
            font-size: 14px;
            font-weight: 600;
            margin-top: 12px;
            margin-bottom: 26px;
            font-family: 'Bert-Sans';
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -moz-box;
            -moz-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            line-clamp: 3;
            box-orient: vertical;
        }

        &_date {
            font-size: 14px;
            font-family: 'Bert-Sans';
            font-weight: 400;
        }

        &_count {
            font-size: 14px;
            font-family: 'Bert-Sans';
            font-weight: 400;
        }
    }

    &_org {
        font-size: 32px;
        font-weight: 600;
        font-family: 'Akrobat';
        margin: 40px 0px;
    }

    &_members {
        font-size: 32px;
        font-weight: 600;
        font-family: 'Akrobat';
        margin: 40px 0px;
    }

    &_contact {
        font-size: 32px;
        font-weight: 600;
        font-family: 'Akrobat';
        margin: 40px 0px;
    }

    &_others {
        font-size: 32px;
        font-weight: 600;
        font-family: 'Akrobat';
        margin: 40px 0px;
    }

    &__nav {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: flex-end;
    }

    &-cols-2 {
        display: flex;
        flex-direction: row;
        justify-content: start;
        width: 48%;
        height: 24px;

        margin-right: 1%;
    }

    &-cols-2_ref {
        width: 18px !important;
    }

    &-cols-2 img {
        width: 24px;
        height: 24px;
    }

    &-cols-2 a {
        text-decoration: underline;
        font-size: 18px;
        font-weight: 400;
        color: #35383f;
    }

    &-empty {
        height: 60px;
        margin-top: 20px;
        margin-bottom: 20px;
        color: white;
        border-radius: 20px;
        background-color: rgba(28, 92, 148, 1);
        justify-content: center;
        align-items: center;
    }
}

.title--subtitle {
    margin-top: 40px;
    margin-bottom: 40px;
}

.eventt {
    padding-bottom: 80px;
}

.eventsScale {
    border: 1px solid #35383f;
    border-radius: 18px;
    padding: 2px 12px;
    font-size: 14px;
    height: 26px;
}

.text--organizer {
    line-height: normal;
    margin: 0px;
}

.text--position {
    color: #676767;
    font-size: 16px;
    font-weight: 400;
    margin-top: 16px;
    font-family: 'Bert-Sans';
}

.form-button {
    margin: 0;
    padding: 12px 32px;
    font-family: 'Bert Sans';
    font-size: 16px;
    line-height: 20px;
    max-width: 265px;

    &--grey {
        color: white;
        background: rgba(182, 182, 182, 1);
        border: 2px solid rgba(182, 182, 182, 1);
    }

    &--white {
        color: #35383f;
        border: 2px solid #35383f;
        background-color: #ffffff;
    }

    @media (max-width: 700px) {
        max-width: 100%;
    }

    @media (max-width: 430px) {
        padding: 10px 32px;
    }
}

.banner_wrap {
    position: relative;
}

.memberBtn {
    border-radius: 30px;
    background-color: white;
    color: #1c5c94;
    border: 1px solid #1c5c94;
    margin: 0px;
    padding: 7px 12px;
    margin: 7px;
    height: 38px;
}

.active {
    background-color: #1c5c94;
    color: white;
    border: 1px solid #1c5c94;
}

.banner_wrap img {
    max-height: 540px;
    width: 100%;
    border-radius: 15px;
    position: relative;
    object-fit: cover;

    img {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }
}

.banner_wrap_btn {
    bottom: 24px;
    position: absolute;
    right: 32px;
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;

    @media (max-width: 830px) {
        flex-direction: column;
    }

    @media (max-width: 700px) {
        position: static;
        margin-top: 40px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
}

.event_type {
    border: 1px solid rgba(53, 56, 63, 1);
    padding: 3px 10px;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-weight: 400;
    border-radius: 18px;
    letter-spacing: 1px;
}

.event_type_wrap {
    margin-bottom: 40px;
    word-wrap: break-word;
    max-width: 980px;

    @media (max-width: 430px) {
        // justify-items: start;
    }
}

.category {
    border: 1px solid #35383f;
    border-radius: 18px;
    padding: 3px 12px;
    height: 32px;
    text-align: center;
    max-width: 158px;
    margin-bottom: 40px;
    display: block;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Bert Sans';
    line-height: 21px;
}

.item_wrap {
    pointer-events: none;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-columns: repeat(auto-fill, 500px);
    justify-content: space-between;
    row-gap: 20px;
    margin-top: 40px;

    @media (max-width: 1150px) {
        grid-template-columns: repeat(auto-fill, 400px);
    }

    @media (max-width: 450px) {
        grid-template-columns: repeat(auto-fill, 300px);
    }
}

.event_card_wrap {
    max-width: 280px;
    height: 274px;
    box-shadow: 0px 0px 10px 0px #00000014;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 22px;
}

.event_card_wrap img {
    width: 120px;
    height: 120px;
    min-height: 120px;
    min-width: 120px;
    border-radius: 50px;
}

.card_wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, 280px);
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 20px;

    @media (max-width: 950px) {
        justify-content: space-around;
    }
}

.v-list-item-title {
    white-space: normal;
}

.icon_img {
    margin-right: 12px;
    width: 24px;
}

.list_item {
    padding: 0;
}

.event_border {
    border-bottom: 1px solid rgba(53, 56, 63, 1);
    padding-bottom: 18px;
}

.card {
    box-shadow: none;
    max-width: 280px;
}

.radius {
    border-radius: 10px;
}

.event_type_card_wrap {
    display: flex;
    justify-content: space-between;
}

.event_type_card {
    font-family: Bert Sans;
    font-size: 14px;
    font-weight: 400;
    padding: 8px 12px;
    border-radius: 18px;
    border: 1px solid rgba(53, 56, 63, 1);
}

.btn_wrap {
    margin: 0 auto;
    margin-top: 60px;
}

.section_wrap {
    margin-top: 40px;

    box-shadow: 0px 0px 10px 0px #00000014;
    height: 337px;
    padding: 24px 46px;
}

.list_wrap {
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 40px;

    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 575px) {
        grid-template-columns: 1fr 1fr;
    }
}

.participant_img {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 100%;
}

.squad-participants__link {
    margin: 0 auto;
}

.squad-participants__link a {
    color: #5e5c5c;
    font-family: 'Montserrat';
    font-size: 16px;
    font-weight: 400;
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
}

.event_btn_participant {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
}

.user-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}

.other_events_wrap {
    display: grid;
    // grid-template-columns: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fill, 280px);
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 20px;

    @media (max-width: 965px) {
        justify-content: space-around;
    }
}
</style>
