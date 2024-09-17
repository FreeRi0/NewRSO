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
        <div class="report__fieldset"
          v-if="!(props.centralExpert || props.districtExpert) ||
                (props.districtExpert && project.file) ||
                (props.centralExpert && project.file)">
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
          <FileBoxComponent
            v-else
            :file="project.file"
            :fileType="project.file_type"
            :fileSize="project.file_size"
            @click="deleteFile"
          ></FileBoxComponent>
          <button
            v-if="!(props.centralExpert || props.districtExpert) && (index > 0)"
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
                  :disabled="props.centralExpert || props.districtExpert"
              />
              <button
                v-if="!(props.centralExpert || props.districtExpert) && (i > 0)"
                @click="deleteLink(index, i)"
                class="report__btn-link report__btn-link--delete-field"
              >
              Удалить поле ввода
              </button>
            </div>

            <button
              v-if="!(props.centralExpert || props.districtExpert)"
              class="report__btn-link report__btn-link--add-link"
              @click="addLink(index)"
            >
              + Добавить ссылку
            </button>
            
            
          </div>
        </div>
      </div>
      
      <div v-if="!(props.centralExpert || props.districtExpert)">
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
// import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  reportId: {
    type: String,
    default: '1',
  }
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
    // eighteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
    // eighteenthPanelData.value.scan_file = scan_file;
  // } else {
  //   let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  //   eighteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
  // eighteenthPanelData.value.scan_file = scan_file;
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
  console.log("не эксперт: ", !(props.districtExpert || props.centralExpert));
  try {
    const { data } = 
      props.districtExpert || props.centralExpert
        ? await reportPartTwoService.getReportDH(ID_PANEL, props.reportId)
        : await reportPartTwoService.getReport(ID_PANEL);
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

    &--column {
      grid-template-columns: 1fr;
    }

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