<template>
  <div 
    v-if="!(props.districtExpert || props.centralExpert)"
    class="form__field-group"
  >
    <ThirteenthPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      @get-data="getData"
      :is-error-panel="isErrorPanel"
    ></ThirteenthPanelComponent>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
      ></ThirteenthPanelComponent>
    </template>

    <template v-slot:secondTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
        is-second-tab
      ></ThirteenthPanelComponent>
    </template>

    <template v-slot:thirdTab>
      <ThirteenthPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
        is-third-tab
      ></ThirteenthPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
// import { ref, watchEffect } from "vue";
import { ThirteenthPanelComponent } from "@features/RatingRoPanelComponents";
// import { InputReport, TextareaReport } from '@shared/components/inputs';
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
  },
  data: Object,
  isErrorPanel: {
    type: Boolean,
  },
});

const ID_PANEL = '13';

const emit = defineEmits(['getData']);

const getData = (event) => {
  emit("getData", event, Number(ID_PANEL));
};

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

// watchEffect(async () => {
//   console.log('не эксперт: ', !(props.districtExpert || props.centralExpert));
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
// });
</script>

<style lang="scss" scoped>
// .valid-red {
//   color: #db0000;
// }
</style>