<template>
  <div class="container">
    <div class="RoReporting">
      <h2 class="RoReporting_title">Отчеты РО</h2>
      <div class="RoReporting_search">
        <input type="text" id="search" class="RoReporting_search__input" v-model="name" @keyup="searchHeadquarters"
          placeholder="Начните вводить" />
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.511 19.0914L24 24.8M21 12.84C21 14.5884 20.5015 16.2975 19.5675 17.7512C18.6335 19.205 17.306 20.338 15.7528 21.0071C14.1997 21.6762 12.4906 21.8512 10.8417 21.5101C9.1929 21.169 7.67835 20.3271 6.4896 19.0908C5.30085 17.8545 4.4913 16.2794 4.16333 14.5646C3.83535 12.8498 4.00368 11.0724 4.64703 9.45708C5.29037 7.84178 6.37984 6.46116 7.77766 5.48981C9.17548 4.51846 10.8189 4 12.5 4C14.7544 4 16.9164 4.93135 18.5104 6.58918C20.1045 8.247 21 10.4955 21 12.84Z"
            stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div class="RoReporting_sort">
        <div class="sort-layout">
          <div class="sort-select sort-select--width">
            <v-select class="form__select filter-item" :items="districtsStore.districts" bg-color="#F7F7F7"
              item-color="#000000" menu-icon="mdi-chevron-down" no-data-text="Ничего не найдено..." base-color="red" variant="default"
              name="select_item" id="select-district" v-model="SelectedSortItem" item-title="name"
              placeholder="Окружной Штаб">
              <template #selection="{ item }">
                <pre v-if="!districtsStore.isLoading">{{
                  item.title
                }}</pre>
                <v-progress-circular class="circleLoader" v-else indeterminate color="blue"></v-progress-circular>
              </template>
            </v-select>
          </div>
          <div class="clear" @click="clearItem"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.29279 5.29308C5.48031 5.10561 5.73462 5.00029 5.99979 5.00029C6.26495 5.00029 6.51926 5.10561 6.70679 5.29308L11.9998 10.5861L17.2928 5.29308C17.385 5.19757 17.4954 5.12139 17.6174 5.06898C17.7394 5.01657 17.8706 4.98898 18.0034 4.98783C18.1362 4.98668 18.2678 5.01198 18.3907 5.06226C18.5136 5.11254 18.6253 5.18679 18.7192 5.28069C18.8131 5.37458 18.8873 5.48623 18.9376 5.60913C18.9879 5.73202 19.0132 5.8637 19.012 5.99648C19.0109 6.12926 18.9833 6.26048 18.9309 6.38249C18.8785 6.50449 18.8023 6.61483 18.7068 6.70708L13.4138 12.0001L18.7068 17.2931C18.8889 17.4817 18.9897 17.7343 18.9875 17.9965C18.9852 18.2587 18.88 18.5095 18.6946 18.6949C18.5092 18.8803 18.2584 18.9855 17.9962 18.9878C17.734 18.99 17.4814 18.8892 17.2928 18.7071L11.9998 13.4141L6.70679 18.7071C6.51818 18.8892 6.26558 18.99 6.00339 18.9878C5.74119 18.9855 5.49038 18.8803 5.30497 18.6949C5.11956 18.5095 5.01439 18.2587 5.01211 17.9965C5.00983 17.7343 5.11063 17.4817 5.29279 17.2931L10.5858 12.0001L5.29279 6.70708C5.10532 6.51955 5 6.26525 5 6.00008C5 5.73492 5.10532 5.48061 5.29279 5.29308Z"
                fill="black" />
            </svg>
          </div>
        </div>
        <div class="sort-filters">
          <div class="sort-select">
            <div @click="sortAlphabet" class="sorting_btn">{{ sortOptions.name }}</div>
          </div>
          <Button class="ascend grey" @click="ascending = !ascending" iconn="/assets/icon/new-sort-icon.svg"></Button>
        </div>
      </div>
      <div class="RoReporting_wrapper">
        <RatingRoHeadquartersList :items="sortedRegionalHeadquarters" />
        <v-progress-circular class="circleLoader" v-if="isLoading" indeterminate color="blue"></v-progress-circular>
        <p v-else-if="
          !isLoading &&
          !sortedRegionalHeadquarters.length
        "    class="no-found-text">
          К сожалению, не удалось найти информацию о штабах по вашему запросу.
        </p>
      </div>
      <template v-if='regionals.count && regionals.count > limit'>
        <Button @click="next" v-if="
          sortedRegionalHeadquarters.length <
          regionals.count
        " label="Показать еще"></Button>
        <Button @click="prev" v-else label="Свернуть все"></Button>
      </template>
    </div>

    <!-- <Button @click="prev" v-else label="Свернуть все"></Button> -->

  </div>

