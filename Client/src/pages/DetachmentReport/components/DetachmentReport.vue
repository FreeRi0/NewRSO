<template>
    <div class="container">
        <template v-if="!loading">
            <p class="main_text">Отчетность</p>

            <div class="containers_result">
                <div class="inline-container">
                    <div
                        class="indicator-container"
                        v-for="(result, index) in mainResults.data"
                        :key="index"
                    >
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
                <!-- <div
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
            </div> -->
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
        </template>

        <div class="indicator-text" v-else>Загрузка...</div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';
import { Button } from '@shared/components/buttons';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const commander = ref(false);
const regional_commander = ref(false);

const loading = ref(true);

const detachment_id = ref(route.params.id);

const resultData = ref({
    indicators: [
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
    places: [
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-',
    ],
});

// const mainResults = ref({
//     data: ['Ваша сумма мест', 'Место в рейтинге'],
//     place: ['-', '-'],
// });

const mainResults = ref({
    data: ['Место в рейтинге'],
    place: ['-'],
});

const onAction = async () => {
    router.push({
        name: 'Report',
        params: { competition_pk: 1 },
    });
};

const getPlaceRegionalCommander = async () => {
    const { data } = await HTTP.get(
        `/competitions/1/get-detachment-places/${detachment_id.value}/`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        },
    );
    if (data.is_tandem) {
        mainResults.value.place.push(
            data.places_sum ? data.places_sum : 'Рейтинг еще не сформирован',
        );
        mainResults.value.data.push(
            `Сумма мест отряд «${data.partner_detachment.name}»`,
        );
    }
    mainResults.value.place[0] = data.overall_place;
    for (let i = 1; i <= 20; ++i) {
        let index = `q${i}_place`;
        resultData.value.places[i - 1] = data[index];
    }
    console.log(data);
    loading.value = false;
};

const getPostitions = async () => {
    await getMainResults();

    for (let index = 1; index <= 20; index++) {
        // await getVerificationLogs(index);
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
                //console.log(data);
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
            // if (e?.request?.status == 400) {
            //     resultData.value.places[index - 1] =
            //         'Рейтинг еще не сформирован';
            //     console.log(`${index}: ${e.request.response}`);
            // } else
            if (e?.request?.status == 404) {
                if (e.request.response) {
                    resultData.value.places[index - 1] =
                        'Рейтинг еще не сформирован';
                } else {
                    await getVerificationLogs(index);
                }
                if (resultData.value.places[index - 1] == '-')
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

const getVerificationLogs = async (q_number) => {
    try {
        const { data } = await HTTP.get(
            `/competitions/1/verification_logs/${q_number}/?verified_detachment_id=${detachment_id.value}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        // console.log(data);

        if (data.results.length != 0) {
            const temp = data.results.pop();
            // console.log(temp);
            if (temp?.action == 'Отклонил') {
                resultData.value.places[q_number - 1] =
                    'Показатель не засчитан';
            }
        }
    } catch (e) {
        console.log(`getVerificationLogs error`, e);
    }
};

const getMeCommander = async () => {
    try {
        const { data } = await HTTP.get(`/rsousers/me_commander/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        // console.log(data);
        if (data.detachment_commander) {
            commander.value = true;
        } else if (data.regionalheadquarter_commander) {
            regional_commander.value = true;
        }
    } catch (e) {
        console.log(`getMeCommander error`, e);
    }
};

const getMainResults = async () => {
    try {
        const { data } = await HTTP.get(`/competitions/1/get-place/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        console.log(data);
        // Вернуть 1 в индекс для суммы мест
        if (data.place) {
            mainResults.value.place[0] = data.place;
        } else {
            mainResults.value.place[0] = 'Рейтинг еще не сформирован';
        }
        // if (data.places_sum) {
        //     mainResults.value.place[0] = data.places_sum;
        // } else {
        //     mainResults.value.place[0] = 'Рейтинг еще не сформирован';
        // }
        if (data.partner_detachment) {
            mainResults.value.place.push(
                data.place ? data.place : 'Рейтинг еще не сформирован',
            );
            mainResults.value.data.push(
                `Место в рейтинге отряда «${data.partner_detachment.name}»`,
            );
        }
        // console.log(mainResults.value);
    } catch (e) {
        console.log('getMainResults error', e);
    }
};

onMounted(async () => {
    await getMeCommander();

    if (commander.value) {
        await getPostitions();
    } else if (regional_commander.value) {
        await getPlaceRegionalCommander();
    }
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
// .indicator-container:last-child {
//     padding-bottom: 80px;
// }
.indicator-text {
    display: grid;
    width: 100%;
    grid-gap: 12px;
    grid-template-columns: minmax(186px, 1038px) 130px;
    font-family: Bert Sans;
    //padding-bottom: 12px;

    font-size: 16px;
    font-weight: 500;
    //line-height: 21px;
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
.container {
    padding-bottom: 80px;
}
</style>
