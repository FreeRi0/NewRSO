<template>
    <div class="container">
        <AboutSquad></AboutSquad>
        <SquadPhoto></SquadPhoto>
        <SquadParticipants></SquadParticipants>

    </div>
</template>
<script setup>
import AboutSquad from "./components/AboutSquad.vue";
import SquadPhoto from "./components/SquadPhoto.vue";
import SquadParticipants from "./components/SquadParticipants.vue";
import {ref} from "vue"
</script>
<style scoped lang="scss">
    *{
        background-color: white;
    }
</style>