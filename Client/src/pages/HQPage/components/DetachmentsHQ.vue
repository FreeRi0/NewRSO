<template>
    <section class="headquarters-detachments" v-if='squads.length'>
        <h3>Отряды штаба</h3>
        <div class="headquarters-detachments__container">
            <div class="squads">
                <div>
                    <squadsList
                        :squads="squads"
                    ></squadsList>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { HTTP } from '@app/http';
import { squadsList } from '@features/Squads/components';

const props = defineProps({
    headquarter: {
        type: Object,
        required: true,
    },
});
const squads = ref([]);

const filteredSquad = async (education) => {
    try {
        const { data } = await HTTP.get(
            `/detachments/?educational_institution__name=${education}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        squads.value = data;
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

watch(
    () => props.headquarter,

    (newheadquarter) => {
        if (Object.keys(props.headquarter).length === 0) {
            return;
        }
        filteredSquad(props.headquarter.educational_institution?.name);
    },
);

</script>

<style scoped lang="scss">
section.headquarters-detachments h3 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    /*  */
    margin-top: 60px;
    margin-bottom: 40px;
}

.headquarters-detachments__container {
    padding: 40px 0;
    margin-bottom: 36px;
    /* плашка */
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
    background-color: white;
}

.squads {
    &-title {
        font-size: 52px;
        @media screen and (max-width: 575px) {
            font-size: 32px;
        }
    }

    &-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 40px;
        @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
        @media screen and (max-width: 575px) {
            grid-template-columns: 1fr 1fr;
        }
    }
}
</style>
