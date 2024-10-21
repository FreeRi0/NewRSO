<template>
  <div class="form__field-group report__field-group report__field-group--column" v-if="isSent
    && (!projects || (projects && !isLink && !isFile))
    && !eighteenthPanelData.comment">
    <p class="report__text-info">
      Информация о&nbsp;показателе региональным отделением не&nbsp;предоставлена.
    </p>
  </div>

  <div v-else class="form__field-group report__field">
    <div class="report__field" v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
      (isSent && projects)">
      <div class="report__field-group" v-for="(project, index) in projects" :key="index">
        <div class="report__fieldset report__file-input" v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
          (isSent && project.file)">
          <label class="form__label report__label" :for="project.file">
            <span v-if="!isSent && !(props.centralExpert || props.districtExpert)">
              Прикрепить документ
            </span>
            <span v-if="isSent && project.file">
              Документ
            </span>
          </label>
          <InputReport v-if="!project.file" isFile type="file" accept=".jpg, .jpeg, .png, .pdf"
            v-model:value="project.file" :id="project.file" :name="index" width="100%" height="86px"
            @change="uploadFile($event, index)" :disabled="isSent" />

          <div v-if="project.file && (typeof project.file !== 'string')" class="text-center">
            <v-progress-circular color="primary" indeterminate></v-progress-circular>
          </div>
          <FileBoxComponent v-if="project.file && typeof project.file === 'string'" :file="project.file"
            :fileType="project.file_type" :fileSize="project.file_size" @click="deleteFile(index)" :is-sent="isSent"
            :is-error-file="isErrorsFiles[index]"></FileBoxComponent>
          <button v-if="!isSent && (index > 0)" class="report__delete-button" @click="deletePublication(index)">
            Удалить публикацию
          </button>
        </div>
        <div class="report__links" v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
          (isSent && projects[index].links.some((item) => item.link))">
          <p class="form__label report__label">Ссылка на&nbsp;публикацию
          </p>
          <div class="report__link-list">
            <div class="report__link-item" v-for="(link, i) in projects[index].links" :key="i">
              <InputReport v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
                (isSent && link.link)" v-model:value="link.link" :id="i" :name="i" type="text"
                placeholder="Введите ссылку, например, https://vk.com/cco_monolit" style="width: 100%;"
                :max-length="200" @focusout="focusOut" @error="setError" :disabled="isSent" is-link />
              <div v-if="isError && (i > 0)" class="report__error-block">
                <span class="report__error-text">Укажите ссылку публикации</span>
              </div>

              <!-- <div class="report__btn-block"> -->
              <button v-if="!isSent && (projects[index].links.length === i + 1)"
                class="report__btn-link report__btn-link--add-link" @click="addLink(index)">
                + Добавить ссылку
              </button>

              <button v-if="!isSent && (i > 0)" @click="deleteLink(index, i)"
                class="report__btn-link report__btn-link--delete-field" aria-label="Удалить поле ввода">
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
        <button class="report__add-button" @click="addPublication">
          <SvgIcon icon-name="add-icon" />
          Добавить публикацию
        </button>
      </div>
    </div>

    <div class="report__fieldset report__fieldset--comment" v-if="(!isSent && !(props.centralExpert || props.districtExpert)) ||
      (isSent && eighteenthPanelData.comment)">
      <label class="form__label report__label" for="comment">Комментарий</label>
      <TextareaReport v-model:value="eighteenthPanelData.comment" id="comment" name="comment"
        placeholder="Напишите сообщение" :rows="1" autoResize counter-visible :maxlength="3000" :max-length-text="3000"
        @focusout="focusOut" :disabled="isSent">
      </TextareaReport>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watchEffect, watchPostEffect } from 'vue';
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { FileBoxComponent } from "@entities/RatingRoComponents/components";
import { reportPartTwoService } from "@services/ReportService.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import { SvgIcon } from '@shared/index';

const swal = inject('$swal');

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
const isLink = ref(false);
const isFile = ref(false);

const emit = defineEmits(['getData']);

const link_err = ref(false);
const setError = (err) => {
  link_err.value = err;
}

const ID_PANEL = '18';
const isFirstSent = ref(true);
const scanFile = ref([]);
let isErrorFile = ref(false);
const isErrorsFiles = ref([]);
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

// const uploadFile = async (event, index) => {
//   projects.value[index].file = event.target.files[0];
//   let formData = new FormData();
//   formData.append('comment', eighteenthPanelData.value.comment);

//   formData.append(`projects[${index}][file]`, projects.value[index].file);

//   if (projects.value.length) {
//     for (let index = 0; index < projects.value.length; index++) {
//       if (projects.value[index].links.length) {
//         for (let i = 0; i < projects.value[index].links.length; i++) {
//           !projects.value[index].links[i].link 
//           ? formData.append(`projects[${index}][links][${i}][link]`, '')
//           : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
//         }
//       }
//     }
//   }

