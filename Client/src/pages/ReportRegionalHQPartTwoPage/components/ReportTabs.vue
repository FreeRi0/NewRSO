<template>
  <v-card class="panel-card">

    <v-tabs
        v-model="tab"
    >
      <v-tab value="one" class="panel-tab-btn">Отчет РО</v-tab>
      <v-tab value="two" class="panel-tab-btn">Корректировка ОШ</v-tab>
      <v-tab value="three" class="panel-tab-btn">Корректировка ЦШ</v-tab>
    </v-tabs>

    <v-card-text class="panel-card-text">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <div class="form__field-group">
            <slot name="firstTab"></slot>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <div class="form__field-group">
            <slot name="secondTab"></slot>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="three">
          <div class="form__field-group report-table">
            <slot name="thirdTab"></slot>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from "vue";

const tab = ref('one');
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
  border-radius: 10px 10px 0 0;
  letter-spacing: initial;
  border: none;
}
.panel-card-text {
  padding: 0;
}
.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 0 0 10px 10px;
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
//}
</style>