<template>
  <div class="container corpuniver">
    <h1 class="title title--mb">
      Корпоративный университет
    </h1>

    <div class="corpuniver__image-box">
      <img
          src="@app/assets/corpuniver/corpuniver.png"
          alt="Логотип конкурса"
      />
      <a href="https://vk.com/rso.university" target="_blank" class="corpuniver__vk">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
          <path d="M12.0251 14.0534C4.73175 14.0534 0.571782 9.0534 0.398438 0.733398H4.05178C4.17178 6.84005 6.86506 9.42671 8.99837 9.96005V0.733398H12.4385V6.00002C14.5452 5.77337 16.7582 3.3734 17.5049 0.733398H20.945C20.3717 3.98674 17.9717 6.38671 16.265 7.37337C17.9717 8.17337 20.7051 10.2667 21.7451 14.0534H17.9583C17.145 11.5201 15.1185 9.56005 12.4385 9.29337V14.0534H12.0251Z" fill="#35383F"/>
          </svg>
      </a>
    </div>

    <div class="corpuniver__text">
      <p class="text corpuniver__text-about">
        Корпоративный университет РСО — новый проект, который объединяет все образовательные площадки РСО.
        Корпоративный университет продвинет знания, навыки и компетенции каждого отрядника для успешной карьеры.
        Удобное онлайн-обучение, гибкий формат, много практики и возможность развиваться в экспертном поле.
      </p>
      <p class="text corpuniver__text-about">
        В рамках конкурса «Лучший студенческий отряд» с 11 марта по 10 апреля состоится
        <span>Школа командных составов линейных студенческих отрядов РСО</span> по <a href="#trainingProgram">Программе обучения</a>.
      </p>
      <p class="text corpuniver__text-about">
        Обучение пройдет на платформе <a href="https://vk.me/join/iy9ZxZTPoHQCJpAEzVecrr1ipRp0f1XLPlE=" target="_blank">ВКонтакте</a>,
        все видео материалы будут доступны <a href="#video_1">ниже</a>.
        Для прохождения конкурса необходимо набрать не менее 60 баллов <a href="#testing">итогового тестирования</a>.
      </p>
    </div>

    <h2 id="trainingProgram" class="corpuniver__title-h2">Программа обучения</h2>

    <div class="text corpuniver__table">
      <v-table >
        <thead class="corpuniver__table__thread">
          <tr class="corpuniver__table__tr">
            <td class="corpuniver__table__th corpuniver__table__th__br-left">№</td>
            <td class="corpuniver__table__th">Дата, время (мск)</td>
            <td class="corpuniver__table__th">Блок</td>
            <td class="corpuniver__table__th corpuniver__table__th__br-right">Тема</td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td class="corpuniver__table__td corpuniver__table__border-left">1</td>
          <td class="corpuniver__table__td"><b>11 марта</b><br/>08.00 - 09.00</td>
          <td class="corpuniver__table__td"><a href="#video_1">Вводное занятие</a></td>
          <td class="corpuniver__table__td">Цели и задачи Конкурса и обучения</td>
        </tr>
        <tr>
          <td rowspan="5" class="corpuniver__table__td corpuniver__table__border-left">2</td>
          <td rowspan="5" class="corpuniver__table__td"><b>13 марта</b><br/>14.00-16.00</td>
          <td rowspan="5" class="corpuniver__table__td"><a href="#video_2">Знакомство с РСО</a></td>
          <td class="corpuniver__table__td">Цели и задачи организации</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Все что тебе важно, есть в РСО</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">История РСО</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Ценности и принципы РСО</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Всегда 20: Юбилейный год РСО</td>
        </tr>
        <tr>
          <td rowspan="3" class="corpuniver__table__td corpuniver__table__border-left">3</td>
          <td rowspan="3" class="corpuniver__table__td"><b>15 марта</b><br/>14.00-14.50</td>
          <td rowspan="3" class="corpuniver__table__td"><a href="#video_3">МЫ ЛСО</a></td>
          <td class="corpuniver__table__td">Нормативная база РСО</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">План деятельности отряда по подготовке к трудовому семестру</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Адаптация к Личному кабинету</td>
        </tr>
        <tr>
          <td rowspan="3" class="corpuniver__table__td corpuniver__table__border-left">4</td>
          <td rowspan="3" class="corpuniver__table__td"><b>15 марта</b><br/>15.00-17.00</td>
          <td rowspan="3" class="corpuniver__table__td"><a href="#video_4">Информационная кампания и набор</a></td>
          <td class="corpuniver__table__td">Планирование</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Публичное выступление</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Сбор контактов, сайт РСО</td>
        </tr>
        <tr>
          <td rowspan="4" class="corpuniver__table__td corpuniver__table__border-left">5</td>
          <td rowspan="4" class="corpuniver__table__td"><b>18 марта</b><br/>14.00-16.10</td>
          <td rowspan="4" class="corpuniver__table__td"><a href="#video_5">Вовлечение в деятельность отряда</a></td>
          <td class="corpuniver__table__td">Обработка контактов</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Обратная связь и работа с возражениями</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Организационное и информационное сопровождение</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Вовлекающие события</td>
        </tr>
        <tr>
          <td rowspan="5" class="corpuniver__table__td corpuniver__table__border-left">6</td>
          <td rowspan="5" class="corpuniver__table__td"><b>19 марта</b><br/>09.00-11.00</td>
          <td rowspan="9" class="corpuniver__table__td"><a href="#video_6">Создание и работа команды мечты</a></td>
          <td class="corpuniver__table__td">Цели отряда и план деятельности</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Планирование подготовительного сезона</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Профессиональное обучение</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Мои документы РСО</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Погружающие события</td>
        </tr>
        <tr>
          <td rowspan="4" class="corpuniver__table__td corpuniver__table__border-left">7</td>
          <td rowspan="4" class="corpuniver__table__td"><b>20 марта</b><br/>14.00-16.00</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Введение в безопасность труда, безопасность подготовительного периода </td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Работа в команде</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Презентация мечты</td>
        </tr>
        <tr>
          <td rowspan="3" class="corpuniver__table__td corpuniver__table__border-left">8</td>
          <td rowspan="3" class="corpuniver__table__td"><b>25 марта</b><br/>14.00-16.00</td>
          <td rowspan="7" class="corpuniver__table__td">Лето с пользой</td>
          <td class="corpuniver__table__td">Целеполагание и планирование деятельности во время трудового семестра</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Работа на трудовом объекте</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Система мероприятий в трудовом семестре</td>
        </tr>
        <tr>
          <td rowspan="4" class="corpuniver__table__td corpuniver__table__border-left">9</td>
          <td rowspan="2" class="corpuniver__table__td"><b>27 марта</b><br/>14.00-15.40</td>
          <td class="corpuniver__table__td">Посвящение</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Подготовка к участию в мероприятиях на трудовом проекте</td>
        </tr>
        <tr>
          <td rowspan="2" class="corpuniver__table__td"><b>29 марта</b><br/>14.00-15.20</td>
          <td class="corpuniver__table__td">Управление командой во время трудового семестра</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Решение конфликтных ситуаций на проекте</td>
        </tr>
        <tr>
          <td rowspan="3" class="corpuniver__table__td corpuniver__table__border-left">10</td>
          <td rowspan="3" class="corpuniver__table__td"><b>1 апреля</b><br/>14.00-15.30</td>
          <td rowspan="5" class="corpuniver__table__td">Подведение итогов трудового семестра и планирование следующего года</td>
          <td class="corpuniver__table__td">Анализ работы, подведение итогов 2024 года</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Целеполагание и планирование деятельности после трудового семестра, на 2025 г.</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Система мероприятий</td>
        </tr>
        <tr>
          <td rowspan="2" class="corpuniver__table__td corpuniver__table__border-left">11</td>
          <td rowspan="2" class="corpuniver__table__td"><b>3 апреля</b><br/>14.00-15.30</td>
          <td class="corpuniver__table__td">Психологические аспекты деятельности руководителей </td>
        </tr>
        <tr>
          <td class="corpuniver__table__td">Наставничество</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td corpuniver__table__border-left">12</td>
          <td class="corpuniver__table__td"><b>27 марта по 10 апреля</b></td>
          <td colspan="2" class="corpuniver__table__td">Проведение практических мероприятий</td>
        </tr>
        <tr>
          <td class="corpuniver__table__td corpuniver__table__border-left corpuniver__table__td__br-left">13</td>
          <td class="corpuniver__table__td" style="border-bottom: #ECEFF4 solid 1px"><b>27 марта по 10 апреля</b></td>
          <td colspan="2" class="corpuniver__table__td corpuniver__table__td__br-right">Тестирование на платформе сайта</td>
        </tr>
        </tbody>
      </v-table>
    </div>

    <h2 id="video_1" class="corpuniver__title-h2">Занятие 11 марта «Цели и задачи Конкурса и обучения»</h2>
    <p class="corpuniver__text-subtitle">Спикеры: Михаил Киселёв, Дмитрий Парамонов, Мария Корнилова</p>

    <div class="corpuniver__video">
      <iframe class="corpuniver__iframe"
              src="https://vk.com/video_ext.php?oid=-223571150&id=456239049&hd=2"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
              allowfullscreen>
      </iframe>
    </div>

    <h2 id="video_2" class="corpuniver__title-h2">Занятие 13 марта «Знакомство с РСО»</h2>
    <p class="corpuniver__text-subtitle">Спикеры: Дмитрий Парамонов, Мария Корнилова</p>

    <div class="corpuniver__video">
      <iframe class="corpuniver__iframe"
          src="https://vk.com/video_ext.php?oid=-223571150&id=456239054"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
              allowfullscreen>
      </iframe>
    </div>

    <h2 id="video_2" class="corpuniver__title-h2">Занятие 15 марта «МЫ ЛСО»</h2>
    <p class="corpuniver__text-subtitle">Спикеры: Дмитрий Парамонов, Мария Корнилова, Валентина Бродягина</p>

    <div id="video_3" class="corpuniver__video">
      <iframe
          class="corpuniver__iframe"
          src="https://vk.com/video_ext.php?oid=-223571150&id=456239059&hd=2"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
              allowfullscreen>
      </iframe>
    </div>

    <h2 id="video_4" class="corpuniver__title-h2">Занятие 15 марта «Информационная кампания и набор»</h2>
    <p class="corpuniver__text-subtitle">Спикеры: Божена Колачевская, Анастасия Шабанова, Владислав Езин, Анастасия Гориченко</p>

    <div class="corpuniver__video">
      <iframe
          class="corpuniver__iframe"
          src="https://vk.com/video_ext.php?oid=-223571150&id=456239060&hd=2"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
              allowfullscreen>
      </iframe>
    </div>


    <h2 id="video_5" class="corpuniver__title-h2">Занятие 18 марта «Вовлечение в деятельность отряда»</h2>
    <p class="corpuniver__text-subtitle">Спикеры: Анастасия Гориченко, Елена Писарева, Ирина Зубарева, Павел Руднев, Юлия Позднякова</p>

    <div class="corpuniver__video">
      <iframe
          class="corpuniver__iframe"
          src="https://vk.com/video_ext.php?oid=-223571150&id=456239064&hd=2"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
          allowfullscreen>
      </iframe>
    </div>

    <h2 id="video_6" class="corpuniver__title-h2">Занятие 19 марта «Создание и работа команды мечты»</h2>
    <p class="corpuniver__text-subtitle">Спикеры: Дмитрий Парамонов, Ксения Пискарева, Анна Яблокова</p>

    <div class="corpuniver__video">
      <iframe
          class="corpuniver__iframe"
          src="https://vk.com/video_ext.php?oid=-223571150&id=456239065&hd=2"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
          allowfullscreen>
      </iframe>
    </div>

    <div class="videoType">
      <v-btn
          class="constructionBtn videoTypeBtn"
          :class="{active: toggleBtn.construction }"
          variant="outlined"
          @click="toggle"
      >
        Строительные
      </v-btn>
      <v-btn
          class="pedagogicalBtn videoTypeBtn"
          :class="{active: toggleBtn.pedagogical }"
          variant="outlined"
          @click="toggle"
      >
        Педагогические
      </v-btn>
      <v-btn
          class="serviceBtn videoTypeBtn"
          :class="{active: toggleBtn.service }"
          variant="outlined"
          @click="toggle"
      >
        Сервисные
      </v-btn>
      <v-btn
          class="agriculturalBtn videoTypeBtn"
          :class="{active: toggleBtn.agricultural }"
          variant="outlined"
          @click="toggle"
      >
        Сельскохозяйственные
      </v-btn>
      <v-btn
          class="conductorBtn videoTypeBtn"
          :class="{active: toggleBtn.conductor }"
          variant="outlined"
          @click="toggle"
      >
        Проводников
      </v-btn>
      <v-btn
          class="medicalBtn videoTypeBtn"
          :class="{active: toggleBtn.medical }"
          variant="outlined"
          @click="toggle"
      >
        Медицинское
      </v-btn>
    </div>

    <div v-if="toggleBtn.construction">
      <h2 id="video_6" class="corpuniver__title-h2">Мои документы | строительное направление </h2>

      <div class="corpuniver__video">
        <img src="@app/assets/corpuniver/default.png">
      </div>
    </div>
    <div v-else-if="toggleBtn.pedagogical">
      <h2 id="video_6" class="corpuniver__title-h2">Мои документы | педагогическое направление</h2>

      <div class="corpuniver__video">
        <iframe
            class="corpuniver__iframe"
            src="https://vk.com/video_ext.php?oid=-223571150&id=456239071&hd=2"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
            allowfullscreen></iframe>
      </div>
    </div>

    <div v-else-if="toggleBtn.service">
      <h2 id="video_6" class="corpuniver__title-h2">Мои документы | сервисное направление</h2>

      <div class="corpuniver__video">
        <iframe
            class="corpuniver__iframe"
            src="https://vk.com/video_ext.php?oid=-223571150&id=456239067&hd=2"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
            allowfullscreen></iframe>
      </div>
    </div>

    <div v-else-if="toggleBtn.agricultural">
      <h2 id="video_6" class="corpuniver__title-h2">Мои документы | сельскохозяйственное направление</h2>

      <div class="corpuniver__video">
        <iframe
            class="corpuniver__iframe"
            src="https://vk.com/video_ext.php?oid=-223571150&id=456239075"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
            allowfullscreen></iframe>
      </div>
    </div>

    <div v-else-if="toggleBtn.conductor">
      <h2 id="video_6" class="corpuniver__title-h2">Мои документы | направление проводников</h2>

      <div class="corpuniver__video">
        <iframe
            class="corpuniver__iframe"
            src="https://vk.com/video_ext.php?oid=-223571150&id=456239066&hd=2"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
            allowfullscreen></iframe>
      </div>
    </div>

    <div v-else-if="toggleBtn.medical">
      <h2 id="video_6" class="corpuniver__title-h2">Мои документы | медицинское направление</h2>

      <div class="corpuniver__video">
        <iframe
            class="corpuniver__iframe"
            src="https://vk.com/video_ext.php?oid=-223571150&id=456239079"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
                allowfullscreen></iframe>
      </div>
    </div>

    <h2 id="video_6" class="corpuniver__title-h2">Занятие 20 марта «Создание и работа команды мечты»</h2>
    <p class="corpuniver__text-subtitle">Спикеры: Варвара Пасенкова, Елена Писарева, Влад Езин, Валентина Бродягина, Анастасия Гориченко</p>

    <div class="corpuniver__video">
      <iframe
          class="corpuniver__iframe"
          src="https://vk.com/video_ext.php?oid=-223571150&id=456239074&hd=2"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0"
          allowfullscreen></iframe>
    </div>

    <div id="testing" class="corpuniver__documents-test">
      <p class="text corpuniver__documents-description-test">
        Итоговую аттестацию можно пройти с 27 марта по 10 апреля 2024 года (допускается 2 пересдачи) онлайн в профиле Личного кабинета.
        Для прохождения тестирования необходимо набрать не менее 60 баллов. Удачи!
      </p>
      <Button label="Начать тестирование" class="corpuniver__documents-btn"></Button>
    </div>
  </div>


