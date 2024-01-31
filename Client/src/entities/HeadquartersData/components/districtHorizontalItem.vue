<template>
    <router-link
        class="horizontal-item"
        :to="{ name: 'DistrictHQ', params: { id: districtHeadquarter.id } }"
    >
        <div class="horizontal-img">
            <img
                :src="districtHeadquarter.emblem"
                alt="logo"
                v-if="districtHeadquarter.emblem"
            />
            <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
        </div>
        <div class="containerHorizontal">
            <p class="headquarters-wrapper__item-category-full">
                {{ districtHeadquarter.name }}
            </p>
        </div>
    </router-link>
</template>
<script setup>
const props = defineProps({
    districtHeadquarter: {
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
