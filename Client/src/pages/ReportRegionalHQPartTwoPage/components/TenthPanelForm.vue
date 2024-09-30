<template>
  <div v-if="!(props.centralExpert || props.districtExpert)" class="form__field-group">
    <div style="display: flex; justify-content: space-between;">
      <div>
        <p class="form__title">Всероссийская патриотическая акция «Снежный Десант РСО»</p>
      </div>
      <div>
        <Button class="form__btn" style="margin: 0" label="Свернуть"/>
      </div>
    </div>
    <div class="form__field">
      <p class="form__label" id="form__label-radio">Проведение акции <sup class="valid-red">*</sup></p>
      <div class="form__field-radio" style="display: flex">
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelData.event_happened"
              id="event_happened-true"
              class="custom-radio"
              type="radio"
              :value="true"
              :disabled="isSent"
          />
          <label for="event_happened-true">Да</label>
        </div>
        <div style="display: flex; align-items: center">
          <input
              v-model="tenthPanelData.event_happened"
              id="event_happened-false"
              class="custom-radio"
              type="radio"
              :value="false"
              :disabled="isSent"
          />
          <label for="event_happened-false">Нет</label>
        </div>
      </div>
      <div style="margin-bottom: 8px;">
        <label style="display: flex; " class="form__label" for="4">Скан документа, подтверждающего проведение
          акции</label>
        <InputReport
            class="form-input__file-input"
            v-if="!tenthPanelData.document"
            isFile
            type="file"
            id="scan_file"
            name="scan_file"
            @change="uploadFile"
            :disabled="isSent"
        />
        <div v-else class="form__file-box">
          <span class="form__file-name">
            <SvgIcon v-if="tenthPanelData.file_type === 'jpg'" icon-name="file-jpg"/>
            <SvgIcon v-if="tenthPanelData.file_type === 'pdf'" icon-name="file-pdf"/>
            <SvgIcon v-if="tenthPanelData.file_type === 'png'" icon-name="file-png"/>
            {{ tenthPanelData.document.split('/').at(-1) }}
          </span>
          <span class="form__file-size">{{ tenthPanelData.file_size }} Мб</span>
          <button v-if="!isSent" @click="deleteFile" class="form__button-delete-file">
            Удалить
          </button>
        </div>
      </div>
      <div>
        <p class="form__label">Ссылка на социальные сети/ электронные <br>
          СМИ, подтверждающая проведение акции <sup class="valid-red">*</sup></p>
        <div class="input-link" v-for="(link, i) in tenthPanelData.links" :key="i">
          <InputReport
              v-model:value="link.link"
              :id="i"
              :name="i"
              class="form__input form__input-add-link"
              type="text"
              placeholder="Введите ссылку, например, https://vk.com/cco_monolit"
              @focusout="formData"
              :disabled="isSent"
          />
          <Button v-if="!isSent" class="addLinkBtn" label="+ Добавить ссылку" @click="addLink"/>
        </div>
      </div>
      <div class="form__field-comment">
        <label style="display: flex; align-items: center;" class="form__label" for="comment">Комментарий <sup
            class="valid-red">*</sup></label>
        <TextareaReport
            placeholder="Напишите сообщение"
            v-model:value="tenthPanelData.comment"
            id="comment"
            name="comment"
            :rows="1"
            autoResize
            :maxlength="3000"
            :max-length-text="3000"
            counter-visible
            class="form__input form__input-comment"
            style="margin-bottom: 4px;"
            :disabled="isSent"
        />
      </div>
    </div>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p class="form__title">Всероссийская патриотическая акция «Снежный Десант РСО»</p>
        </div>
        <div>
          <Button class="form__btn" style="margin: 0" label="Свернуть"/>
        </div>
      </div>
      <div class="form__field">
        <p class="form__label">Проведение акции <sup class="valid-red">*</sup></p>
        <div style="display: flex">
          <div v-if="tenthPanelData.event_happened" style="display: flex; align-items: center">
            <input v-model="tenthPanelData.event_happened" id="event_happened-true" class="form__input" type="radio"
                   :value="true"/>
            <label for="event_happened-true">Да</label>
          </div>
          <div v-else style="display: flex; align-items: center">
            <input v-model="tenthPanelData.event_happened" id="event_happened-false" class="form__input" type="radio"
                   :value="false"/>
            <label for="event_happened-false">Нет</label>
          </div>
        </div>
        <div>
          <label class="form__label" for="4">Скан документа, подтверждающего проведение акции</label>
          <div class="form__file-box">
            <span class="form__file-name">
              <SvgIcon v-if="tenthPanelData.file_type === 'jpg'" icon-name="file-jpg"/>
              <SvgIcon v-if="tenthPanelData.file_type === 'pdf'" icon-name="file-pdf"/>
              <SvgIcon v-if="tenthPanelData.file_type === 'png'" icon-name="file-png"/>
              {{ tenthPanelData.document.split('/').at(-1) || 'Тестовое название' }}
            </span>
            <span class="form__file-size">{{ tenthPanelData.file_size || '123' }} Мб</span>
          </div>
        </div>
        <div>
          <p class="form__label">Ссылка на социальные сети/электронные
            СМИ, подтверждающая проведение акции <sup class="valid-red">*</sup></p>
          <div style="display: flex;" v-for="(link, i) in tenthPanelData.links" :key="i">
            <InputReport v-model:value="link.link" :id="i" :name="i" class="form__input" type="text"
                         placeholder="https://vk.com/cco_monolit" @focusout="formData"
                         :disabled="props.centralHeadquarterCommander || props.districtHeadquarterCommander"/>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:secondTab>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p class="form__title">Всероссийская патриотическая акция «Снежный Десант РСО»</p>
        </div>
        <div>
          <Button class="form__btn" style="margin: 0" label="Свернуть"/>
        </div>
      </div>
      <div class="form__field">
        <p class="form__label">Проведение акции <sup class="valid-red">*</sup></p>
        <div style="display: flex">
          <div style="display: flex; align-items: center">
            <input v-model="tenthPanelData.event_happened" id="event_happened-true" class="form__input" type="radio"
                   :value="true"/>
            <label for="event_happened-true">Да</label>
          </div>
          <div style="display: flex; align-items: center">
            <input v-model="tenthPanelData.event_happened" id="event_happened-false" class="form__input" type="radio"
                   :value="false"/>
            <label for="event_happened-false">Нет</label>
          </div>
        </div>
        <div class="form__field">
          <label class="form__label" for="comment">Комментарий <sup class="valid-red">*</sup></label>
          <TextareaReport placeholder="Напишите сообщение" v-model:value="tenthPanelData.comment" id="comment"
                          name="comment" :rows="1" autoResize @focusout="formData" :maxlength="3000"
                          :max-length-text="3000"
                          counter-visible class="form__input"/>
        </div>
      </div>
    </template>
  </report-tabs>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { ReportTabs } from './index';
