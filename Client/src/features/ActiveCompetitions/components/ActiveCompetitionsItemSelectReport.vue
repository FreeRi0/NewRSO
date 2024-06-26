<template>
    <div class="competition__item">
        <div class="competition__content">
            <div class="horizontal-item__wrapper">
                <div class="containerHorizontal">
                    <p class="cursor_redirect" @click="clickIndicator(report.indicator)">
                        {{ indicator.name[report.indicator - 1] }}
                    </p>
                </div>
            </div>

            <div class="competition__detachments">
                <div class="horizontal-item__wrapper">
                    <img v-if="detachmentData.banner" class="competition__avatar_circle" :src="detachmentData.banner"
                        alt="Banner" />

                    <div v-else class="competition__avatar_circle blue-bg"></div>

                    <div class="containerHorizontal">
                        <p class="cursor_redirect" @click="clickDetacment(detachmentData.id)">
                            {{ detachmentData.name }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="horizontal-item__wrapper competitition">
                <img class="competition__avatar_square" src="@app/assets/competition/tablet-promo.png" alt="" />

                <div class="containerHorizontal">
                    <p class="cursor_redirect" @click="onCompetition">
                        {{ competition?.name }}
                    </p>
                </div>
            </div>

            <div class="horizontal-item__wrapper competition__nomination">
                {{ isTandem ? 'Тандем' : 'Дебют' }}
            </div>

            <div class="horizontal-item__wrapper">{{ action }}</div>

            <div class="horizontal__confidant">
                <input type="checkbox" v-model="isChecked" @change="onCheckbox" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isTandem = ref(false);

const detachmentData = ref({});
const competition = ref();
const indicator = {
    name: [
        '1. Численность членов линейного студенческого отряда в соответствии с объемом уплаченных членских взносов',
        '2. Прохождение Командиром и Комиссаром студенческого отряда региональной школы командного состава',
        '3. Получение командным составом отряда образования в корпоративном университете РСО',
        '4. Прохождение обучение по охране труда и пожарной безопасности в рамках недели охраны труда РСО',
        '5. Процент членов студенческого отряда прошедших профессиональное обучение',
        '6. Участие членов студенческого отряда в обязательных общесистемных мероприятиях на региональном уровне',
        '7. Участие членов студенческого отряда в, окружных и межрегиональных мероприятиях РСО',
        '8. Участие членов студенческого отряда во всероссийских мероприятиях РСО',
        '9. Призовые места отряда в окружных и межрегиональных мероприятиях и конкурсах РСО',
        '10. Призовые места отряда во Всероссийских мероприятиях и конкурсах РСО',
        '11. Призовые места отряда на окружных и межрегиональных трудовых проектах',
        '12. Призовые места отряда на всероссийских трудовых проектах',
        '13. Организация собственных мероприятий отряда',
        '14. Отношение количества бойцов, отработавших в летнем трудовом семестре к общему числу членов отряда',
        '15. Победы членов отряда в региональных, окружных и всероссийских грантовых конкурсах, направленных на развитие студенческих отрядов',
        '16. Активность отряда в социальных сетях',
        '17. Количество упоминаний в СМИ о прошедших творческих, добровольческих и патриотических мероприятиях отряда',
        '18. Охват бойцов, принявших участие во Всероссийском дне ударного труда',
        '19. Отсутствие нарушении техники безопасности, охраны труда и противопожарной безопасности в трудовом семестре',
        '20. Соответствие требованиями положения символики и атрибутике форменной одежды и символики отрядов',
    ],
};

const router = useRouter();

const props = defineProps({
    report: {
        type: Object,
        default: () => ({}),
    },
    action: {
        type: String,
        default: '',
    },
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(true);

const clickDetacment = (id) => {
    router.push({
        name: 'DetachmentData',
        params: {
            id: id,
        },
    });
};

const clickIndicator = (id) => {
    router.push({
        name: 'indicatorPage',
        params: {
            id: id,
        },
    });
};

const onCompetition = () => {
    router.push({
        name: 'Competition',
    });
};

const onCheckbox = (e) => {
    emit('select', props.report, e.target.checked);
};

const getCompetition = async () => {
    try {
        if (props.report.detachment_report) {
            competition.value = props.report.detachment_report.competition;
        } else {
            const { data } = await HTTP.get(
                `/competitions/${props.report.competition}/`,
            );
            competition.value = data;
        }
    } catch (e) {
        console.log(`getCompetitions error`, e);
    }
};

const getDetachmentData = async () => {
    try {
        if (props.report.detachment_report) {
            detachmentData.value = props.report.detachment_report.detachment;
        } else {
            const { data } = await HTTP.get(
                `/detachments/${props.report.detachment}/`,
            );
            detachmentData.value = data;
        }
    } catch (e) {
        console.log(`getDetachmentData error`, e);
    }
};

const getIsTandemInfo = async () => {
    try {
        const { data } = await HTTP.get(
            `/detachments/${props.report.detachment}/competitions/1/is_tandem/`,

        );
        // console.log(data);
        isTandem.value = data.is_tandem;
    } catch (e) {
        console.log(`getIsTandemInfo error`, e);
    }
};

onMounted(async () => {
    await getIsTandemInfo();
    await getCompetition();
    await getDetachmentData();
});
</script>

<style scoped lang="scss">
.horizontal__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    margin-bottom: 12px;

    input {
        width: 100%;
        height: 100%;
    }
}

.competition__content {
    display: grid;
    grid-gap: 12px;
    //grid-template-columns: 1fr minmax(142px, 276px) 96px 118px 50px;
    grid-template-columns:
        minmax(200px, 286px) minmax(200px, 286px) minmax(200px, 286px) 96px 118px 50px;
}

.competition__detachments {
    display: flex;
    grid-gap: 12px;
    grid-template-columns: 1fr 1fr;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.competition__avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}

.competition__avatar_square {
    object-fit: cover;
    border-radius: 10px;
    width: 52px;
    height: 40px;
}

.horizontal-item__wrapper {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    align-items: center;

    padding: 4px 20px;

    gap: 10px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
    margin-bottom: 12px;
    width: 100%;
}

.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cursor_redirect {
    cursor: pointer;
}

.competition__nomination {
    display: flex;
    justify-content: center;
}

.blue-bg {
    background-color: #c7e3fa;
}
</style>
