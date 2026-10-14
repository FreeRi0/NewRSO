<template>
  <div style="margin-right: 10px; margin-bottom: 10px">
    <v-expansion-panels v-model="panel">
      <v-expansion-panel
        v-if="
          (props.centralExpert && !props.revisionPanels.length) ||
          (props.tab === 'Просмотр отправленного отчета' && !props.centralExpert) ||
          (reportStore.isReportReject.eleventh.first && props.tab === 'Доработка') ||
          (props.tab === 'Просмотр отправленного отчета' &&
            !reportStore.reportDataCH.eleventh.first?.verified_by_chq)
        "
      >
        <v-expansion-panel-title>
          Всероссийская патриотическая акция «Снежный Десант РСО»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm
            :id="1"
            :districtExpert="districtExpert"
            :centralExpert="centralExpert"
            :data="eleventhPanelDataFirst"
            @formData="formData($event, 1)"
            @uploadFile="uploadFile($event, 1)"
            @deleteFile="deleteFile(1)"
            @collapse-form="collapseForm"
            @deleteLink="deleteLink($event, 1)"
            @clearForm="onClearForm(1)"
            :isErrorFileProp="isErrorFileFirst"
            title="Всероссийская патриотическая акция «Снежный Десант РСО»"
            :dataDH="eleventhPanelDataFirstDH"
            :dataForCheckCH="eleventhPanelDataForCheckCHFirst"
            :dataCH="eleventhPanelDataCHFirst"
            :document="documentFirst"
            :documentCH="documentCHFirst"
            @getDataDH="getDataDH($event, 1)"
            @getDataCH="getDataCH($event, 1)"
            :returnReportProp="reportStore.returnReport.eleventh.first"
            @onReturnReport="onReturnReport($event, 1)"
            :isReportReject="reportStore.isReportReject.eleventh.first"
            :reportRejectData="reportStore.reportReject.eleventh.first"
            :tab="props.tab"
            :reportVerifiedByCH="reportVerifiedByCHFirst"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel
        v-if="
          (props.centralExpert && !props.revisionPanels.length) ||
          (props.tab === 'Просмотр отправленного отчета' && !props.centralExpert) ||
          (reportStore.isReportReject.eleventh.second && props.tab === 'Доработка') ||
          (props.tab === 'Просмотр отправленного отчета' &&
            !reportStore.reportDataCH.eleventh.second?.verified_by_chq)
        "
      >
        <v-expansion-panel-title>
          Всероссийская патриотическая акция «Поклонимся великим тем годам»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm
            :id="2"
            :districtExpert="districtExpert"
            :centralExpert="centralExpert"
            :data="eleventhPanelDataSecond"
            @formData="formData($event, 2)"
            @uploadFile="uploadFile($event, 2)"
            @deleteFile="deleteFile(2)"
            @collapse-form="collapseForm"
            @deleteLink="deleteLink($event, 2)"
            @clearForm="onClearForm(2)"
            :isErrorFileProp="isErrorFileSecond"
            title="Всероссийская патриотическая акция «Поклонимся великим тем годам»"
            :dataDH="eleventhPanelDataSecondDH"
            :dataForCheckCH="eleventhPanelDataForCheckCHSecond"
            :dataCH="eleventhPanelDataCHSecond"
            :document="documentSecond"
            :documentCH="documentCHSecond"
            @getDataDH="getDataDH($event, 2)"
            @getDataCH="getDataCH($event, 2)"
            :returnReportProp="reportStore.returnReport.eleventh.second"
            @onReturnReport="onReturnReport($event, 2)"
            :isReportReject="reportStore.isReportReject.eleventh.second"
            :reportRejectData="reportStore.reportReject.eleventh.second"
            :tab="props.tab"
            :reportVerifiedByCH="reportVerifiedByCHSecond"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { TenthPanelForm } from "./index";
import { reportPartTwoService } from "@services/ReportService.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean,
  },
  centralExpert: {
    type: Boolean,
  },
  reportId: {
    type: String,
    default: "",
  },
  data: Object,
  tab: String,
  revisionPanels: Array,
});

const emit = defineEmits([
  "getData",
  "getDataDHFirst",
  "getDataDHSecond",
  "getDataCHFirst",
  "getDataCHSecond",
  "getDataCHFirst",
  "getDataCHSecond",
]);

