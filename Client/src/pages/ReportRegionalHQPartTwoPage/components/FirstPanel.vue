<template>
  <div v-if="!(props.centralExpert || props.districtExpert)">
    <div class="form__field-group">
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО  <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="firstPanelData.amount_of_money" id="amount_of_money" name="amount_of_money"
            class="form__input" type="number" placeholder="Введите число" @focusout="focusOut" />
        </div>
        <div class="report__add-file">
          <label style="display: flex;" class="form__label" for="scan_file">Скан платежного поручения<br> об уплате ЧВ
            <sup class="valid-red">*</sup></label>
          <InputReport v-if="!firstPanelData.scan_file" isFile type="file" id="scan_file" name="scan_file"
            style="width: 100%;" @change="uploadFile" />
          <div v-else class="form__file-box">
            <span class="form__file-name">
              <SvgIcon v-if="firstPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="firstPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="firstPanelData.file_type === 'png'" icon-name="file-png" />
              {{ firstPanelData.scan_file }}
            </span>

            <span class="form__file-size">{{ firstPanelData.file_size }} Мб</span>
            <button @click="deleteFile" class="form__button-delete-file">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div class="form__field">
        <label class="form__label" for="comment">Комментарий</label>
        <TextareaReport placeholder="Напишите сообщение" v-model:value="firstPanelData.comment" id="comment"
          name="comment" :rows="1" autoResize @focusout="focusOut" :maxlength="3000" :max-length-text="3000"
          counter-visible class="form__input" style="margin-bottom: 4px;" />
      </div>
    </div>
    <ReportRegionalForm :reportData="reportData" />
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО  <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="firstPanelData.amount_of_money" id="amount_of_money" name="amount_of_money"
            class="form__input" type="number" placeholder="Введите число" @focusout="focusOut"
            :disabled="props.centralExpert || props.districtExpert" />
        </div>
        <div class="report__add-file">
          <label class="form__label" for="scan_file">Скан платежного поручения об уплате ЧВ <sup
              class="valid-red">*</sup></label>
          <div class="form__file-box">
            <span class="form__file-name">
              <SvgIcon v-if="firstPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="firstPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="firstPanelData.file_type === 'png'" icon-name="file-png" />
              {{ firstPanelData.scan_file || 'Тестовое название' }}
            </span>
            <span class="form__file-size">{{ firstPanelData.file_size || '123' }} Мб</span>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:secondTab>
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО  <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="firstPanelData.amount_of_money" id="amount_of_money" name="amount_of_money"
            class="form__input" type="number" placeholder="Введите число" @focusout="focusOut" />
        </div>
      </div>
      <div class="form__field">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport placeholder="Напишите сообщение" v-model:value="firstPanelData.comment" id="comment"
          name="comment" :rows="1" autoResize @focusout="focusOut" :maxlength="3000" :max-length-text="3000"
          counter-visible class="form__input" />
      </div>
    </template>
    <template v-slot:thirdTab>
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
          <label class="form__label" for="6">Комментарий  <sup class="valid-red">*</sup></label>
          <InputReport type="file" id="6" name="6" />
        </div>
        <div>
          <v-checkbox label="Вернуть в РО на доработку" />
        </div>
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import {ref, watchEffect} from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { ReportRegionalForm } from '../../ReportRegionalHQPartOnePage/components/index'
import { getReport, reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';
import { ReportTabs } from './index';

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
});

const emit = defineEmits(['getData']);

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

const reportData = ref(defaultReportData);
const isFirstSent = ref(true);
// const scanFile = ref([]);
const firstPanelData = ref({
  comment: '',
  amount_of_money: '',
  scan_file: '',
  file_type: '',
  file_size: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('comment', firstPanelData.value.comment);
  formData.append('amount_of_money', firstPanelData.value.amount_of_money);

  try {
    if (isFirstSent.value) {
      await reportPartTwoService.createReport(formData, '1', true);
    } else {
      const { data } = await reportPartTwoService.createReportDraft(formData, '1', true);
      emit('getData', data, 1);
    }
  } catch (e) {
    console.log(e)
  }

};
const uploadFile = async (event) => {
  let formData = new FormData();

  formData.append('scan_file', event.target.files[0]);
  formData.append('comment', firstPanelData.value.comment);
  formData.append('amount_of_money', firstPanelData.value.amount_of_money);
  if (isFirstSent.value) {
    let { data } = await reportPartTwoService.createReport(formData, '1', true);
    emit('getData', data, 1);
    firstPanelData.value.scan_file = data.scan_file.split('/').at(-1);
  } else {
    let { data } = await reportPartTwoService.createReportDraft(formData, '1', true);
    emit('getData', data, 1);
    firstPanelData.value.scan_file = data.scan_file.split('/').at(-1);
  }
};
const deleteFile = async () => {
  firstPanelData.value.scan_file = '';
  firstPanelData.value.file_size = '';
  firstPanelData.value.file_type = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  formData.append('comment', firstPanelData.value.comment);
  formData.append('amount_of_money', firstPanelData.value.amount_of_money);

  if (isFirstSent.value) {
    const { data } =  await reportPartTwoService.createReport(formData, '1', true);
    emit('getData', data, 1);
  } else {
    const { data } = await reportPartTwoService.createReportDraft(formData, '1', true);
    emit('getData', data, 1);
  }
};
watchEffect(async () => {
  try {
    if (!(props.centralExpert || props.districtExpert)) {
      const res = await getReport();
      reportData.value = res.data;
    }
  } catch (e) {
    console.log(e)
  }
  if (props.data) {
    isFirstSent.value = false;
    firstPanelData.value.comment = props.data.comment;
    firstPanelData.value.amount_of_money = props.data.amount_of_money;
    firstPanelData.value.scan_file = props.data.scan_file ? props.data.scan_file.split('/').at(-1) : '';
    firstPanelData.value.file_type = props.data.file_type;
    firstPanelData.value.file_size = props.data.file_size;
  }
});
</script>
<style lang="scss" scoped>
.form__field {
  margin: 0;
}

.form__field-report {
  display: flex;
  gap: 40px;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
  }
}

.form__file-box {
  margin-top: 16px;
  max-width: 720px;
  width: 100%;
  padding: 1px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Bert Sans";
  font-weight: 400;
  line-height: 21px;
}

.form__file-name {
  display: flex;
  align-items: center;
}

.report__add-file {
  width: 100%;
}

.form__file-size {
  width: 48px;
  color: #6d6d6d;
  opacity: 0.8;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 1px;
    height: 15px;
    background-color: #6d6d6d;
    opacity: 0.8;
    top: 3px;
    left: -10px;
  }
}

.form__button-delete-file {
  color: #1f7cc0;
}

.panel-card {
  box-shadow: none;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  /*padding: 0;*/
  border-radius: 10px;
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
  border-radius: 10px;
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
  bottom: 10px;
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