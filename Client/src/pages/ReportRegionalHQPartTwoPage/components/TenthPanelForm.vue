<template>
  <div v-if="!(props.centralExpert || props.districtExpert)" class="form__field-group">
    <div style="display: flex; justify-content: space-between;">
      <div>
        <p class="form__title">{{ props.title }}</p>
      </div>
      <div>
        <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть"/>
      </div>
    </div>

    <div class="form__field">
      <p class="form__label" id="form__label-radio">Проведение акции <sup class="valid-red">*</sup></p>
      <div class="form__field-radio" style="display: flex">
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelData.event_happened"
              id="event_happened-true"
              class="custom-radio"
              type="radio"
              :value="true"
              :disabled="isSent"
          />
          <label for="event_happened-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelData.event_happened"
              id="event_happened-false"
              class="custom-radio"
              type="radio"
              :value="false"
              :disabled="isSent"
          />
          <label for="event_happened-false">Нет</label>
        </div>
      </div>
      <div style="margin-bottom: 8px;">
        <label style="display: flex; " class="form__label" for="4">Скан документа, подтверждающего проведение
          акции</label>
        <InputReport
            class="form-input__file-input"
            v-if="!tenthPanelData.document"
            isFile
            type="file"
            id="scan_file"
            name="scan_file"
            @change="uploadFile"
            :disabled="isSent || !tenthPanelData.event_happened"
        />
        <FileBoxComponent
            v-else
            :file="tenthPanelData.document"
            :fileType="tenthPanelData.file_type"
            :fileSize="tenthPanelData.file_size"
            :isSent="isSent"
            :is-error-file="isErrorFile && !tenthPanelData.file_size"
            @click="deleteFile"
        />
      </div>
      <div>
        <p class="form__label">Ссылка на социальные сети/ электронные <br>
          СМИ, подтверждающая проведение акции</p>
        <div class="input-link" v-for="(link, i) in tenthPanelData.links" :key="i">
          <InputReport
              v-model:value="link.link"
              :id="i"
              :name="i"
              class="form__input form__input-add-link"
              type="text"
              placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
              @focusout="formData"
              :disabled="isSent || !tenthPanelData.event_happened"
              is-link
          />
          <div v-if="!isSent && tenthPanelData.event_happened">
            <Button v-if="tenthPanelData.links.length === i + 1" class="form__add-link-button" label="+ Добавить ссылку"
                    @click="addLink"/>
            <Button class="form__add-link-button" v-else label="Удалить" @click="onDeleteLink(i)"/>
          </div>
        </div>
      </div>
      <div class="form__field-comment">
        <label style="display: flex; align-items: center;" class="form__label" for="comment">Комментарий <sup
            class="valid-red">*</sup></label>
        <TextareaReport
            placeholder="Напишите сообщение"
            v-model:value="tenthPanelData.comment"
            id="comment"
            name="comment"
            :rows="row"
            autoResize
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            class="form__input form__input-comment"
            style="margin-bottom: 4px;"
            :disabled="isSent || !tenthPanelData.event_happened"
            @focusout="formData"
        />
      </div>
    </div>

  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>

      <div style="display: flex; justify-content: space-between;">
        <div>
          <p class="form__title">{{ props.title }}</p>
        </div>
        <div>
          <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть"/>
        </div>
      </div>

      <div class="form__field">
        <p class="form__label" id="form__label-radio">Проведение акции <sup class="valid-red">*</sup></p>
        <div class="form__field-radio" style="display: flex">
          <div style="display: flex; align-items: center">
            <input
                v-model="tenthPanelData.event_happened"
                id="event_happened-true"
                class="custom-radio"
                type="radio"
                :value="true"
                disabled
            />
            <label for="event_happened-true">Да</label>
          </div>
          <div style="display: flex; align-items: center">
            <input
                v-model="tenthPanelData.event_happened"
                id="event_happened-false"
                class="custom-radio"
                type="radio"
                :value="false"
                disabled
            />
            <label for="event_happened-false">Нет</label>
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <label style="display: flex; " class="form__label" for="4">Скан документа, подтверждающего проведение
            акции</label>
          <InputReport
              class="form-input__file-input"
              v-if="!tenthPanelData.document"
              isFile
              type="file"
              id="scan_file"
              name="scan_file"
              @change="uploadFile"
              :disabled="isSent || !tenthPanelData.event_happened"
          />
          <FileBoxComponent
              v-else
              :file="tenthPanelData.document"
              :fileType="tenthPanelData.file_type"
              :fileSize="tenthPanelData.file_size"
              :isSent="isSent"
              :is-error-file="isErrorFile && !tenthPanelData.file_size"
              @click="deleteFile"
          />
        </div>
        <div>
          <p class="form__label">Ссылка на социальные сети/ электронные <br>
            СМИ, подтверждающая проведение акции</p>
          <div class="input-link" v-for="(link, i) in tenthPanelData.links" :key="i">
            <InputReport
                v-model:value="link.link"
                :id="i"
                :name="i"
                class="form__input form__input-add-link"
                type="text"
                placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                @focusout="formData"
                :disabled="isSent || !tenthPanelData.event_happened"
                is-link
            />
            <div v-if="!isSent && tenthPanelData.event_happened">
              <Button v-if="tenthPanelData.links.length === i + 1" class="form__add-link-button"
                      label="+ Добавить ссылку"
                      @click="addLink"/>
              <Button class="form__add-link-button" v-else label="Удалить" @click="onDeleteLink(i)"/>
            </div>
          </div>
        </div>
        <div class="form__field-comment">
          <label style="display: flex; align-items: center;" class="form__label" for="comment">Комментарий <sup
              class="valid-red">*</sup></label>
          <TextareaReport
              placeholder="Напишите сообщение"
              v-model:value="tenthPanelData.comment"
              id="comment"
              name="comment"
              :rows="1"
              autoResize
              :maxlength="3000"
              :max-length-text="3000"
              counter-visible
              class="form__input form__input-comment"
              style="margin-bottom: 4px;"
              disabled
          />
        </div>
      </div>

    </template>

    <template v-slot:secondTab>

      <div style="display: flex; justify-content: space-between;">
        <div>
          <p class="form__title">{{ props.title }}</p>
        </div>
        <div>
          <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть"/>
        </div>
      </div>

      <div class="form__field-radio" style="display: flex">
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelDataDH.event_happened"
              id="event_happenedDH-true"
              class="custom-radio"
              type="radio"
              :value="true"
              :disabled="centralExpert"
          />
          <label for="event_happenedDH-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelDataDH.event_happened"
              id="event_happenedDH-false"
              class="custom-radio"
              type="radio"
              :value="false"
              :disabled="centralExpert"
          />
          <label for="event_happenedDH-false">Нет</label>
        </div>
      </div>

      <div class="form__field">
        <CommentFileComponent
            v-model:value="tenthPanelDataDH.comment"
            name="firstPanelDataDH.comment"
            :file="fileNameDH"
            :fileType="fileTypeDH"
            :fileSize="fileSizeDH"
            :disabled="centralExpert"
            :is-error-file="isErrorFile"
            @change="uploadFileDH"
            @click="deleteFileDH"
        />
      </div>

    </template>

    <template v-slot:thirdTab>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p class="form__title">{{ props.title }}</p>
        </div>
        <div>
          <Button @click="collapseForm" class="form__btn" style="margin: 0" label="Свернуть"/>
        </div>
      </div>
      <label class="form__label">Проведение акции <sup
          class="valid-red">*</sup></label>
      <v-table>
        <tbody>
        <tr class="report-table__tr">
          <td class="report-table__th report-table__th__br-left">Данные РО</td>
          <td class="report-table__th report-table__td__center">Корректировка ОШ</td>
          <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
        </tr>
        <tr class="report-table__tr">
          <td class="report-table__td">{{ tenthPanelData.event_happened ? 'Да' : 'Нет' }}</td>
          <td class="report-table__td report-table__td__center">{{
              tenthPanelDataDH.event_happened ? 'Да' : 'Нет'
            }}
          </td>
          <td class="report-table__td">
            {{ tenthPanelDataCH.event_happened === null ? null : tenthPanelDataCH.event_happened ? 'Да' : 'Нет' }}
          </td>
        </tr>
        </tbody>
      </v-table>
      <label class="form__label">Проведение акции <sup
          class="valid-red">*</sup></label>
      <div class="form__field-radio" style="display: flex; margin-top: 10px;">
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelDataCH.event_happened"
              id="event_happenedCH-true"
              class="custom-radio"
              type="radio"
              :value="true"
          />
          <label for="event_happenedCH-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelDataCH.event_happened"
              id="event_happenedCH-false"
              class="custom-radio"
              type="radio"
              :value="false"
          />
          <label for="event_happenedCH-false">Нет</label>
        </div>
      </div>
      <div>
        <CommentFileComponent
            v-model:value="tenthPanelDataCH.comment"
            name="firstPanelDataDH.comment"
            :file="tenthPanelDataCH.document ? tenthPanelDataCH.document.name : null"
            :fileType="tenthPanelDataCH.document ? tenthPanelDataCH.document.type.split('/').at(-1) : null"
            :fileSize="tenthPanelDataCH.document ? tenthPanelDataCH.document.size / Math.pow(1024, 2) : null"
            :is-error-file="isErrorFile"
            @change="uploadFileCH"
            @click="deleteFileCH"
        />
      </div>
      <div>
        <v-checkbox
            v-model="returnReport"
            @change="onReportReturn"
            label="Вернуть в РО на доработку"
        />
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import {onMounted, ref, watch, watchEffect, watchPostEffect} from "vue";
import {InputReport, TextareaReport} from '@shared/components/inputs';
import {Button} from '@shared/components/buttons';
import {ReportTabs} from './index';
import {CommentFileComponent, FileBoxComponent} from '@entities/RatingRoComponents/components';

