<template>
    <div class='container'>
        <bannerCreate desc="Студенческие отряды — это больше, чем работа. Километры впечатлений, тысячи друзей и лето с пользой!"
                      label="Создать мероприятие" name='createAction'></bannerCreate>
        <h2 class='action-title'>Мероприятия</h2>
        <div class='searcher'>
            <div class='squads-search'>
                <input
                    type='text'
                    id='search'
                    class='squads-search__input'
                    placeholder='Найти мероприятие'
                />
                <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z'
                        stroke='#898989'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
            </div>
        </div>
        <div class='row-cols-2 action-slides'>
            <div class='col settings-container'>
                <v-form>
                    <v-expansion-panels class='settings-header' variant="accordion">
                        <v-expansion-panel class='settings-body' title="Тип мероприятия">
                            <v-expansion-panel-text>
                                <v-checkbox v-model='actionTypeSearch' label="Онлайн" value="Онлайн"></v-checkbox>
                                <v-checkbox v-model='actionTypeSearch' label="Офлайн" value="Офлайн"></v-checkbox>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel class='settings-body' title="Статус мероприятия">
                            <v-expansion-panel-text>
                                <v-radio-group>
                                    <v-checkbox v-model='statusSearch' label="Незавершенные" value='Незавершенные'></v-checkbox>
                                    <v-checkbox v-model='statusSearch' label="Завершенные" value='Завершенные'></v-checkbox>
                                </v-radio-group>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel class='settings-body' title="Маштаб">
                            <v-expansion-panel-text>
                                <v-radio-group>
                                    <v-radio v-model='rangeTypeSearch' label="Все" value="Все"></v-radio>
                                    <v-radio v-model='rangeTypeSearch' label="Всероссийское" value="Всероссийское"></v-radio>
                                    <v-radio v-model='rangeTypeSearch' label="Окружное" value="Окружное"></v-radio>
                                    <v-radio v-model='rangeTypeSearch' label="Региональное" value="Региональное"></v-radio>
                                    <v-radio v-model='rangeTypeSearch' label="Городское" value="Городское"></v-radio>
                                    <v-radio v-model='rangeTypeSearch' label="Мероприятие ОО" value="Мероприятие ОО"></v-radio>
                                    <v-radio v-model='rangeTypeSearch' label="Отрядное" value="Отрядное"></v-radio>
                                </v-radio-group>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel class='settings-body' title="Направление">
                            <v-expansion-panel-text>
                                <v-radio-group v-model='roadSearch'>
                                    <v-radio v-model='roadSearch' label="Все" value="Все"></v-radio>
                                    <v-radio v-model='roadSearch' label="Добровольческое" value="Добровольческое"></v-radio>
                                    <v-radio v-model='roadSearch' label="Образовательное" value="Образовательное"></v-radio>
                                    <v-radio v-model='roadSearch' label="Патриотическое" value="Патриотическое"></v-radio>
                                    <v-radio v-model='roadSearch' label="Спортивное" value="Спортивное"></v-radio>
                                    <v-radio v-model='roadSearch' label="Творческое" value="Творческое"></v-radio>
                                </v-radio-group>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <div class='settings-buttoms'>
                        <Button class='settings-btminv' type='button' @click='ClearSearchForm' >Сбросить</Button>
                        <Button class='settings-btm' type='button' @click='SendSearchForm'>Сохранить</Button>
                    </div>
                </v-form>
            </div>
            <div class='col' style='width: 100%'>
                <div class='sort-container'>
                    <div class='sort-layout sort-types'>
                        <Button v-if='vertical' type='button' class='dashboard sort-button' icon='icon' color='white'
                                @click='showVertical'>
                        </Button>
                        <Button v-else='!vertical' type='button' class='dashboardD sort-button' icon='icon' color='white'
                                @click='showVertical'>
                        </Button>
                        <Button
                            v-if='!vertical'
                            type='button'
                            class='menuuA sort-button'
                            icon='icon'
                            color='white'
                            @click='showVertical'
                        ></Button>
                        <Button
                            v-else='vertical'
                            type='button'
                            class='menuu sort-button'
                            icon='icon'
                            color='white'
                            @click='showVertical'
                        ></Button>
                    </div>
                    <div class='sort-alphabet'>
                        <Button
                            type='button'
                            class='ascend sort-button'
                            icon='switch'
                            @click='ascending = !ascending'
                            color='white'
                        ></Button>
                    </div>
                </div>
                <div class='postcard-container'>
                    <div v-if='vertical' v-for='action in actionsList'>
                        <Actionitem :action='action'></Actionitem>
                    </div>
                    <div v-if='!vertical' v-for='action in actionsList' class='postcard-containerline'>
                        <ActionitemVertical :action='action'></ActionitemVertical>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//Импорт файлов