const isFirstSent = ref({
  first: true,
  second: true,
});
const eleventhPanelDataFirst = ref({
  event_happened: null,
  document: "",
  file_size: "",
  file_type: "",
  comment: "",
  number_members: "",
  number_new_members: "",
  number_beneficiaries: "",
  number_settlements: "",
  links: [
    {
      link: "",
    },
  ],
});
const eleventhPanelDataFirstDH = ref({
  event_happened: null,
  comment: "",
  document: null,
});
const eleventhPanelDataSecond = ref({
  event_happened: null,
  document: "",
  file_size: "",
  file_type: "",
  comment: "",
  number_members: "",
  number_new_members: "",
  number_beneficiaries: "",
  number_settlements: "",
  links: [
    {
      link: "",
    },
  ],
});
const eleventhPanelDataSecondDH = ref({
  event_happened: null,
  comment: "",
  document: null,
});
const panel = ref(false);
let isErrorFileFirst = ref(false);
let isErrorFileSecond = ref(false);
const documentFirst = ref(null);
const documentSecond = ref(null);
const eleventhPanelDataForCheckCHFirst = ref();
const eleventhPanelDataForCheckCHSecond = ref();
const documentCHFirst = ref(null);
const documentCHSecond = ref(null);
const eleventhPanelDataCHFirst = ref(null);
const eleventhPanelDataCHSecond = ref(null);
const returnReportFirst = ref();
const returnReportSecond = ref();
const reportVerifiedByCHFirst = ref(false);
const reportVerifiedByCHSecond = ref(false);

const collapseForm = () => {
  panel.value = false;
};

const sendQueue = {
  1: Promise.resolve(),
  2: Promise.resolve(),
};
const lastRequestId = {
  1: 0,
  2: 0,
};

const getPanelData = (reportNumber) =>
  reportNumber === 1 ? eleventhPanelDataFirst : eleventhPanelDataSecond;

const sendReport = async (formData, reportNumber) => {
  const requestId = ++lastRequestId[reportNumber];
  const isFirst =
    reportNumber === 1 ? isFirstSent.value.first : isFirstSent.value.second;
  const request = sendQueue[reportNumber].then(() =>
    isFirst
      ? reportPartTwoService.createMultipleReport(
          formData,
          "11",
          String(reportNumber),
          true
        )
      : reportPartTwoService.createMultipleReportDraft(
          formData,
          "11",
          String(reportNumber),
          true
        )
  );
  sendQueue[reportNumber] = request.catch(() => {});

  const { data } = await request;
  if (requestId === lastRequestId[reportNumber]) {
    emit("getData", data, 11, reportNumber);
  }
};

const buildFormData = (data, reportNumber) => {
  let formData = new FormData();
  formData.append("event_happened", data.event_happened);
  formData.append("comment", data.comment || "");
  formData.append("total_participants", data.total_participants || "");
  formData.append("new_participants", data.new_participants || "");
  if (reportNumber === 1) {
    formData.append("beneficiaries", data.beneficiaries || "");
    formData.append("settlements", data.settlements || "");
  } else {
    formData.append("other_nko_participants", data.other_nko_participants || "");
  }
  if (data.links?.length) {
    for (let j = 0; j < data.links.length; j++) {
      if (data.links[j].link) formData.append(`[links][${j}][link]`, data.links[j].link);
    }
  }
  return formData;
};

const formData = async (reportData, reportNumber) => {
  try {
    const panelData = getPanelData(reportNumber);
    panelData.value = { ...reportData };
    const formData = buildFormData(panelData.value, reportNumber);
    if (panelData.value.document) formData.append("document", panelData.value.document);
    await sendReport(formData, reportNumber);
  } catch (e) {
    console.log("eleventh panel error: ", e);
  }
};

const uploadFile = async (event, reportNumber) => {
  const panelData = getPanelData(reportNumber);
  const isErrorFile = reportNumber === 1 ? isErrorFileFirst : isErrorFileSecond;

  fileValidate(event.target.files[0], 7, isErrorFile);
  if (isErrorFile.value) {
    panelData.value.event_happened = true;
    panelData.value.document = event.target.files[0].name;
    return;
  }

  const formData = buildFormData({ ...panelData.value, event_happened: true }, reportNumber);
  formData.append("document", event.target.files[0]);
  await sendReport(formData, reportNumber);
};

const deleteFile = async (reportNumber) => {
  const formData = buildFormData(getPanelData(reportNumber).value, reportNumber);
  formData.append("document", "");
  formData.append("file_size", "");
  formData.append("file_type", "");
  await sendReport(formData, reportNumber);
};