import { SvgIcon } from '@shared/index';

const props = defineProps({
  data: Object,
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
});

const tenthPanelData = ref({
  event_happened: false,
  document: '',
  file_size: '',
  file_type: '',
  links: [
    {
      link: '',
    },
  ],
});
const isSent = ref(false);

const emit = defineEmits(['formData', 'uploadFile', 'deleteFile']);

const formData = () => {
  emit('formData', tenthPanelData.value);
};

const addLink = () => {
  tenthPanelData.value.links.push({link: ''})
};

const uploadFile = async (event) => {
  emit('uploadFile', event)
};

const deleteFile = () => {
  emit('deleteFile')
}

watchEffect(() => {
  tenthPanelData.value = {...props.data};
  isSent.value = props.data.is_sent;
})
</script>
<style lang="scss" scoped>
.form-input__file-input {
  display: flex;
  justify-content: center;
  text-align: center;
  min-height: 86px;

  @media (max-width: 1024px) {
    width: 528px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

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

.input-link {
  display: flex;
  gap: 40px;
  margin-bottom: 8px;
  flex-wrap: wrap;
  row-gap: 8px;

  @media (max-width: 1024px) {
    align-items: stretch;
    flex-direction: column;
  }
}

.form__input-add-link {
  width: 720px;

  @media (max-width: 1024px) {
    width: 100%;
  }
}

.addLinkBtn {
  min-width: 141px;
  margin: 0;
  border: none;
  background-color: transparent;
  color: #1F7CC0;
  padding: 0;
  text-align: left;
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
  border-radius: 10px;
  margin: 0;
  margin-top: 8px;
  padding: 40px 40px 60px;

  @media (max-width: 568px) {
    padding: 16px 16px 32px;
  }
}

.form__title {
  margin-bottom: 16px;
}

.form__field {
  gap: 8px;

  &-radio {
    gap: 40px;
    margin-bottom: 8px;

    @media (max-width: 568px) {
      gap: 32px;
      margin-bottom: 0;
    }
  }
}

#form__label-radio {
  @media (max-width: 568px) {
    margin-bottom: 0;
  }
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form__field-comment {
  width: 100%;

  @media (max-width: 1024px) {
    margin-top: 0;
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