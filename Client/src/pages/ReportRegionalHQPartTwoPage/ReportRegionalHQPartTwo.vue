<template>
  <div class="container">
    <h1 class="title title--mb">Отчет о деятельности регионального отделения РСО за 2024 год. Часть 2</h1>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          1. Численность членов РО РСО в соответствии с объемом уплаченных членских взносов
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <first-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          2. Отношение численности членов РО РСО к численности студентов
          очной формы обучения субъекта Российской Федерации, обучающихся в профессиональных образовательных
          организациях и образовательных организациях высшего образования в государственных,
          муниципальных и частных образовательных организациях, включая филиалы
          (исключения — учебные заведения специальных ведомств, проводящих обучение на казарменном положении)
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <second-panel/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <Button
      variant="text"
      label="Отправить отчет"
      size="large"
  />
</template>
<script setup>
import FirstPanel from "@pages/ReportRegionalHQPartTwoPage/components/FirstPanel.vue";
import SecondPanel from "@pages/ReportRegionalHQPartTwoPage/components/SecondPanel.vue";
import { Button } from '@shared/components/buttons';

</script>
<style>
.v-expansion-panel__shadow {
  box-shadow: none;
}
.mdi-chevron-down::before {
  content: "";
}
.mdi-chevron-up::before {
  content: "";
}
.v-expansion-panel-title {
  background: #F3F4F5;
  margin-bottom: 8px;
  border-radius: 6px;
  font-family: Akrobat;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;

}
.v-expansion-panel-text__wrapper {
  padding: 8px 0 0 0;
}
.v-expansion-panel-title__overlay {
  border-radius: 6px;
}
</style>