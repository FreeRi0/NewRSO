<template>
  <div
    v-if="
      !(
        props.centralExpert ||
        props.districtExpert ||
        isReportReject ||
        reportStore.isAllReportsVerifiedByCH
      ) ||
      (props.tab === 'Просмотр отправленного отчета' && isReportReject)
    "
    class="form__field-group"
  >
    <div style="display: flex; justify-content: space-between">
      <div>
        <p class="form__title">{{ props.title }}</p>
      </div>
      <div>
        <Button
          @click="collapseForm"
          class="form__btn"
          style="margin: 0"
          label="Свернуть"
        />
      </div>
    </div>

    <div class="form__field">
      <p class="form__label" id="form__label-radio">
        Проведение акции <sup class="valid-red">*</sup>
      </p>
      <div class="form__field-radio" style="display: flex">
        <div style="display: flex; align-items: center">
          <input
            v-model="eleventhPanelData.event_happened"
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
            v-model="eleventhPanelData.event_happened"
            id="event_happened-false"
            class="custom-radio"
            type="radio"
            :value="false"
            :disabled="isSent"
          />
          <label for="event_happened-false">Нет</label>
        </div>
      </div>
      <div style="margin-bottom: 8px">
        <label style="display: flex" class="form__label" for="4"
          >Скан документа, подтверждающего проведение акции</label
        >
        <InputReport
          class="form-input__file-input"
          v-if="!eleventhPanelData.document"
          isFile
          type="file"
          id="scan_file"
          name="scan_file"
          @change="uploadFile"
          :disabled="isSent || !eleventhPanelData.event_happened"
        />
        <FileBoxComponent
          v-else
          :file="eleventhPanelData.document"
          :fileType="eleventhPanelData.file_type"
          :fileSize="eleventhPanelData.file_size"
          :isSent="isSent"
          :is-error-file="isErrorFile && !eleventhPanelData.file_size"
          @click="deleteFile"
        />
      </div>
      <div>
        <p class="form__label">
          Ссылка на социальные сети/ электронные <br />
          СМИ, подтверждающая проведение акции
        </p>
        <div class="input-link" v-for="(link, i) in eleventhPanelData.links" :key="i">
          <InputReport
            v-model:value="link.link"
            :id="i"
            :name="i"
            class="form__input form__input-add-link"
            type="text"
            placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
            @focusout="formData"
            :disabled="isSent || !eleventhPanelData.event_happened"
            is-link
          />
          <div v-if="!isSent && eleventhPanelData.event_happened">
            <Button
              v-if="eleventhPanelData.links.length === i + 1"
              class="form__add-link-button"
              label="+ Добавить ссылку"
              @click="addLink"
            />
            <Button
              class="form__add-link-button"
              v-else
              label="Удалить"
              @click="onDeleteLink(i)"
            />
          </div>
        </div>
      </div>
      <div class="field_number">
        <div class="item_number form__field places">
          <p class="form__label">Общее количество участников</p>
          <InputReport
            @focusout="formData"
            v-model:value="eleventhPanelData.total_participants"
            :disabled="isSent || !eleventhPanelData.event_happened"
            placeholder="Введите число"
            id="15"
            name="14"
            class="form__input number_input"
            type="number"
            :max="32767"
          />
        </div>
        <div class="item_number form__field places">
          <p class="form__label">Количество новых участников</p>
          <InputReport
            @focusout="formData"
            v-model:value="eleventhPanelData.new_participants"
            :disabled="isSent || !eleventhPanelData.event_happened"
            placeholder="Введите число"
            id="15"
            name="14"
            class="form__input number_input"
            type="number"
            :max="32767"
          />
        </div>
        <div v-if="id === 1" class="item_number form__field places">
          <p class="form__label">Количество благополучателей</p>
          <InputReport
            @focusout="formData"
            v-model:value="eleventhPanelData.beneficiaries"
            :disabled="isSent || !eleventhPanelData.event_happened"
            placeholder="Введите число"
            id="15"
            name="14"
            class="form__input number_input"
            type="number"
            :max="32767"
          />
        </div>

        <div v-if="id === 1" class="item_number form__field places">
          <p class="form__label">Количество населенных пунктов</p>
          <InputReport
            @focusout="formData"
            v-model:value="eleventhPanelData.settlements"
            :disabled="isSent || !eleventhPanelData.event_happened"
            placeholder="Введите число"
            id="15"
            name="14"
            class="form__input number_input"
            type="number"
            :max="32767"
          />
        </div>
        <div v-if="id === 2" class="item_number form__field places">
          <p class="form__label">Количество участников из других НКО</p>
          <InputReport
            @focusout="formData"
            v-model:value="eleventhPanelData.other_nko_participants"
            :disabled="isSent || !eleventhPanelData.event_happened"
            placeholder="Введите число"
            id="15"
            name="14"
            class="form__input number_input"
            type="number"
            :max="32767"
          />
        </div>
      </div>
      <div class="form__field-comment">
        <label
          style="display: flex; align-items: center"
          class="form__label"
          for="comment"
          >Комментарий <sup class="valid-red">*</sup></label
        >
        <TextareaReport
          placeholder="Напишите сообщение"
          v-model:value="eleventhPanelData.comment"
          id="comment"
          name="comment"
          :rows="row"
          autoResize
          :maxlength="3000"
          :max-length-text="3000"
          counter-visible
          class="form__input form__input-comment"
          style="margin-bottom: 4px"
          :disabled="isSent || !eleventhPanelData.event_happened"
          @focusout="formData"
        />
      </div>
    </div>
  </div>

  <report-tabs v-else :isReject="isReportReject && props.tab === 'Доработка'">
    <template v-slot:firstTab>
      <div style="display: flex; justify-content: space-between">
        <div>
          <p class="form__title">{{ props.title }}</p>
        </div>
        <div>
          <Button
            @click="collapseForm"
            class="form__btn"
            style="margin: 0"
            label="Свернуть"
          />
        </div>
      </div>

      <div class="form__field">
        <p class="form__label" id="form__label-radio">
          Проведение акции <sup class="valid-red">*</sup>
        </p>
        <div class="form__field-radio" style="display: flex">
          <div style="display: flex; align-items: center">
            <input
              v-model="eleventhPanelData.event_happened"
              id="event_happened-true"
              class="custom-radio"
              type="radio"
              :value="true"
              :disabled="
                props.centralExpert ||
                props.districtExpert ||
                reportStore.isAllReportsVerifiedByCH
              "
            />
            <label for="event_happened-true">Да</label>
          </div>
          <div style="display: flex; align-items: center">
            <input
              v-model="eleventhPanelData.event_happened"
              id="event_happened-false"
              class="custom-radio"
              type="radio"
              :value="false"
              :disabled="
                props.centralExpert ||
                props.districtExpert ||
                reportStore.isAllReportsVerifiedByCH
              "
            />
            <label for="event_happened-false">Нет</label>
          </div>
        </div>
        <div style="margin-bottom: 8px">
          <label style="display: flex" class="form__label" for="4"
            >Скан документа, подтверждающего проведение акции</label
          >
          <InputReport
            class="form-input__file-input"
            v-if="!eleventhPanelData.document"
            isFile
            type="file"
            id="scan_file"
            name="scan_file"
            @change="uploadFile"
            :disabled="
              props.centralExpert ||
              props.districtExpert ||
              reportStore.isAllReportsVerifiedByCH
            "
          />
          <FileBoxComponent
            v-else
            :file="eleventhPanelData.document"
            :fileType="eleventhPanelData.file_type"
            :fileSize="eleventhPanelData.file_size"
            :isSent="
              props.centralExpert ||
              props.districtExpert ||
              reportStore.isAllReportsVerifiedByCH
            "
            :is-error-file="isErrorFile && !eleventhPanelData.file_size"
            @click="deleteFile"
            :disabled="
              props.centralExpert ||
              props.districtExpert ||
              reportStore.isAllReportsVerifiedByCH
            "
          />
        </div>
        <div>
          <p class="form__label">
            Ссылка на социальные сети/ электронные <br />
            СМИ, подтверждающая проведение акции
          </p>
          <div class="input-link" v-for="(link, i) in eleventhPanelData.links" :key="i">
            <InputReport
              v-model:value="link.link"
              :id="i"
              :name="i"
              class="form__input form__input-add-link"
              type="text"
              placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
              @focusout="formData"
              :disabled="
                props.centralExpert ||
                props.districtExpert ||
                reportStore.isAllReportsVerifiedByCH
              "
              is-link
            />
            <div
              v-if="
                !(
                  props.centralExpert ||
                  props.districtExpert ||
                  reportStore.isAllReportsVerifiedByCH
                )
              "
            >
              <Button
                v-if="eleventhPanelData.links.length === i + 1"
                class="form__add-link-button"
                label="+ Добавить ссылку"
                @click="addLink"
              />
              <Button
                class="form__add-link-button"
                v-else
                label="Удалить"
                @click="onDeleteLink(i)"
              />
            </div>
          </div>
        </div>
        <div class="field_number">
          <div class="item_number form__field places">
            <p class="form__label">Общее количество участников</p>
            <InputReport
              @focusout="formData"
              v-model:value="eleventhPanelData.total_participants"
              :disabled="isSent || !eleventhPanelData.event_happened"
              placeholder="Введите число"
              id="15"
              name="14"
              class="form__input number_input"
              type="number"
              :max="32767"
            />
          </div>
          <div class="item_number form__field places">
            <p class="form__label">Количество новых участников</p>
            <InputReport
              @focusout="formData"
              v-model:value="eleventhPanelData.new_participants"
              :disabled="isSent || !eleventhPanelData.event_happened"
              placeholder="Введите число"
              id="15"
              name="14"
              class="form__input number_input"
              type="number"
              :max="32767"
            />
          </div>
          <div v-if="id === 1" class="item_number form__field places">
            <p class="form__label">Количество благополучателей</p>
            <InputReport
              @focusout="formData"
              v-model:value="eleventhPanelData.beneficiaries"
              :disabled="isSent || !eleventhPanelData.event_happened"
              placeholder="Введите число"
              id="15"
              name="14"
              class="form__input number_input"
              type="number"
              :max="32767"
            />
          </div>

          <div v-if="id === 1" class="item_number form__field places">
            <p class="form__label">Количество населенных пунктов</p>
            <InputReport
              @focusout="formData"
              v-model:value="eleventhPanelData.settlements"
              :disabled="isSent || !eleventhPanelData.event_happened"
              placeholder="Введите число"
              id="15"
              name="14"
              class="form__input number_input"
              type="number"
              :max="32767"
            />
          </div>
          <div v-if="id === 2" class="item_number form__field places">
            <p class="form__label">Количество участников из других НКО</p>
            <InputReport
              @focusout="formData"
              v-model:value="eleventhPanelData.other_nko_participants"
              :disabled="isSent || !eleventhPanelData.event_happened"
              placeholder="Введите число"
              id="15"
              name="14"
              class="form__input number_input"
              type="number"
              :max="32767"
            />
          </div>
        </div>
        <div class="form__field-comment">
          <label
            style="display: flex; align-items: center"
            class="form__label"
            for="comment"
            >Комментарий <sup class="valid-red">*</sup></label
          >
          <TextareaReport
            placeholder="Напишите сообщение"
            v-model:value="eleventhPanelData.comment"
            id="comment"
            name="comment"
            :rows="1"
            autoResize
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            class="form__input form__input-comment"
            style="margin-bottom: 4px"
            :disabled="
              props.centralExpert ||
              props.districtExpert ||
              reportStore.isAllReportsVerifiedByCH
            "
            @focusout="formData"
          />
        </div>
      </div>
    </template>

    <template v-slot:secondTab>
      <div style="display: flex; justify-content: space-between">
        <div>
          <p class="form__title">{{ props.title }}</p>
        </div>
        <div>
          <Button
            @click="collapseForm"
            class="form__btn"
            style="margin: 0"
            label="Свернуть"
          />
        </div>
      </div>

      <div class="form__field-radio" style="display: flex">
        <div style="display: flex; align-items: center">
          <input
            v-model="eleventhPanelDataDH.event_happened"
            id="event_happenedDH-true"
            class="custom-radio"
            type="radio"
            :value="true"
            :disabled="
              centralExpert || isReportReject || reportStore.isAllReportsVerifiedByCH
            "
          />
          <label for="event_happenedDH-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input
            v-model="eleventhPanelDataDH.event_happened"
            id="event_happenedDH-false"
            class="custom-radio"
            type="radio"
            :value="false"
            :disabled="
              centralExpert || isReportReject || reportStore.isAllReportsVerifiedByCH
            "
          />
          <label for="event_happenedDH-false">Нет</label>
        </div>
      </div>

      <div class="form__field">
        <CommentFileComponent
          v-model:value="eleventhPanelDataDH.comment"
          name="firstPanelDataDH.comment"
          :file="fileNameDH"
          :fileType="fileTypeDH"
          :fileSize="fileSizeDH"
          :disabled="
            centralExpert || isReportReject || reportStore.isAllReportsVerifiedByCH
          "
          :is-error-file="isErrorFile"
          @change="uploadFileDH"
          @click="deleteFileDH"
          :is-sent="
            centralExpert || isReportReject || reportStore.isAllReportsVerifiedByCH
          "
        />
      </div>
    </template>

    <template v-slot:thirdTab>
      <div style="display: flex; justify-content: space-between">
        <div>
          <p class="form__title">{{ props.title }}</p>
        </div>
        <div>
          <Button
            @click="collapseForm"
            class="form__btn"
            style="margin: 0"
            label="Свернуть"
          />
        </div>
      </div>
      <label style="display: block" class="form__label"
        >Проведение акции <sup class="valid-red">*</sup></label
      >
      <v-table class="report_table-wide">
        <tbody class="report-table">
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-left">Данные РО</td>
            <td class="report-table__th report-table__td__center">Корректировка ОШ</td>
            <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__td">
              {{ eleventhPanelData.event_happened ? "Да" : "Нет" }}
            </td>
            <td class="report-table__td report-table__td__center">
              {{ eleventhPanelDataDH.event_happened ? "Да" : "Нет" }}
            </td>
            <td
              :class="[
                'report-table__td',
                (isReportReject && !centralExpert) ||
                props.reportVerifiedByCH ||
                reportStore.isAllReportsVerifiedByCH
                  ? 'report-table__td--bgcolor'
                  : '',
              ]"
            >
              {{
                eleventhPanelDataCH.event_happened === null
                  ? null
                  : eleventhPanelDataCH.event_happened
                  ? "Да"
                  : "Нет"
              }}
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-table class="report_table-narrow">
        <tbody class="report-table">
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-left">Данные РО</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__td">
              {{ eleventhPanelData.event_happened ? "Да" : "Нет" }}
            </td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th report-table__td__center">Корректировка ОШ</td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__td report-table__td__center">
              {{ eleventhPanelDataDH.event_happened ? "Да" : "Нет" }}
            </td>
          </tr>
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
          </tr>
          <tr class="report-table__tr">
            <td
              :class="[
                'report-table__td',
                (isReportReject && !centralExpert) ||
                props.reportVerifiedByCH ||
                reportStore.isAllReportsVerifiedByCH
                  ? 'report-table__td--bgcolor'
                  : '',
              ]"
            >
              {{
                eleventhPanelDataCH.event_happened === null
                  ? null
                  : eleventhPanelDataCH.event_happened
                  ? "Да"
                  : "Нет"
              }}
            </td>
          </tr>
        </tbody>
      </v-table>
      <label class="form__label">Проведение акции <sup class="valid-red">*</sup></label>
      <div class="form__field-radio" style="display: flex; margin-top: 10px">
        <div style="display: flex; align-items: center">
          <input
            v-model="eleventhPanelDataCH.event_happened"
            id="event_happenedCH-true"
            class="custom-radio"
            type="radio"
            :value="true"
            :disabled="
              (isReportReject && !centralExpert) ||
              props.reportVerifiedByCH ||
              reportStore.isAllReportsVerifiedByCH
            "
          />
          <label for="event_happenedCH-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input
            v-model="eleventhPanelDataCH.event_happened"
            id="event_happenedCH-false"
            class="custom-radio"
            type="radio"
            :value="false"
            :disabled="
              (isReportReject && !centralExpert) ||
              props.reportVerifiedByCH ||
              reportStore.isAllReportsVerifiedByCH
            "
          />
          <label for="event_happenedCH-false">Нет</label>
        </div>
      </div>
      <div>
        <CommentFileComponent
          v-model:value="eleventhPanelDataCH.comment"
          name="firstPanelDataDH.comment"
          :file="fileNameCH"
          :fileType="fileTypeCH"
          :fileSize="fileSizeCH"
          :is-error-file="isErrorFile"
          @change="uploadFileCH"
          @click="deleteFileCH"
          :disabled="
            (isReportReject && !centralExpert) ||
            props.reportVerifiedByCH ||
            reportStore.isAllReportsVerifiedByCH
          "
          :is-sent="
            isReportReject ||
            props.reportVerifiedByCH ||
            reportStore.isAllReportsVerifiedByCH
          "
        />
      </div>
      <div v-if="!reportStore.isAllReportsVerifiedByCH && !props.reportVerifiedByCH">
        <v-checkbox
          v-model="returnReport"
          @change="onReportReturn"
          label="Вернуть в РО на доработку"
          :disabled="isReportReject && !centralExpert"
        />
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import { onMounted, ref, watch, watchEffect, watchPostEffect } from "vue";
import { InputReport, TextareaReport } from "@shared/components/inputs";
import { Button } from "@shared/components/buttons";
import { ReportTabs } from "./index";
import {
  CommentFileComponent,
  FileBoxComponent,
} from "@entities/RatingRoComponents/components";
import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  id: Number,
  data: Object,
  districtExpert: {
    type: Boolean,
  },
  centralExpert: {
    type: Boolean,
  },
  isErrorFileProp: Boolean,
  title: String,
  dataDH: Object,
  dataCH: Object,
  dataForCheckCH: Object,
  document: undefined,
  documentCH: undefined,
  returnReportProp: Boolean,
  isReportReject: {
    type: Boolean,
    default: false,
  },
  reportRejectData: Object,
  tab: String,
  reportVerifiedByCH: Boolean,
});

