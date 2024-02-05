<template>
    <div class="container">
        <bannerCreate
            desc="Студенческие отряды — это больше, чем работа. Километры впечатлений, тысячи друзей и лето с пользой!"
            label="Создать мероприятие"
            name="createAction"
        ></bannerCreate>
        <h2 class='action-title'>Мероприятия</h2>
        <div class='searcher'>
            <SearchInput @search="SearchByInput"></SearchInput>
        </div>
        <div class="row-cols-2 action-slides">
            <div class="col settings-container">
                <v-expansion-panels class="settings-header" variant="accordion">
                    <v-expansion-panel
                        class="settings-body"
                        title="Тип мероприятия"
                    >
                        <v-expansion-panel-text
                            v-model="actionFormSearch.format"
                        >
                            <v-checkbox
                                v-model="actionFormSearch.format"
                                label="Онлайн"
                                value="Онлайн"
                            ></v-checkbox>
                            <v-checkbox
                                v-model="actionFormSearch.format"
                                label="Офлайн"
                                value="Офлайн"
                            ></v-checkbox>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                        class="settings-body"
                        title="Статус мероприятия"
                    >
                        <v-expansion-panel-text>
                            <v-radio-group v-model="actionFormSearch.status">
                                <v-checkbox
                                    v-model="actionFormSearch.status"
                                    label="Незавершенные"
                                    value="Незавершенные"
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="actionFormSearch.status"
                                    label="Завершенные"
                                    value="Завершенные"
                                ></v-checkbox>
                            </v-radio-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel class="settings-body" title="Маштаб">
                        <v-expansion-panel-text>
                            <v-radio-group v-model="actionFormSearch.roads">
                                <v-radio
                                    v-model="actionFormSearch.roads"
                                    label="Все"
                                    value="Все"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.roads"
                                    label="Всероссийское"
                                    value="Всероссийское"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.roads"
                                    label="Окружное"
                                    value="Окружное"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.roads"
                                    label="Региональное"
                                    value="Региональное"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.roads"
                                    label="Городское"
                                    value="Городское"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.roads"
                                    label="Мероприятие ОО"
                                    value="Мероприятие ОО"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.roads"
                                    label="Отрядное"
                                    value="Отрядное"
                                ></v-radio>
                            </v-radio-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel
                        class="settings-body"
                        title="Направление"
                    >
                        <v-expansion-panel-text>
                            <v-radio-group v-model="actionFormSearch.direction">
                                <v-radio
                                    v-model="actionFormSearch.direction"
                                    label="Все"
                                    value="Все"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.direction"
                                    label="Добровольческое"
                                    value="Добровольческое"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.direction"
                                    label="Образовательное"
                                    value="Образовательное"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.direction"
                                    label="Патриотическое"
                                    value="Патриотическое"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.direction"
                                    label="Спортивное"
                                    value="Спортивное"
                                ></v-radio>
                                <v-radio
                                    v-model="actionFormSearch.direction"
                                    label="Творческое"
                                    value="Творческое"
                                ></v-radio>
                            </v-radio-group>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <div class="settings-buttoms">
                    <Button
                        class="settings-btminv"
                        type="button"
                        @click="ClearSearchForm"
                        >Сбросить</Button
                    >
                    <Button
                        class="settings-btm"
                        type="button"
                        @click="SendSearchForm"
                        >Сохранить</Button
                    >
                </div>
            </div>
            <!--Привет) Страницы мероприятий писал и подключал Modestra -->
            <!--Я в поисках работы, если вам требуется Frontend разработчик, пишите сюда -->
            <!--https://t.me/Modestra -->
            <div class='col' style='width: 100%'>
                <div class='sort-container'>
                    <div class='sort-layout sort-types'>
                        <Button v-if='vertical' type='button' class='dashboard sort-button' icon='icon' color='white'
                                @click='showVertical'>
                        </Button>
                        <Button
                            v-else="!vertical"
                            type="button"
                            class="dashboardD sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        >
                        </Button>
                        <Button
                            v-if="!vertical"
                            type="button"
                            class="menuuA sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        ></Button>
                        <Button
                            v-else="vertical"
                            type="button"
                            class="menuu sort-button"
                            icon="icon"
                            color="white"
                            @click="showVertical"
                        ></Button>
                    </div>
                    <div class="sort-alphabet">
                        <sortByEducation
                            variant="outlined"
                            v-model="sortBy"
                            :options="sortOptionss"
                            class="sort-select select"
                        ></sortByEducation>
                        <Button
                            type="button"
                            class="ascend sort-button"
                            icon="switch"
                            @click="ascending = !ascending"
                            color="white"
                        ></Button>
                    </div>
                </div>
                <div class="postcard-container">
                    <div v-if="vertical" v-for="action in actionsList">
                        <Actionitem :action="action"></Actionitem>
                    </div>
                    <div
                        v-if="!vertical"
                        v-for="action in actionsList"
                        class="postcard-containerline"
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
import SearchInput from "@features/ActionForm/components/SearchInput.vue";
import Button from "primevue/button";
import bannerCreate from "@shared/components/imagescomp/bannerCreate.vue";
import { ref } from 'vue';
import Actionitem from '@entities/Actions/components/actionitem.vue';
import ActionitemVertical from '@entities/Actions/components/actionitemVertical.vue';
import { sortByEducation, Select } from '@shared/components/selects';
import { getListActions } from '@services/ActionService';
import { computed } from "vue";
import { onActivated } from "vue";

let actionsList = ref([]);

//Массив полученных значений
const SortedList = ref([])

const SearchResult = ref('')

//Поиск нового значения
function SearchByInput(){
  actionsList.value.forEach((action)=>{
    if(actionsList.value.name.includes(SearchByInput.value)){
      SortedList.value.push(action)
    }
  })
  console.log(SortedList.value)
}
onActivated(()=>{
  getListActions()
    .then((responce)=>{
      actionsList.value = responce.data;
    })
    .catch((e) =>{

    })
})
const actionNewList = computed(() => {
  console.log(sortBy);
})

//Сортировка
const vertical = ref(true);
const ascending = ref(true);

//События нажатия
function ClearSearchForm() {
    console.log('Форма очищена');
}

const actionFormSearch = {
    format: '',
    direction: '',
    status: '',
    roads: '',
    search: '',
};
function SendSearchForm() {
    console.log(actionFormSearch);
}
//Изменение расположения блоков
const showVertical = () => {
    vertical.value = !vertical.value;
};

const sortBy = ref('alphabetically');

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
    { value: 'members_count', name: 'Количеству участников' },
]);

//Получить полный список мероприятий
</script>

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
        width: 320px;
        margin-right: 16px;
        margin-bottom: 20px;
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
.sort {
    &-container {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }
    &-select {
        margin-right: 8px;
    }
    &-types {
        height: 50px;
    }
    &-button {
        margin-right: 5px;
        border: 1px solid black;
        border-radius: 5px;
        width: 25px;
        height: 25px;
    }
    &-alphabet {
        width: 320px;
        display: flex;
        justify-content: flex-end;
    }
    &-select {
        height: 50px;
        position: relative;
        display: flex;
        flex-direction: column;
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

    // &__input {
    //     width: 100%;
    //     padding: 13px 0px 10px 60px;
    //     border-radius: 10px;
    //     border: 1px solid black;
    // }
    //Сброс стилей аккордиона
    .v-expansion-panel {
    &__shadow {
        box-shadow: none;
    }

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
</style>
