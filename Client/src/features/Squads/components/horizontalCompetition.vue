<template>
    <div>
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="members.length">
                <horizontalSquadItem v-for="member in members" :member="member" :rating="true" :key="member.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { horizontalSquadItem } from '@entities/Squads';
const props = defineProps({
    members: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: true,
    },
});

</script>
<style lang="scss" scoped>

.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}
</style>
