<template>
  <div class="container">
    <h2 class="ratingRO__title">Рейтинг РО</h2>
    <div class="ratingRO__wrapper">
      <router-link v-if="roleStore.experts.is_central_expert === true" :to="{ name: 'rating-ro-reporting' }"
        class="ratingRO__item">
        <p>Отчеты РО</p>
      </router-link>
      <router-link :to="{ name: 'places' }" class="ratingRO__item">
        <p>Места РО по показателям</p>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { useRoleStore } from '@layouts/store/role';

const roleStore = useRoleStore();

</script>
<style lang="scss" scoped>
.ratingRO__title {
  font-size: 52px;
  font-weight: 700;
  color: #35383F;
  font-family: 'Akrobat';
}

.ratingRO__wrapper {
  margin-top: 40px;
  display: flex;
  column-gap: 8px;
  align-items: center;
  row-gap: 8px;
  padding-bottom: 280px;
}

.ratingRO__item {
  cursor: pointer;
  max-width: 586px;
  padding: 27px 16px 27px 32px;
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

}
</style>