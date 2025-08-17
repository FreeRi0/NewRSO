<template>
  <div style="margin-right: 10px; margin-bottom: 10px;">
    <v-expansion-panels v-model="panel">
      <v-expansion-panel v-if="(props.centralExpert && !props.revisionPanels.length) || (props.tab === 'Просмотр отправленного отчета' && !props.centralExpert)
      || (reportStore.isReportReject.tenth.first && props.tab === 'Доработка') || (props.tab === 'Просмотр отправленного отчета' && !reportStore.reportDataCH.tenth.first?.verified_by_chq)"
      >
        <v-expansion-panel-title>
          Всероссийская патриотическая акция «Снежный Десант РСО»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm
              :key="1"
              :districtExpert="districtExpert"
              :centralExpert="centralExpert"
              :data="tenthPanelDataFirst"
              @formData="formData($event, 1)"
              @uploadFile="uploadFile($event, 1)"
              @deleteFile="deleteFile(1)"
              @collapse-form="collapseForm"
              @deleteLink="deleteLink($event, 1)"
              @clearForm="onClearForm(1)"
              :isErrorFileProp="isErrorFileFirst"
              title="Всероссийская патриотическая акция «Снежный Десант РСО»"
              :dataDH="tenthPanelDataFirstDH"
              :dataForCheckCH="tenthPanelDataForCheckCHFirst"
              :dataCH="tenthPanelDataCHFirst"
              :document="documentFirst"
              :documentCH="documentCHFirst"
              @getDataDH="getDataDH($event, 1)"
              @getDataCH="getDataCH($event, 1)"
              :returnReportProp="reportStore.returnReport.tenth.first"
              @onReturnReport="onReturnReport($event, 1)"
              :isReportReject="reportStore.isReportReject.tenth.first"
              :reportRejectData="reportStore.reportReject.tenth.first"
              :tab="props.tab"
              :reportVerifiedByCH="reportVerifiedByCHFirst"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel v-if="(props.centralExpert && !props.revisionPanels.length) || (props.tab === 'Просмотр отправленного отчета' && !props.centralExpert)
      || (reportStore.isReportReject.tenth.second && props.tab === 'Доработка') || (props.tab === 'Просмотр отправленного отчета' && !reportStore.reportDataCH.tenth.second?.verified_by_chq)">
        <v-expansion-panel-title>
          Всероссийская трудовая патриотическая акция «Поклонимся великим тем годам»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm
              :key="2"
              :districtExpert="districtExpert"
              :centralExpert="centralExpert"
              :data="tenthPanelDataSecond"
              @formData="formData($event, 2)"
              @uploadFile="uploadFile($event, 2)"
              @deleteFile="deleteFile(2)"
              @collapse-form="collapseForm"
              @deleteLink="deleteLink($event, 2)"
              @clearForm="onClearForm(2)"
              :isErrorFileProp="isErrorFileSecond"
              title="Всероссийская трудовая патриотическая акция «Поклонимся великим тем годам»"
              :dataDH="tenthPanelDataSecondDH"
              :dataForCheckCH="tenthPanelDataForCheckCHSecond"
              :dataCH="tenthPanelDataCHSecond"
              :document="documentSecond"
              :documentCH="documentCHSecond"
              @getDataDH="getDataDH($event, 2)"
              @getDataCH="getDataCH($event, 2)"
              :returnReportProp="reportStore.returnReport.tenth.second"
              @onReturnReport="onReturnReport($event, 2)"
              :isReportReject="reportStore.isReportReject.tenth.second"
              :reportRejectData="reportStore.reportReject.tenth.second"
              :tab="props.tab"
              :reportVerifiedByCH="reportVerifiedByCHSecond"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import {onMounted, ref, watchEffect} from "vue";
import {TenthPanelForm} from './index';
import {reportPartTwoService} from "@services/ReportService.ts";
import {fileValidate} from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import {useReportPartTwoStore} from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  reportId: {
    type: String,
    default: '',
  },
  data: Object,
  tab: String,
  revisionPanels: Array
});

const emit = defineEmits(['getData', 'getDataDHFirst', 'getDataDHSecond', 'getDataCHFirst', 'getDataCHSecond', 'getDataCHFirst', 'getDataCHSecond']);

