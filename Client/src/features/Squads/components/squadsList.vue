<template>
    <div class="squads-wrapper">
        <squadItem v-for="squad in squads" :squad="squad" :key="squad.id" />
    </div>
    <!--Сделать item пагинации-->
</template>
<script setup>
import { squadItem } from '@entities/Squads';
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss"></style>


