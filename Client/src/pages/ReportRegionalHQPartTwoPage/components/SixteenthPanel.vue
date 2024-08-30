<template>
  <div v-if="true" class="form__field-group">
    <div>
      <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup class="valid-red">*</sup>
      </p>
      <div class="form__label-radio">
        <div style="display: flex; align-items: center">
          <input class="custom-radio" v-model="sixteenthPanelData.is_project" id="is_project-true" type="radio"
            :value="true" />
          <label for="is_project-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input class="custom-radio" v-model="sixteenthPanelData.is_project" id="is_project-false" type="radio"
            :value="false" />
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
            placeholder="ВВС ПРО" @focusout="focusOut" />
        </div>
        <div>
          <Button v-if="index > 0" label="Удалить проект" class="deleteProjectBtn" @click="deleteProject(index)" />
        </div>
      </div>
      <div>
        <div style="display: flex;">
          <div>
            <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
            <InputReport isFile type="file" id="4" name="4" width="720px" height="86px" />
          </div>
          <div style="margin-left: 40px;">
            <p class="form__label">Масштаб проекта <sup class="valid-red">*</sup></p>
            <div style="display: flex;">
              <input v-model="project.project_scale" type="radio" :id="`All-${index}`" value="Всероссийский" />
              <label>Всероссийский</label>
            </div>
            <div style="display: flex;">
              <input v-model="project.project_scale" type="radio" :id="`District-${index}`" value="Окружной" />
              <label>Окружной</label>
            </div>
            <div style="display: flex;">
              <input v-model="project.project_scale" type="radio" :id="`Interregional-${index}`"
                value="Межрегиональный" />
              <label>Межрегиональный</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="form__label">Ссылка на группу проекта в социальных сетях <sup class="valid-red">*</sup></p>
        <div style="display: flex; margin-bottom: 5px; align-items: center" v-for="(link, i) in projects[index].links"
          :key="i">
          <InputReport v-model:value="link.link" :id="i" :name="i" class="form__input" type="text"
            placeholder="https://vk.com/cco_monolit" @focusout="focusOut" />
          <div v-if="projects[index].links.length === i + 1" class="add_link" @click="addLink(index)">+ Добавить ссылку
          </div>
          <div v-else class="add_link" @click="deleteLink(index, i)">Удалить</div>
        </div>

      </div>
    </div>
    <div>
      <Button class="add_eventBtn" label="+ Добавить проект" @click="addProject" />
    </div>
    <div>
      <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
      <TextareaReport id="comment" name="comment" :rows="1" autoResize placeholder="Напишите сообщение"
        @focusout="focusOut" :maxlength="3000" :max-length-text="3000" counter-visible />
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
            <div class="form__field">
              <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup
                  class="valid-red">*</sup></p>
              <div style="display: flex;">
                <div style="display: flex; align-items: center">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label for="2">Да</label>
                </div>
                <div style="display: flex; align-items: center">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label for="2">Нет</label>
                </div>
              </div>
            </div>
            <div>
              <label class="form__label" for="9">Наименование трудового проекта, в котором ЛСО РО одержал победу <sup
                  class="valid-red">*</sup></label>
              <InputReport id="9" name="9" class="form__input" type="text" placeholder="ВВС ПРО" />
            </div>
            <div>
              <div style="display: flex;">
                <div>
                  <label class="form__label" for="4">Положение о проекте <sup class="valid-red">*</sup></label>
                  <InputReport type="file" id="4" name="4" />
                </div>
                <div>
                  <p class="form__label">Масштаб проекта <sup class="valid-red">*</sup></p>
                  <div style="display: flex;">
                    <InputReport type="radio" id="4" name="4" />
                    <label>Всероссийский</label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label class="form__label" for="6">Ссылка на группу проекта в социальных сетях <sup
                  class="valid-red">*</sup></label>
              <InputReport id="6" name="6" class="form__input" type="text" placeholder="https://vk.com/cco_monolit" />
              <InputReport id="7" name="7" class="form__input" type="text" placeholder="https://vk.com/ccorobot" />
              <InputReport id="8" name="8" class="form__input" type="text" placeholder="https://vk.com/cco_monolit11" />
            </div>
            <div>
              <label class="form__label" for="9">Комментарий <sup class="valid-red">*</sup></label>
              <InputReport id="9" name="9" class="form__input" type="textarea" placeholder="Напишите сообщение"
                style="width: 100%;" />
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
          <div class="form__field-group">
            <div class="form__field">
              <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup
                  class="valid-red">*</sup></p>
              <div style="display: flex;">
                <div style="display: flex; align-items: center">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label for="2">Да</label>
                </div>
                <div style="display: flex; align-items: center">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label for="2">Нет</label>
                </div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <label class="form__label" for="9">Наименование трудового проекта, в котором ЛСО РО одержал победу <sup
                    class="valid-red">*</sup></label>
                <InputReport id="9" name="9" class="form__input" type="text" placeholder="ВВС ПРО" />
              </div>
              <div>
                <Button class="form__btn" label="Удалить проект" />
              </div>
            </div>
            <div class="form__field">
              <p class="form__label">Масштаб проекта <sup class="valid-red">*</sup></p>
              <div style="display: flex">
                <div style="display: flex">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label>Всероссийский</label>
                </div>
                <div style="display: flex">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label>Окружной</label>
                </div>
                <div style="display: flex">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label>Межрегиональный</label>
                </div>
              </div>
            </div>
            <div>
              <Button style="margin: 0;" label="Добавить проект" />
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
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          <div class="form__field-group report-table">
            <div class="form__field">
              <p class="form__label">Наличие трудового проекта, в котором ЛСО РО одержал победу <sup
                  class="valid-red">*</sup></p>
              <div style="display: flex;">
                <div style="display: flex; align-items: center">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label for="2">Да</label>
                </div>
                <div style="display: flex; align-items: center">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
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
                <Button style="margin: 0;" label="Удалить проект" />
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
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label>Всероссийский</label>
                </div>
                <div style="display: flex">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label>Окружной</label>
                </div>
                <div style="display: flex">
                  <InputReport id="2" name="2" class="form__input" type="radio" />
                  <label>Межрегиональный</label>
                </div>
              </div>
            </div>
            <div>
              <Button style="margin: 0;" label="Добавить проект" />
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
const sixteenthPanelData = ref({
  is_project: false,
  projects: [],
})
const projects = ref([
  {
    name: '',
    project_scale: 'Всероссийский',
    links: [
      {
        link: '',
      },
    ],
  }
]);
const isFirstSent = ref(true);
const focusOut = async () => {
  sixteenthPanelData.value.projects = [...projects.value];
  console.log(sixteenthPanelData.value);
  try {
    if (isFirstSent.value) {
      await reportPartTwoService.createReport(sixteenthPanelData.value, '16');
      isFirstSent.value = false;
    } else {
      await reportPartTwoService.createReportDraft(sixteenthPanelData.value, '16');
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};
const addLink = (index) => {
  projects.value[index].links.push({ link: '' })
};
const deleteLink = async (projectIndex, linkIndex) => {
  projects.value[projectIndex].links.splice(linkIndex, 1);
  sixteenthPanelData.value.projects = [...projects.value];
  await reportPartTwoService.createReportDraft(sixteenthPanelData.value, '16');
};
const addProject = () => {
  projects.value.push({
    name: '',
    project_scale: 'Всероссийский',
    links: [
      {
        link: '',
      },
    ],
  })
};
const deleteProject = async (index) => {
  projects.value = projects.value.filter((el, i) => index !== i);
  sixteenthPanelData.value.projects = [...projects.value];
  try {
    await reportPartTwoService.createReportDraft(sixteenthPanelData.value, '16');
  } catch (e) {
    console.log('deleteEvent error: ', e);
  }
};
watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport('16');
    if (data) {
      isFirstSent.value = false;
      projects.value = [...data.projects];
      sixteenthPanelData.value.is_project = data.is_project;
      // sixteenthPanelData.value.comment = data.comment;
    }
  } catch (e) {
    console.log(e);
  }
})
</script>
<style lang="scss" scoped>
.form__label-radio {
  display: flex;
  gap: 40px;
}

.custom-radio {
  display: none;
  /* отменено стандартное отображение*/
}

.custom-radio+label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  line-height: 20px;
}

.custom-radio+label::before {
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

.custom-radio+label::after {
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

.custom-radio:checked+label::after {
  background-color: #1F7CC0;
  /* Заполнение внутреннего круга синим цветом при выборе */
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

.add_link {
  color: #1f7cc0;
  cursor: pointer;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.1px;
  margin-left: 40px;
}

.add_eventBtn {
  background-color: transparent;
  color: #1F7CC0;
  border-color: #1F7CC0;
  margin: 35px 0 40px;
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
}
</style>