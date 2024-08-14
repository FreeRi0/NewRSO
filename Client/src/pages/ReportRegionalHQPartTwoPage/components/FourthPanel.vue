<template>
  <div v-if="true" class="form__field-group">
    <div v-for="(event, index) in events" :key="index" class="form__field-fourth-panel">
      <div class="form__field-members">
        <label class="form__label" for="participants_number">Количество человек, принявших участие в мероприятии <sup
            class="valid-red">*</sup></label>
        <div style="display: flex; justify-content: space-between;">
          <InputReport v-model:value="event.participants_number" :id="event.participants_number"
            name="participants_number" class="form__input" type="number" placeholder="Введите число"
            @focusout="focusOut" width="340px" />
          <Button v-if="index > 0" label="Удалить мероприятие" style="margin: 0;" @click="deleteEvent(index)" />
        </div>
      </div>
      <div class="form__field-date">
        <div class="form__field">
          <label class="form__label" for="start_date">Дата начала проведения мероприятия <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="event.start_date" :id="event.start_date" name="start_date" class="form__input"
            type="date" @focusout="focusOut" />
        </div>
        <div class="form__field">
          <label class="form__label" for="end_date">Дата окончания проведения мероприятия <sup
              class="valid-red">*</sup></label>
          <InputReport v-model:value="event.end_date" :id="event.end_date" name="end_date" class="form__input"
            type="date" @focusout="focusOut" />
        </div>
      </div>
      <div class="form__field-event">
        <div>
          <label class="form__label" for="4">Положение о мероприятии <sup class="valid-red">*</sup></label>
          <InputReport type="file" id="4" name="4" />
        </div>
        <div>
          <p class="form__label">Межрегиональное <sup class="valid-red">*</sup></p>
          <div style="display: flex" class="form__label-radio">
            <div style="display: flex">
              <input v-model="event.is_interregional" type="radio" :id="`is_interregional-true_${index}`"
                :value="true" />
              <label :for="`is_interregional-true_${index}`">
                Да
              </label>
            </div>
            <div style="display: flex">
              <input v-model="event.is_interregional" type="radio" :id="`is_interregional-false_${index}`"
                :value="false" />
              <label :for="`is_interregional-false_${index}`">
                Нет
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="form__label">Ссылка на группу мероприятия в социальных сетях <sup class="valid-red">*</sup></p>
        <div style="display: flex;" v-for="(link, i) in events[index].links" :key="i">
          <InputReport
              v-model:value="link.link"
              :id="i"
              :name="i"
              class="form__input"
              type="text"
              placeholder="https://vk.com/cco_monolit"
              @focusout="focusOut"
          />
          <Button
              v-if="events[index].links.length === i+1"
              label="+ Добавить ссылку"
              @click="addLink(index)"
          />
          <Button
              v-else
              label="Удалить"
              @click="deleteLink(index, i)"
          />
        </div>
      </div>
    </div>

    <div>
      <Button style="margin: 0" label="+ Добавить мероприятие" @click="addEvent" />
    </div>
    <div>
      <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
      <InputReport v-model:value="fourthPanelData.comment" id="comment" name="comment" class="form__input"
        type="textarea" placeholder="Укажите наименования организованных мероприятий" style="width: 100%;"
        @focusout="focusOut" />
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
            <div>
              <label class="form__label" for="1">Количество человек, принявших участие в мероприятии <sup
                  class="valid-red">*</sup></label>
              <InputReport id="1" name="1" class="form__input" type="number" placeholder="Введите число" />
            </div>
            <div style="display: flex;">
              <div class="form__field">
                <label class="form__label" for="2">Дата начала проведения мероприятия <sup
                    class="valid-red">*</sup></label>
                <InputReport id="2" name="2" class="form__input" type="date" />
              </div>
              <div class="form__field">
                <label class="form__label" for="3">Дата окончания проведения мероприятия <sup
                    class="valid-red">*</sup></label>
                <InputReport id="3" name="3" class="form__input" type="date" />
              </div>
            </div>
            <div style="display: flex;">
              <div>
                <label class="form__label" for="4">Положение о мероприятии <sup class="valid-red">*</sup></label>
                <InputReport type="file" id="4" name="4" />
              </div>
              <div>
                <label class="form__label" for="5">Межрегиональное <sup class="valid-red">*</sup></label>
                <InputReport type="radio" id="5" name="5" />
              </div>
            </div>
            <div>
              <label class="form__label" for="6">Ссылка на группу мероприятия в социальных сетях <sup
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
                <label class="form__label" for="10">Количество человек, принявших участие в мероприятии <sup
                    class="valid-red">*</sup></label>
                <InputReport id="10" name="10" class="form__input" type="number" placeholder="Введите число" />
              </div>
              <div>
                <label class="form__label" for="11">Межрегиональное <sup class="valid-red">*</sup></label>
                <div style="display: flex;">
                  <InputReport id="11" name="11" class="form__input" type="radio" />
                  <InputReport id="12" name="12" class="form__input" type="radio" />
                </div>
              </div>
              <Button label="Удалить мероприятие" />
            </div>
            <div style="display: flex;">
              <div class="form__field">
                <label class="form__label" for="13">Дата начала проведения мероприятия <sup
                    class="valid-red">*</sup></label>
                <InputReport id="13" name="13" class="form__input" type="date" />
              </div>
              <div class="form__field">
                <label class="form__label" for="3">Дата окончания проведения мероприятия <sup
                    class="valid-red">*</sup></label>
                <InputReport id="14" name="14" class="form__input" type="date" />
              </div>
            </div>
            <div>
              <Button style="margin: 0" label="Добавить мероприятие" size="large" />
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
            <label class="form__label">Количество человек, принявших участие в мероприятии <sup
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
            <label class="form__label">Межрегиональное <sup class="valid-red">*</sup></label>
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
            <div>
              <label class="form__label" for="11">Межрегиональное <sup class="valid-red">*</sup></label>
              <div style="display: flex;">
                <InputReport id="11" name="11" class="form__input" type="radio" />
                <InputReport id="12" name="12" class="form__input" type="radio" />
              </div>
            </div>
            <label class="form__label">Дата начала проведения мероприятия <sup class="valid-red">*</sup></label>
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
            <label class="form__label">Дата окончания проведения мероприятия <sup class="valid-red">*</sup></label>
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
              <Button style="margin: 0" label="Добавить мероприятие" size="large" />
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
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { reportPartTwoService } from "@services/ReportService.ts";

