<template>
  <div class="form__field-group report__field-group report__field-group--column"
    v-if="(props.centralExpert || props.districtExpert) && 
          !seventeenthPanelData.scan_file && 
          !seventeenthPanelData.comment">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field-group">
    <div class="report__fieldset report__file-input"
      v-if="!(props.centralExpert || props.districtExpert) ||
            (props.districtExpert && seventeenthPanelData.scan_file) ||
            (props.centralExpert && seventeenthPanelData.scan_file)"
    >
      <label class="form__label report__label" for="scan_file">
        Прикрепить документ
      </label>
        <!-- скорректировать размер файла
      <FileUpload
        v-if="!seventeenthPanelData.scan_file"
        mode="advanced"
        name="demo[]"
        accept=".pdf, .jpeg, .jpg, .png"
        :maxFileSize="3000000"
        invalidFileSizeMessage="Превышен размер загружаемого файла"
        @select="uploadFile"
        @change="uploadFile"
        chooseLabel="Выбрать файл"
      ></FileUpload>
      -->
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
      />

      <FileBoxComponent
        v-else
        :file="seventeenthPanelData.scan_file"
        :fileType="seventeenthPanelData.file_type"
        :fileSize="seventeenthPanelData.file_size"
        @click="deleteFile"
        :is-error-file="isErrorFile"
        is-error-message="Прикрепите файл формата jpg, png, pdf не более 7 Мб"
      ></FileBoxComponent>
    </div>
    <div class="report__fieldset report__fieldset--comment"
      v-if="!(props.centralExpert || props.districtExpert) ||
            (props.districtExpert && seventeenthPanelData.comment) ||
            (props.centralExpert && seventeenthPanelData.comment)">
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
        :disabled="props.centralExpert || props.districtExpert"
      >
      </TextareaReport>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { FileBoxComponent } from "@entities/RatingRoComponents/components";
import { getReport, reportPartTwoService } from "@services/ReportService.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  // reportId: {
  //   type: String,
  //   default: '1',
  // },
  data: Object,
});

const emit = defineEmits(['getData']);

const ID_PANEL = '17';
const isFirstSent = ref(true);
const scanFile = ref([]);
let isErrorFile = ref(false);
const MAX_SIZE_FILE = 7;
const seventeenthPanelData = ref({
  scan_file: '',
  file_size: null,
  file_type: '',
  comment: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('comment', seventeenthPanelData.value.comment);

  // if (isFirstSent.value) {
  //   await reportPartTwoService.createReport(formData, ID_PANEL, true);
  // } else {
  //   await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  // }

  try {
    if (isFirstSent.value) {
      await reportPartTwoService.createReport(formData, ID_PANEL, true);
    } else {
      const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
      emit('getData', data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

const uploadFile = async (event) => {
  scanFile.value = event.target.files[0];
  let formData = new FormData();
  // formData.append('comment', seventeenthPanelData.value.comment);

  formData.append('scan_file', scanFile.value);
  seventeenthPanelData.value.file_size = (scanFile.value.size / Math.pow(1024, 2));
  seventeenthPanelData.value.file_type = scanFile.value.type.split('/').at(-1);

  try {
    if (isFirstSent.value) {
      let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
      seventeenthPanelData.value.scan_file = scan_file;
    } else {
      // let { data :  scan_file  } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
      // seventeenthPanelData.value.scan_file = scan_file;
      // emit('getData', scan_file, Number(ID_PANEL));
      if ((scanFile.value.size / Math.pow(1024, 2)) > MAX_SIZE_FILE) {
        isErrorFile.value = true;
        seventeenthPanelData.value.scan_file = scanFile.value.name;
        console.log('ФАЙЛ НЕ ОТПРАВЛЯЕТСЯ', isErrorFile.value, scanFile.value.size / Math.pow(1024, 2), MAX_SIZE_FILE);
      } else {
        isErrorFile.value = false;
        let {  data: scan_file  } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        seventeenthPanelData.value.scan_file = scan_file;
        emit('getData', scan_file, Number(ID_PANEL));
        console.log('ФАЙЛ ОТПРАВЛЯЕТСЯ', isErrorFile.value);
      }
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

const deleteFile = async () => {
  seventeenthPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  // formData.append('comment', seventeenthPanelData.value.comment);
  formData.append('file_size', seventeenthPanelData.value.file_size);
  formData.append('file_type', seventeenthPanelData.value.file_type);

  // if (isFirstSent.value) {
  //   await reportPartTwoService.createReport(formData, ID_PANEL, true);
  // } else {
  //   await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  // }

  try {
    if (isFirstSent.value) {
      await reportPartTwoService.createReport(formData, ID_PANEL, true);
    } else {
      // let { data :  scan_file  } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
      // emit('getData', scan_file, Number(ID_PANEL));
      if (isErrorFile.value) {
        isErrorFile.value = false;
      } else {
        let { data :  scan_file  } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        emit('getData', scan_file, Number(ID_PANEL));
      }
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};


watchEffect(() => {
  // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));

  if (Object.keys(props.data).length > 0) {
    console.log(props.data);
    isFirstSent.value = false;
    seventeenthPanelData.value.comment = props.data.comment;
    seventeenthPanelData.value.scan_file = props.data.scan_file;
    seventeenthPanelData.value.file_size = props.data.file_size;
    seventeenthPanelData.value.file_type = props.data.file_type;
  } else {
    console.log('отчет по показателю еще не создан', seventeenthPanelData.value);
    isFirstSent.value = true;
  }
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
