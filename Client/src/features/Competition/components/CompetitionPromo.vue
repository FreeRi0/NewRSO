<template>
    <section class="competition__promo-lso">
        <div class="competition__container">
            <div class="competition__image-box">
                <img
                    :src="'/assets/competition/promo.png'"
                    alt="Логотип конкурса"
                    width="1500"
                    height="720"
                />
            </div>

            <ul class="competition__link-group">
                <li class="competition__label">
                    <a href="/CompetitionParticipants">Участник конкурса</a>
                </li>
                <li class="competition__label">
                    <a href="/Competition"
                        >Номинация «{{ squad.nomination }}»</a
                    >
                </li>
                <li
                    v-if="squad.status === 'Наставник'"
                    class="competition__label"
                >
                    <router-link
                        :to="{
                            name: 'lso',
                            params: { id: squad.tandem_partner.id },
                        }"
                        >Наставник «{{ squad.tandem_partner.name }}»
                    </router-link>
                </li>

                <li v-if="squad.status === 'Старт'" class="competition__label">
                    <router-link
                        :to="{
                            name: 'lso',
                            params: { id: squad.tandem_partner.id },
                        }"
                        >Под наставничеством «{{ squad.tandem_partner.name }}»
                    </router-link>
                </li>
            </ul>

            <!-- <span class="competition__label competition__rating"
                >Место в рейтинге: {{ squad.rating_position }}</span
            > -->
        </div>

        <!-- <a href="#" class="competition__send-report">Отправить отчетность</a> -->
    </section>
</template>

<script setup>
defineProps({
    squad: {
        type: Object,
        default: () => ({}),
    },
});
</script>
<style lang="scss"></style>
