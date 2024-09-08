<template>
  <div 
    v-if="!(props.centralHeadquarterCommander || props.districtHeadquarterCommander)"
    class="form__field-group report__field-group"
    >    
    <div class="report__fieldset report__fieldset--left-block">
      <label 
        class="form__label report__label"
        for="number-of-members">
        Объем средств, собранных бойцами РО&nbsp;РСО&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-model:value="twelfthPanelData.amount_of_money"
        id="amount-of-money"
        name="amount-of-money"
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
        Скан подтверждающего <br> документа&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-if="!twelfthPanelData.scan_file"
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
          <SvgIcon v-if="twelfthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
          <SvgIcon v-if="twelfthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
          <SvgIcon v-if="twelfthPanelData.file_type === 'png'" icon-name="file-png" />
          {{ twelfthPanelData.scan_file }}
        </span>

        <span class="report__file-size">
          {{ twelfthPanelData.file_size }} Мб
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
        v-model:value="twelfthPanelData.comment"
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

  <report-tabs v-else>
    <template v-slot:firstTab>
      <div class="report__field-group"
        >    
        <div class="report__fieldset report__fieldset--left-block">
          <label 
            class="form__label report__label"
            for="number-of-members">
            Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;
            <sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-model:value="twelfthPanelData.amount_of_money"
            id="amount-of-money"
            name="amount-of-money"
            style="width: 100%;"
            height="40px"
            type="number"
            placeholder="Введите число"
            :maxlength="10"
            :max="32767"
            @focusout="focusOut"
            :disabled="props.centralHeadquarterCommander || props.districtHeadquarterCommander"
          />
        </div>

        <div class="report__fieldset report__fieldset--right-block">
          <InputReport
            v-if="!twelfthPanelData.scan_file"
            isFile
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            id="scan_file"
            name="scan_file"
            width="100%"
            height="86px"
            @change="uploadFile"
            :disabled="props.centralHeadquarterCommander || props.districtHeadquarterCommander"
          />

          <div 
            v-else
            class="report__file-box">
            <span class="report__file-name">
              <SvgIcon v-if="twelfthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="twelfthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="twelfthPanelData.file_type === 'png'" icon-name="file-png" />
              {{ twelfthPanelData.scan_file }}
            </span>

            <span class="report__file-size">
              {{ twelfthPanelData.file_size }} Мб
            </span>

            <button 
              @click="deleteFile"
              class="report__button-delete-file"
            >
              Удалить
            </button>
          </div>
        </div>

        <div class="report__fieldset report__fieldset--comment" v-if="
            !(props.centralHeadquarterCommander || props.districtHeadquarterCommander) || 
            (props.centralHeadquarterCommander && twelfthPanelData.scan_file) || 
            (props.districtHeadquarterCommander && twelfthPanelData.scan_file)">

          <label class="form__label report__label" for="comment">
            Комментарий
          </label>
          <TextareaReport
            v-model:value="twelfthPanelData.comment"
            id="comment"
            name="comment"
            placeholder="Напишите сообщение"
            :rows="1" 
            autoResize
            counter-visible
            :maxlength="3000"
            :max-length-text="3000"
            @focusout="focusOut"
            :disabled="props.centralHeadquarterCommander || props.districtHeadquarterCommander"
          >
          </TextareaReport>
        </div>
      </div>
    </template>
    <template v-slot:secondTab>
      <div class="report__field-group"
        >    
        <div class="report__fieldset report__fieldset--left-block">
          <label 
            class="form__label report__label"
            for="number-of-members">
            Количество человек, входящих в&nbsp;группу РО&nbsp;РСО в&nbsp;социальной сети &laquo;ВКонтакте&raquo;
            <sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-model:value="twelfthPanelData.amount_of_money"
            id="amount-of-money"
            name="amount-of-money"
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
            v-if="!twelfthPanelData.scan_file"
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
              <SvgIcon v-if="twelfthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="twelfthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="twelfthPanelData.file_type === 'png'" icon-name="file-png" />
              {{ twelfthPanelData.scan_file }}
            </span>

            <span class="report__file-size">
              {{ twelfthPanelData.file_size }} Мб
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
            v-model:value="twelfthPanelData.comment"
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
      <div class="report__field-group report-table">
        <div class="report__fieldset">
          <label
            class="form__label"
          >Объем средств, собранных бойцами РО РСО <sup class="valid-red">*</sup></label>
          <v-table>
            <tbody>
              <tr class="report-table__tr">
                <td class="report-table__th report-table__th__br-left">Данные РО</td>
                <td class="report-table__th report-table__td__center">Корректировка ОШ</td>
                <td class="report-table__th report-table__th__br-right">Корректировка ЦШ</td>
              </tr>
              <tr class="report-table__tr">
                <td class="report-table__td">200</td>
                <td class="report-table__td report-table__td__center">200</td>
                <td class="report-table__td">
                  <InputReport
                    
                    id="number-of-members"
                    name="number-of-members"
                    style="width: 100%;"
                    type="number"
                    placeholder="0"
                    :maxlength="10"
                    :max="32767"
                    
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
        
        <div class="report__fieldset report__fieldset--comment-district">
          <label
              class="form__label"
              for="15"
          >Комментарий <sup class="valid-red">*</sup></label>
          <InputReport
            is-file-district
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            id="scan_file"
            name="scan_file"
            width="20px"
            height="20px"
            @change="uploadFile"
            />
          <TextareaReport
            
            id="comment-central"
            name="comment-central"
            placeholder="Примечания, ссылки"
            :rows="1" 
            autoResize
            counter-visible
            :maxlength="3000"
            :max-length-text="3000"
            @focusout="focusOut"
            :disabled="isDisabled"
          ></TextareaReport>
        </div>

        <div>
          <v-checkbox
              label="Вернуть в РО на доработку"
          />
        </div>
      </div>
    </template>
  </report-tabs>

  <!-- <v-tabs-window-item value="three">
    <div class="form__field-group report-table">
      <label
          class="form__label"
      >Объем средств, собранных бойцами РО РСО <sup class="valid-red">*</sup></label>
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
        >Комментарий</label>
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
  </v-tabs-window-item> -->
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { InputReport, TextareaReport } from '@shared/components/inputs';
import { ReportTabs } from './index';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";
import { SvgIcon } from '@shared/index';

