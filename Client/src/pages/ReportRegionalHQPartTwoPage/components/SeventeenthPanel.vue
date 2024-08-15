<template>
  <div class="form__field-group report__item">
    <div class="report__add-file">
      <label class="form__label" for="scan_file">
        Прикрепить документ
      </label>

      <InputReport v-if="!seventeenthPanelData.scan_file" isFile type="file" id="scan_file" name="scan_file"
        width="720px" height="86px" @change="uploadFile" />

      <div v-else class="form__file-box">
        <span class="form__file-name">
          <!-- <SvgIcon v-if="fileType === 'image/jpeg'" icon-name="group-light" />
          <SvgIcon v-if="fileType === 'application/pdf'" icon-name="group-light" />
          <SvgIcon v-if="fileType === 'image/png'" icon-name="group-light" /> -->
          {{ seventeenthPanelData.scan_file }}
        </span>
        <span class="form__file-size">{{ fileSize }} Мб</span>
        <button @click="deleteFile" class="form__button-delete-file">
          Удалить
        </button>
      </div>
    </div>
    <div class="report__add-comment">
      <label class="form__label" for="comment">
        Комментарий
      </label>
      <InputReport v-model:value="seventeenthPanelData.comment" id="comment" name="comment" class="form__input"
        type="textarea" placeholder="Напишите сообщение" style="width: 100%;" :maxlength="3000" counter-visible
        :max-counter="3000" @focusout="focusOut" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport } from '@shared/components/inputs';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';

const isFirstSent = ref(true);
const scanFile = ref([]);
const seventeenthPanelData = ref({
  scan_file: '',
  comment: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('comment', seventeenthPanelData.value.comment);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, '17', true);
  } else {
    await reportPartTwoService.createReportDraft(formData, '17', true);
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

  console.log(scanFile.value);

  if (isFirstSent.value) {
    let { scan_file } = await reportPartTwoService.createReport(formData, '17', true);
    seventeenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  } else {
    let { data: { scan_file } } = await reportPartTwoService.createReportDraft(formData, '17', true);
    seventeenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  }
};

const deleteFile = async () => {
  seventeenthPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  formData.append('comment', seventeenthPanelData.value.comment);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, '17', true);
  } else {
    await reportPartTwoService.createReportDraft(formData, '17', true);
  }
};

watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport('17');
    if (data.length) {
      isFirstSent.value = false;
      seventeenthPanelData.value.scan_file = data[0].scan_file.split('/').at(-1);
      seventeenthPanelData.value.comment = data[0].comment;
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
</style>
