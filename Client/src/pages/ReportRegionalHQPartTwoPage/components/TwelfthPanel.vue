<template>
  <div 
    v-if="!(props.districtExpert || props.centralExpert)"
    class="form__field-group"
  >
    <TwelfthPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      :is-error-panel="isErrorPanel"
      @get-data="getData"
    ></TwelfthPanelComponent>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <TwelfthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
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

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  // dataDH: Object,
  // dataCH: Object,
  isErrorPanel: {
    type: Boolean,
  },
});

const ID_PANEL = '12';

const emit = defineEmits([
  'getData', 
  'getDataDH', 
  'getDataCH', 
  // 'getFileDH'
]);

const getData = (event) => {
  emit("getData", event, Number(ID_PANEL));
};

const getDataDH = (event) => {
  emit("getDataDH", event, Number(ID_PANEL));
};

// const getFileDH = (event) => {
//   emit("getFileDH", event, Number(ID_PANEL));
// };

const getDataCH = (event) => {
  emit("getDataCH", event, Number(ID_PANEL));
};
</script>

<style lang="scss" scoped>
</style>