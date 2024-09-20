<template>
  <div>
    <div class="container">
      <h1 class="title title--mb">Отчет о деятельности регионального отделения РСО за 2024 год. Часть 2</h1>
      <div v-if="preloader" class="text-center">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </div>
      <div v-else>
        <div class="download-item">
          <SvgIcon iconName="download" />
          <button type="button" id="download" class="download-item__report"
            @click="downloadReportAll(roleStore.roles.regionalheadquarter_commander?.id)">
            Скачать архив
          </button>
        </div>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              1. Численность членов РО РСО в соответствии с объемом уплаченных членских взносов
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <first-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.first" />
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
              3. Прирост численности членов РО РСО относительно количества членов в соответствии с отчетом РО РСО
              за 2023 г.
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
              <fourth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.fourth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              5. Организация всероссийских (международных) (организатор — региональное отделение РСО),
              окружных и межрегиональных трудовых проектов в соответствии с Положением об организации
              трудовых проектов РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fifth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.fifth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              6. Участие бойцов студенческих отрядов РО РСО во всероссийских (международных)
              мероприятиях и проектах (в том числе и трудовых) «К»
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixth-panel @get-data="setData" :district-headquarter-commander="districtExpert" :data="reportData.six"
                :central-headquarter-commander="centralExpert" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              7. Победители студенческих отрядов РО РСО во всероссийских (международных) проектах и конкурсах «К»
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <seventh-panel @get-data="setData" :district-headquarter-commander="districtExpert"
                :data="reportData.seventh" :central-headquarter-commander="centralExpert" />
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
              <tenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.tenth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              11. Активность РО РСО в социальных сетях «К»
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eleventh-panel :districtExpert="districtExpert" :centralExpert="centralExpert" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              12. Объем средств, собранных бойцами РО РСО во Всероссийском дне ударного труда
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <twelfth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              13. Охват членов РО РСО, принявших участие во Всероссийском дне ударного труда «К»
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <thirteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              14. Отношение объема средств, собранных бойцами РО РСО во Всероссийском дне ударного труда к количеству
              членов
              РО РСО,
              принявших участие во Всероссийском дне ударного труда
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на основе данных из 12 и 13 показателей." />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              15. Исполнительская дисциплина РО РСО, соблюдение условий охраны труда на трудовых проектах РСО,
              наличие проблемной неурегулированной задолженности по выплате заработной платы перед бойцами РСО
              за трудовой
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
              <sixteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.sixteenth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              17. Дислокация студенческих отрядов РО РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <seventeenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              18. Количество научных работ и публикаций по теме СО, выпущенных в текущем году
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eighteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              19. Трудоустройство
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <nineteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <Button v-if="!preloader" variant="text" label="Отправить отчет" size="large" />
  </div>
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
import { ref, watchEffect } from "vue";
import { SvgIcon } from '@shared/ui/SvgIcon';
import { useRoleStore } from "@layouts/store/role.ts";
import { HTTP } from '@app/http';
import { reportPartTwoService } from "@services/ReportService.ts";
import { report } from 'process';

const districtExpert = ref(false);
const centralExpert = ref(false);
const reportData = ref({
  first: null,
  fourth: null,
  fifth: null,
  six: null,
  seventh: null,
  tenth: {
    first: null,
    second: null,
  },
  sixteenth: null,
});
const preloader = ref(true);

const roleStore = useRoleStore();

const downloadReportAll = (id) => {
  HTTP.get(`/regionals/${id}/download_regional_competition_report/`, {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'RO_report.xlsx');
    document.body.appendChild(link);
    link.click();
  })
    .catch(function (error) {
      console.log('an error occured ' + error);
    });
};

const getReportData = async () => {
  try {
    if (centralExpert.value || districtExpert.value) {
      reportData.value.first = (await reportPartTwoService.getReportDH('1', '1')).data;
      reportData.value.fourth = (await reportPartTwoService.getReportDH('4', '1')).data;
      reportData.value.fifth = (await reportPartTwoService.getReportDH('5', '1')).data;
      reportData.value.tenth.first = (await reportPartTwoService.getMultipleReportDH('10', '1', '1')).data;
      reportData.value.tenth.second = (await reportPartTwoService.getMultipleReportDH('10', '2', '1')).data;
      reportData.value.sixteenth = (await reportPartTwoService.getReportDH('16', '1')).data;
    } else {
      reportData.value.first = (await reportPartTwoService.getReport('1')).data;
      reportData.value.fourth = (await reportPartTwoService.getReport('4')).data;
      reportData.value.fifth = (await reportPartTwoService.getReport('5')).data;
      reportData.value.six = (await reportPartTwoService.getReport('6')).data;
      reportData.value.seventh = (await reportPartTwoService.getReport('7')).data;
      reportData.value.tenth.first = (await reportPartTwoService.getMultipleReport('10', '1')).data;
      reportData.value.tenth.second = (await reportPartTwoService.getMultipleReport('10', '2')).data;
      reportData.value.sixteenth = (await reportPartTwoService.getReport('16')).data;
    }
  } catch (e) {
    console.log('getReportData error: ', e)
  } finally {
    preloader.value = false;
  }
  console.log('getReportData: ', reportData.value);
};

const setData = (data, panel, number = 0) => {
  switch (panel) {
    case 1:
      reportData.value.first = data
      break;
    case 4:
      reportData.value.fourth = data
      break;
    case 5:
      reportData.value.fifth = data
      break;
    case 6:
      reportData.value.six = data
      break;
    case 7:
      reportData.value.seventh = data
      break;
    case 10:
      if (number === 1) {
        reportData.value.tenth.first = data;
      } else {
        reportData.value.tenth.second = data;
      }
      break;
    case 16:
      reportData.value.sixteenth = data
      break;
  }
  console.log('setData: ', reportData.value)
};

watchEffect(() => {
  console.log(roleStore.experts);
  if (roleStore.experts?.is_district_expert) {
    districtExpert.value = true;
  }
  if (roleStore.experts?.is_central_expert) {
    centralExpert.value = true;
  }
  getReportData();
});
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

.download-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 13px;
  cursor: pointer;
  column-gap: 4px;
  font-size: 18px;
  color: #1f7cc0;
  font-family: 'Akrobat';
  line-height: 21.6px;
  font-weight: 500;
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

.v-expansion-panel-text__wrapper {
  padding: 0 0 0 0;
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