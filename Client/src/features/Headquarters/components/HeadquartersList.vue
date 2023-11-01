<template>
    <div
        class="headquarters-wrapper__item"
        v-for="headquarter in headquarters"
        v-if="headquarters.length > 0"
    >
        <div class="round-img">
            <img :src="'./assets/logo/' + headquarter.image" alt="logo" />
        </div>
        <div class="container-squad">
            <p class="headquarters-wrapper__item-title">
                {{ headquarter.desc }}
            </p>
        </div>
    </div>

    <h2 v-else>штаб не найден...</h2>
</template>
<script setup>
const props = defineProps({
    headquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
.headquarters-wrapper__item {
    margin: 0px auto;
    width: 180px;
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
    }
}
</style>
