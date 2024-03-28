<template>
    <div class="container">
        <div v-if="started">
            <div class="line">
                <p class="main_title">Тестирование по обучению</p>

                <p class="curr_question">{{ indexQuestion + 1}}/20</p>
            </div>
            <p class="question_text">{{ questions[indexQuestion].title }}</p>
            <template v-if="questions[indexQuestion].image != null">
                <img
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
                    <img :for="index" :src="answ.image" alt="answer photo" />
                </div>
            </template>
            <div
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
            <!-- <p class="answer_text" v-for="answ in currQuestion.answerOptions" :key="answ">{{ answ }}</p> -->

            <div class="button">
                <button @click="onAction" class="submit_button">
                    Ответить
                </button>
            </div>
        </div>

        <div v-else-if="solved" class="solved__wrapper">
            <p class="main_title">Тестирование по обучению</p>
            <div class="border_result">
                <p class="text_result">Ваш результат: {{ result }}.</p>
                <br />
                <p class="text_result" v-if="result <= 59">Тест не пройден.</p>
                <p class="text_result" v-else>Тест пройден.</p>
            </div>
            <div class="button_result" v-if="countAttempt < 2 && result <= 59">
                <button @click="onRestart" class="submit_button">
                    Начать заново
                </button>
            </div>
        </div>

        <div v-else>
            <p class="main_title">Тестирование по обучению</p>

            <p class="subtitle">
                Тест состоит из 20 вопросов. Время на его прохождение не
                ограничено. Не закрывайте тест после нажатия на кнопку «Начать
                тестирование» до его завершения. Предоставляется 2 попытки.
            </p>
            <div class="button">
                <button @click="onStart" class="submit_button">
                    Начать тестирование
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HTTP } from '@app/http';

import { ref } from 'vue';
const questions = ref([]);
const answers = [];

const result = ref(20);
const countAttempt = ref(0);

let indexQuestion = ref(0);
const choosenAnswer = ref(null);
const started = ref(false);
const solved = ref(false);

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
        console.log(questions.value)
    } catch (e) {
        console.log('error onStart', e);
    }
};

const onRestart = async () => {
    countAttempt.value++;
    solved.value = false;
};

const onAction = async () => {
    if(choosenAnswer.value !== null){
        const temp = {
            question_id: questions.value[indexQuestion.value].id,
            answer_option_id: choosenAnswer.value + 1,
        };
        answers.push(temp);
        if (indexQuestion.value == 19) {
            started.value = false;
            solved.value = true;
            indexQuestion.value = 0;
            console.log(answers);
            await submitAnswers();
        }
        indexQuestion.value += 1;
        choosenAnswer.value = null;
    }
    
};

const submitAnswers = async () => {
    try {
        const { data } = await HTTP.post(
            `submit_answers/`,
            { answers },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + localStorage.getItem('Token'),
                },
            },
        );
        result.value = data;
        console.log(result.value)
    } catch (e) {
        console.log('error submitAnswers', e);
    }
};
</script>

<styel scoped lang="scss">
.solved__wrapper {
    display: flex;
    flex-direction: column;
}
.border_result {
    margin: 0 auto;
    text-align: center;
    padding: 40px 120px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 60px;
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
    margin: 40px 0px;
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
