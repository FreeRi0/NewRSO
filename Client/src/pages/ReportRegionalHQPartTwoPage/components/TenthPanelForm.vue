<template>
  <div v-if="true" class="form__field-group">
    <div style="display: flex; justify-content: space-between;">
      <div>
        <p class="form__title">Всероссийская патриотическая акция «Снежный Десант РСО»</p>
      </div>
      <div>
        <Button
            class="form__btn"
            style="margin: 0"
            label="Свернуть"
        />
      </div>
    </div>
    <div class="form__field">
      <p
          class="form__label"
      >Проведение акции <sup class="valid-red">*</sup></p>
      <div style="display: flex">
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelData.event_happened"
              id="event_happened-true"
              class="form__input"
              type="radio"
              :value="true"
          />
          <label for="event_happened-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelData.event_happened"
              id="event_happened-false"
              class="form__input"
              type="radio"
              :value="false"
          />
          <label for="event_happened-false">Нет</label>
        </div>
      </div>
      <div>
        <label
            class="form__label"
            for="4"
        >Скан документа, подтверждающего проведение акции</label>
        <InputReport
            type="file"
            id="4"
            name="4"
        />
      </div>
      <div>
        <p
            class="form__label"
        >Ссылка на социальные сети/электронные
          СМИ, подтверждающая проведение акции <sup class="valid-red">*</sup></p>
        <div style="display: flex;" v-for="(link, i) in tenthPanelData.links" :key="i">
          <InputReport
              v-model:value="link.link"
              :id="i"
              :name="i"
              class="form__input"
              type="text"
              placeholder="https://vk.com/cco_monolit"
              @focusout="formData"
          />
          <Button
              label="+ Добавить ссылку"
              @click="addLink"
          />
        </div>
      </div>
    </div>
  </div>
  <v-card v-else class="panel-card" >
    <v-tabs
        v-model="tab"
    >
      <v-tab value="one" class="panel-tab-btn">Отчет РО</v-tab>
      <v-tab value="two" class="panel-tab-btn">Корректировка ОШ</v-tab>
      <v-tab value="three" class="panel-tab-btn">Корректировка ЦШ</v-tab>
    </v-tabs>

    <v-card-text class="panel-card-text">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <div class="form__field-group">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <p>Всероссийская патриотическая акция «Снежный Десант РСО»</p>
              </div>
              <div>
                <Button
                    style="margin: 0;"
                    label="Свернуть"
                />
              </div>
            </div>
            <div class="form__field">
              <p
                  class="form__label"
              >Проведение акции <sup class="valid-red">*</sup></p>
              <div style="display: flex; align-items: center">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label for="2">Да</label>
              </div>

            </div>
            <div>
              <label
                  class="form__label"
                  for="4"
              >Скан документа, подтверждающего проведение акции</label>
              <InputReport
                  type="file"
                  id="4"
                  name="4"
              />
            </div>
            <div>
              <label
                  class="form__label"
                  for="6"
              >Ссылка на социальные сети/ электронные
                СМИ, подтверждающая проведение акции <sup class="valid-red">*</sup></label>
              <InputReport
                  id="6"
                  name="6"
                  class="form__input"
                  type="text"
                  placeholder="https://vk.com/cco_monolit"
              />
              <InputReport
                  id="7"
                  name="7"
                  class="form__input"
                  type="text"
                  placeholder="https://vk.com/ccorobot"
              />
              <InputReport
                  id="8"
                  name="8"
                  class="form__input"
                  type="text"
                  placeholder="https://vk.com/cco_monolit11"
              />
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <div class="form__field-group">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <p>Всероссийская патриотическая акция «Снежный Десант РСО»</p>
              </div>
              <div>
                <Button
                    style="margin: 0;"
                    label="Свернуть"
                />
              </div>
            </div>
            <div class="form__field">
              <p
                  class="form__label"
              >Проведение акции <sup class="valid-red">*</sup></p>
              <div style="display: flex">
                <div style="display: flex">
                  <InputReport
                      id="2"
                      name="2"
                      class="form__input"
                      type="radio"
                  />
                  <label>Да</label>
                </div>
                <div style="display: flex">
                  <InputReport
                      id="2"
                      name="2"
                      class="form__input"
                      type="radio"
                  />
                  <label>Нет</label>
                </div>
              </div>
            </div>
            <div class="form__field">
              <label
                  class="form__label"
                  for="14"
              >Комментарий <sup class="valid-red">*</sup></label>
              <InputReport
                  id="14"
                  name="14"
                  class="form__input"
                  style="width: 100%"
              />
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          <div class="form__field-group report-table">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <p>Всероссийская патриотическая акция «Снежный Десант РСО»</p>
              </div>
              <div>
                <Button
                    style="margin: 0;"
                    label="Свернуть"
                />
              </div>
            </div>
            <label
                class="form__label"
            >Проведение акции <sup class="valid-red">*</sup></label>
            <v-table>
              <tbody>
              <tr class="report-table__tr">
                <td class="report-table__th report-table__th__br-left">Данные РО</td>
                <td class="report-table__th">Корректировка ОШ</td>
                <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
              </tr>
              <tr>
                <td class="report-table__td">Да</td>
                <td class="report-table__td report-table__td__center">Да</td>
                <td class="report-table__td">Да</td>
              </tr>
              </tbody>
            </v-table>
            <div class="form__field">
              <p
                  class="form__label"
              >Проведение акции <sup class="valid-red">*</sup></p>
              <div style="display: flex">
                <div style="display: flex">
                  <InputReport
                      id="2"
                      name="2"
                      class="form__input"
                      type="radio"
                  />
                  <label>Да</label>
                </div>
                <div style="display: flex">
                  <InputReport
                      id="2"
                      name="2"
                      class="form__input"
                      type="radio"
                  />
                  <label>Нет</label>
                </div>
              </div>
            </div>
            <div class="form__field">
              <label
                  class="form__label"
                  for="15"
              >Комментарий <sup class="valid-red">*</sup></label>
              <InputReport
                  id="15"
                  name="15"
                  class="form__input"
                  style="width: 100%"
              />
            </div>
            <div>
              <v-checkbox
                  label="Вернуть в РО на доработку"
              />
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

const tab = ref('one');
const tenthPanelData = ref({
  event_happened: false,
  links: [
    {
      link: '',
    },
  ],
});

const props = defineProps({
  data: Object,
});
const emit = defineEmits(['formData']);

const formData = () => {
  emit('formData', tenthPanelData.value);
};

const addLink = () => {
  tenthPanelData.value.links.push({ link: '' })
};
watchEffect(() => {
  tenthPanelData.value = { ...props.data[0] };
})
</script>
<style lang="scss" scoped>
.form {
  &__title {
    font-family: Akrobat;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.6px;
    color: #1f7cc0;
  }

  &__btn {
    background-color: #d2e4f2;
    width: 85px;
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
  }
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