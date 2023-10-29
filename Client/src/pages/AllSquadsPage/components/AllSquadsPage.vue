<template>
    <div class="container">
        <div class="squads">
            <bannerCreate></bannerCreate>
            <h2 class="squads-title">Студенческие отряды</h2>
            <Search v-model="searchSquads"></Search>
            <div class="squads-sort">

            </div>
        </div>
    </div>
</template>
<script setup>
import { bannerCreate } from '@shared/components/imagescomp';
import {Search} from '@shared/components/inputs';
</script>
<style lang="scss">
.squads {
    padding: 60px 0px 60px 0px;
    &-title {
        font-size: 52px;
    }
}
</style>
