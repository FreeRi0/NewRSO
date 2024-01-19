<template>
  <router-link
      class="horizontal-item"
      :to="{ name: 'RegionalHQ', params: { id: regionalHeadquarter.id } }"
  >
      <div class="horizontal-img">
          <img
              :src="regionalHeadquarter.emblem"
              alt="logo"
              v-if="regionalHeadquarter.emblem"
          />
          <img src="@app/assets/user-avatar.png" alt="logo" v-else />
      </div>
      <div class="containerHorizontal">
          <p class="headquarters-wrapper__item-category-full">
              {{ regionalHeadquarter.name }}
          </p>
      </div>
  </router-link>
</template>
<script setup>
const props = defineProps({
  regionalHeadquarter: {
      type: Object,
      required: true,
  },
});
</script>
<style lang="scss" scoped>
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
  align-items: center;
}
</style>
