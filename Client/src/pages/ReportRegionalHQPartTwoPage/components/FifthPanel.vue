<template>
  <div v-if="!(props.centralExpert || props.districtExpert)" class="form__field-group">
    <div class="form__field-group-general" v-for="(event, index) in events" :key="index">
      <div class="form__field-people">
        <div class="form__field-people-count">
          <div class="form__field-people-count-wrap">
            <label class="form__label" for="participants_number">Общее количество человек, принявших участие в трудовом
              проекте <sup class="valid-red">*</sup></label>
            <InputReport
                v-model:value="event.participants_number"
                id="participants_number" name="participants_number"
                class="form__input form__field-people-count-field"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="2147483647"
                @focusout="focusOut"
                :disabled="isSent"
            />
          </div>
          <div class="form__field-people-count-wrap">
            <label class="form__label" for="ro_participants_number">Количество человек из&nbsp;своего региона, принявших
              участие в&nbsp;трудовом проекте <sup class="valid-red">*</sup></label>
            <InputReport
                v-model:value="event.ro_participants_number"
                id="ro_participants_number"
                name="ro_participants_number"
                class="form__input form__field-people-count-field"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="2147483647"
                @focusout="focusOut"
                :disabled="isSent"
            />
          </div>
        </div>
        <div class="form__field-people-deleteBtn">
          <Button
              v-if="index > 0 && !isSent"
              label="Удалить проект"
              class="deleteEventBtn"
              @click="deleteProject(index)"
          />
        </div>
      </div>
      <div class="form__field-date" style="display: flex;">
        <div class="form__field-date-wrap">
          <label class="form__label" for="start_date">Дата начала проведения проекта <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="event.start_date"
              id="start_date"
              name="start_date"
              class="form__input form__field-date-wrap-field"
              type="date"
              @focusout="focusOut"
              :disabled="isSent"
          />
        </div>
        <div class="form__field-date-wrap">
          <label class="form__label" for="end_date">Дата окончания проведения проекта <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="event.end_date"
              id="end_date"
              name="end_date"
              class="form__input form__field-date-wrap-field"
              type="date"
              @focusout="focusOut"
              :disabled="isSent"
              :min-date="event.start_date"
              :is-error-date="Object.values(isErrorDate).some(item => item.error === true && item.id === index)"
          />
        </div>
      </div>
      <div class="report__add-file">
        <div class="form__field-event-file">
          <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
          <InputReport
              class="form-input__file-input"
              v-if="!event.regulations"
              isFile
              type="file"
              id="scan_file"
              name="scan_file"
              width="100%"
              @change="uploadFile($event, index)"
              :disabled="isSent"
          />
          <FileBoxComponent
              v-else
              :file="event.regulations"
              :fileType="event.file_type"
              :fileSize="event.file_size"
              :is-sent="isSent"
              :is-error-file="isErrorFile && !event.file_size"
              @click="deleteFile(index)"
          ></FileBoxComponent>
        </div>
      </div>
      <div style="width: 100%;">
        <p class="form__label">Ссылка на группу трудового проекта в социальных сетях <sup class="valid-red">*</sup></p>
        <div class="form__field-link-wrap" v-for="(link, i) in events[index].links" :key="i">
          <InputReport
              v-model:value="link.link"
              :id="i"
              :name="i"
              class="form__input form__field-link-field"
              type="text"
              placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
              @focusout="focusOut"
              :disabled="isSent"
          />
          <div v-if="!isSent">
            <div
                v-if="events[index].links.length === i + 1"
                @click="addLink(index)"
                class="add_link"
            >+ Добавить ссылку
            </div>
            <div v-else class="add_link" @click="deleteLink(index, i)">Удалить</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isSent">
      <Button class="add_eventBtn" label="Добавить проект" @click="addProject"/>
    </div>
    <div class="form__field-comment">
      <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
      <TextareaReport
          v-model:value="fifthPanelData.comment"
          id="comment"
          name="comment"
          :rows="1"
          autoResize
          placeholder="Комментарий"
          @focusout="focusOut"
          :maxlength="3000"
          :max-length-text="3000"
          counter-visible
          :disabled="isSent"
      />
    </div>
    <div class="form__field-result">
      <v-checkbox class="result-checkbox" id="v-checkbox"/>
      <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
    </div>
    <div class="hr"></div>
    <div>
      <p>0</p>
    </div>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <div class="form__field-group-general" v-for="(event, index) in events" :key="index">
        <div class="form__field-people">
          <div class="form__field-people-count">
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="participants_number">Общее количество человек, принявших участие в
                трудовом
                проекте <sup class="valid-red">*</sup></label>
              <InputReport v-model:value="event.participants_number" id="participants_number" name="participants_number"
                           class="form__input form__field-people-count-field" type="number" placeholder="Введите число"
                           @focusout="focusOut" :disabled="props.centralExpert || props.districtExpert"/>
            </div>
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="ro_participants_number">Количество человек из своего региона, принявших
                участие в трудовом проекте <sup class="valid-red">*</sup></label>
              <InputReport v-model:value="event.ro_participants_number" id="ro_participants_number"
                           name="ro_participants_number" class="form__input form__field-people-count-field"
                           type="number"
                           placeholder="Введите число" @focusout="focusOut"
                           :disabled="props.centralExpert || props.districtExpert"/>
            </div>
          </div>
        </div>
        <div class="form__field-date" style="display: flex;">
          <div class="form__field-date-wrap">
            <label class="form__label" for="start_date">Дата начала проведения проекта <sup
                class="valid-red">*</sup></label>
            <InputReport v-model:value="event.start_date" id="start_date" name="start_date"
                         class="form__input form__field-date-wrap-field" type="date" @focusout="focusOut"
                         :disabled="props.centralExpert || props.districtExpert"/>
          </div>
          <div class="form__field-date-wrap">
            <label class="form__label" for="end_date">Дата окончания проведения проекта <sup
                class="valid-red">*</sup></label>
            <InputReport v-model:value="event.end_date" id="end_date" name="end_date"
                         class="form__input form__field-date-wrap-field" type="date" @focusout="focusOut"
                         :disabled="props.centralExpert || props.districtExpert"/>
          </div>
        </div>
        <div class="report__add-file">
          <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
          <div class="form__file-box">
            <span class="form__file-name">
              <SvgIcon v-if="fifthPanelData.file_type === 'jpg'" icon-name="file-jpg"/>
              <SvgIcon v-if="fifthPanelData.file_type === 'pdf'" icon-name="file-pdf"/>
              <SvgIcon v-if="fifthPanelData.file_type === 'png'" icon-name="file-png"/>
              {{ fifthPanelData.scan_file || 'Тестовое название' }}
            </span>
            <span class="form__file-size">{{ fifthPanelData.file_size || '123' }} Мб</span>
          </div>
        </div>
        <div style="width: 100%;">
          <p class="form__label">Ссылка на группу трудового проекта в социальных сетях <sup class="valid-red">*</sup>
          </p>
          <div class="form__field-link-wrap" v-for="(link, i) in events[index].links" :key="i">
            <InputReport v-model:value="link.link" :id="i" :name="i" class="form__input form__field-link-field"
                         type="text" placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
                         @focusout="focusOut"
                         :disabled="props.centralExpert || props.districtExpert"/>
          </div>
        </div>
      </div>
      <div class="form__field-comment">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport v-model:value="fifthPanelData.comment" id="comment" name="comment" :rows="1" autoResize
                        placeholder="Комментарий" @focusout="focusOut" :maxlength="3000" :max-length-text="3000"
                        counter-visible
                        :disabled="props.centralExpert || props.districtExpert"/>
      </div>
      <div style="display: flex; align-items: center;">
        <v-checkbox class="result-checkbox" id="v-checkbox"/>
        <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
      </div>
      <div class="hr"></div>
      <div>
        <p>0</p>
      </div>
    </template>
    <template v-slot:secondTab>
      <div class="form__field-group-general" v-for="(event, index) in events" :key="index">
        <div class="form__field-people">
          <div class="form__field-people-count">
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="participants_number">Общее количество человек, принявших участие в
                трудовом
                проекте <sup class="valid-red">*</sup></label>
              <InputReport v-model:value="event.participants_number" id="participants_number" name="participants_number"
                           class="form__input form__field-people-count-field" type="number" placeholder="Введите число"
                           @focusout="focusOut"/>
            </div>
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="ro_participants_number">Количество человек из своего региона, принявших
                участие в трудовом проекте <sup class="valid-red">*</sup></label>
              <InputReport v-model:value="event.ro_participants_number" id="ro_participants_number"
                           name="ro_participants_number" class="form__input form__field-people-count-field"
                           type="number"
                           placeholder="Введите число" @focusout="focusOut"/>
            </div>
          </div>
          <div class="form__field-people-deleteBtn">
            <Button v-if="index > 0" label="Удалить проект" class="deleteEventBtn" @click="deleteProject(index)"/>
          </div>
        </div>
        <div class="form__field-date" style="display: flex;">
          <div class="form__field-date-wrap">
            <label class="form__label" for="start_date">Дата начала проведения проекта <sup
                class="valid-red">*</sup></label>
            <InputReport v-model:value="event.start_date" id="start_date" name="start_date"
                         class="form__input form__field-date-wrap-field" type="date" @focusout="focusOut"/>
          </div>
          <div class="form__field-date-wrap">
            <label class="form__label" for="end_date">Дата окончания проведения проекта <sup
                class="valid-red">*</sup></label>
            <InputReport v-model:value="event.end_date" id="end_date" name="end_date"
                         class="form__input form__field-date-wrap-field" type="date" @focusout="focusOut"/>
          </div>
        </div>
      </div>
      <div>
        <Button class="add_eventBtn" label="Добавить проект" @click="addProject"/>
      </div>
      <div class="form__field-comment">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport v-model:value="fifthPanelData.comment" id="comment" name="comment" :rows="1" autoResize
                        placeholder="Комментарий" @focusout="focusOut" :maxlength="3000" :max-length-text="3000"
                        counter-visible/>
      </div>
      <div style="display: flex; align-items: center;">
        <v-checkbox class="result-checkbox" id="v-checkbox"/>
        <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
      </div>
      <div class="hr"></div>
      <div>
        <p>0</p>
      </div>
    </template>
    <template v-slot:thirdTab>
      <div>
        <Button style="margin-right: 0" label="Удалить мероприятие" size="large"/>
      </div>
      <label class="form__label">Общее количество человек, принявших участие в трудовом проекте <sup
          class="valid-red">*</sup></label>
      <v-table>
        <tbody>
        <tr class="report-table__tr">
          <td class="report-table__th report-table__th__br-left">Данные РО</td>
          <td class="report-table__th">Корректировка ОШ</td>
          <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
        </tr>
        <tr>
          <td class="report-table__td">200</td>
          <td class="report-table__td report-table__td__center">200</td>
          <td class="report-table__td">200</td>
        </tr>
        </tbody>
      </v-table>
      <label class="form__label">Количество человек из своего региона, принявших участие в трудовом проекте <sup
          class="valid-red">*</sup></label>
      <v-table>
        <tbody>
        <tr class="report-table__tr">
          <td class="report-table__th report-table__th__br-left">Данные РО</td>
          <td class="report-table__th">Корректировка ОШ</td>
          <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
        </tr>
        <tr>
          <td class="report-table__td">200</td>
          <td class="report-table__td report-table__td__center">200</td>
          <td class="report-table__td">200</td>
        </tr>
        </tbody>
      </v-table>
      <label class="form__label">Дата начала проведения проекта <sup class="valid-red">*</sup></label>
      <v-table>
        <tbody>
        <tr class="report-table__tr">
          <td class="report-table__th report-table__th__br-left">Данные РО</td>
          <td class="report-table__th">Корректировка ОШ</td>
          <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
        </tr>
        <tr>
          <td class="report-table__td">25.03.2024</td>
          <td class="report-table__td report-table__td__center">25.03.2024</td>
          <td class="report-table__td">25.03.2024</td>
        </tr>
        </tbody>
      </v-table>
      <label class="form__label">Дата окончания проведения проекта <sup class="valid-red">*</sup></label>
      <v-table>
        <tbody>
        <tr class="report-table__tr">
          <td class="report-table__th report-table__th__br-left">Данные РО</td>
          <td class="report-table__th">Корректировка ОШ</td>
          <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
        </tr>
        <tr>
          <td class="report-table__td">25.03.2024</td>
          <td class="report-table__td report-table__td__center">25.03.2024</td>
          <td class="report-table__td">25.03.2024</td>
        </tr>
        </tbody>
      </v-table>
      <div>
        <Button style="margin: 0" label="Добавить проект" size="large"/>
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
    </template>
  </report-tabs>
