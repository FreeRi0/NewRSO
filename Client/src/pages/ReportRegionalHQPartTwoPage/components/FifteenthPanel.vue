<template>
  <div class="panel-form">
    <div class="card-form">
      <p class="card-form__text">
        Количество членов РО, прошедших профессиональное обучение от Центрального штаба и трудоустроенных в
        текущем периоде
      </p>
    </div>

    <div class="card-form">
      <div v-for="(area, index) in areas" :key="index">
        <fifteenth-panel-form :area="area" :is-sent="isSent" :district-expert="districtExpert"
          :central-expert="centralExpert" @update-area="updateArea(index, $event)" @save-data="saveData" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, watchEffect, computed } from 'vue';
  import { useReportPartTwoStore } from "@pages/ReportRegionalHQPartTwoPage/store.ts";
  import { reportPartTwoService } from "@services/ReportService.ts";
  import { useUserStore } from '@features/store/index';
  import { useRoleStore } from '@layouts/store/role.ts';
  
  import FifteenthPanelForm from './FifteenthPanelForm.vue';
  
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
    tab: String,
  });
  
  const emit = defineEmits(['get-data']);
  const reportStore = useReportPartTwoStore();
  const userStore = useUserStore();
  const roleStore = useRoleStore();

  const areas = ref([
    { name: "ССО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "СПО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "СОП", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "СМО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "ССервО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "ССхО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "Профильные отряды", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "Производственные отряды", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
    { name: "ТОП", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '', isFillingTableAutumn2024: null, isFillingTableSpring2025: null },
  ]);
  
  const isFirstSent = ref(true);
  const isSent = ref(false);
  const isLoading = ref(false);
  const ID_PANEL = '15';

  const regionalHqId = computed(() =>
    userStore.currentUser?.regional_headquarter_id ?? roleStore.roles?.regionalheadquarter_commander?.id
  );
  

  const updateArea = (index, updatedArea) => {
    areas.value[index] = { ...areas.value[index], ...updatedArea };
    areas.value = areas.value.slice();
  };
  
  const saveData = async () => {
    if (isLoading.value) {
      return;
    }
  
    isLoading.value = true;
    try {
      const formData = new FormData();
      formData.append('regional_headquarter', String(Number(regionalHqId.value)));
      formData.append('training_quota', String(Number(props.data?.training_quota ?? 0)));
      formData.append('score', String(Number(props.data?.score ?? 0)));

      areas.value.forEach((area, index) => {
        formData.append(`directions[${index}][direction_name]`, area.name ?? '');
        formData.append(`directions[${index}][trained_total]`, String(Number(area.number_trained) || 0));
        formData.append(`directions[${index}][employed_by_direction]`, String(Number(area.number_employed) || 0));
        formData.append(`directions[${index}][self_employed]`, String(Number(area.self_employment) || 0));
        formData.append(`directions[${index}][not_employed]`, String(Number(area.number_unemployed) || 0));
        formData.append(`directions[${index}][employment_table_fall_2024]`, String(Boolean(area.isFillingTableAutumn2024)));
        formData.append(`directions[${index}][employment_table_spring_2025]`, String(Boolean(area.isFillingTableSpring2025)));

        if (area.file && typeof area.file !== 'string') {
          formData.append(`directions[${index}][zip_file]`, area.file);
        }
      });

      if (!regionalHqId.value) {
        throw new Error('Не удалось определить id регионального штаба пользователя');
      }
      let response;
      if(isFirstSent.value){
        response = await reportPartTwoService.createReport(
          formData,
          ID_PANEL
        );
      } else {
        response = await reportPartTwoService.createReportIdPut(
          formData,
          ID_PANEL,
          String(regionalHqId.value)
        );
      }
 
     emit('get-data', response.data, parseInt(ID_PANEL));
     isFirstSent.value = false;
 
        } catch (error) {
      console.error('Ошибка сохранения данных:', error);
      console.error('Детали ошибки:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
    } finally {
     isLoading.value = false;
   }
  };
  
  watchEffect(async () => {
    try {
      if (props.data && Array.isArray(props.data.areas) && props.data.areas.length) {
        isFirstSent.value = false;
        areas.value = props.data.areas.map(area => ({
          name: area.name || '',
          number_trained: area.number_trained ?? '',
          number_employed: area.number_employed ?? '',
          self_employment: area.self_employment ?? '',
          number_unemployed: area.number_unemployed ?? '',
          file: area.file || '',
          file_size: area.file_size ?? null,
          file_type: area.file_type || '',
          isFillingTableAutumn2024: area.isFillingTableAutumn2024 ?? null,
          isFillingTableSpring2025: area.isFillingTableSpring2025 ?? null,
        }));
      } else if (props.data && Array.isArray(props.data.directions) && props.data.directions.length) {
        isFirstSent.value = false;
        areas.value = props.data.directions.map(dir => ({
          name: dir.direction_name || '',
          number_trained: dir.trained_total ?? '',
          number_employed: dir.employed_by_direction ?? '',
          self_employment: dir.self_employed ?? '',
          number_unemployed: dir.not_employed ?? '',
          file: dir.zip_file || '',
          file_size: dir.file_size ?? null,
          file_type: dir.file_type || '',
          isFillingTableAutumn2024: dir.employment_table_fall_2024 ?? null,
          isFillingTableSpring2025: dir.employment_table_spring_2025 ?? null,
        }));
      }

      isSent.value = props.data?.is_sent || false;
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  });
  
  watchEffect(() => {
    if (reportStore.reportReject?.fifteenth && 
        (reportStore.isReportReject?.fifteenth || reportStore.isAllReportsVerifiedByCH)) {
      
      try {
        const reportData = reportStore.reportReject.fifteenth;
        
        if (reportData.regional_version) {
          const regionalData = JSON.parse(reportData.regional_version);
          if (regionalData.areas) {
            areas.value = regionalData.areas;
          }
        }
      } catch (error) {
        console.error('Ошибка обработки возврата на доработку:', error);
      }
    }
  });
  </script>

<style scoped lang="scss">
.panel-form {
  margin-top: 8px;
}

.card-form {
  margin-bottom: 8px;
  padding: 40px;
  border-radius: 10px;
  background-color: #F3F4F5;

  &__text {
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
  }
}
</style>