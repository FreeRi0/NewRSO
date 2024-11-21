<template>
  <div 
    v-if="!(props.districtExpert || props.centralExpert || reportStore.isReportReject.twelfth || reportStore.isAllReportsVerifiedByCH) ||
          (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportReject.twelfth)"
    class="form__field-group"
  >
    <TwelfthPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      :is-error-panel="isErrorPanel"
      @get-data="getData"
      :tab="tab"
    ></TwelfthPanelComponent>
  </div>

  <report-tabs 
    v-if="(props.districtExpert || props.centralExpert) || 
          (props.tab === 'Доработка' && reportStore.isReportReject.twelfth) ||
          reportStore.isAllReportsVerifiedByCH" 
    :isReject="reportStore.isReportReject.twelfth" >
    <template v-slot:firstTab>
      <TwelfthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        :is-error-panel="isErrorPanel"
        @get-data="getData"
        :tab="tab"
      ></TwelfthPanelComponent>
    </template>

    <template v-slot:secondTab>
      <TwelfthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        @get-dataDH="getDataDH"
        is-second-tab
        :is-error-panel="isErrorPanel"
      ></TwelfthPanelComponent>
    </template>

    <template v-slot:thirdTab>
      <TwelfthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-dataCH="getDataCH"
        is-third-tab
        :is-error-panel="isErrorPanel"
      ></TwelfthPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
import { TwelfthPanelComponent } from "@features/RatingRoPanelComponents";
import { ReportTabs } from './index';
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  isErrorPanel: {
    type: Boolean,
  },
  tab: {
    type: String,
  }
});

const reportStore = useReportPartTwoStore();

const ID_PANEL = '12';

const emit = defineEmits([
  'getData', 
  'getDataDH', 
  'getDataCH',
]);

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

<style lang="scss" scoped>
</style>