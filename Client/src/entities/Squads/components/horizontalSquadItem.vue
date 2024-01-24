<template>
    <div>
        <router-link
            class="horizontal-item"
            :to="{ name: 'lso', params: { id: squad.id } }"
        >
            <div class="horizontal-img">
                <img :src="squad.emblem" alt="logo" v-if="squad.emblem" />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else />
            </div>
        </router-link>
    </div>
    <div v-if="competition">
        <router-link
            class="horizontal-item"
            :to="{ name: 'lso', params: { id: squad.detachment.id } }"
        >
            <div class="horizontal-img">
                <img :src="squad.detachment.banner" alt="logo" v-if="squad.detachment.banner" />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontal-item-title">"{{ squad.detachment.name }}"</p>
                <div class="rating" v-if="rating">
                    <p>Место в рейтинге: 102</p>
                </div>
            </div>
        </router-link>
    </div>
    <div v-if="competition">
        <router-link
            class="horizontal-item"
            :to="{ name: 'lso', params: { id: squad.junior_detachment.id } }"
        >
            <div class="horizontal-img">
                <img :src="squad.junior_detachment.banner" alt="logo" v-if="squad.junior_detachment.banner" />
                <img src="@app/assets/user-avatar.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontal-item-title">"{{ squad.junior_detachment.name }}"</p>
                <div class="rating" v-if="rating">
                    <p>Место в рейтинге: 102</p>
                </div>
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
        default: false,
    },
    competition: {
        type: Boolean,
        default: false,
    }
});
</script>
<style lang="scss" scoped>
.horizontal {
    &-item {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: baseline;
        align-items: center;

        padding: 4px 20px;

        border-radius: 10px;
        border: 1px solid #b6b6b6;
        background: #fff;
        margin-bottom: 12px;
        &-title {
            margin-left: 10px;
        }
    }
    &-img {
        img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
        }
    }
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 575px) {
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left: 10px;
    }
}

.rating {
    display: grid;
    grid-template-columns: auto 1fr 0fr;
}
</style>
