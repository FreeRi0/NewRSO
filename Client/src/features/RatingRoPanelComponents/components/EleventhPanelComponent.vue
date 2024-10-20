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
        :min="0"
        :max="2147483647"
        @focusout="focusOut"
        :disabled="isSent || (props.centralExpert || props.districtExpert)"
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
        :disabled="isSent || (props.centralExpert || props.districtExpert)"
        :is-error-panel="isErrorPanel"
      />
      <FileBoxComponent
        v-else
        :file="eleventhPanelData.scan_file"
        :fileType="eleventhPanelData.file_type"
        :fileSize="eleventhPanelData.file_size"
        @click="deleteFile"
        :is-sent="isSent || (props.centralExpert || props.districtExpert)"
        :is-error-file="isErrorFile"
      ></FileBoxComponent>
    </div>

    <div
      class="report__fieldset report__fieldset--comment"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && eleventhPanelData.comment) ||
            ((props.centralExpert || props.districtExpert) && eleventhPanelData.comment)"
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
        :disabled="isSent || (props.centralExpert || props.districtExpert)"
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
        v-model:value="eleventhPanelDataDH.participants_number"
        id="participants_number"
        name="participants_number"
        style="width: 100%"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :min="0"
        :max="2147483647"
        :disabled="centralExpert"
        :is-error-panel="isErrorPanel"
      />
    </div>

    <CommentFileComponent
      v-model:value="eleventhPanelDataDH.comment"
      name="eleventhPanelData.comment"
      @change="uploadFileDH"
      @click="deleteFileDH"
      :file="reportStore.reportDataDHFile.eleventh ? reportStore.reportDataDHFile.eleventh.name : null"
      :fileType="reportStore.reportDataDHFile.eleventh ? reportStore.reportDataDHFile.eleventh.type.split('/').at(-1) : null"
      :fileSize="reportStore.reportDataDHFile.eleventh ? reportStore.reportDataDHFile.eleventh.size / Math.pow(1024, 2) : null"
      :disabled="centralExpert"
      :is-error-file="isErrorFile"
      :is-error-panel="isErrorPanel"
    ></CommentFileComponent>
  </div>

  <div
    v-if="isThirdTab && centralExpert"
    class="report__field-group report__field-group--column"
  >
    <ReportTable
      label="Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;"
      name="eleventhPanelData.participants_number"
      :dataRH="eleventhPanelData.participants_number"
      :dataDH="eleventhPanelDataDH.participants_number"
      v-model:value="eleventhPanelDataCH.participants_number"
    ></ReportTable>

    <CommentFileComponent></CommentFileComponent>

    <div>
      <v-checkbox label="Вернуть в&nbsp;РО на&nbsp;доработку" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watchPostEffect, watch } from "vue";
import { InputReport, TextareaReport } from "@shared/components/inputs";
import {
  CommentFileComponent,
  FileBoxComponent,
  ReportTable,
} from "@entities/RatingRoComponents/components";
import { reportPartTwoService } from "@services/ReportService.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import {useReportPartTwoStore} from "@pages/ReportRegionalHQPartTwoPage/store.ts";

const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean,
  },
  centralExpert: {
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
  // dataDH: Object,
  // dataCH: Object,
  isErrorPanel: {
    type: Boolean,
  },
});

const ID_PANEL = "11";
const isFirstSent = ref(true);
let isErrorFile = ref(false);
// let fileName = ref(null);
const eleventhPanelData = ref({
  participants_number: null,
  scan_file: "",
  file_size: null,
  file_type: "",
  comment: "",
});

const eleventhPanelDataDH = ref({
  participants_number: null,
  scan_file: "",
  file_size: null,
  file_type: "",
  comment: "",
});

const eleventhPanelDataCH = ref({
  participants_number: null,
  scan_file: "",
  file_size: null,
  file_type: "",
  comment: "",
});

const isSent = ref(false);
//const isVerifiedDH = ref(false);

