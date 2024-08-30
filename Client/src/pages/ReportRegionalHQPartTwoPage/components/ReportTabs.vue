<template>
  <v-card class="panel-card">

    <v-tabs v-model="tab">
      <v-tab value="one" class="panel-tab-btn" v-if="districtHeadquarterCommander || centralHeadquarterCommander">Отчет
        РО</v-tab>
      <v-tab value="two" class="panel-tab-btn"
        v-if="districtHeadquarterCommander || centralHeadquarterCommander">Корректировка ОШ</v-tab>
      <v-tab value="three" class="panel-tab-btn" v-if="centralHeadquarterCommander">Корректировка ЦШ</v-tab>
    </v-tabs>

    <v-card-text class="panel-card-text">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one" v-if="districtHeadquarterCommander || centralHeadquarterCommander">
          <div class="form__field-group">
            <slot name="firstTab"></slot>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="two" v-if="districtHeadquarterCommander || centralHeadquarterCommander">
          <div class="form__field-group">
            <slot name="secondTab"></slot>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="three" v-if="centralHeadquarterCommander">
          <div class="form__field-group report-table">
            <slot name="thirdTab"></slot>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { useRoleStore } from "@layouts/store/role.ts";

const tab = ref(null);
const districtHeadquarterCommander = ref(false);
const centralHeadquarterCommander = ref(false);
const roleStore = useRoleStore();

watchEffect(() => {
  if (roleStore.roles?.districtheadquarter_commander) {
    districtHeadquarterCommander.value = true;
  }
  if (roleStore.roles.centralheadquarter_commander) {
    centralHeadquarterCommander.value = true;
  }
})
</script>
<style lang="scss" scoped>
.panel-card {
  box-shadow: none;
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

.v-tab-item--selected {
  background: #F3F4F5;
}

.v-tab.v-tab.v-btn {
  min-width: 280px;
  border-radius: 10px;
  letter-spacing: initial;
  border: none;
}

.panel-card-text {
  padding: 0;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 10px;
  margin-bottom: 8px;
}

//.report-table {
//  &__tr {
//    background-color: #FFFFFF;
//    text-align: center;
//  }
//  &__th {
//    font-family: Akrobat;
//    font-size: 16px;
//    font-weight: 500;
//    line-height: 19.2px;
//    text-align: center;
//
//    &__br-left {
//      border-radius: 10px 0 0 0;
//      border-right: 1px solid #B6B6B6;
//    }
//
//    &__br-right {
//      border-radius: 0 10px 0 0;
//      border-left: 1px solid #B6B6B6;
//    }
//  }
//  &__td {
//    text-align: center;
//    font-family: Akrobat;
//    font-size: 16px;
//    font-weight: 500;
//    color: #8E8E93;
//
//    &__center {
//      border-left: 1px solid #B6B6B6;
//      border-right: 1px solid #B6B6B6;
//    }
//  }
//}
//.v-table {
//  margin-bottom: 16px;
//  border-radius: 10px;
//  border: 1px solid #B6B6B6;
//}</style>