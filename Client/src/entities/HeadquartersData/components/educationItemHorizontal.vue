<template>
    <router-link
        class="horizontal-item"
        :to="{ name: 'HQ', params: { id: headquarter.id } }"
    >
        <div class="horizontal-img">
            <img
                :src="headquarter.emblem"
                alt="logo"
                v-if="headquarter.emblem"
            />
            <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
        </div>
        <div class="containerHorizontal">
            <p class="headquarters-wrapper__item-category-full">
                {{ headquarter.name }}
            </p>
        </div>
    </router-link>
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
.horizontal {
    &-item {
        border: 1px solid grey;
        border-radius: 10px;
        display: flex;
        align-items: center;
        margin-bottom: 12px;
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
</style>