const emit = defineEmits([
  'getData', 
  'getDataDH', 
  'getDataCH', 
  // 'getFileDH'
]);

const focusOut = async () => {
  // if (!(props.districtExpert || props.centralExpert)) {
    let formData = new FormData();

    eleventhPanelData.value.participants_number ? formData.append("participants_number", eleventhPanelData.value.participants_number) : formData.append("participants_number", "");
    formData.append("comment", eleventhPanelData.value.comment || '');

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
  // }
  
  // if (props.districtExpert) {
  //   emit('getDataDH', eleventhPanelDataDH.value, Number(ID_PANEL));
  // }
};

const uploadFile = async (event) => {
  fileValidate(event.target.files[0], 7, isErrorFile);
  
  eleventhPanelData.value.scan_file = event.target.files[0].name;
  eleventhPanelData.value.file_size = (event.target.files[0].size / Math.pow(1024, 2));
  eleventhPanelData.value.file_type = event.target.files[0].type.split('/').at(-1);

  if(!isErrorFile.value) {
    let formData = new FormData();
    formData.append("scan_file", event.target.files[0]);

    try {
      if (isFirstSent.value) {
        let { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        eleventhPanelData.value.scan_file = data.scan_file.split('/').at(-1);
        emit('getData', data, Number(ID_PANEL));
      } else {
        let { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        eleventhPanelData.value.scan_file = data.scan_file.split('/').at(-1);
        emit('getData', data, Number(ID_PANEL));
      }
    } catch (e) {
      console.log('uploadFile error:', e);
    }
  }
};

const uploadFileDH = async (event) => {
  eleventhPanelDataDH.value.scan_file = event.target.files[0];

  // fileValidate(event.target.files[0], 7, isErrorFile);

  // if (!isErrorFile.value) {
    reportStore.reportDataDHFile.eleventh = event.target.files[0];
  // }
}

const deleteFile = async () => {
  eleventhPanelData.value.scan_file = '';

  if(!isErrorFile.value) {
    let formData = new FormData();
    formData.append("scan_file", "");

    try {
      if (isFirstSent.value) {
        let { data : scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        emit('getData', scan_file, Number(ID_PANEL));
      } else {
        let { data : scan_file } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        emit('getData', scan_file, Number(ID_PANEL));
      }
    } catch (e) {
      console.log('deleteFile error:', e);
    }  
  }
};

const deleteFileDH = async () => {
  eleventhPanelDataDH.value.scan_file = '';
  
  // if (!isErrorFile.value) {
    reportStore.reportDataDHFile.eleventh = null;
  // }
}

watchEffect(() => {
  if (props.districtExpert) {
    if (reportStore.reportDataDH.eleventh) {
      eleventhPanelDataDH.value.comment = reportStore.reportDataDH.eleventh.comment;
      eleventhPanelDataDH.value.participants_number = reportStore.reportDataDH.eleventh.participants_number;
    }

  } else {
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
  }
}, {
  flush: 'post'
});

watchPostEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    eleventhPanelData.value.participants_number = props.data.participants_number;
    eleventhPanelData.value.comment = props.data.comment;
    eleventhPanelData.value.scan_file = props.data.scan_file;
    eleventhPanelData.value.file_size = props.data.file_size;
    eleventhPanelData.value.file_type = props.data.file_type;
    isSent.value = props.data.is_sent;
  }
});

watch(eleventhPanelDataDH.value, () => {
  reportStore.reportDataDH.eleventh = eleventhPanelDataDH.value;

  let formData = new FormData();

  eleventhPanelDataDH.value.participants_number 
  ? formData.append('participants_number', eleventhPanelDataDH.value.participants_number) 
  : formData.append('participants_number', '');

  formData.append('comment', eleventhPanelDataDH.value.comment || '');

  reportStore.reportDataDHFile.eleventh 
  ? formData.append('scan_file', reportStore.reportDataDHFile.eleventh) 
  : formData.append('scan_file', '');

  emit('getDataDH', formData, Number(ID_PANEL));
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
