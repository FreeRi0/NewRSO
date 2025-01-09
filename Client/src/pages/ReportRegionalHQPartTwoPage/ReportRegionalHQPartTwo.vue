<template>
  <div>
    <div class="container">
      <h1 class="title title--mb">Отчет о&nbsp;деятельности регионального отделения РСО за&nbsp;2024&nbsp;год.
        Часть&nbsp;2</h1>
      <p class="report_title-name">{{ route.query.headquartersName }}</p>
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
        <div class="download-item" v-if="roleStore.experts.is_central_expert">
          <SvgIcon iconName="download" />
          <button type="button" id="download" class="download-item__report"
            @click="downloadReportAll(route.query.reportId)">
            Скачать архив
          </button>
        </div>

        <div v-else class="download-item">
          <SvgIcon iconName="download" />
          <button type="button" id="download" class="download-item__report"
            @click="downloadReportAll(roleStore.roles.regionalheadquarter_commander?.id)">
            Скачать архив
          </button>
        </div>
        <v-expansion-panels>
          <v-expansion-panel
            v-if="roleStore.experts.is_central_expert && !revisionPanels.length ? true : picked === 'Доработка' ? revisionPanels.includes('1') : picked === 'Просмотр отправленного отчета' && verifiedByChqPanels.includes('1') ? false : true">
            <v-expansion-panel-title :class="isErrorPanel.first ? 'visible-error' : ''">
              1. Численность членов РО&nbsp;РСО в&nbsp;соответствии с&nbsp;объемом уплаченных членских взносов
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <first-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                @get-data-DH="setDataDH" @get-data-CH="setDataCH" :data="reportData.first"
                :is-error-panel="isErrorPanel.first" :blockEditFirstReport="blockEditFirstReport" :tab="picked" />
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
          <v-expansion-panel
            v-if="roleStore.experts.is_central_expert && !revisionPanels.length ? true : picked === 'Доработка' ? revisionPanels.includes('4') : picked === 'Просмотр отправленного отчета' && verifiedByChqPanels.includes('4') ? false : true">
            <v-expansion-panel-title :class="isErrorPanel.fourth ? 'visible-error' : ''">
              4. Организация всероссийских (международных), окружных и&nbsp;межрегиональных мероприятий и&nbsp;проектов
              (слеты, школы, фестивали, турниры и&nbsp;прочие)
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fourth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                @get-data-DH="setDataDH" @get-data-CH="setDataCH" :data="reportData.fourth"
                :is-error-panel="isErrorPanel.fourth" :tab="picked" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            v-if="roleStore.experts.is_central_expert && !revisionPanels.length ? true : picked === 'Доработка' ? revisionPanels.includes('5') : picked === 'Просмотр отправленного отчета' && verifiedByChqPanels.includes('5') ? false : true">
            <v-expansion-panel-title :class="isErrorPanel.fifth ? 'visible-error' : ''">
              5. Организация всероссийских (международных) (организатор&nbsp;&mdash; региональное отделение РСО),
              окружных и&nbsp;межрегиональных трудовых проектов в&nbsp;соответствии с&nbsp;Положением
              об&nbsp;организации
              трудовых проектов РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fifth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                @get-data-DH="setDataDH" @get-data-CH="setDataCH" :data="reportData.fifth"
                :is-error-panel="isErrorPanel.fifth" :tab="picked" />
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
                :tab="picked" :revision-panels="revisionPanels" />
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
                :is-error-panel="isErrorPanel.ninth" :tab="picked" :revision-panels="revisionPanels" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            v-if="roleStore.experts.is_central_expert && !revisionPanels.length ? true : picked === 'Доработка' ? revisionPanels.includes('10-1') || revisionPanels.includes('10-2')
              : picked === 'Просмотр отправленного отчета' && (verifiedByChqPanels.includes('10-1') && verifiedByChqPanels.includes('10-2')) ? false : true">
            <v-expansion-panel-title :class="isErrorPanel.tenth ? 'visible-error' : ''">
              10. Организация РО&nbsp;РСО всероссийских (международных) добровольческих и&nbsp;патриотических акций
              &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <tenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data="setData"
                @getDataDHFirst="setDataDH" @getDataDHSecond="setDataDH" @getDataCHFirst="setDataCH"
                @getDataCHSecond="setDataCH" :data="reportData.tenth" :is-error-panel="isErrorPanel.tenth" :tab="picked"
                :revisionPanels="revisionPanels" />
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
          <v-expansion-panel
            v-if="roleStore.experts.is_central_expert && !revisionPanels.length ? true : picked === 'Доработка' ? revisionPanels.includes('16') : picked === 'Просмотр отправленного отчета' && verifiedByChqPanels.includes('16') ? false : true">
            <v-expansion-panel-title :class="isErrorPanel.sixteenth ? 'visible-error' : ''">
              16. Победители всероссийских (международных), окружных и&nbsp;межрегиональных трудовых проектов
              по&nbsp;комиссарской деятельности &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <sixteenth-panel :districtExpert="districtExpert" :centralExpert="centralExpert" @get-data-DH="setDataDH"
                @get-data="setData" @get-data-CH="setDataCH" :data="reportData.sixteenth"
                :is-error-panel="isErrorPanel.sixteenth" :tab="picked" />
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
    <Button class="btn_report" v-if="!preloader" variant="text" label="Отправить отчет" size="large" @click="sendReport"
      :disabled="reportStore.isAllReportsVerifiedByCH" />
  </div>
  <ReportModalWarning v-if="showModalWarning" @reportConfirmation="reportConfirmation" isCentral />
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
import { useRegionalsStore } from '@features/store/regionals';
import swal from '@/library/sweetalert2/sweetalert2.esm.all.min.js';
import {
  checkEmptyFieldsDH,
  showPanels,
} from "@pages/ReportRegionalHQPartTwoPage/Helpers.js";
import ReportModalWarning from "@pages/ReportRegionalHQPartOnePage/components/ReportModalWarning.vue";

