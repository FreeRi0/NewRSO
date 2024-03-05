<template>
    <div>
        <horizontalSquadItem
            v-for="squad in squads"
            :squad="squad"
            :key="squad.id"
            :competition="false"
        />
    </div>

</template>
<script setup>
import { ref } from 'vue';
import { horizontalSquadItem } from '@entities/Squads';
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss"></style>
