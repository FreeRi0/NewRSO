<template>
    <div class="container">
        <div v-if="started">
            <div class="line">
                <p class="main_title">Тестирование по обучению </p>

                <p class="curr_question">{{ indexQuestion }}/20</p>                
            </div>
            <p class="question_text">{{ currQuestion.question }}</p>
            <div class="radio_field" v-for="(answ, index) in currQuestion.answerOptions" :key="index">
                <div>
                    <input class="radio_button" type="radio" :id="index" :value="index" name="answers" v-model="choosenAnswer"/>

                </div>
                <label :for="index" class="answer_text">{{ answ }}</label>
            </div>
            <!-- <p class="answer_text" v-for="answ in currQuestion.answerOptions" :key="answ">{{ answ }}</p> -->

            <div class="button">
                <button @click="onAction" class="submit_button">
                    Ответить
                </button>
            </div>
            
        </div>

        <div v-else-if="solved">
            <p class="main_title">Тестирование по обучению</p>
            <p class="subtitle">Вы уже прошли тест<br>Результат</p>
            <div class="button">
                <button @click="onRestart" class="submit_button">
                    Начать заново
                </button>
            </div>
        </div>

        <div v-else>
            <p class="main_title">Тестирование по обучению</p>

            <p class="subtitle">Начать тест</p>
            <div class="button">
                <button @click="onStart" class="submit_button">
                    Начать тест
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const arrOfQuestion = [
        'Когда учреждено МООД «РСО»?', 
        'Какой год принято считать официальным началом движения студенческих отрядов в СССР?', 
        'На базе какого высшего учебного заведения были образованы первые студенческие отряды?',
        'Выберите наиболее неподходящее решение кейса: вы находитесь на трудовом проекте, и к вам поступает жалоба о нарушении сухого закона во время работы на проекте. Жалобу подал один из членов другого отряда, который является непосредственным свидетелем нарушения (Сухой закон строго запрещает употребление алкоголя и других запрещённых веществ во время работы на проекте, чтобы гарантировать безопасность и эффективность выполнения задач). ',
    ];
    const arrOfAnswers = [
        ['17 февраля','12 июня 2010','1 июля 1959','3 марта 1993'], 
        ['1949','1984','1959','1974'],
        ['Всесоюзный юридический заочный институт','Московский государственный университет имени М. В. Ломоносова ','Всесоюзный заочный институт советской торговли Наркомторга СССР','Московский лесотехнический институт'],
        [
            'Встретиться с лицом, подавшим жалобу, чтобы получить дополнительные детали и подробности о нарушении. Провести личную беседу с бойцом, о котором поступила жалоба. Запросить его версию событий и объяснить, что жалоба была получена. Провести расследование, включающее беседу с другими свидетелями, если таковые имеются, и проверку фото- или видеоматериалов. После сбора всех необходимых доказательств принять решение о нарушении сухого закона. ',
            'В случае подтверждения нарушения, применить соответствующие меры в соответствии с правилами отряда и регионального отделения, такие как предупреждение, штраф или другие дисциплинарные меры.',
            'Встретиться с лицом, подавшим жалобу, чтобы получить дополнительные детали и подробности о нарушении и попросить написать жалобу выше. Организовать общее собрание отряда, сообщить о решении выгнать бойца из отряда, как порочащего честь отряда без проведения дополнительных разбирательств.',
            'Организовать общее собрание отряда, для принятия общего решения о сложившиеся ситуации в случае подтверждения нарушения.',
        ]
    ];

    const currQuestion = ref({
        question: '',
        answerOptions: [],
    });

    const solvedQuestion = ref({
        questions: [],
        answers: [],
    });

    const started = ref(false);
    const solved = ref(false);
    let indexQuestion = ref(1);
    const choosenAnswer = ref();

    const shuffle = async (array, answ) => {
        for (let i = array.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            [answ[i], answ[j]] = [answ[j], answ[i]];
        }
    }
    
    const onRestart = async () => {
        solved.value = false;
        indexQuestion.value = 1;
        solvedQuestion.value.questions = [];
        solvedQuestion.value.answers = [];
    }

    const onStart = async () => {
        started.value = true;
        await shuffle(arrOfQuestion, arrOfAnswers);
        currQuestion.value.question = arrOfQuestion[0];
        currQuestion.value.answerOptions = arrOfAnswers[0];
    }

    const onAction = async () => {
        if (indexQuestion.value < 2) {
            solvedQuestion.value.questions.push(currQuestion.value.question);
            solvedQuestion.value.answers.push(choosenAnswer.value + 1);
            choosenAnswer.value = null;
            currQuestion.value.question = arrOfQuestion[indexQuestion.value];
            currQuestion.value.answerOptions = arrOfAnswers[indexQuestion.value];
            indexQuestion.value++;
        } else {
            solvedQuestion.value.questions.push(currQuestion.value.question);
            solvedQuestion.value.answers.push(choosenAnswer.value + 1);
            choosenAnswer.value = null;
            console.log(solvedQuestion.value);
            solved.value = true;
            started.value = false;
        }
    }
</script>
    
<styel scoped lang="scss">
    .container {
    margin: 0 auto;
    max-width: 1115px;
}
.main_title {
    font-family: Akrobat;
    font-size: 52px;
    font-weight: 700;
    letter-spacing: 0em;
    text-align: left;
    color: #35383f;
    line-height: normal;
}
.subtitle {
    margin: 20px 0px;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-family: Bert Sans;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
}
.question_text {
    margin-bottom: 40px;
    color: #35383F;

    font-family: Akrobat;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
}
.answer_text{
    padding-left: 16px;

    font-family: Bert Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}
.radio_field{
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 24px;
}
.submit_button {
    border-radius: 10px;
    background: #39bfbf;
    padding: 16px 32px;
    margin-left: 20px;
    color: #fff;
}
.button {
    margin-top: 60px;
    //margin-left: 20px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    margin-bottom: 60px;
}
.line{
    display: flex;
    margin: 40px 0px;
    justify-content: space-between;
}
.curr_question{
    color: #B6B6B6;

    font-family: Akrobat;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 0em;
    text-align: right;
}
input[type="radio"] + label {
    word-wrap: break-word; /* автоматически перемещает слова на следующую строку при необходимости */
}

</styel>