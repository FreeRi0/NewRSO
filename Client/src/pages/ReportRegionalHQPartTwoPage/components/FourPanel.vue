<template>
  <div
    v-if="
      !(
        props.districtExpert ||
        props.centralExpert ||
        reportStore.isReportReject.fourth ||
        reportStore.isAllReportsVerifiedByCH
      ) ||
      (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportReject.fourth)
    "
    class="form__field-group"
  >
    <FourPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      @get-data="getData"
      :is-error-panel="isErrorPanel"
      :tab="tab"
    ></FourPanelComponent>
  </div>

  <report-tabs
    v-if="
      props.districtExpert ||
      props.centralExpert ||
      (props.tab === 'Доработка' && reportStore.isReportReject.fourth) ||
      reportStore.isAllReportsVerifiedByCH
    "
    :isReject="reportStore.isReportReject.fourth"
  >
    <template v-slot:firstTab>
      <FourPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
        :is-error-panel="isErrorPanel"
        :tab="tab"
      ></FourPanelComponent>
    </template>

    <template v-slot:secondTab>
      <FourPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        @get-dataDH="getDataDH"
        is-second-tab
        :is-error-panel="isErrorPanel"
      ></FourPanelComponent>
    </template>

    <template v-slot:thirdTab>
      <FourPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-dataCH="getDataCH"
        is-third-tab
        :is-error-panel="isErrorPanel"
      ></FourPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
import { FourPanelComponent } from "@features/RatingRoPanelComponents";

import { ReportTabs } from "./index";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean,
  },
  centralExpert: {
    type: Boolean,
  },
  data: Object,
  isErrorPanel: {
    type: Boolean,
  },
  tab: {
    type: String,
  },
});

const reportStore = useReportPartTwoStore();

const ID_PANEL = "4";

const emit = defineEmits(["getData", "getDataDH", "getDataCH"]);

const getData = (event) => {
  emit("getData", event, Number(ID_PANEL));
};

const getDataDH = (event) => {
  emit("getDataDH", event, Number(ID_PANEL));
};

const getDataCH = (event) => {
  emit("getDataCH", event, Number(ID_PANEL));
};
</script>

<style lang="scss" scoped></style>