const eleventhPanelData = ref({
  event_happened: null,
  document: "",
  file_size: "",
  file_type: "",
  comment: "",
  total_participants: "",
  new_participants: "",
  beneficiaries: "",
  settlements: "",
  other_nko_participants: "",
  links: [
    {
      link: "",
    },
  ],
});
const eleventhPanelDataDH = ref({
  event_happened: null,
  comment: "",
  total_participants: "",
  new_participants: "",
  beneficiaries: "",
  settlements: "",
  other_nko_participants: "",
  document: "",
  file_size: "",
  file_type: "",
});
const eleventhPanelDataCH = ref({
  event_happened: null,
  comment: "",
  total_participants: "",
  new_participants: "",
  beneficiaries: "",
  settlements: "",
  other_nko_participants: "",
  document: "",
  file_size: "",
  file_type: "",
});
const fileNameDH = ref(null);
const fileSizeDH = ref(null);
const fileTypeDH = ref(null);
const fileNameCH = ref(null);
const fileSizeCH = ref(null);
const fileTypeCH = ref(null);
const isSent = ref(false);
let isErrorFile = ref(false);
const returnReport = ref(false);
const row = ref(1);

const emit = defineEmits([
  "collapse-form",
  "formData",
  "uploadFile",
  "deleteFile",
  "deleteLink",
  "clearForm",
  "getDataDH",
  "getDataCH",
  "onReturnReport",
]);

