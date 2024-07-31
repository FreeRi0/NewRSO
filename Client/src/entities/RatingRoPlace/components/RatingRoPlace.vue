<template>
  <div class="ratingROPlace__wrap">
    <div class="ratingROPlace__place">{{ item.id }}</div>
    <div class="ratingROPlace__item">
      <p>{{ item.name }}</p>
    </div>
  </div>

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
    align-items: center;
    column-gap: 8px;
  }
}
</style>