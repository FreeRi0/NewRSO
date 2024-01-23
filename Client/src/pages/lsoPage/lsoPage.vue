<template>
    <div class="container">
        <div class="squad-page">
            <h1 class="title title--lso">ЛСО</h1>
            <BannerSquad
                :squad="squad"
                :member="member"
                :edict="edict"
            ></BannerSquad>
            <section class="about-squad">
                <h3>Об отряде</h3>
                <p>
                    {{ squad.about }}
                </p>
            </section>
            <div class="mt-8 d-flex">
                <squadPhotos
                    class="photo-item"
                    :squad-photos="squad.photo1"
                ></squadPhotos>
                <squadPhotos
                    class="photo-item"
                    :squad-photos="squad.photo2"
                ></squadPhotos>
                <squadPhotos
                    class="photo-item"
                    :squad-photos="squad.photo3"
                ></squadPhotos>
                <squadPhotos
                    class="photo-item"
                    :squad-photos="squad.photo4"
                ></squadPhotos>
            </div>

            <SquadParticipants
                :squad="squad"
                :member="member"
            ></SquadParticipants>
        </div>
    </div>
</template>
<script setup>
import { BannerSquad } from '@features/baner/components';
import { squadPhotos } from '@shared/components/imagescomp';
import SquadParticipants from './components/SquadParticipants.vue';
import { ref, onMounted, watch } from 'vue';
import { HTTP } from '@app/http';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const squad = ref({});
const member = ref({});
const edict = ref({});
const route = useRoute();
let id = route.params.id;

const aboutSquad = async () => {
    await HTTP.get(`/detachments/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            squad.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

const aboutMembers = async () => {
    await HTTP.get(`/detachments/${id}/members/`, {
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
        aboutSquad();
        aboutMembers();
    }
});

watch(
    () => route.params.id,

    (newId, oldId) => {
        id = newId;
        aboutSquad();
        aboutMembers();
    },
);

onMounted(() => {
    aboutSquad();
    aboutMembers();
});
</script>
<style scoped lang="scss">
.squad-page {
    padding-top: 40px;
}
.title {
    //-----------------------------------общий класс для всех заголовков h1
    // font-family: ;
    font-size: 52px;
    line-height: 62px;
    font-weight: 700;
    color: #35383f;

    &--lso {
        margin-bottom: 50px;
    }
}
// .user-data__wrapper {
//     margin: 20px 0 12px 298px;
// }
/* Данные отряда */
.Squad-HQ__name {
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
.slogan {
    margin-top: 20px;
    margin-bottom: 9.5px;
}
.Squad-HQ__list {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 380px 300px;
}
.Squad-HQ__list li {
    border-right: none;
    height: 20px;
    margin: 0;
}
.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}
.Squad-HQ__date {
    display: flex;
}
.Squad-HQ__date p {
    margin-right: 22px;
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
    justify-content: space-between;
    margin: 16px 16px 0px 0px;
}

section.about-squad {
    margin-top: 60px;
}
.about-squad h3 {
    color: #35383f;
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.about-squad p {
    /* отступы */
    margin-top: 40px;
    margin-bottom: 40px;
    /*  */
    color: #1e1e1e;
    font-family: 'BertSans';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.photo-item {
    width: 260px;
    margin-right: 20px;
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
</style>
