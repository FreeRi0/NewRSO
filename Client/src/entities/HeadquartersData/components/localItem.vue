<template>
    <router-link
        class="headquarters-wrapper__item"
        :to="{ name: 'LocalHQ', params: { id: localHeadquarter.id } }"
    >
        <div class="round-img">
            <img
                :src="localHeadquarter.emblem"
                alt="logo"
                v-if="localHeadquarter.emblem"
            />
            <img src="@app/assets/hq-emblem-squad.png" alt="logo" v-else />
        </div>
        <div class="container-headquarters">
            <p class="headquarters-wrapper__item-title">
                {{ localHeadquarter.name }}
            </p>
        </div>
    </router-link>
</template>
<script setup>
const props = defineProps({
    localHeadquarter: {
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
