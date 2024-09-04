<template>
  <div v-if="true" class="form__field-group">
    <div class="form__field-group-general" v-for="(event, index) in events" :key="index">
      <div class="form__field-people-count">
        <div class="form__field-people-count-wrap">
          <label class="form__label" for="participants_number">Общее количество человек, принявших участие в трудовом
            проекте <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="event.participants_number" id="participants_number" name="participants_number"
            class="form__input form__field-people-count-field" type="number" placeholder="Введите число"
            @focusout="focusOut" />
        </div>
        <div class="form__field-people-count-wrap">
          <label class="form__label" for="ro_participants_number">Количество человек из своего региона, принявших
            участие в трудовом проекте <sup class="valid-red">*</sup></label>
          <InputReport v-model:value="event.ro_participants_number" id="ro_participants_number"
            name="ro_participants_number" class="form__input form__field-people-count-field" type="number"
            placeholder="Введите число" @focusout="focusOut" />
        </div>
        <Button v-if="index > 0" label="Удалить мероприятие" class="deleteEventBtn" @click="deleteProject(index)" />
      </div>
      <div class="form__field-date" style="display: flex;">
        <div class="form__field-date-wrap">
          <label class="form__label" for="start_date">Дата начала проведения проекта <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="event.start_date" id="start_date" name="start_date"
            class="form__input form__field-date-wrap-field" type="date" @focusout="focusOut" />
        </div>
        <div class="form__field-date-wrap">
          <label class="form__label" for="end_date">Дата окончания проведения проекта <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="event.end_date" id="end_date" name="end_date"
            class="form__input form__field-date-wrap-field" type="date" @focusout="focusOut" />
        </div>
      </div>
      <div class="report__add-file">
        <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
        <InputReport isFile type="file" id="4" name="4" width="100%" height="86px" />
      </div>
      <div style="width: 100%;">
        <p class="form__label">Ссылка на группу трудового проекта в социальных сетях <sup class="valid-red">*</sup></p>
        <div class="form__field-link-wrap" v-for="(link, i) in events[index].links" :key="i">
          <InputReport v-model:value="link.link" :id="i" :name="i" class="form__input form__field-link-field"
            type="text" placeholder="Введите ссылку, например, https://vk.com/cco_monolit" @focusout="focusOut" />
          <div v-if="events[index].links.length === i + 1" @click="addLink(index)" class="add_link">+ Добавить ссылку
          </div>
          <div v-else class="add_link" @click="deleteLink(index, i)">Удалить</div>
        </div>
      </div>
    </div>
    <div>
      <Button class="add_eventBtn" label="Добавить проект" @click="addProject" />
    </div>
    <div class="form__field-comment">
      <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
      <TextareaReport v-model:value="fifthPanelData.comment" id="comment" name="comment" :rows="1" autoResize
        placeholder="Комментарий" @focusout="focusOut" :maxlength="3000" :max-length-text="3000" counter-visible />
    </div>
    <div>
      <v-checkbox label="Итоговое значение" />
    </div>
    <div class="hr"></div>
    <div>
      <p>0</p>
    </div>
  </div>

  <v-card v-else class="panel-card">
    <v-tabs v-model="tab">
      <v-tab value="one" class="panel-tab-btn">Отчет РО</v-tab>
      <v-tab value="two" class="panel-tab-btn">Корректировка ОШ</v-tab>
      <v-tab value="three" class="panel-tab-btn">Корректировка ЦШ</v-tab>
    </v-tabs>

    <v-card-text class="panel-card-text">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <div class="form__field-group">
            <div style="display: flex;">
              <div>
                <label class="form__label" for="1">Общее количество человек, принявших участие в трудовом проекте <sup
                    class="valid-red">*</sup></label>
                <InputReport id="1" name="1" class="form__input" type="number" placeholder="Введите число" />
              </div>
              <div>
                <label class="form__label" for="1_2">Количество человек из своего региона, принявших участие в трудовом
                  проекте <sup class="valid-red">*</sup></label>
                <InputReport id="1_2" name="1_2" class="form__input" type="number" placeholder="Введите число" />
              </div>
            </div>
            <div style="display: flex;">
              <div class="form__field">
                <label class="form__label" for="2">Дата начала проведения проекта <sup class="valid-red">*</sup></label>
                <InputReport id="2" name="2" class="form__input" type="date" />
              </div>
              <div class="form__field">
                <label class="form__label" for="3">Дата окончания проведения проекта <sup
                    class="valid-red">*</sup></label>
                <InputReport id="3" name="3" class="form__input" type="date" />
              </div>
            </div>
            <div>
              <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
              <InputReport type="file" id="4" name="4" />
            </div>
            <div>
              <label class="form__label" for="6">Ссылка на группу трудового проекта в социальных сетях <sup
                  class="valid-red">*</sup></label>
              <InputReport id="6" name="6" class="form__input" type="text" placeholder="https://vk.com/cco_monolit" />
              <InputReport id="7" name="7" class="form__input" type="text" placeholder="https://vk.com/ccorobot" />
              <InputReport id="8" name="8" class="form__input" type="text" placeholder="https://vk.com/cco_monolit11" />
            </div>
            <div>
              <label class="form__label" for="9">Комментарий <sup class="valid-red">*</sup></label>
              <InputReport id="9" name="9" class="form__input" type="textarea" placeholder="Комментарий"
                style="width: 100%; height: 100px" />
            </div>
            <div>
              <v-checkbox label="Итоговое значение" />
            </div>
            <div class="hr"></div>
            <div>
              <p>(4-1)*2+(4-2)+(4-3)=9</p>
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <form class="form__field-group" @submit.prevent>
            <div style="display: flex;">
              <div>
                <label class="form__label" for="_2">Общее количество человек, принявших участие в трудовом проекте <sup
                    class="valid-red">*</sup></label>
                <InputReport id="_2" name="_2" class="form__input" type="number" placeholder="Введите число" />
              </div>
              <div>
                <label class="form__label" for="2_2">Количество человек из своего региона, принявших участие в трудовом
                  проекте <sup class="valid-red">*</sup></label>
                <InputReport id="2_2" name="2_2" class="form__input" type="number" placeholder="Введите число" />
              </div>
              <Button label="Удалить проект" size="large" />
            </div>
            <div style="display: flex;">
              <div class="form__field">
                <label class="form__label" for="13">Дата начала проведения проекта <sup
                    class="valid-red">*</sup></label>
                <InputReport id="13" name="13" class="form__input" type="date" />
              </div>
              <div class="form__field">
                <label class="form__label" for="3">Дата окончания проведения проекта <sup
                    class="valid-red">*</sup></label>
                <InputReport id="14" name="14" class="form__input" type="date" />
              </div>
            </div>
            <div>
              <Button style="margin: 0" label="Добавить проект" size="large" />
            </div>
            <div class="form__field">
              <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
              <InputReport id="14" name="14" class="form__input" style="width: 100%" />
            </div>
            <div>
              <v-checkbox label="Итоговое значение" />
            </div>
            <div class="hr"></div>
            <div>
              <p>(4-1)*2+(4-2)+(4-3)=9</p>
            </div>
          </form>
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          <div class="form__field-group report-table">
            <div>
              <Button style="margin-right: 0" label="Удалить мероприятие" size="large" />
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
              <Button style="margin: 0" label="Добавить проект" size="large" />
            </div>
            <div class="form__field">
              <label class="form__label" for="15">Комментарий <sup class="valid-red">*</sup></label>
              <InputReport id="15" name="15" class="form__input" style="width: 100%" />
            </div>
            <div>
              <v-checkbox label="Итоговое значение" />
            </div>
            <div class="hr"></div>
            <div>
              <p>(4-1)*2+(4-2)+(4-3)=9</p>
            </div>
            <div>
              <v-checkbox label="Вернуть в РО на доработку" />
            </div>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from "@services/ReportService.ts";