const collapseForm = () => {
  emit("collapse-form");
};

const formData = () => {
  emit("formData", eleventhPanelData.value);
};

const addLink = () => {
  eleventhPanelData.value.links.push({ link: "" });
};

const onDeleteLink = (linkIndex) => {
  emit("deleteLink", linkIndex);
};

const uploadFile = async (event) => {
  emit("uploadFile", event);
};

const deleteFile = () => {
  emit("deleteFile");
};

const uploadFileDH = (event) => {
  if (event.target.files) {
    eleventhPanelDataDH.value.document = event.target.files[0];
    fileNameDH.value = eleventhPanelDataDH.value.document.name || null;
    fileSizeDH.value =
      eleventhPanelDataDH.value.document.size / Math.pow(1024, 2) || null;
    fileTypeDH.value = eleventhPanelDataDH.value.document.type.split("/").at(-1) || null;
  }
};
const uploadFileCH = (event) => {
  if (event.target.files) {
    eleventhPanelDataCH.value.document = event.target.files[0];
    fileNameCH.value = eleventhPanelDataCH.value.document.name || null;
    fileSizeCH.value =
      eleventhPanelDataCH.value.document.size / Math.pow(1024, 2) || null;
    fileTypeCH.value = eleventhPanelDataCH.value.document.type.split("/").at(-1) || null;
  }
};

