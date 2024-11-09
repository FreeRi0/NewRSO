<template>
  <div v-if="!(props.centralExpert || props.districtExpert || reportStore.isReportReject?.fifth)"
       class="form__field-group">
    <div class="form__field-group-general" v-for="(event, index) in events" :key="index">
      <div class="form__field-people">
        <div class="form__field-people-count">
          <div class="form__field-people-count-wrap">
            <label class="form__label" for="participants_number">Общее количество человек, принявших участие в трудовом
              проекте <sup class="valid-red">*</sup></label>
            <InputReport
                v-model:value="event.participants_number"
                id="participants_number"
                name="participants_number"
                class="form__input form__field-people-count-field"
                type="number"
                placeholder="Введите число"
                :maxlength="10"
                :min="0"
                :max="2147483647"
                @focusout="focusOut($event)"
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
                :disabled="isSent || !event.participants_number"
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
      <div class="form__field-date">
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
              :disabled="isSent || !event.participants_number"
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
              :disabled="isSent || !event.participants_number"
              :min-date="event.start_date"
              :is-error-date="Object.values(isErrorDate).some(item => item.error === true && item.id === index)"
          />
        </div>
      </div>
      <div class="report__add-file">
        <div class="form__field-people-count-wrap">
          <label class="form__label" for="eventName">Название трудового проекта <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="event.name"
              id="eventName"
              name="eventName"
              class="form__input form__field-people-count-field"
              placeholder="Введите название"
              @focusout="focusOut"
              :disabled="isSent || !event.participants_number"
          />
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
              :disabled="isSent || !event.participants_number"
              :is-link="true"
              @error="setError"
          />
          <div v-if="!isSent && event.participants_number">
            <div
                v-if="events[index].links.length === i + 1"
                @click="addLink(index)"
                class="add_link"
            >+ Добавить ссылку
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

      <div class="hr"></div>
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
          :rows="row"
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
      <v-checkbox class="result-checkbox" id="v-checkbox" @change="calculateResult($event)"/>
      <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
    </div>
    <div class="hr"></div>
    <div>
      <p>{{ finalResult.toFixed(1) }}</p>
    </div>
  </div>

  <report-tabs v-else :isReject="reportStore.isReportReject.fifth">

    <template v-slot:firstTab>
      <div class="form__field-group-general" v-for="(event, index) in events" :key="index">
        <div class="form__field-people">
          <div class="form__field-people-count">
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="participants_number">
                Общее количество человек, принявших участие в трудовом проекте
                <sup class="valid-red">*</sup>
              </label>
              <InputReport
                  v-model:value="event.participants_number"
                  id="participants_number"
                  name="participants_number"
                  class="form__input form__field-people-count-field"
                  type="number"
                  placeholder="Введите число"
                  @focusout="focusOut"
                  :disabled="props.centralExpert || props.districtExpert"
              />
            </div>
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="ro_participants_number">
                Количество человек из&nbsp;своего региона, принявших участие в&nbsp;трудовом проекте
                <sup class="valid-red">*</sup>
              </label>
              <InputReport
                  v-model:value="event.ro_participants_number"
                  id="ro_participants_number"
                  name="ro_participants_number"
                  class="form__input form__field-people-count-field"
                  type="number"
                  placeholder="Введите число"
                  @focusout="focusOut"
                  :disabled="props.centralExpert || props.districtExpert"
              />
            </div>
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
                :disabled="props.centralExpert || props.districtExpert"
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
                :disabled="props.centralExpert || props.districtExpert"
            />
          </div>
        </div>
        <div class="report__add-file">
          <div class="form__field-people-count-wrap">
            <label class="form__label" for="eventName">Название трудового проекта <sup
                class="valid-red">*</sup></label>
            <InputReport
                v-model:value="event.name"
                id="eventName"
                name="eventName"
                class="form__input form__field-people-count-field"
                placeholder="Введите название"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert"
            />
          </div>
        </div>
        <div style="width: 100%;">
          <p class="form__label">Ссылка на группу трудового проекта в социальных сетях
          </p>
          <div class="form__field-link-wrap" v-for="(link, i) in events[index].links" :key="i">
            <InputReport
                v-model:value="link.link"
                :id="i"
                :name="i"
                class="form__input form__field-link-field"
                type="text"
                placeholder="Введите ссылку"
                @focusout="focusOut"
                :disabled="props.centralExpert || props.districtExpert"
            />
          </div>
        </div>
        <div class="hr"></div>
      </div>
      <div class="form__field-comment">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport
            v-model:value="fifthPanelData.comment"
            id="comment"
            name="comment"
            :rows="row"
            autoResize
            placeholder="Комментарий"
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            @focusout="focusOut"
            :disabled="props.centralExpert || props.districtExpert"
        />
      </div>
      <div class="form__field-result">
        <v-checkbox class="result-checkbox" id="v-checkbox" @change="calculateResult($event)"/>
        <label class="result-checkbox-text" for="v-checkbox">Итоговое значение</label>
      </div>
      <div class="hr"></div>
      <div>
        <p>{{ finalResult.toFixed(1) }}</p>
      </div>
    </template>

    <template v-slot:secondTab>
      <div class="form__field-group-general" v-for="(event, index) in fifthPanelDataDH.events" :key="index">
        <div class="form__field-people">
          <div class="form__field-people-count">
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="participants_number">Общее количество человек, принявших участие в
                трудовом
                проекте <sup class="valid-red">*</sup></label>
              <InputReport
                  v-model:value="event.participants_number"
                  id="participants_number"
                  name="participants_number"
                  class="form__input form__field-people-count-field"
                  type="number"
                  placeholder="Введите число"
                  :disabled="props.centralExpert || reportStore.isReportReject?.fifth"
              />
            </div>
            <div class="form__field-people-count-wrap">
              <label class="form__label" for="ro_participants_number">Количество человек из&nbsp;своего региона,
                принявших
                участие в&nbsp;трудовом проекте <sup class="valid-red">*</sup></label>
              <InputReport
                  v-model:value="event.ro_participants_number"
                  id="ro_participants_number"
                  name="ro_participants_number"
                  class="form__input form__field-people-count-field"
                  type="number"
                  placeholder="Введите число"
                  :disabled="props.centralExpert || reportStore.isReportReject?.fifth"
              />
            </div>
          </div>
          <!--          <div class="form__field-people-deleteBtn">-->
          <!--            <Button-->
          <!--                v-if="index > 0 && !props.centralExpert"-->
          <!--                label="Удалить проект"-->
          <!--                class="deleteEventBtn"-->
          <!--            />-->
          <!--            &lt;!&ndash;@click="deleteProjectDH(index)"&ndash;&gt;-->
          <!--          </div>-->
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
                :disabled="props.centralExpert || reportStore.isReportReject?.fifth"
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
                :disabled="props.centralExpert || reportStore.isReportReject?.fifth"
            />
          </div>
        </div>

        <div class="form__field-people-count-wrap">
          <label class="form__label" for="eventName">Название трудового проекта <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="event.name"
              id="eventName"
              name="eventName"
              class="form__input form__field-people-count-field"
              placeholder="Введите название"
              :disabled="props.centralExpert || reportStore.isReportReject?.fifth"
          />
        </div>
        <div class="hr"></div>
      </div>

      <!--      <div v-if="!props.centralExpert">-->
      <!--        <Button class="add_eventBtn" label="Добавить проект" @click="addProjectDH"/>-->
      <!--      </div>-->
      <div class="form__field-comment" style="margin-top: 10px;">
        <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
        <TextareaReport
            v-model:value="fifthPanelDataDH.comment"
            id="comment"
            name="comment"
            :rows="1"
            autoResize
            placeholder="Примечания, ссылки"
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            :disabled="props.centralExpert || reportStore.isReportReject?.fifth"
        />
      </div>
      <div class="form__field-result">
        <v-checkbox class="result-checkbox" id="v-checkboxDH" @change="calculateResultDH($event)"/>
        <label class="result-checkbox-text" for="v-checkboxDH">Итоговое значение</label>
      </div>
      <div class="hr"></div>
      <div>
        <p>{{ finalResultDH.toFixed(1) }}</p>
      </div>
    </template>

    <template v-slot:thirdTab>
      <div v-for="(eventCH, index) in commonData" :key="index" class="form__field-fourth-panel">
        <div class="form__field-people-count-wrap" style="margin-bottom: 16px;">
          <label class="form__label" for="eventName">Название трудового проекта <sup
              class="valid-red">*</sup></label>
          <InputReport
              v-model:value="eventCH.dataRH.name"
              id="eventCH.dataRH.name"
              name="eventCH.dataRH.name"
              class="form__input form__field-people-count-field"
              disabled
          />
        </div>
        <label class="form__label">Общее количество человек, принявших участие в трудовом проекте <sup
            class="valid-red">*</sup></label>
        <v-table>
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ eventCH.dataRH.participants_number }}</td>
            <td class="report-table__td report-table__td__center">{{ eventCH.dataDH.participants_number }}</td>
            <td class="report-table__td">
              <InputReport
                  v-model:value="eventCH.dataCH.participants_number"
                  :id="'participants_numberCH'"
                  :name="'participants_numberCH'"
                  style="width: 100%;"
                  type="number"
                  placeholder="0"
                  :maxlength="10"
                  :min="0"
                  :max="9999999999"
                  :step="0.01"
                  :disabled="reportStore.isReportReject?.fifth && !props.centralExpert"
              />
            </td>
          </tr>
          </tbody>
        </v-table>
        <label class="form__label">Количество человек из&nbsp;своего региона, принявших участие в&nbsp;трудовом проекте
          <sup
              class="valid-red">*</sup></label>
        <v-table>
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ eventCH.dataRH.ro_participants_number }}</td>
            <td class="report-table__td report-table__td__center">{{ eventCH.dataDH.ro_participants_number }}</td>
            <td class="report-table__td">
              <InputReport
                  v-model:value="eventCH.dataCH.ro_participants_number"
                  :id="'participants_numberCH'"
                  :name="'participants_numberCH'"
                  style="width: 100%;"
                  type="number"
                  placeholder="0"
                  :maxlength="10"
                  :min="0"
                  :max="9999999999"
                  :step="0.01"
                  :disabled="reportStore.isReportReject?.fifth && !props.centralExpert"
              />
            </td>
          </tr>
          </tbody>
        </v-table>
        <label class="form__label">Дата начала проведения проекта <sup class="valid-red">*</sup></label>
        <v-table>
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ formattedDate(eventCH.dataRH.start_date) }}</td>
            <td class="report-table__td report-table__td__center">{{ formattedDate(eventCH.dataDH.start_date) }}</td>
            <td class="report-table__td">
              <InputReport
                  v-model:value="eventCH.dataCH.start_date"
                  :id="'eventCH.dataCH.end_date'"
                  name="eventCH.dataCH.end_date"
                  class="form__input"
                  type="date"
                  :disabled="reportStore.isReportReject?.fifth && !props.centralExpert"
              />
            </td>
          </tr>
          </tbody>
        </v-table>
        <label class="form__label">Дата окончания проведения проекта <sup class="valid-red">*</sup></label>
        <v-table>
          <tbody>
          <tr class="report-table__tr">
            <td class="report-table__th">Данные РО</td>
            <td class="report-table__th report-table__th__br-center">Корректировка ОШ</td>
            <td class="report-table__th">Корректировка ЦШ</td>
          </tr>
          <tr>
            <td class="report-table__td">{{ formattedDate(eventCH.dataRH.end_date) }}</td>
            <td class="report-table__td report-table__td__center">{{ formattedDate(eventCH.dataDH.end_date) }}</td>
            <td class="report-table__td">
              <InputReport
                  v-model:value="eventCH.dataCH.end_date"
                  :id="'eventCH.dataCH.end_date'"
                  name="eventCH.dataCH.end_date"
                  class="form__input"
                  type="date"
                  :disabled="reportStore.isReportReject?.fifth && !props.centralExpert"
              />
            </td>
          </tr>
          </tbody>
        </v-table>
        <div class="hr" style="margin-bottom: 30px;"></div>
      </div>

      <div class="form__field" style="margin-bottom: 0;">
        <label class="form__label" for="commentCH">Комментарий <sup class="valid-red">*</sup></label>
        <!--        <InputReport v-model:value="commentCH" id="15" name="15" class="form__input" style="width: 100%"/>-->
        <TextareaReport
            v-model:value="commentCH"
            id="commentCH"
            name="commentCH"
            autoResize
            placeholder="Комментарий"
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            :disabled="reportStore.isReportReject?.fifth && !props.centralExpert"
        />
      </div>
      <!-- <div>
        <v-checkbox label="Итоговое значение"/>
      </div>
      <div class="hr"></div>
      <div>
        <p>(4-1)*2+(4-2)+(4-3)=9</p>
      </div> -->
      <div>
        <v-checkbox
            v-model="reportStore.returnReport.fifth"
            label="Вернуть в РО на доработку"
            @change="onReportReturn"
            :disabled="reportStore.isReportReject?.fifth && !props.centralExpert"
        />
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import {onMounted, ref, watch, watchEffect, watchPostEffect} from "vue";
import {InputReport, TextareaReport} from '@shared/components/inputs';
import {Button} from '@shared/components/buttons';
import {reportPartTwoService} from "@services/ReportService.ts";
import {ReportTabs} from './index';
import {useReportPartTwoStore} from "@pages/ReportRegionalHQPartTwoPage/store.ts";
import {formattedDate} from "@pages/ReportRegionalHQPartTwoPage/Helpers.js";

