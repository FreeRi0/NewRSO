<template>
    <div class="container">
        <h2 class='action-title'>Реестр участников</h2>
        <div class="searcher">
            <div class='squads-search'>
                <input
                    type='text'
                    id='search'
                    class='squads-search__input'
                    placeholder='Найти участника'
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
                <v-expansion-panels class='settings-header' variant="accordion">
                    <v-expansion-panel title="Уровень поиска">
                        <v-expansion-panel-text class='settings-body'>
                          <div class='flex align-items-center' style='display: flex'>
                              <input @click="loadParticipants" v-model="searchLevel" type='radio' value='Все' class='form-radio'/>
                              <label class="ml-2 form-label">Все</label>
                          </div>
                          <div class='flex align-items-center' style='display: flex'>
                              <input @click="loadParticipants" v-model="searchLevel" type='radio' value='Окружные' class='form-radio'/>
                              <label class="ml-2 form-label">Окружные штабы</label>
                          </div>
                          <div class='flex align-items-center' style='display: flex'>
                              <input @click="loadParticipants" v-model="searchLevel" type='radio' value='Региональные' class='form-radio'/>
                              <label class="ml-2 form-label">Региональные штабы</label>
                          </div>
                          <div class='flex align-items-center' style='display: flex'>
                              <input @click="loadParticipants" v-model="searchLevel" type='radio' value='Местные' class='form-radio'/>
                              <label class="ml-2 form-label">Местные штабы</label>
                          </div>
                          <div class='flex align-items-center' style='display: flex'>
                              <input @click="loadParticipants" v-model="searchLevel" type='radio' value='Штабы' class='form-radio'/>
                              <label class="ml-2 form-label">Штабы СО ОО</label>
                          </div>
                          <div class='flex align-items-center' style='display: flex'>
                              <input @click="loadParticipants" v-model="searchLevel" type='radio' value='ЛСО' class='form-radio'/>
                              <label class="ml-2 form-label">ЛСО</label>
                          </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel v-if="searchLevel === 'Штабы'" title="Штабы СО ОО">
                    <v-expansion-panel-text>
                      <div class='search-panel squads-search'>
                        <input
                            type='text'
                            id='search'
                            class='squads-search__input'
                            placeholder='Найти участника'
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
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                    <v-expansion-panel v-if="searchLevel === 'Местные'" title="Местные">
                    <v-expansion-panel-text>
                      <div class='search-panel squads-search'>
                        <input
                            type='text'
                            id='search'
                            class='squads-search__input'
                            placeholder='Найти участника'
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
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                    <v-expansion-panel v-if="searchLevel === 'Региональные'" title="Региональные">
                    <v-expansion-panel-text>
                      <div class='search-panel squads-search'>
                        <input
                            type='text'
                            id='search'
                            class='squads-search__input'
                            placeholder='Найти участника'
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
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel v-if="searchLevel === 'Окружные'" title="Окружные штабы">
                    <v-expansion-panel-text>
                      <div class='search-panel squads-search'>
                        <input
                            type='text'
                            id='search'
                            class='squads-search__input'
                            placeholder='Найти участника'
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
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel v-if="searchLevel === 'ЛСО'" title="ЛСО">
                    <v-expansion-panel-text>
                      <div class='search-panel squads-search'>
                        <input
                            type='text'
                            id='search'
                            class='squads-search__input'
                            placeholder='Найти участника'
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
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div class="col" style="width: 100%">
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
                        <sortByEducation
                              variant="outlined"
                              v-model="sortBy"
                              :options="sortOptionss"
                              class="sort-select select"
                          ></sortByEducation>
                        <Button
                            type='button'
                            class='ascend sort-button'
                            icon='switch'
                            @click='ascending = !ascending'
                            color='white'
                        ></Button>
                    </div>
                </div>
                <div class="sort-container">
                  <div class="postcard-container">
                      <div v-if="vertical">
                        <participantItem></participantItem>
                      </div>
                      <div v-if="!vertical">
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    //Общий стиль компонента
    .action{
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
      &-select{
        padding-right: 5px;
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
      &-body{
        display: flex;
        flex-direction: column;
      }
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
    //Стиль сортировки
    .sort{
      &-container{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
      }
      &-select{
        margin-right: 8px;
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
      &-radio{

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

<script setup>
import { onUpdated, ref } from 'vue';
import Button from "primevue/button";
import { sortByEducation, Select } from '@shared/components/selects';
import { getDetachments } from '@services/ParticipantsService';
import { participantItem } from '@entities/Participants';
import { onActivated } from 'vue';

const SelectList = ref([]);

onActivated(()=>{

})


//Сортировка
const vertical = ref(true);
const ascending = ref(true);

function loadParticipants(){
  switch(searchLevel.value){
    case "ЛСО":
      console.log(searchLevel.value)
    default:
      break;
  }
}

const sortBy = ref('alphabetically');

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'founding_date', name: 'Дате создания штаба' },
    { value: 'members_count', name: 'Количеству участников' },
]);

//Изменение расположения блоков
const showVertical = () => {
    vertical.value = !vertical.value;
};

const searchLevel = ref('');

</script>