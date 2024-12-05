<template>  
    <div :class="{'top': isLoading || !squads.length, 'squads-wrapper': !isLoading && squads.length}">  
        <template v-if="isLoading">  
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>  
        </template>  
        <template v-else>  
            <template v-if="squads.length" class="detachments-container">  
                <squadItem v-for="squad in squads" :squad="squad" :key="squad.id" />  
            </template>  
            <p v-else>Ничего не найдено</p>  
        </template>  
    </div>  
</template>  

<script setup>  
import { squadItem } from '@entities/Squads';  
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
});
</script>  

<style lang="scss" scoped>  
.top {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
}
.detachments-container {   
  overflow-y: auto; /* Enable vertical scrolling */  
}  
</style>