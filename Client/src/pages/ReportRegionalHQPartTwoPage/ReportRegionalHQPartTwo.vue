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
          <SvgIcon iconName="download" />
          <button type="button" id="download" class="download-item__report"
            @click="downloadReportAll(roleStore.roles.regionalheadquarter_commander?.id)">
            Скачать архив
          </button>
        </div>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.first ? 'visible-error' : ''">
              1. Численность членов РО&nbsp;РСО в&nbsp;соответствии с&nbsp;объемом уплаченных членских взносов
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <first-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.first" :is-error-panel="isErrorPanel.first"
                :blockEditFirstReport="blockEditFirstReport" />
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
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО." />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              3. Прирост численности членов РО&nbsp;РСО относительно количества членов в&nbsp;соответствии
              с&nbsp;отчетом РО&nbsp;РСО за&nbsp;2023&nbsp;г.
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО." />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.fourth ? 'visible-error' : ''">
              4. Организация всероссийских (международных), окружных и&nbsp;межрегиональных мероприятий и&nbsp;проектов
              (слеты, школы, фестивали, турниры и&nbsp;прочие)
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fourth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.fourth" :is-error-panel="isErrorPanel.fourth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.fifth ? 'visible-error' : ''">
              5. Организация всероссийских (международных) (организатор&nbsp;&mdash; региональное отделение РСО),
              окружных и&nbsp;межрегиональных трудовых проектов в&nbsp;соответствии с&nbsp;Положением
              об&nbsp;организации
              трудовых проектов РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fifth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.fifth" :is-error-panel="isErrorPanel.fifth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title
              :class="Object.values(isErrorPanel.six).some(item => item.error === true) ? 'visible-error' : ''">
              6. Участие бойцов студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских (международных)
              мероприятиях и&nbsp;проектах (в&nbsp;том числе и&nbsp;трудовых) &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixth-panel @get-data="setData" :items="six_items" @getId="setId" @getPanelNumber="setPanelNumber"
                :district-headquarter-commander="districtExpert" :data="reportData.six"
                :central-headquarter-commander="centralExpert" :is-error-panel="isErrorPanel.six" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              7. Победители студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских (международных) проектах
              и&nbsp;конкурсах &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО." />
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
                text="Показатель рассчитывается автоматически на&nbsp;основе данных сервиса &laquo;Медиалогия&raquo;, предоставленных Аппаратом РСО." />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title
              :class="Object.values(isErrorPanel.ninth).some(item => item.error === true) ? 'visible-error' : ''">
              9. Организация обязательных общесистемных мероприятий РСО на&nbsp;региональном уровне &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ninth-panel @get-data="setData" @getId="setId" @getPanelNumber="setPanelNumber" :items="ninth_items"
                :district-headquarter-commander="districtExpert" :data="reportData.ninth"
                :central-headquarter-commander="centralExpert" :is-error-panel="isErrorPanel.ninth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.tenth ? 'visible-error' : ''">
              10. Организация РО&nbsp;РСО всероссийских (международных) добровольческих и&nbsp;патриотических акций
              &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <tenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.tenth" :is-error-panel="isErrorPanel.tenth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.eleventh ? 'visible-error' : ''">
              11. Активность РО&nbsp;РСО в&nbsp;социальных сетях &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eleventh-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.eleventh" :is-error-panel="isErrorPanel.eleventh" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.twelfth ? 'visible-error' : ''">
              12. Объем средств, собранных бойцами РО&nbsp;РСО во&nbsp;Всероссийском дне ударного труда
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <twelfth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.twelfth" :is-error-panel="isErrorPanel.twelfth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.thirteenth ? 'visible-error' : ''">
              13. Охват членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <thirteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.thirteenth" :is-error-panel="isErrorPanel.thirteenth" />
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
                text="Показатель рассчитывается автоматически на&nbsp;основе данных из&nbsp;12&nbsp;и&nbsp;13&nbsp;показателей." />
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
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО." />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title :class="isErrorPanel.sixteenth ? 'visible-error' : ''">
              16. Победители всероссийских (международных), окружных и&nbsp;межрегиональных трудовых проектов
              по&nbsp;комиссарской деятельности &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.sixteenth" :is-error-panel="isErrorPanel.sixteenth" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              17. Дислокация студенческих отрядов РО&nbsp;РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <seventeenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.seventeenth" :is-sent="blockSendButton" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              18. Количество научных работ и&nbsp;публикаций по&nbsp;теме&nbsp;СО, выпущенных в&nbsp;текущем году
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eighteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.eighteenth" :is-sent="blockSendButton" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              19. Трудоустройство
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <nineteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.nineteenth" :is-sent="blockSendButton" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <Button v-if="!preloader" variant="text" :disabled="blockSendButton" label="Отправить отчет" size="large"
      @click="sendReport" />
  </div>
