<template>
  <div>
    <div class="container">
      <h1 class="title title--mb">Отчет о&nbsp;деятельности регионального отделения РСО за&nbsp;2024&nbsp;год.
        Часть&nbsp;2</h1>
      <div v-if="preloader" class="text-center">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
        <p class="preloader_info">{{ preloader_text }}</p>
      </div>
      <div v-else>
        <div class="d-flex mt-9 mb-9 active-tabs"
          v-if="!(roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) && isRevision">
          <button class="contributorBtn" :class="{ active: picked === tab.name }" v-for="tab in tabs" :key="tab.id"
            @click="picked = tab.name">
            {{ tab.name }}
          </button>
        </div>
        <div class="download-item">
          <SvgIcon iconName="download" />
          <button type="button" id="download" class="download-item__report"
            @click="downloadReportAll(roleStore.roles.regionalheadquarter_commander?.id)">
            Скачать архив
          </button>
        </div>
        <v-expansion-panels>
          <v-expansion-panel v-if="picked === 'Доработка' ? revisionPanels.includes('1') : true">
            <v-expansion-panel-title :class="isErrorPanel.first ? 'visible-error' : ''">
              1. Численность членов РО&nbsp;РСО в&nbsp;соответствии с&nbsp;объемом уплаченных членских взносов
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <first-panel
                  :districtExpert="districtExpert"
                  :centralExpert="centralExpert"
                  @get-data="setData"
                  @get-data-DH="setDataDH"
                  @get-data-CH="setDataCH"
                  :data="reportData.first"
                  :is-error-panel="isErrorPanel.first"
                  :blockEditFirstReport="blockEditFirstReport"
                  :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('2', picked, revisionPanels)">
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
          <v-expansion-panel v-if="showPanels('3', picked, revisionPanels)">
            <v-expansion-panel-title>
              3. Прирост численности членов РО&nbsp;РСО относительно количества членов в&nbsp;соответствии
              с&nbsp;отчетом РО&nbsp;РСО за&nbsp;2023&nbsp;г.
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО." />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="picked === 'Доработка' ? revisionPanels.includes('4') : true">
            <v-expansion-panel-title :class="isErrorPanel.fourth ? 'visible-error' : ''">
              4. Организация всероссийских (международных), окружных и&nbsp;межрегиональных мероприятий и&nbsp;проектов
              (слеты, школы, фестивали, турниры и&nbsp;прочие)
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fourth-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data="setData"
                @get-data-DH="setDataDH"
                @get-data-CH="setDataCH"
                :data="reportData.fourth"
                :is-error-panel="isErrorPanel.fourth"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="picked === 'Доработка' ? revisionPanels.includes('5') : true">
            <v-expansion-panel-title :class="isErrorPanel.fifth ? 'visible-error' : ''">
              5. Организация всероссийских (международных) (организатор&nbsp;&mdash; региональное отделение РСО),
              окружных и&nbsp;межрегиональных трудовых проектов в&nbsp;соответствии с&nbsp;Положением
              об&nbsp;организации
              трудовых проектов РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fifth-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data="setData"
                @get-data-DH="setDataDH"
                @get-data-CH="setDataCH"
                :data="reportData.fifth"
                :is-error-panel="isErrorPanel.fifth"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('6', picked, revisionPanels)">
            <v-expansion-panel-title
              :class="Object.values(isErrorPanel.six).some(item => item.error === true) ? 'visible-error' : ''">
              6. Участие бойцов студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских (международных)
              мероприятиях и&nbsp;проектах (в&nbsp;том числе и&nbsp;трудовых) &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixth-panel @get-data="setData" @get-data-DH="setDataDH" @get-data-CH="setDataCH" :items="six_items"
                @getId="setId" @getPanelNumber="setPanelNumber" :district-headquarter-commander="districtExpert"
                :data="reportData.six" :central-headquarter-commander="centralExpert" :is-error-panel="isErrorPanel.six"
                :tab="picked" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('7', picked, revisionPanels)">
            <v-expansion-panel-title>
              7. Победители студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских (международных) проектах
              и&nbsp;конкурсах &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО." />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('8', picked, revisionPanels)">
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
          <v-expansion-panel v-if="showPanels('9', picked, revisionPanels)">
            <v-expansion-panel-title
              :class="Object.values(isErrorPanel.ninth).some(item => item.error === true) ? 'visible-error' : ''">
              9. Организация обязательных общесистемных мероприятий РСО на&nbsp;региональном уровне &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ninth-panel @get-data="setData" @get-data-DH="setDataDH" @getId="setId" @get-data-CH="setDataCH"
                @getPanelNumber="setPanelNumber" :items="ninth_items" :district-headquarter-commander="districtExpert"
                :data="reportData.ninth" :central-headquarter-commander="centralExpert"
                :is-error-panel="isErrorPanel.ninth" :tab="picked" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="picked === 'Доработка' ? revisionPanels.includes('10-1') || revisionPanels.includes('10-2') : true">
            <v-expansion-panel-title :class="isErrorPanel.tenth ? 'visible-error' : ''">
              10. Организация РО&nbsp;РСО всероссийских (международных) добровольческих и&nbsp;патриотических акций
              &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <tenth-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data="setData"
                @getDataDHFirst="setDataDH"
                @getDataDHSecond="setDataDH"
                @getDataCHFirst="setDataCH"
                @getDataCHSecond="setDataCH"
                :data="reportData.tenth"
                :is-error-panel="isErrorPanel.tenth"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('11', picked, revisionPanels)">
            <v-expansion-panel-title :class="isErrorPanel.eleventh ? 'visible-error' : ''">
              11. Активность РО&nbsp;РСО в&nbsp;социальных сетях &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eleventh-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                @get-data-DH="setDataDH" @get-data-CH="setDataCH" :data="reportData.eleventh"
                :is-error-panel="isErrorPanel.eleventh" :tab="picked" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('12', picked, revisionPanels)">
            <v-expansion-panel-title :class="isErrorPanel.twelfth ? 'visible-error' : ''">
              12. Объем средств, собранных бойцами РО&nbsp;РСО во&nbsp;Всероссийском дне ударного труда
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <twelfth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                @get-data-DH="setDataDH" @get-data-CH="setDataCH" :data="reportData.twelfth"
                :is-error-panel="isErrorPanel.twelfth" :tab="picked" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('13', picked, revisionPanels)">
            <v-expansion-panel-title :class="isErrorPanel.thirteenth ? 'visible-error' : ''">
              13. Охват членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <thirteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                @get-data-DH="setDataDH" @get-data-CH="setDataCH" :data="reportData.thirteenth"
                :is-error-panel="isErrorPanel.thirteenth" :tab="picked" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('14', picked, revisionPanels)">
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
          <v-expansion-panel v-if="showPanels('15', picked, revisionPanels)">
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
          <v-expansion-panel v-if="picked === 'Доработка' ? revisionPanels.includes('16') : true">
            <v-expansion-panel-title :class="isErrorPanel.sixteenth ? 'visible-error' : ''">
              16. Победители всероссийских (международных), окружных и&nbsp;межрегиональных трудовых проектов
              по&nbsp;комиссарской деятельности &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixteenth-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data-DH="setDataDH"
                @get-data="setData"
                @get-data-CH="setDataCH"
                :data="reportData.sixteenth"
                :is-error-panel="isErrorPanel.sixteenth"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('17', picked, revisionPanels)">
            <v-expansion-panel-title>
              17. Дислокация студенческих отрядов РО&nbsp;РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <seventeenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.seventeenth" :is-sent="isSentLastIndex" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('18', picked, revisionPanels)">
            <v-expansion-panel-title>
              18. Количество научных работ и&nbsp;публикаций по&nbsp;теме&nbsp;СО, выпущенных в&nbsp;текущем году
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <eighteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.eighteenth" :is-sent="isSentLastIndex" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('19', picked, revisionPanels)">
            <v-expansion-panel-title>
              19. Трудоустройство
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <nineteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                :data="reportData.nineteenth" :is-sent="isSentLastIndex" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <Button class="btn_report" v-if="!preloader" :disabled="blockSendButton" variant="text" label="Отправить отчет" size="large"
      @click="sendReport" />
  </div>
