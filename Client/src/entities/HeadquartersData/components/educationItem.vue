<template>
    <div class="headquarters-wrapper__item">
        <router-link :to="{ name: props.name, params: { id: headquarter.id } }">
            <div class="round-img">
                <img
                    :src="headquarter.emblem ? headquarter.emblem : '@app/assets/hq-emblem-squad.png'"
                    alt="logo"
                />
                <!-- <img src="@app/assets/hq-emblem-squad.png" alt="logo" v-else /> -->
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
    name: {
        type: String,
        required: true,
    }
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
        
        @media screen and (min-width: 320px) and (max-width:480px) {
            width: 128px;
            height: 128px;
        }
    }
}
.container-headquarters {
    padding-top: 10px;
}
</style>
