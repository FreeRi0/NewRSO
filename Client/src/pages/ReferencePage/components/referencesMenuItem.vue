<template>
  <div class="reference-menu-item">
    <p>{{ title }}</p>
    <router-link :to="{ name: routeName }">
      <div class="round-btn">
        <SvgIcon icon-name="arrow-right" />
      </div>
    </router-link>
  </div>
</template>

<script setup>
import SvgIcon from '@shared/ui/SvgIcon/SvgIcon.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  routeName: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.reference-menu-item {
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-top: 8px;

  p {
    font-size: 24px;
  }
}

.round-btn {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: #1c5c94;
  padding: 4px;
}
</style>