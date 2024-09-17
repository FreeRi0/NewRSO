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
            :isCentralHeadquarterCommander="props.centralHeadquarterCommander"
            :isDistrictHeadquarterCommander="props.districtHeadquarterCommander" :title="item">
          </SeventhPanelForm>
        </v-expansion-panel-text></v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { SeventhPanelForm } from "./index";
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { HTTP } from "@app/http";


const props = defineProps({
  districtHeadquarterCommander: {
    type: Boolean
  },
  centralHeadquarterCommander: {
    type: Boolean
  },
});

const panel = ref(null);

const items = ref([]);

const collapsed = () => {
  panel.value = !panel.value;
}

const getItems = async () => {
  try {
    const response = await HTTP.get('regional_competitions/reports/event_names/r6-event-names/');
    items.value = response.data;
  } catch (err) {
    console.error(err);
  }
}
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
  }

  @media screen and (max-width: 1024px) {
    max-width: 700px;
    grid-template-columns: 400px 300px;
    column-gap: 20px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
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