//   try {
//     if (isFirstSent.value) {
//       const { data } = await reportPartTwoService.createReport(eighteenthPanelData.value, ID_PANEL);
//       emit('getData', data, Number(ID_PANEL));
//     } else {
//       const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//       emit('getData', data, Number(ID_PANEL));
//     }
//   } catch (e) {
//     console.log('focusOut error:', e);
//   }
// };

const uploadFile = async (event, index) => {
  fileValidate(event.target.files[0], 7, isErrorFile);
  // console.log('(4)', 'перед отправкой в uploadFile', isErrorFile.value);

  for (let i = 0; i < projects.value.length; i++) {
    isErrorsFiles.value[i] = false;
  }
  if (isErrorFile.value) {
    isErrorsFiles.value[index] = true;
    scanFile.value = event.target.files[0];
    projects.value[index].file = scanFile.value.name;
    // console.log('ФАЙЛ НЕ ОТПРАВЛЯЕТСЯ', isErrorsFiles.value);
  } else {
    projects.value[index].file = event.target.files[0];
    let formData = new FormData();
    formData.append('comment', eighteenthPanelData.value.comment || '');

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
        const { data } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
        emit('getData', data, Number(ID_PANEL));
      } else {
        const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
        emit('getData', data, Number(ID_PANEL));
      }
    } catch (e) {
      console.log('focusOut error:', e);
    }
  }
};

const deleteFile = async (index) => {
  let formData = new FormData();
  formData.append('comment', eighteenthPanelData.value.comment || '');

  formData.append(`projects[${index}][file]`, '');

  if (projects.value.length) {
    for (let index = 0; index < projects.value.length; index++) {
      // console.log('этот код выполняется');
      if (projects.value[index].links.length) {
        for (let i = 0; i < projects.value[index].links.length; i++) {
          !projects.value[index].links[i].link
            ? formData.append(`projects[${index}][links][${i}][link]`, '')
            : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
        }
      }
    }
  }

  if (isErrorsFiles.value[index]) {
    projects.value[index].file = '';
    isErrorsFiles.value[index] = false;
  } else {
    const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    emit('getData', data, Number(ID_PANEL));
  }
};

const addLink = (index) => {
  projects.value[index].links.push({ link: '' })
};

const deleteLink = async (projectIndex, linkIndex) => {
  projects.value[projectIndex].links.splice(linkIndex, 1);

  let formData = new FormData();
  formData.append('comment', eighteenthPanelData.value.comment || '');

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
  eighteenthPanelData.value.projects = [...projects.value];
  // console.log(eighteenthPanelData.value.projects);
  try {
    if (isFirstSent.value) {
      const { data } = await reportPartTwoService.createReport(eighteenthPanelData.value, ID_PANEL);
      emit('getData', data, Number(ID_PANEL));
    } else {
      let formData = new FormData();
      formData.append('comment', eighteenthPanelData.value.comment || '');

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
    e.response.data.projects.forEach(project => {
      if (project.links) {
        for (let i in project.links) {
          if (Object.keys(project.links[i]).length !== 0 && project.links[i].link.includes('Введите правильный URL.')) {
            swal.fire({
              position: 'center',
              icon: 'warning',
              title: `Введите корректный URL`,
              showConfirmButton: false,
              timer: 2500,
            })
          }
        }
      }
    })
  }
};

const deletePublication = async (index) => {
  projects.value = projects.value.filter((el, i) => index !== i);

  let formData = new FormData();
  formData.append('comment', eighteenthPanelData.value.comment || '');

  if (projects.value.length) {
    for (let index = 0; index < projects.value.length; index++) {
      if (projects.value[index].links.length) {
        for (let i = 0; i < projects.value[index].links.length; i++) {
          !projects.value[index].links[i].link
            ? formData.append(`projects[${index}][links][${i}][link]`, '')
            : formData.append(`projects[${index}][links][${i}][link]`, projects.value[index].links[i].link);
        }
      }
      if (projects.value[index].file) formData.append(`projects[${index}][file]`, projects.value[index].file);
    }
  }

  const { data } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  emit('getData', data, Number(ID_PANEL));
};

watchEffect(async () => {
  // console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));
  // console.log(props.data, props.data.projects);
  if (props.data) {
    isFirstSent.value = false;
    projects.value = [...props.data.projects];
    eighteenthPanelData.value.comment = props.data.comment;
    // if (!projects.value[0].links.length) projects.value[0].links.push({link: ''});
  }
  // for (let i = 0; i < projects.value.length; i++) {
  //   if (!projects.value[i].file_size) {
  //   projects.value[i].file = '';
  //   }
  // }
}, {
  flush: 'post'
});

watchPostEffect(() => {
  isLink.value = false;
  isFile.value = false;
  projects.value.forEach((project) => {
    if (!project.links.length) project.links.push({ link: '' });
    if (project.links.some((item) => item.link)) {
      isLink.value = true;
    }
    if (project.file) {
      isFile.value = true;
    }
  });
})
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