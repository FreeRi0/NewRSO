<template>
  <div>
    <div class="container">
      <h1 class="title title--mb">Отчет о&nbsp;деятельности регионального отделения РСО за&nbsp;2024&nbsp;год.
        Часть&nbsp;2</h1>
      <div v-if="preloader" class="text-center">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </div>
      <div v-else>
        <div class="download-item">
          <SvgIcon iconName="download"/>
          <button type="button" id="download" class="download-item__report"
                  @click="downloadReportAll(roleStore.roles.regionalheadquarter_commander?.id)">
            Скачать архив
          </button>
        </div>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              1. Численность членов РО&nbsp;РСО в&nbsp;соответствии с&nbsp;объемом уплаченных членских взносов
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <first-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                           :data="reportData.first"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              2. Отношение численности членов РО&nbsp;РСО к&nbsp;численности студентов
              очной формы обучения субъекта Российской Федерации, обучающихся в&nbsp;профессиональных образовательных
              организациях и&nbsp;образовательных организациях высшего образования в&nbsp;государственных,
              муниципальных и&nbsp;частных образовательных организациях, включая филиалы
              (исключения&nbsp;&mdash; учебные заведения специальных ведомств, проводящих обучение на&nbsp;казарменном
              положении)
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                  text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              3. Прирост численности членов РО&nbsp;РСО относительно количества членов в&nbsp;соответствии
              с&nbsp;отчетом РО&nbsp;РСО за&nbsp;2023&nbsp;г.
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                  text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              4. Организация всероссийских (международных), окружных и&nbsp;межрегиональных мероприятий и&nbsp;проектов
              (слеты, школы, фестивали, турниры и&nbsp;прочие)
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fourth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                            :data="reportData.fourth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              5. Организация всероссийских (международных) (организатор&nbsp;&mdash; региональное отделение РСО),
              окружных и&nbsp;межрегиональных трудовых проектов в&nbsp;соответствии с&nbsp;Положением
              об&nbsp;организации
              трудовых проектов РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fifth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                           :data="reportData.fifth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              6. Участие бойцов студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских (международных)
              мероприятиях и&nbsp;проектах (в&nbsp;том числе и&nbsp;трудовых) &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixth-panel @get-data="setData" :items="six_items" @getId="setId" @getPanelNumber="setPanelNumber"
                           :district-headquarter-commander="districtExpert" :data="reportData.six"
                           :central-headquarter-commander="centralExpert"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              7. Победители студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских (международных) проектах
              и&nbsp;конкурсах &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <seventh-panel @get-data="setData" @getId="setId" @getPanelNumber="setPanelNumber" :items="seventh_items"
                             :district-headquarter-commander="districtExpert" :data="reportData.seventh"
                             :central-headquarter-commander="centralExpert"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              8. Количество упоминаний в&nbsp;СМИ о&nbsp;прошедших творческих, добровольческих и&nbsp;патриотических
              мероприятиях
              и&nbsp;трудовых проектах, организованных РО&nbsp;РСО &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                  text="Показатель рассчитывается автоматически на&nbsp;основе данных сервиса &laquo;Медиалогия&raquo;, предоставленных Аппаратом РСО."/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              9. Организация обязательных общесистемных мероприятий РСО на&nbsp;региональном уровне &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ninth-panel @get-data="setData" @getId="setId" @getPanelNumber="setPanelNumber" :items="ninth_items"
                           :district-headquarter-commander="districtExpert" :data="reportData.ninth"
                           :central-headquarter-commander="centralExpert"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              10. Организация РО&nbsp;РСО всероссийских (международных) добровольческих и&nbsp;патриотических акций
              &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <tenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                           :data="reportData.tenth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              11. Активность РО&nbsp;РСО в&nbsp;социальных сетях &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eleventh-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                              :data="reportData.eleventh"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              12. Объем средств, собранных бойцами РО&nbsp;РСО во&nbsp;Всероссийском дне ударного труда
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <twelfth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                             :data="reportData.twelfth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              13. Охват членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <thirteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                                :data="reportData.thirteenth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              14. Отношение объема средств, собранных бойцами РО&nbsp;РСО во&nbsp;Всероссийском дне ударного труда
              к&nbsp;количеству членов
              РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                  text="Показатель рассчитывается автоматически на&nbsp;основе данных из&nbsp;12&nbsp;и&nbsp;13&nbsp;показателей."/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              15. Исполнительская дисциплина РО&nbsp;РСО, соблюдение условий охраны труда на&nbsp;трудовых проектах РСО,
              наличие проблемной неурегулированной задолженности по&nbsp;выплате заработной платы перед бойцами РСО
              за&nbsp;трудовой семестр предыдущего года, отсутствие отчислений от&nbsp;членских взносов
              в&nbsp;Центральный штаб, исполнение решений Центральных руководящих органов РСО, наличие ежегодного акта
              проверки КРК РО&nbsp;РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                  text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              16. Победители всероссийских (международных), окружных и&nbsp;межрегиональных трудовых проектов
              по&nbsp;комиссарской деятельности &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                               :data="reportData.sixteenth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              17. Дислокация студенческих отрядов РО&nbsp;РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <seventeenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                                 :data="reportData.seventeenth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              18. Количество научных работ и&nbsp;публикаций по&nbsp;теме&nbsp;СО, выпущенных в&nbsp;текущем году
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eighteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                                :data="reportData.eighteenth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              19. Трудоустройство
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <nineteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                                :data="reportData.nineteenth"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <Button v-if="!preloader" variant="text" label="Отправить отчет" size="large" @click="sendReport"
            :disabled="blockSendButton"/>
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
import {inject, onMounted, ref, watchEffect} from "vue";
import { SvgIcon } from '@shared/ui/SvgIcon';
import { useRoleStore } from "@layouts/store/role.ts";
import { HTTP } from '@app/http';
import { reportPartTwoService } from "@services/ReportService.ts";
import { useRoute, useRouter } from "vue-router";

