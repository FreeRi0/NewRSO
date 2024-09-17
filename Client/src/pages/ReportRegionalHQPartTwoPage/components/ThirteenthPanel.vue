<template>
  <!-- <div 
    v-if="!(props.centralHeadquarterCommander || props.districtHeadquarterCommander)"
    class="form__field-group report__field-group"
    >    
    <div class="report__fieldset report__fieldset--left-block">
      <label 
        class="form__label report__label"
        for="number-of-members">
        Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-model:value="thirteenthPanelData.number_of_members"
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
        Скан подтверждающего <br> документа&nbsp;<sup class="valid-red">*</sup>
      </label>
      <InputReport
        v-if="!thirteenthPanelData.scan_file"
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
          <SvgIcon v-if="thirteenthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
          <SvgIcon v-if="thirteenthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
          <SvgIcon v-if="thirteenthPanelData.file_type === 'png'" icon-name="file-png" />
          <a :href=thirteenthPanelData.scan_file>
            {{ thirteenthPanelData.scan_file.split('/').at(-1) }}
          </a>
        </span>

        <span class="report__file-size">
          {{ thirteenthPanelData.file_size }} Мб
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
        v-model:value="thirteenthPanelData.comment"
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

  <div 
    v-if="!(props.districtExpert || props.centralExpert)"
    class="form__field-group"
  >
    <ThirteenthPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
    ></ThirteenthPanelComponent>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :is-disabled="props.districtExpert || props.centralExpert"
      ></ThirteenthPanelComponent>

      <!-- <div class="report__field-group">    
        <div class="report__fieldset report__fieldset--left-block">
          <label 
            class="form__label report__label"
            for="number-of-members">
            Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда&nbsp;<sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-model:value="thirteenthPanelData.number_of_members"
            id="number-of-members"
            name="number-of-members"
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
          <label
            class="form__label report__label"
            for="scan_file">
            Скан подтверждающего <br> документа&nbsp;<sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-if="!thirteenthPanelData.scan_file"
            isFile
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            id="scan_file"
            name="scan_file"
            width="100%"
            height="auto"
            @change="uploadFile"
            :disabled="props.centralHeadquarterCommander || props.districtHeadquarterCommander"
          />
          <div 
            v-else
            class="report__file-box">
            <span class="report__file-name">
              <SvgIcon v-if="thirteenthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="thirteenthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="thirteenthPanelData.file_type === 'png'" icon-name="file-png" />
              <a :href=thirteenthPanelData.scan_file>
                {{ thirteenthPanelData.scan_file.split('/').at(-1) }}
              </a>
            </span>

            <span class="report__file-size">
              {{ thirteenthPanelData.file_size }} Мб
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
            v-model:value="thirteenthPanelData.comment"
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
      </div> -->
    </template>

    <template v-slot:secondTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        is-second-tab
      ></ThirteenthPanelComponent>

      <!-- <div class="report__field-group">    
        <div class="report__fieldset report__fieldset--left-block">
          <label 
            class="form__label report__label"
            for="number-of-members">
            Количество членов РО&nbsp;РСО, принявших участие во&nbsp;Всероссийском дне ударного труда&nbsp;<sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-model:value="thirteenthPanelData.number_of_members"
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
            Скан подтверждающего <br> документа&nbsp;<sup class="valid-red">*</sup>
          </label>
          <InputReport
            v-if="!thirteenthPanelData.scan_file"
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
              <SvgIcon v-if="thirteenthPanelData.file_type === 'jpg'" icon-name="file-jpg" />
              <SvgIcon v-if="thirteenthPanelData.file_type === 'pdf'" icon-name="file-pdf" />
              <SvgIcon v-if="thirteenthPanelData.file_type === 'png'" icon-name="file-png" />
              <a :href=thirteenthPanelData.scan_file>
                {{ thirteenthPanelData.scan_file.split('/').at(-1) }}
              </a>
            </span>

            <span class="report__file-size">
              {{ thirteenthPanelData.file_size }} Мб
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
            v-model:value="thirteenthPanelData.comment"
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
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        is-third-tab
      ></ThirteenthPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { ThirteenthPanelComponent } from "@features/RatingRoPanelComponents";
