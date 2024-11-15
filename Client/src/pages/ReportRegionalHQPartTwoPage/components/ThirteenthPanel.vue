<template>
  <div 
    v-if="!(props.districtExpert || props.centralExpert || reportStore.isReportReject.thirteenth) || 
          (props.tab === 'Просмотр отправленного отчета' && reportStore.isReportReject.thirteenth)"
    class="form__field-group"
  >
    <ThirteenthPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      @get-data="getData"
      :is-error-panel="isErrorPanel"
      :tab="tab"
    ></ThirteenthPanelComponent>
  </div>

  <report-tabs 
    v-if="(props.districtExpert || props.centralExpert) ||
          (props.tab === 'Доработка' && reportStore.isReportReject.thirteenth)" 
    :isReject="reportStore.isReportReject.thirteenth" >
    <template v-slot:firstTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
      ></ThirteenthPanelComponent>
    </template>

    <template v-slot:secondTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        @get-dataDH="getDataDH"
        is-second-tab
        :is-error-panel="isErrorPanel"
      ></ThirteenthPanelComponent>
    </template>

    <template v-slot:thirdTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-dataCH="getDataCH"
        is-third-tab
        :is-error-panel="isErrorPanel"
      ></ThirteenthPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
import { ThirteenthPanelComponent } from "@features/RatingRoPanelComponents";
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

const ID_PANEL = '13';

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