<template>
  <v-card class="panel-card" >
    <!-- <v-tabs
        v-model="tab"
    >
      <v-tab value="one" class="panel-tab-btn">Отчет РО</v-tab>
      <v-tab value="two" class="panel-tab-btn">Корректировка ОШ</v-tab>
      <v-tab value="three" class="panel-tab-btn">Корректировка ЦШ</v-tab>
    </v-tabs> -->

    <v-expansion-panels  v-model="panel" class="mb-2" >
        <v-expansion-panel v-for="item in festivals" :key="item.id"><v-expansion-panel-title>{{ item.name
            }}</v-expansion-panel-title><v-expansion-panel-text>
            <SeventhPanelForm :panel_number="6" @collapse-form="collapsed()" :title="item.name"></SeventhPanelForm>
          </v-expansion-panel-text></v-expansion-panel>
      </v-expansion-panels>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import { SeventhPanelForm } from "./index";
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';

// const tab = ref('one')

const panel = ref(null);

const festivals = ref([
  { id: 1, name: 'Всероссийская Спартакиада студенческих отрядов Российской Федерации 2022' },
  { id: 2, name: 'Всероссийский Слет студенческих отрядов 2022' },
  { id: 3, name: '«Художественное слово: соло» — СПО «Оригами» — «В РСО.В любви. В благодарности.»' },
  { id: 4, name: 'Межрегиональный сводный студенческий сервисный отряд «Бархатные сезоны»' },
  { id: 5, name: 'Всероссийская Спартакиада студенческих отрядов Российской Федерации 2022' },
  { id: 6, name: 'Школа подготовки командных составов линейных студенческих отрядов ВСТП ОАО РЖД «БАМ»' },
  { id: 7, name: 'Всероссийская Спартакиада студенческих отрядов Российской Федерации 2022' },
  { id: 8, name: 'Всероссийская Спартакиада студенческих отрядов Российской Федерации 2022' },
])

const collapsed = () => {
    panel.value = !panel.value;
}
</script>
<style lang="scss" scoped>
.panel-card {
  box-shadow: none;
}
.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
  margin-top: 8px;
}
.valid-red {
  color: #db0000;
}
.v-tab-item--selected {
  background: #F3F4F5;
}
.v-tab.v-tab.v-btn {
  min-width: 280px;
  border-radius: 10px 10px 0 0;
  letter-spacing: initial;
  border: none;
}
.panel-card-text {
  padding: 0;
}
.panel-tab-btn {
  text-transform: initial;
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.1px;
  text-align: left;
  margin-right: 8px;
}
.hr {
  width: 100%;
  border-top: 1px solid #B6B6B6;
}
.v-table {
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid #B6B6B6;
}
.report-table {
  &__tr {
    background-color: #FFFFFF;
    text-align: center;
  }
  &__th {
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    text-align: center;

    &__br-left {
      border-radius: 10px 0 0 0;
      border-right: 1px solid #B6B6B6;
    }

    &__br-right {
      border-radius: 0 10px 0 0;
      border-left: 1px solid #B6B6B6;
    }
  }
  &__td {
    text-align: center;
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    color: #8E8E93;

    &__center {
      border-left: 1px solid #B6B6B6;
      border-right: 1px solid #B6B6B6;
    }
  }
}


.v-expansion-panel-title {
  background: #F3F4F5;
  margin: 0px;
  border-radius: 0px;
  font-family: Akrobat;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  border: none;

}
</style>