// import { InputReport, TextareaReport } from '@shared/components/inputs';
import { ReportTabs } from './index';
import { getReport, reportPartTwoService } from "@services/ReportService.ts";

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

// const ID_PANEL = '13';
// const isFirstSent = ref(true);
// const scanFile = ref([]);
// const thirteenthPanelData = ref({
//   number_of_members: '',
//   scan_file: '',
//   file_size: null,
//   file_type: '',
//   comment: '',
// });

// const focusOut = async () => {
//   let formData = new FormData();
//   formData.append('number_of_members', thirteenthPanelData.value.number_of_members);
//   formData.append('comment', thirteenthPanelData.value.comment);

//   if (isFirstSent.value) {
//     await reportPartTwoService.createReport(formData, ID_PANEL, true);
//   } else {
//     await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//   }
// };

// const uploadFile = async (event) => {
//   scanFile.value = event.target.files[0];
//   let formData = new FormData();
//   formData.append('number_of_members', thirteenthPanelData.value.number_of_members);
//   formData.append('scan_file', scanFile.value);
//   formData.append('comment', thirteenthPanelData.value.comment);
//   // formData.append('file_size', seventeenthPanelData.value.file_size);
//   // formData.append('file_type', seventeenthPanelData.value.file_type);
//   // formData.append('file_size', (scanFile.value.size/( 1024 * 1024 )).toFixed(1));
//   // formData.append('file_type', scanFile.value.type);

//   console.log(scanFile.value);

//   if (isFirstSent.value) {
//     let { scan_file } = await reportPartTwoService.createReport(formData, ID_PANEL, true);
//     // thirteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
//     thirteenthPanelData.value.scan_file = scan_file;
//   } else {
//     let { data : { scan_file } } = await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//     // thirteenthPanelData.value.scan_file = scan_file.split('/').at(-1);
//     thirteenthPanelData.value.scan_file = scan_file;
//   }
// };

// const deleteFile = async () => {
//   thirteenthPanelData.value.scan_file = '';
//   let formData = new FormData();
//   formData.append('number_of_members', thirteenthPanelData.value.number_of_members);
//   formData.append('scan_file', '');
//   formData.append('comment', thirteenthPanelData.value.comment);
//   formData.append('file_size', thirteenthPanelData.value.file_size);
//   formData.append('file_type', thirteenthPanelData.value.file_type);

//   console.log(formData);

//   if (isFirstSent.value) {
//     await reportPartTwoService.createReport(formData, ID_PANEL, true);
//   } else {
//     await reportPartTwoService.createReportDraft(formData, ID_PANEL, true);
//   }
// };

watchEffect(async () => {
  console.log('не эксперт: ', !(props.districtExpert || props.centralExpert));
  // try {
  //   const { data } = props.centralHeadquarterCommander || props.districtHeadquarterCommander ? await reportPartTwoService.getReportDH(ID_PANEL) : await reportPartTwoService.getReport(ID_PANEL);
  //   console.log(data);
  //   if (data) {
  //     isFirstSent.value = false;
  //     thirteenthPanelData.value.number_of_members = data.number_of_members;
  //     thirteenthPanelData.value.comment = data.comment;
  //     // thirteenthPanelData.value.scan_file = data.scan_file.split('/').at(-1)
  //     thirteenthPanelData.value.scan_file = data.scan_file;
  //     thirteenthPanelData.value.file_size = data.file_size;
  //     thirteenthPanelData.value.file_type = data.file_type;
  //   }
  // } catch (e) {
  //   console.log(e)
  // }
});

</script>

<style lang="scss" scoped>
// .valid-red {
//   color: #db0000;
// }
</style>