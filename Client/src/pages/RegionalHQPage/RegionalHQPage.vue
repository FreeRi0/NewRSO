<template>
    <div class="container">
        <h1 class="title title--hq">Региональный штаб</h1>
        <BannerHQ
            v-if="showHQ"
            :headquarter="headquarter"
            :edict="educt"
            :member="member"
        ></BannerHQ>
        <BannerHQ
            v-else-if="showDistrictHQ"
            :districtHeadquarter="districtHeadquarter"
            :edict="educt"
            :member="member"
        ></BannerHQ>
        <BannerHQ
            v-else-if="showLocalHQ"
            :localHeadquarter="localHeadquarter"
            :edict="educt"
            :member="member"
        ></BannerHQ>
        <BannerHQ
            v-else-if="showRegionalHQ"
            :regionalHeadquarter="regionalHeadquarter"
            :edict="educt"
            :member="member"
        ></BannerHQ>
        <BannerHQ
            v-else
            :centralHeadquarter="centralHeadquarter"
            :edict="educt"
            :member="member"
        ></BannerHQ>
        <section class="about-hq">
            <h3>Описание регионального штаба</h3>
            <p v-if="showHQ">
                {{ localHeadquarter.about }}
            </p>
            <p v-else-if="showDistrictHQ">{{ districtHeadquarter.about }}</p>
            <p v-else-if="showLocalHQ">{{ localHeadquarter.about }}</p>
            <p v-else-if="showRegionalHQ">{{ regionalHeadquarter.about }}</p>
            <p v-else>{{ centralHeadquarter.about }}</p>
        </section>
        <ManagementHQ
            :member="member"
            head="Руководство регионального штаба"
        ></ManagementHQ>
        <!-- <HQandSquad></HQandSquad> -->
        <section class="headquarters_squads">
            <h3>Штабы и отряды регионального штаба</h3>
            <div class="headquarters_squads__container">
                <div

                    :key="index"

                    class="card"
                    v-for="(HQandSquad, index) in HQandSquads"
                    :class="{
                        'align-left': index % 2 === 0,
                        'align-right': index % 2 !== 0,
                    }"
                >

                    <a
                        v-bind:href="HQandSquad.link"
                        @click="saveSortHQ(regionalHeadquarter.name)"

                        ><p>{{ HQandSquad.name }}</p></a
                    >
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { BannerHQ } from '@features/baner/components';
import ManagementHQ from '../HQPage/components/ManagementHQ.vue';
import { ref, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { usePage } from '@shared';

const showRegionalHQ = ref(true);
const showDistrictHQ = ref(false);
const showLocalHQ = ref(false);
const showHQ = ref(false);

const regionalHeadquarter = ref({});
const member = ref([]);
const educt = ref({});
const route = useRoute();
let id = route.params.id;

const { replaceTargetObjects } = usePage();

const aboutRegionalHQ = async () => {
    await HTTP.get(`/regionals/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            regionalHeadquarter.value = response.data;
            replaceTargetObjects([regionalHeadquarter.value]);
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const aboutMembers = async () => {
    await HTTP.get(`/regionals/${id}/members/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            member.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
        aboutRegionalHQ();
        aboutMembers();
    }
});
watch(
    () => route.params.id,

    (newId, oldId) => {
        id = newId;
        aboutRegionalHQ();
        aboutMembers();
    },
);

onMounted(() => {
    aboutRegionalHQ();
    aboutMembers();
});


const pages = [
    { pageTitle: 'Структура', href: '#' },
    { pageTitle: 'Региональные штабы', href: '#' },
    { pageTitle: `${regionalHeadquarter.name}`, href: '#' },
];

//блок отряды и штабы регионального штаба
const HQandSquads = ref([
    {
        name: 'Местные штабы',
        link: '/LocalHeadquarters',
    },
    {
        name: 'Штабы СО ОО',
        link: '/AllHeadquarters',
    },
    {
        name: 'ЛСО',
        link: '/AllSquads',
    },
]);

function saveSortHQ(value) {
    localStorage.setItem('sortHQ', value);
}

// let sortHQ = localStorage.getItem('sortHQ');
// console.log(sortHQ);

</script>
<style scoped lang="scss">
.title {
    //-----------------------------------общий класс для всех заголовков h1
    // font-family: ;
    font-size: 52px;
    line-height: 62px;
    font-weight: 700;
    color: #35383f;

    &--hq {
        margin-bottom: 50px;
    }
}
.user-data__wrapper {
    margin: 32px 0 16px 298px;
}

.Squad-HQ__name {
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
.slogan {
    margin-top: 20px;
    margin-bottom: 5.5px;
    display: flex;
    flex-direction: column;
    row-gap: 5.5px;
}
.Squad-HQ__list {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 410px 300px;
}
.Squad-HQ__list li {
    border-right: none;
    height: 20px;
    margin: 0;
}
.Squad-HQ__date p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.user-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}
.squad-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;
}
.squad-data__contacts {
    display: grid;
}
.squad-data__contacts {
    display: flex;
    flex-direction: column;
}
.squad-data__social-network {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    margin: 16px 16px 0px 0px;
}

.about-hq {
    font-size: 27px;
    font-family: 'Akrobat';
    margin-bottom: 60px;
}

@media (max-width: 1110px) {
    .Squad-HQ__list {
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    }
    .Squad-HQ__university p {
        border-right: 0;
        margin-right: 0;
        padding-right: 0;
    }
    .Squad-HQ__list li {
        margin-bottom: 8px;
    }
}
@media (max-width: 790px) {
    .squad-data__contacts-wrapper {
        flex-direction: column;
    }
    .user-data__link {
        align-self: start;
    }
    .squad-data__social-network {
        justify-content: start;
        margin: 16px 16px 20px 0px;
        gap: 12px;
    }
}
@media (max-width: 730px) {
    .user-data__wrapper {
        margin: 20px 0 12px 265px;
    }
    .user-metric {
        grid-template-columns: 15px 135px 135px 2fr 16px;
    }
}
@media (max-width: 690px) {
    .user-metric {
        grid-template-columns: 3fr 0fr 16fr 1fr;
    }
    .user-data__wrapper {
        margin: 105px 5px 20px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .Squad-HQ__university p {
        text-align: center;
    }
    .Squad-HQ__list li {
        justify-content: center;
    }
    .Squad-HQ__name {
        text-align: center;
    }
    .squad-data__contacts {
        align-self: center;
    }
}
@media (max-width: 430px) {
    .user-metric {
        grid-template-columns: 6fr 0fr 16fr 1fr;
    }
}
@media (max-width: 415px) {
    .Squad-HQ__list {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        row-gap: 30px;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
@media (max-width: 450px) {
    .headquarters_squads__container {
        grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
        column-gap: 16px;
        row-gap: 16px;
    }
    .card {
        padding: 16px;
        width: 156px;
        height: 165px;
    }
    .card p {
        font-size: 18px;
    }
}
</style>
