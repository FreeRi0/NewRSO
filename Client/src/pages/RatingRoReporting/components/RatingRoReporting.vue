<template>
  <div class="container">
    <h2 class="ratingRo_report_title">Отчетность</h2>
    <div class="ratingRo_report_wrapper">
      <router-link class="ratingRo_report_item" :to="{ name: 'ReportRegionalPartOne' }">Отчет о деятельности
        регионального отделения РСО за 2024 год. Часть 1</router-link>
      <router-link v-if="show" class="ratingRo_report_item" :to="{ name: 'ReportRegionalPartTwo' }">Отчет о деятельности
        регионального отделения РСО за 2024 год. Часть 2</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from "vue-router";
import { useRoleStore } from "@layouts/store/role";
import { showByUrl } from '@services/ProdUrlService';

const show = ref(false);

const router = useRouter();

const roleStore = useRoleStore();

watch(() => roleStore.roles?.regionalheadquarter_commander, () => {
  if (roleStore.roles?.regionalheadquarter_commander === null) {
    router.push({ name: 'mypage' })
  }
})


onMounted(() => {
  // if (window.location.hostname.includes('localhost') || window.location.hostname.includes('rso.sprint.1t.ru') || window.location.hostname.includes('213.139.208.147')) {
  //   show.value = true;
  // }
  show.value = showByUrl();
});
</script>
<style lang="scss" scoped>
.ratingRo_report_title {
  font-size: 52px;
  font-weight: 700;
  color: #35383F;
  font-family: 'Akrobat';
}

.ratingRo_report_wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 40px;
  padding-bottom: 280px;
}

.ratingRo_report_item {
  cursor: pointer;
  max-width: 100%;
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
}
</style>