<template>
    <div class="container">
        <Breadcrumbs :items="pages"></Breadcrumbs>
        <h1 class="title title--lso">
            Всероссийский конкурс фотографий среди студенческих отрядов
        </h1>
        <div class="banner_wrap">
            <div>
                <img
                    src="@/app/assets/banner_event.jpg"
                    alt="Баннер личной страницы(пусто)"
                />
            </div>
            <div class="banner_wrap_btn">
                <Button
                    class="form-button"
                    type="button"
                    label="Редактировать заявку"
                    variant="text"
                    size="large"
                    @click="EditAction"
                ></Button>
                <Button
                    type="button"
                    class="form-button form-button--white"
                    variant="text"
                    label="Отказаться от участия"
                    size="large"
                ></Button>
                <Button
                    type="button"
                    class="form-button form-button--grey"
                    variant="text"
                    label="Заявка на рассмотрении"
                    size="large"
                ></Button>
            </div>
        </div>
        <h2 class="title title--subtitle">О мероприятии</h2>
        <div class="event_type_wrap">
            <span
                class="event_type"
                v-for="category in eventCategory"
                :key="category"
                >{{ category }}</span
            >
        </div>
        <p class="text">
            «В объективе РСО» — Фотографический квест для членов Российских
            студенческих отрядов!
        </p>
        <p class="text event_type_wrap">
            Добро пожаловать на захватывающее мероприятие «В объективе РСО»! Это
            уникальный фотографический квест, специально созданный для членов
            Региональной Студенческой Организации (РСО), с целью познакомить
            участников с искусством фотографии и развить их креативные навыки
            через объектив фотоаппаратов.
        </p>
        <!-- Доработать grid, при уменьшении список не сдвигается, если много текста, то не переносится на новую строчку -->
        <v-list class="item_wrap">
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                color="primary"
                class="list_item"
            >
                <template v-slot:prepend>
                    <v-img :src="item.icon" class="icon_img"></v-img>
                </template>
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list>
        <!-- Организаторы -->
        <h2 class="title title--subtitle">Организаторы</h2>

        <div class="card_wrap">
            <v-card v-for="card in cards" :key="card" class="event_card_wrap">
                <v-img width="120" :src="card.avatar"></v-img>
                <div class="text text--organizer">
                    {{ card.name }}
                </div>
                <div class="text text--status">
                    {{ card.status }}
                </div>
            </v-card>
        </div>
        <!-- Контактные лица -->
        <h2 class="title title--subtitle">Контактные лица</h2>
        <div class="card_wrap">
            <v-card v-for="card in cards" :key="card" class="event_card_wrap">
                <v-img width="120" :src="card.avatar"></v-img>
                <div class="text text--organizer">
                    {{ card.name }}
                </div>
                <div class="text text--status">
                    {{ card.status }}
                </div>
            </v-card>
        </div>
        <!-- Участники -->
        <h3 class="title title--subtitle">Участники</h3>
        <div class="event_btn_participant">
            <button class="event_btn event_go">Уже идут</button>
            <button class="event_btn event_ok">Ожидают одобрения</button>
        </div>

        <section class="section_wrap">
            <ul class="list_wrap">
                <li
                    v-for="participant in participants.slice(0, 6)"
                    :key="participant"
                >
                    <div>
                        <img :src="participant.image" alt="avatar" />
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
                        <img :src="participant.image" alt="avatar" />
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
        <!-- Другие мероприятия -->
        <h2 class="title title--subtitle event_border">Другие мероприятия</h2>
        <div class="other_events_wrap">
            <v-card class="card">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    cover
                    class="radius"
                ></v-img>
                <v-card-text class="text text--event_title">
                    Название мероприятия очень длинное название, которое кому-то
                    посвящено
                </v-card-text>
                <div class="text text--event_info">
                    <div>06 июля 2023</div>
                    <div>100 №</div>
                </div>
                <div class="event_type_card_wrap">
                    <span class="event_type_card">Всероссийское</span>
                    <span class="event_type_card">Образовательное</span>
                </div>
            </v-card>
            <v-card class="card">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    cover
                    class="radius"
                ></v-img>
                <v-card-text class="text text--event_title">
                    Название мероприятия очень длинное название, которое кому-то
                    посвящено
                </v-card-text>
                <div class="text text--event_info">
                    <div>06 июля 2023</div>
                    <div>100 №</div>
                </div>
                <div class="event_type_card_wrap">
                    <span class="event_type_card">Всероссийское</span>
                    <span class="event_type_card">Образовательное</span>
                </div>
            </v-card>
            <v-card class="card">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    cover
                    class="radius"
                ></v-img>
                <v-card-text class="text text--event_title">
                    Название мероприятия очень длинное название, которое кому-то
                    посвящено
                </v-card-text>
                <div class="text text--event_info">
                    <div>06 июля 2023</div>
                    <div>100 №</div>
                </div>
                <div class="event_type_card_wrap">
                    <span class="event_type_card">Всероссийское</span>
                    <span class="event_type_card">Образовательное</span>
                </div>
            </v-card>
            <v-card class="card">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    cover
                    class="radius"
                ></v-img>
                <v-card-text class="text text--event_title">
                    Название мероприятия очень длинное название, которое кому-то
                    посвящено
                </v-card-text>
                <div class="text text--event_info">
                    <div>06 июля 2023</div>
                    <div>100 №</div>
                </div>
                <div class="event_type_card_wrap">
                    <span class="event_type_card">Всероссийское</span>
                    <span class="event_type_card">Образовательное</span>
                </div>
            </v-card>
            <v-card class="card">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                    cover
                    class="radius"
                ></v-img>
                <v-card-text class="text text--event_title">
                    Название мероприятия очень длинное название, которое кому-то
                    посвящено
                </v-card-text>
                <div class="text text--event_info">
                    <div>06 июля 2023</div>
                    <div>100 №</div>
                </div>
                <div class="event_type_card_wrap">
                    <span class="event_type_card">Всероссийское</span>
                    <span class="event_type_card">Образовательное</span>
                </div>
            </v-card>
            <!-- <v-card class="card">
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
                cover
                class="radius"
            ></v-img>
            <v-card-text class="text text--event_title">
                Название мероприятия очень длинное название, которое кому-то
                посвящено
            </v-card-text>
            <div class="text text--event_info">
                <div>06 июля 2023</div>
                <div>100 №</div>
            </div>
            <div class="event_type_card_wrap">
                <span class="event_type_card">Всероссийское</span>
                <span class="event_type_card">Образовательное</span>
            </div>
        </v-card> -->
        </div>
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
import { ref } from 'vue';
import { Breadcrumbs } from '@shared/components/breadcrumbs';
import { Button } from '@shared/components/buttons';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

