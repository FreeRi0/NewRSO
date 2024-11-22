<template>
  <div class="container">
    <div class="RoPlace">
      <div class="RoPlace_wrap">
        <!-- <p class="RoPlace_number">{{ PlaceId.id }}.</p> -->
        <h2 class="RoPlace_title"> {{ PlaceId.title }}</h2>
      </div>
      <div class="download_wrapper">
        <SvgIcon class="download_img" iconName="download" @click="downloadReport" />
        <p class="download_text" @click="downloadReport">
          Скачать отчет по показателю
        </p>
      </div>
      <div class="RoPlace_wrapper">
        <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate color="blue"></v-progress-circular>
        <RatingRoPlaceList v-else :items="sortedRegionalHeadquartersByIndicator" />
      </div>
      <template v-if="responce && responce.count && responce.count > limit">
        <Button @click="next" v-if="
          sortedRegionalHeadquarters.length <
          responce.count
        " label="Показать еще"></Button>
        <Button @click="prev" v-else label="Свернуть все"></Button>
      </template>
    </div>

  </div>

</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { Button } from '@shared/components/buttons';
import { RatingRoPlaceList } from '@features/RatingRoPlaceList';
import { useRegionalsStore } from '@features/store/regionals';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { usePage } from '@shared';
import SvgIcon from '@shared/ui/SvgIcon/SvgIcon.vue';

const regionalsStore = useRegionalsStore();
const route = useRoute();
let id = route.params.id;
const idEvent = route.params?.id_event;

const RoPlaces = ref([{
  id: 1, title: '1. Численность членов РО РСО в соответствии с объемом уплаченных членских взносов'
}, {
  id: 2, title: '2. Отношение численности членов РО РСО к численности студентов очной формы обучения субъекта Российской Федерации, обучающихся в профессиональных образовательных организациях и образовательных организациях высшего образования в государственных, муниципальных и частных образовательных организациях, включая филиалы (исключения — учебные заведения специальных ведомств, проводящих обучение на казарменном положении)',
}, {
  id: 3, title: '3. Прирост численности членов РО РСО относительно количества членов в соответствии с отчетом РО РСО за 2023 г.',
}, {
  id: 4, title: '4. Организация всероссийских (международных), окружных и межрегиональных мероприятий и проектов (слеты, школы, фестивали, турниры и прочие)',
}, {
  id: 5, title: '5. Организация всероссийских (международных) (организатор — региональное отделение РСО), окружных и межрегиональных трудовых проектов в соответствии с Положением об организации трудовых проектов РСО',
}, {
  id: 6, title: '6. Участие бойцов студенческих отрядов РО РСО во всероссийских (международных) мероприятиях и проектах (в том числе и трудовых) «К»',
}, {
  id: 7, title: '7. Победители студенческих отрядов РО РСО во всероссийских (международных) проектах и конкурсах «К»',
}, {
  id: 8, title: '8. Количество упоминаний в СМИ о прошедших творческих, добровольческих и патриотических мероприятиях и трудовых проектах, организованных РО РСО «К»',
}, {
  id: 9, title: '9. Организация обязательных общесистемных мероприятий РСО на региональном уровне «К»',
}, {
  id: 10, title: '10. Организация РО РСО всероссийских (международных) добровольческих и патриотических акций «К»',
}, {
  id: 11, title: '11. Активность РО РСО в социальных сетях «К»',
}, {
  id: 12, title: '12. Объем средств, собранных бойцами РО РСО во Всероссийском дне ударного труда',
}, {
  id: 13, title: '13. Охват членов РО РСО, принявших участие во Всероссийском дне ударного труда «К»',
}, {
  id: 14, title: '14. Отношение объема средств, собранных бойцами РО РСО во Всероссийском дне ударного труда к количеству членов РО РСО, принявших участие во Всероссийском дне ударного труда',
}, {
  id: 15, title: '15. Исполнительская дисциплина РО РСО, соблюдение условий охраны труда на трудовых проектах РСО, наличие проблемной неурегулированной задолженности по выплате заработной платы перед бойцами РСО за трудовой семестр предыдущего года, отсутствие отчислений от членских взносов в Центральный штаб, исполнение решений Центральных руководящих органов РСО, наличие ежегодного акта проверки КРК РО РСО',
}, {
  id: 16, title: '16. Победители всероссийских (международных), окружных и межрегиональных трудовых проектов по комиссарской деятельности «К»',
}].map(item => ({ ...item, id: Number(item.id) })))


const PlaceId = ref({});

const { replaceTargetObjects } = usePage();

const next = () => {
  getPlaceRegionals('next');
}

const prev = () => {
  getPlaceRegionals();
}

const sortedRegionalHeadquarters = ref([]);
const sortedRegionalHeadquartersByIndicator = ref([]);

