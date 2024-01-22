<template>
    <div class="headquarters-wrapper__item">
        <router-link :to="{ name: 'HQ', params: { id: headquarter.id } }">
            <div class="round-img">
                <img
                    :src="headquarter.emblem"
                    alt="logo"
                    v-if="headquarter.emblem"
                />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else />
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
    }
}
</style>
