<template>
    <div v-if="props.competition === true" class="d-flex">
        <router-link
            v-if="member.detachment"
            :to="{ name: 'lso', params: { id: member.detachment.id } }"
            class="horizontal-item"
        >
            <div class="horizontal-img">
                <img
                    :src="member.detachment?.banner"
                    alt="logo"
                    v-if="member.detachment?.banner"
                />
                <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontal-item-title ml-2">
                    {{ member.detachment?.name }}
                </p>
            </div>
        </router-link>

        <router-link
            :to="{ name: 'lso', params: { id: member.junior_detachment.id } }"
            class="horizontal-item ml-3"
        >
            <div class="horizontal-img">
                <img
                    :src="member.junior_detachment?.banner"
                    alt="logo"
                    v-if="member.junior_detachment?.banner"
                />
                <img src="@app/assets/hq-emblem.png" alt="logo" v-else />
            </div>
            <div class="containerHorizontal">
                <p class="horizontal-item-title ml-2">
                    {{ member.junior_detachment?.name }}
                </p>
            </div>
        </router-link>

        <div
            class="horizontal-item ml-3"
            v-if="member?.junior_detachment !== null"
        >
            <p class="horizontal-item-title ml-2">
                {{ member.junior_detachment?.regional_headquarter_name }}
            </p>
        </div>
        <div class="horizontal-item mini ml-2" v-if="rating">
            <p v-if="place.place">Место в рейтинге: {{ place.place }}</p>
            <p v-else>Место в рейтинге: -</p>
        </div>
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
            <div class="containerHorizontal ml-2">
                <p class="horizontal-item-title">{{ squad.name }}</p>
            </div>
        </router-link>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { HTTP } from '@app/http';
import { useRoleStore } from '@layouts/store/role';
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
const roleStore = useRoleStore();
const place = ref([]);

let id = props.member?.junior_detachment?.id;

const getPlaces = async () => {
    const response = await HTTP.get(`detachments/${id}/competitions/1/place/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    });
    let data = response.data;
    place.value = data;
};

onMounted(() => {
    if (props.competition) {
        getPlaces();
    }
});
</script>
<style lang="scss" scoped>
.horizontal {
    &-item {
        display: grid;
        grid-template-columns: auto 1fr auto auto;
        align-items: baseline;
        align-items: center;
        width: 100%;
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

// .rating {
//     border-radius: 10px;
//     border: 1px solid #b6b6b6;
//     font-size: 16px;
//     padding: 4px 13px;
//     display: grid;
//     grid-template-columns: auto 1fr auto auto;
//     align-items: baseline;
//     align-items: center;
//     width: 40%;
// }
.mini {
    width: 100%;
    max-width: 182px;
}
</style>
