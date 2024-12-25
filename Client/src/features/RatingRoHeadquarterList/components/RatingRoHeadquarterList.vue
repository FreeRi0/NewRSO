<template>
  <RatingRoItem v-for="item in items" :item="item" :key="item.id" @click="goToReport(item)" />
</template>
<script setup>
import { RatingRoItem } from '@entities/RatingRoHeadquarter'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const goToReport = (item) => {
  if (route.params.part == 'Часть 2') {
    router.push({
      name: 'ReportRegionalPartTwoComander',
      params: { part: 'Часть 2'},
      query: {
        reportId: item.regional_headquarter.id,
        headquartersName: item.regional_headquarter.name
      },
    });
  } else {
    router.push({
      name: 'ReportRegionalPartOneComander',
      params: { part: 'Часть 1' },
      query: {
        id: item.id,
        headquartersName: item.regional_headquarter.name
      },
    });
  }
}  
</script>
<style lang="scss"></style>