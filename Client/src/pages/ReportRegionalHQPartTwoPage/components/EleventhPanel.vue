<template>
  <div 
    v-if="true"
    class="form__field-group report__field-group"
    >    
    <div class="report__fieldset report__fieldset--left-block">
      <label 
        class="form__label report__label"
        for="number-of-members">
        Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-model:value="eleventhPanelData.participants_number"
        id="number-of-members"
        name="number-of-members"
        style="width: 100%;"
        height="40px"
        type="number"
        placeholder="Введите число"
        :maxlength="10"
        :max="32767"
        @focusout="focusOut"
      />
    </div>

    <div class="report__fieldset report__fieldset--right-block">
      <label
        class="form__label report__label"
        for="scan_file">
        Скриншот численности <br> группы РО&nbsp;РСО&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-if="!eleventhPanelData.scan_file"
        isFile
        type="file"
        accept=".jpg, .jpeg, .png, .pdf"
        id="scan_file"
        name="scan_file"
        width="100%"
        height="auto"
        @change="uploadFile"
      />
      <div 
        v-else
        class="report__file-box">
        <span class="report__file-name">
          <SvgIcon v-if="eleventhPanelData.file_type === 'jpg'" icon-name="file-jpg" />
          <SvgIcon v-if="eleventhPanelData.file_type === 'pdf'" icon-name="file-pdf" />
          <SvgIcon v-if="eleventhPanelData.file_type === 'png'" icon-name="file-png" />
          {{ eleventhPanelData.scan_file }}
        </span>

        <span class="report__file-size">
          {{ eleventhPanelData.file_size }} Мб
        </span>

        <button 
          @click="deleteFile"
          class="report__button-delete-file"
        >
          Удалить
        </button>
      </div>
    </div>

    <div class="report__fieldset report__fieldset--comment">
      <label class="form__label report__label" for="comment">
        Комментарий
      </label>
      <TextareaReport
        v-model:value="eleventhPanelData.comment"
        id="comment"
        name="comment"
        placeholder="Напишите сообщение"
        :rows="1" 
        autoResize
        counter-visible
        :maxlength="3000"
        :max-length-text="3000"
        @focusout="focusOut"
      >
      </TextareaReport>
    </div>
  </div>

  <report-tabs>
    <template v-slot:firstTab>
      <div class="form__field-group report__field-group"
        >    
        <div class="report__fieldset report__fieldset--left-block">
          <label 
            class="form__label report__label"
            for="number-of-members">
            Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;
            <sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-model:value="eleventhPanelData.participants_number"
            id="number-of-members"
            name="number-of-members"
            style="width: 100%;"
            height="40px"
            type="number"
            placeholder="Введите число"
            :maxlength="10"
            :max="32767"
            @focusout="focusOut"
          />
        </div>

        <div class="report__fieldset report__fieldset--right-block">
          <label
            class="form__label report__label"
            for="scan_file">
            Скриншот численности <br> группы РО&nbsp;РСО
            <sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-if="!eleventhPanelData.scan_file"
            isFile
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            id="scan_file"
            name="scan_file"
            width="100%"
            height="86px"
            @change="uploadFile"
          />
          <div 
            v-else
            class="report__file-box">
            <span class="report__file-name">
              <SvgIcon v-if="eleventhPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="eleventhPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="eleventhPanelData.file_type === 'png'" icon-name="file-png" />
              {{ eleventhPanelData.scan_file }}
            </span>

            <span class="report__file-size">
              {{ eleventhPanelData.file_size }} Мб
            </span>

            <button 
              @click="deleteFile"
              class="report__button-delete-file"
            >
              Удалить
            </button>
          </div>
        </div>

        <div class="report__fieldset report__fieldset--comment">
          <label class="form__label report__label" for="comment">
            Комментарий
          </label>
          <TextareaReport
            v-model:value="eleventhPanelData.comment"
            id="comment"
            name="comment"
            placeholder="Напишите сообщение"
            :rows="1" 
            autoResize
            counter-visible
            :maxlength="3000"
            :max-length-text="3000"
            @focusout="focusOut"
          >
          </TextareaReport>
        </div>
      </div>
    </template>
    <template v-slot:secondTab>
      <div class="form__field-group report__field-group"
        >    
        <div class="report__fieldset report__fieldset--left-block">
          <label 
            class="form__label report__label"
            for="number-of-members">
            Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;
            <sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-model:value="eleventhPanelData.participants_number"
            id="number-of-members"
            name="number-of-members"
            style="width: 100%;"
            height="40px"
            type="number"
            placeholder="Введите число"
            :maxlength="10"
            :max="32767"
            @focusout="focusOut"
          />
        </div>

        <div class="report__fieldset report__fieldset--right-block">
          <label
            class="form__label report__label"
            for="scan_file">
            Скриншот численности <br> группы РО&nbsp;РСО
            <sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-if="!eleventhPanelData.scan_file"
            isFile
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            id="scan_file"
            name="scan_file"
            width="100%"
            height="86px"
            @change="uploadFile"
          />
          <div 
            v-else
            class="report__file-box">
            <span class="report__file-name">
              <SvgIcon v-if="eleventhPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="eleventhPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="eleventhPanelData.file_type === 'png'" icon-name="file-png" />
              {{ eleventhPanelData.scan_file }}
            </span>

            <span class="report__file-size">
              {{ eleventhPanelData.file_size }} Мб
            </span>

            <button 
              @click="deleteFile"
              class="report__button-delete-file"
            >
              Удалить
            </button>
          </div>
        </div>

        <div class="report__fieldset report__fieldset--comment">
          <label class="form__label report__label" for="comment">
            Комментарий
          </label>
          <TextareaReport
            v-model:value="eleventhPanelData.comment"
            id="comment"
            name="comment"
            placeholder="Напишите сообщение"
            :rows="1" 
            autoResize
            counter-visible
            :maxlength="3000"
            :max-length-text="3000"
            @focusout="focusOut"
          >
          </TextareaReport>
        </div>
      </div>
    </template>
    <template v-slot:thirdTab>
      
    </template>
  </report-tabs>

  <!-- <v-card
    v-else 
    class="panel-card" >
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
            <div style="display: flex">
              <div class="form__field">
                <label
                    class="form__label"
                >Количество человек, входящих в группу РО РСО в социальной сети «ВКонтакте» <sup class="valid-red">*</sup></label>
                <InputReport
                    id="2"
                    name="2"
                    class="form__input"
                    type="number"
                />
              </div>
              <div class="form__field">
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
            </div>
            <div>
              <label
                  class="form__label"
                  for="9"
              >Комментарий</label>
              <InputReport
                  id="9"
                  name="9"
                  class="form__input"
                  type="textarea"
                  placeholder="Комментарий"
                  style="width: 100%;"
              />
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          <div class="form__field-group">
            <div class="form__field">
              <label
                  class="form__label"
              >Количество человек, входящих в группу РО РСО в социальной сети «ВКонтакте» <sup class="valid-red">*</sup></label>
              <InputReport
                  id="2"
                  name="2"
                  class="form__input"
                  type="number"
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
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          <div class="form__field-group report-table">
            <label
                class="form__label"
            >Количество человек, входящих в группу РО РСО в социальной сети «ВКонтакте» <sup class="valid-red">*</sup></label>
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
  </v-card> -->
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';
// import { useRoleStore } from "@layouts/store/role.ts";

