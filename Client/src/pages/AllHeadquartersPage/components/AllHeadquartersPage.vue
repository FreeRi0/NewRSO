<template>
  <div class="container">
    <bannerCreate></bannerCreate>
    <h2 class="headquartes-title">Штабы СО ОО</h2>
    <div class="squads-search">
                <input
                    type="text"
                    id="search"
                    class="squads-search__input"
                    v-model="searchHeadquartes"
                    placeholder="Поищем отряд?"
                />
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="squads-sort">
                <div class="sort-layout">
                    <Button icon="icon" color="white" @click="showVertical">
                    </Button>
                    <Button
                        icon="icon"
                        color="white"
                        @click="showVertical"
                    ></Button>
                </div>

                <div class="sort-filters">
                    <div class="sort-select">
                        <sortByEducation
                            v-model="selectedSort"
                            :options="educations"
                        ></sortByEducation>
                    </div>
                    <div class="sort-select">
                        <sortByEducation
                            v-model="sortBy"
                            :options="sortOptionss"
                        ></sortByEducation>
                    </div>

                    <Button
                        @click="ascending = !ascending"
                        icon="icon"
                        color="white"
                    ></Button>
                </div>
            </div>

            <div class="squads-wrapper" v-show="vertical">
                <squadsList :headquarters="sortedHeadquarters"></squadsList>
            </div>

            <!-- <div class="horizontal" v-show="!vertical">
                <horizontalList :squads="sortedSquads"></horizontalList>
            </div> -->
            <Button
                @click="headquartersVisible += step"
                v-if="headquartersVisible < headquarters.length"
                label="Показать еще"
            ></Button>
            <Button
                @click="headquartersVisible -= step"
                v-else
                label="Свернуть все"
            ></Button>
  </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import { Input, Search } from '@shared/components/inputs';
import { Button } from '@shared/components/buttons';
import { squadsList, horizontalList } from '@features/Squads/components';
import { sortByEducation } from '@shared/components/selects';
import { ref, computed } from 'vue';

const headquarters = ref([
   {
    desc: "Штаб КГПИ",
    category: "Строительные",
    full: "Штаб СО Коми государственного педагогического института",
    image: 'squad-logo.png',
    peoples: 12,
    createdAt: "2022-12-10",
    education: "Амурская государственная медицинская академия",
  },
  {
    category: "Проводников",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 19,
    createdAt: "2023-02-10",
    education: "Амурский государственный университет",
  },
  {
    category: "Медицинские",
    desc: "ШОО-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 5,
    createdAt: "2021-12-01",
    education: "МГУ",
  },
  {
    category: "Педагогические",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 8,
    createdAt: "2020-11-10",
    education: "Университет имени Баумана",
  },
  {
    category: "Строительные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 7,
    createdAt: "2021-02-12",
    education: "Амурская государственная медицинская академия",
  },
  {
    category: "Сервисные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 14,
    createdAt: "2012-12-01",
    education: "Амурский государственный университет",
  },
  {
    category: "Сельскохозяйственные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 12,
    createdAt: "2020-12-18",
    education: "МГУ",
  },
  {
    category: "Медицинские",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 22,
    createdAt: "2021-04-13",
    education: "Университет имени Баумана",
  },
  {
    category: "Педагогические",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 12,
    createdAt: "2022-12-10",
    education: "Амурская государственная медицинская академия",
  },
  {
    category: "Путинные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 2,
    createdAt: "2022-12-10",
    education: "Амурский государственный университет",
  },
  {
    category: "Сервисные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 5,
    createdAt: "2022-12-10",
    education: "МГУ",
  },
  {
    category: "Строительные",
    desc: "ССО",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 14,
    createdAt: "2022-12-10",
    education: "Университет имени Баумана",
  },
  {
    category: "Проводников",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 22,
    createdAt: "2022-12-10",
    education: "Амурская государственная медицинская академия",
  },
  {
    category: "Медицинские",
    desc: "ССО",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 10,
    createdAt: "2022-12-10",
    education: "Амурский государственный университет",
  },
  {
    category: "Педагогические",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 4,
    createdAt: "2022-12-10",
    education: "МГУ",
  },
  {
    category: "Сельскохозяйственные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 6,
    createdAt: "2022-12-10",
    education: "Университет имени Баумана",
  },
  {
    category: "Сельскохозяйственные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 25,
    createdAt: "2022-12-10",
    education: "Амурская государственная медицинская академия",
  },
  {
    category: "Сельскохозяйственные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 11,
    createdAt: "2022-12-10",
    education: "Амурский государственный университет",
  },
  {
    category: "Медицинские",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 17,
    createdAt: "2022-12-10",
    education: "МГУ",
  },
  {
    category: "Педагогические",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 15,
    createdAt: "2022-12-10",
    education: "РГГУ",
  },
  {
    category: "Путинные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 10,
    createdAt: "2022-12-10",
    education: "Амурская государственная медицинская академия",
  },
  {
    category: "Сервисные",
    desc: "СОП-1",
    full: "Штаб СО Новосибирского Государственного Педагогического Университета",
    image: 'squad-logo.png',
    peoples: 12,
    createdAt: "2022-12-10",
    education: "Амурский государственный университет",
  },
]);

const headquartersVisible = ref(12);

const step = ref(10);

const ascending = ref(true);
const sortBy = ref('alphabetically');


const vertical = ref(true);

const searchHeadquartes = ref('');

const showVertical = () => {
    vertical.value = !vertical.value;
};

const local = ref([
    {
        value: 'Амурская государственная медицинская академия',
        name: 'Амурская государственная медицинская академия',
    },
    { value: 'Университет имени Баумана', name: 'Университет имени Баумана' },
    { value: 'РГГУ', name: 'РГГУ' },
    { value: 'МГУ', name: 'МГУ' },
]);

const selectedSort = ref(0);

const sortOptionss = ref([
    {
        value: 'alphabetically',
        name: 'Алфавиту от А - Я',
    },
    { value: 'createdAt', name: 'Дате создания отряда' },
    { value: 'peoples', name: 'Количеству участников' },
]);

const sortedHeadquarters = computed(() => {
    let tempHeadquartes = headquarters.value;


    tempHeadquartes = tempHeadquartes.slice(0, headquartersVisible.value);

    // tempSquads = tempSquads.filter((item) => {
    //     return selectedSort.value == 0 || item.education == selectedSort.value;
    // });

    tempHeadquartes = tempHeadquartes.filter((item) => {
        return item.desc
            .toUpperCase()
            .includes(searchHeadquartes.value.toUpperCase());
    });

    // tempHeadquartes = tempHeadquartes.sort((a, b) => {
    //     if (sortBy.value == 'alphabetically') {
    //         let fa = a.title.toLowerCase(),
    //             fb = b.title.toLowerCase();

    //         if (fa < fb) {
    //             return -1;
    //         }
    //         if (fa > fb) {
    //             return 1;
    //         }
    //         return 0;
    //     } else if (sortBy.value == 'createdAt') {
    //         let fc = a.createdAt,
    //             fn = b.createdAt;

    //         if (fc < fn) {
    //             return -1;
    //         }
    //         if (fc > fn) {
    //             return 1;
    //         }
    //         return 0;
    //     } else if (sortBy.value == 'peoples') {
    //         return a.peoples - b.peoples;
    //     }
    // });

    if (!ascending.value) {
      tempHeadquartes.reverse();
    }

    return tempHeadquartes;
});
</script>
<style lang="scss" scoped>

</style>