const props = defineProps({
  data: Object,
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  isErrorFileProp: Boolean,
  title: String,
  dataDH: Object,
  dataCH: Object,
  dataForCheckCH: Object,
  document: undefined,
  documentCH: undefined,
  returnReportProp: Boolean,
});

const tenthPanelData = ref({
  event_happened: null,
  document: '',
  file_size: '',
  file_type: '',
  comment: '',
  links: [
    {
      link: '',
    },
  ],
});
const tenthPanelDataDH = ref({
  event_happened: null,
  comment: '',
  document: '',
  file_size: '',
  file_type: '',
});
const tenthPanelDataCH = ref({
  event_happened: null,
  comment: '',
  document: '',
  file_size: '',
  file_type: '',
})
const fileNameDH = ref(null);
const fileSizeDH = ref(null);
const fileTypeDH = ref(null);
const isSent = ref(false);
let isErrorFile = ref(false);
const returnReport = ref(false);
const row = ref(1);

const emit = defineEmits(['collapse-form', 'formData', 'uploadFile', 'deleteFile', 'deleteLink', 'clearForm', 'getDataDH', 'getDataCH', 'onReturnReport']);

const collapseForm = () => {
  emit('collapse-form');
};

const formData = () => {
  emit('formData', tenthPanelData.value);
};

