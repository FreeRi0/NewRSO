<template>
  <div class="form__field-group report__item">
    <div class="report__add-file">
      <label class="form__label" for="scan_file">
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
        id="scan_file"
        name="scan_file"
        width="720px"
        height="86px"
        @change="uploadFile"
      />
      
      <div 
        v-else
        class="form__file-box">
        <span class="form__file-name">
          <SvgIcon v-if="seventeenthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
          <SvgIcon v-if="seventeenthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
          <SvgIcon v-if="seventeenthPanelData.file_type === 'png'" icon-name="file-png" />
          {{ seventeenthPanelData.scan_file }}
        </span>

        <span class="form__file-size">{{ seventeenthPanelData.file_size }} Мб</span>
        <button 
          @click="deleteFile"
          class="form__button-delete-file"
        >
          Удалить
        </button>
      </div>
    </div>
    <div class="report__add-comment">
      <label class="form__label" for="comment">
        Комментарий
      </label>
      <!-- <InputReport
          v-model:value="seventeenthPanelData.comment"
          id="comment"
          name="comment"
          class="form__input"
          type="textarea"
          placeholder="Напишите сообщение"
          style="width: 100%;"
          :maxlength="3000"
          counter-visible
          :max-counter="3000"
          @focusout="focusOut"
      /> -->
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
    if (data.length) {
      isFirstSent.value = false;
      seventeenthPanelData.value.comment = data[1].comment;
      seventeenthPanelData.value.scan_file = data[1].scan_file.split('/').at(-1)
      seventeenthPanelData.value.file_size = data[1].file_size;
      seventeenthPanelData.value.file_type = data[1].file_type;
    }
  } catch (e) {
    console.log(e)
  }
});
</script>

<style lang="scss" scoped>
.form__field-group {
  padding: 40px 40px 42px;
  background: #F3F4F5;
  border: none;
  border-radius: 10px;
  margin-bottom: 8px;
}

.form__label {
  display: block;
  line-height: 21px;
  color: #000000;
  margin-bottom: 8px;
}

.report__add-file,
.report__add-comment {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
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
  // min-width: 220px;
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.form__file-size {
  width: 50px;
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
</style>
