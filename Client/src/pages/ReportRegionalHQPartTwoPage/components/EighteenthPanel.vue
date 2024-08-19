<template>
  <div class="form__field-group report__field-group">
    <div v-for="(publication, index) in publications" :key="index">
      <div>
        <label
          class="form__label"
          for="4"
        >Прикрепить документ</label>
        <InputReport
          v-if="!eighteenthPanelData.scan_file"
          isFile
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
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
            <!-- <SvgIcon v-if="seventeenthPanelData.file_type === 'jpg'" icon-name="group-light" />
            <SvgIcon v-if="seventeenthPanelData.file_type === 'pdf'" icon-name="group-light" />
            <SvgIcon v-if="seventeenthPanelData.file_type === 'png'" icon-name="group-light" /> -->
            {{ eighteenthPanelData.scan_file }}
          </span>
          <!-- <span class="form__file-size">{{ seventeenthPanelData.file_size }} Мб</span> -->
          <button 
            @click="deleteFile"
            class="form__button-delete-file"
          >
            Удалить
          </button>
        </div>
        <Button
          v-if="index > 0"
          label="Удалить публикацию"
          style="margin: 0;"
          @click="deletePublication(index)"
        />
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between">
        <div style="display: flex; flex-wrap: wrap;" v-for="(link, i) in publications[index].links" :key="i">
          <label
              class="form__label"
              for="9"
              style="width: 100%;"
          >Ссылка на&nbsp;публикацию</label>
          <InputReport
              :id="i"
              :name="i"
              class="form__input"
              type="text"
              placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
              style="width: 100%"
              @focusout="focusOut"
          />
          <Button
            v-if="i > 0"
            label="Удалить ссылку"
            style="margin: 0;"
            @click="deleteLink(i)"
          />
        </div>
        <div>
            <Button
                label="+ Добавить ссылку"
                @click="addLink(index)"
            />
          </div>
        
      </div>
    </div>
    
    <div>
      <Button
          style="margin: 0;"
          label="Добавить публикацию"
          @click="addPublication"
      />
    </div>
    <div>
      <label
          class="form__label"
          for="comment"
      >Комментарий</label>
      <TextareaReport
        v-model:value="eighteenthPanelData.comment"
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
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";

const ID_PANEL = '18';
const isFirstSent = ref(true);
const scanFile = ref([]);
const eighteenthPanelData = ref({
  comment: '',
  publications: []
});

const publications = ref([
  {
    scan_file: '',
    // file_size: null,
    // file_type: '',
    links: [
      {
        link: '',
      },
    ],
  }
])

const uploadFile = async (event) => {
  scanFile.value = event.target.files[0];
  let formData = new FormData();
  formData.append('scan_file', scanFile.value);
  formData.append('comment', eighteenthPanelData.value.comment);
  // formData.append('file_size', seventeenthPanelData.value.file_size);
  // formData.append('file_type', seventeenthPanelData.value.file_type);
  // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
  // formData.append('file_type', scanFile.value.type);

  console.log(scanFile.value);

  if (isFirstSent.value) {
    let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
    eighteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  } else {
    let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    eighteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  }
};

const deleteFile = async () => {
  eighteenthPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('scan_file', '');
  formData.append('comment', eighteenthPanelData.value.comment);
  // formData.append('file_size', seventeenthPanelData.value.file_size);
  // formData.append('file_type', seventeenthPanelData.value.file_type);

  console.log(formData);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

const addLink = (index) => {
  publications.value[index].links.push({ link: '' })
};

const deleteLink = async (index) => {
  publications.value[index].links.filter((el, i) => index !== i);
  eighteenthPanelData.value.publications = [ ...publications.value ];
  try {
    await reportPartTwoService.createReportDraft(eighteenthPanelData.value, ID_PANEL, true);
  } catch (e) {
    console.log('deletePublication error: ', e);
  }
};

const addPublication = () => {
  publications.value.push({
    scan_file: '',
    // file_size: null,
    // file_type: '',
    links: [
      {
        link: '',
      },
    ],
  })
};

const focusOut = async () => {
  // let formData = new FormData();
  // formData.append('comment', eighteenthPanelData.value.comment);
  // formData.append('file_size', seventeenthPanelData.value.file_size);
  // formData.append('file_type', seventeenthPanelData.value.file_type);

  eighteenthPanelData.value.publications = [ ...publications.value ];
  try {
    if (isFirstSent.value) {
    await reportPartTwoService.createReport(eighteenthPanelData.value, ID_PANEL, true);
    } else {
      await reportPartTwoService.createReportDraft(eighteenthPanelData.value, ID_PANEL, true);
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

const deletePublication = async (index) => {
  publications.value = publications.value.filter((el, i) => index !== i);
  eighteenthPanelData.value.publications = [ ...publications.value ];
  try {
    await reportPartTwoService.createReportDraft(eighteenthPanelData.value, ID_PANEL, true);
  } catch (e) {
    console.log('deletePublication error: ', e);
  }
};

watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport(ID_PANEL);
    if (data.length) {
      isFirstSent.value = false;
      publications.value = [...data[0].publications];
      eighteenthPanelData.value.comment = data[0].comment;
    }
  } catch (e) {
    console.log(e);
  }
});

</script>

<style lang="scss" scoped>
</style>