</template>
<script setup>
import { ref } from 'vue';
import Button from '@shared/components/buttons/Button.vue';

let toggleBtn = ref({
  construction: false,
  pedagogical: true,
  service: false,
  agricultural: false,
  conductor: false,
  medical: false
})

const toggle = (e) => {
  e.target.offsetParent.classList.forEach((c) => {
   if (c === 'constructionBtn')  {
     toggleBtn.value.construction = true
     toggleBtn.value.pedagogical = false
     toggleBtn.value.service = false
     toggleBtn.value.agricultural = false
     toggleBtn.value.conductor = false
     toggleBtn.value.medical = false
   } else if (c === 'pedagogicalBtn') {
     toggleBtn.value.construction = false
     toggleBtn.value.pedagogical = true
     toggleBtn.value.service = false
     toggleBtn.value.agricultural = false
     toggleBtn.value.conductor = false
     toggleBtn.value.medical = false
   } else if (c === 'serviceBtn') {
     toggleBtn.value.construction = false
     toggleBtn.value.pedagogical = false
     toggleBtn.value.service = true
     toggleBtn.value.agricultural = false
     toggleBtn.value.conductor = false
     toggleBtn.value.medical = false
   } else if (c === 'agriculturalBtn') {
     toggleBtn.value.construction = false
     toggleBtn.value.pedagogical = false
     toggleBtn.value.service = false
     toggleBtn.value.agricultural = true
     toggleBtn.value.conductor = false
     toggleBtn.value.medical = false
   } else if (c === 'conductorBtn') {
     toggleBtn.value.construction = false
     toggleBtn.value.pedagogical = false
     toggleBtn.value.service = false
     toggleBtn.value.agricultural = false
     toggleBtn.value.conductor = true
     toggleBtn.value.medical = false
   } else if (c === 'medicalBtn') {
     toggleBtn.value.construction = false
     toggleBtn.value.pedagogical = false
     toggleBtn.value.service = false
     toggleBtn.value.agricultural = false
     toggleBtn.value.conductor = false
     toggleBtn.value.medical = true
   }
  })
}
</script>
<style>
.v-btn__content {
  padding: 6px;
}
</style>
<style lang="scss" scoped>
.videoType {
  margin-top: 80px;
  padding-bottom: 24px;
}
.videoTypeBtn {
  border-radius: 30px;
  border: 2px solid #35383F;
  margin-right: 20px;
  font-family: Bert Sans;
    margin-bottom: 10px;

}
.active {
  background-color: #1C5C94;
  color: #FFFFFF;
  border: none;
}
.corpuniver__table {
  margin-bottom: 40px;
  &__tr {
      background-color: #ECEFF4;
      text-align: center;
  }
  &__th {
    font-family: Akrobat;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    padding: 10px 16px !important;

    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 19.2px;
      padding: 2px 4px !important;
    }

    &__br-left {
      border-radius: 10px 0 0 0 ;
    }

    &__br-right {
      border-radius: 0 10px 0 0;
    }
  }

  &__td {
    text-align: center;
    font-family: Bert Sans;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    border-right: #ECEFF4 solid 1px;
    padding: 10px 16px !important;

    @media (max-width: 768px) {
      font-family: Bert Sans;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      padding: 2px 4px !important;
    }

    &__br-left {
      border-radius: 0 0 0 10px;
      border-bottom: #ECEFF4 solid 1px;
    }

    &__br-right {
      border-radius: 0 0 10px 0;
      border-bottom: #ECEFF4 solid 1px;
    }
  }

  &__border-left {
    border-left: #ECEFF4 solid 1px;
  }
}