const deleteFileDH = () => {
  eleventhPanelDataDH.value.document = null;
  fileNameDH.value = null;
  fileSizeDH.value = null;
  fileTypeDH.value = null;
};
const deleteFileCH = () => {
  eleventhPanelDataCH.value.document = null;
  fileNameCH.value = null;
  fileSizeCH.value = null;
  fileTypeCH.value = null;
};

const onReportReturn = (event) => {
  if (event.target.checked) {
    const data = {
      data: eleventhPanelDataCH.value,
      reportReturn: true,
    };
    emit("onReturnReport", data);
  } else {
    const data = {
      data: eleventhPanelDataCH.value,
      reportReturn: false,
    };
    emit("onReturnReport", data);
  }
};

onMounted(() => {
  /*
   * Мапинг данных для отчета эксперта ОШ
   */
  eleventhPanelDataDH.value.event_happened = props.dataDH.event_happened;
  eleventhPanelDataDH.value.comment = props.dataDH.comment;
  if (props.document) {
    eleventhPanelDataDH.value.document = props.document;
    fileNameDH.value = props.document.name || null;
    fileSizeDH.value = props.document.size / Math.pow(1024, 2) || null;
    fileTypeDH.value = props.document.type.split("/").at(-1) || null;
  }

  /*
   * Мапинг данных для отчета эксперта ЦШ
   */
  if (props.dataForCheckCH) {
    console.log("props.dataForCheckCH", props.dataForCheckCH);
    if (props.dataForCheckCH.rejecting_reasons) {
      // console.log('here')
      // Добавление данных панели "отчет РО"
      eleventhPanelData.value = props.dataForCheckCH;

      // Рефакторинг - добавлен код ниже, т.к. на вкл РО отображались данные ЦШ
      if (props.dataForCheckCH.regional_version) {
        eleventhPanelData.value = JSON.parse(props.dataForCheckCH.regional_version);
      }

      // Добавление данных панели "корректировка ОШ"
      const reportDH = JSON.parse(props.dataForCheckCH.district_version);
      eleventhPanelDataDH.value.event_happened = reportDH.event_happened;
      eleventhPanelDataDH.value.comment = reportDH.comment;
      if (reportDH.document) {
        fileNameDH.value = reportDH.document;
        fileTypeDH.value = reportDH.file_type;
        fileSizeDH.value = reportDH.file_size;
      }

      // Добавление данных для панели "корректировка ЦШ"
      let reportCH;
      // Проверка на верификацию отчета ЦШ. При верифицированом отчете данные берутся из общего объекта
      if (props.reportVerifiedByCH) {
        reportCH = props.dataForCheckCH;
      } else {
        reportCH = props.dataForCheckCH.central_version;
      }

      if (reportCH) {
        eleventhPanelDataCH.value.event_happened =
          reportCH.event_happened === undefined ? null : reportCH.event_happened;
        eleventhPanelDataCH.value.comment = props.dataCH.comment;

        returnReport.value = props.returnReportProp;
      }

      if (reportCH.document) {
        eleventhPanelDataCH.value.document = reportCH.document;
        fileNameCH.value = reportCH.document || null;
        fileTypeCH.value = reportCH.file_type || null;
        fileSizeCH.value = reportCH.file_size || null;
      }
    } else {
      console.log("here2");
      // Добавление данных панели "отчет РО"
      eleventhPanelData.value = JSON.parse(props.dataForCheckCH.regional_version);

      // Добавление данных панели "корректировка ОШ"
      eleventhPanelDataDH.value.event_happened = props.dataForCheckCH.event_happened;
      eleventhPanelDataDH.value.comment = props.dataForCheckCH.comment;

      if (props.dataForCheckCH.document) {
        fileNameDH.value = props.dataForCheckCH.document;
        fileTypeDH.value = props.dataForCheckCH.file_type;
        fileSizeDH.value = props.dataForCheckCH.file_size;
      }

      // Добавление данных для панели "корректировка ЦШ"
      if (props.dataCH) {
        eleventhPanelDataCH.value.event_happened =
          props.dataCH.event_happened === undefined ? null : props.dataCH.event_happened;
        eleventhPanelDataCH.value.comment = props.dataCH.comment;

        returnReport.value = props.returnReportProp;
      }

      if (props.documentCH) {
        eleventhPanelDataCH.value.document = props.documentCH;
        fileNameCH.value = props.documentCH.name || null;
        fileTypeCH.value = props.documentCH.type.split("/").at(-1) || null;
        fileSizeCH.value = props.documentCH.size / Math.pow(1024, 2) || null;
      }
    }
  }

  // Мапинг данных для отчета командира РШ при возвращении на доработку
  if (
    props.reportRejectData &&
    (props.isReportReject || reportStore.isAllReportsVerifiedByCH)
  ) {
    // console.log('props.reportRejectData', props.reportRejectData)
    // console.log('props.isReportReject', props.isReportReject)

    returnReport.value = true;
    // Добавление данных панели "корректировка ОШ"
    const reportDataDH = JSON.parse(props.reportRejectData.district_version);
    eleventhPanelDataDH.value.event_happened = reportDataDH.event_happened;
    eleventhPanelDataDH.value.comment = reportDataDH.comment;
    fileNameDH.value = reportDataDH.document || null;
    fileSizeDH.value = reportDataDH.file_size || null;
    fileTypeDH.value = reportDataDH.file_type || null;

    // Добавление данных для панели "корректировка ЦШ"
    if (props.reportRejectData.central_version) {
      // Отчет создан:
      eleventhPanelDataCH.value.event_happened =
        props.reportRejectData.central_version.event_happened;
      eleventhPanelDataCH.value.comment = props.reportRejectData.central_version.comment;

      fileNameCH.value = props.reportRejectData.central_version?.document || null;
      fileTypeCH.value = props.reportRejectData.central_version?.file_type || null;
      fileSizeCH.value = props.reportRejectData.central_version?.file_size || null;
    } else {
      // Отчет не создан:
      eleventhPanelDataCH.value.event_happened = props.reportRejectData.event_happened;
      eleventhPanelDataCH.value.comment = props.reportRejectData.comment;

      fileNameCH.value = props.reportRejectData?.document || null;
      fileTypeCH.value = props.reportRejectData?.file_type || null;
      fileSizeCH.value = props.reportRejectData?.file_size || null;
    }
  }
});