const tab = ref('one');
const isFirstSent = ref(true);
const fourthPanelData = ref({
  comment: '',
  events: []
});
const events = ref([
  {
    participants_number: '',
    start_date: null,
    end_date: null,
    links: [
      {
        link: '',
      },
    ],
    is_interregional: false,
  }
]);
const addLink = (index) => {
  events.value[index].links.push({ link: '' })
};
const deleteLink = async (eventIndex, linkIndex) => {
  events.value[eventIndex].links.splice(linkIndex, 1);
  fourthPanelData.value.events = [ ...events.value ];
  await reportPartTwoService.createReportDraft(fourthPanelData.value, '4');
};
const addEvent = () => {
  events.value.push({
    participants_number: '',
    start_date: null,
    end_date: null,
    links: [
      {
        link: '',
      },
    ],
    is_interregional: false,
  })
};
const focusOut = async () => {
  fourthPanelData.value.events = [...events.value];
  try {
    if (isFirstSent.value) {
      await reportPartTwoService.createReport(fourthPanelData.value, '4');
    } else {
      await reportPartTwoService.createReportDraft(fourthPanelData.value, '4');
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};
const deleteEvent = async (index) => {
  events.value = events.value.filter((el, i) => index !== i);
  fourthPanelData.value.events = [...events.value];
  try {
    await reportPartTwoService.createReportDraft(fourthPanelData.value, '4');
  } catch (e) {
    console.log('deleteEvent error: ', e);
  }
};
watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport('4');
    if (data.length) {
      isFirstSent.value = false;
      for (let item of data) {
        if (item.regional_headquarter === 1) {
          events.value = item.events;
          fourthPanelData.value.comment = item.comment;
        }
      }
      // events.value = [...data[0].events];
      // fourthPanelData.value.comment = data[0].comment;
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
<style lang="scss" scoped>
.form__field-fourth-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.panel-card {
  box-shadow: none;
}

.form__field-group {
  background: #F3F4F5;
  border: none;
  border-radius: 0 0 10px 10px;
  margin-bottom: 8px;
}

.form__field-members {
  max-width: 340px;
  max-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form__field-date {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  max-width: 720px;
  height: 90px;
}

.form__field-event {
  display: flex;
  max-width: 923px;
  height: 115px;
  justify-content: space-between;
}

.form__label-radio {
  display: flex;
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
</style>