const tab = ref('one');
const isFirstSent = ref(true);
const fifthPanelData = ref({
  comment: '',
  events: []
});
const events = ref([
  {
    participants_number: '',
    ro_participants_number: '',
    start_date: null,
    end_date: null,
    links: [
      {
        link: '',
      },
    ],
  }
]);
const addLink = (index) => {
  events.value[index].links.push({ link: '' })
};
const deleteLink = async (eventIndex, linkIndex) => {
  events.value[eventIndex].links.splice(linkIndex, 1);
  fifthPanelData.value.events = [...events.value];
  await reportPartTwoService.createReportDraft(fifthPanelData.value, '5');
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
const focusOut = async () => {
  fifthPanelData.value.events = [...events.value];
  try {
    if (isFirstSent.value) {
      await reportPartTwoService.createReport(fifthPanelData.value, '5');
    } else {
      await reportPartTwoService.createReportDraft(fifthPanelData.value, '5');
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
}
const deleteProject = async (index) => {
  events.value = events.value.filter((el, i) => index !== i);
  fifthPanelData.value.events = [...events.value];
  try {
    await reportPartTwoService.createReportDraft(fifthPanelData.value, '5');
  } catch (e) {
    console.log('deleteEvent error: ', e);
  }
};
watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport('5');
    if (data) {
      isFirstSent.value = false;
      events.value = [...data.events];
      fifthPanelData.value.comment = data.comment;
    }
  } catch (e) {
    console.log(e);
  }
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

  @media (max-width: 768px) {
    padding: 40px 40px 60px 40px;
  }

  @media (max-width: 400px) {
    padding: 16px 16px 32px 16px;
  }
}

.form__field-group-general {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  align-items: center;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
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
  margin: 35px 0 40px;
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
  width: 177px;
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
</style>