<template>
  <div class="CompItem">
    <div class="CompItem_wrapper">
      <squad-link v-if="member?.detachment" :squad="member?.detachment" class="CompItem_item" />
      <squad-link :squad="member?.junior_detachment" class="CompItem_item" />
    </div>
    <div class="reg_wrap">
      <div v-if="member?.junior_detachment" class="regItem">
        <p class="horizontal-item-title">
          {{ member?.junior_detachment?.regional_headquarter.name }}
        </p>
      </div>
      <div class="regItem_img">
        <img :src="getEmblemSrc(member?.junior_detachment?.regional_headquarter.emblem)" alt="logo">
      </div>
      <div v-if="rating" class="mini">
        <p>Место в рейтинге: {{ place.place || '-' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { HTTP } from '@app/http';
import { useRoleStore } from '@layouts/store/role';
import SquadLink from './squadLink.vue';
import defaultAvatar from '@app/assets/hq-emblem-squad.png';

const props = defineProps({
  rating: {
    type: Boolean,
    default: false,
  },
  member: {
    type: Object,
    default: () => ({})
  },
});

const roleStore = useRoleStore();
const place = ref({});

const getEmblemSrc = (emblem) => emblem || defaultAvatar;

const getPlaces = async () => {
  if (props.member?.junior_detachment?.id) {
    try {
      const response = await HTTP.get(`detachments/${props.member.junior_detachment.id}/competitions/1/place/`);
      place.value = response.data;
    } catch (error) {
      console.error('Failed to fetch places:', error);
    }
  }
};

onMounted(() => {
  getPlaces();
});

</script>

<style lang="scss" scoped>
.reg_wrap {
  display: flex;
  column-gap: 12px;
  width: 100%;

  @media screen and (max-width: 820px) {
    justify-content: center;
    align-items: center;
  }
}

.regItem {
  width: 100%;
  height: 48px;
  border-radius: 10px;
  border: 1px solid #b6b6b6;
  background: #fff;
  padding: 0px 12px;
  font-size: 16px;
  display: flex;
  font-family: 'Bert Sans';
  align-items: center;

  @media screen and (max-width: 820px) {
    display: none;
  }

  &_img {
    display: none;

    @media screen and (max-width: 820px) {
      display: flex;
      width: 100%;
      border: 1px solid #b6b6b6;
      background: #fff;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
      max-width: 60px;
      height: 48px;
    }

    img {
      width: 38px;
      height: 38px;
      border-radius: 100%;
    }
  }
}

.CompItem {
  display: flex;
  column-gap: 12px;

  @media screen and (max-width: 820px) {
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
  }

  &_item {
    width: 252px;
    max-width: 100%;
    height: 48px; 
    display: flex; 
    align-items: center;
    font-family: 'Bert Sans';
    padding: 8px 12px; 
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
    overflow: hidden; 
    word-break: break-word; 

    @media screen and (max-width: 820px) {
      width: 100%;
      font-size: 12px;
    }
  }

  &_wrapper {
    display: flex;
    column-gap: 12px;

    @media screen and (max-width: 820px) {
      width: 100%;
      grid-template-columns: 1fr;
    }
  }
}

.horizontal {
  &-item {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    padding: 4px 20px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;

    &-title {
      margin-left: 10px;

      @media screen and (min-width: 320px) and (max-width:480px) {
        margin-left: -35px;
        transform: translateX(20px);
      }
    }
  }

  &-img {
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;

      @media screen and (min-width: 320px) and (max-width:480px) {
        transform: translateX(-10px);
        margin-left: 0px;
      }
    }
  }
}

.containerHorizontal {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 575px) {
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 10px;
  }
}

.mini {
  width: 100%;
  max-width: 180px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid #b6b6b6;
  background: #fff;
  margin-bottom: 12px;
  font-family: 'Bert Sans';
  font-size: 16px;
  padding: 0px 20px;

  @media screen and (max-width: 820px) {
    max-width: 100%;
    padding: 16px 20px;
    font-size: 12px;
    margin-bottom: 0;
  }
}
</style>