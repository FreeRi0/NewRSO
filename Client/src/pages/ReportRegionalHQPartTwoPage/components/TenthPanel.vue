<template>
  <div style="margin-right: 10px; margin-bottom: 10px;">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          Всероссийская патриотическая акция «Снежный Десант РСО»
        </v-expansion-panel-title>
        <v-expansion-panel-text >
          <TenthPanelForm
              :districtExpert="districtExpert"
              :centralExpert="centralExpert"
              :data="tenthPanelDataFirst"
              @formData="formData($event, 1)"
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
              @formData="formData($event, 2)"/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { TenthPanelForm } from './index';
import { reportPartTwoService } from "@services/ReportService.ts";

defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  reportId: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['getData']);

const isFirstSent = ref({
  first: true,
  second: true,
});
const tenthPanelDataFirst = ref({
  event_happened: false,
  links: [
    {
      link: '',
    },
  ],
});
const tenthPanelDataSecond = ref({
  event_happened: false,
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
        await reportPartTwoService.createMultipleReport(reportData, '10', '1');
      } else {
        const { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '10', '1');
        emit('getData', data, 10, 1);
      }
    } else if (reportNumber === 2) {
      if (isFirstSent.value.second) {
        await reportPartTwoService.createMultipleReport(reportData, '10', '2');
      } else {
        const { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '10', '2');
        emit('getData', data, 10, 2);
      }
    }
  } catch (e) {
    console.log('tenth panel error: ', e);
  }

};
watchEffect(async () => {
  try {
    const dataFirst = await reportPartTwoService.getMultipleReport('10', '1');
    if (dataFirst.data) {
      isFirstSent.value.first = false;
      tenthPanelDataFirst.value = {...dataFirst.data}
    }
    const dataSecond = await reportPartTwoService.getMultipleReport('10', '2');
    if (dataSecond.data) {
      isFirstSent.value.second = false;
      tenthPanelDataSecond.value = {...dataSecond.data}
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
<style scoped>
.v-expansion-panel-title {
  background: #F3F4F5;
  margin: 0px;
  border-radius: 0px;
  font-family: Akrobat;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  border: none;
}
</style>