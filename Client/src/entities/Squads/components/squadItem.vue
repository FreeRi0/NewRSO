<template>
  <div :class="{ 'squads-wrapper__item': !horizontal, '': horizontal }">
    <router-link :class="{ 'horizontal-item': horizontal, '': !horizontal }"
      :to="{ name: 'lso', params: { id: squad.id } }">
      <div :class="{ 'round-img': !horizontal, 'horizontal-img': horizontal }">
        <img :src="getEmblemSrc(squad.emblem)" alt="logo" />
      </div>
      <div :class="{ 'container-headquarters': !horizontal, 'containerHorizontal': horizontal }">
        <p
          :class="{ 'headquarters-wrapper__item-title': !horizontal, 'headquarters-wrapper__item-category-full': horizontal }">
          {{ squad.name }}
        </p>
      </div>
    </router-link>
  </div>

</template>
<script setup>
import defaultAvatar from '@app/assets/hq-emblem-squad.png';
const props = defineProps({
  squad: {
    type: Object,
    required: true,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
});
const getEmblemSrc = (emblem) => emblem || defaultAvatar;
</script>
<style lang="scss" scoped>
.round-img {
  img {
    width: 128px;
    height: 128px;
    display: block;
    margin: 0px auto;
    border-radius: 100%;
    object-fit: cover;
    overflow: hidden;

    @media screen and (min-width: 320px) and (max-width:480px) {
      width: 128px;
      height: 128px;
    }
  }
}

.container-headquarters {
  padding-top: 10px;
  text-align: center;
}

.horizontal {
  &-item {
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 4px 20px;
  }

  &-img {
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
    }
  }
}

.containerHorizontal {
  display: flex;
  margin-left: 20px;
  align-items: center;
}
</style>
