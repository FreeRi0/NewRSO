<template>
    <div class="container">
        <h1 class="title title--lso">
            {{ event.name }}
        </h1>
        <div class="banner_wrap">
            <div>
                <img :src="event.banner" alt="Баннер личной страницы(пусто)" />
            </div>
            <div class="banner_wrap_btn">
                <Button
                    v-if="isorganizator === true"
                    class="form-button"
                    type="button"
                    label="Редактировать заявку"
                    variant="text"
                    size="large"
                    @click="EditAction"
                ></Button>
                <Button
                    v-else
                    class="form-button"
                    type="button"
                    label="Оставить заявку"
                    variant="text"
                    size="large"
                    @click="AddParticipant"
                ></Button>
                <Button
                    type="button"
                    class="form-button form-button--white"
                    variant="text"
                    label="Отказаться от участия"
                    size="large"
                ></Button>
                <Button
                    v-if="participant_active === true"
                    type="button"
                    class="form-button form-button--grey"
                    variant="text"
                    label="Заявка на рассмотрении"
                    size="large"
                ></Button>
            </div>
        </div>
        <h2 class="title title--subtitle">О мероприятии</h2>
        <div class="event_type_wrap"></div>
        <p class="text event_type_wrap">
            {{ event.description }}
        </p>
        <div class="event">
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/list.svg" alt="" />
                Форма заявки: {{ event.application_type }}
            </div>
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/clock.svg" alt="" />
                Начало мероприятия: {{ event.time_data.start_date }},
                {{ event.time_data.start_time }}
            </div>
        </div>
        <div class="event">
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/map.svg" alt="" />
                Маштаб мероприятия: {{ event.scale }}
            </div>
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/clock.svg" alt="g" />
                Окончание мероприятия: {{ event.time_data.end_date }},
                {{ event.time_data.end_time }}
            </div>
        </div>
        <div class="event">
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/group.svg" alt="" />
                Планируемое число участников: {{ event.participants_number }}
            </div>
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/clock.svg" alt="" />
                Начало регистрации: {{ event.time_data.start_date }},
                {{ event.time_data.start_time }}
            </div>
        </div>
        <div class="event">
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/label.svg" alt="" />
                Адрес: {{ event.address }}
            </div>
            <div class="event-cols-2">
                <img src="@app/assets/icon_items/clock.svg" alt="" />
                Окончание регистрации:
                {{ event.time_data.registration_end_date }},
                {{ event.time_data.registration_end_time }}
            </div>
        </div>
        <!-- Организаторы -->
        <h2 class="title title--subtitle">Организаторы</h2>
        <div v-if="organizators" class="card_wrap">
            <div
                v-for="organizator in organizators"
                class="event_card_wrap"
                :key="organizator.id"
            >
                <img src="" alt="Аватарка" />
                <div class="text text--organizer">
                    {{ organizator.organization }}
                </div>
                <div class="text text--status">
                    {{ organizator.status }}
                </div>
            </div>
        </div>
        <!-- Контактные лица -->
        <h2 class="title title--subtitle">Контактные лица</h2>
        <div v-if="organizators" class="card_wrap">
            <div
                v-for="organizator in organizators"
                class="event_card_wrap"
                :key="organizator.id"
            >
                <img src="" alt="Аватарка" />
                <div class="text text--organizer">
                    {{ organizator.organization }}
                </div>
                <div class="text text--status">
                    {{ organizator.status }}
                </div>
            </div>
        </div>
        <!-- Участники -->
        <h3 class="title title--subtitle">Участники</h3>
        <div class="event_btn_participant">
            <button
                v-if="isGetAll"
                class="event_btn event_go"
                @click="ParticipantsWait"
            >
                Уже идут
            </button>
            <button
                v-if="!isGetAll"
                class="event_btn event_ok"
                @click="ParticipantsWait"
            >
                Уже идут
            </button>
            <button
                v-if="isGetAll"
                class="event_btn event_ok"
                @click="ParticipantsWait"
            >
                Ожидают одобрения
            </button>
            <button
                v-if="!isGetAll"
                class="event_btn event_go"
                @click="ParticipantsWait"
            >
                Ожидают одобрения
            </button>
        </div>
        <section v-if="participants.length != 0" class="section_wrap">
            <ul class="list_wrap">
                <li
                    v-for="participant in participants.slice(0, 6)"
                    :key="participant"
                >
                    <div>
                        <img
                            class="participant_img"
                            :src="participant.image"
                            alt="avatar"
                        />
                        <h5 class="text text--participant_name">
                            {{ participant.name }}
                        </h5>
                        <p class="text text--status">
                            {{ participant.status }}
                        </p>
                    </div>
                </li>
                <!-- <h2 v-else>Участников не найдено...</h2> -->
            </ul>
            <div class="squad-participants__link">
                <a href="#">Показать всех</a>
            </div>
        </section>
        <section class="section_wrap">
            <ul class="list_wrap">
                <li
                    v-for="participant in participants.slice(0, 6)"
                    :key="participant"
                >
                    <div>
                        <img
                            class="participant_img"
                            :src="participant.image"
                            alt="avatar"
                        />
                        <h5 class="text text--participant_name">
                            {{ participant.name }}
                        </h5>
                        <p class="text text--status">
                            {{ participant.status }}
                        </p>
                    </div>
                </li>
                <!-- <h2 v-else>Участников не найдено...</h2> -->
            </ul>
            <div class="squad-participants__link">
                <p @click="">Показать всех</p>
            </div>
        </section>
        <!-- Другие мероприятия -->
        <h2 class="title title--subtitle event_border">Другие мероприятия</h2>
        <div class="other_events_wrap"></div>
        <Button
            class="form-button btn_wrap"
            type="button"
            label="Показать еще"
            variant="text"
            size="large"
        ></Button>
    </div>
