<template>
    <ul class="breadcrumbs-container">
        <li v-for="item in items" :key="item.pageTitle">
            <a :href="item.href">
                {{ item.pageTitle }}
            </a>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    items: Array,
});
</script>

<style lang="scss" scoped>
.breadcrumbs-container {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    padding: 0;
    font-family: 'Akrobat';
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    color: #35383f;

    li {
        margin-right: 5px;
        padding: 0 10px 0 0;
        position: relative;

        &::before {
            position: absolute;
            content: '/';
            right: 0;
            width: 5px;
        }

        &:last-child::before {
            display: none;
        }
    }

    a {
        padding: 10px 0;
        color: #35383f;
    }

    li:last-child a {
        color: #1c5c94;
        pointer-events: none;
    }
}
</style>
