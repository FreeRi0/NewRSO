<template>
    <div
        class="horizontal-item"
        v-for="localHeadquarter in localHeadquarters"
        v-if="localHeadquarters.length > 0"
    >
        <div class="horizontal-img">
            <img
                :src="localHeadquarter.emblem"
                alt="logo"
                v-if="localHeadquarter.emblem"
            />
            <img src="@app/assets/user-avatar.png" alt="logo" v-else />
        </div>
        <div class="containerHorizontal">
            <p class="headquarters-wrapper__item-category-full">
                {{ localHeadquarter.name }}
            </p>
        </div>
    </div>

    <h2 v-else>штаб не найден...</h2>
</template>
<script setup>
const props = defineProps({
    localHeadquarters: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss">
.horizontal {
    &-item {
        border: 1px solid grey;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 4px 20px;
    }
    &-img {
        img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
        }
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
}
.headquarters-wrapper__item {
    margin: 0px auto;
    width: 180px;

    &-category-full {
        text-align: center;
        font-size: 18px;
        font-family: 'Akrobat';
        margin-left: 20px;
        margin-right: 5px;
        color: #1e1e1e;
    }
}
</style>
