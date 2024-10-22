<template>
  <div class="container">
    <div class="active-app">
      <h2 class="profile-title">Активные заявки</h2>

      <div class="d-flex mt-9 mb-9 active-tabs">
        <button class="contributorBtn" :class="{ active: picked === tab.name }" v-for="tab in tabs" v-show="tab.name === 'Верификация аккаунтов' && (roleStore.roles.detachment_commander || roleStore.roles.regionalheadquarter_commander || (roleStore.roles.regionalheadquarter_commander && roleStore.experts?.is_district_expert)) ||
          tab.name === 'Заявки на вступление в отряд' && (roleStore.roles.detachment_commander) && !roleStore.experts?.is_district_expert ||
          tab.name === 'Заявки на участие в мероприятии' && !roleStore.experts?.is_district_expert ||
          tab.name === 'Конкурсы' && !roleStore.experts?.is_district_expert ||
          tab.name === 'Заявки на вступление в штаб' && !roleStore.experts?.is_district_expert ||
          tab.name === 'Рейтинг РО' && roleStore.experts?.is_district_expert" :key="tab.id"
          @click="picked = tab.name">
          {{ tab.name }}
        </button>
      </div>

      <div
        v-if="(picked == 'Верификация аккаунтов') && (roleStore.roles?.regionalheadquarter_commander?.id || roleStore.roles.detachment_commander?.id)">

        <activeApplications />
      </div>
      <div
        v-else-if="picked == 'Заявки на вступление в отряд' && (roleStore.roles?.regionalheadquarter_commander?.id || roleStore.roles?.detachment_commander?.id)">
        <ActiveSquads />
      </div>
      <div v-else-if="picked == 'Заявки на вступление в штаб' && (
        roleStore.roles?.regionalheadquarter_commander?.id ||
        roleStore.roles?.centralheadquarter_commander ||
        roleStore.roles?.districtheadquarter_commander?.id ||
        roleStore.roles?.localheadquarter_commander?.id ||
        roleStore.roles?.educationalheadquarter_commander?.id
      )">
        <active-headquarters />
      </div>
      <div v-else-if="picked == 'Заявки на участие в мероприятии'">
        <ActiveEventsApp />
      </div>

      <div v-else-if="picked == 'Конкурсы'">
        <active-competitions />
      </div>

      <div v-else-if="picked == 'Рейтинг РО'">
        <ActiveRatingRO />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoleStore } from '@layouts/store/role';
import { Button } from '@shared/components/buttons';
import { activeApplications } from '@features/ActiveApplications/components';
import { ActiveSquads } from '@features/ActiveApplications/components';
import { ActiveCompetitions } from '@features/ActiveCompetitions';
import { ActiveEventsApp } from '@features/ActiveApplications/components';
import { ActiveHeadquarters } from '@features/ActiveApplicationsHeadquarters/';
import { ActiveRatingRO } from '@features/ActiveApplicationRatingRO';
// import { showByUrl } from '@services/ProdUrlService';

// E:\RSO\NewRSO\Client\src\features\ActiveApplicationHeadquarters\index.ts
const roleStore = useRoleStore();

const picked = ref('Верификация аккаунтов');
// const showRating = ref(false);
// showRating.value = showByUrl();

const tabs = ref([
  {
    id: '1',
    name: 'Верификация аккаунтов',
  },
  {
    id: '2',
    name: 'Заявки на вступление в отряд',
  },
  {
    id: '3',
    name: 'Заявки на вступление в штаб',
  },
  {
    id: '4',
    name: 'Заявки на участие в мероприятии',
  },
  {
    id: '5',
    name: 'Конкурсы',
  },
  {
    id: '6',
    name: 'Рейтинг РО',
  },
]);


</script>

<style lang="scss" scoped>
.profile-title {
  font-size: 40px;
  margin-bottom: 40px;

  @media screen and (max-width: 575px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
}

.contributorBtn {
  border-radius: 30px;
  background-color: white;
  color: #1c5c94;
  border: 1px solid #1c5c94;
  margin: 0px;
  padding: 10px 24px;
  margin: 7px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 8px 16px;
    margin: 12px 8px 0px 0px;
  }
}

.active {
  background-color: #1c5c94;
  color: white;
}

.active-app {
  padding-bottom: 60px;
}

.active-tabs {
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
}

.contributor-sort__all {
  padding: 11px 12px;
  border: 1px solid #b6b6b6;
  border-radius: 10px;
  height: 48px;
  width: 48px;

  input {
    width: 24px;
    height: 24px;
  }
}

.classes {
  margin-left: 68px;
  margin-bottom: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  p {
    font-size: 16px;
    color: #35383f;
  }
}

.selectedItems {
  padding-top: 60px;
  padding-bottom: 80px;

  h3 {
    margin-bottom: 20px;
  }
}
</style>
