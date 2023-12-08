<template>
    <div
        class="squads-wrapper__item"
        v-for="squad in squads"

    >
        <div class="round-img">
            <img :src="squad.emblem" alt="logo" />
        </div>
        <div class="container-squad">
            <!-- <p class="squads-wrapper__item-category">
                {{ squad.desc }}
            </p> -->
            <p class="squads-wrapper__item-title normal-title">
                {{ squad.name }}
            </p>
        </div>
    </div>

</template>
<script setup>
import {ref} from 'vue';
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss">
.round-img {
    width: 128px;
    height: 128px;
    display: block;
    margin: 0px auto;
    @media screen and (max-width: 575px) {
        width: 100px;
        height: 100px;
    }
}
.normal-title {
    text-align: center;
    font-size: 20px;
    font-family: 'Akrobat';
    color: #1e1e1e;
    @media screen and (max-width: 575px) {
        font-size: 15px;
    }
}
.squads-wrapper__item {
    margin: 0px auto;
    width: 180px;
    @media screen and (max-width: 575px) {
        width: 150px;
    }

    &-category {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
    }
}

</style>
