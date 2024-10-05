<template>
  <div style="margin-right: 10px; margin-bottom: 10px;">
    <v-expansion-panels v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-title>
          Всероссийская патриотическая акция «Снежный Десант РСО»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm
              :districtExpert="districtExpert"
              :centralExpert="centralExpert" :data="tenthPanelDataFirst"
              @formData="formData($event, 1)"
              @uploadFile="uploadFile($event, 1)"
              @deleteFile="deleteFile(1)"
              @collapse-form="collapseForm"
              @deleteLink="deleteLink($event, 1)"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          Всероссийская трудовая патриотическая акция «Поклонимся Великим годам»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm
              :districtExpert="districtExpert"
              :centralExpert="centralExpert"
              :data="tenthPanelDataSecond"
              @formData="formData($event, 2)"
              @uploadFile="uploadFile($event, 2)"
              @deleteFile="deleteFile(2)"
              @collapse-form="collapseForm"
              @deleteLink="deleteLink($event, 2)"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import {inject, ref, watchEffect} from "vue";
import {TenthPanelForm} from './index';
import {reportPartTwoService} from "@services/ReportService.ts";

const swal = inject('$swal');

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
});

const emit = defineEmits(['getData']);

const isFirstSent = ref({
  first: true,
  second: true,
});
const tenthPanelDataFirst = ref({
  event_happened: false,
  document: '',
  file_size: '',
  file_type: '',
  comment: '',
  links: [
    {
      link: '',
    },
  ],
});
const tenthPanelDataSecond = ref({
  event_happened: false,
  document: '',
  file_size: '',
  file_type: '',
  comment: '',
  links: [
    {
      link: '',
    },
  ],
});
const panel = ref(false);

const collapseForm = () => {
  panel.value = false;
};

const formData = async (reportData, reportNumber) => {
  console.log('reportData: ', reportData)
  let formData = new FormData();
  try {
    if (reportNumber === 1) {
      tenthPanelDataFirst.value = {...reportData}
      formData.append('event_happened', tenthPanelDataFirst.value.event_happened);
      formData.append('comment', tenthPanelDataFirst.value.comment || '');
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
    if (e.response.data.links.length) {
      for (let i of e.response.data.links) {
        if (Object.keys(i).length !== 0 && i.link.includes('Введите правильный URL.')) {
          swal.fire({
            position: 'center',
            icon: 'warning',
            title: `Введите корректный URL`,
            showConfirmButton: false,
            timer: 2500,
          })
        }
      }
    }
  }
};

const uploadFile = async (event, reportNumber) => {
  let formData = new FormData();

  formData.append('document', event.target.files[0]);
  if (reportNumber === 1) {
    formData.append('event_happened', tenthPanelDataFirst.value.event_happened);
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
const deleteFile = async (reportNumber) => {
  let formData = new FormData();

  if (reportNumber === 1) {
    formData.append('event_happened', tenthPanelDataFirst.value.event_happened);
    formData.append('document', '');
    formData.append('file_size', '');
    formData.append('file_type', '');
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
}

watchEffect(() => {
  if (props.data.first) {
    isFirstSent.value.first = false;
    tenthPanelDataFirst.value = {...props.data.first}
  }
  if (props.data.second) {
    isFirstSent.value.second = false;
    tenthPanelDataSecond.value = {...props.data.second}
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