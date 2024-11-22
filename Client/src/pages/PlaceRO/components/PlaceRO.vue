<template>
  <div class="container">
    <div class="RoPlaces">
      <h2 class="RoPlaces_title">Места РО</h2>
      <div class="sort-filters">
        <div class="sort-select">
          <v-select
            class="sorting_btn"
            :items="selectItems"
            :model-value="curr"
            @update:model-value="changeOption"
            variant="clear"
          >
          </v-select>
        </div>
        <Button class="ascend grey" @click="ascending = !ascending" iconn="/assets/icon/new-sort-icon.svg"></Button>
      </div>
      <div class="ratingROPlace__wrap" v-for="item in sortedRegionalHeadquarters" :key="item.id">
        <div class="ratingROPlace__place">{{ item.overall_place }}</div>
        <div class="ratingROPlace__item">
          <p>{{ item.regional_headquarter_name }}</p>
        </div>
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
import { ref, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';

const sortedRegionalHeadquarters = ref([]);
const ascending = ref(true);
const curr = ref('По возрастанию');
const responce = ref();
const limit = 20;
const selectItems=ref(['По возрастанию', 'По убыванию'])
const sortOptions = ref([
  {
    value: 'name',
    name: 'По возрастанию',
  },
  {
    value: 'name',
    name: 'По убыванию',
  }]
);

const next = () => {
  getRanking('next');
}

const prev = () => {
  getRanking();
}

const changeOption = (event) => {
  curr.value = event;
  if(curr.value == 'По убыванию') {
    ascending.value = false;
  } else if(curr.value == 'По возрастанию') {
    ascending.value = true;
  }
}

const getRanking = async (pagination) => {
  try {
    let params = '';
    ascending.value ? params = 'overall_place' : params = '-overall_place';

    let url = `/regional_competitions/ranking?ordering=${params}&limit=20`;

    if (pagination == 'next') {
      url = responce.value.next.replace('http', 'https'); 
    } else sortedRegionalHeadquarters.value = [];

    const { data } = await HTTP.get(url,)
    for (const item of data.results) {
      sortedRegionalHeadquarters.value.push(item);
    }
    responce.value = data;
  } catch(error) {
    console.error(error);
  }
}

watch(ascending, () => {
  ascending.value? sortOptions.value.name = 'По возрастанию' : sortOptions.value.name = 'По убыванию'
  ascending.value? curr.value = 'По возрастанию' : curr.value = 'По убыванию'
  getRanking();
})

onMounted(async ()=> {
  await getRanking();
})
</script>
<style lang="scss" scoped>
.RoPlaces {
  padding-bottom: 80px;

  &_title {
    font-size: 52px;
    font-weight: 700;
    color: #35383F;
    font-family: 'Akrobat';
  }
}

.ratingROPlace {
  &__item {
    cursor: pointer;
    padding: 16px;
    width: 100%;
    border: 0px 0px 0px 6px;
    border-radius: 10px;
    background-color: #F3F4F5;
    font-size: 20px;
    color: #000000;
    font-weight: 600;
    font-family: 'Akrobat';
    line-height: 24px;
    height: auto;
    display: block;
  }

  &__place {
    background-color: #F3F4F5;
    border-radius: 10px;
    padding: 16px;
    font-size: 20px;
    color: #000000;
    font-weight: 600;
    font-family: 'Akrobat';
    line-height: 24px;
    max-width: 68px;
    width: 100%;
    text-align: center;
  }

  &__wrap {
    display: flex;
    align-items: flex-start;
    column-gap: 8px;
    margin-bottom:8px;
  }
  &__wrap:last-child{
    margin-bottom: 60px;
  }
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

.sorting_btn {
  cursor: pointer;
  border: none;
  padding: 4px 16px;
  border-radius: 10px;
  background-color: #F7F7F7;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  line-height: 21.1px;
  font-family: 'Bert Sans';
  height: auto;
  overflow-x: hidden;
  margin-right: 8px;
  height: 40px;
  width: 160px;
}

.grey {
  background-color: #F7F7F7;
  border: none !important;
  padding: 8px;
}
.sort-filters{
  margin-top: 0px;
  margin-bottom: 20px;
  display:flex;
  justify-content: flex-end;
}
::v-deep(.v-field__append-inner) {
  display: none !important;
}
::v-deep(.v-field__input) {
  padding-left: 0px !important;
}
::v-deep(.v-select) {
  padding-right: 0px;
}
::v-deep(.v-input--density-default) {
  margin-left: 16px;
}
::v-deep(.v-select__selection-text){
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  line-height: 21.1px;
  font-family: 'Bert Sans';
  height: auto;
  overflow-x: hidden;
}
</style>