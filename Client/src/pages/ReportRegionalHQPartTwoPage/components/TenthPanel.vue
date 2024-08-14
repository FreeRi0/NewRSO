<template>
  <div style="margin-right: 10px">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          Всероссийская патриотическая акция «Снежный Десант РСО»
        </v-expansion-panel-title>
        <v-expansion-panel-text >
          <TenthPanelForm :data="tenthPanelDataFirst" @formData="formData($event, 1)"/>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>
          Всероссийская трудовая патриотическая акция «Поклонимся Великим годам»
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TenthPanelForm :data="tenthPanelDataSecond" @formData="formData($event, 2)"/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import TenthPanelForm from "@pages/ReportRegionalHQPartTwoPage/components/TenthPanelForm.vue";
import { reportPartTwoService } from "@services/ReportService.ts";

const isFirstSent = ref({
  first: true,
  second: true,
});
const tenthPanelDataFirst = ref([{
  event_happened: false,
  links: [
    {
      link: '',
    },
  ],
}]);
const tenthPanelDataSecond = ref([{
  event_happened: false,
  links: [
    {
      link: '',
    },
  ],
}]);

const formData = async (data, reportNumber) => {
  if (reportNumber === 1) {
    if (isFirstSent.value.first) {
      await reportPartTwoService.createMultipleReport(data, '10', '1');
    } else {
      await reportPartTwoService.createMultipleReportDraft(data, '10', '1');
    }
  } else if (reportNumber === 2) {
    if (isFirstSent.value.second) {
      await reportPartTwoService.createMultipleReport(data, '10', '2');
    } else {
      await reportPartTwoService.createMultipleReportDraft(data, '10', '2');
    }
  }
};
watchEffect(async () => {
  try {
    const dataFirst = await reportPartTwoService.getMultipleReport('10', '1');
    if (dataFirst.data.length) {
      isFirstSent.value.first = false;
      tenthPanelDataFirst.value = {...dataFirst.data}
    }
    const dataSecond = await reportPartTwoService.getMultipleReport('10', '2');
    if (dataSecond.data.length) {
      isFirstSent.value.second = false;
      tenthPanelDataSecond.value = {...dataSecond.data}
    }
  } catch (e) {
    console.log(e);
  }
});
</script>