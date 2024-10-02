<template>
  <div v-if="!(props.centralExpert || props.districtExpert)" class="form__field-group">
    <div class="form__field-project-existence">
      <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup>
      </p>
      <div class="form__label-radio">
        <div style="display: flex; align-items: center">
          <input class="custom-radio" v-model="sixteenthPanelData.is_project" id="is_project-true" type="radio"
                 :value="true" :disabled="isSent"/>
          <label for="is_project-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input class="custom-radio" v-model="sixteenthPanelData.is_project" id="is_project-false" type="radio"
                 :value="false" :disabled="isSent"/>
          <label for="is_project-false">Нет</label>
        </div>
      </div>
    </div>
    <div class="form__field-info" v-for="(project, index) in projects" :key="index">
      <div class="form__field-info-project">
        <div class="form__field-info-win">
          <label class="form__label" for="9">Наименование трудового проекта, в котором ЛСО РО одержал победу <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="project.name"
              id="9"
              name="name"
              class="form__input"
              type="text"
              placeholder="ВВС ПРО"
              @focusout="focusOut"
              :disabled="isSent"
              style="width: 100%;"
          />
        </div>
        <div v-if="!isSent" class="deleteBtn">
          <Button
              v-if="index > 0"
              label="Удалить проект"
              class="deleteProjectBtn"
              @click="deleteProject(index)"
          />
        </div>
      </div>
      <div>
        <div class="project-regulations">
          <div class="project-regulations-input-file">
            <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
            <InputReport
                v-if="!project.regulations"
                class="form-input__file-input"
                isFile
                type="file"
                id="scan_file"
                name="scan_file"
                width="100%"
                @change="uploadFile($event, index)"
                :disabled="isSent"
            />
            <div v-else class="form__file-box">
            <span class="form__file-name">
              <SvgIcon v-if="project.file_type === 'jpg'" icon-name="file-jpg"/>
              <SvgIcon v-if="project.file_type === 'pdf'" icon-name="file-pdf"/>
              <SvgIcon v-if="project.file_type === 'png'" icon-name="file-png"/>
              {{ project.regulations.split('/').at(-1) }}
            </span>
              <span class="form__file-size">{{ project.file_size }} Мб</span>
              <button v-if="!isSent" @click="deleteFile(index)" class="form__button-delete-file">
                Удалить
              </button>
            </div>
          </div>
          <div class="project-scope">
            <p class="form__label form__field-label-project">Масштаб проекта <sup class="valid-red">*</sup></p>
            <div style="display: flex;">
              <input class="custom-radio" v-model="project.project_scale" type="radio" :id="`All-${index}`"
                     value="Всероссийский"/>
              <label :for="`All-${index}`">Всероссийский</label>
            </div>
            <div style="display: flex;">
              <input class="custom-radio" v-model="project.project_scale" type="radio" :id="`District-${index}`"
                     value="Окружной"/>
              <label :for="`District-${index}`">Окружной</label>
            </div>
            <div style="display: flex;">
              <input class="custom-radio" v-model="project.project_scale" type="radio" :id="`Interregional-${index}`"
                     value="Межрегиональный"/>
              <label :for="`Interregional-${index}`">Межрегиональный</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="form__label">Ссылка на&nbsp;группу проекта в социальных сетях <sup class="valid-red">*</sup></p>
        <div class="form__field-link " v-for="(link, i) in projects[index].links" :key="i">
          <div class="form__field-link-wrap">
            <InputReport
                v-model:value="link.link"
                :id="i"
                :name="i"
                class="form__input"
                type="text"
                placeholder="https://vk.com/cco_monolit"
                @focusout="focusOut"
                :disabled="isSent"
                isLink
                style="width: 100%;"
            />
          </div>
          <div v-if="!isSent">
            <div
                v-if="projects[index].links.length === i + 1"
                class="add_link"
                @click="addLink(index)">
              <span class="add_link-plus">+</span>
              Добавить ссылку
            </div>
            <div
                v-else
                class="add_link"
                @click="deleteLink(index, i)"
            >Удалить
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isSent">
      <Button class="add_eventBtn" label="Добавить проект" @click="addProject"/>
    </div>
    <div>
      <div class="form__field-comment">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport
            v-model:value="sixteenthPanelData.comment"
            id="comment"
            name="comment"
            :rows="1"
            autoResize
            placeholder="Напишите сообщение"
            @focusout="focusOut"
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            :disabled="isSent"
            style="margin-bottom: 4px ;"
        />
      </div>
      <div class="form__field-result">
        <v-checkbox class="result-checkbox" id="v-checkbox"/>
        <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
      </div>
      <div class="hr"></div>
      <div>
        <p class="result-count">0</p>
      </div>
    </div>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <div>
        <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup>
        </p>
        <div class="form__label-radio">
          <div v-if="sixteenthPanelData.is_project" style="display: flex; align-items: center">
            <input class="custom-radio" v-model="sixteenthPanelData.is_project" id="is_project-true" type="radio"
                   :value="true"/>
            <label for="is_project-true">Да</label>
          </div>
          <div v-else style="display: flex; align-items: center">
            <input class="custom-radio" v-model="sixteenthPanelData.is_project" id="is_project-false" type="radio"
                   :value="false"/>
            <label for="is_project-false">Нет</label>
          </div>
        </div>
      </div>
      <div v-for="(project, index) in projects" :key="index">
        <div style="display: flex; justify-content: space-between; margin-top: 40px;">
          <div>
            <label class="form__label" for="9">Наименование трудового проекта, в котором ЛСО РО одержал победу <sup
                class="valid-red">*</sup></label>
            <InputReport v-model:value="project.name" id="9" name="name" class="form__input" type="text"
                         placeholder="ВВС ПРО" @focusout="focusOut" counter-visible :max-counter="300" :max-length="300"
                         :disabled="props.centralExpert || props.districtExpert"/>
          </div>
        </div>
        <div>
          <v-tabs-window-item>
            <div style="display: flex;">
              <div>
                <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
                <div class="form__file-box">
                  <span class="form__file-name">
                    <SvgIcon v-if="sixteenthPanelData.file_type === 'jpg'" icon-name="file-jpg"/>
                    <SvgIcon v-if="sixteenthPanelData.file_type === 'pdf'" icon-name="file-pdf"/>
                    <SvgIcon v-if="sixteenthPanelData.file_type === 'png'" icon-name="file-png"/>
                    {{ sixteenthPanelData.scan_file || 'Тестовое название' }}
                  </span>
                  <span class="form__file-size">{{ sixteenthPanelData.file_size || '123' }} Мб</span>
                </div>
              </div>
              <div style="margin-left: 40px;">
                <p class="form__label">Масштаб проекта <sup class="valid-red">*</sup></p>
                <div v-if="project.project_scale === 'Всероссийский'" style="display: flex;">
                  <input v-model="project.project_scale" type="radio" :id="`All-${index}`" value="Всероссийский"/>
                  <label>Всероссийский</label>
                </div>
                <div v-else-if="project.project_scale === 'Окружной'" style="display: flex;">
                  <input v-model="project.project_scale" type="radio" :id="`District-${index}`" value="Окружной"/>
                  <label>Окружной</label>
                </div>
                <div v-else style="display: flex;">
                  <input v-model="project.project_scale" type="radio" :id="`Interregional-${index}`"
                         value="Межрегиональный"/>
                  <label>Межрегиональный</label>
                </div>
              </div>
            </div>
          </v-tabs-window-item>

          <v-tabs-window-item value="two">
            <div class="form__field-group">
              <div class="form__field">
                <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup
                    class="valid-red">*</sup></p>
                <div style="display: flex;">
                  <div style="display: flex; align-items: center">
                    <InputReport id="2" name="2" class="form__input" type="radio"/>
                    <label for="2">Да</label>
                  </div>
                  <div style="display: flex; align-items: center">
                    <InputReport id="2" name="2" class="form__input" type="radio"/>
                    <label for="2">Нет</label>
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <label class="form__label" for="9">Наименование трудового проекта, в котором ЛСО РО одержал победу
                    <sup class="valid-red">*</sup></label>
                  <InputReport id="9" name="9" class="form__input" type="text" placeholder="ВВС ПРО"/>
                </div>
                <div>
                  <Button class="form__btn" label="Удалить проект"/>
                </div>
              </div>
              <div class="form__field">
                <p class="form__label">Масштаб проекта <sup class="valid-red">*</sup>
                </p>
                <div>
                  <div style="display: flex">
                    <InputReport id="2" name="2" class="form__input" type="radio"/>
                    <label>Всероссийский</label>
                  </div>
                  <div style="display: flex;">
                    <input v-model="project.project_scale" type="radio" :id="`District-${index}`" value="Окружной"/>
                    <label>Окружной</label>
                  </div>
                  <div style="display: flex;">
                    <input v-model="project.project_scale" type="radio" :id="`Interregional-${index}`"
                           value="Межрегиональный"/>
                    <label>Межрегиональный</label>
                  </div>
                </div>
              </div>
            </div>
          </v-tabs-window-item>
        </div>
      </div>
      <!--      <div>-->
      <!--        <Button class="add_eventBtn" label="+ Добавить проект" @click="addProject"/>-->
      <!--      </div>-->
      <div>
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport id="comment" name="comment" :rows="1" autoResize placeholder="Напишите сообщение"
                        @focusout="focusOut" :maxlength="3000" :max-length-text="3000" counter-visible
                        :disabled="props.centralExpert || props.districtExpert"
        />
      </div>
      <div>
        <v-checkbox label="Итоговое значение"/>
      </div>
      <div class="hr"></div>
      <div>
        <p>(4-1)*2+(4-2)+(4-3)=9</p>
      </div>
    </template>
    <template v-slot:thirdTab>
      <div class="form__field-group report-table">
        <div class="form__field">
          <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup
              class="valid-red">*</sup></p>
          <div style="display: flex;">
            <div style="display: flex; align-items: center">
              <InputReport id="2" name="2" class="form__input" type="radio"/>
              <label for="2">Да</label>
            </div>
            <div style="display: flex; align-items: center">
              <InputReport id="2" name="2" class="form__input" type="radio"/>
              <label for="2">Нет</label>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div>
            <label class="form__label">Наименование трудового проекта, в котором ЛСО РО одержал победу <sup
                class="valid-red">*</sup></label>
            <v-table>
              <tbody>
              <tr class="report-table__tr">
                <td>Данные РО</td>
              </tr>
              <tr class="report-table__tr">
                <td>ВВС Всеросийская сельскохозяйственная неделя</td>
              </tr>
              <tr class="report-table__tr">
                <td>Корректировка ОШ</td>
              </tr>
              <tr class="report-table__tr">
                <td>ВВС Всеросийская сельскохозяйственная неделя</td>
              </tr>
              <tr class="report-table__tr">
                <td>Корректировка ЦШ</td>
              </tr>
              <tr class="report-table__tr">
                <td>ВВС Всеросийская сельскохозяйственная неделя</td>
              </tr>
              </tbody>
            </v-table>
          </div>
          <div>
            <Button style="margin: 0;" label="Удалить проект"/>
          </div>
        </div>
        <label class="form__label">Масштаб проекта <sup class="valid-red">*</sup></label>
        <v-table>
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th report-table__th__br-left">Данные РО</td>
            <td class="report-table__th">Корректировка ОШ</td>
            <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">Всероссийский</td>
            <td class="report-table__td report-table__td__center">Всероссийский</td>
            <td class="report-table__td">Всероссийский</td>
          </tr>
          </tbody>
        </v-table>
        <div class="form__field">
          <p class="form__label">Масштаб проекта <sup class="valid-red">*</sup></p>
          <div style="display: flex">
            <div style="display: flex">
              <InputReport id="2" name="2" class="form__input" type="radio"/>
              <label>Всероссийский</label>
            </div>
            <div style="display: flex">
              <InputReport id="2" name="2" class="form__input" type="radio"/>
              <label>Окружной</label>
            </div>
            <div class="form__field">
              <label class="form__label" for="15">Комментарий <sup class="valid-red">*</sup></label>
              <InputReport id="15" name="15" class="form__input" style="width: 100%;"/>
            </div>
            <div>
              <v-checkbox label="Итоговое значение"/>
            </div>
            <div class="hr"></div>
            <div>
              <p>(4-1)*2+(4-2)+(4-3)=9</p>
            </div>
            <div>
              <v-checkbox label="Вернуть в РО на доработку"/>
            </div>
          </div>
        </div>
        <div>
          <Button style="margin: 0;" label="Добавить проект"/>
        </div>
        <div class="form__field">
          <label class="form__label" for="15">Комментарий <sup class="valid-red">*</sup></label>
          <InputReport id="15" name="15" class="form__input" style="width: 100%"/>
        </div>
        <div>
          <v-checkbox label="Итоговое значение"/>
        </div>
        <div class="hr"></div>
        <div>
          <p>(4-1)*2+(4-2)+(4-3)=9</p>
        </div>
        <div>
          <v-checkbox label="Вернуть в РО на доработку"/>
        </div>
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import {inject, ref, watchEffect, watchPostEffect} from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';
import { ReportTabs } from './index';

