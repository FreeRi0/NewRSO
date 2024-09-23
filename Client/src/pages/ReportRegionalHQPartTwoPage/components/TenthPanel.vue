<template>
  <div style="margin-right: 10px; margin-bottom: 10px;">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          Всероссийская патриотическая акция «Снежный Десант РСО»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm :districtExpert="districtExpert"
            :centralExpert="centralExpert" :data="tenthPanelDataFirst"
            @formData="formData($event, 1)"
            @uploadFile="uploadFile($event, 1)"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          Всероссийская трудовая патриотическая акция «Поклонимся Великим годам»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm :districtExpert="districtExpert"
            :centralExpert="centralExpert"
            :data="tenthPanelDataSecond"
            @formData="formData($event, 2)"
            @uploadFile="uploadFile($event, 2)"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { TenthPanelForm } from './index';
import { reportPartTwoService } from "@services/ReportService.ts";

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
  links: [
    {
      link: '',
    },
  ],
});

const formData = async (reportData, reportNumber) => {
  try {
    if (reportNumber === 1) {
      if (isFirstSent.value.first) {
        const { data } = await reportPartTwoService.createMultipleReport(reportData, '10', '1');
        emit('getData', data, 10, 1);
      } else {
        const { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '10', '1');
        emit('getData', data, 10, 1);
      }
    } else if (reportNumber === 2) {
      if (isFirstSent.value.second) {
        const { data } = await reportPartTwoService.createMultipleReport(reportData, '10', '2');
        emit('getData', data, 10, 2);
      } else {
        const { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '10', '2');
        emit('getData', data, 10, 2);
      }
    }
  } catch (e) {
    console.log('tenth panel error: ', e);
  }
};

const uploadFile = async (event, reportNumber) => {
  let formData = new FormData();

  formData.append('document', event.target.files[0]);

  if (reportNumber === 1) {
    formData.append('event_happened', tenthPanelDataFirst.value.event_happened);
    if (isFirstSent.value.first) {
      let { data } = await reportPartTwoService.createMultipleReport(formData, '10', '1', true);
      emit('getData', data, 10, 1);
    } else {
      let { data } = await reportPartTwoService.createMultipleReportDraft(formData, '10', '1', true);
      emit('getData', data, 10, 1);
    }
  } else if (reportNumber === 2) {
    formData.append('event_happened', tenthPanelDataSecond.value.event_happened);
    if (isFirstSent.value.second) {
      let { data } = await reportPartTwoService.createMultipleReport(formData, '10', '2', true);
      emit('getData', data, 10, 2);
    } else {
      let { data } = await reportPartTwoService.createMultipleReportDraft(formData, '10', '2', true);
      emit('getData', data, 10, 2);
    }
  }
};

watchEffect( () => {
  console.log('props: ', props.data)
  if (props.data.first) {
    isFirstSent.value.first = false;
    tenthPanelDataFirst.value = { ...props.data.first }
  }
  if (props.data.second) {
    isFirstSent.value.second = false;
    tenthPanelDataSecond.value = { ...props.data.second }
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