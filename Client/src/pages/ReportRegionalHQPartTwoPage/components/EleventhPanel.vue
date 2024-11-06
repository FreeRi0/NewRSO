<template>
  <!-- {{ 'в комп EleventhPanel' }} {{ isRevision }} -->
  <div 
    v-if="!(props.districtExpert || props.centralExpert) && !isRevision"
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

  <report-tabs v-if="(props.districtExpert || props.centralExpert) 
  || (!(props.districtExpert || props.centralExpert) && isRevision)" >
    <template v-slot:firstTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
        :is-revision="isRevision"
      ></EleventhPanelComponent>
    </template>

    <template v-slot:secondTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        @get-dataDH="getDataDH"
        is-second-tab
        :is-error-panel="isErrorPanel"
        :is-revision="isRevision"
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
        :is-revision="isRevision"
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
  isErrorPanel: {
    type: Boolean,
  },
  isRevision: {
    type: Boolean,
  }
});

const ID_PANEL = "11";

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