const deleteLink = (linkIndex, reportNumber) => {
  const panelData = getPanelData(reportNumber);
  panelData.value.links.splice(linkIndex, 1);
  formData(panelData.value, reportNumber);
};

const onClearForm = async (reportNumber) => {
  let formData = new FormData();
  formData.append("event_happened", false);
  formData.append("document", "");
  formData.append("[links][0][link]", "");
  formData.append("comment", "");
  await sendReport(formData, reportNumber);
};

const getDataDH = (data, reportNumber) => {
  let formData = new FormData();
  if (reportNumber === 1) {
    reportStore.reportDataDH.eleventh.first.event_happened = data.event_happened;
    reportStore.reportDataDH.eleventh.first.comment = data.comment;

    formData.append("event_happened", data.event_happened);
    formData.append("comment", data.comment || "");

    if (data.document) {
      reportStore.reportDataDHFile.eleventh.first = data.document;
      formData.append("document", data.document);
    } else {
      reportStore.reportDataDHFile.eleventh.first = null;
      documentFirst.value = null;
      formData.append("document", "");
    }

    emit("getDataDHFirst", formData, 11, 1);
  }
  if (reportNumber === 2) {
    reportStore.reportDataDH.eleventh.second.event_happened = data.event_happened;
    reportStore.reportDataDH.eleventh.second.comment = data.comment;

    formData.append("event_happened", data.event_happened);
    formData.append("comment", data.comment || "");

    if (data.document) {
      reportStore.reportDataDHFile.eleventh.second = data.document;
      formData.append("document", data.document);
    } else {
      reportStore.reportDataDHFile.eleventh.second = null;
      documentSecond.value = null;
      formData.append("document", "");
    }

    emit("getDataDHSecond", formData, 11, 2);
  }
};

const getDataCH = (data, reportNumber) => {
  let formData = new FormData();
  if (reportNumber === 1) {
    reportStore.reportDataCH.eleventh.first.event_happened = data.event_happened;
    reportStore.reportDataCH.eleventh.first.comment = data.comment;

    formData.append("event_happened", data.event_happened);
    formData.append("comment", data.comment || "");
    if (returnReportFirst.value) formData.append("reasons[comment]", data.comment || "");

    if (data.document) {
      reportStore.reportDataCHFile.eleventh.first = data.document;
      formData.append("document", data.document);
    } else {
      reportStore.reportDataCHFile.eleventh.first = null;
      documentCHFirst.value = null;
    }

    emit("getDataCHFirst", formData, 11, 1);
  }
  if (reportNumber === 2) {
    reportStore.reportDataCH.eleventh.second.event_happened = data.event_happened;
    reportStore.reportDataCH.eleventh.second.comment = data.comment;

    formData.append("event_happened", data.event_happened);
    formData.append("comment", data.comment || "");
    if (returnReportSecond.value) formData.append("reasons[comment]", data.comment || "");

    if (data.document) {
      reportStore.reportDataCHFile.eleventh.second = data.document;
      formData.append("document", data.document);
    } else {
      reportStore.reportDataCHFile.eleventh.second = null;
      documentCHSecond.value = null;
    }

    emit("getDataCHSecond", formData, 11, 2);
  }
};

const onReturnReport = (event, reportNumber) => {
  let formData = new FormData();
  if (reportNumber === 1) {
    if (event.reportReturn) {
      reportStore.returnReport.eleventh.first = true;
      reportStore.reportDataCH.eleventh.first.event_happened = event.data.event_happened;
      reportStore.reportDataCH.eleventh.first.comment = event.data.comment;

      formData.append("event_happened", event.data.event_happened);
      formData.append("comment", event.data.comment || "");
      formData.append("reasons[comment]", event.data.comment || "");

      if (event.data.document) {
        reportStore.reportDataCHFile.eleventh.first = event.data.document;
        formData.append("document", event.data.document);
      } else {
        reportStore.reportDataCHFile.eleventh.first = null;
        documentCHFirst.value = null;
      }

      emit("getDataCHFirst", formData, 11, 1);
    } else {
      reportStore.returnReport.eleventh.first = false;
      reportStore.reportDataCH.eleventh.first.event_happened = event.data.event_happened;
      reportStore.reportDataCH.eleventh.first.comment = event.data.comment;

      formData.append("event_happened", event.data.event_happened);
      formData.append("comment", event.data.comment || "");

      if (event.data.document) {
        reportStore.reportDataCHFile.eleventh.first = event.data.document;
        formData.append("document", event.data.document);
      } else {
        reportStore.reportDataCHFile.eleventh.first = null;
        documentCHFirst.value = null;
      }

      emit("getDataCHFirst", formData, 11, 1);
    }
  }
  if (reportNumber === 2) {
    if (event.reportReturn) {
      reportStore.returnReport.eleventh.second = true;
      reportStore.reportDataCH.eleventh.second = event.data;

      formData.append("event_happened", event.data.event_happened);
      formData.append("comment", event.data.comment || "");
      formData.append("reasons[comment]", event.data.comment || "");

      if (event.data.document) {
        reportStore.reportDataCHFile.eleventh.second = event.data.document;
        formData.append("document", event.data.document);
      } else {
        reportStore.reportDataCHFile.eleventh.second = null;
        documentCHSecond.value = null;
      }

      emit("getDataCHSecond", formData, 11, 2);
    } else {
      reportStore.returnReport.eleventh.second = false;
      reportStore.reportDataCH.eleventh.second = event.data;

      formData.append("event_happened", event.data.event_happened);
      formData.append("comment", event.data.comment || "");

      if (event.data.document) {
        reportStore.reportDataCHFile.eleventh.second = event.data.document;
        formData.append("document", event.data.document);
      } else {
        reportStore.reportDataCHFile.eleventh.second = null;
        documentCHSecond.value = null;
      }

      emit("getDataCHSecond", formData, 11, 2);
    }
  }
};

