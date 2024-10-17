<template>
  <div 
    v-if="!(props.districtExpert || props.centralExpert)"
    class="form__field-group"
  >
    <ThirteenthPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      @get-data="getData"
      :is-error-panel="isErrorPanel"
    ></ThirteenthPanelComponent>
  </div>

  <report-tabs v-else>
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
        :dataDH="dataDH"
        @get-dataDH="getDataDH"
        @get-fileDH="getFileDH"
        is-second-tab
      ></ThirteenthPanelComponent>
    </template>

    <template v-slot:thirdTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :dataCH="dataCH"
        @get-dataCH="getDataCH"
        is-third-tab
      ></ThirteenthPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
import { ThirteenthPanelComponent } from "@features/RatingRoPanelComponents";
import { ReportTabs } from './index';

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  dataDH: Object,
  dataCH: Object,
  isErrorPanel: {
    type: Boolean,
  },
});

const ID_PANEL = '13';

const emit = defineEmits(['getData', 'getDataDH', 'getDataCH', "getFileDH"]);

const getData = (event) => {
  emit("getData", event, Number(ID_PANEL));
};

const getDataDH = (event) => {
  emit("getDataDH", event, Number(ID_PANEL));
};

const getFileDH = (event) => {
  emit("getFileDH", event, Number(ID_PANEL));
};

const getDataCH = (event) => {
  emit("getDataCH", event, Number(ID_PANEL));
};
</script>

<style lang="scss" scoped>
</style>