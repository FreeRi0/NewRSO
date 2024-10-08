<template>
  <v-card class="panel-card">
    <v-expansion-panels v-model="panel" class="mb-2">
      <v-progress-circular v-show="!items.length" class="circleLoader" indeterminate></v-progress-circular>
      <v-expansion-panel :disabled="disabled" v-show="items.length" v-for="item in items"
        :key="item.id"><v-expansion-panel-title
          :class="Object.values(isErrorPanel).some(i => i.error === true && i.id == item.id) ? 'visible-error' : ''">
          <div class="title_wrap">
            <p class="form__title">{{ item.name }}</p>
          </div>
        </v-expansion-panel-title><v-expansion-panel-text>
          <SeventhPanelForm :id="item.id" :panel_number="9" @collapse-form="collapsed()"
            @formData="formData($event, item.id)" @error="setError" @uploadFile="uploadFile($event, item.id)"
            :data="ninthPanelData" @getPanelNumber="getPanelNumber($event)" @getId="getId($event)"
            @deleteFile="deleteFile($event, item.id)" :is-sent-ninth="isSentNinth"
            :is-error-panel="Object.values(isErrorPanel).some(i => i.error === true && i.id == item.id)"
            :isCentralHeadquarterCommander="props.centralHeadquarterCommander"
            :isDistrictHeadquarterCommander="props.districtHeadquarterCommander" :title="item"></SeventhPanelForm>
        </v-expansion-panel-text></v-expansion-panel>
    </v-expansion-panels>

  </v-card>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { SeventhPanelForm } from "./index";
import { reportPartTwoService } from "@services/ReportService.ts";

const props = defineProps({
  districtHeadquarterCommander: {
    type: Boolean
  },
  centralHeadquarterCommander: {
    type: Boolean
  },
  isErrorPanel: Object,
  items: Array,
  data: Object
});

const link_err = ref(false);
const isSentNinth = ref(false);

const setError = (err) => {
  link_err.value = err;
}

const disabled = ref(false);
const panel = ref(null);
const emit = defineEmits(['getData'])
const ninthPanelData = ref({
  event_happened: false,
  links: [{
    link: '',
  }],
  document: '',
  file_size: null,
  file_type: '',
  comment: '',
});
const isFirstSent = ref(null);
let el_id = ref(null);

const formData = async (reportData, reportNumber) => {
  try {
    console.log('send2', isFirstSent.value)
    if (!link_err.value) {
      if (isFirstSent.value) {
        console.log('First time sending data');
        const { data } = await reportPartTwoService.createMultipleReportAll(reportData, '9', reportNumber, true);
        isFirstSent.value = false;
        emit('getData', data, 9, reportNumber);
      } else {
        console.log('Second time sending data');
        const { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '9', reportNumber, true);
        emit('getData', data, 9, reportNumber);
      }
    }
  } catch (e) {
    console.log('ninth panel error: ', e);
  }
};


const collapsed = () => {
  panel.value = false;
}



const getId = (id) => {
  console.log('id', id);
  el_id.value = id;
  emit('getId', id);
}

const getPanelNumber = (number) => {
  console.log('num', number);
  emit('getPanelNumber', number);
}

const uploadFile = async (reportData, reportNumber) => {
  if (isFirstSent.value) {
    let { data } = await reportPartTwoService.createMultipleReportAll(reportData, '9', reportNumber, true);
    emit('getData', data, 9, reportNumber);
  } else {
    let { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '9', reportNumber, true);
    emit('getData', data, 9, reportNumber);

  }
};

const deleteFile = async (reportData, reportNumber) => {

  if (isFirstSent.value) {
    await reportPartTwoService.createMultipleReportAll(reportData, '9', reportNumber, true);
  } else {
    await reportPartTwoService.createMultipleReportDraft(reportData, '9', reportNumber, true);
  }
};

watchEffect(() => {
  console.log(isFirstSent, props.data)
  if (Object.keys(props.data[el_id.value]).length > 0) {
    console.log('data yes')
    isFirstSent.value = false;
    ninthPanelData.value = { ...props.data[el_id.value] }
    isSentNinth.value = props.data[el_id.value].is_sent;
  } else {
    console.log('data no')
    isFirstSent.value = true;
    ninthPanelData.value = {
      event_happened: false,
      links: [{
        link: '',
      }],
      document: '',
      file_size: null,
      file_type: '',
      comment: '',
    };
    for (let i in props.data) {
      if (props.data[i].is_sent) {
        isSentNinth.value = true;
        break;
      }
    }
  }

  if (panel.value || panel.value === 0) {
    disabled.value = true;
  } else {
    disabled.value = false;
  }
});

</script>
<style lang="scss" scoped>
.panel-card {
  box-shadow: none;
}

.v-expansion-panel-title[aria-expanded="true"] {
  display: none;
}

.month {
  width: 100%;
  max-width: 70px;

}

.city {
  width: 100%;
  max-width: 200px;
}

.title_wrap {
  display: grid;
  grid-template-columns: 600px 300px;
  column-gap: 40px;
  width: 100%;
  max-width: 900px;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    row-gap: 6px;
    max-width: 828px;
    width: auto;
  }

  @media screen and (max-width: 768px) {
    max-width: 636px;
  }

  @media screen and (max-width: 578px) {
    max-width: 360px;
  }

}



.valid-red {
  color: #db0000;
}

.v-tab-item--selected {
  background: #F3F4F5;
}

.v-tab.v-tab.v-btn {
  min-width: 280px;
  border-radius: 10px 10px 0 0;
  letter-spacing: initial;
  border: none;
}

.panel-card-text {
  padding: 0;
}

.panel-tab-btn {
  text-transform: initial;
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.1px;
  text-align: left;
  margin-right: 8px;
}

.hr {
  width: 100%;
  border-top: 1px solid #B6B6B6;
}

.v-table {
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid #B6B6B6;
}

.report-table {
  &__tr {
    background-color: #FFFFFF;
    text-align: center;
  }

  &__th {
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    text-align: center;

    &__br-left {
      border-radius: 10px 0 0 0;
      border-right: 1px solid #B6B6B6;
    }

    &__br-right {
      border-radius: 0 10px 0 0;
      border-left: 1px solid #B6B6B6;
    }
  }

  &__td {
    text-align: center;
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    color: #8E8E93;

    &__center {
      border-left: 1px solid #B6B6B6;
      border-right: 1px solid #B6B6B6;
    }
  }
}

.v-expansion-panel-title {
  background: #F3F4F5;
  margin: 0px;
  border-radius: 0px;
  font-family: Akrobat;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.6px;
  text-align: left;
  border-left: 6px solid #F3F4F5;
  padding-left: 40px;
}
</style>