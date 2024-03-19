<template>
    <div class="container">
        <bannerCreate
            v-if="rolesCount !== 0"
            desc="Студенческие отряды — это больше, чем работа. Километры впечатлений, тысячи друзей и лето с пользой!"
            label="Создать мероприятие"
            name="createAction"
            :button="true"
            :target="'_blank'"
        ></bannerCreate>

        <h2 class="action-title">Мероприятия</h2>
        <div class="searcher">
            <div class="squads-search">
                <input
                    type="text"
                    id="search"
                    class="squads-search__input"
                    placeholder="Найти мероприятие"
                    v-model="text"
                    @input="SearchByInput"
                />
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </div>
        <div class="action-slides">
            <div class="settings-container">
                <v-expansion-panels >
                    <v-expansion-panel
                        class="settings-body"
                        title="Тип мероприятия"
                    >
                    <v-expansion-panel-text>
                            <div class="settings-checkbox">
                                <input
                                    v-model="actionFormSearch.format.online"
                                    value="Онлайн"
                                    type="checkbox"
                                    name="online"
                                />
                                <label for="online">Онлайн</label>
                            </div>
                            <div class="settings-checkbox">
                                <input
                                    v-model="actionFormSearch.format.offline"
                                    value="Оффлайн"
                                    type="checkbox"
                                    name="offline"
                                />
                                <label for="offline">Оффлайн</label>
                            </div>
                    </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                        class="settings-body"
                        title="Статус мероприятия"
                    >
                        <v-expansion-panel-text>
                            <div class="settings-checkbox">
                                <input
                                    v-model="actionFormSearch.status.start"
                                    value="Незавершен"
                                    type="checkbox"
                                    name="open"
                                />
                                <label for="open">Незавершен</label>
                            </div>
                            <div class="settings-checkbox">
                                <input
                                    v-model="actionFormSearch.status.finish"
                                    value="Завершен"
                                    type="checkbox"
                                    name="close"
                                />
                                <label for="close">Завершен</label>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="settings-body" title="Масштаб">
                        <v-expansion-panel-text>
                            <div class="flex align-items-center">
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.roads"
                                        type="radio"
                                        value="Все"
                                    />
                                    <label class="ml-2">Все</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.roads"
                                        type="radio"
                                        value="Всероссийское"
                                    />
                                    <label class="ml-2">Всероссийское</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.roads"
                                        type="radio"
                                        value="Окружное"
                                    />
                                    <label class="ml-2">Окружное</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.roads"
                                        type="radio"
                                        value="Региональное"
                                    />
                                    <label class="ml-2">Региональное</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.roads"
                                        type="radio"
                                        value="Городское"
                                    />
                                    <label class="ml-2">Городское</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.roads"
                                        type="radio"
                                        value="Мероприятие ОО"
                                    />
                                    <label class="ml-2">Мероприятие ОО</label>
                                </div>
                                <div class="settings-radio">
                                    <input
                                        v-model="actionFormSearch.roads"
                                        type="radio"
                                        value="Отрядное"
                                    />
                                    <label class="ml-2">Отрядное</label>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                        class="settings-body"
                        title="Направление"
                    >
                        <v-expansion-panel-text>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Все"
                                />
                                <label class="ml-2">Все</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Добровольческое"
                                />
                                <label class="ml-2">Добровольческое</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Образовательное"
                                />
                                <label class="ml-2">Образовательное</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Патриотическое"
                                />
                                <label class="ml-2">Патриотическое</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Патриотическое"
                                />
                                <label class="ml-2">Спортивное</label>
                            </div>
                            <div class="settings-radio">
                                <input
                                    v-model="actionFormSearch.direction"
                                    type="radio"
                                    value="Все"
                                />
                                <label class="ml-2">Творческое</label>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>

            <div class="col" style="width: 100%">
                <div class="sort-container">
                  <div class="sort-layout">
                    <div>
                      <Button
                          v-if="vertical"
                          type="button"
                          class="dashboard events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      >
                      </Button>
                      <Button
                          v-else
                          type="button"
                          class="dashboardD events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      >
                      </Button>
                    </div>
                    <div>
                      <Button
                          v-if="!vertical"
                          type="button"
                          class="menuuA events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      ></Button>
                      <Button
                          v-else
                          type="button"
                          class="menuu events__sort-button"
                          icon="icon"
                          color="white"
                          @click="showVertical"
                      ></Button>
                    </div>

                  </div>
                    <div class="sort-alphabet">
                      <v-select
                          class="events__sort-select"
                          item-title="text"
                          item-value="value"
                          :items="sortOptionss"
                          variant="outlined"
                          placeholder="Выберите фильтр"
                      ></v-select>
                      <Button
                          type="button"
                          class="ascend events__sort-buttonDirection"
                          icon="switch"
                          @click="ascending = !ascending"
                          color="white"
                      ></Button>
                    </div>
                </div>
                <div class="postcard-container">
                    <div
                        v-if="vertical"
                        v-for="action in actionsList"
                        :key="action"
                    >
                        <Actionitem :action="action"></Actionitem>
                    </div>
                    <div
                        v-if="!vertical"
                        v-for="action in actionsList"
                        class="postcard-containerline"
                        :key="action"
                    >
                        <ActionitemVertical
                            :action="action"
                        ></ActionitemVertical>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//Импорт файлов