import * as HTTP from 'http';
import Button from "primevue/button";
import BannerCreate from '@shared/components/imagescomp/bannerCreate.vue';
import { onBeforeMount, ref } from 'vue';
import actions from '@entities/Actions/actions';
import Actionitem from '@entities/Actions/components/actionitem.vue';
import ActionitemVertical from '@entities/Actions/components/actionitemVertical.vue';
import { getListActions } from '@services/ActionService';;
getListActions()
    .then((responce)=>{
        actionsList = responce.data;
        console.log("Список мероприятий:", actionsList);
    })
    .catch((e) =>{

    })

//Переменные компонента
let actionsList = []
const actionTypeSearch = ref('');
const statusSearch = ref('');
const rangeTypeSearch = ref('');
const roadSearch = ref('');

//Сортировка
const vertical = ref(true);
const ascending = ref(true);

//События нажатия
function ClearSearchForm() {
    console.log("Форма очищена")
};
function SendSearchForm() {
    const actionFormSearch = {
        format: actionTypeSearch.value,
        direction: statusSearch.value,
        status: rangeTypeSearch.value,
        roads: roadSearch.value
    }
    console.log(actionFormSearch);
};
//Изменение расположения блоков
const showVertical = () => {
    vertical.value = !vertical.value;
};

//Получить полный список мероприятий

</script>

<style lang='scss' scoped>
    //Общий стиль компонента
    .action{
        &-container{

        }
        &-title{
          height: 116px;
          font-size: 52px;
          @media screen and (max-width: 575px) {
            font-size: 32px;
          }
        }
        &-slides{
          display: flex;
          flex-direction: row;
          margin-bottom: 20px;
        }
    }
    //Стили аккордеонов
    .settings{
        &-container{
          width: 320px;
          margin-right: 16px;
          margin-bottom: 20px;
        }
        &-header{

        }
        &-body{

        }
        &-text{
          align-items: baseline;
        }
      &-buttoms{
        width: 100%;
        margin-top: 40px;
        height: 40px;
        display:flex;
        justify-content: space-around;
      }
      &-btm{
        width: 114px;
        border-radius: 10px;
        background-color: #39BFBF;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &-btminv{
        width: 114px;
        border-radius: 10px;
        border: 2px solid #35383F;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    //Стиль сортировки
    .sort{
      &-container{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
      }
      &-types{
        height: 50px;
      }
      &-button{
        margin-right: 5px;
        border: 1px solid black;
        border-radius: 5px;
        width: 25px;
        height: 25px;
      }
      &-alphabet {
        width: 100%;
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
    //Стиль карточки
    .postcard{
      &-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      &-containerline{
        display: flex;
        width: 100%;
        flex-direction: column;
      }
    }
    //Стиль поисковика
    .searcher {
      width: 100%;
      height: 50px;
      margin-bottom: 40px;

    }
    .squads-search {
      position: relative;
      box-sizing: border-box;

      svg {
        position: absolute;
        top: 10px;
        left: 16px;
      }

      &__input {
        width: 100%;
        padding: 13px 0px 10px 60px;
        border-radius: 10px;
        border: 1px solid black;
      }
    }
</style>
