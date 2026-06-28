<template>
  <div>
    <div class="container">
      <h1 class="title title--mb">
        Отчет о&nbsp;деятельности регионального отделения РСО за&nbsp;2026&nbsp;год.
      </h1>
      <p class="report_title-name">{{ route.query.headquartersName }}</p>
      <div v-if="preloader" class="text-center">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
        <p class="preloader_info">{{ preloader_text }}</p>
      </div>
      <div v-else>
        <div
          class="d-flex mt-9 mb-9 active-tabs"
          v-if="
            !(
              roleStore.experts.is_district_expert || roleStore.experts.is_central_expert
            ) && isRevision
          "
        >
          <button
            class="contributorBtn"
            :class="{ active: picked === tab.name }"
            v-for="tab in tabs"
            :key="tab.id"
            @click="picked = tab.name"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="download-item" v-if="roleStore.experts.is_central_expert">
          <SvgIcon iconName="download" />
          <button
            type="button"
            id="download"
            class="download-item__report"
            @click="downloadReportAll(route.query.reportId)"
          >
            Скачать архив
          </button>
        </div>

        <div v-else class="download-item">
          <SvgIcon iconName="download" />
          <button
            type="button"
            id="download"
            class="download-item__report"
            @click="downloadReportAll(roleStore.roles.regionalheadquarter_commander?.id)"
          >
            Скачать архив
          </button>
        </div>
        <v-expansion-panels>
          <v-expansion-panel v-if="showPanels('1', picked, revisionPanels)">
            <!--            v-if="roleStore.experts.is_central_expert && !revisionPanels.length ? true : picked === 'Доработка' ? revisionPanels.includes('1') : picked === 'Просмотр отправленного отчета' && verifiedByChqPanels.includes('1') ? false : true"-->
            <v-expansion-panel-title :class="isErrorPanel.first ? 'visible-error' : ''">
              1. Численность членов РО РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <first-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data="setData"
                @get-data-DH="setDataDH"
                @get-data-CH="setDataCH"
                :data="reportData.first"
                @get-data-children="setDataChildren"
                :is-error-panel="isErrorPanel.first"
                :is-error-panel-children="isErrorPanelChildren"
                :blockEditFirstReport="blockEditFirstReport"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            v-if="showPanels('1.1', picked, revisionPanels)"
          ></v-expansion-panel>
          <v-expansion-panel
            v-if="showPanels('1.2', picked, revisionPanels)"
          ></v-expansion-panel>
          <v-expansion-panel v-if="showPanels('2', picked, revisionPanels)">
            <v-expansion-panel-title>
              2. Динамика численности членов РО&nbsp;РСО по&nbsp;отношению
              к&nbsp;предыдущему году
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('3', picked, revisionPanels)">
            <v-expansion-panel-title>
              3. Отношение численности членов РО&nbsp;РСО к&nbsp;численности студентов
              очной формы обучения субъекта Российской Федерации, обучающихся в&nbsp;ПОО
              и&nbsp;ООВО в&nbsp;государственных, муниципальных и&nbsp;частных
              образовательных организациях, включая филиалы (исключения&nbsp;&mdash;
              учебные заведения специальных ведомств, проводящих обучение
              на&nbsp;казарменном положении)
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('4', picked, revisionPanels)">
            <v-expansion-panel-title :class="isErrorPanel.fourth ? 'visible-error' : ''">
              4. Отношение количества трудоустроенных членов РО&nbsp;РСО, прошедших
              профобучение к&nbsp;общему фактическому показателю численности членов
              РО&nbsp;РСО, прошедших профобучение в&nbsp;РО на&nbsp;текущий период
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <four-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data-DH="setDataDH"
                @get-data="setData"
                @get-data-CH="setDataCH"
                :data="reportData.fourth"
                :is-error-panel="isErrorPanel.fourth"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('5', picked, revisionPanels)">
            <v-expansion-panel-title :class="isErrorPanel.fifth ? 'visible-error' : ''">
              5. Организация межрегиональных, окружных, всероссийских и&nbsp;международных
              мероприятий и&nbsp;проектов (слеты, школы, фестивали, турниры и&nbsp;прочие)
              &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fourth-panel
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
            <v-expansion-panel-title :class="isErrorPanel.sixth ? 'visible-error' : ''">
              6. Организация трудовых проектов в&nbsp;соответствии с&nbsp;Положением
              об&nbsp;организации трудовых проектов РСО (организатор&nbsp;&mdash;
              региональное отделение РСО)
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <fifth-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data="setData"
                @get-data-DH="setDataDH"
                @get-data-CH="setDataCH"
                :data="reportData.sixth"
                :is-error-panel="isErrorPanel.sixth"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('7', picked, revisionPanels)">
            <v-expansion-panel-title
              :class="
                Object.values(isErrorPanel.six).some((item) => item.error === true)
                  ? 'visible-error'
                  : ''
              "
            >
              7. Участие бойцов студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских
              и&nbsp;международных мероприятиях и&nbsp;проектах (в&nbsp;том числе
              и&nbsp;трудовых) &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <new-sixth-panel
                @get-data="setData"
                @get-data-DH="setDataDH"
                @get-data-CH="setDataCH"
                :items="six_items"
                @getId="setId"
                @getPanelNumber="setPanelNumber"
                :district-expert="districtExpert"
                :data="reportData.six"
                :central-expert="centralExpert"
                :is-error-panel="isErrorPanel.six"
                :tab="picked"
                :revision-panels="revisionPanels"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('8', picked, revisionPanels)">
            <v-expansion-panel-title>
              8. Победители студенческих отрядов РО&nbsp;РСО во&nbsp;всероссийских
              и&nbsp;международных трудовых проектах и&nbsp;конкурсах &laquo;К&raquo;.
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('9', picked, revisionPanels)">
            <v-expansion-panel-title>
              9. Победители межрегиональных, окружных, всероссийских и&nbsp;международных
              трудовых проектов по&nbsp;комиссарской деятельности &laquo;К&raquo;.
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('10', picked, revisionPanels)">
            <v-expansion-panel-title
              :class="
                Object.values(isErrorPanel.ninth).some((item) => item.error === true)
                  ? 'visible-error'
                  : ''
              "
            >
              10. Организация обязательных общесистемных мероприятий РСО
              на&nbsp;региональном уровне &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ninth-panel
                @get-data="setData"
                @get-data-DH="setDataDH"
                @getId="setId"
                @get-data-CH="setDataCH"
                @getPanelNumber="setPanelNumber"
                :items="ninth_items"
                :district-headquarter-commander="districtExpert"
                :data="reportData.ninth"
                :central-headquarter-commander="centralExpert"
                :is-error-panel="isErrorPanel.ninth"
                :tab="picked"
                :revision-panels="revisionPanels"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel
            v-if="
              roleStore.experts.is_central_expert && !revisionPanels.length
                ? true
                : picked === 'Доработка'
                ? revisionPanels.includes('11-1') || revisionPanels.includes('11-2')
                : picked === 'Просмотр отправленного отчета' &&
                  verifiedByChqPanels.includes('11-1') &&
                  verifiedByChqPanels.includes('11-2')
                ? false
                : true
            "
          >
            <v-expansion-panel-title
              :class="isErrorPanel.eleventh ? 'visible-error' : ''"
            >
              11. Организация РО&nbsp;РСО всероссийских (международных) добровольческих
              и&nbsp;патриотических акций &laquo;К&raquo;
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
                :data="reportData.eleventh"
                :is-error-panel="isErrorPanel.eleventh"
                :tab="picked"
                :revisionPanels="revisionPanels"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('12', picked, revisionPanels)">
            <v-expansion-panel-title :class="isErrorPanel.twelfth ? 'visible-error' : ''">
              12. Показатель участия во&nbsp;Всероссийском дне ударного труда
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <twelfth-panel
                :districtExpert="districtExpert"
                :centralExpert="centralExpert"
                @get-data="setData"
                @get-data-DH="setDataDH"
                @get-data-CH="setDataCH"
                :data="reportData.twelfth"
                :is-error-panel="isErrorPanel.twelfth"
                :tab="picked"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('13', picked, revisionPanels)">
            <v-expansion-panel-title>
              13. Количество упоминаний в&nbsp;СМИ о&nbsp;прошедших творческих,
              добровольческих и&nbsp;патриотических мероприятиях и&nbsp;трудовых проектах,
              организованных РО&nbsp;РСО &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных сервиса &laquo;Медиалогия&raquo;, предоставленных Аппаратом РСО."
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('14', picked, revisionPanels)">
            <v-expansion-panel-title>
              14. Активность РО&nbsp;РСО в&nbsp;социальных сетях &laquo;К&raquo;
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-if="showPanels('15', picked, revisionPanels)">
            <v-expansion-panel-title>
              15. Исполнительская дисциплина РО&nbsp;РСО
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <calculated-panel
                text="Показатель рассчитывается автоматически на&nbsp;основе данных, предоставленных Аппаратом РСО."
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <Button
      class="btn_report"
      v-if="!preloader"
      variant="text"
      label="Отправить отчет"
      size="large"
      @click="sendReport"
      :disabled="reportStore.isAllReportsVerifiedByCH"
    />

    <p v-if="!preloader" class="text text-center">
      Срок предоставления отчета — 15&nbsp;октября 2026&nbsp;года включительно.
    </p>
  </div>
  <ReportModalWarning
    v-if="showModalWarning"
    @reportConfirmation="reportConfirmation"
    isCentral
  />
