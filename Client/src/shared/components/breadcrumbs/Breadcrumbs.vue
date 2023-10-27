<template>
    <ul class="breadcrumbs-container" :items="items">
        <li v-for="(item, i) in items" :key="i">
            <a :href="item.href">
                {{ item.pageTitle }}
            </a>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

const items = ref('');
</script>

<style lang="scss" scoped>
.breadcrumbs-container {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    padding: 0;
    // font-family:  ;
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