const props = defineProps({
  districtHeadquarterCommander: {
    type: Boolean
  },
  centralHeadquarterCommander: {
    type: Boolean
  },
});

const ID_PANEL = '12';
const isFirstSent = ref(true);
const scanFile = ref([]);
const twelfthPanelData = ref({
  amount_of_money: '',
  scan_file: '',
  file_size: null,
  file_type: '',
  comment: '',
});

const focusOut = async () => {
  let formData = new FormData();
  formData.append('amount_of_money', twelfthPanelData.value.amount_of_money);
  formData.append('comment', twelfthPanelData.value.comment);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

const uploadFile = async (event) => {
  scanFile.value = event.target.files[0];
  let formData = new FormData();
  formData.append('amount_of_money', twelfthPanelData.value.amount_of_money);
  formData.append('scan_file', scanFile.value);
  formData.append('comment', twelfthPanelData.value.comment);
  // formData.append('file_size', seventeenthPanelData.value.file_size);
  // formData.append('file_type', seventeenthPanelData.value.file_type);
  // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
  // formData.append('file_type', scanFile.value.type);

  console.log(scanFile.value);

  if (isFirstSent.value) {
    let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
    twelfthPanelData.value.scan_file = scan_file.split('/').at(-1);
  } else {
    let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
    twelfthPanelData.value.scan_file = scan_file.split('/').at(-1);
  }
};

const deleteFile = async () => {
  twelfthPanelData.value.scan_file = '';
  let formData = new FormData();
  formData.append('amount_of_money', twelfthPanelData.value.amount_of_money);
  formData.append('scan_file', '');
  formData.append('comment', twelfthPanelData.value.comment);
  formData.append('file_size', twelfthPanelData.value.file_size);
  formData.append('file_type', twelfthPanelData.value.file_type);

  console.log(formData);

  if (isFirstSent.value) {
    await reportPartTwoService.createReport(formData, ID_PANEL, true);
  } else {
    await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
  }
};

watchEffect(async () => {
  try {
    const { data } = props.centralHeadquarterCommander || props.districtHeadquarterCommander ? await reportPartTwoService.getReportDH(ID_PANEL) : await reportPartTwoService.getReport(ID_PANEL);
    console.log(data);
    if (data) {
      isFirstSent.value = false;
      twelfthPanelData.value.amount_of_money = data.amount_of_money;
      twelfthPanelData.value.comment = data.comment;
      twelfthPanelData.value.scan_file = data.scan_file.split('/').at(-1)
      twelfthPanelData.value.file_size = data.file_size;
      twelfthPanelData.value.file_type = data.file_type;
    }
  } catch (e) {
    console.log(e)
  }
});
</script>

<style lang="scss" scoped>
.form__label {
  display: block;
}

.report {
  // &__field-group {
  //   grid-template-columns: 1fr;
  // }

  &__fieldset--left-block {
    .report__label {
      line-height: 24px;
    }
  }
}

.valid-red {
  color: #db0000;
}
</style>