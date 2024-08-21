<template>
  <div class="form__field-group report__field-group">
    <div class="report__fieldset">
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
        height="86px"
        @change="uploadFile"
      />
      
      <div 
        v-else
        class="report__file-box">
        <span class="report__file-name">
          <SvgIcon v-if="seventeenthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
          <SvgIcon v-if="seventeenthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
          <SvgIcon v-if="seventeenthPanelData.file_type === 'png'" icon-name="file-png" />
          {{ seventeenthPanelData.scan_file }}
        </span>

        <span class="report__file-size">{{ seventeenthPanelData.file_size }} Мб</span>
        <button 
          @click="deleteFile"
          class="report__button-delete-file"
        >
          Удалить
        </button>
      </div>
    </div>
    <div class="report__fieldset report__fieldset--comment">
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
      >
      </TextareaReport>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';

const ID_PANEL = '17';
const isFirstSent = ref(true);
const scanFile = ref([]);
const seventeenthPanelData = ref({
  scan_file: '',
  file_size: null,
  file_type: '',
  comment: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('comment', seventeenthPanelData.value.comment);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

// const fileType = ref(null);
// const fileSize = ref(null);

// watchEffect(() => scanFile.value ? fileSize.value = (scanFile.value.size/( 1024 * 1024 )).toFixed(1) : 0)

// watchEffect(() => scanFile.value ? fileType.value = scanFile.value.type : 0)

const uploadFile = async (event) => {
  scanFile.value = event.target.files[0];
  let formData = new FormData();
  formData.append('scan_file', scanFile.value);
  formData.append('comment', seventeenthPanelData.value.comment);
  // formData.append('file_size', seventeenthPanelData.value.file_size);
  // formData.append('file_type', seventeenthPanelData.value.file_type);
  // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
  // formData.append('file_type', scanFile.value.type);

  console.log(scanFile.value);

  if (isFirstSent.value) {
    let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
    seventeenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  } else {
    let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    seventeenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  }
};

const deleteFile = async () => {
  seventeenthPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  formData.append('comment', seventeenthPanelData.value.comment);
  formData.append('file_size', seventeenthPanelData.value.file_size);
  formData.append('file_type', seventeenthPanelData.value.file_type);

  console.log(formData);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport(ID_PANEL);
    console.log(data);
    if (data) {
      isFirstSent.value = false;
      seventeenthPanelData.value.comment = data.comment;
      seventeenthPanelData.value.scan_file = data.scan_file.split('/').at(-1)
      seventeenthPanelData.value.file_size = data.file_size;
      seventeenthPanelData.value.file_type = data.file_type;
    }
  } catch (e) {
    console.log(e)
  }
});
</script>

<style lang="scss" scoped>
.report {
  &__field-group {
    grid-template-columns: 1fr;
  }
}
</style>
