<template>
    <div class="container" ref="scroll">
        <div v-if="started">
            <div class="line">
                <p class="main_title">Тестирование по обучению</p>

                <p class="curr_question">{{ indexQuestion + 1 }}/20</p>
            </div>
            <p class="question_text">
                {{ questions[indexQuestion].title }}
            </p>
            <template v-if="questions[indexQuestion].image != null">
                <img
                    class="image_question"
                    :src="questions[indexQuestion].image"
                    alt="question photo"
                />
            </template>
            <template
                v-if="questions[indexQuestion].answer_options[0].image != null"
            >
                <div
                    class="radio_field"
                    v-for="(answ, index) in questions[indexQuestion]
                        .answer_options"
                    :key="index"
                >
                    <div>
                        <input
                            class="radio_button"
                            type="radio"
                            :id="index"
                            :value="index"
                            name="answers"
                            v-model="choosenAnswer"
                        />
                    </div>
                    <label :for="index">
                        <img
                            class="image_answer"
                            :src="answ.image"
                            alt="answer photo"
                        />
                    </label>
                </div>
            </template>
            <div
                v-else
                class="radio_field"
                v-for="(answ, index) in questions[indexQuestion].answer_options"
                :key="index"
            >
                <div>
                    <input
                        class="radio_button"
                        type="radio"
                        :id="index"
                        :value="index"
                        name="answers"
                        v-model="choosenAnswer"
                    />
                </div>
                <label :for="index" class="answer_text">{{ answ.text }}</label>
            </div>

            <div class="button">
                <button
                    @click="onAction"
                    :class="{
                        submit_button: selected,
                        inactive_button: !selected,
                    }"
                >
                    Ответить
                </button>
            </div>
        </div>

        <div v-else-if="solved" class="solved__wrapper">
            <p class="main_title">Тестирование по обучению</p>
            <div class="border_result">
                <p class="text_result">Ваш результат: {{ result.score }}</p>
                <br />
                <p class="text_result" v-if="result.score <= 59">
                    Тест не пройден
                </p>
                <p class="text_result" v-else>Тест пройден</p>
            </div>
            <div class="button_result">
                <button @click="onRestart" class="submit_button">
                    Начать заново
                </button>
            </div>
        </div>

        <div v-else>
            <p class="main_title">Тестирование по обучению</p>

            <div v-if="status.left_attempts">
                <p class="subtitle">
                    Тест состоит из 20 вопросов. Время на его прохождение не
                    ограничено. Не закрывайте тест после нажатия на кнопку
                    «Начать тестирование» до его завершения.
                </p>
                <div class="start_button">
                    <button @click="onStart" class="submit_button">
                        Начать тестирование
                    </button>
                </div>
            </div>
            <div v-else class="solved__wrapper">
                <div class="border_result_finally">
                    <p class="text_result">
                        Ваш лучший результат: {{ status.best_score }}
                    </p>
                    <br />
                    <p class="text_result" v-if="status.best_score <= 59">
                        Тест не пройден
                    </p>
                    <p class="text_result" v-else>Тест пройден</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';

import { ref, inject, watch, onMounted } from 'vue';

const swal = inject('$swal');

const scroll = ref();
const questions = ref([]);
let answers = [];
const selected = ref(false);

const result = ref();
const attemptSpent = ref(0);
let indexQuestion = ref(0);
const choosenAnswer = ref(null);
const started = ref(false);
const solved = ref(false);

const status = ref({
    left_attempts: null,
    best_score: null,
});

const onStart = async () => {
    started.value = true;
    try {
        const { data } = await HTTP.get(`/questions?category=university`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem('Token'),
            },
        });
        questions.value = data;
    } catch (e) {
        if (e.request.status == 400) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `Использованы все доступные попытки`,
                showConfirmButton: false,
                timer: 2500,
            });
        } else {
            console.log('error onStart', e);
        }
    }
};

const onRestart = async () => {
    // attemptSpent.value++;
    // questions.value = [];
    // answers = [];
    // solved.value = false;
    window.location.reload();
};

const onAction = async () => {
    if (choosenAnswer.value !== null) {
        const temp = {
            question_id: questions.value[indexQuestion.value].id,
            answer_option_id:
                questions.value[indexQuestion.value].answer_options[
                    choosenAnswer.value
                ].id,
        };
        indexQuestion.value += 1;
        answers.push(temp);
        if (indexQuestion.value == 19) {
            started.value = false;
            solved.value = true;
            indexQuestion.value = 0;
            await submitAnswers();
        }
        choosenAnswer.value = null;
        scroll.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const submitAnswers = async () => {
    try {
        const { data } = await HTTP.post(
            `/submit_answers/`,
            { answers, category: 'university' },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        result.value = data;
    } catch (e) {
        console.log('error submitAnswers', e);
    }
};

const getAttempts = async () => {
    try {
        const { data } = await HTTP.get(
            `/get_attempts_status?category=university`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        status.value = data;
    } catch (e) {
        console.log(`getAttempts error`, e);
    }
};

watch(choosenAnswer, () => {
    if (choosenAnswer.value !== null) {
        selected.value = true;
    } else {
        selected.value = false;
    }
});

onMounted(async () => {
    await getAttempts();
});
</script>

<styel scoped lang="scss">
.image_answer {
    max-width: 150px;
    height: auto;
    padding-left: 16px;
}
.image_question {
    max-width: 250px;
    height: auto;
    margin-bottom: 40px;
}
.solved__wrapper {
    display: flex;
    flex-direction: column;
}
.border_result_finally {
    margin: 0 auto;
    text-align: center;
    padding: 40px 120px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 214px;
    margin-top: 20px;
}
.border_result {
    margin: 0 auto;
    text-align: center;
    padding: 40px 120px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 60px;
    margin-top: 20px;
}
.text_result {
    display: inline-block;
    font-family: Akrobat;
    font-size: 24px;
    font-weight: 500;
    line-height: 22px;
    text-align: center;
}
.text_result:first-child {
    margin-bottom: 32px;
}
.container {
    margin: 0 auto;
    max-width: 1115px;
}
.main_title {
    padding-bottom: 40px;

    font-family: Akrobat;
    font-size: 52px;
    font-weight: 700;
    line-height: 62.4px;
    text-align: left;
    color: #35383f;
}
.subtitle {
    font-family: Akrobat;
    font-size: 24px;
    font-weight: 500;
    line-height: 28.8px;
    text-align: left;
    color: #35383f;
}
.question_text {
    margin-bottom: 40px;
    color: #35383f;

    font-family: Akrobat;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
}
.answer_text {
    padding-left: 16px;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.radio_field {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 24px;
}
.inactive_button {
    cursor: not-allowed;
    border-radius: 10px;
    background: grey;
    padding: 16px 32px;
    color: #fff;
}
.inactive_button {
    cursor: not-allowed;
    border-radius: 10px;
    background: grey;
    padding: 16px 32px;
    color: #fff;
}
.submit_button {
    border-radius: 10px;
    background: #39bfbf;
    padding: 16px 32px;
    color: #fff;
}
.button {
    margin-top: 60px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    margin-bottom: 60px;
}
.start_button {
    margin-top: 60px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    margin-bottom: 224px;
}
.button_result {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    margin-bottom: 60px;
}
.line {
    display: flex;
    justify-content: space-between;
}
.curr_question {
    color: #b6b6b6;

    font-family: Akrobat;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 0em;
    text-align: right;
}
input[type='radio'] + label {
    word-wrap: break-word; /* автоматически перемещает слова на следующую строку при необходимости */
}
</styel>
