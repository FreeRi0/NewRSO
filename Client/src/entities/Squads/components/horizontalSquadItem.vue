<template>

    <div v-if="props.competition === true && member ">
        <router-link :to="{ name: 'lso', params: { id: member.id } }"
            class="horizontal-item"
        >
            <div class="horizontal-img">
                <img :src="member?.banner" alt="logo" v-if="member?.banner" />
                <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontal-item-title">{{ member?.name }}</p>
                <div class="rating" v-if="rating">
                    <p>Место в рейтинге: 102</p>
                </div>
            </div>
        </router-link>
    </div>
    <div v-else-if="props.competition === true && member">
        <router-link :to="{ name: 'lso', params: { id: member.id } }"
            class="horizontal-item"

        >
            <div class="horizontal-img">
                <img :src="member?.banner" alt="logo" v-if="member?.banner" />
                <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontal-item-title">"{{ member?.name }}"</p>
                <div class="rating" v-if="rating">
                    <p>Место в рейтинге: 102</p>
                </div>
            </div>
        </router-link>
    </div>

    <div v-else-if="props.competition === false">
        <router-link
            class="horizontal-item"
            :to="{ name: 'lso', params: { id: squad.id } }"
        >
            <div class="horizontal-img">
                <img :src="squad.emblem" alt="logo" v-if="squad.emblem" />
                <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontal-item-title">"{{ squad.name }}"</p>
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
    },
    member: {
        type: Object,
    },
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
