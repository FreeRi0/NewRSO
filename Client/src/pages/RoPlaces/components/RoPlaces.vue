<template>
  <div class="container">
    <div class="RoPlaces">
      <h2 class="RoPlaces_title">Места РО по показателям</h2>
      <div class="RoPlaces_wrapper">
        <router-link :to="{ name: 'Place', params: {id: item.id} }" class="RoPlaces_item" v-for="item in RoPlaces" :key="item.id" >
          <p>{{ item.id }}.</p>
          <p>{{ item.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const RoPlaces = ref([{
  id: 1, title: 'Численность членов РО РСО в соответствии с объемом уплаченных членских взносов'
}, {
  id: 2, title: 'Отношение численности членов РО РСО к численности студентов очной формы обучения субъекта Российской Федерации, обучающихся в профессиональных образовательных организациях и образовательных организациях высшего образования в государственных, муниципальных и частных образовательных организациях, включая филиалы (исключения — учебные заведения специальных ведомств, проводящих обучение на казарменном положении)',
}, {
  id: 3, title: 'Прирост численности членов РО РСО относительно количества членов в соответствии с отчетом РО РСО за 2023 г.',
}, {
  id: 4, title: 'Организация всероссийских (международных), окружных и межрегиональных мероприятий и проектов (слеты, школы, фестивали, турниры и прочие)',
}, {
  id: 5, title: 'Организация всероссийских (международных) (организатор — региональное отделение РСО), окружных и межрегиональных трудовых проектов в соответствии с Положением об организации трудовых проектов РСО',
}, {
  id: 6, title: 'Участие бойцов студенческих отрядов РО РСО во всероссийских (международных) мероприятиях и проектах (в том числе и трудовых) «К»',
}, {
  id: 7, title: 'Победители студенческих отрядов РО РСО во всероссийских (международных) проектах и конкурсах «К»',
}, {
  id: 8, title: 'Количество упоминаний в СМИ о прошедших творческих, добровольческих и патриотических мероприятиях и трудовых проектах, организованных РО РСО «К»',
}, {
  id: 9, title: 'Организация обязательных общесистемных мероприятий РСО на региональном уровне «К»',
}, {
  id: 10, title: 'Организация РО РСО всероссийских (международных) добровольческих и патриотических акций «К»',
}, {
  id: 11, title: 'Активность РО РСО в социальных сетях «К»',
}, {
  id: 12, title: 'Объем средств, собранных бойцами РО РСО во Всероссийском дне ударного труда',
}, {
  id: 13, title: 'Охват членов РО РСО, принявших участие во Всероссийском дне ударного труда «К»',
}, {
  id: 14, title: 'Отношение объема средств, собранных бойцами РО РСО во Всероссийском дне ударного труда к количеству членов РО РСО, принявших участие во Всероссийском дне ударного труда',
}, {
  id: 15, title: 'Исполнительская дисциплина РО РСО, соблюдение условий охраны труда на трудовых проектах РСО, наличие проблемной неурегулированной задолженности по выплате заработной платы перед бойцами РСО за трудовой семестр предыдущего года, отсутствие отчислений от членских взносов в Центральный штаб, исполнение решений Центральных руководящих органов РСО, наличие ежегодного акта проверки КРК РО РСО',
}, {
  id: 16, title: 'Победители всероссийских (международных), окружных и межрегиональных трудовых проектов по комиссарской деятельности «К»',
}])
</script>
<style lang="scss">
.RoPlaces {
  padding-bottom: 80px;

  &_title {
    font-size: 52px;
    font-weight: 700;
    color: #35383F;
    font-family: 'Akrobat';
  }

  &_wrapper {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  &_item {
    cursor: pointer;
    max-width: 100%;
    padding: 16px;
    width: 100%;
    border: 0px 0px 0px 6px;
    border-radius: 10px;
    background-color: #F3F4F5;
    border-left: 6px solid #1F7CC0;
    height: auto;
    display: flex;
    align-items: flex-start;
    column-gap: 8px;

    p {
      line-height: 24px;
      font-size: 20px;
      color: #000000;
      font-weight: 600;
      font-family: 'Akrobat';
    }
  }
}
.v-expansion-panel-title__icon{
  display: none;
}
.title {
  background: #F3F4F5;
  margin: 0px;
  border-radius: 0px;
  font-family: Akrobat;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  border-left: 6px solid #F3F4F5;
  padding-left: 30px;
}
.title_wrap {
  display: grid;
  grid-template-columns: 600px 300px;
  column-gap: 40px;
  width: 100%;
  max-width: 900px;
  padding-top: 10px;
  padding-bottom:10px;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    row-gap: 6px;
    max-width: 828px;
    width: auto;
  }

  @media screen and (max-width: 768px) {
    max-width: 636px;
  }

  @media screen and (max-width: 578px) {
    max-width: 360px;
  }

}

.form__field-group {
  padding: 0px;
  display: flex;
  flex-direction: column;
  background: #F3F4F5;
  border: none;
  border-radius: 10px;
  margin-bottom: 8px;
  gap: 20px;
}
.v-expansion-panel-text__wrapper{
  padding: 8px 10px 16px;
}
.v-expansion-panel__shadow{
  height: auto;
}

.v-expansion-panel-title {
  background: #F3F4F5;
  border-left: 6px solid #1f7cc0;
  margin-bottom: 8px;
  border-radius: 10px;
  font-family: Akrobat;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
}

.v-expansion-panel--active>.v-expansion-panel-title {
  border-radius: 10px;
  min-height: none;
  border-left: none;
  border-right: 6px solid #1f7cc0;
}

.v-expansion-panel-title.visible-error,
.v-expansion-panel--active>.v-expansion-panel-title.visible-error {
  border-color: #db0000;
}

.v-expansion-panel-title__overlay {
  border-radius: 10px;
}

.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active+.v-expansion-panel {
  margin-top: 0;
  opacity: unset;
}

.v-expansion-panel:not(:first-child)::after {
  border-top-style: none;
}
</style>