const isFirstSent = ref({
  first: true,
  second: true,
});
const tenthPanelDataFirst = ref({
  event_happened: null,
  document: '',
  file_size: '',
  file_type: '',
  comment: '',
  number_members: '',
  number_new_members: '',
  number_beneficiaries: '',
  number_settlements: '',
  links: [
    {
      link: '',
    },
  ],
});
const tenthPanelDataFirstDH = ref({
  event_happened: null,
  comment: '',
  document: null,
});
const tenthPanelDataSecond = ref({
  event_happened: null,
  document: '',
  file_size: '',
  file_type: '',
  comment: '',
  number_members: '',
  number_new_members: '',
  number_beneficiaries: '',
  number_settlements: '',
  links: [
    {
      link: '',
    },
  ],
});
const tenthPanelDataSecondDH = ref({
  event_happened: null,
  comment: '',
  document: null,
});
const panel = ref(false);
let isErrorFileFirst = ref(false);
let isErrorFileSecond = ref(false);
const documentFirst = ref(null);
const documentSecond = ref(null);
const tenthPanelDataForCheckCHFirst = ref();
const tenthPanelDataForCheckCHSecond = ref();
const documentCHFirst = ref(null);
const documentCHSecond = ref(null);
const tenthPanelDataCHFirst = ref(null);
const tenthPanelDataCHSecond = ref(null);
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
      tenthPanelDataFirst.value = {...reportData}
      formData.append('event_happened', tenthPanelDataFirst.value.event_happened);
      formData.append('comment', tenthPanelDataFirst.value.comment || '');
      formData.append('number_members', tenthPanelDataFirst.value.number_members || '');
      if (tenthPanelDataFirst.value.document) formData.append('document', tenthPanelDataFirst.value.document || '');
      if (tenthPanelDataFirst.value.links.length) {
        for (let j = 0; j < tenthPanelDataFirst.value.links.length; j++) {
          if (tenthPanelDataFirst.value.links[j].link) formData.append(`[links][${j}][link]`, tenthPanelDataFirst.value.links[j].link);
        }
      }
      if (isFirstSent.value.first) {
        const {data} = await reportPartTwoService.createMultipleReport(formData, '10', '1', true);
        emit('getData', data, 10, 1);
      } else {
        const {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '1', true);
        emit('getData', data, 10, 1);
      }
    } else if (reportNumber === 2) {
      tenthPanelDataSecond.value = {...reportData}
      formData.append('event_happened', tenthPanelDataSecond.value.event_happened);
      formData.append('comment', tenthPanelDataSecond.value.comment || '');
      if (tenthPanelDataSecond.value.document) formData.append('document', tenthPanelDataSecond.value.document || '');
      if (tenthPanelDataSecond.value.links.length) {
        for (let j = 0; j < tenthPanelDataSecond.value.links.length; j++) {
          if (tenthPanelDataSecond.value.links[j].link) formData.append(`[links][${j}][link]`, tenthPanelDataSecond.value.links[j].link);
        }
      }
      if (isFirstSent.value.second) {
        const {data} = await reportPartTwoService.createMultipleReport(formData, '10', '2', true);
        emit('getData', data, 10, 2);
      } else {
        const {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '2', true);
        emit('getData', data, 10, 2);
      }
    }
  } catch (e) {
    console.log('tenth panel error: ', e);
  }
};