function EditAction(){
    console.log("Test")
    router.push({ name: 'editAction', params: { id: route.params.id } });
}
const pages = ref([
    { pageTitle: 'Мероприятия', href: '#' },
    {
        pageTitle:
            'Всероссийский конкурс фотографий среди студенческих отрядов',
        href: '#',
    },
]);

const eventCategory = ref([
    'Образовательное',
    'Спортивное',
    'Творческое',
    'Добровольческое',
    'Патриотическое',
]);

const items = ref([
    {
        text: 'Форма заявки: Многоэтапная',
        icon: './assets/icon_items/list.svg',
    },
    {
        text: 'Начало мероприятия: 06.07.2023, 10:30',
        icon: './assets/icon_items/clock.svg',
    },
    {
        text: 'Масштаб мероприятия: Всероссийское',
        icon: './assets/icon_items/map.svg',
    },
    {
        text: 'Окончание мероприятия: 08.07.2023, 16:00',
        icon: './assets/icon_items/clock.svg',
    },
    {
        text: 'Планируемое количество участников: 350',
        icon: './assets/icon_items/group.svg',
    },
    {
        text: 'Начало регистрации: 18.06.2023, 10:30 ',
        icon: './assets/icon_items/clock.svg',
    },
    {
        text: 'Адрес: г. Барнаул, ул. Малахова, д. 44, ТЦ «Огни»',
        icon: './assets/icon_items/label.svg',
    },
    {
        text: 'Окончание регистрации: 4.07.2023, 10:30',
        icon: './assets/icon_items/clock.svg',
    },
]);

const cards = ref([
    {
        avatar: './assets/avatar.png',
        name: 'Александрова Вероника Александровна',
        status: 'Командир',
    },
    {
        avatar: './assets/avatar.png',
        name: 'Александрова Вероника Александровна',
        status: 'Комиссар',
    },
    {
        avatar: './assets/avatar.png',
        name: 'Александрова Вероника Александровна',
        status: 'Методист',
    },
    {
        avatar: './assets/avatar.png',
        name: 'Александрова Вероника Александровна',
        status: 'Методист',
    },
]);

const participants = ref([
    {
        name: 'Андрей',
        status: 'Командир',
        image: './assets/avatar.png',
        category: 2,
    },
    {
        name: 'Мария',
        status: 'Комиссар',
        image: './assets/avatar.png',
        category: 1,
    },
    {
        name: 'Екатерина',
        status: 'Мастер',
        image: './assets/avatar.png',
        category: 1,
    },
    {
        name: 'Артём',
        status: 'Боец',
        image: './assets/avatar.png',
        category: 2,
    },
]);

// member.value = member.value.sort((a, b) => a.is_trusted - b.is_trusted);
// const lastCategoryIndex = member.value.findIndex(
//     (item) => item.is_trusted === false,
// );
</script>

<style lang="scss" scoped>
.form-button {
    min-height: 52px;
    margin: 0;
    padding: 16px 32px;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-transform: none;
    display: flex;
    justify-content: center;
    margin-left: 20px;

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
}

.banner_wrap {
    position: relative;
}

.banner_wrap_btn {
    bottom: 24px;
    position: absolute;
    right: 32px;
    display: flex;
    flex-direction: row-reverse;
}

.event_type {
    border: 1px solid rgba(53, 56, 63, 1);
    background: none;
    min-height: 32px;
    margin: 0;
    padding: 10px 12px;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-weight: 400;
    border-radius: 18px;
    margin-right: 16px;
}

.event_type_wrap {
    margin-bottom: 40px;
}

.item_wrap {
    pointer-events: none;
    display: grid;
    grid-template-columns: 50% 50%;
}

.event_card_wrap {
    max-width: 280px;
    margin: 0 20px 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 22px;
}

.card_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
    margin-bottom: 30px;
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
    margin-bottom: 80px;
}

.section_wrap {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
    padding: 70px 43px 0 43px;
}

.list_wrap {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    margin-bottom: 40px;
}

.squad-participants__link {
    margin: 0 auto;
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
    margin-bottom: 80px;
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
    grid-template-columns: repeat(4, 1fr);
    // grid-gap: 5px;
}
</style>