</template>
<script setup>
import {
  CalculatedPanel,
  EighteenthPanel,
  EleventhPanel,
  FifthPanel,
  FirstPanel,
  FourthPanel,
  NineteenthPanel,
  NinthPanel,
  SeventeenthPanel,
  SixteenthPanel,
  SixthPanel,
  TenthPanel,
  ThirteenthPanel,
  TwelfthPanel
} from './components/index'
import { Button } from '@shared/components/buttons';
import { onMounted, ref, watch } from "vue";
import { SvgIcon } from '@shared/ui/SvgIcon';
import { useRoleStore } from "@layouts/store/role.ts";
import { HTTP } from '@app/http';
import { reportPartTwoService } from "@services/ReportService.ts";
import { useRoute, useRouter } from "vue-router";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";
// import { checkEmptyFieldsDH } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import swal from '@/library/sweetalert2/sweetalert2.esm.all.min.js';
import {
  checkEmptyFieldsDH,
  showPanels,
} from "@pages/ReportRegionalHQPartTwoPage/Helpers.js";

const picked = ref('Просмотр отправленного отчета');
const tabs = ref([
  {
    id: '1',
    name: 'Просмотр отправленного отчета',
  },
  {
    id: '2',
    name: 'Доработка',
  },
]);

const reportStore = useReportPartTwoStore();

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

const reportDataDH = ref({
  first: null,
  fourth: null,
  fifth: null,
  six: {},
  ninth: {},
  tenth: {
    first: null,
    second: null,
  },
  eleventh: null,
  twelfth: null,
  thirteenth: null,
  sixteenth: null,
});

const reportDataCH = ref({
  first: {},
  fourth: null,
  fifth: null,
  six: {},
  ninth: {},
  tenth: {
    first: null,
    second: null,
  },
  eleventh: null,
  twelfth: null,
  thirteenth: null,
  sixteenth: null,
});

const preloader = ref(true);
const panel_id = ref(1);
const panel_num = ref(null);
const six_items = ref([])
// const seventh_items = ref([]);
const ninth_items = ref([]);
const is_return_six = ref(false);
const is_return_ninth = ref(false);
const blockSendButton = ref(false);
const isSentLastIndex = ref(false);
const blockEditFirstReport = ref(false);
const preloader_text = ref('Загрузка отчета может занять до 1 минуты.')

// const swal = inject('$swal');
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

const handleReturnToRoSix = (checked) => {
  is_return_six.value = checked;
  console.log('checked6', is_return_six.value)
}