</template>
<script setup>
import {
  CalculatedPanel,
  FirstPanel,
  FourPanel,
  FourthPanel,
  FifthPanel,
  NinthPanel,
  TenthPanel,
  TwelfthPanel,
} from "./components/index";
import NewSixthPanel from "./components/newSixthPanel.vue";
import { Button } from "@shared/components/buttons";
import { onMounted, ref, watch } from "vue";
import { SvgIcon } from "@shared/ui/SvgIcon";
import { useRoleStore } from "@layouts/store/role.ts";
import { HTTP } from "@app/http";
import { reportPartTwoService, getReportForSecond } from "@services/ReportService.ts";
import { useRoute, useRouter } from "vue-router";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";
// import { useRegionalsStore } from "@features/store/regionals";
import swal from "@/library/sweetalert2/sweetalert2.esm.all.min.js";
import {
  checkEmptyFieldsDH,
  showPanels,
} from "@pages/ReportRegionalHQPartTwoPage/Helpers.js";
import ReportModalWarning from "@pages/ReportRegionalHQPartOnePage/components/ReportModalWarning.vue";

const showModalWarning = ref(false);

const picked = ref("Просмотр отправленного отчета");
const tabs = ref([
  {
    id: "1",
    name: "Просмотр отправленного отчета",
  },
  {
    id: "2",
    name: "Доработка",
  },
]);

const reportStore = useReportPartTwoStore();
// const regionalsStore = useRegionalsStore();

const districtExpert = ref(false);
const centralExpert = ref(false);
const reportData = ref({
  first: null,
  firstChildren: null,
  fourth: null,
  fifth: null,
  sixth: null,
  six: {},
  ninth: {},
  eleventh: {
    first: null,
    second: null,
  },
  twelfth: null,
});

const reportDataDH = ref({
  first: null,
  fourth: null,
  fifth: null,
  sixth: null,
  six: {},
  ninth: {},
  eleventh: {
    first: null,
    second: null,
  },
  twelfth: null,
});

const reportDataCH = ref({
  first: null,
  fourth: null,
  fifth: null,
  sixth: null,
  six: {},
  ninth: {},
  eleventh: {
    first: null,
    second: null,
  },
  twelfth: null,
});

const preloader = ref(true);
const panel_id = ref(1);
const panel_num = ref(null);
const six_items = ref([]);
const ninth_items = ref([]);
// const is_return_six = ref(false);
// const is_return_ninth = ref(false);
const blockSendButton = ref(false);
const isSentLastIndex = ref(false);
const blockEditFirstReport = ref(false);
const preloader_text = ref("Загрузка отчета может занять до 1 минуты.");

const router = useRouter();

const isErrorPanel = ref({
  first: false,
  fourth: false,
  fifth: false,
  sixth: false,
  six: {},
  ninth: {},
  eleventh: false,
  // eleventh: {
  //   first: false,
  //   second: false,
  // },
  twelfth: false,
});

const isErrorPanelChildren = ref({
  first: false,
  second: false,
});

const setId = (id) => {
  panel_id.value = id;
};

// const handleReturnToRoSix = (checked) => {
//   is_return_six.value = checked;
// };

// const handleReturnToRoNinth = (checked) => {
//   is_return_ninth.value = checked;
// };

const setPanelNumber = (number) => {
  panel_num.value = number;
};
const roleStore = useRoleStore();
const route = useRoute();

const downloadReportAll = (id) => {
  HTTP.get(`/regionals/${id}/download_regional_competition_report/`, {
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RO_report.xlsx");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      console.log("an error occured " + error);
    });
};

