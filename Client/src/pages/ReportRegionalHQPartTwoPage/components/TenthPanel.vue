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
          Всероссийская трудовая патриотическая акция «Поклонимся великим тем годам»
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
            title="Всероссийская трудовая патриотическая акция «Поклонимся великим тем годам»"
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
import { onMounted, ref, watchEffect } from "vue";
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

const formData = async (reportData, reportNumber) => {
  // console.log('reportData: ', reportData)
  let formData = new FormData();
  try {
    if (reportNumber === 1) {
      eleventhPanelDataFirst.value = { ...reportData };
      formData.append("event_happened", eleventhPanelDataFirst.value.event_happened);
      formData.append("comment", eleventhPanelDataFirst.value.comment || "");
      formData.append(
        "total_participants",
        eleventhPanelDataFirst.value.total_participants || ""
      );
      formData.append(
        "new_participants",
        eleventhPanelDataFirst.value.new_participants || ""
      );
      formData.append("beneficiaries", eleventhPanelDataFirst.value.beneficiaries || "");
      formData.append("settlements", eleventhPanelDataFirst.value.settlements || "");
      if (eleventhPanelDataFirst.value.document)
        formData.append("document", eleventhPanelDataFirst.value.document || "");
      if (eleventhPanelDataFirst.value.links.length) {
        for (let j = 0; j < eleventhPanelDataFirst.value.links.length; j++) {
          if (eleventhPanelDataFirst.value.links[j].link)
            formData.append(
              `[links][${j}][link]`,
              eleventhPanelDataFirst.value.links[j].link
            );
        }
      }
      if (isFirstSent.value.first) {
        const { data } = await reportPartTwoService.createMultipleReport(
          formData,
          "11",
          "1",
          true
        );
        emit("getData", data, 11, 1);
      } else {
        const { data } = await reportPartTwoService.createMultipleReportDraft(
          formData,
          "11",
          "1",
          true
        );
        emit("getData", data, 11, 1);
      }
    } else if (reportNumber === 2) {
      eleventhPanelDataSecond.value = { ...reportData };
      formData.append("event_happened", eleventhPanelDataSecond.value.event_happened);
      formData.append("comment", eleventhPanelDataSecond.value.comment || "");
      formData.append(
        "total_participants",
        eleventhPanelDataSecond.value.total_participants || ""
      );
      formData.append(
        "new_participants",
        eleventhPanelDataSecond.value.new_participants || ""
      );
      formData.append(
        "other_nko_participants",
        eleventhPanelDataSecond.value.other_nko_participants || ""
      );
      if (eleventhPanelDataSecond.value.document)
        formData.append("document", eleventhPanelDataSecond.value.document || "");
      if (eleventhPanelDataSecond.value.links.length) {
        for (let j = 0; j < eleventhPanelDataSecond.value.links.length; j++) {
          if (eleventhPanelDataSecond.value.links[j].link)
            formData.append(
              `[links][${j}][link]`,
              eleventhPanelDataSecond.value.links[j].link
            );
        }
      }
      if (isFirstSent.value.second) {
        const { data } = await reportPartTwoService.createMultipleReport(
          formData,
          "11",
          "2",
          true
        );
        emit("getData", data, 11, 2);
      } else {
        const { data } = await reportPartTwoService.createMultipleReportDraft(
          formData,
          "11",
          "2",
          true
        );
        emit("getData", data, 11, 2);
      }
    }
  } catch (e) {
    console.log("eleventh panel error: ", e);
  }
};