const addLink = () => {
  tenthPanelData.value.links.push({link: ''})
};

const onDeleteLink = (linkIndex) => {
  emit('deleteLink', linkIndex)
}

const uploadFile = async (event) => {
  emit('uploadFile', event)
};

const deleteFile = () => {
  emit('deleteFile')
};

const uploadFileDH = (event) => {
  if (event.target.files) {
    tenthPanelDataDH.value.document = event.target.files[0];
    fileNameDH.value = tenthPanelDataDH.value.document.name || null;
    fileSizeDH.value = tenthPanelDataDH.value.document.size / Math.pow(1024, 2) || null;
    fileTypeDH.value = tenthPanelDataDH.value.document.type.split('/').at(-1) || null;
  }
};

const uploadFileCH = (event) => {
  if (event.target.files) {
    tenthPanelDataCH.value.document = event.target.files[0];
  }
};

const deleteFileDH = () => {
  tenthPanelDataDH.value.document = null;
  fileNameDH.value = null;
  fileSizeDH.value = null;
  fileTypeDH.value = null;
};

const deleteFileCH = () => {
  tenthPanelDataCH.value.document = null;
};

const onReportReturn = (event) => {
  if (event.target.checked) {
    const data = {
      data: tenthPanelDataCH.value,
      reportReturn: true
    }
    emit('onReturnReport', data);
  } else {
    const data = {
      data: tenthPanelDataCH.value,
      reportReturn: false
    }
    emit('onReturnReport', data);
  }

}

onMounted(() => {
  // Мапинг данных для отчета эксперта ОШ
  tenthPanelDataDH.value.event_happened = props.dataDH.event_happened;
  tenthPanelDataDH.value.comment = props.dataDH.comment;
  if (props.document) {
    tenthPanelDataDH.value.document = props.document;
  }

  // Мапинг данных для отчета эксперта ЦШ
  if (props.dataForCheckCH) {
    // Добавление данных панели "отчет РО"
    tenthPanelData.value = JSON.parse(props.dataForCheckCH.regional_version);

    // Добавление данных панели "корректировка ОШ"
    tenthPanelDataDH.value.event_happened = props.dataForCheckCH.event_happened;
    tenthPanelDataDH.value.comment = props.dataForCheckCH.comment;

    if (props.dataForCheckCH.document) {
      fileNameDH.value = props.dataForCheckCH.document;
      fileTypeDH.value = props.dataForCheckCH.file_type;
      fileSizeDH.value = props.dataForCheckCH.file_size;
    }

    // Добавление данных для панели "корректировка ЦШ"
    if (props.dataCH) {
      tenthPanelDataCH.value.event_happened = props.dataCH.event_happened === undefined ? null : props.dataCH.event_happened;
      tenthPanelDataCH.value.comment = props.dataCH.comment;

      returnReport.value = props.returnReportProp;
    }

    if (props.documentCH) {
      tenthPanelDataCH.value.document = props.documentCH
    }
  }
});