const showModalWarning = ref(false)

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
const regionalsStore = useRegionalsStore()


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
const revisionPanels = ref([]);
const isRevision = ref(false);
const isTabsForRevision = ref(false);
const verifiedByChqPanels = ref([])

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
}

const handleReturnToRoSix = (checked) => {
  is_return_six.value = checked;
}

const handleReturnToRoNinth = (checked) => {
  is_return_ninth.value = checked;
}

const setPanelNumber = (number) => {
  panel_num.value = number;
}
const roleStore = useRoleStore();
const route = useRoute();

const downloadReportAll = async (id) => {
  try {
    const response = await HTTP.get(`/regionals/${id}/download_regional_competition_report/`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });

    // Create the Blob and download link  
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'RO_report.xlsx');
    document.body.appendChild(link);
    link.click();

    // Cleanup  
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error downloading report:', error);
  }
};

const getItems = async (eventNumber) => {
  try {
    const response = await HTTP.get(`regional_competitions/reports/event_names/r${eventNumber}-event-names/`);
    const itemMappings = {
      6: () => six_items.value = response.data,
      9: () => ninth_items.value = response.data,
    };
    itemMappings[eventNumber]?.();
  } catch (error) {
    console.error("Error fetching event names:", error);
  }
}
const handleReturnToRo = (checked) => {
  is_return_six.value = checked;
};

let isAllSixVerified = true;
let isAllNinthVerified = true;

const fetchData = async (reportType, itemId, reportId) => {
  try {
    if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
      return {
        id: itemId,
        data: (await reportPartTwoService.getMultipleReportDH(reportType, itemId, reportId)).data
      };
    } else {
      return {
        id: itemId,
        data: (await reportPartTwoService.getMultipleReport(reportType, itemId)).data
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const defaultData = {
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
      };
      return {
        id: itemId,
        data: roleStore.experts.is_district_expert || roleStore.experts.is_central_expert ? defaultData : {}
      };
    } else {
      throw error;
    }
  }
};

