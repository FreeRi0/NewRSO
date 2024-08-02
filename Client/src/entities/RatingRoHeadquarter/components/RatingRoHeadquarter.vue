<template>
  <router-link :to="{ name: 'rating-ro-reporting' }" class="ratingRO__item">
    <p>{{ item.name }}</p>
  </router-link>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.ratingRO__item {
  cursor: pointer;
  padding: 16px 16px 16px 32px;
  width: 100%;
  border: 0px 0px 0px 6px;
  border-radius: 10px;
  background-color: #F3F4F5;
  font-size: 22px;
  color: #000000;
  font-weight: 600;
  font-family: 'Akrobat';
  border-left: 6px solid #1F7CC0;
  line-height: 26.4px;
  height: auto;
  display: block;
}
</style>