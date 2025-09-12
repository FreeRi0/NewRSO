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

    <div class="card-form">
      <div class="checkbox-row">
        <span class="checkbox-label">Заполнение Таблицы по трудоустройству членов РО, обученных
          осенью 2024 года</span>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" v-model="isFillingTableAutumn2024" :value="true" class="custom-radio"
              :disabled="(props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
            <span class="radio-custom"></span>
            Да
          </label>
          <label class="radio-option">
            <input type="radio" v-model="isFillingTableAutumn2024" :value="false" class="custom-radio"
              :disabled="(props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
            <span class="radio-custom"></span>
            Нет
          </label>
        </div>
      </div>

      <div class="checkbox-row">
        <span class="checkbox-label">Заполнение Таблицы по трудоустройству членов РО, обученных
          весной 2025 года</span>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" v-model="isFillingTableSpring2025" :value="true" class="custom-radio"
              :disabled="(props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
            <span class="radio-custom"></span>
            Да
          </label>
          <label class="radio-option">
            <input type="radio" v-model="isFillingTableSpring2025" :value="false" class="custom-radio"
              :disabled="(props.tab === 'Просмотр отправленного отчета' && reportStore.isReportRevision) || (props.centralExpert || props.districtExpert)" />
            <span class="radio-custom"></span>
            Нет
          </label>
        </div>
      </div>

      <div class="save-button" v-if="!(props.centralExpert || props.districtExpert)">
        <button @click="saveData" aria-label="Сохранить" class="save-button_button" :disabled="!isFormValid">
          <span class="save-button_label">Сохранить</span>
        </button>
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
    { name: "ССО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "СПО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "СОП", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "СМО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "ССервО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "ССхО", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "Профильные отряды", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "Производственные отряды", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
    { name: "ТОП", number_trained: '', number_employed: '', self_employment: '', number_unemployed: '', file: '', file_size: null, file_type: '' },
  ]);
  const isFillingTableAutumn2024 = ref(null);
  const isFillingTableSpring2025 = ref(null);
  
  const isFirstSent = ref(true);
  const isSent = ref(false);
  const isLoading = ref(false);
  const ID_PANEL = '15';

  const isFormValid = computed(() => {
    return areas.value.every(area => {
      const numbersFilled = area.number_trained !== '' && 
                           area.number_employed !== '' && 
                           area.self_employment !== '' && 
                           area.number_unemployed !== '';
      
      const fileAttached = area.file !== '';
      
      return numbersFilled && fileAttached;
    });
  });

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
      formData.append('employment_table_fall_2024', String(Boolean(isFillingTableAutumn2024.value)));
      formData.append('employment_table_spring_2025', String(Boolean(isFillingTableSpring2025.value)));

      areas.value.forEach((area, index) => {
        formData.append(`directions[${index}][direction_name]`, area.name ?? '');
        formData.append(`directions[${index}][trained_total]`, String(Number(area.number_trained) || 0));
        formData.append(`directions[${index}][employed_by_direction]`, String(Number(area.number_employed) || 0));
        formData.append(`directions[${index}][self_employed]`, String(Number(area.self_employment) || 0));
        formData.append(`directions[${index}][not_employed]`, String(Number(area.number_unemployed) || 0));

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

.checkbox-row {
  display: flex;
  align-items: center;
  padding: 16px 0px 16px 0px;
}

.checkbox-label {
  color: #1C5C94;
  flex: 1;
  text-decoration: underline;
  font-weight: 600;
  font-size: 16px;
  max-width: max-content;
  padding-right: 40px;
}

.radio-option {
  font-weight: 600;
}

.radio-group {
  display: flex;
  gap: 40px;
  align-items: center;
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
}

.custom-radio+label::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #1F7CC0;
  background-color: transparent;
}

.custom-radio:checked+label::after {
  background-color: #1F7CC0;
}

.custom-radio:disabled+label {
  pointer-events: none;
}

.save-button {
  margin-top: 16px;

  &_button {
    border: 0px #fff solid;
    border-radius: 6px;
    background-color: #D2E4F2;
    height: 40px;
    width: 100px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
      background-color: #E0E0E0;
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:not(:disabled):hover {
      background-color: #B8D4E8;
    }
  }

  &_label {
    font-family: Bert Sans;
    font-weight: 400;
    font-style: Regular;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    color: #1F7CC0
  }
}
</style>