const handleReturnToRoNinth = (checked) => {
  is_return_ninth.value = checked;
  console.log('checked9', is_return_ninth.value)
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

const handleReturnToRo = (checked) => {
  is_return_six.value = checked;
  console.log('returnToRo6-2', checked, is_return_six.value);
};



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

const getMultiplyData = async (reportId) => {
  const sixDataPromises = six_items.value.map(async (item) => {
    try {
      if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
        console.log('1.6')
        return { id: item.id, data: (await reportPartTwoService.getMultipleReportDH('6', item.id, reportId)).data };
      } else {
        console.log('2.6')
        return { id: item.id, data: (await reportPartTwoService.getMultipleReport('6', item.id)).data };
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
          return {
            id: item.id, data: {
              is_sent: false,
              verified_by_chq: null,
              verified_by_dhq: false,
              score: 0.0,
              regional_version: null,
              district_version: null,
              central_version: null,
              rejecting_reasons: null,
              number_of_members: 0,
              links: [],
              comment: ""
            }
          };
        } else {
          return { id: item.id, data: {} };
        }
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
      if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
        console.log('1.9')
        return { id: item.id, data: (await reportPartTwoService.getMultipleReportDH('9', item.id, reportId)).data };
      } else {
        console.log('2.9')
        return { id: item.id, data: (await reportPartTwoService.getMultipleReport('9', item.id)).data };
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
          return {
            id: item.id, data: {
              is_sent: false,
              verified_by_chq: null,
              verified_by_dhq: false,
              score: 0.0,
              regional_version: null,
              district_version: null,
              central_version: null,
              rejecting_reasons: null,
              number_of_members: 0,
              links: [],
              comment: ""
            }
          };
        } else {
          return { id: item.id, data: {} };
        }
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

    if (districtExpert.value) {
      reportData.value.six[result.id] = result.data;
      reportStore.reportDataDH.six[result.id] = Object.assign({}, reportData.value.six[result.id]);
      reportStore.reportDataDH.six[result.id].comment = '';
      // isErrorPanel.value.six[result.id] = {
      //   id: result.id,
      //   error: false,
      // }
    } else if (centralExpert.value) {

      // const dataEleventh = (await reportPartTwoService.getReportDH('11', reportId)).data;
      // reportStore.reportForCheckCH.eleventh = dataEleventh;
      // console.log(dataEleventh);
      // dataEleventh.regional_version
      //   ? reportData.value.eleventh = JSON.parse(dataEleventh.regional_version)
      //   : reportData.value.eleventh = dataEleventh;

      // dataEleventh.district_version
      //   ? reportStore.reportDataDH.eleventh = JSON.parse(dataEleventh.district_version)
      //   : reportStore.reportDataDH.eleventh = dataEleventh;

      // reportStore.reportDataCH.eleventh = Object.assign({}, dataEleventh);
      // dataEleventh.verified_by_chq === null
      //   ? reportStore.reportDataCH.eleventh.comment = ''
      //   : reportStore.reportDataCH.eleventh.comment = dataEleventh.comment;

      console.log('data 66', result.data)
      reportStore.reportForCheckCH.six[result.id] = result.data;
      console.log('ch6', reportStore.reportForCheckCH.six[result.id])
      if (reportData.value.six[result.id].regional_version) {
        reportData.value.six[result.id] = JSON.parse(reportData.value.six[result.id]?.regional_version);
      } else {
        reportData.value.six[result.id] = result.data;
      }
      if (reportData.value.six[result.id]?.district_version) {
        reportStore.reportDataDH.six[result.id] = JSON.parse( reportData.value.six[result.id]?.district_version);
      } else {
        reportStore.reportDataDH.six[result.id] = result.data
      }

      reportStore.reportDataCH.six[result.id] = Object.assign({}, result.data);
      result.data.verified_by_chq === null
        ? reportStore.reportDataCH.six[result.id].comment = ''
        : reportStore.reportDataCH.six[result.id].comment = result.data.comment;
    } else {
      reportData.value.six[result.id] = result.data;
      if (reportData.value.six[result.id]?.regional_version) {
        reportData.value.six[result.id] = JSON.parse(reportData.value.six[result.id].regional_version);
      } else {
        reportData.value.six[result.id] = result.data;
      }

      // Проверка на причины отклонений отчета и вывод табов для РО
      if (reportData.value.six[result.id]?.rejecting_reasons) {
        revisionPanels.value.push('6');
        reportStore.reportDataDH.six[result.id] = JSON.parse(reportData.value.six[result.id].district_version);

        reportData.value.six[result.id].central_version
          ? reportStore.reportDataCH.six[result.id] = reportData.value.six[result.id].central_version
          : reportStore.reportDataCH.six[result.id] = reportData.value.six[result.id];

        reportStore.isReportReject.six[result.id] = isTabsForRevision.value;
      }
    }
  });
  // console.log('data66', reportData.value.six)
  // seventhDataResults.forEach((result) => {
  //   reportData.value.seventh[result.id] = result.data;
  // });

  ninthDataResults.forEach((result) => {
    if (districtExpert.value) {
      reportData.value.ninth[result.id] = result.data;
      reportStore.reportDataDH.ninth[result.id] = Object.assign({}, reportData.value.ninth[result.id]);
      reportStore.reportDataDH.ninth[result.id].comment = '';
      // isErrorPanel.value.ninth[result.id] = {
      //   id: result.id,
      //   error: false,
      // }
    } else if (centralExpert.value) {
      reportStore.reportForCheckCH.ninth[result.id] = result.data;
      console.log('ch9', reportStore.reportForCheckCH.ninth[result.id])
      if (result.data.regional_version) {
        reportData.value.ninth[result.id] = JSON.parse(result.data?.regional_version);
      } else {
        reportData.value.ninth[result.id] = result.data;
      }
      if (result.data.district_version) {
        reportStore.reportDataDH.ninth[result.id] = JSON.parse(result.data.district_version);
      } else {
        reportStore.reportDataDH.ninth[result.id] = result.data
      }

      reportStore.reportDataCH.ninth[result.id] = Object.assign({}, result.data);
      result.data.verified_by_chq === null
        ? reportStore.reportDataCH.ninth[result.id].comment = ''
        : reportStore.reportDataCH.ninth[result.id].comment = result.data.comment;
    }
    else {
      reportData.value.ninth[result.id] = result.data;
      if (reportData.value.ninth[result.id]?.regional_version !== null && Object.keys(reportData.value.ninth[result.id]).length) {
        reportData.value.ninth[result.id] = JSON.parse(reportData.value.ninth[result.id].regional_version);
      }

      if (reportData.value.ninth[result.id]?.rejecting_reasons) {
        revisionPanels.value.push('9');
        reportStore.reportDataDH.ninth[result.id] = JSON.parse(reportData.value.ninth[result.id].district_version);

        reportData.value.ninth[result.id].central_version
          ? reportStore.reportDataCH.ninth[result.id] = reportData.value.ninth[result.id].central_version
          : reportStore.reportDataCH.ninth[result.id] = reportData.value.ninth[result.id];

        reportStore.isReportReject.ninth[result.id] = isTabsForRevision.value;
      }


    }
  });
}

const revisionPanels = ref([]);
const isRevision = ref(false);
const isTabsForRevision = ref(false);

