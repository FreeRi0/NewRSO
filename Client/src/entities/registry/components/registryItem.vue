<template>
    <router-link
        class="horizontal-item"
        :to="{ name: 'RegionalHQ', params: { id: item.id } }"
    >
        <div class="horizontal-img">
            <img :src="item.emblem" alt="logo" v-if="item.emblem" />
            <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
        </div>
        <div class="containerHorizontal">
            <p class="headquarters-wrapper__item-category-full ml-2">
                {{ item.name }}
            </p>
        </div>
    </router-link>
    <div class="horizontal-info d-flex" v-if="showInfo">
        <p>Проведённые мероприятия: {{ item.events_count }}</p>
        <div class="d-flex">
            <!-- <p v-if="item?.local_headquarter" class="mr-7">МШ:</p>
            <p v-if="item?.educational_headquarter" class="mr-7">ШОО:</p>
            <p v-if="item?.detachment" class="mr-7">ЛСО:</p> -->
            <div class="d-flex">
                <img src="@app/assets/icon/people.svg" alt="people" />
                <p class="ml-3">{{ item.participants_count }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    showInfo: {
        type: Boolean,
        default: false,
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
    &-info {
        border: 1px solid grey;
        border-radius: 0px 0px 10px 10px;
        padding: 12px;
        margin-bottom: 12px;
        margin-top: -12px;
        margin-left: 8px;
        margin-right: 8px;
        justify-content: space-between;
        p {
            color: #6a6a6a;
            font-size: 16px;
            font-weight: 500;
            font-style: acrobat;
        }
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
