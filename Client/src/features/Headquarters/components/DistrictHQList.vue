<template>
    <div
        v-for="districtHeadquarter in districtHeadquarters"
        v-if="districtHeadquarters.length > 0"
    >
        <router-link
            class="headquarters-wrapper__item"
            :to="{ name: 'DistrictHQ', params: { id: districtHeadquarter.id } }"
        >
            <div class="round-img">
                <img :src="districtHeadquarter.emblem" alt="logo" v-if="districtHeadquarter.emblem" />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else/>
            </div>
            <div class="container-headquarters">
                <p class="headquarters-wrapper__item-title">
                    {{ districtHeadquarter.name }}
                </p>
            </div>
        </router-link>
    </div>
    <h2 v-else>штаб не найден...</h2>
</template>
<script setup>
const props = defineProps({
    districtHeadquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
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
.headquarters-wrapper__item {
    margin: 0px auto;
    width: 180px;
    @media screen and (max-width: 575px) {
        width: 150px;
    }
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
        @media screen and (max-width: 575px) {
            font-size: 16px;
        }
    }
}
</style>