const getMultiplyData = async (reportId) => {
  const sixDataPromises = six_items.value.map(item => fetchData('6', item.id, reportId));
  const ninthDataPromises = ninth_items.value.map(item => fetchData('9', item.id, reportId));

  const [sixDataResults, ninthDataResults] = await Promise.all([
    Promise.all(sixDataPromises),
    Promise.all(ninthDataPromises),
  ]);

  const normalizeComment = (data) => {
    try {
      if (typeof data.comment === 'string') {
        try {
          const commentObj = JSON.parse(data.comment);
          if (commentObj && typeof commentObj === 'object' && 'comment' in commentObj) {
            data.comment = commentObj.comment;
          }
        } catch (commentError) {
          console.error('Error parsing comment:', commentError);
        }
      }
      data.comment = data.comment || null;

    } catch (error) {
      console.error(`Error parsing data for ${panelId}-${resultId}:`, error);
    }
  }


  const processDistrictExpertData = (data, resultId, panelId) => {
    normalizeComment(data);
    if (data?.regional_version) {
      try {
        reportData.value[panelId][resultId] = JSON.parse(data.regional_version);
      } catch (error) {
        console.error(`Error parsing regional_version JSON ${panelId}-DH:`, error);
        reportData.value[panelId][resultId] = data.regional_version || data;
      }
    } else {
      reportData.value[panelId][resultId] = data;
    }

    reportStore.reportDataDH[panelId][resultId] = { ...data };
    reportStore.reportDataDH[panelId][resultId].comment = '';
  };


  const processCentralExpertData = (data, resultId, panelId) => {
    const panelKey = panelId === '6' ? 'six' : 'ninth';

    normalizeComment(data);

    reportStore.reportForCheckCH[panelKey][resultId] = data;
    reportData.value[panelKey][resultId] = data;
    reportStore.reportDataDH[panelKey][resultId] = data;

    if (typeof data.rejecting_reasons === 'string') {
      data.rejecting_reasons = JSON.parse(data.rejecting_reasons);
    }

    if (data.rejecting_reasons && data.verified_by_chq !== true) {
      if (!revisionPanels.value.find((item) => item === panelId)) {
        revisionPanels.value.push(panelId);
      }
      revisionPanels.value.push(`${panelId}-${resultId}`);
    }

    // Обработка regional_version
    if (data.regional_version) {
      try {
        let regionalVersion = data.regional_version;
        if (typeof regionalVersion === 'string') {
          regionalVersion = JSON.parse(regionalVersion);
        }
        if (panelId === '6' && regionalVersion.regional_version?.regional_version) {
          reportData.value[panelKey][resultId] = regionalVersion.regional_version.regional_version;
        } else {
          reportData.value[panelKey][resultId] = regionalVersion.regional_version || regionalVersion;
        }
      } catch (error) {
        console.error(`Error parsing regional_version JSON ${panelId}-CH-RH:`, error);
        reportData.value[panelKey][resultId] = data.regional_version || data;
      }
    } else {
      reportData.value[panelKey][resultId] = data;
    }

    // Обработка district_version
    if (data.district_version) {
      try {
        reportStore.reportDataDH[panelKey][resultId] =
          typeof data.district_version === 'string'
            ? JSON.parse(data.district_version)
            : data.district_version;
      } catch (error) {
        console.error(`Error parsing district_version JSON-${panelId}-CH-DH:`, error);
        reportStore.reportDataDH[panelKey][resultId] = data.district_version || data;
      }
    } else {
      reportStore.reportDataDH[panelKey][resultId] = data;
    }

    reportStore.reportDataCH[panelKey][resultId] = { ...data };
    reportStore.reportDataCH[panelKey][resultId].comment =
      data.verified_by_chq === null ? null : (data.comment || '');
  };

  const processCommonData = (data, resultId, panelId) => {
    normalizeComment(data);
    const parseVersion = (version) => {
      try {
        if (typeof version === 'object') {
          return JSON.parse(JSON.stringify(version.regional_version || version));
        } else if (typeof version === 'string') {
          return JSON.parse(version);
        }
        throw new Error('Invalid type for version');
      } catch (error) {
        console.error(`Error parsing ${panelId} version JSON:`, error);
        return version;
      }
    };

    if (data?.regional_version) {
      reportData.value[panelId][resultId] = parseVersion(data?.regional_version);
    } else {
      reportData.value[panelId][resultId] = data;
    }

    if (data?.district_version) {
      try {
        reportStore.reportDataDH[panelId][resultId] = parseVersion(data.district_version);
      } catch (error) {
        console.error(`Error parsing district_version JSON-${panelId}-RH-DH:`, error);
        reportStore.reportDataDH[panelId][resultId] = data.district_version || data;
      }
    }

    reportStore.reportDataCH[panelId][resultId] = data?.central_version || data;

    const processPanelRevision = (panelId, resultId) => {
      if (!revisionPanels.value.includes(panelId)) {
        revisionPanels.value.push(panelId);
      }
      revisionPanels.value.push(`${panelId}-${resultId}`);

      const panelKey = panelId === '6' ? 'six' : 'ninth';
      reportStore.isReportReject[panelKey][resultId] = isTabsForRevision.value;
    };

    if (data?.rejecting_reasons && data?.verified_by_chq !== true) {
      processPanelRevision('6', resultId);
      processPanelRevision('9', resultId);
    }

    if (!data?.verified_by_chq) {
      if (panelId === '6') {
        isAllSixVerified = false;
      } else if (panelId === '9') {
        isAllNinthVerified = false;
      }
    }
  };

  const processDataResults = (dataResults, panelId) => {
    dataResults.forEach((result) => {
      const data = result.data;
      const resultId = result.id;
      const panelKey = panelId === '6' ? 'six' : 'ninth';

      if (districtExpert.value) {
        processDistrictExpertData(data, resultId, panelKey);
      } else if (centralExpert.value) {
        processCentralExpertData(data, resultId, panelId);
      } else {
        processCommonData(data, resultId, panelKey);
      }
    });
  };

  // Обработка данных для шестой панели
  processDataResults(sixDataResults, '6');

  // Обработка данных для девятой панели
  processDataResults(ninthDataResults, '9');
}

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
      if (reportStore.reportDataCH.first.rejecting_reasons) {
        reportStore.reportDataCH.first.comment = JSON.parse(reportStore.reportDataCH.first.rejecting_reasons).comment;
      } else {
        reportStore.reportDataCH.first.comment = '';
      }
      if (reportStore.reportForCheckCH.first.verified_by_chq) verifiedByChqPanels.value.push('1')

      /*
      * Критерий 4
      */
      reportStore.reportForCheckCH.fourth = (await reportPartTwoService.getReportDH('4', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.fourth.events = (await reportPartTwoService.getReportDH('4', reportId)).data.events;
      if (reportStore.reportForCheckCH.fourth.rejecting_reasons) {
        reportStore.reportDataCH.fourth.comment = JSON.parse(reportStore.reportForCheckCH.fourth.rejecting_reasons).comment;
      }
      if (reportStore.reportForCheckCH.fourth.verified_by_chq) verifiedByChqPanels.value.push('4')
      /*
      * Критерий 5
      */
      reportStore.reportForCheckCH.fifth = (await reportPartTwoService.getReportDH('5', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.fifth.events = (await reportPartTwoService.getReportDH('5', reportId)).data.events;
      if (reportStore.reportForCheckCH.fifth.rejecting_reasons) {
        reportStore.reportDataCH.fifth.comment = JSON.parse(reportStore.reportForCheckCH.fifth.rejecting_reasons).comment;
      }
      if (reportStore.reportForCheckCH.fifth.verified_by_chq) verifiedByChqPanels.value.push('5')
      //   revisionPanels.value.push('5');
      // if (reportStore.reportForCheckCH.fifth.rejecting_reasons) reportStore.isReportReject.fifth = true;
      // console.log('reportStore.isReportReject', reportStore.isReportReject)
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
      if (reportStore.reportDataCH.tenth.first.rejecting_reasons) {
        reportStore.reportDataCH.tenth.first.comment = JSON.parse(reportStore.reportDataCH.tenth.first.rejecting_reasons).comment;
      } else {
        reportStore.reportDataCH.tenth.first.comment = '';
      }
      // reportStore.reportDataCH.tenth.first.comment = ''
      if (reportStore.reportForCheckCH.tenth.first.verified_by_chq) verifiedByChqPanels.value.push('10-1')
      /*
      * Критерий 10-2
      */
      reportStore.reportForCheckCH.tenth.second = (await reportPartTwoService.getMultipleReportDH('10', '2', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.tenth.second = (await reportPartTwoService.getMultipleReportDH('10', '2', reportId)).data;
      if (reportStore.reportDataCH.tenth.second.rejecting_reasons) {
        reportStore.reportDataCH.tenth.second.comment = JSON.parse(reportStore.reportDataCH.tenth.second.rejecting_reasons).comment;
      } else {
        reportStore.reportDataCH.tenth.second.comment = '';
      }
      // reportStore.reportDataCH.tenth.second.comment = ''
      if (reportStore.reportForCheckCH.tenth.second.verified_by_chq) verifiedByChqPanels.value.push('10-2')
      /*
      * Критерий 16
      */
      reportStore.reportForCheckCH.sixteenth = (await reportPartTwoService.getReportDH('16', reportId)).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.sixteenth.projects = (await reportPartTwoService.getReportDH('16', reportId)).data.projects;
      reportStore.reportDataCH.sixteenth.isProject = (await reportPartTwoService.getReportDH('16', reportId)).data.is_project;

      if (reportStore.reportForCheckCH.sixteenth.rejecting_reasons) {
        reportStore.reportDataCH.sixteenth.comment = JSON.parse(reportStore.reportForCheckCH.sixteenth.rejecting_reasons).comment;
        reportStore.reportDataCH.sixteenth.isProject = reportStore.reportForCheckCH.sixteenth.central_version?.is_project;
      }
      if (reportStore.reportForCheckCH.sixteenth.verified_by_chq) verifiedByChqPanels.value.push('16')
      /* 
      * Критерий 11
      */
      const dataEleventh = (await reportPartTwoService.getReportDH('11', reportId)).data;
      reportStore.reportForCheckCH.eleventh = dataEleventh;

      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (dataEleventh.rejecting_reasons && dataEleventh.verified_by_chq !== true) {
        revisionPanels.value.push('11');
      }

      dataEleventh.regional_version
        ? reportData.value.eleventh = JSON.parse(dataEleventh.regional_version)
        : reportData.value.eleventh = dataEleventh;

      dataEleventh.district_version
        ? reportStore.reportDataDH.eleventh = JSON.parse(dataEleventh.district_version)
        : reportStore.reportDataDH.eleventh = dataEleventh;

      reportStore.reportDataCH.eleventh = Object.assign({}, dataEleventh);
      if (!dataEleventh.rejecting_reasons) {
        reportStore.reportDataCH.eleventh.comment = ''
      } else if (dataEleventh.rejecting_reasons) {
        reportStore.reportDataCH.eleventh.comment = JSON.parse(reportStore.reportDataCH.eleventh.rejecting_reasons).comment
      }
      if (dataEleventh.verified_by_chq === true) {
        reportStore.reportDataCH.eleventh.comment = dataEleventh.comment
      }

      /* 
      * Критерий 12
      */
      const dataTwelfth = (await reportPartTwoService.getReportDH('12', reportId)).data;
      reportStore.reportForCheckCH.twelfth = dataTwelfth;

      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (dataTwelfth.rejecting_reasons && dataTwelfth.verified_by_chq !== true) {
        revisionPanels.value.push('12');
      }

      dataTwelfth.regional_version
        ? reportData.value.twelfth = JSON.parse(dataTwelfth.regional_version)
        : reportData.value.twelfth = dataTwelfth;

      dataTwelfth.district_version
        ? reportStore.reportDataDH.twelfth = JSON.parse(dataTwelfth.district_version)
        : reportStore.reportDataDH.twelfth = dataTwelfth;

      reportStore.reportDataCH.twelfth = Object.assign({}, dataTwelfth);
      if (!dataTwelfth.rejecting_reasons) {
        reportStore.reportDataCH.twelfth.comment = ''
      } else if (dataTwelfth.rejecting_reasons) {
        reportStore.reportDataCH.twelfth.comment = JSON.parse(reportStore.reportDataCH.twelfth.rejecting_reasons).comment
      }
      if (dataTwelfth.verified_by_chq === true) {
        reportStore.reportDataCH.twelfth.comment = dataTwelfth.comment
      }

      /* 
      * Критерий 13
      */
      const dataThirteenth = (await reportPartTwoService.getReportDH('13', reportId)).data;
      reportStore.reportForCheckCH.thirteenth = dataThirteenth;

      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (dataThirteenth.rejecting_reasons && dataThirteenth.verified_by_chq !== true) {
        revisionPanels.value.push('13');
      }

      dataThirteenth.regional_version
        ? reportData.value.thirteenth = JSON.parse(dataThirteenth.regional_version)
        : reportData.value.thirteenth = dataThirteenth;

      dataThirteenth.district_version
        ? reportStore.reportDataDH.thirteenth = JSON.parse(dataThirteenth.district_version)
        : reportStore.reportDataDH.thirteenth = dataThirteenth;

      reportStore.reportDataCH.thirteenth = Object.assign({}, dataThirteenth);
      if (!dataThirteenth.rejecting_reasons) {
        reportStore.reportDataCH.thirteenth.comment = ''
      } else if (dataThirteenth.rejecting_reasons) {
        reportStore.reportDataCH.thirteenth.comment = JSON.parse(reportStore.reportDataCH.thirteenth.rejecting_reasons).comment
      }
      if (dataThirteenth.verified_by_chq === true) {
        reportStore.reportDataCH.thirteenth.comment = dataThirteenth.comment
      }

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
      /*-------------1-------------*/
      let dataFirst;
      try {
        // reportData.value.first = (await reportPartTwoService.getReport('1')).data;
        dataFirst = (await reportPartTwoService.getReport('1')).data;
        if (!dataFirst.regional_version && !dataFirst.central_version) {
          reportData.value.first = dataFirst;
        } else {
          if (dataFirst.rejecting_reasons) {
            reportStore.isReportReject.first = isTabsForRevision.value // true;
            reportStore.reportReject.first = dataFirst;

            if (!dataFirst.verified_by_chq) revisionPanels.value.push('1');
          }

          if (dataFirst.central_version) {
            reportData.value.first = dataFirst;
          } else {
            reportData.value.first = JSON.parse(dataFirst.regional_version);
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataFirst.verified_by_chq && !dataFirst.rejecting_reasons) {
            reportStore.reportReject.first = dataFirst;
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      /*------------4--------------*/
      let dataFourth;
      try {
        dataFourth = (await reportPartTwoService.getReport('4')).data;
        if (!dataFourth.regional_version && !dataFourth.central_version) {
          reportData.value.fourth = dataFourth;
        } else {
          if (dataFourth.rejecting_reasons) {
            reportStore.isReportReject.fourth = isTabsForRevision.value // true;
            reportStore.reportReject.fourth = dataFourth;

            if (!dataFourth.verified_by_chq) revisionPanels.value.push('4');
          }

          if (dataFourth.central_version) {
            reportData.value.fourth = dataFourth;
          } else {
            reportData.value.fourth = JSON.parse(dataFourth.regional_version);
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataFourth.verified_by_chq && !dataFourth.rejecting_reasons) {
            reportStore.reportReject.fourth = dataFourth;
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      /*------------5--------------*/
      let dataFifth;
      try {
        dataFifth = (await reportPartTwoService.getReport('5')).data;
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

            if (!dataFifth.verified_by_chq) revisionPanels.value.push('5');
          }

          if (dataFifth.central_version) {
            reportData.value.fifth = dataFifth;
          } else {
            reportData.value.fifth = JSON.parse(dataFifth.regional_version);
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataFifth.verified_by_chq && !dataFifth.rejecting_reasons) {
            reportStore.reportReject.fifth = dataFifth;
          }
        }
      } catch (e) {
        console.log(e.message)
      }

      try {
        await getMultiplyData();
      } catch (e) {
        console.error('Error in six_items processing:', e);
      }
      /*------------10-1--------------*/
      let dataTenthFirst;
      try {
        // reportData.value.tenth.first = (await reportPartTwoService.getMultipleReport('10', '1')).data;
        dataTenthFirst = (await reportPartTwoService.getMultipleReport('10', '1')).data;
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

            if (!dataTenthFirst.verified_by_chq) revisionPanels.value.push('10-1');
            if (dataTenthFirst.verified_by_chq) reportStore.isReportReject.tenth.first = false;
          }

          if (dataTenthFirst.central_version) {
            reportData.value.tenth.first = dataTenthFirst;
          } else {
            reportData.value.tenth.first = JSON.parse(dataTenthFirst.regional_version);
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataTenthFirst.verified_by_chq && !dataTenthFirst.rejecting_reasons) {
            reportStore.reportReject.tenth.first = dataTenthFirst;
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      /*------------10-2--------------*/
      let dataTenthSecond;
      try {
        // reportData.value.tenth.second = (await reportPartTwoService.getMultipleReport('10', '2')).data;
        dataTenthSecond = (await reportPartTwoService.getMultipleReport('10', '2')).data;
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

            if (!dataTenthSecond.verified_by_chq) revisionPanels.value.push('10-2');
            if (dataTenthSecond.verified_by_chq) reportStore.isReportReject.tenth.second = false;
          }

          if (dataTenthSecond.central_version) {
            reportData.value.tenth.second = dataTenthSecond;
          } else {
            reportData.value.tenth.second = JSON.parse(dataTenthSecond.regional_version);
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataTenthSecond.verified_by_chq && !dataTenthSecond.rejecting_reasons) {
            reportStore.reportReject.tenth.second = dataTenthSecond;
          }
        }
      } catch (e) {
        console.log(e.message)
      }
      //-----------------11------------------------------------------
      let dataEleventh;
      try {
        dataEleventh = (await reportPartTwoService.getReport('11')).data;
        console.log(dataEleventh);
        dataEleventh.regional_version
          ? reportData.value.eleventh = JSON.parse(dataEleventh.regional_version)
          : reportData.value.eleventh = dataEleventh;

        dataEleventh.district_version
          ? reportStore.reportDataDH.eleventh = JSON.parse(dataEleventh.district_version)
          : reportStore.reportDataDH.eleventh = dataEleventh;

        dataEleventh.central_version
          ? reportStore.reportDataCH.eleventh = dataEleventh.central_version
          : reportStore.reportDataCH.eleventh = dataEleventh;

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataEleventh.rejecting_reasons && dataEleventh.verified_by_chq !== true) {
          revisionPanels.value.push('11');
          reportStore.isReportReject.eleventh = isTabsForRevision.value;
        }
      } catch (e) {
        console.log(e.message)
      }
      //-----------------12-------------------------------------------
      let dataTwelfth;
      try {
        dataTwelfth = (await reportPartTwoService.getReport('12')).data;
        console.log(dataTwelfth);
        dataTwelfth.regional_version
          ? reportData.value.twelfth = JSON.parse(dataTwelfth.regional_version)
          : reportData.value.twelfth = dataTwelfth;

        dataTwelfth.district_version
          ? reportStore.reportDataDH.twelfth = JSON.parse(dataTwelfth.district_version)
          : reportStore.reportDataDH.twelfth = dataTwelfth;

        dataTwelfth.central_version
          ? reportStore.reportDataCH.twelfth = dataTwelfth.central_version
          : reportStore.reportDataCH.twelfth = dataTwelfth;

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataTwelfth.rejecting_reasons && dataTwelfth.verified_by_chq !== true) {
          revisionPanels.value.push('12');
          reportStore.isReportReject.twelfth = isTabsForRevision.value;
        }
      } catch (e) {
        console.log(e.message)
      }
      //-----------------13-------------------------------------------
      let dataThirteenth
      try {
        dataThirteenth = (await reportPartTwoService.getReport('13')).data;
        console.log(dataThirteenth);
        dataThirteenth.regional_version
          ? reportData.value.thirteenth = JSON.parse(dataThirteenth.regional_version)
          : reportData.value.thirteenth = dataThirteenth;

        dataThirteenth.district_version
          ? reportStore.reportDataDH.thirteenth = JSON.parse(dataThirteenth.district_version)
          : reportStore.reportDataDH.thirteenth = dataThirteenth;

        dataThirteenth.central_version
          ? reportStore.reportDataCH.thirteenth = dataThirteenth.central_version
          : reportStore.reportDataCH.thirteenth = dataThirteenth;

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataThirteenth.rejecting_reasons && dataThirteenth.verified_by_chq !== true) {
          revisionPanels.value.push('13');
          reportStore.isReportReject.thirteenth = isTabsForRevision.value;
        }
      } catch (e) {
        console.log(e.message)
      }
      //-----------------------------16--------------------------------
      let dataSixteenth;
      try {
        // reportData.value.sixteenth = (await reportPartTwoService.getReport('16')).data;
        // if (reportData.value.sixteenth.is_sent) {
        //   blockSendButton.value = true;
        //   blockEditFirstReport.value = true;
        // }

        dataSixteenth = (await reportPartTwoService.getReport('16')).data;
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

            if (!dataSixteenth.verified_by_chq) revisionPanels.value.push('16');
          }

          if (dataSixteenth.central_version) {
            reportData.value.sixteenth = dataSixteenth;
          } else {
            reportData.value.sixteenth = JSON.parse(dataSixteenth.regional_version);
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataSixteenth.verified_by_chq && !dataSixteenth.rejecting_reasons) {
            reportStore.reportReject.sixteenth = dataSixteenth;
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

      if (
        dataFirst.verified_by_chq &&
        dataFourth.verified_by_chq &&
        dataFifth.verified_by_chq &&
        dataTenthFirst.verified_by_chq &&
        dataTenthSecond.verified_by_chq &&
        isAllSixVerified && isAllNinthVerified &&
        dataEleventh.verified_by_chq &&
        dataTwelfth.verified_by_chq &&
        dataThirteenth.verified_by_chq &&
        dataSixteenth.verified_by_chq
      ) {
        reportStore.isAllReportsVerifiedByCH = true;
      }
    }
  } catch (e) {
    console.log('getReportData error: ', e.message)
  } finally {
    preloader.value = false;
  }
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
      break;
    case 9:
      reportDataDH.value.ninth[number] = data;
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
      break;
    case 12:
      reportDataDH.value.twelfth = data;
      break;
    case 13:
      reportDataDH.value.thirteenth = data;
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
      break;
    case 9:
      reportDataCH.value.ninth[number] = data;
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
      break;
    case 12:
      reportDataCH.value.twelfth = data;
      break;
    case 13:
      reportDataCH.value.thirteenth = data;
      break;
    case 16:
      reportDataCH.value.sixteenth = data;
      console.log('16', ...reportDataCH.value.sixteenth);
      break;
  }
}

const filterPanelsData = () => {
  const filterPanel = (data, condition) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (condition(value)) {
        acc[key] = value;
        isErrorPanel.value[data === reportData.value.six ? 'six' : 'ninth'][key] = {
          id: key,
          error: false,
        };
      }
      return acc;
    }, {});
  };

  const filteredSix = filterPanel(reportData.value.six, item =>
    item.number_of_members > 0 &&
    item.number_of_members !== null &&
    !item.is_sent &&
    Object.values(item).some(value => value !== null && value !== undefined)
  );

  const filteredNinth = filterPanel(reportData.value.ninth, item =>
    item.event_happened !== false &&
    !item.is_sent &&
    Object.values(item).some(value => value !== null && value !== undefined)
  );

  return { filteredSix, filteredNinth };
};

