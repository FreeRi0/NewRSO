<template>
  <div class="report__field-group" v-if="!isSecondTab && !isThirdTab">
    <div class="report__fieldset report__fieldset--left-block">
      <label class="form__label report__label" for="participants_number">
        Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети
        &laquo;ВКонтакте&raquo;&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-model:value="eleventhPanelData.participants_number"
        id="participants_number"
        name="participants_number"
        style="width: 100%"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :max="2147483647"
        @focusout="focusOut"
        :disabled="isSent"
        :is-error-panel="isErrorPanel"
      />
    </div>

    <div class="report__fieldset report__fieldset--right-block">
      <p class="form__label report__label">
        Скриншот численности <br />
        группы РО&nbsp;РСО&nbsp;<sup class="valid-red">*</sup>
      </p>
      <InputReport
        v-if="!eleventhPanelData.scan_file"
        isFile
        type="file"
        accept=".jpg, .jpeg, .png, .pdf"
        id="scan_file"
        name="scan_file"
        width="100%"
        height="auto"
        @change="uploadFile"
        :disabled="isSent"
        :is-error-panel="isErrorPanel"
      />
      <FileBoxComponent
        v-else
        :file="eleventhPanelData.scan_file"
        :fileType="eleventhPanelData.file_type"
        :fileSize="eleventhPanelData.file_size"
        @click="deleteFile"
        :is-sent="isSent"
        :is-error-file="isErrorFile"
      ></FileBoxComponent>
    </div>

    <div
      class="report__fieldset report__fieldset--comment"
      v-if="
        !(districtExpert || centralExpert) ||
        (districtExpert && eleventhPanelData.comment) ||
        (centralExpert && eleventhPanelData.comment)
      "
    >
      <label class="form__label report__label" for="comment"> Комментарий </label>
      <TextareaReport
        v-model:value="eleventhPanelData.comment"
        id="comment"
        name="comment"
        placeholder="Напишите сообщение"
        :rows="1"
        autoResize
        counter-visible
        :maxlength="3000"
        :max-length-text="3000"
        @focusout="focusOut"
        :disabled="isSent"
      >
      </TextareaReport>
    </div>
  </div>

  <div v-if="isSecondTab" class="report__field-group">
    <div class="report__fieldset report__fieldset--left-block">
      <label class="form__label report__label" for="participants_number">
        Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети
        &laquo;ВКонтакте&raquo;&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-model:value="eleventhPanelData.participants_number"
        id="participants_number"
        name="participants_number"
        style="width: 100%"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :max="32767"
        @update:value="changeValue"
        :disabled="centralExpert"
      />
    </div>

    <CommentFileComponent
      v-model:value="eleventhPanelData.comment"
      name="eleventhPanelData.comment"
      @change="uploadFile"
      @focusout="focusOut"
      @click="deleteFile"
      :file="eleventhPanelData.scan_file"
      :fileType="eleventhPanelData.file_type"
      :fileSize="eleventhPanelData.file_size"
      :disabled="centralExpert"
    ></CommentFileComponent>
  </div>

  <div
    v-if="isThirdTab && centralExpert"
    class="report__field-group report__field-group--column"
  >
    <ReportTable
      label="Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;"
      name="eleventhPanelData.participants_number"
      :dataRH="54"
      :dataDH="178"
      v-model:value="eleventhPanelData.participants_number"
    ></ReportTable>

    <CommentFileComponent></CommentFileComponent>

    <div>
      <v-checkbox label="Вернуть в&nbsp;РО на&nbsp;доработку" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from "@shared/components/inputs";
import {
  CommentFileComponent,
  FileBoxComponent,
  ReportTable,
} from "@entities/RatingRoComponents/components";
import { reportPartTwoService } from "@services/ReportService.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";

// import { HTTP } from '@app/http';

const props = defineProps({
  districtExpert: {
    type: Boolean,
  },
  centralExpert: {
    type: Boolean,
  },
  isDisabled: {
    type: Boolean,
  },
  isSecondTab: {
    type: Boolean,
    default: false,
  },
  isThirdTab: {
    type: Boolean,
    default: false,
  },
  data: Object,
  isErrorPanel: {
    type: Boolean,
  },
});

const ID_PANEL = "11";
const isFirstSent = ref(true);
const scanFile = ref([]);
let isErrorFile = ref(false);
const eleventhPanelData = ref({
  participants_number: null,
  scan_file: "",
  file_size: null,
  file_type: "",
  comment: "",
});

const isSent = ref(false);

const emit = defineEmits(["update:value", 'getData']);

const changeValue = (event) => {
  emit("update:value", event);
};

const focusOut = async () => {
  // console.log(eleventhPanelData.value);
  let formData = new FormData();

  eleventhPanelData.value.participants_number ? formData.append("participants_number", eleventhPanelData.value.participants_number) : formData.append("participants_number", "");
  formData.append("comment", eleventhPanelData.value.comment);

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
      emit('getData', data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
      emit('getData', data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log('focusOut error:', e)
  }
};

const uploadFile = async (event) => {
  scanFile.value = event.target.files[0];
  let formData = new FormData();

  formData.append("scan_file", scanFile.value);
  formData.append("comment", eleventhPanelData.value.comment);

  eleventhPanelData.value.file_size = (scanFile.value.size / Math.pow(1024, 2));
  eleventhPanelData.value.file_type = scanFile.value.type.split('/').at(-1);

  fileValidate(scanFile.value, 3, isErrorFile);
  console.log('(4)', 'перед отправкой в uploadFile', isErrorFile.value);
  if (isErrorFile.value) {
    eleventhPanelData.value.scan_file = scanFile.value.name;
    console.log('ФАЙЛ НЕ ОТПРАВЛЯЕТСЯ');
  } else {
    try {
      if (isFirstSent.value) {
        let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        eleventhPanelData.value.scan_file = scan_file;
        emit('getData', scan_file, Number(ID_PANEL));
      } else {
        let {  data: scan_file  } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        eleventhPanelData.value.scan_file = scan_file;
        emit('getData', scan_file, Number(ID_PANEL));
        console.log('ФАЙЛ ОТПРАВЛЯЕТСЯ ПОВТОРНО');
      }
    } catch (e) {
      console.log('focusOut error:', e);
    }
  }
};

const deleteFile = async () => {
  eleventhPanelData.value.scan_file = "";
  let formData = new FormData();
  formData.append("scan_file", "");

  if (isErrorFile.value) {
    eleventhPanelData.value.scan_file = "";
  } else {
    try {
      if (isFirstSent.value) {
        let { data : scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        emit('getData', scan_file, Number(ID_PANEL));
      } else {
        
        let { data : scan_file } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        emit('getData', scan_file, Number(ID_PANEL));
      }
    } catch (e) {
      console.log('focusOut error:', e);
    }  
  }
};

watchEffect(() => {
  // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));

  if (props.data) {
    // console.log(props.data);
    isFirstSent.value = false;
    eleventhPanelData.value.participants_number = props.data.participants_number;
    eleventhPanelData.value.comment = props.data.comment;
    eleventhPanelData.value.scan_file = props.data.scan_file;
    eleventhPanelData.value.file_size = props.data.file_size;
    eleventhPanelData.value.file_type = props.data.file_type;
    isSent.value = props.data.is_sent;
  }
}, {
  flush: 'post'
});
</script>

<style lang="scss" scoped>
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
</style>