watchEffect(() => {
  eleventhPanelData.value = { ...props.data };
  isSent.value = props.data.is_sent;
  isErrorFile.value = props.isErrorFileProp;
});

watchPostEffect(() => {
  if (!eleventhPanelData.value.links.length)
    eleventhPanelData.value.links.push({ link: "" });
});

watch(
  () => eleventhPanelData.value.event_happened,
  (isEventHappened) => {
    if (!isEventHappened) {
      if (!props.centralExpert) emit("clearForm");
    } else {
      if (!props.centralExpert) emit("formData", eleventhPanelData.value);
    }
  }
);

watch(eleventhPanelDataDH.value, () => {
  emit("getDataDH", eleventhPanelDataDH.value);
});

watch(eleventhPanelDataCH.value, () => {
  emit("getDataCH", eleventhPanelDataCH.value);
});
</script>
<style lang="scss" scoped>
.field_number {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.item_number {
  flex: 1 1 calc(50% - 8px);
  min-width: calc(50% - 8px);
  display: flex;
  margin-bottom: 0px;
}

.form__add-link-button {
  // width: 141px;
  margin: 8px 0;
  border: none;
  background-color: transparent;
  color: #1f7cc0;
  padding: 0;
  text-align: left;
  font-weight: 400;
  letter-spacing: 0.25px;
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
  color: #1f7cc0;
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
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #1f7cc0;
  /* Внешний синий круг */
}

.custom-radio + label::after {
  content: "";
  position: absolute;
  left: 5px;
  /* Отступ от внешнего круга */
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #1f7cc0;
  /* Внутренний синий круг */
  background-color: transparent;
  /* Пустота внутри внутреннего круга */
}

.custom-radio:checked + label::after {
  background-color: #1f7cc0;
  /* Заполнение внутреннего круга синим цветом при выборе */
}

.custom-radio:disabled + label {
  pointer-events: none;
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
  background: #f3f4f5;
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
  background: #f3f4f5;
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
  border-top: 1px solid #b6b6b6;
}

.v-table {
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid #b6b6b6;
}

.report-table {
  table-layout: fixed;

  &__tr {
    background-color: #ffffff;
    text-align: center;
    table-layout: fixed;

    .report-table__td {
      background-color: #f9fafb;
    }
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
      border-left: 1px solid #b6b6b6;
      border-right: 1px solid #b6b6b6;

      @media (max-width: 568px) {
        border-left: 0px solid #b6b6b6;
        border-right: 0px solid #b6b6b6;
      }
    }
  }

  &__td {
    text-align: center;
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    color: #8e8e93;
    table-layout: fixed;

    &:not(:last-child) {
      background-color: #f9fafb;
    }

    &--bgcolor {
      background-color: #f9fafb;
    }

    &__center {
      border-left: 1px solid #b6b6b6;
      border-right: 1px solid #b6b6b6;

      @media (max-width: 568px) {
        border-left: 0px solid #b6b6b6;
        border-right: 0px solid #b6b6b6;
      }
    }
  }
}

.report_table-wide {
  @media (max-width: 568px) {
    display: none;
  }
}

.report_table-narrow {
  display: none;

  @media (max-width: 568px) {
    display: table;
    width: 100%;
  }
}
</style>