// const swal = inject('$swal');
const reportStore = useReportPartTwoStore();

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  data: Object,
});
const emit = defineEmits(['getData', 'getDataDH', 'getDataCH']);

const isFirstSent = ref(true);
const fifthPanelData = ref({
  comment: '',
  events: [],
});
const fifthPanelDataDH = ref({
  comment: '',
  events: [{
    participants_number: '',
    ro_participants_number: '',
    start_date: null,
    end_date: null,
    name: '',
  }]
});
const events = ref([
  {
    participants_number: '',
    ro_participants_number: '',
    start_date: null,
    end_date: null,
    name: '',
    links: [
      {
        link: '',
      },
    ],
  }
]);
const isSent = ref(false);
const isErrorDate = ref({});
const isLinkError = ref(false);
const finalResult = ref(0);
const finalResultDH = ref(0);
const commonData = ref([]);
const commentCH = ref();
const row = ref(1);

const focusOut = async () => {
  if (!isLinkError.value) {
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
    }
  }
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
    name: '',
    links: [
      {
        link: '',
      },
    ],
  })
};
// const addProjectDH = () => {
//   fifthPanelDataDH.value.events.push({
//     participants_number: '',
//     ro_participants_number: '',
//     start_date: null,
//     end_date: null,
//     name: '',
//   })
// };
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
    // if (event.regulations) formData.append(`events[${i}][regulations]`, event.regulations);
    if (event.name) formData.append(`events[${i}][name]`, event.name);
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
// const deleteProjectDH = (index) => {
//   fifthPanelDataDH.value.events = fifthPanelDataDH.value.events.filter((el, i) => index !== i);
// };

