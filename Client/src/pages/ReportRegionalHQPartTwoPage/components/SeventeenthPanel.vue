<template>
  <div class="form__field-group report__field-group report__field-group--column"
    v-if="isSent && 
          !seventeenthPanelData.scan_file && 
          !seventeenthPanelData.comment">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field-group">
    <a 
      v-if="!isSent && !(props.centralExpert || props.districtExpert)"
      href=""
      download 
      class="report__add-button"
    >
      Скачать шаблон
    </a>

    <div class="report__fieldset report__file-input"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && seventeenthPanelData.scan_file)"
    >
      <label class="form__label report__label" for="scan_file">
        <span v-if="!isSent && !(props.centralExpert || props.districtExpert)">
          Прикрепить документ
        </span>
        <span v-if="isSent && seventeenthPanelData.scan_file">
          Документ
        </span>
      </label>
      <InputReport
        v-if="!seventeenthPanelData.scan_file"
        isFile
        type="file"
        accept=".jpg, .jpeg, .png, .pdf"
        id="scan_file"
        name="scan_file"
        width="100%"
        height="auto"
        @change="uploadFile"
        :disabled="isSent"
      />
      <FileBoxComponent
        v-else
        :file="seventeenthPanelData.scan_file"
        :fileType="seventeenthPanelData.file_type"
        :fileSize="seventeenthPanelData.file_size"
        @click="deleteFile"
        :is-error-file="isErrorFile"
        :is-sent="isSent"
      ></FileBoxComponent>
    </div>
    <div class="report__fieldset report__fieldset--comment"
      v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
            (isSent && seventeenthPanelData.comment)">
      <label class="form__label report__label" for="comment">
        Комментарий
      </label>
      <TextareaReport
        v-model:value="seventeenthPanelData.comment"
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
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { FileBoxComponent } from "@entities/RatingRoComponents/components";
import { reportPartTwoService } from "@services/ReportService.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
  isSent: {
    type: Boolean,
  },
  // isErrorFile: {
  //   type: Boolean,
    // default: false,
  // },
});

const emit = defineEmits(['getData']);

const ID_PANEL = '16';// номер показателя для 2024 - 17, для 2025 - 16
const isFirstSent = ref(true);
let isErrorFile = ref(false);
const seventeenthPanelData = ref({
  scan_file: '',
  file_size: null,
  file_type: '',
  comment: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('comment', seventeenthPanelData.value.comment || '');

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
      emit('getData', data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
      emit('getData', data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

const uploadFile = async (event) => {
  fileValidate(event.target.files[0], 7, isErrorFile);

  seventeenthPanelData.value.file_size = (event.target.files[0].size / Math.pow(1024, 2));
  seventeenthPanelData.value.file_type = event.target.files[0].type.split('/').at(-1);
  
  // console.log('(4)', 'перед отправкой в uploadFile', isErrorFile.value);
  if (isErrorFile.value) {
    seventeenthPanelData.value.scan_file = event.target.files[0].name;
    // console.log('ФАЙЛ НЕ ОТПРАВЛЯЕТСЯ');
  } else {
    let formData = new FormData();
      formData.append('scan_file', event.target.files[0]);

    try {
      if (isFirstSent.value) {
        let { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        emit('getData', data, Number(ID_PANEL));
        seventeenthPanelData.value.scan_file = data.scan_file.split('/').at(-1);
        // console.log('ФАЙЛ ОТПРАВЛЯЕТСЯ ПЕРВЫЙ РАЗ', isErrorFile.value);
      } else {
        let { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        emit('getData', data, Number(ID_PANEL));
        seventeenthPanelData.value.scan_file = data.scan_file.split('/').at(-1);
        // console.log('ФАЙЛ ОТПРАВЛЯЕТСЯ ПОВТОРНО', isErrorFile.value);
      }
    } catch (e) {
      console.log('focusOut error:', e);
    }
  }  
};

const deleteFile = async () => {
  seventeenthPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  // formData.append('comment', seventeenthPanelData.value.comment);

  if (isErrorFile.value) {
    seventeenthPanelData.value.scan_file = "";
  } else {
    try {
      if (isFirstSent.value) {
        let { data :  scan_file  } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        emit('getData', scan_file, Number(ID_PANEL));
      } else {
        let { data :  scan_file  } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
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
    seventeenthPanelData.value.comment = props.data.comment;
    seventeenthPanelData.value.scan_file = props.data.scan_file;
    seventeenthPanelData.value.file_size = props.data.file_size;
    seventeenthPanelData.value.file_type = props.data.file_type;
  }
}, {
  flush: 'post'
});
</script>

<style lang="scss" scoped>
.report {
  &__field-group {
    grid-template-columns: 1fr;

    &--column {
      grid-template-columns: 1fr;
    }
  }
}
</style>