</template>
<script setup>
import {
  CalculatedPanel,
  FirstPanel,
  FourthPanel,
  FifthPanel,
  SixthPanel,
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
import { inject, onMounted, ref } from "vue";
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
  // seventh: {},
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
// const seventh_items = ref([]);
const ninth_items = ref([]);
const blockSendButton = ref(false);
const blockEditFirstReport = ref(false);

const swal = inject('$swal');
const router = useRouter();

const isErrorPanel = ref({
  first: false,
  fourth: false,
  fifth: false,
  six: {},
  // seventh: {},
  ninth: {},
  tenth: false,
  eleventh: false,
  twelfth: false,
  thirteenth: false,
  sixteenth: false,
});

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
      // case 7:
      //   seventh_items.value = response.data;
      //   break;
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

const getMultiplyData = async (isExpert, reportId) => {
  const sixDataPromises = six_items.value.map(async (item) => {
    try {
      if (!isExpert) {
        return { id: item.id, data: (await reportPartTwoService.getMultipleReport('6', item.id)).data };
      } else {
        return { id: item.id, data: (await reportPartTwoService.getMultipleReportDH('6', item.id, reportId)).data };
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { id: item.id, data: {} };
      } else {
        throw error;
      }
    }
  });

  // const seventhDataPromises = seventh_items.value.map(async (item) => {
  //   try {
  //     if (!isExpert) {
  //       return { id: item.id, data: (await reportPartTwoService.getMultipleReport('7', item.id)).data };
  //     } else {
  //       return { id: item.id, data: (await reportPartTwoService.getMultipleReportDH('7', item.id, reportId)).data };
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       return { id: item.id, data: {} };
  //     } else {
  //       throw error;
  //     }
  //   }
  // });

  const ninthDataPromises = ninth_items.value.map(async (item) => {
    try {
      if (!isExpert) {
        return { id: item.id, data: (await reportPartTwoService.getMultipleReport('9', item.id)).data };
      } else {
        return { id: item.id, data: (await reportPartTwoService.getMultipleReportDH('9', item.id, reportId)).data };
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { id: item.id, data: {} };
      } else {
        throw error;
      }
    }
  });

  const [sixDataResults, ninthDataResults] = await Promise.all([
    Promise.all(sixDataPromises),
    // Promise.all(seventhDataPromises),
    Promise.all(ninthDataPromises),
  ]);

  sixDataResults.forEach((result) => {
    reportData.value.six[result.id] = result.data;
    if (reportData.value.six[result.id].is_sent === false) {
      blockSendButton.value = false;
    }
  });
  console.log('data66', reportData.value.six)
  // seventhDataResults.forEach((result) => {
  //   reportData.value.seventh[result.id] = result.data;
  // });

  ninthDataResults.forEach((result) => {
    reportData.value.ninth[result.id] = result.data;
    if (reportData.value.ninth[result.id].is_sent === false) {
      blockSendButton.value = false;
    }
  });
}
const getReportData = async (reportId) => {
  try {
    if (centralExpert.value || districtExpert.value) {
      reportData.value.first = (await reportPartTwoService.getReportDH('1', reportId)).data;
      reportData.value.fourth = (await reportPartTwoService.getReportDH('4', reportId)).data;
      reportData.value.fifth = (await reportPartTwoService.getReportDH('5', reportId)).data;
      await getMultiplyData(true, reportId);
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
      await getMultiplyData(false);
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
          blockEditFirstReport.value = true;
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
    // case 7:
    //   reportData.value.seventh[number] = data
    //   break;
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

const filterPanelsData = () => {
  const filteredSix = {};
  // const filteredSeventh = {};
  const filteredNinth = {};

  for (let i in reportData.value.six) {
    if ((reportData.value.six[i].number_of_members > 0 && reportData.value.six[i].number_of_members !== null) && Object.keys(reportData.value.six[i]).length !== 0) {
      filteredSix[i] = reportData.value.six[i];

    }

  }
  // console.log('setData6: ', filteredSix)
  for (let i in filteredSix) {
    isErrorPanel.value.six[i] = {
      id: i,
      error: false,
    }
  }

  // for (let i in reportData.value.seventh) {
  //   if (reportData.value.seventh[i].prize_place !== 'Нет' && Object.keys(reportData.value.seventh[i]).length !== 0) {
  //     filteredSeventh[i] = reportData.value.seventh[i];
  //   }
  // }
  // for (let i in filteredSeventh) {
  //   isErrorPanel.value.seventh[i] = {
  //     id: i,
  //     error: false,
  //   }
  // }

  for (let i in reportData.value.ninth) {
    if (reportData.value.ninth[i].event_happened !== false && Object.keys(reportData.value.ninth[i]).length !== 0) {
      filteredNinth[i] = reportData.value.ninth[i];
    }
  }
  // console.log('setData9: ', filteredNinth)
  for (let i in filteredNinth) {
    isErrorPanel.value.ninth[i] = {
      id: i,
      error: false,
    }
  }

  return {
    filteredSix,
    filteredNinth,
  };
};

const sendReport = async () => {
  // console.log('reportData: ', reportData.value)
  blockSendButton.value = true;
  if (checkEmptyFields(reportData.value)) {
    preloader.value = true;
    try {
      // const { filteredSix, filteredNinth } = filterPanelsData();
      if (!reportData.value.first.is_sent) {
        await reportPartTwoService.sendReport(reportData.value.first, '1');
      }
      if (!reportData.value.fourth.is_sent) {
        if (reportData.value.fourth) {
          reportData.value.fourth.events = reportData.value.fourth.events.filter(event => event.participants_number)
          await reportPartTwoService.sendReport(reportData.value.fourth, '4');
        }
      }
      if (!reportData.value.fifth.is_sent) {
        await reportPartTwoService.sendReport(reportData.value.fifth, '5');
      }
      for (let item in reportData.value.six) {
        if (!Object.keys(reportData.value.six[item]).length) {
          await reportPartTwoService.createMultipleReport({
            number_of_members: 0,
            links: [],
            comment: '',
          }, '6', item)
          reportData.value.six[item].event_happened = false;
        }
        if (reportData.value.six[item].number_of_members == 0 || reportData.value.six[item].number_of_members === null) {
          reportData.value.six[item].event_happened = false;
        }
      }
      await reportPartTwoService.sendReportWithSlash(reportData.value.six, '6');
      // for (let item in filteredSeventh) {
      //   if (filteredSeventh[item].is_sent === false) {
      //     await reportPartTwoService.sendReportWithSlash(filteredSeventh, '7');
      //   }
      // }
      for (let item in reportData.value.ninth) {
        if (!Object.keys(reportData.value.ninth[item]).length) {
          await reportPartTwoService.createMultipleReport({
            event_happened: false,
            links: [],
            document: '',
            file_size: null,
            file_type: '',
            comment: '',
          }, '9', item)
          reportData.value.ninth[item].event_happened = false;
        }
        if (reportData.value.ninth[item].event_happened == false || reportData.value.ninth[item].event_happened === null) {
          reportData.value.ninth[item].event_happened = false;
        }

      }
      await reportPartTwoService.sendReportWithSlash(reportData.value.ninth, '9');
      if (!reportData.value.tenth.first.is_sent) {
        await reportPartTwoService.sendMultipleReport(reportData.value.tenth.first, '10', '1');
      }
      if (!reportData.value.tenth.second.is_sent) {
        await reportPartTwoService.sendMultipleReport(reportData.value.tenth.second, '10', '2');
      }
      if (!reportData.value.eleventh.is_sent) {
        await reportPartTwoService.sendReport(reportData.value.eleventh, '11');
      }
      if (!reportData.value.twelfth.is_sent) {
        await reportPartTwoService.sendReport(reportData.value.twelfth, '12');
      }
      if (!reportData.value.thirteenth.is_sent) {
        await reportPartTwoService.sendReport(reportData.value.thirteenth, '13');
      }
      if (!reportData.value.sixteenth.is_sent) {
        await reportPartTwoService.sendReport(reportData.value.sixteenth, '16');
      }

      await getReportData(route.query.reportId);

      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Отчет успешно отправлен',
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
    } finally {
      preloader.value = false;
    }
  } else {
    blockSendButton.value = false;
  }
};

const checkEmptyFields = (data) => {
  const { filteredSix, filteredNinth } = filterPanelsData();
  console.log('data', data)

  if (!data.first || !(data.first.amount_of_money && data.first.scan_file)) {
    isErrorPanel.value.first = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Заполните обязательные поля в 1 показателе`,
      showConfirmButton: false,
      timer: 2500,
    })
    return false;
  }

  if (data.fourth) {
    for (let event of data.fourth.events) {
      if (event.participants_number && !(event.name && event.end_date && event.start_date && data.fourth.comment)) {
        isErrorPanel.value.fourth = true;
        swal.fire({
          position: 'center',
          icon: 'warning',
          title: `Заполните обязательные поля в 4 показателе`,
          showConfirmButton: false,
          timer: 2500,
        })
        return false;
      }
    }
  } else {
    isErrorPanel.value.fourth = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      showConfirmButton: true,
      text: 'Заполните обязательные поля в 4 показателе. В случае отсутствия мероприятия, укажите 0 в количестве участников',
      confirmButtonColor: "#3085d6",
      confirmButtonText: 'Понятно',
      timer: 5000,
    })
    return false;
  }

  if (data.fifth) {
    for (let event of data.fifth.events) {
      if (event.participants_number && !(event.end_date && event.start_date && event.name && data.fifth.comment)) {
        isErrorPanel.value.fifth = true;
        swal.fire({
          position: 'center',
          icon: 'warning',
          title: `Заполните обязательные поля в 5 показателе`,
          showConfirmButton: false,
          timer: 2500,
        })
        return false;
      }
    }
  } else {
    isErrorPanel.value.fifth = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      text: `Заполните обязательные поля в 5 показателе. В случае отсутствия трудового проекта, укажите 0 в количестве участников`,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: 'Понятно',
      timer: 5000,
    })
    return false;
  }

  for (let item in filteredSix) {
    if (!(filteredSix[item]?.links?.length)) {
      isErrorPanel.value.six[item] = {
        id: item,
        error: true,
      };
      swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Заполните обязательные поля в 6 показателе`,
        showConfirmButton: false,
        timer: 2500,
      })
      return false;
    }
  }
  // for (let item in filteredSeventh) {
  //   if (!(filteredSeventh[item]?.links?.length && filteredSeventh[item].document && filteredSeventh[item].comment)) {
  //     isErrorPanel.value.seventh[item] = {
  //       id: item,
  //       error: true,
  //     };
  //     swal.fire({
  //       position: 'center',
  //       icon: 'warning',
  //       title: `Заполните обязательные поля в 7 показателе`,
  //       showConfirmButton: false,
  //       timer: 2500,
  //     })
  //     return false;
  //   }
  // }
  for (let item in filteredNinth) {
    if (!(filteredNinth[item]?.links?.length)) {
      isErrorPanel.value.ninth[item] = {
        id: item,
        error: true,
      };
      swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Заполните обязательные поля в 9 показателе`,
        showConfirmButton: false,
        timer: 2500,
      })
      return false;
    }
  }

  if (data.tenth.first) {
    if (data.tenth.first.event_happened) {
      if (!data.tenth.first.comment) {
        isErrorPanel.value.tenth = true;
        swal.fire({
          position: 'center',
          icon: 'warning',
          title: `Заполните обязательные поля в показателе 10-1`,
          showConfirmButton: false,
          timer: 2500,
        })
        return false;
      }
    }
  } else {
    isErrorPanel.value.tenth = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Укажите информацию о проведении акции в показателе 10-1`,
      showConfirmButton: false,
      timer: 3500,
    })
    return false;
  }

  if (data.tenth.second) {
    if (data.tenth.second.event_happened) {
      if (!data.tenth.second.comment) {
        isErrorPanel.value.tenth = true;
        swal.fire({
          position: 'center',
          icon: 'warning',
          title: `Заполните обязательные поля в показателе 10-2`,
          showConfirmButton: false,
          timer: 2500,
        })
        return false;
      }
    }
  } else {
    isErrorPanel.value.tenth = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Укажите информацию о проведении акции в показателе 10-2`,
      showConfirmButton: false,
      timer: 3500,
    })
    return false;
  }

  if (!data.eleventh || !(data.eleventh.participants_number && data.eleventh.scan_file)) {
    isErrorPanel.value.eleventh = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Заполните обязательные поля в 11 показателе`,
      showConfirmButton: false,
      timer: 2500,
    })
    return false;
  }

  if (!data.twelfth || !(data.twelfth.amount_of_money)) {
    isErrorPanel.value.twelfth = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Заполните обязательные поля в 12 показателе`,
      showConfirmButton: false,
      timer: 2500,
    })
    return false;
  }

  if (!data.thirteenth || !(data.thirteenth.number_of_members)) {
    isErrorPanel.value.thirteenth = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Заполните обязательные поля в 13 показателе`,
      showConfirmButton: false,
      timer: 2500,
    })
    return false;
  }

  if (data.sixteenth) {
    for (let project of data.sixteenth.projects) {
      if (data.sixteenth.is_project && !(data.sixteenth.comment && project.name && project.project_scale)) {
        isErrorPanel.value.sixteenth = true;
        swal.fire({
          position: 'center',
          icon: 'warning',
          title: `Заполните обязательные поля в 16 показателе`,
          showConfirmButton: false,
          timer: 2500,
        })
        return false;
      }
    }
  } else {
    isErrorPanel.value.sixteenth = true;
    swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Укажите информацию о наличии трудового проекта в 16 показателе`,
      showConfirmButton: false,
      timer: 3500,
    })
    return false;
  }

  return true;
}

onMounted(() => {
  if (roleStore.experts?.is_district_expert) {
    districtExpert.value = true;
    console.log('окружной эксперт', districtExpert.value);
  }
  if (roleStore.experts?.is_central_expert) {
    centralExpert.value = true;
    console.log('центральный эксперт', centralExpert.value);
  }
  getItems(6);
  getItems(9);
  getReportData(route.query.reportId);

});

</script>
<style>
.swal2-shown {
  overflow: unset !important;
  padding-right: 0px !important;
}

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

.v-expansion-panel-title.visible-error,
.v-expansion-panel--active>.v-expansion-panel-title.visible-error {
  border-color: #db0000;
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