const setFormData = (file = null, index = null, isDeleteEvent = false, isDeleteFile = false, isLinkDelete = false, linkIndex = null) => {
  let formData = new FormData();

  formData.append('comment', fifthPanelData.value.comment || '');
  events.value.forEach((event, i) => {
    // Логика обнуления проекта при нулевом количестве участников
    if (!(+event.participants_number)) {
      event.name = null;
      event.ro_participants_number = null;
      event.end_date = null;
      event.start_date = null;
      event.links = [];
      // formData.append(`events[${i}][regulations]`, '');
    }
    if (isDeleteEvent && index === i) {
      return;
    } else {
      if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
      if (event.ro_participants_number) formData.append(`events[${i}][ro_participants_number]`, event.ro_participants_number);
      if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
      if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
      if (event.name) formData.append(`events[${i}][name]`, event.name);
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

      if (reportStore.isReportReject.fifth && !isDeleteFile) {
        console.log('here')
        if (event.regulations) formData.append(`events[${i}][regulations]`, event.regulations);
        // if (event.file_size) formData.append(`events[${i}][file_size]`, event.file_size);
        // if (event.file_type) formData.append(`events[${i}][file_type]`, event.file_type);
      }
    }
  })
  return formData;
};

const setError = (err) => {
  isLinkError.value = err;
};