const uploadFile = async (event, reportNumber) => {
  let formData = new FormData();

  if (reportNumber === 1) {
    fileValidate(event.target.files[0], 7, isErrorFileFirst);
    if (isErrorFileFirst.value) {
      eleventhPanelDataFirst.value.event_happened = true;
      eleventhPanelDataFirst.value.document = event.target.files[0].name;
    } else {
      formData.append("document", event.target.files[0]);
      formData.append("event_happened", true);
      formData.append("comment", eleventhPanelDataFirst.value.comment || "");
      if (eleventhPanelDataFirst.value.links.length) {
        for (let j = 0; j < eleventhPanelDataFirst.value.links.length; j++) {
          if (eleventhPanelDataFirst.value.links[j].link)
            formData.append(
              `[links][${j}][link]`,
              eleventhPanelDataFirst.value.links[j].link
            );
        }
      }
      if (isFirstSent.value.first) {
        let { data } = await reportPartTwoService.createMultipleReport(
          formData,
          "11",
          "1",
          true
        );
        emit("getData", data, 11, 1);
      } else {
        let { data } = await reportPartTwoService.createMultipleReportDraft(
          formData,
          "11",
          "1",
          true
        );
        emit("getData", data, 11, 1);
      }
    }
  } else if (reportNumber === 2) {
    fileValidate(event.target.files[0], 7, isErrorFileSecond);
    if (isErrorFileSecond.value) {
      eleventhPanelDataSecond.value.event_happened = true;
      eleventhPanelDataSecond.value.document = event.target.files[0].name;
    } else {
      formData.append("document", event.target.files[0]);
      formData.append("event_happened", true);
      formData.append("comment", eleventhPanelDataSecond.value.comment || "");
      if (eleventhPanelDataSecond.value.links.length) {
        for (let j = 0; j < eleventhPanelDataSecond.value.links.length; j++) {
          if (eleventhPanelDataSecond.value.links[j].link)
            formData.append(
              `[links][${j}][link]`,
              eleventhPanelDataSecond.value.links[j].link
            );
        }
      }
      if (isFirstSent.value.second) {
        let { data } = await reportPartTwoService.createMultipleReport(
          formData,
          "11",
          "2",
          true
        );
        emit("getData", data, 11, 2);
      } else {
        let { data } = await reportPartTwoService.createMultipleReportDraft(
          formData,
          "11",
          "2",
          true
        );
        emit("getData", data, 11, 2);
      }
    }
  }
};
const deleteFile = async (reportNumber) => {
  let formData = new FormData();

  if (reportNumber === 1) {
    formData.append("event_happened", eleventhPanelDataFirst.value.event_happened);
    formData.append("document", "");
    formData.append("file_size", "");
    formData.append("file_type", "");
    formData.append("comment", eleventhPanelDataFirst.value.comment || "");
    if (eleventhPanelDataFirst.value.links.length) {
      for (let j = 0; j < eleventhPanelDataFirst.value.links.length; j++) {
        if (eleventhPanelDataFirst.value.links[j].link)
          formData.append(
            `[links][${j}][link]`,
            eleventhPanelDataFirst.value.links[j].link
          );
      }
    }
    if (isFirstSent.value.first) {
      let { data } = await reportPartTwoService.createMultipleReport(
        formData,
        "11",
        "1",
        true
      );
      emit("getData", data, 11, 1);
    } else {
      let { data } = await reportPartTwoService.createMultipleReportDraft(
        formData,
        "11",
        "1",
        true
      );
      emit("getData", data, 11, 1);
    }
  } else if (reportNumber === 2) {
    formData.append("event_happened", eleventhPanelDataSecond.value.event_happened);
    formData.append("document", "");
    formData.append("file_size", "");
    formData.append("file_type", "");
    formData.append("comment", eleventhPanelDataSecond.value.comment || "");
    if (eleventhPanelDataSecond.value.links.length) {
      for (let j = 0; j < eleventhPanelDataSecond.value.links.length; j++) {
        if (eleventhPanelDataSecond.value.links[j].link)
          formData.append(
            `[links][${j}][link]`,
            eleventhPanelDataSecond.value.links[j].link
          );
      }
    }
    if (isFirstSent.value.second) {
      let { data } = await reportPartTwoService.createMultipleReport(
        formData,
        "11",
        "2",
        true
      );
      emit("getData", data, 11, 2);
    } else {
      let { data } = await reportPartTwoService.createMultipleReportDraft(
        formData,
        "11",
        "2",
        true
      );
      emit("getData", data, 11, 2);
    }
  }
};

const deleteLink = (linkIndex, reportNumber) => {
  if (reportNumber === 1) {
    eleventhPanelDataFirst.value.links.splice(linkIndex, 1);
    formData(eleventhPanelDataFirst.value, 1);
  }
  if (reportNumber === 2) {
    eleventhPanelDataSecond.value.links.splice(linkIndex, 1);
    formData(eleventhPanelDataSecond.value, 2);
  }
};

const onClearForm = async (reportNumber) => {
  let formData = new FormData();
  formData.append("event_happened", false);
  formData.append("document", "");
  formData.append("[links][0][link]", "");
  formData.append("comment", "");
  if (reportNumber === 1) {
    if (isFirstSent.value.first) {
      const { data } = await reportPartTwoService.createMultipleReport(
        formData,
        "11",
        "1",
        true
      );
      emit("getData", data, 11, 1);
    } else {
      const { data } = await reportPartTwoService.createMultipleReportDraft(
        formData,
        "11",
        "1",
        true
      );
      emit("getData", data, 11, 1);
    }
  }
  if (reportNumber === 2) {
    if (isFirstSent.value.second) {
      const { data } = await reportPartTwoService.createMultipleReport(
        formData,
        "11",
        "2",
        true
      );
      emit("getData", data, 11, 2);
    } else {
      const { data } = await reportPartTwoService.createMultipleReportDraft(
        formData,
        "11",
        "2",
        true
      );
      emit("getData", data, 11, 2);
    }
  }
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

watchEffect(() => {
  if (props.data.first) {
    isFirstSent.value.first = false;
    eleventhPanelDataFirst.value = { ...props.data.first };
    // console.log('props.data.first', props.data.first)
    isFirstSent.value.first =
      reportStore.isReportReject.eleventh.first && !props.data.first.central_version;
    // console.log('isFirstSent.value.first', isFirstSent.value.first)
  }
  if (props.data.second) {
    isFirstSent.value.second = false;
    eleventhPanelDataSecond.value = { ...props.data.second };
    isFirstSent.value.second =
      reportStore.isReportReject.eleventh.second && !props.data.second.central_version;
    // console.log('isFirstSent.value.second', isFirstSent.value.second)
  }

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
