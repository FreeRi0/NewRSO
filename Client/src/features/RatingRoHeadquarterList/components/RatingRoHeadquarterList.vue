<template>
  <RatingRoItem v-for="item in items" :item="item" :key="item.id" @click="goToReport(item.id)" />
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
const goToReport = (id) => {
  router.push({
    name: 'ReportRegionalPartOne',
    query: {
      id: id,
    },
  })
}
</script>
<style lang="scss"></style>