<template>
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
          <div class="form__field">
            <p
                class="form__label"
            >Наличие трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup></p>
            <div style="display: flex;">
              <div style="display: flex; align-items: center">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label for="2">Да</label>
              </div>
              <div style="display: flex; align-items: center">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label for="2">Нет</label>
              </div>
            </div>
          </div>
          <div>
            <label
                class="form__label"
                for="9"
            >Наименование трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup></label>
            <InputReport
                id="9"
                name="9"
                class="form__input"
                type="text"
                placeholder="ВВС ПРО"
            />
          </div>
          <div>
            <div style="display: flex;">
              <div>
                <label
                    class="form__label"
                    for="4"
                >Положение о проекте <sup class="valid-red">*</sup></label>
                <InputReport
                    type="file"
                    id="4"
                    name="4"
                />
              </div>
              <div>
                <p
                    class="form__label"
                >Масштаб проекта <sup class="valid-red">*</sup></p>
                <div style="display: flex;">
                  <InputReport
                      type="radio"
                      id="4"
                      name="4"
                  />
                  <label>Всероссийский</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label
                class="form__label"
                for="6"
            >Ссылка на группу проекта в социальных сетях <sup class="valid-red">*</sup></label>
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
          <div>
            <label
                class="form__label"
                for="9"
            >Комментарий <sup class="valid-red">*</sup></label>
            <InputReport
                id="9"
                name="9"
                class="form__input"
                type="textarea"
                placeholder="Комментарий"
                style="width: 100%;"
            />
          </div>
          <div>
            <v-checkbox
                label="Итоговое значение"
            />
          </div>
          <div class="hr"></div>
          <div>
            <p>(4-1)*2+(4-2)+(4-3)=9</p>
          </div>
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="two">
        <div class="form__field-group">
          <div class="form__field">
            <p
                class="form__label"
            >Наличие трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup></p>
            <div style="display: flex;">
              <div style="display: flex; align-items: center">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label for="2">Да</label>
              </div>
              <div style="display: flex; align-items: center">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label for="2">Нет</label>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <div>
              <label
                  class="form__label"
                  for="9"
              >Наименование трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup></label>
              <InputReport
                  id="9"
                  name="9"
                  class="form__input"
                  type="text"
                  placeholder="ВВС ПРО"
              />
            </div>
            <div>
              <Button
                  style="margin: 0;"
                  label="Удалить проект"
              />
            </div>
          </div>
          <div class="form__field">
            <p
                class="form__label"
            >Масштаб проекта <sup class="valid-red">*</sup></p>
            <div style="display: flex">
              <div style="display: flex">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label>Всероссийский</label>
              </div>
              <div style="display: flex">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label>Окружной</label>
              </div>
              <div style="display: flex">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label>Межрегиональный</label>
              </div>
            </div>
          </div>
          <div>
            <Button
                style="margin: 0;"
                label="Добавить проект"
            />
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
          <div>
            <v-checkbox
                label="Итоговое значение"
            />
          </div>
          <div class="hr"></div>
          <div>
            <p>(4-1)*2+(4-2)+(4-3)=9</p>
          </div>
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="three">
        <div class="form__field-group report-table">
          <div class="form__field">
            <p
                class="form__label"
            >Наличие трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup></p>
            <div style="display: flex;">
              <div style="display: flex; align-items: center">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label for="2">Да</label>
              </div>
              <div style="display: flex; align-items: center">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label for="2">Нет</label>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <label
                  class="form__label"
              >Наименование трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup></label>
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
              <Button
                  style="margin: 0;"
                  label="Удалить проект"
              />
            </div>
          </div>
          <label
              class="form__label"
          >Масштаб проекта <sup class="valid-red">*</sup></label>
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
            <p
                class="form__label"
            >Масштаб проекта <sup class="valid-red">*</sup></p>
            <div style="display: flex">
              <div style="display: flex">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label>Всероссийский</label>
              </div>
              <div style="display: flex">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label>Окружной</label>
              </div>
              <div style="display: flex">
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="radio"
                />
                <label>Межрегиональный</label>
              </div>
            </div>
          </div>
          <div>
            <Button
                style="margin: 0;"
                label="Добавить проект"
            />
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
                label="Итоговое значение"
            />
          </div>
          <div class="hr"></div>
          <div>
            <p>(4-1)*2+(4-2)+(4-3)=9</p>
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
</template>
<script setup>
import { ref } from "vue";
import { InputReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';

const tab = ref('one')
</script>
<style lang="scss" scoped>
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