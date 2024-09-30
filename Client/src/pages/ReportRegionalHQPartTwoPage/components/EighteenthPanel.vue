<template>
  <div class="form__field-group report__field-group report__field-group--column"
    v-if="(props.centralExpert || props.districtExpert) && 
          !eighteenthPanelData.projects && 
          !eighteenthPanelData.comment">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field">
    <div class="report__field" 
      v-if="!(props.centralExpert || props.districtExpert) ||
            (props.districtExpert && eighteenthPanelData.projects) ||
            (props.centralExpert && eighteenthPanelData.projects)">
      <div class="report__field-group" v-for="(project, index) in projects" :key="index">
        <div class="report__fieldset report__file-input"
          v-if="!(props.centralExpert || props.districtExpert) ||
                (props.districtExpert && project.file) ||
                (props.centralExpert && project.file)">
          <label
            class="form__label report__label"
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
            @change="uploadFile($event, index)"
            :disabled="isSent"
          />

          <div 
            v-if="project.file && (typeof project.file !== 'string')"
            class="text-center"
          >
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
          </div>

          <FileBoxComponent
            v-if="project.file && typeof project.file === 'string'"
            :file="project.file"
            :fileType="project.file_type"
            :fileSize="project.file_size"
            @click="deleteFile(index)"
            :is-sent="isSent"
          ></FileBoxComponent>
          <button
            v-if="!isSent && (index > 0)"
            class="report__delete-button"
            @click="deletePublication(index)"
          >
            Удалить публикацию
          </button>
        </div>

        <div class="report__links"
          v-if="!(props.centralExpert || props.districtExpert) ||
                (props.districtExpert && project.links) ||
                (props.centralExpert && project.links)">
          <p
            class="form__label report__label"
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
                  :disabled="isSent"
              />
              <div v-if="isError && (i > 0)" class="report__error-block">
                <span class="report__error-text">Укажите ссылку публикации</span>
              </div>

              <!-- <div class="report__btn-block"> -->
                <button
                  v-if="!isSent && (projects[index].links.length === i + 1)"
                  class="report__btn-link report__btn-link--add-link"
                  @click="addLink(index)"
                >
                  + Добавить ссылку
                </button>

                <button
                  v-if="!isSent && (i > 0)"
                  @click="deleteLink(index, i)"
                  class="report__btn-link report__btn-link--delete-field"
                  aria-label="Удалить поле ввода"
                >
                  <span>Удалить
                    <span>поле ввода</span>
                  </span>
                </button>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="!isSent">
        <button
          class="report__add-button"
          @click="addPublication"
        >
          <SvgIcon icon-name="add-icon" />
          Добавить публикацию
        </button>
      </div>
    </div>

    <div class="report__fieldset report__fieldset--comment"
      v-if="!(props.centralExpert || props.districtExpert) ||
            (props.districtExpert && eighteenthPanelData.comment) ||
            (props.centralExpert && eighteenthPanelData.comment)">
      <label
          class="form__label report__label"
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
        :readonly="isSent"
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
import { SvgIcon } from '@shared/index';

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  isError: {
    type: Boolean,
    default: false,
  },
  data: Object,
  isSent: {
    type: Boolean,
  },
});

let isError = ref(props.isError);

const emit = defineEmits(['getData']);

const ID_PANEL = '18';
const isFirstSent = ref(true);
const eighteenthPanelData = ref({
  comment: '',
  projects: []
});

const projects = ref([
  {
    file: '',
    file_size: null,
    file_type: '',
    links: [
      {
        link: '',
      },
    ],
  }
])

