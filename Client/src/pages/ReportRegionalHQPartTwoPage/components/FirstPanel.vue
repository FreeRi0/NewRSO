<template>
  <div v-if="!(props.centralExpert || props.districtExpert)">
    <div class="form__field-group">
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО&nbsp; <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.amount_of_money"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="9999999999"
              :step="0.01"
              @focusout="focusOut"
              :disabled="isSent"
          />
        </div>
        <div class="report__add-file">
          <label class="form__label report__add-file-form-label" for="scan_file">Скан
            платежного поручения об уплате ЧВ <sup class="valid-red">*</sup></label>
          <InputReport
              v-if="!firstPanelData.scan_file"
              isFile
              type="file"
              id="scan_file"
              name="scan_file"
              :disabled="isSent"
              style="width: 100%;"
              @change="uploadFile"/>
          <FileBoxComponent
              v-else
              :file="firstPanelData.scan_file"
              :fileType="firstPanelData.file_type"
              :fileSize="firstPanelData.file_size"
              @click="deleteFile"
              :is-sent="isSent"
              :is-error-file="isErrorFile"
          ></FileBoxComponent>
        </div>
      </div>
      <div class="form__field">
        <label class="form__label" for="comment">Комментарий</label>
        <TextareaReport
            placeholder="Напишите сообщение"
            v-model:value="firstPanelData.comment"
            id="comment"
            name="comment"
            :rows="1"
            autoResize
            @focusout="focusOut"
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            class="form__input"
            :disabled="isSent"
            style="margin-bottom: 4px;"
        />
      </div>
    </div>
    <ReportRegionalForm :reportData="reportData" :blockEditFirstReport="blockEditFirstReport"/>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО&nbsp; <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelData.amount_of_money"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :disabled="props.centralExpert || props.districtExpert"
          />
        </div>
        <div class="report__add-file">
          <label class="form__label" for="scan_file">Скан платежного поручения об уплате ЧВ <sup
              class="valid-red">*</sup></label>
          <div class="form__file-box">
            <FileBoxComponent
                :file="firstPanelData.scan_file"
                :fileType="firstPanelData.file_type"
                :fileSize="firstPanelData.file_size"
                :is-sent="isSent"
            ></FileBoxComponent>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:secondTab>
      <div class="form__field-report">
        <div class="form__field">
          <label class="form__label" for="amount_of_money">Общая сумма уплаченных членских взносов РО&nbsp; <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="firstPanelDataDH.amount_of_money"
              id="amount_of_money"
              name="amount_of_money"
              class="form__input"
              type="number"
              placeholder="Введите число"
              :maxlength="10"
              :min="0"
              :max="9999999999"
              :step="0.01"
          />
        </div>
      </div>
      <div class="form__field">
        <!--        <label class="form__label" for="comment">Комментарий<sup class="valid-red">*</sup></label>-->
        <!--        <TextareaReport-->
        <!--            v-model:value="firstPanelDataDH.comment"-->
        <!--            class="form__input"-->
        <!--            id="comment"-->
        <!--            name="comment"-->
        <!--            :rows="1"-->
        <!--            autoResize-->
        <!--            :maxlength="3000"-->
        <!--            :max-length-text="3000"-->
        <!--            counter-visible-->
        <!--            placeholder="Напишите сообщение"-->
        <!--        />-->
        <CommentFileComponent
            v-model:value="firstPanelDataDH.comment"
            name="firstPanelDataDH.comment"
            :file="reportStore.reportDataDHFile.first ? reportStore.reportDataDHFile.first.name : null"
            :fileType="reportStore.reportDataDHFile.first ? reportStore.reportDataDHFile.first.type.split('/').at(-1) : null"
            :fileSize="reportStore.reportDataDHFile.first ? reportStore.reportDataDHFile.first.size / Math.pow(1024, 2) : null"
            :disabled="centralExpert"
            :is-error-file="isErrorFile"
            @change="uploadFileDH"
            @click="deleteFileDH"
        />
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
          <InputReport type="file" id="6" name="6"/>
        </div>
        <div>
          <v-checkbox label="Вернуть в РО на доработку"/>
        </div>
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import {ref, watch, watchEffect, watchPostEffect} from "vue";
import {InputReport, TextareaReport} from '@shared/components/inputs';
import {FileBoxComponent, CommentFileComponent} from "@entities/RatingRoComponents/components";
import {ReportRegionalForm} from '../../ReportRegionalHQPartOnePage/components/index'
import {getReportForSecond, reportPartTwoService} from "@services/ReportService.ts";
import {ReportTabs} from './index';
import {fileValidate} from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import {useReportPartTwoStore} from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  blockEditFirstReport: Boolean,
});

const emit = defineEmits(['getData', 'getDataDH']);

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

