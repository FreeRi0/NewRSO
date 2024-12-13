<template>
    <div
        :class="{ 'top': isLoading || !headquarters.length && !horizontal, 'headquarters-wrapper': !isLoading && headquarters.length && !horizontal, 'horizontal': !isLoading && headquarters.length && horizontal }">
        <template v-if="isLoading">
            <v-progress-circular class="circleLoader text-center" indeterminate color="blue"></v-progress-circular>
        </template>
        <template v-else>
            <template v-if="headquarters.length && !horizontal">
                <headquarterItem v-for="headquarter in headquarters" :headquarter="headquarter" :name="props.name"
                    :key="headquarter.id" />
            </template>
            <template v-else-if="headquarters.length && horizontal">
                <headquarterItem v-for="headquarter in headquarters" :headquarter="headquarter" :horizontal="true"
                    :name="props.name" :key="headquarter.id" />
            </template>
            <p v-else>Ничего не найдено</p>
        </template>
    </div>
</template>
<script setup>
import { headquarterItem } from '@entities/HeadquartersData'
const props = defineProps({
    headquarters: {
        type: Array,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: false,
    },
    horizontal: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: 'HQ',
    }
});
</script>
<style lang="scss" scoped>
.top {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
}

.horizontal {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
}


.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
}
</style>