const uploadFile = async (event, reportNumber) => {
  let formData = new FormData();

  if (reportNumber === 1) {
    fileValidate(event.target.files[0], 7, isErrorFileFirst);
    if (isErrorFileFirst.value) {
      tenthPanelDataFirst.value.event_happened = true;
      tenthPanelDataFirst.value.document = event.target.files[0].name;
    } else {
      formData.append('document', event.target.files[0]);
      formData.append('event_happened', true);
      formData.append('comment', tenthPanelDataFirst.value.comment || '');
      if (tenthPanelDataFirst.value.links.length) {
        for (let j = 0; j < tenthPanelDataFirst.value.links.length; j++) {
          if (tenthPanelDataFirst.value.links[j].link) formData.append(`[links][${j}][link]`, tenthPanelDataFirst.value.links[j].link);
        }
      }
      if (isFirstSent.value.first) {
        let {data} = await reportPartTwoService.createMultipleReport(formData, '10', '1', true);
        emit('getData', data, 10, 1);
      } else {
        let {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '1', true);
        emit('getData', data, 10, 1);
      }
    }
  } else if (reportNumber === 2) {
    fileValidate(event.target.files[0], 7, isErrorFileSecond);
    if (isErrorFileSecond.value) {
      tenthPanelDataSecond.value.event_happened = true;
      tenthPanelDataSecond.value.document = event.target.files[0].name;
    } else {
      formData.append('document', event.target.files[0]);
      formData.append('event_happened', true);
      formData.append('comment', tenthPanelDataSecond.value.comment || '');
      if (tenthPanelDataSecond.value.links.length) {
        for (let j = 0; j < tenthPanelDataSecond.value.links.length; j++) {
          if (tenthPanelDataSecond.value.links[j].link) formData.append(`[links][${j}][link]`, tenthPanelDataSecond.value.links[j].link);
        }
      }
      if (isFirstSent.value.second) {
        let {data} = await reportPartTwoService.createMultipleReport(formData, '10', '2', true);
        emit('getData', data, 10, 2);
      } else {
        let {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '2', true);
        emit('getData', data, 10, 2);
      }
    }
  }

};
const deleteFile = async (reportNumber) => {
  let formData = new FormData();

  if (reportNumber === 1) {
    formData.append('event_happened', tenthPanelDataFirst.value.event_happened);
    formData.append('document', '');
    formData.append('file_size', '');
    formData.append('file_type', '');
    formData.append('comment', tenthPanelDataFirst.value.comment || '');
    if (tenthPanelDataFirst.value.links.length) {
      for (let j = 0; j < tenthPanelDataFirst.value.links.length; j++) {
        if (tenthPanelDataFirst.value.links[j].link) formData.append(`[links][${j}][link]`, tenthPanelDataFirst.value.links[j].link);
      }
    }
    if (isFirstSent.value.first) {
      let {data} = await reportPartTwoService.createMultipleReport(formData, '10', '1', true);
      emit('getData', data, 10, 1);
    } else {
      let {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '1', true);
      emit('getData', data, 10, 1);
    }
  } else if (reportNumber === 2) {
    formData.append('event_happened', tenthPanelDataSecond.value.event_happened);
    formData.append('document', '');
    formData.append('file_size', '');
    formData.append('file_type', '');
    formData.append('comment', tenthPanelDataSecond.value.comment || '');
    if (tenthPanelDataSecond.value.links.length) {
      for (let j = 0; j < tenthPanelDataSecond.value.links.length; j++) {
        if (tenthPanelDataSecond.value.links[j].link) formData.append(`[links][${j}][link]`, tenthPanelDataSecond.value.links[j].link);
      }
    }
    if (isFirstSent.value.second) {
      let {data} = await reportPartTwoService.createMultipleReport(formData, '10', '2', true);
      emit('getData', data, 10, 2);
    } else {
      let {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '2', true);
      emit('getData', data, 10, 2);
    }
  }
};

const deleteLink = (linkIndex, reportNumber) => {
  if (reportNumber === 1) {
    tenthPanelDataFirst.value.links.splice(linkIndex, 1)
    formData(tenthPanelDataFirst.value, 1)
  }
  if (reportNumber === 2) {
    tenthPanelDataSecond.value.links.splice(linkIndex, 1)
    formData(tenthPanelDataSecond.value, 2)
  }
};

const onClearForm = async (reportNumber) => {
  let formData = new FormData();
  formData.append('event_happened', false);
  formData.append('document', '');
  formData.append('[links][0][link]', '');
  formData.append('comment', '');
  if (reportNumber === 1) {
    if (isFirstSent.value.first) {
      const {data} = await reportPartTwoService.createMultipleReport(formData, '10', '1', true);
      emit('getData', data, 10, 1);
    } else {
      const {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '1', true);
      emit('getData', data, 10, 1);
    }
  }
  if (reportNumber === 2) {
    if (isFirstSent.value.second) {
      const {data} = await reportPartTwoService.createMultipleReport(formData, '10', '2', true);
      emit('getData', data, 10, 2);
    } else {
      const {data} = await reportPartTwoService.createMultipleReportDraft(formData, '10', '2', true);
      emit('getData', data, 10, 2);
    }
  }
};