let isErrorFile = ref(false);
const reportData = ref(defaultReportData);
const isFirstSent = ref(true);
const firstPanelData = ref({
  comment: '',
  amount_of_money: '',
  scan_file: '',
  file_type: '',
  file_size: '',
});
const firstPanelDataDH = ref({
  comment: '',
  amount_of_money: '',
  scan_file: '',
})
const isSent = ref(false);

const focusOut = async () => {
  let formData = new FormData();
  formData.append('comment', firstPanelData.value.comment || '');
  formData.append('amount_of_money', firstPanelData.value.amount_of_money || '');
  try {
    if (isFirstSent.value) {
      const {data} = await reportPartTwoService.createReport(formData, '1', true);
      emit('getData', data, 1)
    } else {
      const {data} = await reportPartTwoService.createReportDraft(formData, '1', true);
      emit('getData', data, 1);
    }
  } catch (e) {
    console.log(e)
  }

};
const uploadFile = async (event) => {
  let formData = new FormData();

  formData.append('scan_file', event.target.files[0]);
  formData.append('comment', firstPanelData.value.comment || '');
  formData.append('amount_of_money', firstPanelData.value.amount_of_money || '');

  firstPanelData.value.file_size = (event.target.files[0].size / Math.pow(1024, 2));
  firstPanelData.value.file_type = event.target.files[0].type.split('/').at(-1);

  fileValidate(event.target.files[0], 7, isErrorFile);
  // console.log('(4)', 'перед отправкой в uploadFile', isErrorFile.value);

  if (isErrorFile.value) {
    firstPanelData.value.scan_file = event.target.files[0].name;
    // console.log('ФАЙЛ НЕ ОТПРАВЛЯЕТСЯ');
  } else {
    if (isFirstSent.value) {
      let {data} = await reportPartTwoService.createReport(formData, '1', true);
      emit('getData', data, 1);
      firstPanelData.value.scan_file = data.scan_file.split('/').at(-1);
    } else {
      let {data} = await reportPartTwoService.createReportDraft(formData, '1', true);
      emit('getData', data, 1);
      firstPanelData.value.scan_file = data.scan_file.split('/').at(-1);
    }
  }
};
const uploadFileDH = (event) => {
  reportStore.reportDataDHFile.first = event.target.files[0];
  firstPanelDataDH.value.scan_file = event.target.files[0];
}
const deleteFile = async () => {
  firstPanelData.value.scan_file = '';
  firstPanelData.value.file_size = '';
  firstPanelData.value.file_type = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  formData.append('comment', firstPanelData.value.comment || '');
  formData.append('amount_of_money', firstPanelData.value.amount_of_money || '');

  if (isErrorFile.value) {
    firstPanelData.value.scan_file = "";
  } else {
    if (isFirstSent.value) {
      const {data} = await reportPartTwoService.createReport(formData, '1', true);
      emit('getData', data, 1);
    } else {
      const {data} = await reportPartTwoService.createReportDraft(formData, '1', true);
      emit('getData', data, 1);
    }
  }
};
const deleteFileDH = () => {
  reportStore.reportDataDHFile.first = null;

  let formData = new FormData();
  formData.append('comment', firstPanelDataDH.value.comment);
  formData.append('amount_of_money', firstPanelDataDH.value.amount_of_money);
  emit('getDataDH', formData, 1);
}
watchEffect(async () => {
  try {
    if (!(props.centralExpert || props.districtExpert)) {
      const res = await getReportForSecond();
      reportData.value = res.data;
    }
  } catch (e) {
    console.log(e)
  }

  if (props.data) {
    isFirstSent.value = false;
    firstPanelData.value.comment = props.data.comment;
    firstPanelData.value.amount_of_money = props.data.amount_of_money;
    firstPanelData.value.scan_file = props.data.scan_file;
    firstPanelData.value.file_type = props.data.file_type;
    firstPanelData.value.file_size = props.data.file_size;
    isSent.value = props.data.is_sent;
  }

  if (reportStore.reportDataDH.first) {
    firstPanelDataDH.value.comment = reportStore.reportDataDH.first.comment;
    firstPanelDataDH.value.amount_of_money = reportStore.reportDataDH.first.amount_of_money;
  }
});

watchPostEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    firstPanelData.value.comment = props.data.comment;
    firstPanelData.value.amount_of_money = props.data.amount_of_money;
    firstPanelData.value.scan_file = props.data.scan_file || '';
    firstPanelData.value.file_type = props.data.file_type || '';
    firstPanelData.value.file_size = props.data.file_size || '';
    isSent.value = props.data.is_sent;
  }
});

watch(firstPanelDataDH.value, () => {
  reportStore.reportDataDH.first = firstPanelDataDH.value;

  let formData = new FormData();
  formData.append('comment', firstPanelDataDH.value.comment);
  formData.append('amount_of_money', firstPanelDataDH.value.amount_of_money);
  if (reportStore.reportDataDHFile.first) formData.append('scan_file', reportStore.reportDataDHFile.first);

  emit('getDataDH', formData, 1);
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

.report__add-file-form-label {
  display: block;
  width: 232px;
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