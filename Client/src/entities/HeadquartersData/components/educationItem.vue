<template>
    <div class="headquarters-wrapper__item">
        <router-link :to="{ name: 'HQ', params: { id: headquarter.id } }">
            <div class="round-img">
                <img
                    :src="headquarter.emblem"
                    alt="logo"
                    v-if="headquarter.emblem"
                />
                <img src="@app/assets/hq-emblem-squad.png" alt="logo" v-else />
            </div>
            <div class="container-headquarters">
                <p class="headquarters-wrapper__item-title">
                    {{ headquarter.name }}
                </p>
            </div>
        </router-link>
    </div>
</template>
<script setup>
const props = defineProps({
    headquarter: {
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
        @media screen and (min-width: 320px) and (max-width:340px) {
            width: 128px;
            height: 128px;
            transform: translateX(-35px);
        }
    }
}
.container-headquarters {
    padding-top: 10px;
    @media screen and (min-width: 320px) and (max-width:340px) {
            transform: translateX(-35px);
        }
}
</style>
