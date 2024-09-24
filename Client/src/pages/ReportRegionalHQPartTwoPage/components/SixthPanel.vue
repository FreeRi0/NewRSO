<template>
  <v-card class="panel-card">
    <v-expansion-panels v-model="panel" class="mb-2">
      <v-progress-circular v-show="!items.length" class="circleLoader" indeterminate></v-progress-circular>
      <v-expansion-panel v-show="items.length" v-for="item in items" :key="item.id"><v-expansion-panel-title>
          <div class="title_wrap">
            <p class="form__title">{{ item.name }}</p>
            <div class="title_wrap__items">
              <p class="form__title month" v-if="item.month">{{ item.month }}</p>
              <p class="form__title city" v-if="item.city">{{ item.city }}</p>
            </div>
          </div>
        </v-expansion-panel-title><v-expansion-panel-text>
          <SeventhPanelForm :id="item.id" :panel_number="6" @collapse-form="collapsed()"
            @formData="formData($event, item.id)" @getId="getId($event)" @getPanelNumber="getPanelNumber($event)" :data="sixPanelData"
            :isCentralHeadquarterCommander="props.centralHeadquarterCommander"
            :isDistrictHeadquarterCommander="props.districtHeadquarterCommander" :title="item">
          </SeventhPanelForm>
        </v-expansion-panel-text></v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { SeventhPanelForm } from "./index";
import { reportPartTwoService } from "@services/ReportService.ts";
import { HTTP } from "@app/http";


const props = defineProps({
  districtHeadquarterCommander: {
    type: Boolean
  },
  centralHeadquarterCommander: {
    type: Boolean
  },
  data: Object,
});




const emit = defineEmits(['getData', 'getId', 'getPanelNumber'])

const isFirstSent = ref(true);

const sixPanelData = ref({
  number_of_members: 0,
  links: [{
    link: '',
  }],
  comment: '',
});

const panel = ref(false);

const items = ref([]);

const collapsed = () => {
  panel.value = !panel.value;
}

// console.log('panel', panel.value)

const getItems = async () => {
  try {
    const response = await HTTP.get('regional_competitions/reports/event_names/r6-event-names/');
    items.value = response.data;
  } catch (err) {
    console.error(err);
  }
}

const formData = async (reportData, reportNumber) => {
  try {
    // console.log('num', reportNumber)
    if (isFirstSent.value) {
      console.log('First time sending data');
      await reportPartTwoService.createMultipleReportAll(reportData, '6', reportNumber);
    } else {
      console.log('Second time sending data');
      const { data } = await reportPartTwoService.createMultipleReportDraft(reportData, '6', reportNumber);
      emit('getData', data, 6, reportNumber);
    }
  } catch (e) {
    console.log('six panel error: ', e);
  }
};

const getId = (id) => {
  console.log('id', id);
  emit('getId', id);
}
const getPanelNumber = (number) => {
  console.log('num', number);
  emit('getPanelNumber', number);
}
watchEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    sixPanelData.value = { ...props.data }
    // emit('send-panel', panel.value);
  }
  
});
onMounted(async () => {
  await getItems();
})
</script>
<style lang="scss" scoped>
.panel-card {
  box-shadow: none;
}

.v-expansion-panel-title[aria-expanded="true"] {
  display: none;
}

.panel-tab-btn {
  text-align: right;
  padding-right: 40px;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
  margin-top: 8px;
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

  &__items {
    display: flex;
    width: 100%;
    column-gap: 20px;
    max-width: 290px;

    @media screen and (max-width: 578px) {
      flex-direction: column;
    }
  }

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
  border: none;
  padding-left: 40px;

}
</style>