const calculateResult = (event) => {
  if (event.target.checked) {
    events.value.forEach(e => {
      const startDate = new Date(e.start_date);
      const endDate = new Date(e.end_date);
      const days = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      finalResult.value += Math.abs((e.participants_number - e.ro_participants_number) * days)
    })
  } else {
    finalResult.value = 0;
  }
};

const calculateResultDH = (event) => {
  if (event.target.checked) {
    fifthPanelDataDH.value.events.forEach(e => {
      const startDate = new Date(e.start_date);
      const endDate = new Date(e.end_date);
      const days = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      finalResultDH.value += Math.abs((e.participants_number - e.ro_participants_number) * days)
    })
  } else {
    finalResultDH.value = 0;
  }
};

const onReportReturn = (event) => {
  let formData = new FormData();
  if (event.target.checked) {
    reportStore.returnReport.fifth = true;
    reportStore.reportDataCH.fifth.events = [];
    commonData.value.forEach(e => {
      reportStore.reportDataCH.fifth.events.push(e.dataCH)
    });

    reportStore.reportDataCH.fifth.comment = commentCH.value || '';
    formData.append('comment', commentCH.value || '');
    formData.append('reasons[comment]', commentCH.value);

    reportStore.reportDataCH.fifth.events.forEach((event, i) => {
      if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
      if (event.ro_participants_number) formData.append(`events[${i}][ro_participants_number]`, event.ro_participants_number);
      if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
      if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    });

    emit('getDataCH', formData, 5);
  } else {
    reportStore.returnReport.fifth = false;
    reportStore.reportDataCH.fifth.events = [];
    commonData.value.forEach(e => {
      reportStore.reportDataCH.fifth.events.push(e.dataCH)
    });

    reportStore.reportDataCH.fifth.comment = commentCH.value || '';
    formData.append('comment', commentCH.value || '');

    reportStore.reportDataCH.fifth.events.forEach((event, i) => {
      if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
      if (event.ro_participants_number) formData.append(`events[${i}][ro_participants_number]`, event.ro_participants_number);
      if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
      if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    });

    emit('getDataCH', formData, 5);
  }
}

