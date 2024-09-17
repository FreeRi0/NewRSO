<template>
  <!-- <div 
    v-if="!(props.centralExpert || props.districtExpert)"
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
        :disabled="props.centralExpert || props.districtExpert"
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
        :disabled="props.centralExpert || props.districtExpert"
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
        :disabled="props.centralExpert || props.districtExpert"
      >
      </TextareaReport>
    </div>
  </div> -->

  <div 
    v-if="!(props.districtExpert || props.centralExpert)"
    class="form__field-group"
  >
    <EleventhPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
    ></EleventhPanelComponent>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :is-disabled="props.districtExpert || props.centralExpert"
      ></EleventhPanelComponent>

      <!-- <div class="report__field-group"
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
      </div> -->
    </template>

    <template v-slot:secondTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        is-second-tab
      ></EleventhPanelComponent>

      <!-- <div class="report__field-group"
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
      </div> -->
    </template>
    
    <template v-slot:thirdTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        is-third-tab
      ></EleventhPanelComponent>
    </template>
  </report-tabs>

  <!-- <v-tabs-window-item value="three">
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
  </v-tabs-window-item> -->

</template>

<script setup>
import { ref, watchEffect } from "vue";
import { EleventhPanelComponent } from "@features/RatingRoPanelComponents";
// import { InputReport, TextareaReport } from '@shared/components/inputs';
// import { CommentFileComponent } from '@entities/RatingRoComponents/components';
import { ReportTabs } from './index';
// import { getReport, reportPartTwoService } from "@services/ReportService.ts";

const props = defineProps({
  districtExpert: {
    type: Boolean
  },
  centralExpert: {
    type: Boolean
  },
  reportId: {
    type: String,
    default: '',
  }
});

// const ID_PANEL = '11';
// const isFirstSent = ref(true);
// const scanFile = ref([]);
// const eleventhPanelData = ref({
//   participants_number: '',
//   scan_file: '',
//   file_size: null,
//   file_type: '',
//   comment: '',
// });

// const focusOut = async () => {
//   let formData = new FormData();
//   formData.append('participants_number', eleventhPanelData.value.participants_number);
//   formData.append('comment', eleventhPanelData.value.comment);

//   if (isFirstSent.value) {
//     await reportPartTwoService.createReport(formData, ID_PANEL, true);
//   } else {
//     await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//   }
// };

// const uploadFile = async (event) => {
//   scanFile.value = event.target.files[0];
//   let formData = new FormData();
//   formData.append('participants_number', eleventhPanelData.value.participants_number);
//   formData.append('scan_file', scanFile.value);
//   formData.append('comment', eleventhPanelData.value.comment);
//   // formData.append('file_size', seventeenthPanelData.value.file_size);
//   // formData.append('file_type', seventeenthPanelData.value.file_type);
//   // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
//   // formData.append('file_type', scanFile.value.type);

//   console.log(scanFile.value);

//   if (isFirstSent.value) {
//     let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
//     eleventhPanelData.value.scan_file = scan_file.split('/').at(-1);
//   } else {
//     let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//     eleventhPanelData.value.scan_file = scan_file.split('/').at(-1);
//   }
// };

// const deleteFile = async () => {
//   eleventhPanelData.value.scan_file = '';
//   let formData = new FormData();
//   formData.append('participants_number', eleventhPanelData.value.participants_number);
//   formData.append('scan_file', '');
//   formData.append('comment', eleventhPanelData.value.comment);
//   formData.append('file_size', eleventhPanelData.value.file_size);
//   formData.append('file_type', eleventhPanelData.value.file_type);

//   console.log(formData);

//   if (isFirstSent.value) {
//     await reportPartTwoService.createReport(formData, ID_PANEL, true);
//   } else {
//     await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//   }
// };

  watchEffect(async () => {
    console.log('не эксперт: ', !(props.districtExpert || props.centralExpert));
  //   try {
      // const { data } = props.centralExpert || props.districtExpert ? await reportPartTwoService.getReportDH(ID_PANEL) : await reportPartTwoService.getReport(ID_PANEL);
  //     console.log(data);
  //     if (data) {
  //       isFirstSent.value = false;
  //       eleventhPanelData.value.participants_number = data.participants_number;
  //       eleventhPanelData.value.comment = data.comment;
  //       eleventhPanelData.value.scan_file = data.scan_file.split('/').at(-1)
  //       eleventhPanelData.value.file_size = data.file_size;
  //       eleventhPanelData.value.file_type = data.file_type;
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  });

</script>

<style lang="scss" scoped>
// .valid-red {
//   color: #db0000;
// }
</style>