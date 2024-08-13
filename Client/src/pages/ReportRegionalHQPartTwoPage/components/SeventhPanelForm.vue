<template>
  <v-card-text class="panel-card-text">
    <v-tabs-window>
      <!-- <v-tabs-window-item value="one">
        <div class="form__field-group">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p>«II Международный строительный чемпионат»</p>
            </div>
            <div>
              <Button style="margin: 0;" label="Свернуть" />
            </div>
          </div>
          <div class="form__field">
            <p class="form__label">Призовое место в конкурсе <sup class="valid-red">*</sup></p>
            <div style="display: flex; align-items: center">
              <InputReport id="2" name="2" class="form__input" type="radio" />
              <label for="2">1</label>
            </div>

          </div>
          <div>
            <label class="form__label" for="4">Скан подтверждающего документа <sup class="valid-red">*</sup></label>
            <InputReport type="file" id="4" name="4" />
          </div>
          <div>
            <label class="form__label" for="6">Ссылка на публикацию о победе <sup class="valid-red">*</sup></label>
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
      </v-tabs-window-item> -->


      <div class="form__field-group">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p class="form__title">{{ props.title }}</p>
          </div>
          <div>
            <Button @click="collapseForm" class="form__btn" style="margin: 0;" label="Свернуть" />
          </div>
        </div>
        <div class="form__field places">
          <p class="form__label">Призовое место в конкурсе <sup class="valid-red">*</sup></p>
          <div class="places_wrap">
            <div class="places_item" v-for="item in prize_places" :key="item.id">
              <input :id="item.id" :value="item.value" :name="item.name" class="form__input places_input" type="radio"
                @focusout="focusOut" v-model="places.place" />
              <label class="places_item_label" :for="id">{{ item.name }}</label>


            </div>
          </div>
          <p>place: {{ places.place }}</p>
        </div>
        <div>
        </div>
        <div class="form__field">
          <p class="form__label">Скан подтверждающего документа * <sup class="valid-red">*</sup></p>
          <div class="statement-item">
            <SvgIcon iconName="add-file" />
            <FileUpload mode="basic" name="demo[]" accept=".pdf, .jpeg, .png" :maxFileSize="7000000"
              :customUpload="true" @select="selectFile" chooseLabel="Выбрать файл" />
          </div>
        </div>

        <div class="form__field">
          <label class="form__label" for="14">Ссылка на публикацию о победе * <sup class="valid-red">*</sup></label>

          <div class="form__wrapper" v-for="(item, index) in places[0].links" :key="index">
            <InputReport @focusout="focusOut" name="14" v-model:value="item.link" class="form__input mb-2" />
            <div class="d-flex" v-if="places[0].links.length >= 2">
              <div class="add_link" @click="deleteLink">Удалить поле ввода | </div>
              <div class="add_link" @click="addLink"> + Добавить ссылку</div>
            </div>
            <div class="add_link" @click="deleteLink" v-else-if="places[0].links.length == 2">Удалить поле ввода</div>
            <div class="add_link" @click="addLink" v-else>+ Добавить ссылку</div>
          </div>


        </div>
        <div class="form__field">
          <label class="form__label" for="14">Комментарий <sup class="valid-red">*</sup></label>
          <InputReport @focusout="focusOut" v-model:value="seventhPanelData.comment" id="14" name="14"
            class="form__input" style="width: 100%" />
        </div>
        <div>
          <v-checkbox label="Итоговое значение" />
        </div>
        <div class="hr"></div>
        <div>
          <p>0</p>
        </div>
      </div>

      <!-- <v-tabs-window-item value="three">
        <div class="form__field-group report-table">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p>«II Международный строительный чемпионат»</p>
            </div>
            <div>
              <Button style="margin: 0;" label="Свернуть" />
            </div>
          </div>
          <label class="form__label">Призовое место в конкурсе <sup class="valid-red">*</sup></label>
          <v-table>
            <tbody>
              <tr class="report-table__tr">
                <td class="report-table__th report-table__th__br-left">Данные РО</td>
                <td class="report-table__th">Корректировка ОШ</td>
                <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
              </tr>
              <tr>
                <td class="report-table__td">1</td>
                <td class="report-table__td report-table__td__center">1</td>
                <td class="report-table__td">1</td>
              </tr>
            </tbody>
          </v-table>
          <div class="form__field">
            <p class="form__label">Призовое место в конкурсе <sup class="valid-red">*</sup></p>
            <div style="display: flex">
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>1</label>
              </div>
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>2</label>
              </div>
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>3</label>
              </div>
              <div style="display: flex">
                <InputReport id="2" name="2" class="form__input" type="radio" />
                <label>Нет</label>
              </div>
            </div>
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
      </v-tabs-window-item> -->
    </v-tabs-window>
  </v-card-text>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
