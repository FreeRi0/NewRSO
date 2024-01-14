<template>
    <router-link
        class="headquarters-wrapper__item"
        :to="{ name: 'RegionalHQ', params: { id: regionalHeadquarter.id } }"
    >
        <div class="round-img">
            <img
                :src="regionalHeadquarter.emblem"
                alt="logo"
                v-if="regionalHeadquarter.emblem"
            />
            <img src="@app/assets/user-avatar.png" alt="logo" v-else />
        </div>
        <div class="container-headquarters">
            <p class="headquarters-wrapper__item-title">
                {{ regionalHeadquarter.name }}
            </p>
        </div>
    </router-link>
</template>
<script setup>
const props = defineProps({
    regionalHeadquarter: {
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