// const roleStore = useRoleStore();
// const regionalHeadquarterCommander = ref(false);

// watchEffect(() => {
//   console.log("1", roleStore.roles);
//   if (roleStore.roles?.regionalheadquarter_commander) {
//     console.log("2", roleStore.roles);
//     regionalHeadquarterCommander.value = true;
//   }
// })

const ID_PANEL = '11';
const isFirstSent = ref(true);
const scanFile = ref([]);
const eleventhPanelData = ref({
  participants_number: '',
  scan_file: '',
  file_size: null,
  file_type: '',
  comment: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('participants_number', eleventhPanelData.value.participants_number);
  formData.append('comment', eleventhPanelData.value.comment);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

const uploadFile = async (event) => {
  scanFile.value = event.target.files[0];
  let formData = new FormData();
  formData.append('participants_number', eleventhPanelData.value.participants_number);
  formData.append('scan_file', scanFile.value);
  formData.append('comment', eleventhPanelData.value.comment);
  // formData.append('file_size', seventeenthPanelData.value.file_size);
  // formData.append('file_type', seventeenthPanelData.value.file_type);
  // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
  // formData.append('file_type', scanFile.value.type);

  console.log(scanFile.value);

  if (isFirstSent.value) {
    let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
    eleventhPanelData.value.scan_file = scan_file.split('/').at(-1);
  } else {
    let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    eleventhPanelData.value.scan_file = scan_file.split('/').at(-1);
  }
};

const deleteFile = async () => {
  eleventhPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('participants_number', eleventhPanelData.value.participants_number);
  formData.append('scan_file', '');
  formData.append('comment', eleventhPanelData.value.comment);
  formData.append('file_size', eleventhPanelData.value.file_size);
  formData.append('file_type', eleventhPanelData.value.file_type);

  console.log(formData);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

  watchEffect(async () => {
    try {
      const { data } = await reportPartTwoService.getReport(ID_PANEL);
      console.log(data);
      if (data) {
        isFirstSent.value = false;
        eleventhPanelData.value.participants_number = data.participants_number;
        eleventhPanelData.value.comment = data.comment;
        eleventhPanelData.value.scan_file = data.scan_file.split('/').at(-1)
        eleventhPanelData.value.file_size = data.file_size;
        eleventhPanelData.value.file_type = data.file_type;
      }
    } catch (e) {
      console.log(e)
    }
  });

</script>
<style lang="scss" scoped>
.panel-card {
  box-shadow: none;
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