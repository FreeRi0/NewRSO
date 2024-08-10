<template>
  <div v-if="true">
    <div class="form__field-group">
      <div style="display: flex;">
          <div class="form__field">
            <label
                class="form__label"
                for="amount_of_money"
            >Общая сумма уплаченных членских взносов РО  <sup class="valid-red">*</sup></label>
            <InputReport
                v-model:value="firstPanelData.amount_of_money"
                id="amount_of_money"
                name="amount_of_money"
                class="form__input"
                type="number"
                placeholder="Введите число"
                @focusout="focusOut"
            />
          </div>
          <div>
            <label
                class="form__label"
                for="scan_file"
            >Скан платежного поручения об уплате ЧВ <sup class="valid-red">*</sup></label>
            <v-file-input
                v-if="!firstPanelData.scan_file"
                type="file"
                id="scan_file"
                name="scan_file"
                @change="uploadFile"
            />
            <div v-else style="display: flex;">
              <p>{{ firstPanelData.scan_file }}</p>
              <p @click="deleteFile" style="
              font-family: Bert Sans;
              font-size: 16px;
              font-weight: 400;
              line-height: 20px;
              text-align: right;
              cursor: pointer;
              padding-left: 8px;"
              >Удалить</p>
          </div>
        </div>
      </div>
      <div  class="form__field">
          <label
              class="form__label"
              for="comment"
          >Комментарий <sup class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.comment"
              id="comment"
              name="comment"
              class="form__input"
              style="width: 100%"
              @focusout="focusOut"
          />
        </div>
    </div>
    <ReportRegionalForm :reportData="reportData" />
  </div>

  <v-card v-else class="panel-card" >
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
              <div style="display: flex;">
                <div class="form__field">
                  <label
                      class="form__label"
                      for="1"
                  >Общая сумма уплаченных членских взносов РО  <sup class="valid-red">*</sup></label>
                  <InputReport
                      id="1"
                      name="1"
                      class="form__input"
                      type="number"
                      placeholder="Введите число"
                  />
                </div>
                <div>
                  <label
                      class="form__label"
                      for="2"
                  >Скан платежного поручения об уплате ЧВ <sup class="valid-red">*</sup></label>
                  <InputReport
                      type="file"
                      id="2"
                      name="2"
                  />
                </div>
              </div>
              <div  class="form__field">
                <label
                    class="form__label"
                    for="3"
                >Комментарий <sup class="valid-red">*</sup></label>
                <InputReport
                    id="3"
                    name="3"
                    class="form__input"
                    style="width: 100%"
                />
              </div>
            </div>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <form class="form__field-group" @submit.prevent>
                <div class="form__field">
                  <label
                      class="form__label"
                      for="4"
                  >Общая сумма уплаченных членских взносов РО  <sup class="valid-red">*</sup></label>
                  <InputReport
                      id="4"
                      name="4"
                      class="form__input"
                      type="number"
                      placeholder="Введите число"
                  />
                </div>
                <div>
                  <label
                      class="form__label"
                      for="5"
                  >Комментарий  <sup class="valid-red">*</sup></label>
                  <InputReport
                      type="file"
                      id="5"
                      name="5"
                  />
                </div>
            </form>
          </v-tabs-window-item>
          <v-tabs-window-item value="three">
            <div class="form__field-group report-table">
              <v-table>
                <tbody>
                <tr class="report-table__tr">
                  <td class="report-table__th report-table__th__br-left">Данные РО</td>
                  <td class="report-table__th">Корректировка ОШ</td>
                  <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
                </tr>
                <tr>
                  <td class="report-table__td">200</td>
                  <td class="report-table__td report-table__td__center">200</td>
                  <td class="report-table__td">200</td>
                </tr>
                </tbody>
              </v-table>
              <div>
                <label
                    class="form__label"
                    for="6"
                >Комментарий  <sup class="valid-red">*</sup></label>
                <InputReport
                    type="file"
                    id="6"
                    name="6"
                />
              </div>
              <div>
                  <v-checkbox
                      label="Вернуть в РО на доработку"
                  />
              </div>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { InputReport } from '@shared/components/inputs';
import { ReportRegionalForm } from '../../ReportRegionalHQPartOnePage/components/index'
import { getReport, reportPartTwoService } from "@services/ReportService.ts";

const defaultReportData = {
  participants_number: '0',
  employed_sso: '0',
  employed_smo: '0',
  employed_specialized_detachments: '0',
  employed_spo: '0',
  employed_sservo: '0',
  employed_production_detachments: '0',
  employed_sop: '0',
  employed_ssho: '0',
  employed_top: '0',
};
const tab = ref('one');
const reportData = ref(defaultReportData);
const isFirstSent = ref(true);
const scanFile = ref([]);
const firstPanelData = ref({
  comment: '',
  amount_of_money: '',
  scan_file: '',
});
const focusOut = async () => {
  let formData = new FormData();
  formData.append('comment', firstPanelData.value.comment);
  formData.append('amount_of_money', firstPanelData.value.amount_of_money);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, '1', true);
  } else {
    await reportPartTwoService.createReportDraft(formData, '1', true);
  }
};
const uploadFile = async (event) => {
  scanFile.value = event.target.files[0];
  let formData = new FormData();
  formData.append('scan_file', scanFile.value);
  formData.append('comment', firstPanelData.value.comment);
  formData.append('amount_of_money', firstPanelData.value.amount_of_money);
  if (isFirstSent.value) {
    let { scan_file } = await reportPartTwoService.createReport(formData, '1', true);
    firstPanelData.value.scan_file = scan_file.split('/').at(-1);
  } else {
    let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, '1', true);
    firstPanelData.value.scan_file = scan_file.split('/').at(-1);
  }
};
const deleteFile = async () => {
  firstPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  formData.append('comment', firstPanelData.value.comment);
  formData.append('amount_of_money', firstPanelData.value.amount_of_money);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, '1', true);
  } else {
    await reportPartTwoService.createReportDraft(formData, '1', true);
  }
};
watchEffect(async () => {
  try {
    const res = await getReport();
    reportData.value = res.data;

    const { data } = await reportPartTwoService.getReport('1');
    if (data.length) {
      isFirstSent.value = false;
      firstPanelData.value.comment = data[0].comment;
      firstPanelData.value.amount_of_money = data[0].amount_of_money;
      firstPanelData.value.scan_file = data[0].scan_file.split('/').at(-1);
    }
  } catch (e) {
    console.log(e)
  }
});
</script>
<style lang="scss" scoped>
.panel-card {
  box-shadow: none;
}
.form__field-group {
  background: #F3F4F5;
  border: none;
  /*padding: 0;*/
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
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

</style>

<style>
.v-tab--selected .v-tab__slider {
  width: 216px;
  height: 2px;
  left: initial;
  color: #E9E9E9;
}
.v-label {
  margin: initial;
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 600;
  line-height: 21.1px;
  text-align: left;
  opacity: initial;
}
.v-selection-control__input {
  justify-content: initial;
  width: initial;
}
.v-selection-control__wrapper {
  width: initial;
}
</style>