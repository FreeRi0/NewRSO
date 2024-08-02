<template>
  <RatingRoItem v-for="item in items" :item="item" :key="item.id" />
</template>
<script setup>
import { RatingRoItem } from '@entities/RatingRoHeadquarter'
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
<style lang="scss"></style>