</template>

<script setup>
import { ref, onActivated } from 'vue';
import { Button } from '@shared/components/buttons';
import { useRoute, useRouter } from 'vue-router';
import {
    getAction,
    getOrganizator,
    getParticipants,
} from '@services/ActionService';
import { getUser } from '@services/UserService';
const route = useRoute();
const router = useRouter();
const user = ref({});

//Костыли
const participant_active = ref(false);
const isorganizator = ref(false);
const isGetAll = ref(false);

const event = ref({
    id: '',
    author: '',
    format: '',
    direction: '',
    status: '',
    scale: '',
    created_at: '',
    name: '',
    banner: '',
    conference_link: '',
    address: '',
    description: '',
    application_type: '',
    available_structural_units: '',
    participants_number: '',
    time_data: {
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        registration_end_date: '',
        registration_end_time: '',
        hour: '',
    },
});

const participants = ref([]);
const organizators = ref([
    {
        organizer: '',
        organizer_phone_number: '',
        organizer_email: '',
        organization: '',
        telegram: '',
        is_contact_person: false,
    },
]);

onActivated(() => {
    getAction(route.params.id).then((resp) => {
        event.value = resp.data;
        getOrganizator(route.params.id).then((resp) => {
            organizators.value = resp.data;
            const filted = organizators.value.filter((org) => {
                org.is_contact_person === true;
            });
            organizators_filted.value.push(filted);
        });
    });
    getUser().then((resp) => {
        organizators.value.forEach((value) => {
            if (value.organizator == user.value.id) {
                isorganizator.value = true;
            }
        });
    });
    getParticipants(route.params.id).then((resp) => {
        participants.value = resp.data;
    });
});
function EditAction() {
    router.push({ name: 'editAction', params: { id: route.params.id } });
}

function AddParticipant() {
    let link = '';
    switch (event.value.application_type) {
        case 'Персональная':
            link = 'submit/individualsubmit';
            break;
        case 'Групповая':
            link = 'submit/multistagesubmit';
            break;
        case 'Мультиэтапная':
            link = 'submit/individualsubmit';
            break;
    }
    router.push({ name: `${link}`, params: { id: route.params.id } });
}

function ParticipantsWait() {
    isGetAll.value = !isGetAll.value;
}

const organizators_filted = ref([]);

// member.value = member.value.sort((a, b) => a.is_trusted - b.is_trusted);
// const lastCategoryIndex = member.value.findIndex(
//     (item) => item.is_trusted === false,
// );
</script>

<style lang="scss" scoped>
.event {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    &-cols-2 {
        display: flex;
        flex-direction: row;
        justify-content: start;
        width: 48%;
        height: 24px;
        margin-left: 1%;
        margin-right: 1%;
    }
    &-cols-2 img {
        width: 24px;
        height: 24px;
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
    margin-top: 20px;
    margin-bottom: 20px;
}
.form-button {
    // min-height: 52px;
    margin: 0;
    padding: 16px 32px;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    max-width: 248px;
    // text-transform: none;
    // display: flex;
    // justify-content: center;
    // margin-left: 20px;

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
.banner_wrap img {
    height: 540px;
    width: 100%;
    border: 1px solid black;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 430px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        // justify-items: start;
    }
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
    box-shadow: 0px 6px 14px 3px rgba(34, 60, 80, 0.09);
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
    border: 0.5px solid black;
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
    margin-bottom: 80px;
}

.section_wrap {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
    padding: 70px 43px 0 43px;
}

.list_wrap {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 20px;
}

.participant_img {
    margin: 0 auto;
}

.squad-participants__link {
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 24px;
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

.event_btn {
    padding: 10px 24px;
    font-family: Bert Sans;
    font-size: 20px;
    font-weight: 500;
}
.event_go {
    background: rgba(28, 92, 148, 1);
    border-radius: 30px;
    color: white;
    margin-right: 8px;
}

.event_ok {
    border: 2px solid rgba(28, 92, 148, 1);
    background: none;
    color: rgba(28, 92, 148, 1);
    border-radius: 30px;
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