onMounted(() => {
  if (reportStore.reportDataDH.eleventh.first) {
    eleventhPanelDataFirstDH.value = reportStore.reportDataDH.eleventh.first;
  }
  if (reportStore.reportDataDH.eleventh.second) {
    eleventhPanelDataSecondDH.value = reportStore.reportDataDH.eleventh.second;
  }

  reportVerifiedByCHFirst.value =
    reportStore.reportForCheckCH.eleventh.first?.verified_by_chq !== null;
  reportVerifiedByCHSecond.value =
    reportStore.reportForCheckCH.eleventh.second?.verified_by_chq !== null;

  // Добавление данных для отчета эксперта ЦШ
  if (reportStore.reportForCheckCH.eleventh.first && props.centralExpert) {
    eleventhPanelDataForCheckCHFirst.value = reportStore.reportForCheckCH.eleventh.first;
  }
  if (reportStore.reportForCheckCH.eleventh.second && props.centralExpert) {
    eleventhPanelDataForCheckCHSecond.value =
      reportStore.reportForCheckCH.eleventh.second;
  }

  // Добавление данных из стора для панели "корректировка ЦШ"
  if (reportStore.reportDataCH.eleventh.first && props.centralExpert) {
    eleventhPanelDataCHFirst.value = reportStore.reportDataCH.eleventh.first;
  }
  if (reportStore.reportDataCH.eleventh.second && props.centralExpert) {
    eleventhPanelDataCHSecond.value = reportStore.reportDataCH.eleventh.second;
  }
});

watch(
  () => props.data.first,
  (data) => {
    if (!data) return;
    eleventhPanelDataFirst.value = { ...data };
    isFirstSent.value.first =
      reportStore.isReportReject.eleventh.first && !data.central_version;
  },
  { immediate: true }
);

watch(
  () => props.data.second,
  (data) => {
    if (!data) return;
    eleventhPanelDataSecond.value = { ...data };
    isFirstSent.value.second =
      reportStore.isReportReject.eleventh.second && !data.central_version;
  },
  { immediate: true }
);

watchEffect(() => {
  if (reportStore.reportDataDHFile.eleventh.first) {
    documentFirst.value = reportStore.reportDataDHFile.eleventh.first;
  }
  if (reportStore.reportDataDHFile.eleventh.second) {
    documentSecond.value = reportStore.reportDataDHFile.eleventh.second;
  }

  if (reportStore.reportDataCHFile.eleventh.first) {
    documentCHFirst.value = reportStore.reportDataCHFile.eleventh.first;
  }
  if (reportStore.reportDataCHFile.eleventh.second) {
    documentCHSecond.value = reportStore.reportDataCHFile.eleventh.second;
  }
  if (props.centralExpert) {
    returnReportFirst.value = reportStore.returnReport.eleventh.first;
    returnReportSecond.value = reportStore.returnReport.eleventh.second;
  }
});
</script>
<style scoped>
.v-expansion-panels {
  gap: 8px;
}

.v-expansion-panel-title {
  background: #f3f4f5;
  margin: 0px;
  border-radius: 10px;
  font-family: Akrobat;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  border: none;
}
</style>
