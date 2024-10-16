<template>
  <div 
    v-if="!(props.districtExpert || props.centralExpert)"
    class="form__field-group"
  >
    <EleventhPanelComponent
      :central-expert="props.centralExpert"
      :district-expert="props.districtExpert"
      :data="data"
      @get-data="getData"
      :is-error-panel="isErrorPanel"
    ></EleventhPanelComponent>
  </div>

  <report-tabs v-else>
    <template v-slot:firstTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :data="data"
        @get-data="getData"
      ></EleventhPanelComponent>
    </template>

    <template v-slot:secondTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :dataDH="dataDH"
        @get-dataDH="getDataDH"
        is-second-tab
      ></EleventhPanelComponent>
    </template>
    
    <template v-slot:thirdTab>
      <EleventhPanelComponent
        :central-expert="props.centralExpert"
        :district-expert="props.districtExpert"
        :dataCH="dataCH"
        @get-dataCH="getDataCH"
        is-third-tab
      ></EleventhPanelComponent>
    </template>
  </report-tabs>
</template>

<script setup>
// import { ref, watchEffect } from "vue";
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
  },
  data: Object,
  dataDH: Object,
  dataCH: Object,
  isErrorPanel: {
    type: Boolean,
  },
});

const ID_PANEL = "11";

const emit = defineEmits(['getData', 'getDataDH', 'getDataCH']);

const getData = (event) => {
  emit("getData", event, Number(ID_PANEL));
};

const getDataDH = (event) => {
  emit("getDataDH", event, Number(ID_PANEL));
};

const getDataCH = (event) => {
  emit("getDataCH", event, Number(ID_PANEL));
};

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

  // watchEffect(async () => {
    // console.log('эксперт: ', (props.districtExpert || props.centralExpert));
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
  // });

</script>

<style lang="scss" scoped>
</style>