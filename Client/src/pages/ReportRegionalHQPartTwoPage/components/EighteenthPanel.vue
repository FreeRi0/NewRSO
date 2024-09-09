<template>
  <div v-if="!(props.centralHeadquarterCommander || props.districtHeadquarterCommander)" class="form__field-group">
    <div class="report__field">
      <div class="report__field-group" v-for="(project, index) in projects" :key="index">
        <div class="report__fieldset">
          <label
            class="form__label"
            :for="project.file"
          >Прикрепить документ</label>
          <InputReport
            v-if="!project.file"
            isFile
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            v-model:value="project.file"
            :id="project.file"
            :name="index"
            width="100%"
            height="86px"
            @change="uploadFile"
          />
          <div 
            v-else
            class="form__file-box">
            <span class="form__file-name">
              <SvgIcon v-if="project.file_type === 'jpg'" icon-name="group-light" />
              <SvgIcon v-if="project.file_type === 'pdf'" icon-name="group-light" />
              <SvgIcon v-if="project.file_type === 'png'" icon-name="group-light" />
              {{ project.file }}
            </span>
            <span class="form__file-size">{{ project.file_size }} Мб</span>
            <button 
              @click="deleteFile"
              class="form__button-delete-file"
            >
              Удалить
            </button>
          </div>
          <button
            v-if="index > 0"
            class="report__delete-button"
            @click="deletePublication(index)"
          >
            Удалить публикацию
          </button>
        </div>

        <div class="report__links">
          <p
            class="form__label"
            >Ссылка на&nbsp;публикацию
          </p>
          <div class="report__link-list">
            <div class="report__link-item"
              v-for="(link, i) in projects[index].links" :key="i">
              <InputReport
                  v-model:value="link.link" :id="i" :name="i"
                  type="text"
                  placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                  style="width: 100%;"
                  @focusout="focusOut"
              />
              <button
                v-if="i > 0"
                @click="deleteLink(index, i)"
                class="report__btn-link report__btn-link--delete-field"
              >
              Удалить поле ввода
              </button>
            </div>

            <button
              class="report__btn-link report__btn-link--add-link"
              @click="addLink(index)"
            >
              + Добавить ссылку
            </button>
            
            
          </div>
        </div>
      </div>
      
      <div >
        <button
          class="report__add-button"
          @click="addPublication"
        >
          <SvgIcon icon-name="add-icon" />
          Добавить публикацию
        </button>
      </div>

      <div class="report__fieldset report__fieldset--comment">
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
  </div>

  <div v-else></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
// import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';

const props = defineProps({
  districtHeadquarterCommander: {
    type: Boolean
  },
  centralHeadquarterCommander: {
    type: Boolean
  },
});

const ID_PANEL = '18';
const isFirstSent = ref(true);
// const scanFile = ref([]);
const eighteenthPanelData = ref({
  comment: '',
  projects: []
});

const projects = ref([
  {
    file: '',
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
  // scanFile.value = event.target.files[0];
  // let formData = new FormData();
  // formData.append('file', scanFile.value);
  // // formData.append('comment', eighteenthPanelData.value.comment);
  // formData.append('file_size', eighteenthPanelData.value.projects[1].file_size);
  // formData.append('file_type', eighteenthPanelData.value.projects[1].file_type);
  // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
  // formData.append('file_type', scanFile.value.type);

  // console.log(scanFile.value);

  // if (isFirstSent.value) {
  //   let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
  //   eighteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  // } else {
  //   let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  //   eighteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  // }
};

const deleteFile = async () => {
  // eighteenthPanelData.value.scan_file = '';
  // let formData = new FormData();
  // formData.append('scan_file', '');
  // formData.append('comment', eighteenthPanelData.value.comment);
  // formData.append('file_size', seventeenthPanelData.value.file_size);
  // formData.append('file_type', seventeenthPanelData.value.file_type);

  // console.log(formData);

  // if (isFirstSent.value) {
  //   await reportPartTwoService.createReport(formData, ID_PANEL, true);
  // } else {
  //   await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  // }
};

const addLink = (index) => {
  projects.value[index].links.push({ link: '' })
};

const deleteLink = async (projectIndex, linkIndex) => {
  projects.value[projectIndex].links.splice(linkIndex, 1);
  eighteenthPanelData.value.projects = [ ...projects.value ];
  try {
    await reportPartTwoService.createReportDraft(eighteenthPanelData.value, ID_PANEL);
  } catch (e) {
    console.log('deletePublication error: ', e);
  }
};

const addPublication = () => {
  projects.value.push({
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

  eighteenthPanelData.value.projects = [ ...projects.value ];
  console.log(eighteenthPanelData.value.projects);
  try {
    if (isFirstSent.value) {
    await reportPartTwoService.createReport(eighteenthPanelData.value, ID_PANEL);
    } else {
      await reportPartTwoService.createReportDraft(eighteenthPanelData.value, ID_PANEL);
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

const deletePublication = async (index) => {
  projects.value = projects.value.filter((el, i) => index !== i);
  eighteenthPanelData.value.projects = [ ...projects.value ];
  try {
    await reportPartTwoService.createReportDraft(eighteenthPanelData.value, ID_PANEL);
  } catch (e) {
    console.log('deletePublication error: ', e);
  }
};

watchEffect(async () => {
  console.log('regionalHeadquarterCommander: ', !(props.districtHeadquarterCommander || props.centralHeadquarterCommander));
  try {
    const { data } = props.centralHeadquarterCommander || props.districtHeadquarterCommander ? await reportPartTwoService.getReportDH(ID_PANEL) : await reportPartTwoService.getReport(ID_PANEL);
    console.log(data);
    if (data) {
      isFirstSent.value = false;
      projects.value = [...data.projects];
      eighteenthPanelData.value.comment = data.comment;
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style lang="scss" scoped>
.form__label {
  display: block;
}
.report {
  &__field-group {
    grid-template-columns: 1fr;
    // margin-bottom: 0;

    // @media (max-width: 768px) {
    //   grid-template-columns: 1fr;
    // }
  }

  &__fieldset {
    position: relative;
  }

  &__btn-link {
    &--add-link {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    &--delete-field {
      margin: 0;
      // margin-left: auto;
      margin-left: 40px;
    }
  }

  &__delete-button {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>