const getReportData = async (reportId) => {
  try {
    // Загрузка данных для отчета эксперта ЦШ
    if (centralExpert.value && typeof reportId != "undefined") {
      /*
      * Критерий 1
      */
      reportStore.reportForCheckCH.first = (await reportPartTwoService.getReportDH('1', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.first = (await reportPartTwoService.getReportDH('1', reportId)).data;
      reportStore.reportDataCH.first.comment = '';

      /*
      * Критерий 4
      */
      reportStore.reportForCheckCH.fourth = (await reportPartTwoService.getReportDH('4', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.fourth.events = (await reportPartTwoService.getReportDH('4', reportId)).data.events;

      /*
      * Критерий 5
      */
      reportStore.reportForCheckCH.fifth = (await reportPartTwoService.getReportDH('5', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.fifth.events = (await reportPartTwoService.getReportDH('5', reportId)).data.events;

      /*
      * Критерий 6 и 9  
      */
      await getMultiplyData(reportId);
      /*
      * Критерий 10-1
      */
      reportStore.reportForCheckCH.tenth.first = (await reportPartTwoService.getMultipleReportDH('10', '1', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.tenth.first = (await reportPartTwoService.getMultipleReportDH('10', '1', reportId)).data;
      reportStore.reportDataCH.tenth.first.comment = ''

      /*
      * Критерий 10-2
      */
      reportStore.reportForCheckCH.tenth.second = (await reportPartTwoService.getMultipleReportDH('10', '2', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.tenth.second = (await reportPartTwoService.getMultipleReportDH('10', '2', reportId)).data;
      reportStore.reportDataCH.tenth.second.comment = ''

      /*
      * Критерий 16
      */
      reportStore.reportForCheckCH.sixteenth = (await reportPartTwoService.getReportDH('16', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.sixteenth.projects = (await reportPartTwoService.getReportDH('16', reportId)).data.projects;

      /* 
      * Критерий 11
      */
      const dataEleventh = (await reportPartTwoService.getReportDH('11', reportId)).data;
      reportStore.reportForCheckCH.eleventh = dataEleventh;
      // console.log(dataEleventh);
      dataEleventh.regional_version
        ? reportData.value.eleventh = JSON.parse(dataEleventh.regional_version)
        : reportData.value.eleventh = dataEleventh;

      dataEleventh.district_version
        ? reportStore.reportDataDH.eleventh = JSON.parse(dataEleventh.district_version)
        : reportStore.reportDataDH.eleventh = dataEleventh;

      reportStore.reportDataCH.eleventh = Object.assign({}, dataEleventh);
      dataEleventh.verified_by_chq === null
        ? reportStore.reportDataCH.eleventh.comment = ''
        : reportStore.reportDataCH.eleventh.comment = dataEleventh.comment;

      /* 
      * Критерий 12
      */
      const dataTwelfth = (await reportPartTwoService.getReportDH('12', reportId)).data;
      reportStore.reportForCheckCH.twelfth = dataTwelfth;
      // console.log(dataTwelfth);
      dataTwelfth.regional_version
        ? reportData.value.twelfth = JSON.parse(dataTwelfth.regional_version)
        : reportData.value.twelfth = dataTwelfth;

      dataTwelfth.district_version
        ? reportStore.reportDataDH.twelfth = JSON.parse(dataTwelfth.district_version)
        : reportStore.reportDataDH.twelfth = dataTwelfth;

      reportStore.reportDataCH.twelfth = Object.assign({}, dataTwelfth);
      dataTwelfth.verified_by_chq === null
        ? reportStore.reportDataCH.twelfth.comment = ''
        : reportStore.reportDataCH.twelfth.comment = dataTwelfth.comment;

      /* 
      * Критерий 13
      */
      const dataThirteenth = (await reportPartTwoService.getReportDH('13', reportId)).data;
      reportStore.reportForCheckCH.thirteenth = dataThirteenth;
      // console.log(dataThirteenth);
      dataThirteenth.regional_version
        ? reportData.value.thirteenth = JSON.parse(dataThirteenth.regional_version)
        : reportData.value.thirteenth = dataThirteenth;

      dataThirteenth.district_version
        ? reportStore.reportDataDH.thirteenth = JSON.parse(dataThirteenth.district_version)
        : reportStore.reportDataDH.thirteenth = dataThirteenth;

      reportStore.reportDataCH.thirteenth = Object.assign({}, dataThirteenth);
      dataThirteenth.verified_by_chq === null
        ? reportStore.reportDataCH.thirteenth.comment = ''
        : reportStore.reportDataCH.thirteenth.comment = dataThirteenth.comment;

      /* 
      * Критерий 17-19
      */
      const dataSeventeenth = (await reportPartTwoService.getReportDH('16', reportId)).data;
      if (dataSeventeenth.is_sent) isSentLastIndex.value = true;
      reportData.value.seventeenth = (await reportPartTwoService.getReportDH('17', reportId)).data;
      reportData.value.eighteenth = (await reportPartTwoService.getReportDH('18', reportId)).data;
      reportData.value.nineteenth = (await reportPartTwoService.getReportDH('19', reportId)).data;
    }
    // Загрузка данных для отчета эксперта ОШ
    else if (districtExpert.value && typeof reportId != "undefined") {
      reportData.value.first = (await reportPartTwoService.getReportDH('1', reportId)).data;
      reportStore.reportDataDH.first = Object.assign({}, reportData.value.first);
      reportStore.reportDataDH.first.comment = '';

      reportData.value.fourth = (await reportPartTwoService.getReportDH('4', reportId)).data;
      reportStore.reportDataDH.fourth = (await reportPartTwoService.getReportDH('4', reportId)).data;
      reportStore.reportDataDH.fourth.comment = '';

      reportData.value.fifth = (await reportPartTwoService.getReportDH('5', reportId)).data;
      reportStore.reportDataDH.fifth = (await reportPartTwoService.getReportDH('5', reportId)).data;
      reportStore.reportDataDH.fifth.comment = '';

      await getMultiplyData(reportId);

      reportData.value.tenth.first = (await reportPartTwoService.getMultipleReportDH('10', '1', reportId)).data;
      reportStore.reportDataDH.tenth.first = Object.assign({}, reportData.value.tenth.first);
      reportStore.reportDataDH.tenth.first.comment = '';

      reportData.value.tenth.second = (await reportPartTwoService.getMultipleReportDH('10', '2', reportId)).data;
      reportStore.reportDataDH.tenth.second = Object.assign({}, reportData.value.tenth.second);
      reportStore.reportDataDH.tenth.second.comment = '';

      reportData.value.eleventh = (await reportPartTwoService.getReportDH('11', reportId)).data;
      reportStore.reportDataDH.eleventh = Object.assign({}, reportData.value.eleventh);
      reportStore.reportDataDH.eleventh.comment = '';

      reportData.value.twelfth = (await reportPartTwoService.getReportDH('12', reportId)).data;
      reportStore.reportDataDH.twelfth = Object.assign({}, reportData.value.twelfth);
      reportStore.reportDataDH.twelfth.comment = '';

      reportData.value.thirteenth = (await reportPartTwoService.getReportDH('13', reportId)).data;
      reportStore.reportDataDH.thirteenth = Object.assign({}, reportData.value.thirteenth);
      reportStore.reportDataDH.thirteenth.comment = '';

      reportData.value.sixteenth = (await reportPartTwoService.getReportDH('16', reportId)).data;
      reportStore.reportDataDH.sixteenth = (await reportPartTwoService.getReportDH('16', reportId)).data;
      reportStore.reportDataDH.sixteenth.comment = '';

      if (reportData.value.sixteenth.is_sent) isSentLastIndex.value = true;
      reportData.value.seventeenth = (await reportPartTwoService.getReportDH('17', reportId)).data;
      reportData.value.eighteenth = (await reportPartTwoService.getReportDH('18', reportId)).data;
      reportData.value.nineteenth = (await reportPartTwoService.getReportDH('19', reportId)).data;
    }
    // Загрузка данных для отчета командира РШ
    else {
      try {
        // reportData.value.first = (await reportPartTwoService.getReport('1')).data;
        const dataFirst = (await reportPartTwoService.getReport('1')).data;
        if (!dataFirst.regional_version && !dataFirst.central_version) {
          reportData.value.first = dataFirst;
        } else {
          if (dataFirst.rejecting_reasons) {
            reportStore.isReportReject.first = isTabsForRevision.value // true;
            reportStore.reportReject.first = dataFirst;

            revisionPanels.value.push('1');
          }

          if (dataFirst.central_version) {
            reportData.value.first = dataFirst;
          } else {
            reportData.value.first = JSON.parse(dataFirst.regional_version);
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        const dataFourth = (await reportPartTwoService.getReport('4')).data;
        if (!dataFourth.regional_version && !dataFourth.central_version) {
          reportData.value.fourth = dataFourth;
        } else {
          if (dataFourth.rejecting_reasons) {
            reportStore.isReportReject.fourth = isTabsForRevision.value // true;
            reportStore.reportReject.fourth = dataFourth;

            revisionPanels.value.push('4');
          }

          if (dataFourth.central_version) {
            reportData.value.fourth = dataFourth;
          } else {
            reportData.value.fourth = JSON.parse(dataFourth.regional_version);
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        const dataFifth = (await reportPartTwoService.getReport('5')).data;
        console.log('5', dataFifth)
        // if (!dataFifth.regional_version) {
        //   reportData.value.fifth = dataFifth;
        // } else {
        //   reportData.value.fifth = JSON.parse(dataFifth.regional_version);
        // }
        if (!dataFifth.regional_version && !dataFifth.central_version) {
          reportData.value.fifth = dataFifth;
        } else {
          if (dataFifth.rejecting_reasons) {
            reportStore.isReportReject.fifth = isTabsForRevision.value // true;
            reportStore.reportReject.fifth = dataFifth;

            revisionPanels.value.push('5');
          }

          if (dataFifth.central_version) {
            reportData.value.fifth = dataFifth;
          } else {
            reportData.value.fifth = JSON.parse(dataFifth.regional_version);
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      // ReportRegionalHQPartTwo.vue
      // try {
      //   for (let itemId in six_items) {
      //     try {
      //       const dataSix = await reportPartTwoService.getMultipleReport('6', itemId);
      //       console.log('data for item', itemId, ':', dataSix.data);

      //       if (dataSix.data && typeof dataSix.data === 'object') {
      //         if (dataSix.data.regional_version) {
      //           try {
      //             reportData.value.six[itemId] = JSON.parse(dataSix.data.regional_version);
      //           } catch (parseError) {
      //             console.error('Error parsing regional_version for item', itemId, ':', parseError);
      //             reportData.value.six[itemId] = dataSix.data;
      //           }
      //         } else {
      //           reportData.value.six[itemId] = dataSix.data;
      //         }
      //       } else {
      //         console.warn('Unexpected data structure for item', itemId);
      //         reportData.value.six[itemId] = {};
      //       }
      //     } catch (itemError) {
      //       console.error('Error processing item', itemId, ':', itemError);
      //       reportData.value.six[itemId] = {};
      //     }
      //   }
      // } catch (e) {
      //   console.error('Error in six_items processing:', e);
      // }

      try {
        await getMultiplyData();
        // for (let itemId in ninth_items) {
        //   try {
        //     const dataNinth = await reportPartTwoService.getMultipleReport('9', itemId);
        //     console.log('data for item', itemId, ':', dataNinth.data);

        //     if (dataNinth.data && typeof dataNinth.data === 'object') {
        //       if (dataNinth.data.regional_version) {
        //         try {
        //           reportData.value.ninth[itemId] = JSON.parse(dataNinth.data.regional_version);
        //         } catch (parseError) {
        //           console.error('Error parsing regional_version for item', itemId, ':', parseError);
        //           reportData.value.ninth[itemId] = dataNinth.data;
        //         }
        //       } else {
        //         reportData.value.ninth[itemId] = dataNinth.data;
        //       }
        //     } else {
        //       console.warn('Unexpected data structure for item', itemId);
        //       // reportData.value.ninth[itemId] = {};
        //     }
        //   } catch (itemError) {
        //     console.error('Error processing item', itemId, ':', itemError);
        //     // reportData.value.ninth[itemId] = {};
        //   }
        // }
      } catch (e) {
        console.error('Error in six_items processing:', e);
      }

      try {
        // reportData.value.tenth.first = (await reportPartTwoService.getMultipleReport('10', '1')).data;
        const dataTenthFirst = (await reportPartTwoService.getMultipleReport('10', '1')).data;
        // if (!dataTenthFirst.regional_version) {
        //   reportData.value.tenth.first = dataTenthFirst;
        // } else {
        //   reportData.value.tenth.first = JSON.parse(dataTenthFirst.regional_version);
        // }
        if (!dataTenthFirst.regional_version && !dataTenthFirst.central_version) {
          reportData.value.tenth.first = dataTenthFirst;
        } else {
          if (dataTenthFirst.rejecting_reasons) {
            reportStore.isReportReject.tenth.first = isTabsForRevision.value // true;
            reportStore.reportReject.tenth.first = dataTenthFirst;

            revisionPanels.value.push('10-1');
          }

          if (dataTenthFirst.central_version) {
            reportData.value.tenth.first = dataTenthFirst;
          } else {
            reportData.value.tenth.first = JSON.parse(dataTenthFirst.regional_version);
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        // reportData.value.tenth.second = (await reportPartTwoService.getMultipleReport('10', '2')).data;
        const dataTenthSecond = (await reportPartTwoService.getMultipleReport('10', '2')).data;
        // if (!dataTenthSecond.regional_version) {
        //   reportData.value.tenth.second = dataTenthSecond;
        // } else {
        //   reportData.value.tenth.second = JSON.parse(dataTenthSecond.regional_version);
        // }
        if (!dataTenthSecond.regional_version && !dataTenthSecond.central_version) {
          reportData.value.tenth.second = dataTenthSecond;
        } else {
          if (dataTenthSecond.rejecting_reasons) {
            reportStore.isReportReject.tenth.second = isTabsForRevision.value  // true;
            reportStore.reportReject.tenth.second = dataTenthSecond;

            revisionPanels.value.push('10-2');
          }

          if (dataTenthSecond.central_version) {
            reportData.value.tenth.second = dataTenthSecond;
          } else {
            reportData.value.tenth.second = JSON.parse(dataTenthSecond.regional_version);
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        const dataEleventh = (await reportPartTwoService.getReport('11')).data;
        console.log(dataEleventh);
        dataEleventh.regional_version
          ? reportData.value.eleventh = JSON.parse(dataEleventh.regional_version)
          : reportData.value.eleventh = dataEleventh;

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataEleventh.rejecting_reasons && dataEleventh.verified_by_chq !== true) {
          // console.log(dataEleventh);
          revisionPanels.value.push('11');
          reportStore.reportDataDH.eleventh = JSON.parse(dataEleventh.district_version);

          dataEleventh.central_version
            ? reportStore.reportDataCH.eleventh = dataEleventh.central_version
            : reportStore.reportDataCH.eleventh = dataEleventh;

          reportStore.isReportReject.eleventh = isTabsForRevision.value;
          // console.log('isReportReject в род комп', reportStore.isReportReject.eleventh);
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        const dataTwelfth = (await reportPartTwoService.getReport('12')).data;
        console.log(dataTwelfth);
        dataTwelfth.regional_version
          ? reportData.value.twelfth = JSON.parse(dataTwelfth.regional_version)
          : reportData.value.twelfth = dataTwelfth;

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataTwelfth.rejecting_reasons && dataTwelfth.verified_by_chq !== true) {
          revisionPanels.value.push('12');
          reportStore.reportDataDH.twelfth = JSON.parse(dataTwelfth.district_version);

          dataTwelfth.central_version
            ? reportStore.reportDataCH.twelfth = dataTwelfth.central_version
            : reportStore.reportDataCH.twelfth = dataTwelfth;

          reportStore.isReportReject.twelfth = isTabsForRevision.value;
          // console.log('isReportReject в род комп', reportStore.isReportReject.twelfth);
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        const dataThirteenth = (await reportPartTwoService.getReport('13')).data;
        console.log(dataThirteenth);
        dataThirteenth.regional_version
          ? reportData.value.thirteenth = JSON.parse(dataThirteenth.regional_version)
          : reportData.value.thirteenth = dataThirteenth;

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataThirteenth.rejecting_reasons && dataThirteenth.verified_by_chq !== true) {
          revisionPanels.value.push('13');
          reportStore.reportDataDH.thirteenth = JSON.parse(dataThirteenth.district_version);

          dataThirteenth.central_version
            ? reportStore.reportDataCH.thirteenth = dataThirteenth.central_version
            : reportStore.reportDataCH.thirteenth = dataThirteenth;

          reportStore.isReportReject.thirteenth = isTabsForRevision.value;
          // console.log('isReportReject в род комп', reportStore.isReportReject.thirteenth);
        }
      } catch (e) {
        console.log(e.message)
      }
      try {
        // reportData.value.sixteenth = (await reportPartTwoService.getReport('16')).data;
        // if (reportData.value.sixteenth.is_sent) {
        //   blockSendButton.value = true;
        //   blockEditFirstReport.value = true;
        // }

        const dataSixteenth = (await reportPartTwoService.getReport('16')).data;
        // if (!dataSixteenth.regional_version) {
        //   reportData.value.sixteenth = dataSixteenth;
        // } else {
        //   reportData.value.sixteenth = JSON.parse(dataSixteenth.regional_version);
        // }

        if (!dataSixteenth.regional_version && !dataSixteenth.central_version) {
          reportData.value.sixteenth = dataSixteenth;
        } else {
          if (dataSixteenth.rejecting_reasons) {
            reportStore.isReportReject.sixteenth = isTabsForRevision.value // true;
            reportStore.reportReject.sixteenth = dataSixteenth;

            revisionPanels.value.push('16');
          }

          if (dataSixteenth.central_version) {
            reportData.value.sixteenth = dataSixteenth;
          } else {
            reportData.value.sixteenth = JSON.parse(dataSixteenth.regional_version);
          }
        }

        if (reportData.value.sixteenth.is_sent) {
          blockSendButton.value = true;
          blockEditFirstReport.value = true;
          isSentLastIndex.value = true;
        }

      } catch (e) {
        console.log(e.message)
      }

      for (let item in reportData.value.six) {
        if (reportData.value.six[item] !== null) {
          if (reportData.value.six[item]?.is_sent == false || !Object.keys(reportData.value.six[item]).length) {
            blockSendButton.value = false;
            break
          } else {
            blockSendButton.value = true;
          }
        }

      }

      // for (let item in reportData.value.ninth) {
      //   console.log('9', reportData.value.ninth[item].is_sent == false || !Object.keys(reportData.value.ninth[item]).length)
      //   if (reportData.value.ninth[item].is_sent == false || !Object.keys(reportData.value.ninth[item]).length) {
      //     blockSendButton.value = false;
      //     break
      //     // blockEditFirstReport.value = false;
      //   } else {
      //     blockSendButton.value = true;
      //   }
      // }
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
    console.log('getReportData error: ', e.message)
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

const setDataDH = (data, panel, number) => {
  switch (panel) {
    case 1:
      reportDataDH.value.first = data;
      break;
    case 4:
      reportDataDH.value.fourth = data;
      break;
    case 5:
      reportDataDH.value.fifth = data;
      break;
    case 6:
      reportDataDH.value.six[number] = data;
      console.log('reportDataDH.value6', reportDataDH.value.six[number])
      break;
    case 9:
      reportDataDH.value.ninth[number] = data;
      console.log('reportDataDH.value9', reportDataDH.value.ninth[number])
      break;
    case 10:
      if (number === 1) {
        reportDataDH.value.tenth.first = data;
      } else {
        reportDataDH.value.tenth.second = data;
      }
      break;
    case 11:
      reportDataDH.value.eleventh = data;
      // console.log('11', ...reportDataDH.value.eleventh);
      break;
    case 12:
      reportDataDH.value.twelfth = data;
      // console.log('12', ...reportDataDH.value.twelfth);
      break;
    case 13:
      reportDataDH.value.thirteenth = data;
      // console.log('13', ...reportDataDH.value.thirteenth);
      break;
    case 16:
      reportDataDH.value.sixteenth = data;
      break;
  }
}

const setDataCH = (data, panel, number) => {
  switch (panel) {
    case 1:
      reportDataCH.value.first = data;
      console.log('1', ...reportDataCH.value.first);
      break;
    case 4:
      reportDataCH.value.fourth = data;
      console.log('4', ...reportDataCH.value.fourth);
      break;
    case 5:
      reportDataCH.value.fifth = data;
      console.log('5', ...reportDataCH.value.fifth);
      break;
    case 6:
      reportDataCH.value.six[number] = data;
      console.log('6 sss', ...reportDataCH.value.six[number])
      break;
    case 9:
      reportDataCH.value.ninth[number] = data;
      console.log('9 sss', ...reportDataCH.value.ninth[number])
      break;
    case 10:
      if (number === 1) {
        reportDataCH.value.tenth.first = data;
        console.log('10-1', ...reportDataCH.value.tenth.first);
      } else {
        reportDataCH.value.tenth.second = data;
        console.log('10-2', ...reportDataCH.value.tenth.second);
      }
      break;
    case 11:
      reportDataCH.value.eleventh = data;
      console.log('11', ...reportDataCH.value.eleventh);
      break;
    case 12:
      reportDataCH.value.twelfth = data;
      // console.log('12', ...reportDataCH.value.twelfth);
      break;
    case 13:
      reportDataCH.value.thirteenth = data;
      // console.log('13', ...reportDataCH.value.thirteenth);
      break;
    case 16:
      reportDataCH.value.sixteenth = data;
      console.log('16', ...reportDataCH.value.sixteenth);
      break;
  }
}

const filterPanelsData = () => {
  const filteredSix = {};
  // const filteredSeventh = {};
  const filteredNinth = {};

  for (let i in reportData.value.six) {
    if ((reportData.value.six[i].number_of_members > 0 && reportData.value.six[i].number_of_members !== null && reportData.value.six[i].is_sent === false) && Object.keys(reportData.value.six[i]).length !== 0) {
      filteredSix[i] = reportData.value.six[i];
    }

  }
  console.log('setData6: ', filteredSix)
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
    if (reportData.value.ninth[i].event_happened !== false && reportData.value.ninth[i].is_sent === false && Object.keys(reportData.value.ninth[i]).length !== 0) {
      filteredNinth[i] = reportData.value.ninth[i];
    }
  }
  console.log('setData9: ', filteredNinth)
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
  if (!(districtExpert.value || centralExpert.value)) {
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
          console.log('dev', reportData.value.six)
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
        blockSendButton.value = true;

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
  }

  if (districtExpert.value && checkEmptyFieldsDH(reportStore.reportDataDH, isErrorPanel)) {
    blockSendButton.value = true;
    preloader.value = true;
    try {
      console.log('dataSiDh', reportDataDH.value.six, reportDataDH.value.first)
      if (!reportData.value.first.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(reportDataDH.value.first, '1', route.query.reportId, true)
      }

      if (!reportData.value.fourth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(reportDataDH.value.fourth, '4', route.query.reportId, true)
      }

      if (!reportData.value.fifth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(reportDataDH.value.fifth, '5', route.query.reportId, true)
      }

      for (const [index, item] of Object.entries(reportData.value.six)) {
        if (item && item.verified_by_dhq !== true) {
          console.log(`Sending report for item 6-${index}:`, item);
          try {
            const response = await reportPartTwoService.sendReportDHMultiply(reportStore.reportDataDH.six[item], '6', index, route.query.reportId);
            console.log(`Successfully sent report for item 6-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 6-${index}:`, error);
          }
        } else {
          console.log(`Skipping item 6-${index} as it's already verified or doesn't exist`);
        }
      }
      for (const [index, item] of Object.entries(reportData.value.ninth)) {
        if (item && item.verified_by_dhq !== true) {
          console.log(`Sending report for item 9-${index}:`, item);
          try {
            const response = await reportPartTwoService.sendReportDHMultiply(reportStore.reportDataDH.ninth[item], '9', index, route.query.reportId, true);
            console.log(`Successfully sent report for item 9-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 9-${index}:`, error);
          }
        } else {
          console.log(`Skipping item 9-${index} as it's already verified or doesn't exist`);
        }
      }
      if (!reportData.value.tenth.first.verified_by_dhq) {
        await reportPartTwoService.sendReportDHMultiply(reportDataDH.value.tenth.first, '10', '1', route.query.reportId, true)
      }

      if (!reportData.value.tenth.second.verified_by_dhq) {
        await reportPartTwoService.sendReportDHMultiply(reportDataDH.value.tenth.second, '10', '2', route.query.reportId, true)
      }

      if (!reportData.value.eleventh.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(reportDataDH.value.eleventh, '11', route.query.reportId, true);
      }

      if (!reportData.value.twelfth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(reportDataDH.value.twelfth, '12', route.query.reportId, true);
      }

      if (!reportData.value.thirteenth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(reportDataDH.value.thirteenth, '13', route.query.reportId, true);
      }

      if (!reportData.value.sixteenth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(reportDataDH.value.sixteenth, '16', route.query.reportId, true);
      }

      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Отчет успешно верифицирован',
        showConfirmButton: false,
        timer: 1500,
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
    // } else {
    // blockSendButton.value = false;
    // }
  }

  if (centralExpert.value) {
    blockSendButton.value = true;
    // if (checkEmptyFieldsDH(reportStore.reportDataCH, isErrorPanel)) {
    preloader.value = true;
    console.log('chc6', reportStore.reportDataCH.six, reportStore.returnReport.six)
    console.log('chc9', reportStore.reportDataCH.ninth, reportStore.returnReport.ninth)

    try {
      if (reportStore.reportForCheckCH.first.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(reportDataCH.value.first, '1', route.query.reportId, true, reportStore.returnReport.first);
      }

      if (reportStore.reportForCheckCH.fourth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(reportDataCH.value.fourth, '4', route.query.reportId, true, reportStore.returnReport.fourth);
      }

      if (reportStore.reportForCheckCH.fifth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(reportDataCH.value.fifth, '5', route.query.reportId, true, reportStore.returnReport.fifth);
      }

      // for (let i in reportStore.reportForCheckCH.six) {
      //   console.log('33', reportStore.reportForCheckCH.six[i])
      //   if (reportStore.reportForCheckCH.six[i].verified_by_chq === null) {
      //     console.log(11,  reportStore.reportForCheckCH.six[i])
      //     await reportPartTwoService.sendMultipleReportCH(reportDataCH.value.six[i], '6', i, route.query.reportId, false, reportStore.returnReport.six[i]);
      //   }
      // }
      for (const [index, item] of Object.entries(reportStore.reportForCheckCH.six)) {
        if (item && item.verified_by_chq === null) {
          console.log(`Sending report for item 6-${index}:`, item);
          try {
            console.log('data 6', reportDataCH.value.six[index], reportStore.returnReport.six[index] )
            const response = await reportPartTwoService.sendMultipleReportCH(reportDataCH.value.six[index], '6', index, route.query.reportId, false, reportStore.returnReport.six[index]);
            console.log(`Successfully sent report for item 6-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 6-${index}:`, error);
          }
        } else {
          console.log(`Skipping item 6-${index} as it's already verified or doesn't exist`);
        }
      }
      for (const [index, item] of Object.entries(reportStore.reportForCheckCH.ninth)) {
        console.log('43', reportStore.reportForCheckCH.ninth[index], reportStore.reportForCheckCH.ninth[item])
        if (item && item.verified_by_chq === null) {
          console.log(`Sending report for item 9-${index}:`, item);
          try {
            console.log('data 9', reportDataCH.value.ninth[index], reportStore.returnReport.ninth[index] )
            const response = await reportPartTwoService.sendMultipleReportCH(reportDataCH.value.ninth[index], '9', index, route.query.reportId, true, reportStore.returnReport.ninth[index]);
            console.log(`Successfully sent report for item 9-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 9-${index}:`, error);
          }
        } else {
          console.log(`Skipping item 9-${index} as it's already verified or doesn't exist`);
        }
      }
      // for (let i in reportStore.reportForCheckCH.ninth) {
      //   if (reportStore.reportForCheckCH.ninth[i].verified_by_chq === null) {
      //     console.log(12, reportStore.reportForCheckCH.ninth[i])
      //     await reportPartTwoService.sendMultipleReportCH(reportDataCH.value.ninth[i], '9', i, route.query.reportId, true, reportStore.returnReport.ninth[i]);
      //   }
      // }
      if (reportStore.reportForCheckCH.tenth.first.verified_by_chq === null) {
        await reportPartTwoService.sendMultipleReportCH(reportDataCH.value.tenth.first, '10', '1', route.query.reportId, true, reportStore.returnReport.tenth.first);
      }

      if (reportStore.reportForCheckCH.tenth.second.verified_by_chq === null) {
        await reportPartTwoService.sendMultipleReportCH(reportDataCH.value.tenth.second, '10', '2', route.query.reportId, true, reportStore.returnReport.tenth.second);
      }

      if (reportStore.reportForCheckCH.eleventh.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(reportDataCH.value.eleventh, '11', route.query.reportId, true, reportStore.returnReport.eleventh);
      }

      if (reportStore.reportForCheckCH.twelfth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(reportDataCH.value.twelfth, '12', route.query.reportId, true, reportStore.returnReport.twelfth);
      }

      if (reportStore.reportForCheckCH.thirteenth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(reportDataCH.value.thirteenth, '13', route.query.reportId, true, reportStore.returnReport.thirteenth);
      }

      if (reportStore.reportForCheckCH.sixteenth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(reportDataCH.value.sixteenth, '16', route.query.reportId, true, reportStore.returnReport.sixteenth);
      }

      swal.fire({
        position: 'center',
        icon: 'success',
        // Скорректировать сообщение
        title: 'Отчет успешно верифицирован',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      blockSendButton.value = false;
      swal.fire({
        position: 'center',
        icon: 'error',
        // title: `ошибка`,
        title: `ошибка ${e.request.response}`,
        showConfirmButton: false,
        timer: 2500,
      })
      console.log('sendReportCH error: ', e)
    } finally {
      preloader.value = false;
    }
    // } else {
    //   blockSendButton.value = false;
    // }
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
  } else {
    isErrorPanel.value.first = false;
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
    if (!filteredSix[item]?.links?.length) {
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
    for (let link in filteredSix[item]?.links) {
      if (filteredSix[item]?.links[link]?.link === null || filteredSix[item]?.links[link]?.link === '') {
        isErrorPanel.value.six[item] = {
          id: item,
          error: true,
        };
        swal.fire({
          position: 'center',
          icon: 'warning',
          title: `Заполните ссылки в 6 показателе`,
          showConfirmButton: false,
          timer: 2500,
        })
        return false;
      }
    }
  }
  // // for (let item in filteredSeventh) {
  // //   if (!(filteredSeventh[item]?.links?.length && filteredSeventh[item].document && filteredSeventh[item].comment)) {
  // //     isErrorPanel.value.seventh[item] = {
  // //       id: item,
  // //       error: true,
  // //     };
  // //     swal.fire({
  // //       position: 'center',
  // //       icon: 'warning',
  // //       title: `Заполните обязательные поля в 7 показателе`,
  // //       showConfirmButton: false,
  // //       timer: 2500,
  // //     })
  // //     return false;
  // //   }
  // // }
  for (let item in filteredNinth) {
    if (!filteredNinth[item]?.links?.length) {
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
    for (let link in filteredNinth[item]?.links) {
      if (filteredNinth[item]?.links[link]?.link === null || filteredNinth[item]?.links[link]?.link === '') {
        isErrorPanel.value.ninth[item] = {
          id: item,
          error: true,
        };
        swal.fire({
          position: 'center',
          icon: 'warning',
          title: `Заполните ссылки в 9 показателе`,
          showConfirmButton: false,
          timer: 2500,
        })
        return false;
      }
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
  } else {
    isErrorPanel.value.eleventh = false;
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
  } else {
    isErrorPanel.value.twelfth = false;
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
  } else {
    isErrorPanel.value.thirteenth = false;
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

watch(
  () => roleStore.experts,

  () => {
    if (roleStore.experts?.is_district_expert) {
      districtExpert.value = true;
      console.log('окружной эксперт', districtExpert.value);
    }
    if (roleStore.experts?.is_central_expert) {

      centralExpert.value = true;
      console.log('центральный эксперт', centralExpert.value);
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

watch(
  () => route.query.reportId,

  async (newId) => {
    if (!newId) return
    preloader.value = true;
    await getReportData(newId);
  },

  {
    immediate: true,
    deep: true,
  },
);

watch(
  () => route.path,

  async (newUrl) => {
    if (roleStore.roles.regionalheadquarter_commander && typeof (route.query.reportId) === 'undefined') {
      if (newUrl.includes('reporting-ro/report-regional-two')) {
        preloader.value = true;
        console.log(1.1);
        await getReportData();
      }
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(revisionPanels.value,
  () => {
    if (revisionPanels.value.length) {
      // Временно скрываем табы Просмотра и Доработки отчета (true на false)-------------------------------

      isRevision.value = true; 
      reportStore.isReportRevision = true;
      // isRevision.value = false;

      // Временно скрываем табы в показателях для РО для доработки отчета (true на false)------------------

      isTabsForRevision.value = true;
      // isTabsForRevision.value = false;

      console.log('массив с показателями на дораб', revisionPanels.value);
      console.log('возврат на дораб', isRevision.value);
    }
  },
)

watch(
  () => picked.value,
  () => {
    //     if (picked.value === 'Просмотр отправленного отчета') {
    //       
    //     } else {
    //       
    //     }
    console.log('таб', picked.value);
  }
)

onMounted(() => {
  if (roleStore.roles.regionalheadquarter_commander && typeof (route.query.reportId) === 'undefined' && window.performance.navigation.type === 1) {
    preloader.value = true;
    getReportData();
  }
  console.log('ddd', route.query.reportId)
  getItems(6);
  getItems(9);
});

</script>
<style lang="scss">
.btn_report {
  padding: 12px 32px !important;

  @media (max-width: 480px) {
    width: 90% !important;
  }
}

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

.preloader_info {
  color: #1F7CC0;
  font-family: Akrobat;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.8px;
  padding: 40px 0 40px 0;
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

.contributorBtn {
  border-radius: 30px;
  background-color: white;
  color: #1c5c94;
  border: 1px solid #1c5c94;
  margin: 0px;
  padding: 10px 24px;
  margin: 7px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 8px 16px;
    margin: 12px 8px 0px 0px;
  }
}

.active {
  background-color: #1c5c94;
  color: white;
}

/* .active-app {
  padding-bottom: 60px;
} */

.active-tabs {
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
}
</style>