<template>
    <section class="competition__promo-lso">
        <div class="competition__container">
            <div class="competition__image-box">
                <!-- <img
                    src="@app/assets/competition/promo.png"
                    alt="Логотип конкурса."
                    width="1124"
                    height="481"
                /> -->
                <img v-if="sizeImage == 'mobile'" src="@app/assets/competition/mobile-promo.png" alt="Логотип конкурса"
                    width="312" height="150" />
                <img v-else-if="sizeImage == 'tablet'" src="@app/assets/competition/tablet-promo.png"
                    alt="Логотип конкурса" width="668" height="320" />
                <img v-else-if="sizeImage == 'laptop'" src="@app/assets/competition/laptop-promo.png"
                    alt="Логотип конкурса" width="836" height="402" />
                <img v-else src="@app/assets/competition/desktop-promo.png" alt="Логотип конкурса" width="1124"
                    height="481" />
            </div>

            <div class="competition__link-container">
                <ul class="competition__link-group">
                    <li class="competition__label">
                        <a href="/CompetitionParticipants">Участник конкурса</a>
                    </li>
                    <li class="competition__label">
                        <a href="/Competition">Номинация «{{ squad.nomination }}»</a>
                    </li>
                    <li v-if="squad.status === 'Наставник'" class="competition__label">
                        <router-link :to="{
                            name: 'lso',
                            params: { id: squad.tandem_partner.id },
                        }">Наставник ЛСО «{{ squad.tandem_partner.name }}»
                        </router-link>
                    </li>

                    <li v-if="squad.status === 'Старт'" class="competition__label">
                        <router-link :to="{
                            name: 'lso',
                            params: { id: squad.tandem_partner.id },
                        }">Под наставничеством ЛСО «{{
                            squad.tandem_partner.name
                        }}»
                        </router-link>
                    </li>
                </ul>

                <!-- <span class="competition__label competition__rating"
                    >Место в рейтинге: {{ squad.rating_position }}</span
                > -->
            </div>
        </div>

        <div
            v-if="(roleStore.status.is_commander_detachment && roleStore.roles?.detachment_commander?.id === squad.id) || (roleStore.roles?.regionalheadquarter_commander?.id === squadsStore.squad?.regional_headquarter)">
            <router-link :to="{
                name: 'debut',
                params: { id: squad.id },
            }">
                <div class="route">Отчетность</div>
            </router-link>
        </div>

    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoleStore } from '@layouts/store/role';
import { useSquadsStore } from '@features/store/squads';

defineProps({
    squad: {
        type: Object,
        default: () => ({}),
    },
});


const squadsStore = useSquadsStore();
const roleStore = useRoleStore();
// const regComLocal = computed(() => {
//     return squadsStore.competitionSquads.find((item) => item?.detachment?.regional_headquarter_name || item?.junior_detachment?.regional_headquarter_name === roleStore.roles?.
//         regionalheadquarter_commander?.name
//     );
// })


let sizeImage = ref('desktop');

const getSizeImage = () => {
    // console.log('ширина экрана', window.innerWidth);
    if (window.innerWidth <= 360) {
        sizeImage.value = 'mobile';
    }
    if (window.innerWidth > 360 && window.innerWidth <= 768) {
        sizeImage.value = 'tablet';
    }
    if (window.innerWidth > 768 && window.innerWidth <= 1024) {
        sizeImage.value = 'laptop';
    }
    if (window.innerWidth > 1024) {
        sizeImage.value = 'desktop';
    }
};

onMounted(async () => {
    getSizeImage();
    window.addEventListener('resize', getSizeImage);
});

onUnmounted(() => {
    window.removeEventListener('resize', getSizeImage);
});
</script>
<style lang="scss">
.route {
    margin-top: 40px;
    text-align: center;
    color: #5e5c5c;
    text-decoration: underline;
}
</style>
