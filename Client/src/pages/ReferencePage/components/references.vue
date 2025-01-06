<template>
    <div class="container">
        <div class="references-menu">
            <h2 class="references-menu__title">Оформление справок</h2>
            <div class="references-menu__wrapper">
                <referencesMenuItem v-for="item in referenceItems" :key="item.name" :title="item.title"
                    :route-name="item.routeName" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import referencesMenuItem from './referencesMenuItem.vue';

const referenceItems = ref([
    {
        title: 'Справка о членстве в РСО (для работодателя)',
        routeName: 'reference'
    },
    {
        title: 'Справка о членстве в РСО (для внутреннего пользования)',
        routeName: 'referenceForYou'
    }
]);
</script>

<style lang="scss" scoped>
.references-menu {
    padding: 0 0 350px 0;

    &__title {
        font-size: 52px;
        font-weight: 600;
    }

    &__wrapper {
        margin-top: 40px;
    }
}
</style>