import { Button } from '@shared/components/buttons';
import bannerCreate from '@shared/components/imagescomp/bannerCreate.vue';
import { ref, watchEffect } from 'vue';
import Actionitem from '@entities/Actions/components/actionitem.vue';
import ActionitemVertical from '@entities/Actions/components/actionitemVertical.vue';
import { sortByEducation } from '@shared/components/selects';

import { getListActionsBySearch, getRoles } from '@services/ActionService';
import { onActivated } from 'vue';

let actionsList = ref([]);
let rolesCount = ref(0);

onActivated(() => {
    getListActionsBySearch(text.value).then((resp) => {
        actionsList.value = resp.data.results;
    });
    getRoles().then((resp) => {
        Object.entries(resp.data).forEach(([key, value]) => {
            if (value !== null) {
                rolesCount.value = rolesCount.value + 1;
            }
        });
    });
});

//Массив полученных значений
const text = ref('');

//Поиск нового значения
function SearchByInput() {
    if (text.value.length <= 4) {
        getListActionsBySearch('').then((resp) => {});
    } else {
        getListActionsBySearch(text.value).then((resp) => {
          console.log('resp:', resp)});
    }
}

//Сортировка
const vertical = ref(true);
const ascending = ref(true);

//События нажатия
function ClearSearchForm() {
    actionFormSearch.value = {
        format: {
            online: null,
            offline: null,
        },
        direction: '',
        status: {
            start: null,
            finish: null,
        },
        roads: '',
        search: '',
    };
    console.log('Форма очищена');
}

//До лучших времен...
const actionFormSearch = ref({
    format: {
        online: null,
        offline: null,
    },
    direction: '',
    status: {
        start: null,
        finish: null,
    },
    roads: '',
    search: '',
});
function SendSearchForm() {}

//Изменение расположения блоков
const showVertical = () => {
    vertical.value = !vertical.value;
};

const sortBy = ref('alphabetically');

watchEffect(() => {
    switch (sortBy.value) {
        case 'alphabetically':
            break;
        case 'founding_date':
            break;
        case 'members_count':
            break;
    }
});

const sortOptionss = ref([
  {
    text: 'Алфавиту от А - Я',
    value: 'alphabetically',

  },
  { value: 'founding_date', text: 'Дате создания штаба' },
  { value: 'members_count', text: 'Количеству участников' },
]);

//Получить полный список мероприятий
</script>