const sendReport = async () => {
  if (!(districtExpert.value || centralExpert.value)) {
    blockSendButton.value = true;
    if (checkEmptyFields(reportData.value)) {
      preloader.value = true;
      try {
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
            const response = await reportPartTwoService.sendReportDHMultiply(reportStore.reportDataDH.six[index], '6', index, route.query.reportId);
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
            reportStore.reportDataDH.ninth[index].document = reportStore.reportDataDHFile.ninth[index]
            const response = await reportPartTwoService.sendReportDHMultiply(
              reportStore.reportDataDH.ninth[index],
              '9', index, route.query.reportId, true);
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
  }

  if (centralExpert.value) {
    showModalWarning.value = true
  }
};
const reportConfirmation = async (value) => {
  if (value) {
    showModalWarning.value = false;
    blockSendButton.value = true;
    preloader.value = true;

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
      for (const [index, item] of Object.entries(reportStore.reportForCheckCH.six)) {
        if (item && item.verified_by_chq === null) {
          console.log(`Sending report for item 6-${index}:`, item);
          try {
            console.log('data 6', reportDataCH.value.six[index], reportStore.returnReport.six[index])
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
          // reportStore.reportDataDH.ninth[index].document = reportStore.reportDataDHFile.ninth[index]
          try {
            console.log('data 9', reportDataCH.value.ninth[index], reportStore.returnReport.ninth[index])
            const response = await reportPartTwoService.sendMultipleReportCH(reportDataCH.value.ninth[index], '9', index, route.query.reportId, true, reportStore.returnReport.ninth[index]);
            console.log(`Successfully sent report for item 9-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 9-${index}:`, error);
          }
        } else {
          console.log(`Skipping item 9-${index} as it's already verified or doesn't exist`);
        }
      }
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
  } else {
    showModalWarning.value = false;
  }
}

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
  for (let item in filteredNinth) {
    console.log('filteredNinth[item]', filteredNinth[item])
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
    }
    if (roleStore.experts?.is_central_expert) {

      centralExpert.value = true;
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
  () => route.fullPath,

  async (newUrl) => {
    if (newUrl && typeof (route.query.reportId) === 'undefined') {
      if (newUrl.includes('/reporting-ro/report-regional-two')) {
        preloader.value = true;
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
      isRevision.value = true;
      reportStore.isReportRevision = true;
      isTabsForRevision.value = true;
    }
  },
)

onMounted(() => {
  if (roleStore.roles.regionalheadquarter_commander && typeof (route.query.reportId) === 'undefined' && window.performance.navigation.type === 1) {
    preloader.value = true;
    getReportData();
  }
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

.report_title-name {
  font-family: Bert Sans;
  font-size: 18px;
  font-weight: 500;
  line-height: 22.1px;
  text-align: left;
  margin-bottom: 20px;
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