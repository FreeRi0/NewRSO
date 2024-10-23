<template>
  <div 
    v-if="!(props.districtExpert || props.centralExpert)"
    class="form__field-group"
  >
    <EleventhPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      @get-data="getData"
      :is-error-panel="isErrorPanel"
    ></EleventhPanelComponent>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
      ></EleventhPanelComponent>
    </template>

    <template v-slot:secondTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        @get-dataDH="getDataDH"
        is-second-tab
        :is-error-panel="isErrorPanel"
      ></EleventhPanelComponent>
    </template>
    
    <template v-slot:thirdTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-dataCH="getDataCH"
        is-third-tab
        :is-error-panel="isErrorPanel"
      ></EleventhPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
import { EleventhPanelComponent } from "@features/RatingRoPanelComponents";
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

const ID_PANEL = "11";

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