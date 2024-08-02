<template>
  <RatingRoPlaceItem v-for="item in items" :item="item" :key="item.id" />
</template>
<script setup>
import { RatingRoPlaceItem } from '@entities/RatingRoPlace'
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
<style lang="scss"></style>