import { Button } from '@shared/components/buttons';
import { InputReport } from '@shared/components/inputs';
import { SvgIcon } from '@shared/components/SvgIcon';
import { reportPartTwoService } from "@services/ReportService.ts";
const props = defineProps({
  title: String
})

const emit = defineEmits(['collapse-form']);

const collapseForm = () => {
  emit('collapse-form');
}
const isFirstSent = ref(true);

const seventhPanelData = ref({
  comment: '',
  places: []
});

const places = ref([
  {
    place: null,
    file: null,
    links: [
      {
        link: '',
      },
    ]
  }
])

const prize_places = ref([
  { name: '1', value: 1, id: 'pp1' },
  { name: '2', value: 2, id: 'pp2' },
  { name: '3', value: 3, id: 'pp3' },
  { name: 'Нет', value: false, id: 'pp4' },
]);

const selectFile = (event) => {
  places.value.file = event.files[0];
  console.log('file', places.value.file)
};
const focusOut = async () => {
  seventhPanelData.value.events = [...places.value];
  try {
    if (isFirstSent.value) {
      await reportPartTwoService.createReportDraft(seventhPanelData.value, '7', true);
    } else {
      await reportPartTwoService.createReport(seventhPanelData.value, '7');
    }
  } catch (e) {
    console.log('focusOut error:', e);
  }
};
const addLink = () => {
  places.value[0].links.push({ link: '' })
};

const deleteLink = () => {
  places.value[0].links.pop();
}

watchEffect(async () => {
  try {
    const { data } = await reportPartTwoService.getReport('7');
    if (data.length) {
      isFirstSent.value = false;
      places.value = [...data[0].places];
      seventhPanelData.value.comment = data[0].comment;
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
<style lang="scss" scoped>
.add_link {
  color: #1F7CC0;
  cursor: pointer;
  font-family: Bert Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 21.1px;
}

.places {
  margin-bottom: 16px;

  &_wrap {
    display: flex;
    align-items: center;
    column-gap: 40px;
    margin-top: 2px;

  }

  &_input {
    width: 20px;
    height: 20px;
  }

  &_item {
    display: flex;
    align-items: center;
    column-gap: 8px;
    height: 24px;

    &_label {
      font-size: 16px;
      font-weight: 600;
      font-family: Bert Sans;
      line-height: 24px;
      color: #000000;
    }
  }
}

.form {
  &__title {
    font-family: Akrobat;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.6px;
    color: #1F7CC0;
  }

  &__btn {
    background-color: #D2E4F2;
    width: 85px;
    height: 33px;
    border: none;
    font-size: 16px;
    font-weight: 400;
    font-family: Akrobat;
    line-height: 21.1px;
    text-align: center;
    padding: 4px 11px;
    color: #1F7CC0;
    border-radius: 6px;
  }

  &__wrapper {
    display: flex;
    column-gap: 40px;
    align-items: center;
  }

  .statement-item {
    display: flex;
    justify-content: center;
    margin: 0px auto;
  }

}
</style>