watchEffect(() => {
  tenthPanelData.value = {...props.data};
  isSent.value = props.data.is_sent;
  isErrorFile.value = props.isErrorFileProp;

  // row.value = tenthPanelData.value.comment ? tenthPanelData.value.comment.split('\n').length : 1;
});

watchPostEffect(() => {
  if (!tenthPanelData.value.links.length) tenthPanelData.value.links.push({link: ''})
});

watch(() => tenthPanelData.value.event_happened, (isEventHappened) => {
  if (!isEventHappened) {
    if (!props.centralExpert) emit('clearForm');
  } else {
    if (!props.centralExpert) emit('formData', tenthPanelData.value);
  }
});

watch(tenthPanelDataDH.value, () => {
  emit('getDataDH', tenthPanelDataDH.value);
});

watch(tenthPanelDataCH.value, () => {
  emit('getDataCH', tenthPanelDataCH.value);
});
</script>
<style lang="scss" scoped>
.form__add-link-button {
  width: 141px;
  margin: 8px 0;
  border: none;
  background-color: transparent;
  color: #1F7CC0;
  padding: 0;
  text-align: left;
}

.form-input__file-input {
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 86px;

  @media (max-width: 1024px) {
    width: 528px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 568px) {
    min-height: 101px;
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

.input-link {
  display: flex;
  gap: 40px;
  margin-bottom: 8px;
  flex-wrap: wrap;
  row-gap: 8px;

  @media (max-width: 1024px) {
    align-items: stretch;
    flex-direction: column;
  }
}

.form__input-add-link {
  width: 720px;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

.addLinkBtn {
  min-width: 141px;
  margin: 0;
  border: none;
  background-color: transparent;
  color: #1F7CC0;
  padding: 0;
  text-align: left;
}

.custom-radio {
  display: none;
  /* -стандартное отображение*/
}

.custom-radio + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  line-height: 20px;
}

.custom-radio + label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внешний синий круг */
}

.custom-radio + label::after {
  content: '';
  position: absolute;
  left: 5px;
  /* Отступ от внешнего круга */
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внутренний синий круг */
  background-color: transparent;
  /* Пустота внутри внутреннего круга */
}

.custom-radio:checked + label::after {
  background-color: #1F7CC0;
  /* Заполнение внутреннего круга синим цветом при выборе */
}

.form {
  &__title {
    font-family: Akrobat;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.6px;
    color: #1f7cc0;
  }

  &__btn {
    background-color: #d2e4f2;
    width: 85px;
    height: 33px;
    border: none;
    font-size: 16px;
    font-weight: 400;
    font-family: Akrobat;
    line-height: 21.1px;
    text-align: center;
    padding: 4px 11px;
    color: #1f7cc0;
    border-radius: 6px;
  }
}

.panel-card {
  box-shadow: none;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 10px;
  margin: 0;
  margin-top: 8px;
  padding: 40px 40px 60px;

  @media (max-width: 568px) {
    padding: 16px 16px 32px;
  }
}

.form__title {
  margin-bottom: 16px;
}

.form__field {
  gap: 8px;

  &-radio {
    gap: 40px;
    margin-bottom: 8px;

    @media (max-width: 568px) {
      gap: 32px;
      margin-bottom: 0;
    }
  }
}

#form__label-radio {
  @media (max-width: 568px) {
    margin-bottom: 0;
  }
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form__field-comment {
  width: 100%;

  @media (max-width: 1024px) {
    margin-top: 0;
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

    //&__br-left {
    //  border-radius: 10px 0 0 0;
    //  border-right: 1px solid #B6B6B6;
    //}
    //
    //&__br-right {
    //  border-radius: 0 10px 0 0;
    //  border-left: 1px solid #B6B6B6;
    //}

    &__br-center {
      border-left: 1px solid #B6B6B6;
      border-right: 1px solid #B6B6B6;
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