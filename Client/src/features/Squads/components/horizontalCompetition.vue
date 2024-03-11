<template>
    <div>
        <horizontalSquadItem
            v-for="member in members"
            :member="member"
            :rating="false"
            :key="member.id"
            :competition="true"
        />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import {horizontalSquadItem } from '@entities/Squads';
const props = defineProps({
    members: {
      type: Array,
      required: true,
  },
});
</script>
<style lang="scss"></style>
