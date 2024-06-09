<template>
    <div class="container">
        <div class="squad-page" v-if="!isLoading.isLoading.value">
            <h1 class="title title--lso">ЛСО</h1>
            <BannerSquad :squad="squad.squad.value" :member="member.members.value" :getEnding="getEnding"></BannerSquad>
            <section class="about-squad" v-if="
                squad.squad.value.about && squad.squad.value.about != 'null'
            ">
                <h3>Об отряде</h3>
                <p>
                    {{ squad.squad.value.about }}
                </p>
            </section>
            <div class="mt-8 photoWrapper">
                <squadPhotos class="photo-item" :squad-photos="squad.squad.value.photo1"></squadPhotos>
                <squadPhotos class="photo-item" :squad-photos="squad.squad.value.photo2"></squadPhotos>
                <squadPhotos class="photo-item" :squad-photos="squad.squad.value.photo3"></squadPhotos>
                <squadPhotos class="photo-item photo-item-last" :squad-photos="squad.squad.value.photo4"></squadPhotos>
            </div>

            <CompetitionPromo v-if="squad.squad.value.nomination" :squad="squad.squad.value"></CompetitionPromo>
            <ManagementSquad class="mt-12" :commander="commander" :member="filteredMembers" head="Командир отряда"
                :position="position"></ManagementSquad>
            <SquadParticipants :squad="squad.squad.value" :member="member.members.value"></SquadParticipants>
        </div>
        <v-progress-circular class="circleLoader" v-else indeterminate color="blue"></v-progress-circular>
    </div>
</template>
<script setup>
import { BannerSquad } from '@features/baner/components';
import { squadPhotos } from '@shared/components/imagescomp';
import { useSquadsStore } from '@features/store/squads';
import SquadParticipants from './components/SquadParticipants.vue';
import ManagementSquad from './components/ManagementSquad.vue';
import { CompetitionPromo } from '@/features/Competition';
import { ref, onMounted, watch, computed } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePage } from '@shared';

const squadsStore = useSquadsStore();
const squad = storeToRefs(squadsStore);
const member = storeToRefs(squadsStore);
const applications = ref([]);
const isLoading = storeToRefs(squadsStore);
const commander = ref({});

const route = useRoute();
let id = route.params.id;

const { replaceTargetObjects } = usePage();

const fetchCommander = async () => {
    try {
        let id = squad.squad.value.commander.id;
        const response = await HTTP.get(`/users/${id}/`,);

        commander.value = response.data;
        // console.log(response);
    } catch (error) {
        console.log(error);
    }
};

const filteredMembers = computed(() => {
    return member.members.value.filter((manager) => {
        return manager.position && manager.position === 'Командир';
    });
});

watch(
    () => route.params.id,

    async (newId, oldId) => {
        if (!newId || route.name !== 'lso') return;
        await squadsStore.getSquadId(newId);
        await squadsStore.getSquadMembers(newId);
        await replaceTargetObjects([squad.squad.value]);
        await fetchCommander();
    },
    {
        immediate: true,
    },
);

const getEnding = computed(() => {
    const count = squadsStore.squad.participants_count;

    if (count === 1 && count % 100 !== 11) {
        return 'участник';
    } else if ([2, 3, 4].includes(count)) {
        return 'участника';
    } else {
        return 'участников';
    }
});
</script>
<style scoped lang="scss">
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

.circleLoader {
    width: 60px;
    height: 60px;
    display: block;
    margin: 30px auto;
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
    font-family: 'Bert Sans';
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
    font-family: 'Akrobat';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.photo-item {
    width: 280px;
    margin-right: 20px;

    @media screen and (max-width: 575px) {
        height: 373px;
        width: 280px;
        margin-right: 0;
    }
}

.photo-item-last {
    margin-right: 0;
}

.photoWrapper {
    display: flex;

    @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: 0.28fr 0.28fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        justify-content: center;
    }

    @media screen and (max-width: 575px) {
        grid-template-columns: 0.28fr;
    }
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
@shared/components/inputs/imagescomp