const getDataDH = (data, reportNumber) => {
  let formData = new FormData();
  if (reportNumber === 1) {
    reportStore.reportDataDH.tenth.first.event_happened = data.event_happened;
    reportStore.reportDataDH.tenth.first.comment = data.comment;

    formData.append('event_happened', data.event_happened);
    formData.append('comment', data.comment || '');

    if (data.document) {
      reportStore.reportDataDHFile.tenth.first = data.document;
      formData.append('document', data.document);
    } else {
      reportStore.reportDataDHFile.tenth.first = null;
      documentFirst.value = null
      formData.append('document', '');
    }

    emit('getDataDHFirst', formData, 10, 1);
  }
  if (reportNumber === 2) {
    reportStore.reportDataDH.tenth.second.event_happened = data.event_happened;
    reportStore.reportDataDH.tenth.second.comment = data.comment;

    formData.append('event_happened', data.event_happened);
    formData.append('comment', data.comment || '');

    if (data.document) {
      reportStore.reportDataDHFile.tenth.second = data.document;
      formData.append('document', data.document);
    } else {
      reportStore.reportDataDHFile.tenth.second = null;
      documentSecond.value = null;
      formData.append('document', '');
    }

    emit('getDataDHSecond', formData, 10, 2);
  }
};

const getDataCH = (data, reportNumber) => {
  let formData = new FormData();
  if (reportNumber === 1) {
    reportStore.reportDataCH.tenth.first.event_happened = data.event_happened;
    reportStore.reportDataCH.tenth.first.comment = data.comment;

    formData.append('event_happened', data.event_happened);
    formData.append('comment', data.comment || '');
    if (returnReportFirst.value) formData.append('reasons[comment]', data.comment || '');

    if (data.document) {
      reportStore.reportDataCHFile.tenth.first = data.document;
      formData.append('document', data.document);
    } else {
      reportStore.reportDataCHFile.tenth.first = null;
      documentCHFirst.value = null
    }

    emit('getDataCHFirst', formData, 10, 1);
  }
  if (reportNumber === 2) {
    reportStore.reportDataCH.tenth.second.event_happened = data.event_happened;
    reportStore.reportDataCH.tenth.second.comment = data.comment;

    formData.append('event_happened', data.event_happened);
    formData.append('comment', data.comment || '');
    if (returnReportSecond.value) formData.append('reasons[comment]', data.comment || '');

    if (data.document) {
      reportStore.reportDataCHFile.tenth.second = data.document;
      formData.append('document', data.document);
    } else {
      reportStore.reportDataCHFile.tenth.second = null;
      documentCHSecond.value = null;
    }

    emit('getDataCHSecond', formData, 10, 2);
  }
};

const onReturnReport = (event, reportNumber) => {
  let formData = new FormData();
  if (reportNumber === 1) {
    if (event.reportReturn) {
      reportStore.returnReport.tenth.first = true;
      reportStore.reportDataCH.tenth.first.event_happened = event.data.event_happened;
      reportStore.reportDataCH.tenth.first.comment = event.data.comment;

      formData.append('event_happened', event.data.event_happened);
      formData.append('comment', event.data.comment || '');
      formData.append('reasons[comment]', event.data.comment || '');

      if (event.data.document) {
        reportStore.reportDataCHFile.tenth.first = event.data.document;
        formData.append('document', event.data.document);
      } else {
        reportStore.reportDataCHFile.tenth.first = null;
        documentCHFirst.value = null
      }

      emit('getDataCHFirst', formData, 10, 1);
    } else {
      reportStore.returnReport.tenth.first = false;
      reportStore.reportDataCH.tenth.first.event_happened = event.data.event_happened;
      reportStore.reportDataCH.tenth.first.comment = event.data.comment;

      formData.append('event_happened', event.data.event_happened);
      formData.append('comment', event.data.comment || '');

      if (event.data.document) {
        reportStore.reportDataCHFile.tenth.first = event.data.document;
        formData.append('document', event.data.document);
      } else {
        reportStore.reportDataCHFile.tenth.first = null;
        documentCHFirst.value = null
      }

      emit('getDataCHFirst', formData, 10, 1);
    }
  }
  if (reportNumber === 2) {
    if (event.reportReturn) {
      reportStore.returnReport.tenth.second = true;
      reportStore.reportDataCH.tenth.second = event.data;

      formData.append('event_happened', event.data.event_happened);
      formData.append('comment', event.data.comment || '');
      formData.append('reasons[comment]', event.data.comment || '');

      if (event.data.document) {
        reportStore.reportDataCHFile.tenth.second = event.data.document;
        formData.append('document', event.data.document);
      } else {
        reportStore.reportDataCHFile.tenth.second = null;
        documentCHSecond.value = null;
      }

      emit('getDataCHSecond', formData, 10, 2);
    } else {
      reportStore.returnReport.tenth.second = false;
      reportStore.reportDataCH.tenth.second = event.data;

      formData.append('event_happened', event.data.event_happened);
      formData.append('comment', event.data.comment || '');

      if (event.data.document) {
        reportStore.reportDataCHFile.tenth.second = event.data.document;
        formData.append('document', event.data.document);
      } else {
        reportStore.reportDataCHFile.tenth.second = null;
        documentCHSecond.value = null;
      }

      emit('getDataCHSecond', formData, 10, 2);
    }
  }
}

