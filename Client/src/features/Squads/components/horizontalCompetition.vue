<template>
    <div v-if="members.length > 0">
        <horizontalSquadItem
            v-for="member in members"
            :member="member"
            :rating="false"
            :key="member.id"
            :competition="true"
        />
    </div>

    <h2 v-else>Отряд не найден...</h2>
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
