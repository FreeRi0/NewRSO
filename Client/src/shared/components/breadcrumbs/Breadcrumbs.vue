<template>
    <ul class="breadcrumbs-container">
        <!-- <li v-for="item in items" :key="item.pageTitle">
            <a :href="item.href">
                {{ item.pageTitle }}
            </a>
        </li> -->
        <li v-for="route in routes" :key="route.path">
            <router-link
                :to="{ path: route.path }"
                v-slot="{ navigate }"
                @click="navigate"
            >
                {{ route.meta.label }}
            </router-link>
        </li>
        {{label}}
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// const props = defineProps({
//     items: Array,
// });

const props = defineProps({
    label: {
        type: String
    },
});

const route = useRoute();
const routes = route.matched;
// console.log(routes);

</script>

<style lang="scss" scoped>
.breadcrumbs-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 40px;
    padding: 0;
    font-family: 'Akrobat';
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    color: #35383f;

    @media (max-width: 360px) {
        margin-bottom: 20px;
    }

    li {
        margin-right: 5px;
        padding: 0 10px 0 0;
        position: relative;

        &::before {
            position: absolute;
            content: '/';
            right: 0;
            width: 5px;
            // color: red; //---------------------------------------------------------------
        }

        &:last-child::before {
            display: none;
        }
    }

    a {
        padding: 10px 0;
        color: #35383f;
        // background-color: grey;
    }

    //отключаем переход по ссылке "Структура" с адресом "/"
    a[href='/'] {
        pointer-events: none;
    }

    li:last-child a {
        color: #1c5c94;
        pointer-events: none;
    }
}
</style>
