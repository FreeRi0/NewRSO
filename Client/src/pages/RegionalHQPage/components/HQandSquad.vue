<template>
    <section class="headquarters_squads">
        <h3>Штабы и отряды штаба</h3>
        <div class="headquarters_squads__container">
            <div
                class="card"
                v-for="(HQandSquad, index) in HQandSquads"
                :class="{
                    'align-left': index % 2 === 0,
                    'align-right': index % 2 !== 0,
                }"
            >
                <a v-bind:href="HQandSquad.link"
                    ><p>{{ HQandSquad.name }}</p></a
                >
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
let id = route.params.id;

const HQandSquads = ref([
    {
        name: 'Окружные штабы',
        link: '/district-headquarters',
    },
    {
        name: 'Региональные штабы',
        link: '/regional-headquarters',
    },
    {
        name: 'Местные штабы',
        link: '/local-headquarters',
    },
    {
        name: 'Штабы СО ОО',
        link: '/all-headquarters',
    },
    {
        name: 'ЛСО',
        link: '/all-squads',
    },
]);
</script>
<style scoped lang="scss">
section.headquarters_squads {
    margin-bottom: 60px;
}
section.headquarters_squads h3 {
    color: #35383f;
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.headquarters_squads__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 40px;
}

.card {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    /*  */
    padding: 80px 20px;
    width: 280px;
    height: 220px;
    display: grid;
    align-items: center;
}
.card p {
    color: #35383f;
    text-align: center;
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

// адаптив
@media (max-width: 965px) {
    .headquarters_squads__container {
        justify-items: center;
        column-gap: 40px;
    }
    .card.align-left {
        margin-left: auto;
    }
    .card.align-right {
        margin-right: auto;
    }
}

@media (max-width: 648px) {
    .card.align-left {
        margin-left: 0;
    }
    .card.align-right {
        margin-right: 0;
    }
}

@media screen and (min-width: 320px) and (max-width:480px) {
    .card {
        padding: 16px;
        width: 256px;
        height: 125px;
    }
    .card p {
        font-size: 20px;
    }
}
</style>
