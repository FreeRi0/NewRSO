<template>
    <div class="container corpuniver">
        <h1 class="title title--mb">Охрана труда и техника безопасности</h1>

        <div class="corpuniver__image-box">
            <img src="@app/assets/SafetyBg.png" alt="Логотип конкурса" />
            <a href="https://vk.com/rso.university" target="_blank" class="corpuniver__vk">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                    <path
                        d="M12.0251 14.0534C4.73175 14.0534 0.571782 9.0534 0.398438 0.733398H4.05178C4.17178 6.84005 6.86506 9.42671 8.99837 9.96005V0.733398H12.4385V6.00002C14.5452 5.77337 16.7582 3.3734 17.5049 0.733398H20.945C20.3717 3.98674 17.9717 6.38671 16.265 7.37337C17.9717 8.17337 20.7051 10.2667 21.7451 14.0534H17.9583C17.145 11.5201 15.1185 9.56005 12.4385 9.29337V14.0534H12.0251Z"
                        fill="#35383F" />
                </svg>
            </a>
        </div>

        <div class="corpuniver__text">
            <p class="text corpuniver__text-about">
                С 22 по 27 апреля 2024 года пройдет <b>Всероссийская неделя охраны труда в РСО</b>

            </p>
            <p class="text corpuniver__text-about">
                Целью проведения Всероссийской недели охраны труда является формирование навыков организации безопасных
                условий труда среди членов студенческих отрядов на трудовых объектах и отрядных мероприятиях,
                определение порядка заблаговременного выявления потенциальных рисков в местах проведения работ и
                мероприятий, а также в местах размещения отрядов, предупреждения и порядку их устранения.
            </p>
            <p class="text corpuniver__text-about">
                Организаторами Всероссийской недели охраны труда являются региональные отделения МООО «РСО».
            </p>
        </div>
        <h2 id="trainingProgram" class="corpuniver__title-h2">
            Программа Всероссийской недели охраны труда в РСО
        </h2>
        <div class="text corpuniver__table">
            <v-table>
                <thead class="corpuniver__table__thread">
                    <tr class="corpuniver__table__tr">
                        <td class="corpuniver__table__th corpuniver__table__th__br-left">
                            Дата
                        </td>
                        <td class="corpuniver__table__th corpuniver__table__th__br-right">
                            Тема
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="corpuniver__table__td corpuniver__table__border-left">
                            22 апреля 2024г.
                        </td>
                        <td class="corpuniver__table__td">
                            Теоретическое занятие по охране труда «Охрана труда в работе молодежи»
                        </td>
                    </tr>
                    <tr>

                        <td class="corpuniver__table__td corpuniver__table__border-left">
                            23 апреля 2024г.
                        </td>
                        <td class="corpuniver__table__td">
                            «День огнетушителя»
                        </td>
                    </tr>
                    <tr>
                        <td class="corpuniver__table__td corpuniver__table__border-left">
                            24 апреля 2024г.
                        </td>
                        <td class="corpuniver__table__td">
                            «День СИЗ (средства индивидуальной защиты)»
                        </td>
                    </tr>

                    <tr>
                        <td class="corpuniver__table__td corpuniver__table__border-left">
                            25 апреля 2024г.
                        </td>

                        <td class="corpuniver__table__td">«День работы на высоте»</td>
                    </tr>

                    <tr>
                        <td class="corpuniver__table__td corpuniver__table__border-left"
                            style="border-bottom: #eceff4 solid 1px ; border-radius: 0px 0px 0px 10px">
                            26 апреля 2024г.
                        </td>

                        <td class="corpuniver__table__td"
                            style="border-bottom: #eceff4 solid 1px; border-radius: 0px 0px 10px 0px">
                            «День первой помощи»
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>

        <div class="corpuniver__text">
            <p class="text corpuniver__text-about">
                Более подробную информацию вы сможете получить в вашем региональном отделении <a
                    href="https://xn--d1amqcgedd.xn--p1ai/map">МООО «РСО».</a>
            </p>
            <p class="text corpuniver__text-about">
                В рамках конкурса «Лучший студенческий отряд» с 22 по 28 апреля состоится <b>Обучение по охране труда и
                    пожарной безопасности.</b>

            </p>
            <p class="text corpuniver__text-about">
                Для прохождения обучения по Охране труда и технике безопасности в РСО вам предстоит посмотреть обучающие
                видео. 
            </p>
            <p class="text corpuniver__text-about">
                Вы узнаете, с чего начинается охрана труда в РСО, ознакомитесь с основами безопасного выполнения видов
                работ, несчастными случаями на производстве и как избежать их наступления. Успешного обучения и
                качественного применения полученных знаний на
                практике. 
            </p>
        </div>
        <h2 id="video_1" class="corpuniver__title-h2">
            Занятие 1 «Перечень документов при приеме на работу. Часть 1»
        </h2>
        <div class="corpuniver__video " @click="playVideo(1)">
            <img src="@app/assets/lso/lessonFirst.png" v-show="showVideo[1] == false">
            <iframe v-show="showVideo[1] == true" class="corpuniver__iframe video_1"
                src="https://www.youtube.com/embed/5lBxsbNyyYQ?enablejsapi=1"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>



        <h2 id="video_2" class="corpuniver__title-h2">
            Занятие 1 «Перечень документов при приеме на работу. Часть 2»
        </h2>
        <div class="corpuniver__video" @click="playVideo(2)">
            <img src="@app/assets/lso/lesson1_2.png" v-show="showVideo[2] == false">
            <iframe v-show="showVideo[2] == true" class="corpuniver__iframe video_2"
                src="https://www.youtube.com/embed/bF2qhaLE-_k?enablejsapi=1"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <h2 id="video_3" class="corpuniver__title-h2">
            Занятие 2 «Документы, регламентирующие трудовые отношения работника и работодателя»
        </h2>
        <div class="corpuniver__video" @click="playVideo(3)">
            <img src="@app/assets/lso/lesson2.png" v-show="showVideo[3] == false">
            <iframe v-show="showVideo[3] == true" class="corpuniver__iframe video_3"
                src="https://www.youtube.com/embed/oZeFr6_b3UU?enablejsapi=1"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <h2 id="video_4" class="corpuniver__title-h2">
            Занятие 3 «Основные виды инструктажей при приеме на работу. Часть 1»
        </h2>
        <div class="corpuniver__video" @click="playVideo(4)">
            <img src="@app/assets/lso/lesson3_1.png" v-show="showVideo[4] == false">
            <iframe v-show="showVideo[4] == true" class="corpuniver__iframe video_4"
                src="https://www.youtube.com/embed/TOSphxyF1Sk?enablejsapi=1"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <h2 id="video_5" class="corpuniver__title-h2">
            Занятие 3 «Основные виды инструктажей при приеме на работу. Часть 2»
        </h2>
        <div class="corpuniver__video" @click="playVideo(5)">
            <img src="@app/assets/lso/lesson3_2.png" v-show="showVideo[5] == false" />
            <iframe v-show="showVideo[5] == true" class="corpuniver__iframe video_5"
                src="https://www.youtube.com/embed/SjRDDpy3LI4&t=10s?enablejsapi=1"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <h2 id="video_6" class="corpuniver__title-h2">
            Занятие 4 «Несчастный случай на производстве. Часть 1»
        </h2>
        <div class="corpuniver__video" @click="playVideo(6)">
            <img src="@app/assets/lso/lesson4_1.png" v-show="showVideo[6] == false" />
            <iframe v-show="showVideo[6] == true" class="corpuniver__iframe video_6"
                src="https://www.youtube.com/embed/jMblehZ2wuY&t=18s?enablejsapi=1"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <h2 id="video_7" class="corpuniver__title-h2">
            Занятие 4 «Несчастный случай на производстве. Часть 2»
        </h2>
        <div class="corpuniver__video" @click="playVideo(7)">
            <img src="@app/assets/lso/lesson4_2.png" v-show="showVideo[7] == false" />
            <iframe v-show="showVideo[7] == true" class="corpuniver__iframe video_7"
                src="https://www.youtube.com/embed/8fGUjz36o3A?enablejsapi=1"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <h2 id="video_8" class="corpuniver__title-h2">
            Занятие 5 «Первая помощь»
        </h2>
        <div class="corpuniver__video">

            <iframe class="corpuniver__iframe" src="https://vk.com/video_ext.php?oid=-223571150&id=456239108"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <div id="testing" class="corpuniver__documents-test">
            <p class="text corpuniver__documents-description-test">
                Итоговую аттестацию можно пройти с 22 апреля по 15 мая 2024 года (допускается 1 пересдача)
                Для прохождения тестирования необходимо набрать не менее 60 баллов. Удачи!
            </p>
            <router-link
                v-if="roleStore.status.is_commander_detachment ||
                    roleStore.status.is_commissar_detachment || (squadsStore.competitionSquads.find((item) => item.detachment?.id == userStore.currentUser.detachment_id || item.junior_detachment?.id == userStore.currentUser.detachment_id))"
                :to="{ name: 'safety' }">
                <Button label="Начать тестирование" class="corpuniver__documents-btn"></Button>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Button from '@shared/components/buttons/Button.vue';
