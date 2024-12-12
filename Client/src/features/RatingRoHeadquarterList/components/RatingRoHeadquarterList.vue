<template>
  <RatingRoItem v-for="item in items" :item="item" :key="item.id" @click="goToReport(item)" />
</template>
<script setup>
import { RatingRoItem } from '@entities/RatingRoHeadquarter'
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const goToReport = (item) => {
  if (item.edited) {
    router.push({
      name: 'ReportRegionalPartTwoComander',
      params: { edited: true },
      query: {
        reportId: item.regional_headquarter.id,
        headquartersName: item.regional_headquarter.name
      },
    });
  } else {
    router.push({
      name: 'ReportRegionalPartOneComander',
      params: { edited: false },
      query: {
        id: item.id,
      },
    });
  }
}  
</script>
<style lang="scss"></style>