const districtExpert = ref(false);
const centralExpert = ref(false);
const reportData = ref({
  first: null,
  fourth: null,
  fifth: null,
  six: {},
  seventh: {},
  ninth: {},
  tenth: {
    first: null,
    second: null,
  },
  eleventh: null,
  twelfth: null,
  thirteenth: null,
  sixteenth: null,
  seventeenth: null,
  eighteenth: null,
  nineteenth: null,
});
const preloader = ref(true);
const panel_id = ref(1);
const panel_num = ref(null);
const six_items = ref([])
const seventh_items = ref([]);
const ninth_items = ref([]);
const blockSendButton = ref(false);

const swal = inject('$swal');
const router = useRouter();

const setId = (id) => {
  panel_id.value = id;
  console.log('panel_id', panel_id.value, id);
}

const setPanelNumber = (number) => {
  panel_num.value = number;
  console.log('panel_num', panel_num.value, number);
}
const roleStore = useRoleStore();
const route = useRoute();

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

const getItems = async (number) => {
  try {
    const response = await HTTP.get(`regional_competitions/reports/event_names/r${number}-event-names/`);
    switch (number) {
      case 6:
        six_items.value = response.data;
        break;
      case 7:
        seventh_items.value = response.data;
        break;
      case 9:
        ninth_items.value = response.data;
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
}

// const errorHandler = async (error, id) => {
//   if (error.response && error.response.status === 404) {
//     console.log('An error occurred: ', error);

//     const url = 'http://213.139.208.147:30000/api/v1/regional_competitions/me/reports';

//     if (error.response.request.responseURL.includes(url + '/6/')) {
//       reportData.value.six = {};
//       console.log('Data not found for panel 6', reportData.value.six);
//     } else if (error.response.request.responseURL.includes(url + '/7/')) {
//       console.log('Data not found for panel 7');
//       reportData.value.seventh = {};
//     } else if (error.response.request.responseURL.includes(url + '/9/')) {
//       console.log('Data not found for panel 9');
//       reportData.value.ninth = {};
//     } else {
//       console.log('Data found for panel 6');
//       reportData.value.six = (await reportPartTwoService.getMultipleReport('6', id)).data;
//       console.log('Data found for panel 7');
//       reportData.value.seventh = (await reportPartTwoService.getMultipleReport('7', id)).data;
//       console.log('Data found for panel 9');
//       reportData.value.ninth = (await reportPartTwoService.getMultipleReport('9', id)).data;
//     }
//   } else {
//     console.log('An unexpected error occurred: ', error);
//   }
// };

const getMultiplyData = async () => {
  const sixDataPromises = six_items.value.map(async (item) => {
    try {
      return { id: item.id, data: (await reportPartTwoService.getMultipleReport('6', item.id)).data };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { id: item.id, data: {} };
      } else {
        throw error;
      }
    }
  });

  const seventhDataPromises = seventh_items.value.map(async (item) => {
    try {
      return { id: item.id, data: (await reportPartTwoService.getMultipleReport('7', item.id)).data };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { id: item.id, data: {} };
      } else {
        throw error;
      }
    }
  });

  const ninthDataPromises = ninth_items.value.map(async (item) => {
    try {
      return { id: item.id, data: (await reportPartTwoService.getMultipleReport('9', item.id)).data };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { id: item.id, data: {} };
      } else {
        throw error;
      }
    }
  });

  const [sixDataResults, seventhDataResults, ninthDataResults] = await Promise.all([
    Promise.all(sixDataPromises),
    Promise.all(seventhDataPromises),
    Promise.all(ninthDataPromises),
  ]);

  sixDataResults.forEach((result) => {
    reportData.value.six[result.id] = result.data;
  });

  seventhDataResults.forEach((result) => {
    reportData.value.seventh[result.id] = result.data;
  });

  ninthDataResults.forEach((result) => {
    reportData.value.ninth[result.id] = result.data;
  });
}
const getReportData = async (reportId) => {
  try {
    if (centralExpert.value || districtExpert.value) {
      reportData.value.first = (await reportPartTwoService.getReportDH('1', reportId)).data;
      reportData.value.fourth = (await reportPartTwoService.getReportDH('4', reportId)).data;
      reportData.value.fifth = (await reportPartTwoService.getReportDH('5', reportId)).data;
      // reportData.value.six = (await reportPartTwoService.getMultipleReportDH('6', id)).data;
      // reportData.value.seventh = (await reportPartTwoService.getMultipleReportDH('7', id)).data;
      // reportData.value.ninth = (await reportPartTwoService.getMultipleReportDH('9', id)).data;
      reportData.value.tenth.first = (await reportPartTwoService.getMultipleReportDH('10', '1', reportId)).data;
      reportData.value.tenth.second = (await reportPartTwoService.getMultipleReportDH('10', '2', reportId)).data;
      reportData.value.eleventh = (await reportPartTwoService.getReportDH('11', reportId)).data;
      reportData.value.twelfth = (await reportPartTwoService.getReportDH('12', reportId)).data;
      reportData.value.thirteenth = (await reportPartTwoService.getReportDH('13', reportId)).data;
      reportData.value.sixteenth = (await reportPartTwoService.getReportDH('16', reportId)).data;
      reportData.value.seventeenth = (await reportPartTwoService.getReportDH('17', reportId)).data;
      reportData.value.eighteenth = (await reportPartTwoService.getReportDH('18', reportId)).data;
      reportData.value.nineteenth = (await reportPartTwoService.getReportDH('19', reportId)).data;
    } else {
      try {
        reportData.value.first = (await reportPartTwoService.getReport('1')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.fourth = (await reportPartTwoService.getReport('4')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.fifth = (await reportPartTwoService.getReport('5')).data;
      } catch (e) {
        console.log(e.message)
      }
      await getMultiplyData();

      // reportData.value.six = (await reportPartTwoService.getMultipleReport('6', id)).data;
      // reportData.value.seventh = (await reportPartTwoService.getMultipleReport('7', id)).data;
      // reportData.value.ninth = (await reportPartTwoService.getMultipleReport('9', id)).data;
      try {
        reportData.value.tenth.first = (await reportPartTwoService.getMultipleReport('10', '1')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.tenth.second = (await reportPartTwoService.getMultipleReport('10', '2')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.eleventh = (await reportPartTwoService.getReport('11')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.twelfth = (await reportPartTwoService.getReport('12')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.thirteenth = (await reportPartTwoService.getReport('13')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.sixteenth = (await reportPartTwoService.getReport('16')).data;
        // TODO: продумать логику блокировки кнопки, когда все отчеты отправлены
        if (reportData.value.sixteenth.is_sent) {
          blockSendButton.value = true;
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.seventeenth = (await reportPartTwoService.getReport('17')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.eighteenth = (await reportPartTwoService.getReport('18')).data;
      } catch (e) {
        console.log(e.message)
      }
      try {
        reportData.value.nineteenth = (await reportPartTwoService.getReport('19')).data;
      } catch (e) {
        console.log(e.message)
      }
    }
  } catch (e) {
    // errorHandler(e, id);
    console.log('getReportData error: ', e)
  } finally {
    preloader.value = false;
  }
  // console.log('getReportData: ', reportData.value);
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
      reportData.value.six[number] = data
      break;
    case 7:
      reportData.value.seventh[number] = data
      break;
    case 9:
      reportData.value.ninth[number] = data
      break;
    case 10:
      if (number === 1) {
        reportData.value.tenth.first = data;
      } else {
        reportData.value.tenth.second = data;
      }
      break;
    case 11:
      reportData.value.eleventh = data
      break;
    case 12:
      reportData.value.twelfth = data
      break;
    case 13:
      reportData.value.thirteenth = data
      break;
    case 16:
      reportData.value.sixteenth = data
      break;
    case 17:
      reportData.value.seventeenth = data
      break;
    case 18:
      reportData.value.eighteenth = data
      break;
    case 19:
      reportData.value.nineteenth = data
      break;
  }
  // console.log('setData: ', reportData.value)
};

const sendReport = async () => {
  // console.log('reportData: ', reportData.value)
  blockSendButton.value = true;
  try {
    await reportPartTwoService.sendReport(reportData.value.first, '1');
    await reportPartTwoService.sendReport(reportData.value.fourth, '4');
    await reportPartTwoService.sendReport(reportData.value.fifth, '5');
    await reportPartTwoService.sendReportWithSlash(reportData.value.six, '6');
    await reportPartTwoService.sendReportWithSlash(reportData.value.seventh, '7');
    await reportPartTwoService.sendReportWithSlash(reportData.value.nineteenth, '9');
    await reportPartTwoService.sendReport(reportData.value.eleventh, '11');
    await reportPartTwoService.sendReport(reportData.value.twelfth, '12');
    await reportPartTwoService.sendReport(reportData.value.thirteenth, '13');
    await reportPartTwoService.sendReport(reportData.value.sixteenth, '16');
    await reportPartTwoService.sendMultipleReport(reportData.value.tenth.first, '10', '1');
    await reportPartTwoService.sendMultipleReport(reportData.value.tenth.second, '10', '2');

    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'успешно',
      showConfirmButton: false,
      timer: 1500,
    });
    await router.push({
      name: 'reportingRo',
    });
  } catch (e) {
    blockSendButton.value = false;
    swal.fire({
      position: 'center',
      icon: 'error',
      title: `ошибка`,
      showConfirmButton: false,
      timer: 2500,
    })
    console.log('sendReport error: ', e)
  }
}

onMounted(() => {
  if (roleStore.experts?.is_district_expert) {
    districtExpert.value = true;
  }
  if (roleStore.experts?.is_central_expert) {
    centralExpert.value = true;
  }
  getItems(6);
  getItems(7);
  getItems(9);
  getReportData(route.query.reportId);
});

// onMounted(() => {
//   getItems(6);
//   getItems(7);
//   getItems(9);
// })

// watch(() => panel_num.value, (newPanel) => {
//   panel_num.value = newPanel
//   //  console.log(panel_num.value, newPanel)
//   getReportData();
// })
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