onMounted(() => {
  if (reportStore.reportDataDH.tenth.first) {
    tenthPanelDataFirstDH.value = reportStore.reportDataDH.tenth.first;
  }
  if (reportStore.reportDataDH.tenth.second) {
    tenthPanelDataSecondDH.value = reportStore.reportDataDH.tenth.second;
  }

  reportVerifiedByCHFirst.value = reportStore.reportForCheckCH.tenth.first?.verified_by_chq !== null;
  reportVerifiedByCHSecond.value = reportStore.reportForCheckCH.tenth.second?.verified_by_chq !== null;

  // Добавление данных для отчета эксперта ЦШ
  if (reportStore.reportForCheckCH.tenth.first && props.centralExpert) {
    tenthPanelDataForCheckCHFirst.value = reportStore.reportForCheckCH.tenth.first;
  }
  if (reportStore.reportForCheckCH.tenth.second && props.centralExpert) {
    tenthPanelDataForCheckCHSecond.value = reportStore.reportForCheckCH.tenth.second;
  }

  // Добавление данных из стора для панели "корректировка ЦШ"
  if (reportStore.reportDataCH.tenth.first && props.centralExpert) {
    tenthPanelDataCHFirst.value = reportStore.reportDataCH.tenth.first
  }
  if (reportStore.reportDataCH.tenth.second && props.centralExpert) {
    tenthPanelDataCHSecond.value = reportStore.reportDataCH.tenth.second
  }
})

watchEffect(() => {
  if (props.data.first) {
    isFirstSent.value.first = false;
    tenthPanelDataFirst.value = {...props.data.first}
    // console.log('props.data.first', props.data.first)
    isFirstSent.value.first = reportStore.isReportReject.tenth.first && !props.data.first.central_version;
    // console.log('isFirstSent.value.first', isFirstSent.value.first)
  }
  if (props.data.second) {
    isFirstSent.value.second = false;
    tenthPanelDataSecond.value = {...props.data.second}
    isFirstSent.value.second = reportStore.isReportReject.tenth.second && !props.data.second.central_version;
    // console.log('isFirstSent.value.second', isFirstSent.value.second)
  }

  if (reportStore.reportDataDHFile.tenth.first) {
    documentFirst.value = reportStore.reportDataDHFile.tenth.first
  }
  if (reportStore.reportDataDHFile.tenth.second) {
    documentSecond.value = reportStore.reportDataDHFile.tenth.second;
  }

  if (reportStore.reportDataCHFile.tenth.first) {
    documentCHFirst.value = reportStore.reportDataCHFile.tenth.first;
  }
  if (reportStore.reportDataCHFile.tenth.second) {
    documentCHSecond.value = reportStore.reportDataCHFile.tenth.second;
  }
  if (props.centralExpert) {
    returnReportFirst.value = reportStore.returnReport.tenth.first;
    returnReportSecond.value = reportStore.returnReport.tenth.second;
  }
});
</script>
<style scoped>
.v-expansion-panels {
  gap: 8px;
}

.v-expansion-panel-title {
  background: #F3F4F5;
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