const swal = inject('$swal');

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  reportId: {
    type: String,
    default: '',
  },
  data: Object,
});

const emit = defineEmits(['getData']);

const sixteenthPanelData = ref({
  is_project: false,
  projects: [],
  comment: ''
})
const projects = ref([
  {
    name: '',
    project_scale: 'Всероссийский',
    regulations: '',
    file_size: '',
    file_type: '',
    links: [
      {
        link: '',
      },
    ],
  }
]);
const isFirstSent = ref(true);
const isSent = ref(false);

const focusOut = async () => {
  sixteenthPanelData.value.projects = [...projects.value];
  try {
    if (isFirstSent.value) {
      const {data} = await reportPartTwoService.createReport(sixteenthPanelData.value, '16');
      emit('getData', data, 16);
    } else {
      const {data} = await reportPartTwoService.createReportDraft(setFormData(), '16', true);
      emit('getData', data, 16);
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

const addLink = (index) => {
  projects.value[index].links.push({link: ''})
};
const deleteLink = async (projectIndex, linkIndex) => {
  let {data} = await reportPartTwoService.createReportDraft(setFormData(null, projectIndex, false, false, true, linkIndex), '16', true);
  emit('getData', data, 16);
};

const addProject = () => {
  projects.value.push({
    name: '',
    project_scale: 'Всероссийский',
    regulations: '',
    file_size: '',
    file_type: '',
    links: [
      {
        link: '',
      },
    ],
  })
};
const deleteProject = async (index) => {
  let formData = new FormData();
  projects.value = projects.value.filter((el, i) => index !== i);

  formData.append('comment', sixteenthPanelData.value.comment);
  formData.append('is_project', sixteenthPanelData.value.is_project);
  projects.value.forEach((project, i) => {
    if (project.name) formData.append(`projects[${i}][name]`, project.name);
    if (project.project_scale) formData.append(`projects[${i}][project_scale]`, project.project_scale);
    if (project.regulations) formData.append(`projects[${i}][regulations]`, '');
    if (project.links.length) {
      for (let j = 0; j < project.links.length; j++) {
        if (project.links[j].link) formData.append(`projects[${i}][links][${j}][link]`, project.links[j].link);
      }
    }
  })
  try {
    let {data} = await reportPartTwoService.createReportDraft(formData, '16', true);
    emit('getData', data, 16);
  } catch (e) {
    console.log('deleteEvent error: ', e);
  }
};

const uploadFile = async (event, index) => {
  const {data} = await reportPartTwoService.createReportDraft(setFormData(event.target.files[0], index), '16', true);
  emit('getData', data, 16);
};
const deleteFile = async (index) => {
  setFormData(null, index, false, true)
  const {data} = await reportPartTwoService.createReportDraft(setFormData(null, index, false, true), '16', true);
  emit('getData', data, 16);
};

const setFormData = (file = null, index = null, isDeleteEvent = false, isDeleteFile = false, isLinkDelete = false, linkIndex = null) => {
  let formData = new FormData();

  formData.append('comment', sixteenthPanelData.value.comment);
  formData.append('is_project', sixteenthPanelData.value.is_project);
  projects.value.forEach((project, i) => {
    if (isDeleteEvent && index === i) {
      return;
    } else {
      if (project.name) formData.append(`projects[${i}][name]`, project.name);
      if (project.project_scale) formData.append(`projects[${i}][project_scale]`, project.project_scale);
      if (isLinkDelete && index === i) {
        project.links.splice(linkIndex, 1);
      }
      if (file && index === i) {
        formData.append(`projects[${i}][regulations]`, file);
      }
      if (isDeleteFile && index === i) {
        formData.append(`projects[${i}][regulations]`, '');
      }
      if (project.links.length) {
        for (let j = 0; j < project.links.length; j++) {
          if (project.links[j].link) formData.append(`projects[${i}][links][${j}][link]`, project.links[j].link);
        }
      }
    }
  })
  return formData;
};

watchEffect(async () => {
  if (props.data) {
    isFirstSent.value = false;
    projects.value = [...props.data.projects];
    sixteenthPanelData.value.is_project = props.data.is_project;
    sixteenthPanelData.value.comment = props.data.comment;
    isSent.value = props.data.is_sent;
  }
});
watchPostEffect(() => {
  projects.value.forEach((project) => {
    if (!project.links.length) project.links.push({link: ''})
  });
})
</script>
<style lang="scss" scoped>
.form__field-project-existence {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-input__file-input {
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 720px;
  min-height: 86px;

  @media (max-width: 568px) {
    min-height: 101px;
  }
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

.project-regulations-input-file {
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;

  @media (max-width: 1024px) {
    max-width: 528px;
  }
}

.form__label-radio {
  display: flex;
  gap: 40px;

  @media (max-width: 568px) {
    gap: 32px;
  }
}

.custom-radio {
  display: none;
  /* -стандартное отображение*/
}

.custom-radio + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  line-height: 20px;
}

.custom-radio + label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внешний синий круг */
}

.custom-radio + label::after {
  content: '';
  position: absolute;
  left: 5px;
  /* Отступ от внешнего круга */
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  /* Внутренний синий круг */
  background-color: transparent;
  /* Пустота внутри внутреннего круга */
}

.custom-radio:checked + label::after {
  background-color: #1F7CC0;
  /* Заполнение внутреннего круга синим цветом при выборе */
}

.form__field-info {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.form__field-info-project {
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    gap: 8px;
  }
}

.form__field-info-win {
  display: flex;
  flex-direction: column;
  width: 720px;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

.form__field-link {
  max-width: 901px;
  justify-content: space-between;
  gap: 40px;
  display: flex;
  margin-bottom: 5px;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

.form__field-link-wrap {
  width: 720px;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

.project-regulations {
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
}


.project-scope {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel-card {
  box-shadow: none;
}

.form__field-group {
  display: flex;
  flex-direction: column;
  background: #F3F4F5;
  border: none;
  border-radius: 10px;
  margin-bottom: 8px;
  gap: 40px;
}

.valid-red {
  color: #db0000;
}

.v-tab-item--selected {
  background: #F3F4F5;
}

.v-tab.v-tab.v-btn {
  min-width: 280px;
  border-radius: 10px 10px 0 0;
  letter-spacing: initial;
  border: none;
}

.panel-card-text {
  padding: 0;
}

.panel-tab-btn {
  text-transform: initial;
  font-family: Bert Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.1px;
  text-align: left;
  margin-right: 8px;
}

.hr {
  margin-bottom: 16px;
  width: 100%;
  border-top: 1px solid #B6B6B6;
}

.v-table {
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid #B6B6B6;
}

.report-table {
  &__tr {
    background-color: #FFFFFF;
    text-align: center;
  }

  &__th {
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    text-align: center;

    &__br-left {
      border-radius: 10px 0 0 0;
      border-right: 1px solid #B6B6B6;
    }

    &__br-right {
      border-radius: 0 10px 0 0;
      border-left: 1px solid #B6B6B6;
    }
  }

  &__td {
    text-align: center;
    font-family: Akrobat;
    font-size: 16px;
    font-weight: 500;
    color: #8E8E93;

    &__center {
      border-left: 1px solid #B6B6B6;
      border-right: 1px solid #B6B6B6;
    }
  }
}

.add_link {
  display: flex;
  align-items: center;
  text-align: center;
  color: #1f7cc0;
  cursor: pointer;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  min-width: 141px;

  &-plus {
    margin-right: 4px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
}

.add_eventBtn {
  // background-color: transparent;
  // color: #1F7CC0;
  // border-color: #1F7CC0;
  margin: 0;
  background-color: transparent;
  color: #1F7CC0;
  border-color: #1F7CC0;
  padding-left: 52px;
  position: relative;
  width: 340px;

  @media(max-width: 1024px) {
    width: 244px;
  }

  @media(max-width: 768px) {
    width: 290px;
  }
}

.add_eventBtn::before {
  content: url('@app/assets/icon_items/event-plus.svg');
  position: absolute;
  left: 80px;

  @media(max-width: 1024px) {
    left: 34px;
  }

  @media(max-width: 768px) {
    left: 53px;
  }
}

.deleteBtn {
  display: flex;

  @media (max-width: 1024px) {
    justify-content: flex-end;
  }
}

.deleteProjectBtn {
  background-color: #d2e4f2;
  width: 131px;
  height: 33px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  font-family: Akrobat;
  line-height: 21.1px;
  text-align: center;
  padding: 4px 11px;
  color: #1f7cc0;
  border-radius: 6px;
  margin: 0;
}

.form__field-comment {
  display: flex;
  flex-direction: column;
}

.form__field-result {
  margin-top: 25px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
}

.result-count {
  color: #6D6D6D;
}

.result-checkbox {
  color: #39BF39;
  margin-right: 12px;
}

.result-checkbox-text {
  font-family: 'Bert sans';
  font-weight: 700;
}
</style>