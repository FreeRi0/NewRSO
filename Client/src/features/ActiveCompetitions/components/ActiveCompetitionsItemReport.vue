<template>
    <div class="competition__item">
        <div class="competition__content">
            <template v-if="position == 1">
                <span></span>
                <span>Показатель</span>
                <span>Отряд</span>
                <span>Конкурс</span>
                <span>Номинация</span>
            </template>

            <div class="horizontal__confidant">
                <input
                    type="checkbox"
                    v-model="isChecked"
                    @change="onCheckbox"
                />
            </div>

            <div class="horizontal-item__wrapper">
                <div class="containerHorizontal">
                    <p class="cursor_redirect" @click="clickIndicator(report)">
                        {{ indicator.name[report.indicator - 1] }}
                    </p>
                </div>
            </div>

            <div class="competition__detachments">
                <div v-if="detachmentData" class="horizontal-item__wrapper">
                    <img
                        v-if="detachmentData.banner"
                        class="competition__avatar_circle"
                        :src="detachmentData.banner"
                        alt="Banner"
                    />

                    <div
                        v-else
                        class="competition__avatar_circle blue-bg"
                    ></div>

                    <div class="containerHorizontal">
                        <p
                            class="cursor_redirect"
                            @click="clickDetacment(detachmentData.id)"
                        >
                            {{ detachmentData.name }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="horizontal-item__wrapper competitition">
                <img
                    class="competition__avatar_square"
                    src="@app/assets/competition/tablet-promo.png"
                    alt="banner"
                />

                <div class="containerHorizontal">
                    <p class="cursor_redirect" @click="onCompetition">
                        {{ competition?.name }}
                    </p>
                </div>
            </div>

            <div class="horizontal-item__wrapper competition__nomination">
                {{ detachmentData ? 'Дебют' : 'Тандем' }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { ref, watch, onMounted } from 'vue';

import { useRouter } from 'vue-router';

const indicator = {
    name: [
        'Численность членов линейного студенческого отряда в соответствии с объемом уплаченных членских взносов',
        'Прохождение Командиром и Комиссаром студенческого отряда региональной школы командного состава',
        'Получение командным составом отряда образования в корпоративном университете РСО',
        'Прохождение обучение по охране труда и пожарной безопасности в рамках недели охраны труда РСО',
        'Процент членов студенческого отряда прошедших профессиональное обучение',
        'Участие членов студенческого отряда в обязательных общесистемных мероприятиях на региональном уровне',
        'Участие членов студенческого отряда в, окружных и межрегиональных мероприятиях РСО',
        'Участие членов студенческого отряда во всероссийских мероприятиях РСО',
        'Призовые места отряда в окружных и межрегиональных мероприятиях и конкурсах РСО',
        'Призовые места отряда во Всероссийских мероприятиях и конкурсах РСО',
        'Призовые места отряда на окружных и межрегиональных трудовых проектах',
        'Призовые места отряда на всероссийских трудовых проектах',
        'Организация собственных мероприятий отряда',
        'Отношение количества бойцов, отработавших в летнем трудовом семестре к общему числу членов отряда',
        'Победы членов отряда в региональных, окружных и всероссийских грантовых конкурсах, направленных на развитие студенческих отрядов',
        'Активность отряда в социальных сетях',
        'Количество упоминаний в СМИ о прошедших творческих, добровольческих и патриотических мероприятиях отряда',
        'Охват бойцов, принявших участие во Всероссийском дне ударного труда',
        'Отсутствие нарушении техники безопасности, охраны труда и противопожарной безопасности в трудовом семестре',
        'Соответствие требованиями положения символики и атрибутике форменной одежды и символики отрядов',
    ],
};

const detachmentData = ref({});
const competition = ref({});

const router = useRouter();

const props = defineProps({
    report: {
        type: Object,
        default: () => ({}),
    },
    position: {
        type: Number,
        default: 0,
    },
});

const emit = defineEmits({
    select: null,
});

const isChecked = ref(false);

const onCheckbox = (e) => {
    emit('select', props.report, e.target.checked);
};

const clickIndicator = (report) => {
    console.log(report);
    router.push({
        name: 'indicatorPage',
        params: {
            id: report.indicator,
            applicationId: report.id,
        },
    });
};

const clickDetacment = (id) => {
    router.push({
        name: 'DetachmentData',
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

const getCompetition = async () => {
    try {
        if (props.report.detachment_report) {
            competition.value = props.report.detachment_report.competition;
        } else {
            const { data } = await HTTP.get(
                `/competitions/${props.report.competition}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            competition.value = data;
        }
        console.log(competition.value);
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
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                },
            );
            detachmentData.value = data;
        }

        console.log(detachmentData.value);
    } catch (e) {
        console.log(`getDetachmentData error`, e);
    }
};

watch(
    () => props.report.selected,
    (newSelected) => {
        isChecked.value = newSelected;
    },
);

onMounted(() => {
    getCompetition();
    getDetachmentData();
});
</script>

<style scoped lang="scss">
.horizontal__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    margin-bottom: 12px;
    //max-height: 48px;
    input {
        width: 100%;
        height: 100%;
    }
}
.competition__item {
    display: grid;
    width: 100%;
    gap: 12px;
}

.blue-bg {
    background-color: #c7e3fa;
}

.competition__content {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: 48px minmax(200px, 300px) minmax(200px, 300px) 1fr 100px;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.competition__detachments {
    display: flex;
    grid-gap: 12px;
    grid-template-columns: 1fr 1fr;
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
</style>