.corpuniver {
  &__title-h2 {
    font-family: Akrobat;
    font-size: 32px;
    font-weight: 600;
    line-height: 38px;
    color: #35383F;
    margin-top: 36px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      margin-top: 40px;
      margin-bottom: 32px;
    }
  }

  &__container {
    background-color: #c4c4c4;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 43.1%;
  }

  &__image-box {
    position: relative;
    height: auto;
    width: 100%;

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  }

  &__vk {
    position: absolute;
    right: 24px;
    top: 24px;
    min-width: 32px;
    min-height: 32px;
    background-color: #FFFFFF;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      text-align: center;
    }

    @media (max-width: 768px) {
      min-width: 24px;
      min-height: 24px;
      right: 4px;
      top: 4px;
      border-radius: 5px;
    }

    @media (max-width: 1024px) {
      right: 12px;
      top: 12px;
    }
  }

  &__text {
    margin-top: 40px;
  }
  &__text-about {
    margin-bottom: 23.74px;
    a {
      color: #1C5C94;
      text-decoration: underline;
    }
    span {
      font-weight: 700;
    }

    @media (max-width: 768px) {
      font-family: Bert Sans;
      font-size: 16px;
      font-weight: 400;
      line-height: 21px;
    }
  }

  &__documents {
    display: flex;
    align-items: center;
    margin-bottom: 60px;
    padding: 20px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
  }

  &__documents-test {
    display: block;
    margin-bottom: 60px;
    border: 1px solid #b6b6b6;
    border-radius: 10px;
    margin-top: 80px;
    text-align: center;

    @media (max-width: 768px) {
      margin-top: 40px;
    }
  }

  &__documents-description {
    font-family: 'Akrobat';
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }

  &__documents-description-test {
    font-family: 'Akrobat';
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-top: 40px;
  }

  &__documents-btn {
    margin-top: 32px;
    margin-bottom: 40px;
    font-family: Bert Sans;
    font-weight: 600;
    line-height: 20px;
    width: 240px;
    height: 52px;
  }

  &__text-subtitle {
    margin-bottom: 40px;
    font-family: Bert Sans;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    color: #35383F;
  }

  &__video {
    position:relative;
    padding: 0 0 56.25% 0;
    height:0;
    overflow:hidden;
  }

  &__iframe{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }

  &__preview {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
}
</style>