</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { Button } from '@shared/components/buttons';
import { sortByEducation } from '@shared/components/selects';
import { RatingRoHeadquartersList } from '@features/RatingRoHeadquarterList';
import { useDistrictsStore } from '@features/store/districts';
import { useRegionalsStore } from '@features/store/regionals';
import { HTTP } from '@app/http';

const districtsStore = useDistrictsStore();
const regionalsStore = useRegionalsStore();

const SelectedSortItem = ref(null);

const next = () => {
  getRegionals('next')
};

const prev = () => {
  getRegionals();
};

const sortedRegionalHeadquarters = ref([]);

const ascending = ref(true);
const isLoading = ref(false);
const detachments = ref({});
const sortBy = ref('name');
const timerSearch = ref(null);
const regionals = ref({});
const name = ref('');
const limit = 20;

const sortOptions = ref(
  {
    value: 'name',
    name: 'По Алфавиту',
  });


const clearItem = () => {
  SelectedSortItem.value = null;
}

const searchHeadquarters = () => {
  clearTimeout(timerSearch.value);
  timerSearch.value = setTimeout(() => {
    getRegionals();
  }, 400);
};

const getRegionals = async (pagination, orderLimit) => {
  try {
    isLoading.value = true;
    let data = [];
    let url = '/regionals/?';
    if (orderLimit) data.push('limit=' + orderLimit);
    else if (!pagination) data.push('limit=' + limit);
    else if (pagination == 'next') url = regionals.value.next.replace('http', 'https');
    if (name.value) data.push('search=' + name.value)
    if (SelectedSortItem.value) data.push('district_headquarter__name=' + SelectedSortItem.value)
    if (sortBy.value && !pagination) data.push('ordering=' + (ascending.value ? '' : '-') + sortBy.value)
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

watch(
  () => SelectedSortItem.value,
  () => {
    getRegionals();
  },
);

watch(
  () => ascending.value,
  () => {
    getRegionals('', sortedRegionalHeadquarters.value.length);
  },
);


onMounted(() => {
  districtsStore.getDistricts()
  getRegionals();
})
</script>
<style lang="scss" scoped>

.circleLoader {
  margin: 40px auto;
}

// .v-field__input::placeholder {
//     color: green;
// }
.sorting_btn {
  cursor: pointer;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  background-color: #F7F7F7;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  line-height: 21.1px;
  font-family: 'Bert Sans';
  height: 40px;
  margin-right: 8px;
}

.grey {
  background-color: #F7F7F7;
  border: none !important;
  padding: 8px;
}

.sort-layout {
  display: flex;
  column-gap: 8px;
}

.no-found-text {
  text-align: center;
  margin-top: 40px;
  color: #35383F;
  font-size: 22px;
  font-weight: 400;
  font-family: 'Bert Sans';
}

.clear {
  cursor: pointer;
  font-size: 18px;
  width: 40px;
  height: 40px;
  font-size: 21px;
  color: black;
  background-color: #F7F7F7;
  font-weight: 500;
  padding: 8px;
  border-radius: 10px;
}

.sort-select {
  &--width {
    width: 475px;
    background: "#F7F7F7" !important;
  }
}

.filter-item {
  background: "#F7F7F7" !important;
  border: none;
  color: black;
}

.v-field {
  background: red;
}

// .v-input__control {
//   background: red;
// }

.RoReporting {
  padding-bottom: 60px;

  &_title {
    font-size: 52px;
    font-weight: 700;
    color: #35383F;
    font-family: 'Akrobat';
    margin-bottom: 40px;
  }

  &_wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-bottom: 60px;
  }

  &_sort {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &_search {
    position: relative;
    box-sizing: border-box;

    svg {
      position: absolute;
      top: 10px;
      left: 16px;
    }

    &__input {
      width: 100%;
      padding: 13px 0px 10px 60px;
      border-radius: 10px;
      border: 1px solid black;
    }
  }
}
</style>