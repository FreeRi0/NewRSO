<template>
  <div class="sort-layout">
      <Button type="button" :class="vertical ? 'dashboard' : 'dashboard-second'" icon="icon" color="white"
        @click="showVertical()"></Button>

      <Button type="button" :class="!vertical ? 'menu-second' : 'menu'" icon="icon" color="white"
        @click="showVertical()"></Button>
  </div>
</template>
<script setup>
import {Button} from './index'
const props = defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['switch'])

const showVertical = () => {
  emit('switch')
}

</script>
<style lang="scss">
.sort-layout {
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
}

$dashboard-active: '@app/assets/icon/darhboard-active.svg';
$dashboard-disable: '@app/assets/icon/darhboard-disable.svg';
$menu-a: '@app/assets/icon/MenuA.svg';
$menu: '@app/assets/icon/MenuD.svg';

.button-base {
  background-repeat: no-repeat;
  background-size: cover;
  width: 32px !important;
  height: 32px !important;
}
 
.dashboard {
  background-image: url($dashboard-active);
  @extend .button-base;
}

.dashboard-second {
  background-image: url($dashboard-disable);
  @extend .button-base; 
}
 
.menu {
  background-image: url($menu);
  @extend .button-base; 
}

.menu-second {
  background-image: url($menu-a);
  @extend .button-base; 
}
</style>