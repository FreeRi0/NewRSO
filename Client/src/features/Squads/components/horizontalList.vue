<template>
    <div class="horizontal-item" v-for="squad in squads">
        <div class="horizontal-img">
            <img :src="'./assets/logo/' + squad.image" alt="logo" />
        </div>
        <div class="containerHorizontal">
            <p class="squads-wrapper__item-category-full">
                {{ squad.full }}
            </p>
            <p class="squads-wrapper__item-title">{{ squad.title }}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    squads: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss">
.horizontal {
    display: none;
    padding: 60px 0px;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
    &-item {
        border: 1px solid grey;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 4px 20px;
    }
    &-img {
        width: 40px;
        height: 40px;
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
}

.squads-wrapper__item {
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
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
    }
}
</style>