<style>
.v-input__control {
  width: 232px;
}
.v-expansion-panels {
  width: 284px;
}
.v-field__outline {
  border-radius: 10px;
}
.v-field__input {
  min-height: 32px;
  /*max-width: 232px;*/
  padding: 4px 16px 4px 16px;
}
.v-select__selection-text {
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
  color: #35383F;
}
.v-select__selection {
  margin-top: 0 !important;
}
.v-field--variant-outlined .v-field__outline__end,
.v-field--variant-outlined .v-field__outline__start {
  border: none;
}
.v-expansion-panel-title {
  font-family: Bert Sans;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 0;
}
.v-expansion-panel__shadow {
  border: none;
  box-shadow: none;
}
.settings-checkbox,
.settings-radio {
  font-family: Bert Sans;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;
}
.v-expansion-panel-text__wrapper {
  padding-left: 0;
}
.v-expansion-panel-title__overlay {
  background-color: initial;
}
</style>

<style lang="scss" scoped>
//Общий стиль компонента
.action {
    &-title {
        height: 116px;
        font-size: 52px;
        @media screen and (max-width: 575px) {
            font-size: 32px;
        }
    }
    &-slides {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
}
//Стили аккордеонов
.settings {
    &-container {
        //width: 320px;
        margin-right: 16px;
        margin-bottom: 80px;
    }
    &-text {
        align-items: baseline;
    }
    &-buttoms {
        width: 100%;
        margin-top: 40px;
        height: 40px;
        display: flex;
        justify-content: space-around;
    }
    &-radio {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 10px;
    }
    &-radio input {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
    &-select {
        padding-right: 5px;
    }
    &-btm {
        width: 114px;
        border-radius: 10px;
        background-color: #39bfbf;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-checkbox {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    &-checkbox input {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
    &-label {
        font-family: Bert Sans;
        font-size: 1.2vw;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        margin-top: 5px;
        margin-bottom: 2px;
    }
    &-btminv {
        width: 114px;
        border-radius: 10px;
        border: 2px solid #35383f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
//Стиль сортировки
.events {
  &__sort {
    &__select {
      max-height: 32px;
      margin-right: 4px;
    }
    &-select {
      max-height: 32px;
      margin-right: 4px;
      border: 1px solid #B6B6B6;
      border-radius: 10px;
    }
    &-button {
      width: 32px;
      height: 32px;
    }
    &-buttonDirection {
      border-radius: 10px;
      width: 32px;
      height: 32px;
      margin-left: 0;
      border: 1px solid #B6B6B6 !important;
    }
  }
}
.sort {
    &-container {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }
    &-alphabet {
        //width: 320px;
        display: flex;
        justify-content: flex-end;
    }
    &-select {
        //height: 50px;
        //position: relative;
        //display: flex;
        //flex-direction: column;
    }
    .education {
        width: 305px;
        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }
}
.dashboard {
    background-image: url('@app/assets/icon/darhboard-active.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.dashboardD {
    background-image: url('@app/assets/icon/darhboard-disable.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.menuuA {
    background-image: url('@app/assets/icon/MenuA.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.menuu {
    background-image: url('@app/assets/icon/Menu.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.ascend {
    background-image: url('@app/assets/icon/switch.svg');
    background-repeat: no-repeat;
    background-position: center;
}
//Стиль поисковика
.searcher {
    width: 100%;
    height: 50px;
    margin-bottom: 40px;
}

svg {
    position: absolute;
    top: 10px;
    left: 16px;
}

input {
    width: 100%;
    padding: 13px 0px 10px 60px;
    border-radius: 10px;
    border: 1px solid black;
}
//Сброс стилей аккордиона
.v-expansion-panel {


    &--active,
    &--after-active {
        margin: 0;
    }

    &--active:not(:first-child) {
        margin: 0;
    }

    &--active + .v-expansion-panel {
        margin: 0;
    }

    .v-expansion-panel-title {
        max-height: 60px;
        font-family: 'Akrobat';
        font-size: 24px;
        font-weight: 600;
        background-color: transparent;
        border-bottom: 1px solid #939393;
        color: #35383f;
        padding: 16px 0px;

        &__overlay {
            display: none;
        }
    }
}
.v-expansion-panel:not(:first-child)::after {
    display: none;
}
</style>