const getItems = async (number) => {
  try {
    const response = await HTTP.get(
      `regional_competitions_2026/reports/event_names/r${number}-event-names/`
    );
    switch (number) {
      case 7:
        six_items.value = response.data;
        break;
      case 10:
        ninth_items.value = response.data;
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

// const handleReturnToRo = (checked) => {
//   is_return_six.value = checked;
// };

let isAllSixVerified = true;
let isAllNinthVerified = true;
const getMultiplyData = async (reportId) => {
  const sixDataPromises = six_items.value.map(async (item) => {
    try {
      if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
        return {
          id: item.id,
          data: (await reportPartTwoService.getMultipleReportDH("7", item.id, reportId))
            .data,
        };
      } else {
        return {
          id: item.id,
          data: (await reportPartTwoService.getMultipleReport("7", item.id)).data,
        };
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
          return {
            id: item.id,
            data: {
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
              comment: "",
            },
          };
        } else {
          return { id: item.id, data: {} };
        }
      } else {
        throw error;
      }
    }
  });

  const ninthDataPromises = ninth_items.value.map(async (item) => {
    const id2026 = `0${item.id}`;
    try {
      if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
        return {
          id: id2026,
          data: (await reportPartTwoService.getMultipleReportDH("10", id2026, reportId))
            .data,
        };
      } else {
        return {
          id: id2026,
          data: (await reportPartTwoService.getMultipleReport("10", id2026)).data,
        };
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (roleStore.experts.is_district_expert || roleStore.experts.is_central_expert) {
          return {
            id: item.id,
            data: {
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
              comment: "",
            },
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
    Promise.all(ninthDataPromises),
  ]);

  sixDataResults.forEach((result) => {
    const sixData = result.data;

    if (districtExpert.value) {
      if (sixData?.regional_version) {
        try {
          reportData.value.six[result.id] = JSON.parse(sixData.regional_version);
        } catch (error) {
          console.error("Error parsing regional_version JSON 7-DH:", error);
          reportData.value.six[result.id] = sixData.regional_version || sixData;
        }
      } else {
        reportData.value.six[result.id] = sixData;
      }
      reportStore.reportDataDH.six[result.id] = Object.assign({}, sixData);
      // reportStore.reportDataDH.six[result.id].comment = "";
    } else if (centralExpert.value) {
      reportStore.reportForCheckCH.six[result.id] = sixData;
      reportData.value.six[result.id] = sixData;
      reportStore.reportDataDH.six[result.id] = sixData;

      if (sixData.rejecting_reasons && sixData.verified_by_chq !== true) {
        if (!revisionPanels.value.find((item) => item === "7")) {
          revisionPanels.value.push(`7`);
        }
        revisionPanels.value.push(`7-${result.id}`);
      }
      if (sixData?.regional_version) {
        try {
          if (typeof sixData.regional_version === "object") {
            reportData.value.six[result.id] = JSON.stringify(sixData.regional_version);
            if (sixData.regional_version?.regional_version?.regional_version) {
              reportData.value.six[result.id] = JSON.parse(
                sixData.regional_version?.regional_version?.regional_version
              );
            } else {
              reportData.value.six[result.id] = JSON.parse(
                sixData.regional_version?.regional_version
              );
            }
          } else if (typeof sixData.regional_version === "string") {
            reportData.value.six[result.id] = JSON.parse(sixData.regional_version);
          } else {
            throw new Error("Invalid type for regional_version");
          }
        } catch (error) {
          console.error("Error parsing regional_version JSON 7-CH-RH:", error);
          reportData.value.six[result.id] = sixData.regional_version || sixData;
        }
      } else {
        reportData.value.six[result.id] = sixData;
      }
      if (sixData?.district_version) {
        try {
          reportStore.reportDataDH.six[result.id] = JSON.parse(sixData.district_version);
        } catch (error) {
          console.error("Error parsing regional_version JSON-7-CH-DH:", error);
          reportStore.reportDataDH.six[result.id] = sixData.district_version || sixData;
        }
      } else {
        reportStore.reportDataDH.six[result.id] = sixData;
      }

      reportStore.reportDataCH.six[result.id] = Object.assign({}, sixData);
      reportStore.reportDataCH.six[result.id].verified_by_chq === null
        ? (reportStore.reportDataCH.six[result.id].comment = "")
        : (reportStore.reportDataCH.six[result.id].comment = sixData?.comment);
    } else {
      // if (sixData?.regional_version) {
      //   try {
      //     reportData.value.six[result.id] = JSON.parse(sixData?.regional_version);
      //   } catch (error) {
      //     console.error('Error parsing regional_version JSON 7-RH:', error);
      //     reportData.value.six[result.id] = sixData?.regional_version || sixData;
      //   }
      // } else {
      //   reportData.value.six[result.id] = sixData;
      // }
      if (sixData?.regional_version) {
        try {
          if (typeof sixData.regional_version === "object") {
            reportData.value.six[result.id] = JSON.stringify(sixData.regional_version);
            if (sixData.regional_version?.regional_version?.regional_version) {
              reportData.value.six[result.id] = JSON.parse(
                sixData.regional_version?.regional_version?.regional_version
              );
            } else {
              reportData.value.six[result.id] = JSON.parse(
                sixData.regional_version?.regional_version
              );
            }
          } else if (typeof sixData.regional_version === "string") {
            reportData.value.six[result.id] = JSON.parse(sixData.regional_version);
          } else {
            throw new Error("Invalid type for regional_version");
          }
        } catch (error) {
          console.error("Error parsing regional_version JSON 7-CH-RH:", error);
          reportData.value.six[result.id] = sixData.regional_version || sixData;
        }
      } else {
        reportData.value.six[result.id] = sixData;
      }

      if (sixData?.district_version) {
        try {
          reportStore.reportDataDH.six[result.id] = JSON.parse(sixData?.district_version);
        } catch (error) {
          console.error("Error parsing district_version JSON-7-RH-DH:", error);
          reportStore.reportDataDH.six[result.id] = sixData?.district_version || sixData;
        }
      }

      sixData?.central_version
        ? (reportStore.reportDataCH.six[result.id] = sixData?.central_version)
        : (reportStore.reportDataCH.six[result.id] = sixData);

      if (sixData?.rejecting_reasons && sixData?.verified_by_chq !== true) {
        if (!revisionPanels.value.find((item) => item === "7")) {
          revisionPanels.value.push(`7`);
        }
        revisionPanels.value.push(`7-${result.id}`);
        // reportStore.reportDataDH.six[result.id] = JSON.parse(sixData?.district_version);
        // sixData?.central_version
        //   ? reportStore.reportDataCH.six[result.id] = sixData?.central_version
        //   : reportStore.reportDataCH.six[result.id] = sixData;

        reportStore.isReportReject.six[result.id] = isTabsForRevision.value;
      }

      if (!sixData?.verified_by_chq) {
        isAllSixVerified = false;
      }
    }
  });

  ninthDataResults.forEach((result) => {
    const ninthData = result.data;

    if (districtExpert.value) {
      if (ninthData?.regional_version) {
        try {
          reportData.value.ninth[result.id] = JSON.parse(ninthData.regional_version);
        } catch (error) {
          console.error("Error parsing regional_version JSON 10-DH :", error);
          reportData.value.ninth[result.id] = ninthData.regional_version || ninthData;
        }
      } else {
        reportData.value.ninth[result.id] = ninthData;
      }
      reportStore.reportDataDH.ninth[result.id] = Object.assign({}, ninthData);
      reportStore.reportDataDH.ninth[result.id].comment = "";
      // isErrorPanel.value.ninth[result.id] = {
      //   id: result.id,
      //   error: false,
      // }
    } else if (centralExpert.value) {
      reportStore.reportForCheckCH.ninth[result.id] = ninthData;
      if (ninthData.rejecting_reasons && ninthData.verified_by_chq !== true) {
        if (!revisionPanels.value.find((item) => item === "10")) {
          revisionPanels.value.push(`10`);
        }
        revisionPanels.value.push(`10-${result.id}`);
      }
      if (ninthData?.regional_version) {
        try {
          if (typeof ninthData.regional_version === "object") {
            reportData.value.ninth[result.id] = JSON.stringify(
              ninthData.regional_version?.regional_version
            );
            reportData.value.ninth[result.id] = JSON.parse(
              ninthData.regional_version?.regional_version
            );
          } else if (typeof ninthData.regional_version === "string") {
            reportData.value.ninth[result.id] = JSON.parse(ninthData.regional_version);
          } else {
            throw new Error("Invalid type for regional_version");
          }
        } catch (error) {
          console.error("Error parsing regional_version JSON 10-CH-RH:", error);
          reportData.value.ninth[result.id] = ninthData.regional_version || ninthData;
        }
      } else {
        reportData.value.ninth[result.id] = ninthData;
      }
      if (ninthData?.district_version) {
        try {
          reportStore.reportDataDH.ninth[result.id] = JSON.parse(
            ninthData.district_version
          );
        } catch (error) {
          console.error("Error parsing regional_version JSON 10-CH-DH:", error);
          reportStore.reportDataDH.ninth[result.id] =
            ninthData.district_version || ninthData;
        }
      } else {
        reportStore.reportDataDH.ninth[result.id] = ninthData;
      }

      reportStore.reportDataCH.ninth[result.id] = Object.assign({}, ninthData);
      ninthData.verified_by_chq === null
        ? (reportStore.reportDataCH.ninth[result.id].comment = "")
        : (reportStore.reportDataCH.ninth[result.id].comment = ninthData.comment);
    } else {
      if (ninthData?.regional_version) {
        try {
          if (typeof ninthData.regional_version === "object") {
            reportData.value.ninth[result.id] = JSON.stringify(
              ninthData.regional_version?.regional_version
            );
            reportData.value.ninth[result.id] = JSON.parse(
              ninthData.regional_version?.regional_version
            );
          } else if (typeof ninthData.regional_version === "string") {
            reportData.value.ninth[result.id] = JSON.parse(ninthData.regional_version);
          } else {
            throw new Error("Invalid type for regional_version");
          }
        } catch (error) {
          console.error("Error parsing regional_version JSON 10-CH-RH:", error);
          reportData.value.ninth[result.id] = ninthData.regional_version || ninthData;
        }
      } else {
        reportData.value.ninth[result.id] = ninthData;
      }
      if (ninthData?.district_version) {
        try {
          reportStore.reportDataDH.ninth[result.id] = JSON.parse(
            ninthData?.district_version
          );
          console.log("NinthData", reportStore.reportDataDH.ninth[result.id]);
        } catch (error) {
          console.error("Error parsing district_version JSON-RH-DH:", error);
          reportStore.reportDataDH.ninth[result.id] =
            ninthData?.district_version || ninthData;
        }
      }
      ninthData.central_version
        ? (reportStore.reportDataCH.ninth[result.id] = ninthData.central_version)
        : (reportStore.reportDataCH.ninth[result.id] = ninthData);
      if (ninthData?.rejecting_reasons) {
        if (!revisionPanels.value.find((item) => item === "10")) {
          revisionPanels.value.push(`10`);
        }

        revisionPanels.value.push(`10-${result.id}`);

        reportStore.isReportReject.ninth[result.id] = isTabsForRevision.value;
      }

      if (!ninthData?.verified_by_chq) {
        isAllNinthVerified = false;
      }
    }
  });
};

const revisionPanels = ref([]);
const isRevision = ref(false);
const isTabsForRevision = ref(false);
const verifiedByChqPanels = ref([]);
const getReportData = async (reportId) => {
  try {
    // +------------Загрузка данных для отчета эксперта ЦШ-----------------
    if (centralExpert.value && typeof reportId != "undefined") {
      /*
       * Критерий 1
       */
      reportStore.reportForCheckCH.first = (
        await reportPartTwoService.getReportDH("1", reportId)
      ).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.first = (
        await reportPartTwoService.getReportDH("1", reportId)
      ).data;
      if (!reportStore.reportForCheckCH.first.verified_by_chq) {
        if (reportStore.reportDataCH.first.rejecting_reasons) {
          reportStore.reportDataCH.first.comment = JSON.parse(
            reportStore.reportDataCH.first.rejecting_reasons
          ).comment;
        } else {
          reportStore.reportDataCH.first.comment = "";
        }
      }
      if (reportStore.reportForCheckCH.first.verified_by_chq)
        verifiedByChqPanels.value.push("1");
      // Рефакторинг - добавлен код ниже, т.к. не отображ панельки показателей на доработке у ЦШ
      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (
        reportStore.reportDataCH.first.rejecting_reasons &&
        reportStore.reportDataCH.first.verified_by_chq !== true
      ) {
        revisionPanels.value.push("1");
      }

      /*
       * Критерий 4
       */
      const dataFourth = (await reportPartTwoService.getReportDH("4", reportId)).data;
      reportStore.reportForCheckCH.fourth = dataFourth;

      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (dataFourth.rejecting_reasons && dataFourth.verified_by_chq !== true) {
        revisionPanels.value.push("4");
      }

      dataFourth.regional_version
        ? (reportData.value.fourth = JSON.parse(dataFourth.regional_version))
        : (reportData.value.fourth = dataFourth);

      dataFourth.district_version
        ? (reportStore.reportDataDH.fourth = JSON.parse(dataFourth.district_version))
        : (reportStore.reportDataDH.fourth = dataFourth);

      reportStore.reportDataCH.fourth = Object.assign({}, dataFourth);
      if (!dataFourth.rejecting_reasons) {
        reportStore.reportDataCH.fourth.comment = "";
      } else if (dataFourth.rejecting_reasons) {
        reportStore.reportDataCH.fourth.comment = JSON.parse(
          reportStore.reportDataCH.fourth.rejecting_reasons
        ).comment;
      }
      if (dataFourth.verified_by_chq === true) {
        reportStore.reportDataCH.fourth.comment = dataFourth.comment;
      }

      /*
       * Критерий 5
       */
      reportStore.reportForCheckCH.fifth = (
        await reportPartTwoService.getReportDH("5", reportId)
      ).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.fifth.events = (
        await reportPartTwoService.getReportDH("5", reportId)
      ).data.events;
      if (!reportStore.reportForCheckCH.fifth.verified_by_chq) {
        if (reportStore.reportForCheckCH.fifth.rejecting_reasons) {
          reportStore.reportDataCH.fifth.comment = JSON.parse(
            reportStore.reportForCheckCH.fifth.rejecting_reasons
          ).comment;
        } else {
          reportStore.reportDataCH.fifth.comment = "";
        }
      }
      if (reportStore.reportForCheckCH.fifth.verified_by_chq)
        verifiedByChqPanels.value.push("5");
      // Рефакторинг - добавлен код ниже, т.к. не отображ панельки показателей на доработке у ЦШ
      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (
        reportStore.reportForCheckCH.fifth.rejecting_reasons &&
        reportStore.reportForCheckCH.fifth.verified_by_chq !== true
      ) {
        revisionPanels.value.push("5");
      }

      /*
       * Критерий 6
       */
      reportStore.reportForCheckCH.sixth = (
        await reportPartTwoService.getReportDH("6", reportId)
      ).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.sixth.events = (
        await reportPartTwoService.getReportDH("6", reportId)
      ).data.events;
      if (!reportStore.reportForCheckCH.sixth.verified_by_chq) {
        if (reportStore.reportForCheckCH.sixth.rejecting_reasons) {
          reportStore.reportDataCH.sixth.comment = JSON.parse(
            reportStore.reportForCheckCH.sixth.rejecting_reasons
          ).comment;
        } else {
          reportStore.reportDataCH.sixth.comment = "";
        }
      }
      if (reportStore.reportForCheckCH.sixth.verified_by_chq)
        verifiedByChqPanels.value.push("6");
      // Рефакторинг - добавлен код ниже, т.к. не отображ панельки показателей на доработке у ЦШ
      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (
        reportStore.reportForCheckCH.sixth.rejecting_reasons &&
        reportStore.reportForCheckCH.sixth.verified_by_chq !== true
      ) {
        revisionPanels.value.push("6");
      }

      /*
       * Критерий 7 и 10
       */
      await getMultiplyData(reportId);

      /*
       * Критерий 11-1
       */
      reportStore.reportForCheckCH.eleventh.first = (
        await reportPartTwoService.getMultipleReportDH("11", "1", reportId)
      ).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.eleventh.first = (
        await reportPartTwoService.getMultipleReportDH("11", "1", reportId)
      ).data;
      if (!reportStore.reportForCheckCH.eleventh.first.verified_by_chq) {
        if (reportStore.reportDataCH.eleventh.first.rejecting_reasons) {
          reportStore.reportDataCH.eleventh.first.comment = JSON.parse(
            reportStore.reportDataCH.eleventh.first.rejecting_reasons
          ).comment;
        } else {
          reportStore.reportDataCH.eleventh.first.comment = "";
        }
      }
      if (reportStore.reportForCheckCH.eleventh.first.verified_by_chq)
        verifiedByChqPanels.value.push("11-1");
      // Рефакторинг - добавлен код ниже, т.к. не отображ панельки показателей на доработке у ЦШ
      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (
        reportStore.reportDataCH.eleventh.first.rejecting_reasons &&
        reportStore.reportForCheckCH.eleventh.first.verified_by_chq !== true
      ) {
        revisionPanels.value.push("11-1");
      }
      /*
       * Критерий 11-2
       */
      reportStore.reportForCheckCH.eleventh.second = (
        await reportPartTwoService.getMultipleReportDH("11", "2", reportId)
      ).data;
      // Добавление данных о проектах от ОШ в стор ЦШ
      reportStore.reportDataCH.eleventh.second = (
        await reportPartTwoService.getMultipleReportDH("11", "2", reportId)
      ).data;
      if (!reportStore.reportForCheckCH.eleventh.second.verified_by_chq) {
        if (reportStore.reportDataCH.eleventh.second.rejecting_reasons) {
          reportStore.reportDataCH.eleventh.second.comment = JSON.parse(
            reportStore.reportDataCH.eleventh.second.rejecting_reasons
          ).comment;
        } else {
          reportStore.reportDataCH.eleventh.second.comment = "";
        }
      }
      if (reportStore.reportForCheckCH.eleventh.second.verified_by_chq)
        verifiedByChqPanels.value.push("11-2");
      // Рефакторинг - добавлен код ниже, т.к. не отображ панельки показателей на доработке у ЦШ
      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (
        reportStore.reportDataCH.eleventh.second.rejecting_reasons &&
        reportStore.reportForCheckCH.eleventh.second.verified_by_chq !== true
      ) {
        revisionPanels.value.push("11-2");
      }

      /*
       * Критерий 12
       */
      const dataTwelfth = (await reportPartTwoService.getReportDH("12", reportId)).data;
      reportStore.reportForCheckCH.twelfth = dataTwelfth;

      // если используем функцию showPanels обязательна проверка на 2 поля:
      if (dataTwelfth.rejecting_reasons && dataTwelfth.verified_by_chq !== true) {
        revisionPanels.value.push("12");
      }

      dataTwelfth.regional_version
        ? (reportData.value.twelfth = JSON.parse(dataTwelfth.regional_version))
        : (reportData.value.twelfth = dataTwelfth);

      dataTwelfth.district_version
        ? (reportStore.reportDataDH.twelfth = JSON.parse(dataTwelfth.district_version))
        : (reportStore.reportDataDH.twelfth = dataTwelfth);

      reportStore.reportDataCH.twelfth = Object.assign({}, dataTwelfth);
      if (!dataTwelfth.rejecting_reasons) {
        reportStore.reportDataCH.twelfth.comment = "";
      } else if (dataTwelfth.rejecting_reasons) {
        reportStore.reportDataCH.twelfth.comment = JSON.parse(
          reportStore.reportDataCH.twelfth.rejecting_reasons
        ).comment;
      }
      if (dataTwelfth.verified_by_chq === true) {
        reportStore.reportDataCH.twelfth.comment = dataTwelfth.comment;
      }
    }
    // -------------Загрузка данных для отчета эксперта ОШ-----------------
    else if (districtExpert.value && typeof reportId != "undefined") {
      // Критерий 1
      reportData.value.first = (
        await reportPartTwoService.getReportDH("1", reportId)
      ).data;
      reportStore.reportDataDH.first = Object.assign({}, reportData.value.first);
      reportStore.reportDataDH.first.comment = "";

      // Критерий 4
      reportData.value.fourth = (
        await reportPartTwoService.getReportDH("4", reportId)
      ).data;
      reportStore.reportDataDH.fourth = Object.assign({}, reportData.value.fourth);
      reportStore.reportDataDH.fourth.comment = "";

      // Критерий 5
      reportData.value.fifth = (
        await reportPartTwoService.getReportDH("5", reportId)
      ).data;
      reportStore.reportDataDH.fifth = (
        await reportPartTwoService.getReportDH("5", reportId)
      ).data;
      reportStore.reportDataDH.fifth.comment = "";

      // Критерий 6
      reportData.value.sixth = (
        await reportPartTwoService.getReportDH("6", reportId)
      ).data;
      reportStore.reportDataDH.sixth = (
        await reportPartTwoService.getReportDH("6", reportId)
      ).data;
      reportStore.reportDataDH.sixth.comment = "";

      // Критерии 7 и 10
      await getMultiplyData(reportId);

      // Критерий 11
      reportData.value.eleventh.first = (
        await reportPartTwoService.getMultipleReportDH("11", "1", reportId)
      ).data;
      reportStore.reportDataDH.eleventh.first = Object.assign(
        {},
        reportData.value.eleventh.first
      );
      reportStore.reportDataDH.eleventh.first.comment = "";

      reportData.value.eleventh.second = (
        await reportPartTwoService.getMultipleReportDH("11", "2", reportId)
      ).data;
      reportStore.reportDataDH.eleventh.second = Object.assign(
        {},
        reportData.value.eleventh.second
      );
      reportStore.reportDataDH.eleventh.second.comment = "";

      // Критерий 12
      reportData.value.twelfth = (
        await reportPartTwoService.getReportDH("12", reportId)
      ).data;
      reportStore.reportDataDH.twelfth = Object.assign({}, reportData.value.twelfth);
      reportStore.reportDataDH.twelfth.comment = "";

      if (reportData.value.twelfth.is_sent) isSentLastIndex.value = true;
    }
    // -------------Загрузка данных для отчета командира РШ----------------
    else {
      /*-------------1-------------*/
      let dataFirst;
      let dataFirstChildren;
      try {
        dataFirst = (await reportPartTwoService.getReport("1")).data;
        dataFirstChildren = (await getReportForSecond()).data;
        reportData.value.firstChildren = dataFirstChildren;
        if (!dataFirst.regional_version && !dataFirst.central_version) {
          reportData.value.first = dataFirst;
        } else {
          if (dataFirst.rejecting_reasons) {
            reportStore.reportReject.first = dataFirst;

            if (!dataFirst.verified_by_chq) {
              revisionPanels.value.push("1");
              reportStore.isReportReject.first = isTabsForRevision.value;
            }
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
        console.log(e.message);
      }

      /*------------4--------------*/
      let dataFourth;
      try {
        dataFourth = (await reportPartTwoService.getReport("4")).data;
        console.log("4", dataFourth);
        dataFourth.regional_version
          ? (reportData.value.fourth = JSON.parse(dataFourth.regional_version))
          : (reportData.value.fourth = dataFourth);

        dataFourth.district_version
          ? (reportStore.reportDataDH.fourth = JSON.parse(dataFourth.district_version))
          : (reportStore.reportDataDH.fourth = dataFourth);

        dataFourth.central_version
          ? (reportStore.reportDataCH.fourth = dataFourth.central_version)
          : (reportStore.reportDataCH.fourth = dataFourth);

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataFourth.rejecting_reasons && dataFourth.verified_by_chq !== true) {
          revisionPanels.value.push("4");
          reportStore.isReportReject.fourth = isTabsForRevision.value;
        }
      } catch (e) {
        console.log(e.message);
      }

      /*------------5--------------*/
      let dataFifth;
      try {
        dataFifth = (await reportPartTwoService.getReport("5")).data;
        if (!dataFifth.regional_version && !dataFifth.central_version) {
          reportData.value.fifth = dataFifth;
        } else {
          if (dataFifth.rejecting_reasons) {
            reportStore.reportReject.fifth = dataFifth;

            if (!dataFifth.verified_by_chq) {
              revisionPanels.value.push("5");
              reportStore.isReportReject.fifth = isTabsForRevision.value;
            }
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
        console.log(e.message);
      }

      /*------------6--------------*/
      let dataSixth;
      try {
        dataSixth = (await reportPartTwoService.getReport("6")).data;
        console.log("6", dataSixth);
        // if (!dataSixth.regional_version) {
        //   reportData.value.sixth = dataSixth;
        // } else {
        //   reportData.value.sixth = JSON.parse(dataSixth.regional_version);
        // }
        if (!dataSixth.regional_version && !dataSixth.central_version) {
          reportData.value.sixth = dataSixth;
        } else {
          if (dataSixth.rejecting_reasons) {
            reportStore.reportReject.sixth = dataSixth;

            if (!dataSixth.verified_by_chq) {
              revisionPanels.value.push("6");
              reportStore.isReportReject.sixth = isTabsForRevision.value;
            }
          }

          if (dataSixth.central_version) {
            reportData.value.sixth = dataSixth;
          } else {
            reportData.value.sixth = JSON.parse(dataSixth.regional_version);
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataSixth.verified_by_chq && !dataSixth.rejecting_reasons) {
            reportStore.reportReject.sixth = dataSixth;
          }
        }
      } catch (e) {
        console.log(e.message);
      }

      /*------------7 и 10------------*/
      try {
        await getMultiplyData();
      } catch (e) {
        console.error("Error in six_items processing:", e);
      }

      /*------------11-1--------------*/
      let dataEleventhFirst;
      try {
        dataEleventhFirst = (await reportPartTwoService.getMultipleReport("11", "1"))
          .data;
        if (!dataEleventhFirst.regional_version && !dataEleventhFirst.central_version) {
          reportData.value.eleventh.first = dataEleventhFirst;
        } else {
          if (dataEleventhFirst.rejecting_reasons) {
            reportStore.reportReject.eleventh.first = dataEleventhFirst;

            if (!dataEleventhFirst.verified_by_chq) {
              revisionPanels.value.push("11-1");
              reportStore.isReportReject.eleventh.first = isTabsForRevision.value;
            }
            if (dataEleventhFirst.verified_by_chq)
              reportStore.isReportReject.eleventh.first = false;
          }

          if (dataEleventhFirst.central_version) {
            reportData.value.eleventh.first = dataEleventhFirst;
          } else {
            reportData.value.eleventh.first = JSON.parse(
              dataEleventhFirst.regional_version
            );
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (dataEleventhFirst.verified_by_chq && !dataEleventhFirst.rejecting_reasons) {
            reportStore.reportReject.eleventh.first = dataEleventhFirst;
          }
        }
      } catch (e) {
        console.log(e.message);
      }
      /*------------11-2--------------*/
      let dataEleventhSecond;
      try {
        dataEleventhSecond = (await reportPartTwoService.getMultipleReport("11", "2"))
          .data;
        if (!dataEleventhSecond.regional_version && !dataEleventhSecond.central_version) {
          reportData.value.eleventh.second = dataEleventhSecond;
        } else {
          if (dataEleventhSecond.rejecting_reasons) {
            reportStore.reportReject.eleventh.second = dataEleventhSecond;

            if (!dataEleventhSecond.verified_by_chq) {
              revisionPanels.value.push("11-2");
              reportStore.isReportReject.eleventh.second = isTabsForRevision.value;
            }
            if (dataEleventhSecond.verified_by_chq)
              reportStore.isReportReject.eleventh.second = false;
          }

          if (dataEleventhSecond.central_version) {
            reportData.value.eleventh.second = dataEleventhSecond;
          } else {
            reportData.value.eleventh.second = JSON.parse(
              dataEleventhSecond.regional_version
            );
          }

          /*Добавление данных для просмотра показателя который не был отклонен*/
          if (
            dataEleventhSecond.verified_by_chq &&
            !dataEleventhSecond.rejecting_reasons
          ) {
            reportStore.reportReject.eleventh.second = dataEleventhSecond;
          }
        }
      } catch (e) {
        console.log(e.message);
      }

      /*--------------12--------------*/
      let dataTwelfth;
      try {
        dataTwelfth = (await reportPartTwoService.getReport("12")).data;
        dataTwelfth.regional_version
          ? (reportData.value.twelfth = JSON.parse(dataTwelfth.regional_version))
          : (reportData.value.twelfth = dataTwelfth);

        dataTwelfth.district_version
          ? (reportStore.reportDataDH.twelfth = JSON.parse(dataTwelfth.district_version))
          : (reportStore.reportDataDH.twelfth = dataTwelfth);

        dataTwelfth.central_version
          ? (reportStore.reportDataCH.twelfth = dataTwelfth.central_version)
          : (reportStore.reportDataCH.twelfth = dataTwelfth);

        // Проверка на причины отклонений отчета и вывод табов для РО
        if (dataTwelfth.rejecting_reasons && dataTwelfth.verified_by_chq !== true) {
          revisionPanels.value.push("12");
          reportStore.isReportReject.twelfth = isTabsForRevision.value;
        }
      } catch (e) {
        console.log(e.message);
      }

      //-----------------7--------------------
      for (let item in reportData.value.six) {
        if (reportData.value.six[item] !== null) {
          if (
            reportData.value.six[item]?.is_sent == false ||
            !Object.keys(reportData.value.six[item]).length
          ) {
            blockSendButton.value = false;
            break;
          } else {
            blockSendButton.value = true;
          }
        }
      }

      if (
        dataFirst.verified_by_chq &&
        dataFourth.verified_by_chq &&
        dataFifth.verified_by_chq &&
        dataSixth.verified_by_chq &&
        dataEleventhFirst.verified_by_chq &&
        dataEleventhSecond.verified_by_chq &&
        isAllSixVerified &&
        isAllNinthVerified &&
        dataTwelfth.verified_by_chq
      ) {
        console.log("~~~~HERE");
        reportStore.isAllReportsVerifiedByCH = true;
      }
    }
  } catch (e) {
    console.log("getReportData error: ", e.message);
  } finally {
    preloader.value = false;
  }
};

const setData = (data, panel, number = 0) => {
  switch (panel) {
    case 1:
      reportData.value.first = data;
      break;
    case 4:
      reportData.value.fourth = data;
      break;
    case 5:
      reportData.value.fifth = data;
      break;
    case 6:
      reportData.value.sixth = data;
      break;
    case 7:
      reportData.value.six[number] = data;
      break;
    case 10:
      reportData.value.ninth[number] = data;
      break;
    case 11:
      if (number === 1) {
        reportData.value.eleventh.first = data;
      } else {
        reportData.value.eleventh.second = data;
      }
      break;
    case 12:
      reportData.value.twelfth = data;
      break;
  }
};

const setDataChildren = (data) => {
  reportData.value.firstChildren = data;
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
      reportDataDH.value.sixth = data;
      break;
    case 7:
      reportDataDH.value.six[number] = data;
      reportStore.reportDataDH.six[number].comment = Object.fromEntries(data).comment;
      reportStore.reportDataDH.six[number].number_of_members = Object.fromEntries(
        data
      ).number_of_members;
      break;
    case 10:
      reportDataDH.value.ninth[number] = data;
      break;
    case 11:
      if (number === 1) {
        reportDataDH.value.eleventh.first = data;
      } else {
        reportDataDH.value.eleventh.second = data;
      }
      break;
    case 12:
      reportDataDH.value.twelfth = data;
      break;
  }
};

const setDataCH = (data, panel, number) => {
  switch (panel) {
    case 1:
      reportDataCH.value.first = data;
      console.log("1", ...reportDataCH.value.first);
      break;
    case 4:
      reportDataCH.value.fourth = data;
      console.log("4", ...reportDataCH.value.fourth);
      break;
    case 5:
      reportDataCH.value.fifth = data;
      console.log("5", ...reportDataCH.value.fifth);
      break;
    case 6:
      reportDataCH.value.sixth = data;
      console.log("6", ...reportDataCH.value.sixth);
      break;
    case 7:
      reportDataCH.value.six[number] = data;
      break;
    case 10:
      reportDataCH.value.ninth[number] = data;
      break;
    case 11:
      if (number === 1) {
        reportDataCH.value.eleventh.first = data;
        console.log("11-1", ...reportDataCH.value.eleventh.first);
      } else {
        reportDataCH.value.eleventh.second = data;
        console.log("11-2", ...reportDataCH.value.eleventh.second);
      }
      break;
    case 12:
      reportDataCH.value.twelfth = data;
      break;
  }
};

const filterPanelsData = () => {
  const filteredSix = {};
  const filteredNinth = {};

  for (let i in reportData.value.six) {
    if (
      reportData.value.six[i].number_of_members > 0 &&
      reportData.value.six[i].number_of_members !== null &&
      reportData.value.six[i].is_sent === false &&
      Object.keys(reportData.value.six[i]).length !== 0
    ) {
      filteredSix[i] = reportData.value.six[i];
    }
  }
  for (let i in filteredSix) {
    isErrorPanel.value.six[i] = {
      id: i,
      error: false,
    };
  }
  for (let i in reportData.value.ninth) {
    if (
      reportData.value.ninth[i].event_happened !== false &&
      reportData.value.ninth[i].is_sent === false &&
      Object.keys(reportData.value.ninth[i]).length !== 0
    ) {
      filteredNinth[i] = reportData.value.ninth[i];
    }
  }
  for (let i in filteredNinth) {
    isErrorPanel.value.ninth[i] = {
      id: i,
      error: false,
    };
  }

  return {
    filteredSix,
    filteredNinth,
  };
};

const sendReport = async () => {
  if (!(districtExpert.value || centralExpert.value)) {
    blockSendButton.value = true;
    if (checkEmptyFields(reportData.value)) {
      preloader.value = true;
      try {
        if (!reportData.value.first.is_sent) {
          await reportPartTwoService.sendReport(reportData.value.first, "1");
        }

        if (!reportData.value.fourth.is_sent) {
          await reportPartTwoService.sendReport(reportData.value.fourth, "4");
        }

        if (!reportData.value.fifth.is_sent) {
          if (reportData.value.fifth) {
            reportData.value.fifth.events = reportData.value.fifth.events.filter(
              (event) => event.participants_number
            );
            await reportPartTwoService.sendReport(reportData.value.fifth, "5");
          }
        }

        if (!reportData.value.sixth.is_sent) {
          await reportPartTwoService.sendReport(reportData.value.sixth, "6");
        }

        for (let item in reportData.value.six) {
          if (!Object.keys(reportData.value.six[item]).length) {
            await reportPartTwoService.createMultipleReport(
              {
                number_of_members: 0,
                links: [],
                comment: "",
              },
              "7",
              item
            );
            reportData.value.six[item].event_happened = false;
          }
          if (
            reportData.value.six[item].number_of_members == 0 ||
            reportData.value.six[item].number_of_members === null
          ) {
            reportData.value.six[item].event_happened = false;
          }
        }
        await reportPartTwoService.sendReportWithSlash(reportData.value.six, "7");

        for (let item in reportData.value.ninth) {
          if (!Object.keys(reportData.value.ninth[item]).length) {
            await reportPartTwoService.createMultipleReport(
              {
                event_happened: false,
                links: [],
                document: "",
                file_size: null,
                file_type: "",
                comment: "",
              },
              "10",
              item
            );
            reportData.value.ninth[item].event_happened = false;
          }
          if (
            reportData.value.ninth[item].event_happened == false ||
            reportData.value.ninth[item].event_happened === null
          ) {
            reportData.value.ninth[item].event_happened = false;
          }
        }
        await reportPartTwoService.sendReportWithSlash(reportData.value.ninth, "10");

        if (!reportData.value.eleventh.first.is_sent) {
          await reportPartTwoService.sendMultipleReport(
            reportData.value.eleventh.first,
            "11",
            "1"
          );
        }
        if (!reportData.value.eleventh.second.is_sent) {
          await reportPartTwoService.sendMultipleReport(
            reportData.value.eleventh.second,
            "11",
            "2"
          );
        }

        if (!reportData.value.twelfth.is_sent) {
          await reportPartTwoService.sendReport(reportData.value.twelfth, "12");
        }

        await getReportData(route.query.reportId);
        blockSendButton.value = true;

        swal.fire({
          position: "center",
          icon: "success",
          title: "Отчет успешно отправлен",
          showConfirmButton: false,
          timer: 1500,
        });

        await router.push({
          name: "reportingRo",
        });
      } catch (e) {
        blockSendButton.value = false;
        swal.fire({
          position: "center",
          icon: "error",
          title: `ошибка`,
          showConfirmButton: false,
          timer: 2500,
        });
        console.log("sendReport error: ", e);
      } finally {
        preloader.value = false;
      }
    } else {
      blockSendButton.value = false;
    }
  }

  if (
    districtExpert.value &&
    checkEmptyFieldsDH(reportStore.reportDataDH, isErrorPanel)
  ) {
    blockSendButton.value = true;
    preloader.value = true;
    try {
      // console.log("dataSiDh", reportDataDH.value.six, reportDataDH.value.first);
      if (!reportData.value.first.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(
          reportDataDH.value.first,
          "1",
          route.query.reportId,
          true
        );
      }

      if (!reportData.value.fourth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(
          reportDataDH.value.fourth,
          "4",
          route.query.reportId,
          true
        );
      }

      if (!reportData.value.fifth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(
          reportDataDH.value.fifth,
          "5",
          route.query.reportId,
          true
        );
      }

      if (!reportData.value.sixth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(
          reportDataDH.value.sixth,
          "6",
          route.query.reportId,
          true
        );
      }

      for (const [index, item] of Object.entries(reportData.value.six)) {
        if (item && item.verified_by_dhq !== true) {
          console.log(`Sending report for item 7-${index}:`, item);
          try {
            const response = await reportPartTwoService.sendReportDHMultiply(
              reportStore.reportDataDH.six[index],
              "7",
              index,
              route.query.reportId
            );
            console.log(`Successfully sent report for item 7-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 7-${index}:`, error);
          }
        } else {
          console.log(
            `Skipping item 7-${index} as it's already verified or doesn't exist`
          );
        }
      }

      for (const [index, item] of Object.entries(reportData.value.ninth)) {
        if (item && item.verified_by_dhq !== true) {
          console.log(`Sending report for item 10-${index}:`, item);
          try {
            reportStore.reportDataDH.ninth[index].document =
              reportStore.reportDataDHFile.ninth[index];
            const response = await reportPartTwoService.sendReportDHMultiply(
              reportStore.reportDataDH.ninth[index],
              "10",
              index,
              route.query.reportId,
              true
            );
            console.log(`Successfully sent report for item 10-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 10-${index}:`, error);
          }
        } else {
          console.log(
            `Skipping item 10-${index} as it's already verified or doesn't exist`
          );
        }
      }

      if (!reportData.value.eleventh.first.verified_by_dhq) {
        await reportPartTwoService.sendReportDHMultiply(
          reportDataDH.value.eleventh.first,
          "11",
          "1",
          route.query.reportId,
          true
        );
      }
      if (!reportData.value.eleventh.second.verified_by_dhq) {
        await reportPartTwoService.sendReportDHMultiply(
          reportDataDH.value.eleventh.second,
          "11",
          "2",
          route.query.reportId,
          true
        );
      }

      if (!reportData.value.twelfth.verified_by_dhq) {
        await reportPartTwoService.sendReportDH(
          reportDataDH.value.twelfth,
          "12",
          route.query.reportId,
          true
        );
      }

      swal.fire({
        position: "center",
        icon: "success",
        title: "Отчет успешно верифицирован",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      blockSendButton.value = false;
      swal.fire({
        position: "center",
        icon: "error",
        title: `ошибка`,
        showConfirmButton: false,
        timer: 2500,
      });
      console.log("sendReport error: ", e);
    } finally {
      preloader.value = false;
    }
  }

  if (centralExpert.value) {
    showModalWarning.value = true;
  }
};

const reportConfirmation = async (value) => {
  if (value) {
    showModalWarning.value = false;
    blockSendButton.value = true;
    preloader.value = true;

    try {
      if (reportStore.reportForCheckCH.first.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(
          reportDataCH.value.first,
          "1",
          route.query.reportId,
          true,
          reportStore.returnReport.first
        );
      }

      if (reportStore.reportForCheckCH.fourth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(
          reportDataCH.value.fourth,
          "4",
          route.query.reportId,
          true,
          reportStore.returnReport.fourth
        );
      }

      if (reportStore.reportForCheckCH.fifth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(
          reportDataCH.value.fifth,
          "5",
          route.query.reportId,
          true,
          reportStore.returnReport.fifth
        );
      }

      if (reportStore.reportForCheckCH.sixth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(
          reportDataCH.value.sixth,
          "6",
          route.query.reportId,
          true,
          reportStore.returnReport.sixth
        );
      }

      for (const [index, item] of Object.entries(reportStore.reportForCheckCH.six)) {
        if (item && item.verified_by_chq === null && item.verified_by_dhq === true) {
          console.log(`Sending report for item 7-${index}:`, item);
          try {
            console.log(
              "data 7",
              reportDataCH.value.six[index],
              reportStore.returnReport.six[index]
            );
            const response = await reportPartTwoService.sendMultipleReportCH(
              reportDataCH.value.six[index],
              "7",
              index,
              route.query.reportId,
              false,
              reportStore.returnReport.six[index]
            );
            console.log(`Successfully sent report for item 7-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 7-${index}:`, error);
          }
        } else {
          console.log(
            `Skipping item 7-${index} as it's already verified or doesn't exist`
          );
        }
      }

      for (const [index, item] of Object.entries(reportStore.reportForCheckCH.ninth)) {
        console.log(
          "43",
          reportStore.reportForCheckCH.ninth[index],
          reportStore.reportForCheckCH.ninth[item]
        );
        if (item && item.verified_by_chq === null) {
          console.log(`Sending report for item 10-${index}:`, item);
          // reportStore.reportDataDH.ninth[index].document = reportStore.reportDataDHFile.ninth[index]
          try {
            console.log(
              "data 10",
              reportDataCH.value.ninth[index],
              reportStore.returnReport.ninth[index]
            );
            const response = await reportPartTwoService.sendMultipleReportCH(
              reportDataCH.value.ninth[index],
              "10",
              index,
              route.query.reportId,
              true,
              reportStore.returnReport.ninth[index]
            );
            console.log(`Successfully sent report for item 10-${index}`);
          } catch (error) {
            console.error(`Error sending report for item 10-${index}:`, error);
          }
        } else {
          console.log(
            `Skipping item 10-${index} as it's already verified or doesn't exist`
          );
        }
      }

      if (reportStore.reportForCheckCH.eleventh.first.verified_by_chq === null) {
        await reportPartTwoService.sendMultipleReportCH(
          reportDataCH.value.eleventh.first,
          "11",
          "1",
          route.query.reportId,
          true,
          reportStore.returnReport.eleventh.first
        );
      }
      if (reportStore.reportForCheckCH.eleventh.second.verified_by_chq === null) {
        await reportPartTwoService.sendMultipleReportCH(
          reportDataCH.value.eleventh.second,
          "11",
          "2",
          route.query.reportId,
          true,
          reportStore.returnReport.eleventh.second
        );
      }

      if (reportStore.reportForCheckCH.twelfth.verified_by_chq === null) {
        await reportPartTwoService.sendReportCH(
          reportDataCH.value.twelfth,
          "12",
          route.query.reportId,
          true,
          reportStore.returnReport.twelfth
        );
      }

      swal.fire({
        position: "center",
        icon: "success",
        // Скорректировать сообщение
        title: "Отчет успешно верифицирован",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      blockSendButton.value = false;
      swal.fire({
        position: "center",
        icon: "error",
        // title: `ошибка`,
        title: `ошибка ${e.request.response}`,
        showConfirmButton: false,
        timer: 2500,
      });
      console.log("sendReportCH error: ", e);
    } finally {
      preloader.value = false;
    }
  } else {
    showModalWarning.value = false;
  }
};

const checkEmptyFields = (data) => {
  const { filteredSix, filteredNinth } = filterPanelsData();
  console.log("data", data);

  if (
    !data.first ||
    !(
      data.first.amount_of_money &&
      data.first.scan_file &&
      data.first.detachment_number &&
      data.first.participants_with_payment &&
      data.first.foreign_participants &&
      data.first.top_participants &&
      data.first.sso_number &&
      data.first.sso_participants &&
      data.first.spo_number &&
      data.first.spo_participants &&
      data.first.sop_number &&
      data.first.sop_participants &&
      data.first.smo_number &&
      data.first.smo_participants &&
      data.first.sservo_number &&
      data.first.sservo_participants &&
      data.first.ssho_number &&
      data.first.ssho_participants &&
      data.first.spro_number &&
      data.first.spro_participants &&
      data.first.top_detachment_number &&
      data.first.top_detachment_participants &&
      data.first.spuo_number &&
      data.first.spuo_participants &&
      data.first.sozht_number &&
      data.first.sozht_participants
    )
  ) {
    isErrorPanel.value.first = true;
    swal.fire({
      position: "center",
      icon: "warning",
      title: `Заполните обязательные поля в 1 показателе`,
      showConfirmButton: false,
      timer: 2500,
    });
    return false;
  } else {
    isErrorPanel.value.first = false;
  }

  if (!data.firstChildren.oovo_participants) {
    //--добавить новое поле
    (isErrorPanel.value.first = true), (isErrorPanelChildren.value.first = true);
    swal.fire({
      position: "center",
      icon: "warning",
      title: `Заполните обязательные поля в 1.1 показателе`,
      showConfirmButton: false,
      timer: 2500,
    });
    return false;
  } else {
    (isErrorPanel.value.first = false), (isErrorPanelChildren.value.first = false);
  }

  if (!data.firstChildren.poo_participants) {
    //--добавить новое поле
    (isErrorPanel.value.first = true), (isErrorPanelChildren.value.second = true);
    swal.fire({
      position: "center",
      icon: "warning",
      title: `Заполните обязательные поля в 1.2 показателе`,
      showConfirmButton: false,
      timer: 2500,
    });
    return false;
  } else {
    (isErrorPanel.value.first = false), (isErrorPanelChildren.value.second = false);
  }

  if (!data.fourth || !data.fourth.employed_after_training) {
    isErrorPanel.value.fourth = true;
    swal.fire({
      position: "center",
      icon: "warning",
      title: `Заполните обязательные поля в 4 показателе`,
      showConfirmButton: false,
      timer: 2500,
    });
    return false;
  } else {
    isErrorPanel.value.fourth = false;
  }

  if (data.fifth) {
    for (let event of data.fifth.events) {
      if (
        event.participants_number &&
        !(event.name && event.end_date && event.start_date)
      ) {
        isErrorPanel.value.fifth = true;
        swal.fire({
          position: "center",
          icon: "warning",
          title: `Заполните обязательные поля в 5 показателе`,
          showConfirmButton: false,
          timer: 2500,
        });
        return false;
      }
    }
  } else {
    isErrorPanel.value.fifth = true;
    swal.fire({
      position: "center",
      icon: "warning",
      showConfirmButton: true,
      text:
        "Заполните обязательные поля в 5 показателе. В случае отсутствия мероприятия, укажите 0 в количестве участников",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Понятно",
      timer: 5000,
    });
    return false;
  }

  if (data.sixth) {
    for (let event of data.sixth.events) {
      if (
        event.participants_number &&
        !(event.end_date && event.start_date && event.name)
      ) {
        isErrorPanel.value.sixth = true;
        swal.fire({
          position: "center",
          icon: "warning",
          title: `Заполните обязательные поля в 6 показателе`,
          showConfirmButton: false,
          timer: 2500,
        });
        return false;
      }
    }
  } else {
    isErrorPanel.value.sixth = true;
    swal.fire({
      position: "center",
      icon: "warning",
      text: `Заполните обязательные поля в 6 показателе. В случае отсутствия трудового проекта, укажите 0 в количестве участников`,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Понятно",
      timer: 5000,
    });
    return false;
  }

  for (let item in filteredSix) {
    if (!filteredSix[item]?.links?.length) {
      isErrorPanel.value.six[item] = {
        id: item,
        error: true,
      };
      swal.fire({
        position: "center",
        icon: "warning",
        title: `Заполните обязательные поля в 7 показателе`,
        showConfirmButton: false,
        timer: 2500,
      });
      return false;
    }
    for (let link in filteredSix[item]?.links) {
      if (
        filteredSix[item]?.links[link]?.link === null ||
        filteredSix[item]?.links[link]?.link === ""
      ) {
        isErrorPanel.value.six[item] = {
          id: item,
          error: true,
        };
        swal.fire({
          position: "center",
          icon: "warning",
          title: `Заполните ссылки в 7 показателе`,
          showConfirmButton: false,
          timer: 2500,
        });
        return false;
      }
    }
  }

  for (let item in filteredNinth) {
    if (!filteredNinth[item]?.links?.length) {
      isErrorPanel.value.ninth[item] = {
        id: item,
        error: true,
      };
      swal.fire({
        position: "center",
        icon: "warning",
        title: `Заполните обязательные поля в 10 показателе`,
        showConfirmButton: false,
        timer: 2500,
      });
      return false;
    }
    for (let link in filteredNinth[item]?.links) {
      if (
        filteredNinth[item]?.links[link]?.link === null ||
        filteredNinth[item]?.links[link]?.link === ""
      ) {
        isErrorPanel.value.ninth[item] = {
          id: item,
          error: true,
        };
        swal.fire({
          position: "center",
          icon: "warning",
          title: `Заполните ссылки в 10 показателе`,
          showConfirmButton: false,
          timer: 2500,
        });
        return false;
      }
    }
  }

  if (data.eleventh.first) {
    if (data.eleventh.first.event_happened) {
      if (!data.eleventh.first.comment) {
        isErrorPanel.value.eleventh = true;
        swal.fire({
          position: "center",
          icon: "warning",
          title: `Заполните обязательные поля в показателе 11-1`,
          showConfirmButton: false,
          timer: 2500,
        });
        return false;
      }
    }
  } else {
    isErrorPanel.value.eleventh = true;
    swal.fire({
      position: "center",
      icon: "warning",
      title: `Укажите информацию о проведении акции в показателе 11-1`,
      showConfirmButton: false,
      timer: 3500,
    });
    return false;
  }

  if (data.eleventh.second) {
    if (data.eleventh.second.event_happened) {
      if (!data.eleventh.second.comment) {
        isErrorPanel.value.eleventh = true;
        swal.fire({
          position: "center",
          icon: "warning",
          title: `Заполните обязательные поля в показателе 11-2`,
          showConfirmButton: false,
          timer: 2500,
        });
        return false;
      }
    }
  } else {
    isErrorPanel.value.eleventh = true;
    swal.fire({
      position: "center",
      icon: "warning",
      title: `Укажите информацию о проведении акции в показателе 11-2`,
      showConfirmButton: false,
      timer: 3500,
    });
    return false;
  }

  if (
    !data.twelfth ||
    !(data.twelfth.amount_of_money && data.twelfth.number_of_members)
  ) {
    isErrorPanel.value.twelfth = true;
    swal.fire({
      position: "center",
      icon: "warning",
      title: `Заполните обязательные поля в 12 показателе`,
      showConfirmButton: false,
      timer: 2500,
    });
    return false;
  } else {
    isErrorPanel.value.twelfth = false;
  }

  return true;
};

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
  }
);

watch(
  () => route.query.reportId,

  async (newId) => {
    if (!newId) return;
    preloader.value = true;
    await getReportData(newId);
  },

  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => route.fullPath,

  async (newUrl) => {
    if (newUrl && typeof route.query.reportId === "undefined") {
      if (newUrl.includes("/reporting-ro/report-regional-two")) {
        preloader.value = true;
        await getReportData();
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(revisionPanels.value, () => {
  if (revisionPanels.value.length) {
    isRevision.value = true;
    reportStore.isReportRevision = true;
    isTabsForRevision.value = true;
  }
});

onMounted(() => {
  getItems(7);
  getItems(10);

  if (typeof route.query.reportId !== "undefined") return;
  if (roleStore.roles.regionalheadquarter_commander) {
    preloader.value = true;
    getReportData();
  } else {
    const stopWatch = watch(
      () => roleStore.roles.regionalheadquarter_commander,
      (isCommander) => {
        if (isCommander) {
          preloader.value = true;
          getReportData();
          stopWatch();
        }
      }
    );
  }
});
</script>
<style lang="scss">
.btn_report {
  margin: 80px auto 48px !important;
  padding: 12px 32px !important;

  @media (max-width: 480px) {
    width: 90% !important;
  }
}

p.text.text-center {
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
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
  color: #1f7cc0;
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
  font-family: "Akrobat";
  line-height: 21.6px;
  font-weight: 500;
}

.v-expansion-panel-title {
  background: #f3f4f5;
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

.v-expansion-panel-title.visible-error,
.v-expansion-panel--active > .v-expansion-panel-title.visible-error {
  border-color: #db0000;
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

.field {
  span.v-expansion-panel-title__icon {
    display: none;
  }
  .d-flex.justify-space-between {
    column-gap: 10px;
  }
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