const uploadFile = async (event, index) => {
  projects.value[index].file = event.target.files[0];

  // console.log('файл - ', projects.value[index].file, 
  // 'тип данных - ', typeof(projects.value[index].file),
  // 'имя - ', projects.value[index].file.name, 
  // 'размер -', projects.value[index].file.size, 
  // 'тип -', projects.value[index].file.type);

  let formData = new FormData();
  formData.append('comment', eighteenthPanelData.value.comment);

  formData.append(`projects[${index}][file]`, projects.value[index].file);

  if (projects.value.length) {
    for (let index = 0; index < projects.value.length; index++) {
      if (projects.value[index].links.length) {
        for (let i = 0; i < projects.value[index].links.length; i++) {
          !projects.value[index].links[i].link 
          ? formData.append(`projects[${index}][links][${i}][link]`, '')
          : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
        }
      }
    }
  }

  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(eighteenthPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    } else {
      const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
      emit('getData', data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

const deleteFile = async (index) => {
  // projects.value[index].file = '';
  let formData = new FormData();
  formData.append('comment', eighteenthPanelData.value.comment);

  formData.append(`projects[${index}][file]`, '');

  if (projects.value.length) {
    for (let index = 0; index < projects.value.length; index++) {
      console.log('этот код выполняется');
      if (projects.value[index].links.length) {
        for (let i = 0; i < projects.value[index].links.length; i++) {
          !projects.value[index].links[i].link 
          ? formData.append(`projects[${index}][links][${i}][link]`, '')
          : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
        }
      }
    }
  }

  const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  emit('getData', data, Number(ID_PANEL));
};

const addLink = (index) => {
  projects.value[index].links.push({ link: '' })
};

const deleteLink = async (projectIndex, linkIndex) => {
  projects.value[projectIndex].links.splice(linkIndex, 1);

  let formData = new FormData();
  formData.append('comment', eighteenthPanelData.value.comment);

  if (projects.value.length) {
    for (let index = 0; index < projects.value.length; index++) {
      if (projects.value[index].links.length) {
        for (let i = 0; i < projects.value[index].links.length; i++) {
          !projects.value[index].links[i].link 
          ? formData.append(`projects[${index}][links][${i}][link]`, '')
          : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
        }
      }
    }
  }

  const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  emit('getData', data, Number(ID_PANEL));
};

const addPublication = () => {
  projects.value.push({
    file: '',
    file_size: null,
    file_type: '',
    links: [
      {
        link: '',
      },
    ],
  })
};

const focusOut = async () => { 
  // console.log(eighteenthPanelData.value.comment);
  eighteenthPanelData.value.projects = [ ...projects.value ];
  // console.log(eighteenthPanelData.value.projects);
  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(eighteenthPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    } else {
      let formData = new FormData();
      formData.append('comment', eighteenthPanelData.value.comment);

      if (projects.value.length) {
        for (let index = 0; index < projects.value.length; index++) {
          if (projects.value[index].links.length) {
            // const links = [...projects.value[index].links];
            for (let i = 0; i < projects.value[index].links.length; i++) {
              !projects.value[index].links[i].link 
              ? formData.append(`projects[${index}][links][${i}][link]`, '')
              : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
              // if (projects.value[index].links[i].link && projects.value[index].links[i].link !== '') {
              //   formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
              // }
            }
          }
        }
      }

      const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
      emit('getData', data, Number(ID_PANEL));
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};

const deletePublication = async (index) => {
  projects.value = projects.value.filter((el, i) => index !== i);

  let formData = new FormData();
  formData.append('comment', eighteenthPanelData.value.comment);

  if (projects.value.length) {
    for (let index = 0; index < projects.value.length; index++) {
      if (projects.value[index].links.length) {
        for (let i = 0; i < projects.value[index].links.length; i++) {
          !projects.value[index].links[i].link 
          ? formData.append(`projects[${index}][links][${i}][link]`, '')
          : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
        }
      }
    }
  }

  const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  emit('getData', data, Number(ID_PANEL));
};

watchEffect(async () => {
  // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));
  console.log(props.data);
  if (props.data) {
    isFirstSent.value = false;
    projects.value = [...props.data.projects];
    eighteenthPanelData.value.comment = props.data.comment;
    // if (!projects.value[0].links.length) projects.value[0].links.push({link: ''});
  }
}, {
  flush: 'post'
});
</script>

<style lang="scss" scoped>
.form__label {
  display: block;
}
.report {
  &__field-group {
    grid-template-columns: 1fr;
    position: relative;

    &--column {
      grid-template-columns: 1fr;
    }

    @media (max-width: 360px) {
      padding: 0;
    }
  }

  &__delete-button {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>