</template>
<script setup>
import {inject, ref, watchEffect, watchPostEffect} from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from "@services/ReportService.ts";
import { ReportTabs } from './index';
import { SvgIcon } from '@shared/index';
import { FileBoxComponent } from "@entities/RatingRoComponents/components";
import { dateValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";
import { fileValidate } from "@pages/ReportRegionalHQPartTwoPage/ReportHelpers.ts";

const swal = inject('$swal');

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
});
const emit = defineEmits(['getData']);

const isFirstSent = ref(true);
const fifthPanelData = ref({
  comment: '',
  events: [],
});
const events = ref([
  {
    participants_number: '',
    ro_participants_number: '',
    start_date: null,
    end_date: null,
    regulations: '',
    file_size: null,
    file_type: '',
    links: [
      {
        link: '',
      },
    ],
  }
]);
const isSent = ref(false);
const isErrorDate = ref({});
const noErrorDate = ref(false);
let isErrorFile = ref(false);

const focusOut = async () => {
  dateValidate(events, isErrorDate, noErrorDate);

  if (!noErrorDate.value) {
    try {
      if (isFirstSent.value) {
        const {data} = await reportPartTwoService.createReport(setFormData(), '5', true);
        emit('getData', data, 5);
      } else {
        const {data} = await reportPartTwoService.createReportDraft(setFormData(), '5', true);
        emit('getData', data, 5);
      }
    } catch (e) {
      console.log('focusOut error:', e);
      e.response.data.events.forEach(event => {
        if (event.links) {
          for (let i in event.links) {
            if (Object.keys(event.links[i]).length !== 0 && event.links[i].link.includes('Введите правильный URL.')) {
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
  }
  // try {
  //   if (isFirstSent.value) {
  //     const {data} = await reportPartTwoService.createReport(setFormData(), '5', true);
  //     emit('getData', data, 5);
  //   } else {
  //     const {data} = await reportPartTwoService.createReportDraft(setFormData(), '5', true);
  //     emit('getData', data, 5);
  //   }
  // } catch (e) {
  //   console.log('focusOut error:', e);
  //   e.response.data.events.forEach(event => {
  //     if (event.links) {
  //       for (let i in event.links) {
  //         if (Object.keys(event.links[i]).length !== 0 && event.links[i].link.includes('Введите правильный URL.')) {
  //           swal.fire({
  //             position: 'center',
  //             icon: 'warning',
  //             title: `Введите корректный URL`,
  //             showConfirmButton: false,
  //             timer: 2500,
  //           })
  //         }
  //       }
  //     }
  //   })
  // }
}

const addLink = (index) => {
  events.value[index].links.push({link: ''})
};
const deleteLink = async (eventIndex, linkIndex) => {
  let {data} = await reportPartTwoService.createReportDraft(setFormData(null, eventIndex, false, false, true, linkIndex), '5', true);
  emit('getData', data, 5);
};

const addProject = () => {
  events.value.push({
    participants_number: '',
    ro_participants_number: '',
    start_date: null,
    end_date: null,
    links: [
      {
        link: '',
      },
    ],
  })
};
const deleteProject = async (index) => {
  let formData = new FormData();
  events.value = events.value.filter((el, i) => index !== i);
  // fifthPanelData.value.events = [...events.value];
  formData.append('comment', fifthPanelData.value.comment || '');
  events.value.forEach((event, i) => {
    if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
    if (event.ro_participants_number) formData.append(`events[${i}][ro_participants_number]`, event.ro_participants_number);
    if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
    if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    if (event.regulations) formData.append(`events[${i}][regulations]`, event.regulations);
    if (event.links.length) {
      for (let j = 0; j < event.links.length; j++) {
        if (event.links[j].link) formData.append(`events[${i}][links][${j}][link]`, event.links[j].link);
      }
    }
  })
  try {
    let {data} = await reportPartTwoService.createReportDraft(formData, '5', true);
    emit('getData', data, 5);
  } catch (e) {
    console.log('deleteEvent error: ', e);
  }
};

const uploadFile = async (event, index) => {
  fileValidate(event.target.files[0], 7, isErrorFile);
  if (isErrorFile.value){
    events.value[index].regulations = event.target.files[0].name
  } else {
    const {data} = await reportPartTwoService.createReportDraft(setFormData(event.target.files[0], index), '5', true);
    emit('getData', data, 5);
  }
};
const deleteFile = async (index) => {
  setFormData(null, index, false, true)
  const {data} = await reportPartTwoService.createReportDraft(setFormData(null, index, false, true), '5', true);
  emit('getData', data, 5);
};

const setFormData = (file = null, index = null, isDeleteEvent = false, isDeleteFile = false, isLinkDelete = false, linkIndex = null) => {
  let formData = new FormData();

  formData.append('comment', fifthPanelData.value.comment || '');
  events.value.forEach((event, i) => {
    if (isDeleteEvent && index === i) {
      return;
    } else {
      if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
      if (event.ro_participants_number) formData.append(`events[${i}][ro_participants_number]`, event.ro_participants_number);
      if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
      if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
      if (isLinkDelete && index === i) {
        event.links.splice(linkIndex, 1);
      }
      if (file && index === i) {
        formData.append(`events[${i}][regulations]`, file);
      }
      if (isDeleteFile && index === i) {
        formData.append(`events[${i}][regulations]`, '');
      }
      if (event.links.length) {
        for (let j = 0; j < event.links.length; j++) {
          if (event.links[j].link) formData.append(`events[${i}][links][${j}][link]`, event.links[j].link);
        }
      }
    }
  })
  return formData;
};

watchEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    events.value = [...props.data.events];
    fifthPanelData.value.comment = props.data.comment;
    isSent.value = props.data.is_sent;
  }
  // dateValidate(events, isErrorDate, noErrorDate);
});
watchPostEffect(() => {
  events.value.forEach((event) => {
    if (!event.links.length) event.links.push({link: ''})
  });
  if (!events.value.length) {
    addProject()
  }
})
</script>
<style lang="scss" scoped>
.panel-card {
  box-shadow: none;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 10px;
  margin-bottom: 8px;
  padding-top: 0;

  @media (max-width: 768px) {
    padding: 0 40px 60px 40px;
  }

  @media (max-width: 400px) {
    padding: 0 16px 32px 16px;
  }
}

.form__field-group-general {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 40px;

  @media (max-width: 400px) {
    padding-top: 16px;
  }
}

.form__field-people {
  display: flex;
  max-width: 901px;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap-reverse;
  align-items: flex-end;
}

.form__field-people-deleteBtn {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.form__field-people-count,
.form__field-date {
  display: flex;
  max-width: 720px;
  gap: 40px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
  }
}

.form__field-people-count {
  width: 100%;
}

.form__field-people-count-wrap,
.form__field-date-wrap,
.report__add-file,
.form__field-comment {
  display: flex;
  flex-direction: column;
}

.report__add-file {
  @media (max-width: 1024px) {
    max-width: 528px;
  }

  @media (max-width: 768px) {
    max-width: 620px;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
}

.form__field-link-wrap {
  display: flex;
  max-width: 901px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    align-items: stretch;
  }
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
  width: 100%;
  border-top: 1px solid #B6B6B6;
  margin-bottom: 16px;
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
  color: #1f7cc0;
  cursor: pointer;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.1px;
  min-width: 128px;
}

.add_eventBtn {
  background-color: transparent;
  color: #1F7CC0;
  border-color: #1F7CC0;
  margin: 28px 0 40px;
  max-height: 40px;
  height: 40px;
  padding: 8px 32px 8px 52px;
  width: 340px;

  @media (max-width: 1024px) {
    width: 244px;
  }

  @media (max-width: 768px) {
    width: 290px;
  }

  @media (max-width: 400px) {
    width: 296px;
  }
}

.add_eventBtn::before {
  content: url('@app/assets/icon_items/event-plus.svg');
  position: absolute;
  left: 122px;

  @media (max-width: 1024px) {
    left: 74px;
  }

  @media (max-width: 768px) {
    left: 96px;
  }

  @media (max-width: 400px) {
    left: 76px;
  }
}

.deleteEventBtn {
  background-color: #d2e4f2;
  min-width: 131px;
  max-height: 33px;
  min-height: 33px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  font-family: Akrobat;
  line-height: 21.1px;
  padding: 0;
  text-align: center;
  color: #1f7cc0;
  border-radius: 6px;
  margin: 0;
}

.form__field-result {
  margin-top: 25px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
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