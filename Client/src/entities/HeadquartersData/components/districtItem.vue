<template>
    <router-link
        class="headquarters-wrapper__item"
        :to="{ name: 'DistrictHQ', params: { id: districtHeadquarter.id } }"
    >
        <div class="round-img">
            <img
                :src="districtHeadquarter.emblem"
                alt="logo"
                v-if="districtHeadquarter.emblem"
            />
            <img src="@app/assets/hq-emblem-squad.png" alt="logo" v-else />
        </div>
        <div class="container-headquarters">
            <p class="headquarters-wrapper__item-title">
                {{ districtHeadquarter.name }}
            </p>
        </div>
    </router-link>
</template>
<script setup>
const props = defineProps({
    districtHeadquarter: {
        type: Object,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
.round-img {
    img {
        width: 128px;
        height: 128px;
        display: block;
        margin: 0px auto;
        border-radius: 100%;
        object-fit: cover;
        overflow: hidden;
        @media screen and (max-width: 450px) {
            width: 100px;
            height: 100px;
        }
    }
}
.container-headquarters {
    padding-top: 10px;
}
</style>