import { useRoleStore } from '@layouts/store/role';
import { useUserStore } from '@features/store/index';
import { useSquadsStore } from '@features/store/squads';
const roleStore = useRoleStore();
const squadsStore = useSquadsStore();
const userStore = useUserStore();
const showVideo = ref({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false });


function playVideo(video) {
    const iframeElement = document.querySelector('.video_' + video);
    iframeElement.src += "&amp;autoplay=1";
    showVideo.value[video] = true;
}
</script>

<style lang="scss" scoped>
.corpuniver {
    &__title-h2 {
        font-family: Akrobat;
        font-size: 32px;
        font-weight: 600;
        line-height: 38px;
        color: #35383f;
        margin-top: 60px;
        margin-bottom: 40px;

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
        background-color: #ffffff;
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
            color: #1c5c94;
            text-decoration: none;
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
        padding: 0 120px;
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
        color: #35383f;
    }

    &__video {
        position: relative;
        padding: 0 0 56.25% 0;
        height: 0;
        overflow: hidden;

        img {
            cursor: pointer;
        }
    }

    &__iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &__preview {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }
}

.corpuniver__table {
    margin-bottom: 40px;

    &__tr {
        background-color: #eceff4;
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
            border-radius: 10px 0 0 0;
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
        border-right: #eceff4 solid 1px;
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
            border-bottom: #eceff4 solid 1px;
        }

        &__br-right {
            border-radius: 0 0 10px 0;
            border-bottom: #eceff4 solid 1px;
        }
    }

    &__border-left {
        border-left: #eceff4 solid 1px;
    }
}
</style>
