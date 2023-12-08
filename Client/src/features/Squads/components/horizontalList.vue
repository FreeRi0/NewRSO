<template>
    <div class="horizontal-item" v-for="squad in squads">
        <div class="horizontal-img">
            <img :src="squads.emblem" alt="logo" />
        </div>
        <div class="containerHorizontal">
            <p class="squads-wrapper__item-category-full">
                {{ squad.about }}
            </p>
            <p class="squads-wrapper__item-title">"{{ squad.name}}"</p>
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
    @media screen and (max-width: 575px) {
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left: 10px;
    }
}

.squads-wrapper__item {
    &-category-full {
        text-align: center;
        font-size: 18px;
        font-family: 'Akrobat';
        margin-left: 20px;
        margin-right: 5px;
        color: #1e1e1e;
        @media screen and (max-width: 575px) {
            font-size: 15px;
            margin: 0;
            text-align: left;
        }
    }
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
        @media screen and (max-width: 575px) {
            font-size: 15px;
        }
    }
}
</style>