onMounted(() => {
  // Мапинг данных для отчета эксперта ОШ
  if (reportStore.reportDataDH.fifth && props.districtExpert) {
    fifthPanelDataDH.value.events = [...reportStore.reportDataDH.fifth.events];
    fifthPanelDataDH.value.comment = reportStore.reportDataDH.fifth.comment;
  }

  // Мапинг данных для отчета эксперта ЦШ
  if (reportStore.reportForCheckCH.fifth && props.centralExpert) {
    const eventQuantity = reportStore.reportForCheckCH.fifth.events.length;

    // Добавление данных панели "отчет РО"
    const reportDataRH = JSON.parse(reportStore.reportForCheckCH.fifth.regional_version);
    events.value = reportDataRH.events;
    fifthPanelData.value.comment = reportDataRH.comment || '';

    // Добавление данных панели "корректировка ОШ"
    fifthPanelDataDH.value.events = reportStore.reportForCheckCH.fifth.events;
    fifthPanelDataDH.value.comment = reportStore.reportForCheckCH.fifth.comment;

    // Добавление данных из стора для панели "корректировка ЦШ"
    commentCH.value = reportStore.reportDataCH.fifth.comment || '';
    for (let i = 0; i < eventQuantity; i++) {
      commonData.value[i] = {
        dataRH: reportDataRH.events[i],
        dataDH: reportStore.reportForCheckCH.fifth.events[i],
        dataCH: reportStore.reportDataCH.fifth.events[i],
        //     ? reportStore.reportDataCH.fifth.events[i] : {
        //   participants_number: '',
        //   ro_participants_number: '',
        //   start_date: null,
        //   end_date: null,
        // }
      }
    }

    console.log('commonData', commonData.value)
  }

});

