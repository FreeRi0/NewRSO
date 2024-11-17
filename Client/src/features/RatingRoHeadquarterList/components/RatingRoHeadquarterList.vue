<template>
  <RatingRoItem v-for="item in items" :item="item" :key="item.id" @click="goToReport(item)" />
</template>
<script setup>
import { RatingRoItem } from '@entities/RatingRoHeadquarter'
import router from "@app/router/index.ts";
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
const goToReport = (item) => {
  if(item.edited){
    router.push({
      name: 'ReportRegionalPartTwoComander',
      query: {
        reportId: item.regional_headquarter.id,
      },
    })
  } else {
    router.push({
      name: 'ReportRegionalPartOneComander',
      query: {
        id: item.id,
      },
    })
  }
}
</script>
<style lang="scss"></style>