const isLoading = ref(false);
const regionals = ref({});
const responce = ref({});
const limit = 20;

const getRegionals = async (pagination, orderLimit) => {
  try {
    isLoading.value = true;
    let data = [];
    let url = '/regionals/?';
    if (orderLimit) data.push('limit=' + orderLimit);
    else if (!pagination) data.push('limit=' + limit);
    else if (pagination == 'next') url = regionals.value.next.replace('http', 'https');
    const viewHeadquartersResponse = await HTTP.get(url + data.join('&'),);
    isLoading.value = false;

    let response = viewHeadquartersResponse.data;
    if (pagination) {
      response.results = [...regionals.value.results, ...response.results];
    }
    regionals.value = response;
    sortedRegionalHeadquarters.value = response.results
  } catch (error) {
    console.log('an error occured ' + error);
  }
};

const getRegionalsByEvent = async (pagination, orderLimit) => {
  try {
    isLoading.value = true;
    let data = [];
    let url = '/regionals/?';
    if (orderLimit) data.push('limit=' + orderLimit);
    else if (!pagination) data.push('limit=' + limit);
    else if (pagination == 'next') url = regionals.value.next.replace('http', 'https');
    const viewHeadquartersResponse = await HTTP.get(url + data.join('&'),);
    isLoading.value = false;

    let response = viewHeadquartersResponse.data;
    if (pagination) {
      response.results = [...regionals.value.results, ...response.results];
    }
    regionals.value = response;
    sortedRegionalHeadquarters.value = response.results
  } catch (error) {
    console.log('an error occured ' + error);
  }
}

const getPlaceRegionals = async (pagination) => {
  try {
    isLoading.value = true;
    const indicator = `r${id}_place`;
    let url = `/regional_competitions/ranking?ordering=${indicator}`;
    if (pagination == 'next') url = responce.value.next.replace('http', 'https');
    const { data } = await HTTP.get(url,);
    sortedRegionalHeadquartersByIndicator.value = [];
    for (const item of data.results) {
      sortedRegionalHeadquartersByIndicator.value.push({
        id: item[indicator],
        name: item.regional_headquarter_name,
      })
    }
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
}

const downloadReport = async () => {
  try {
    let endpoint = '';
    if ([6, 9, 10].includes(+id)) {
      endpoint = `/regional_competitions/${id}/download_mass_reports_xlsx/`
    } else {
      endpoint`/regional_competitions/reports/${id}/download_all_reports_data/`
    }

    const reportData = await HTTP.get(endpoint, { 'responseType': 'blob' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(reportData.data);
    link.download = `Отчет по ${id} показателю.xlsx`;
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
  } catch (error) {
    console.error(error);
  }
}
watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return;
    id = Number(newId);
    console.log(newId, id);
    const foundPlace = RoPlaces.value.find((item) => item.id === id);
    console.log('foundPlace', foundPlace);
    if (foundPlace) {
      PlaceId.value = {
        id: foundPlace.id,
        title: foundPlace.title
      };
    } else {
      console.error(`Place with id ${id} not found`);
      PlaceId.value = { id: null, title: 'Not Found' };
    }
    await replaceTargetObjects([PlaceId.value]);
    await getPlaceRegionals();
  },
  {
    immediate: true,
    deep: true,
  }
);

onMounted(async () => {
  await getPlaceRegionals();
  if (idEvent) {
    getRegionalsByEvent();
  } else {
    getRegionals();
  }
})
</script>
<style lang="scss" scoped>
.circleLoader {
  margin: 40px auto;
}



.no-found-text {
  text-align: center;
  margin-top: 40px;
  color: #35383F;
  font-size: 22px;
  font-weight: 400;
  font-family: 'Bert Sans';
}

.download {
  &_wrapper {
    padding-top: 0px;
    padding-bottom: 0px;
    display: flex;
    justify-content: flex-end;
  }

  &_img {
    width: 24px;
    height: 24px;
    margin-right: 4px;
    cursor: pointer
  }

  &_text {
    height: 22px;
    font-family: Akrobat;
    color: #1f7cc0;
    font-size: 18px;
    font-weight: 500;
    line-height: 21.6px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    cursor: pointer
  }
}

.RoPlace {
  padding-bottom: 60px;

  &_title {
    font-size: 52px;
    font-weight: 600;
    color: #35383F;
    font-family: 'Akrobat';
    line-height: 62.4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  }

  &_wrapper {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-bottom: 60px;
  }

  &_wrap {
    display: flex;
    align-items: flex-start;
    column-gap: 12px;
    max-width: 1000px;
    padding-left: 30px;

  }

  &_number {
    font-size: 52px;
    font-weight: 600;
    color: #35383F;
    font-family: 'Akrobat';
    line-height: 62.4px;
  }
}
</style>