watchEffect(() => {
  if (props.data) {
    isFirstSent.value = false;
    events.value = [...props.data.events];
    fifthPanelData.value.comment = props.data.comment || '';
    isSent.value = props.data.is_sent;

    isFirstSent.value = reportStore.isReportReject.fifth && !props.data.central_version;
    console.log('isFirstSent.value for fifth_1::::::', isFirstSent.value)
  }

  // Мапинг данных для отчета командира РШ при возвращении на доработку
  if (reportStore.reportReject.fifth && reportStore.isReportReject.fifth) {
    console.log('reportStore.reportReject.fifth', reportStore.reportReject.fifth)
    console.log('props.data', props.data)

    reportStore.returnReport.fifth = true;
    // Добавление данных панели "корректировка ОШ"
    const reportDataDH = JSON.parse(reportStore.reportReject.fifth.district_version);

    fifthPanelDataDH.value.events = reportDataDH.events;
    fifthPanelDataDH.value.comment = reportDataDH.comment;

    // Добавление данных для панели "корректировка ЦШ"
    if (props.data.central_version) {
      // Отчет создан:
      commentCH.value = props.data.central_version.comment || '';
      for (let i = 0; i < props.data.events.length; i++) {
        commonData.value[i] = {
          dataRH: props.data.events[i],
          dataDH: reportDataDH.events[i],
          dataCH: props.data.central_version.events[i],
        }
      }
    } else {
      // Отчет не создан:
      const reportDataRH = JSON.parse(reportStore.reportReject.fifth.regional_version);
      commentCH.value = reportStore.reportReject.fifth.comment || '';

      console.log('reportDataRH', reportDataRH)
      for (let i = 0; i < props.data.events.length; i++) {
        commonData.value[i] = {
          dataRH: reportDataRH.events[i],
          dataDH: reportDataDH.events[i],
          dataCH: reportStore.reportReject.fifth.events[i],
        }
      }
    }
  }
});

watchPostEffect(() => {
  events.value.forEach((event) => {
    if (!event.links.length) event.links.push({link: ''})
  });
  if (!events.value.length) {
    addProject()
  }
});

watch(fifthPanelDataDH.value, () => {
  let formData = new FormData();
  reportStore.reportDataDH.fifth = fifthPanelDataDH.value;

  formData.append('comment', fifthPanelDataDH.value.comment || '');
  fifthPanelDataDH.value.events.forEach((event, i) => {
    if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
    if (event.ro_participants_number) formData.append(`events[${i}][ro_participants_number]`, event.ro_participants_number);
    if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
    if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    if (event.name) formData.append(`events[${i}][name]`, event.name);
  });

  emit('getDataDH', formData, 5);
}, {
  deep: true
});

watch([commonData, commentCH], () => {
  let formData = new FormData();

  reportStore.reportDataCH.fifth.events = [];
  commonData.value.forEach(e => {
    reportStore.reportDataCH.fifth.events.push(e.dataCH)
  });

  reportStore.reportDataCH.fifth.comment = commentCH.value || '';
  formData.append('comment', reportStore.reportDataCH.fifth.comment || '');
  if (reportStore.returnReport.fifth) formData.append('reasons[comment]', commentCH.value || '');

  reportStore.reportDataCH.fifth.events.forEach((event, i) => {
    if (event.participants_number) formData.append(`events[${i}][participants_number]`, event.participants_number);
    if (event.ro_participants_number) formData.append(`events[${i}][ro_participants_number]`, event.ro_participants_number);
    if (event.end_date) formData.append(`events[${i}][end_date]`, event.end_date);
    if (event.start_date) formData.append(`events[${i}][start_date]`, event.start_date);
    // if (event.name) formData.append(`events[${i}][name]`, event.name);
  });

  emit('getDataCH', formData, 5);
}, {
  deep: true
});
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

    //&__br-left {
    //  border-radius: 10px 0 0 0;
    //  border-right: 1px solid #B6B6B6;
    //}
    //
    //&__br-right {
    //  border-radius: 0 10px 0 0;
    //  border-left: 1px solid #B6B6B6;
    //}

    &__br-center {
      border-left: 1px solid #B6B6B6;
      border-right: 1px solid #B6B6B6;
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