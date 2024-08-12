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
          <calculated-panel
            text="Показатель рассчитывается автоматически на основе данных, предоставленных Аппаратом РСО." />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          3. Прирост численности членов РО РСО относительно количества членов в соответствии с отчетом РО РСО за 2023 г.
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <calculated-panel
            text="Показатель рассчитывается автоматически на основе данных, предоставленных Аппаратом РСО." />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          4. Организация всероссийских (международных), окружных и межрегиональных мероприятий и проектов
          (слеты, школы, фестивали, турниры и прочие)
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <fourth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          5. Организация всероссийских (международных) (организатор — региональное отделение РСО),
          окружных и межрегиональных трудовых проектов в соответствии с Положением об организации
          трудовых проектов РСО
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <fifth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          6. Участие бойцов студенческих отрядов РО РСО во всероссийских (международных)
          мероприятиях и проектах (в том числе и трудовых) «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <sixth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          7. Победители студенческих отрядов РО РСО во всероссийских (международных) проектах и конкурсах «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <seventh-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          8. Количество упоминаний в СМИ о прошедших творческих, добровольческих и патриотических мероприятиях
          и трудовых проектах, организованных РО РСО «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <calculated-panel
            text="Показатель рассчитывается автоматически на основе данных сервиса «Медиалогия», предоставленных Аппаратом РСО." />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          9. Организация обязательных общесистемных мероприятий РСО на региональном уровне «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ninth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          10. Организация РО РСО всероссийских (международных) добровольческих и патриотических акций «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <tenth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          11. Активность РО РСО в социальных сетях «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <eleventh-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          12. Объем средств, собранных бойцами РО РСО во Всероссийском дне ударного труда
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <twelfth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          13. Охват членов РО РСО, принявших участие во Всероссийском дне ударного труда «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <thirteenth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          14. Отношение объема средств, собранных бойцами РО РСО во Всероссийском дне ударного труда к количеству членов
          РО РСО,
          принявших участие во Всероссийском дне ударного труда
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <calculated-panel text="Показатель рассчитывается автоматически на основе данных из 12 и 13 показателей." />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          15. Исполнительская дисциплина РО РСО, соблюдение условий охраны труда на трудовых проектах РСО,
          наличие проблемной неурегулированной задолженности по выплате заработной платы перед бойцами РСО за трудовой
          семестр предыдущего года,
          отсутствие отчислений от членских взносов в Центральный штаб,
          исполнение решений Центральных руководящих органов РСО, наличие ежегодного акта проверки КРК РО РСО
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <calculated-panel
            text="Показатель рассчитывается автоматически на основе данных, предоставленных Аппаратом РСО." />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          16. Победители всероссийских (международных), окружных и межрегиональных трудовых проектов по комиссарской
          деятельности «К»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <sixteenth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          17. Дислокация студенческих отрядов РО РСО
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <seventeenth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          18. Количество научных работ и публикаций по теме СО, выпущенных в текущем году
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <eighteenth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>
          19. Трудоустройство
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <nineteenth-panel />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <Button variant="text" label="Отправить отчет" size="large" />
</template>
<script setup>
import {
  CalculatedPanel,
  FirstPanel,
  FourthPanel,
  FifthPanel,
  SixthPanel,
  SeventhPanel,
  NinthPanel,
  TenthPanel,
  EleventhPanel,
  TwelfthPanel,
  ThirteenthPanel,
  SixteenthPanel,
  SeventeenthPanel,
  EighteenthPanel,
  NineteenthPanel
} from './components/index'
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
  border-left: 6px solid #1f7cc0;
  margin-bottom: 8px;
  border-radius: 10px;
  font-family: Akrobat;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
}

.v-expansion-panel--active > .v-expansion-panel-title {
  border-radius: 10px;
  min-height: none;
  border-left: none;
  border-right: 6px solid #1f7cc0;
}

.v-expansion-panel-text__wrapper {
  padding: 0 0 0 0;
}

.v-expansion-panel-title__overlay {
  border-radius: 10px;
}

.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
  opacity: unset;
}

.v-expansion-panel:not(:first-child)::after {
  border-top-style: none;
}
</style>