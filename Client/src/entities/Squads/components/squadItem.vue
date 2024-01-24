<template>
    <div class="squads-wrapper__item rating_wrapper">
        <router-link :to="{ name: 'lso', params: { id: squad.id } }">
            <div class="round-img">
                <img :src="squad.emblem" alt="logo" v-if="squad.emblem" />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else />
            </div>
            <div class="container-squad">
                <p class="squads-wrapper__item-title normal-title">
                    {{ squad.name }}
                </p>
            </div>
        </router-link>
    </div>
    <div v-if="competition" class="squads-wrapper__item rating_wrapper">
        <router-link :to="{ name: 'lso', params: { id: squad.detachment.id } }">
            <div class="round-img">
                <img :src="squad.detachment.banner" alt="logo" v-if="squad.detachment.banner" />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else />
            </div>
            <div class="container-squad">
                <p class="squads-wrapper__item-title normal-title">
                    {{ squad.detachment.name }}
                </p>
            </div>
            <div class="container-squad" v-if="rating">
                <p class="squads-wrapper__item-title normal-title">
                   Место в рейтинге: 102
                </p>
            </div>
        </router-link>
    </div>
    <div v-if="competition" class="squads-wrapper__item rating_wrapper">
        <router-link :to="{ name: 'lso', params: { id: squad.junior_detachment.id } }">
            <div class="round-img">
                <img :src="squad.junior_detachment.banner" alt="logo" v-if="squad.junior_detachment.banner" />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else />
            </div>
            <div class="container-squad">
                <p class="squads-wrapper__item-title normal-title">
                    {{ squad.junior_detachment.name }}
                </p>
            </div>
            <div class="container-squad" v-if="rating">
                <p class="squads-wrapper__item-title normal-title">
                   Место в рейтинге: 102
                </p>
            </div>
        </router-link>
    </div>
</template>
<script setup>
const props = defineProps({
    squad: {
        type: Object,
        required: true,
    },
    rating: {
        type: Boolean,
        default: false
    },
    competition: {
        type: Boolean,
        default: false
    }
});
</script>
<style lang="scss">
.round-img {
    img {
        width: 128px;
        height: 128px;
        display: block;
        margin: 0px auto;
        border-radius: 100%;
    }
}
.squads-wrapper__item {
    margin: 0px auto;
    width: 180px;

    &-category {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        text-transform: uppercase;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
    }
    &-title {
        text-align: center;
        font-size: 20px;
        font-family: 'Akrobat';
        color: #1e1e1e;
    }
}

.rating__wrapper {
    width: 200px;
}
</style>
