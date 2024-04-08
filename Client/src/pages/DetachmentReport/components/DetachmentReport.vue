<template>
    <div class="container" v-if="!loading">
        <p class="main_text">Отчетность</p>

        <div class="containers_result">
            <div
                class="inline-container"
                v-for="(result, index) in mainResults.data"
                :key="index"
            >
                <div class="result-container">
                    <div class="horizontal-item__wrapper">
                        <div class="containerHorizontal">
                            <p class="horizontal-item__list-full">
                                {{ result }}
                            </p>
                        </div>
                    </div>
                    <div class="horizontal-item__result-wrapper">
                        <p class="horizontal-item__result">
                            {{ mainResults.place[index] }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <template class="data__btns">
            <Button
                type="button"
                class="input_data"
                label="Внести данные"
                @click="onAction"
            ></Button>
        </template>

        <div class="indicators">
            <template class="indicator-text">
                <p>Показатель</p>
                <p>Место</p>
            </template>
            <div
                class="indicator-container"
                v-for="(indicator, index) in resultData.indicators"
                :key="index"
            >
                <div class="horizontal-item__wrapper">
                    <div class="containerHorizontal">
                        <p class="horizontal-item__list-full">
                            {{ indicator }}
                        </p>
                    </div>
                </div>
                <div class="horizontal-item__result-wrapper">
                    <p class="horizontal-item__result">
                        {{ resultData.places[index] }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDebut = ref();

const router = useRouter();
const commander = ref(false);
const loading = ref(true);

const resultData = ref({
    indicators: [
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
    places: [
        'Показатель не засчитан',
        'Показатель в обработке',
        '2',
        '3',
        '1',
        '7.75',
        '2',
        '3',
        '3',
        '1',
        '1',
        '2',
        '2',
        '3',
        '1',
        '1',
        '3',
        '2',
        '1',
        '1',
    ],
});

const mainResults = ref({
    data: ['Ваша сумма мест', 'Место в рейтинге'],
    place: ['-', '-'],
});

const onAction = async () => {
    router.push({
        name: 'Report',
        params: { competition_pk: 1 },
    });
};

const getTotalPlace = async () => {
    try {
        const { data } = await HTTP.get(`/competitions/1/get-place/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        console.log(data);
    } catch (e) {
        if (e.request.status == 400) {
            for (let index in mainResults.value.place) {
                mainResults.value.place[index] = `Рейтинг еще не сформирован`;
            }
            console.log(`400 error`);
        }
        console.log(`getTotalPlace error`, e);
    }
};

const getPostitions = async () => {
    for (let index = 1; index <= 20; index++) {
        try {
            if (commander.value) {
                const { data } = await HTTP.get(
                    `/competitions/1/reports/q${index}/get-place/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                console.log(data);
                resultData.value.places[index - 1] = data.place;
            } else {
                const { data } = await HTTP.get(
                    `/competitions/1/reports/q${index}/me/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                if (data.results) {
                    resultData.value.places[index - 1] = 'Данные не отправлены';
                } else {
                    resultData.value.places[index - 1] = data.place;
                }
            }
        } catch (e) {
            if (e?.request?.status == 400) {
                resultData.value.places[index - 1] =
                    'Рейтинг еще не сформирован';
                //console.log(`${index}: ${e.request.response}`);
            } else if (e?.request?.status == 404) {
                resultData.value.places[index - 1] = 'Данные не отправлены';
                //console.log(`${index}: ${e.request.response}`);
                //console.log(e);
            } else {
                console.log(`!!!\n${index}: getPostions error`, e);
            }
        }
    }
    loading.value = false;
};

const getMeCommander = async () => {
    try {
        const { data } = await HTTP.get(`/rsousers/me_commander/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        console.log(data);
        if (data.detachment_commander) {
            commander.value = true;
        }
    } catch (e) {
        console.log(`getMeCommander error`, e);
    }
};

const addTandemField = async () => {
    mainResults.value.data.push('Сумма мест');
    mainResults.value.place.push('-');
};

onMounted(async () => {
    await getMeCommander();
    await getPostitions();
    if (route.params.reporting_name == 'debut') {
        isDebut.value = true;
    } else if (route.params.reporting_name == 'tandem') {
        await addTandemField();
        isDebut.value = false;
    }
    await getTotalPlace();
    window.scroll(0, 0);
});
</script>

<style scoped lang="scss">
.horizontal-item__result-wrapper {
    display: grid;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
}
.horizontal-item__result {
    display: grid;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    align-items: center;

    text-align: center;
}
.indicator-container {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: minmax(186px, 1038px) 130px;

    font-family: Bert Sans;
    padding-bottom: 12px;
    font-size: 0px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.indicator-container:last-child {
    padding-bottom: 80px;
}
.indicator-text {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: minmax(186px, 1038px) 130px;
    font-family: Bert Sans;
    padding-bottom: 12px;

    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.result-container {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: minmax(236px, 438px) minmax(80px, 120px);
    padding-top: 12px;

    font-family: Bert Sans;
    font-size: 0px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.horizontal-item__wrapper {
    min-height: 48px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    padding: 4px 20px;
    border-radius: 10px;
    border: 1px solid #b6b6b6;
    background: #fff;
}
.containerHorizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.horizontal-item__list-full {
    color: #35383f;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
}
.horizontallso__confidant {
    padding: 10px 10px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    margin-bottom: 12px;
    input {
        width: 100%;
        height: 100%;
    }
}
.competition__avatar_circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
}
.main_text {
    font-family: Akrobat;
    font-size: 52px;
    font-weight: 700;
    line-height: 62px;
    letter-spacing: 0em;
    text-align: left;
}
.data__btns {
    display: grid;
    width: 100%;
    justify-content: center;
    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    :deep(.btn) {
        margin: 0px;
    }
}
.containers_result {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding-top: 28px;
    padding-bottom: 60px;
}
.indicators {
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(48px, 1fr));
    padding-top: 80px;
}
.inline-container {
    padding-right: 0px minmax(12px, 80px);
    font-size: 80px;
}
// .inline-container:last-child {
//     display: inline-block;
//     padding-right: 0px;
// }
// .inline-container::after {
//     content: '';
//     display: inline-block;
//     width: 10px; /* Ширина отступа между блоками */
// }
</style>