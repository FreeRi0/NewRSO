<template>
    <div class="container competition">
        <h1 class="title title--mb">
            {{ competition.name }}
        </h1>

        <div class="competition__promo">
            <div class="competition__container">
                <div class="competition__image-box">
                    <img v-if="sizeImage == 'mobile'" src="@app/assets/competition/mobile-promo.png"
                        alt="Логотип конкурса" width="328" height="150" />
                    <img v-else-if="sizeImage == 'tablet'" src="@app/assets/competition/tablet-promo.png"
                        alt="Логотип конкурса" width="700" height="302" />
                    <img v-else-if="sizeImage == 'laptop'" src="@app/assets/competition/laptop-promo.png"
                        alt="Логотип конкурса" width="892" height="386" />
                    <img v-else src="@app/assets/competition/desktop-promo.png" alt="Логотип конкурса" width="1180"
                        height="510" />
                </div>
            </div>

            <div class="competition__status-application">
                <!-- <router-link
                    v-if="!isAuth"
                    to="/Login"
                    class="btn competition__status-application-button"
                    >Участвовать</router-link
                > -->
                <div>
                    <!-- <Button
                        v-if="!userCommander.detachment_commander"
                        label="Участвовать"
                        @click="errorIsNoCommander = !errorIsNoCommander"
                        class="competition__status-application-button"
                    ></Button> -->
                    <!--
                    <Button
                        v-if="currentStatus.status === 'Еще не участвуете'"
                        label="Участвовать"
                        class="competition__status-application-button"
                        @click="onSendApplication"
                    ></Button> -->

                    <span v-if="currentStatus.status === 'Заявка на рассмотрении'"
                        class="competition__status-application-info">
                        Заявка на рассмотрении
                    </span>

                    <span v-else-if="currentStatus.status === 'Вы участник'"
                        class="competition__status-application-info">
                        Вы участник
                    </span>
                </div>
            </div>
        </div>

        <h2 class="subtitle">О конкурсе</h2>

        <p class="text competition__text-about">
            Конкурс &laquo;Лучший студенческий отряд&raquo;&nbsp;&mdash;
            возможность выиграть миллион. Участвовать могут как&nbsp;те, кто уже
            состоит в&nbsp;отряде, так и&nbsp;те, кто еще не&nbsp;является
            частью студенческих отрядов. В&nbsp;рамках конкурса отряды
            соревнуются в&nbsp;нескольких номинациях за&nbsp;звание лучшего.
            Чтобы победить, нужно выполнить конкурсные задания, а&nbsp;также
            хорошо проявить себя в&nbsp;работе и&nbsp;творчестве. Лучшие отряды
            получат мощную поддержку для дальнейшего развития от&nbsp;РСО
            и&nbsp;партнеров. Главный приз&nbsp;&mdash;
            1&nbsp;000&nbsp;000&nbsp;рублей, который можно потратить
            на&nbsp;продвижение, обучение, оснащение и&nbsp;другие полезные для
            отряда дела.
        </p>

        <ul class="text competition__about">
            <li class="competition__item">
                <ul class="competition__list">
                    <li>
                        <span>Масштаб конкурса:</span>
                        <span>Всероссийский</span>
                    </li>
                    <li>
                        <span>Две номинации:</span>
                        <span>«Тандем» и «Дебют»</span>
                    </li>
                    <li>
                        <span>Призовой фонд:</span>
                        <span>10 000 000 рублей</span>
                    </li>
                    <li>
                        <span>Телефон кол-центра:</span>
                        <span>8-800-770-01-17</span>
                    </li>
                </ul>
            </li>

            <li>
                <ul class="competition__list">
                    <li>
                        <span>Начало конкурса:</span>
                        <span>25.01.2024</span>
                    </li>
                    <li>
                        <span>Окончание конкурса:</span>
                        <span>15.10.2024</span>
                    </li>
                    <li>
                        <span>Начало регистрации:</span>
                        <span>25.01.2024 </span>
                    </li>
                    <li>
                        <span>Окончание регистрации:</span>
                        <span>10.03.2024</span>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="competition__documents">
            <p id="file-chosen-statement" class="text competition__documents-description text-column">
                Положение о проведении<a class="a-spacing"/> конкурса и формировании рейтинга линейных
                студенческих отрядов Молодёжной<a class="a-spacing1"/> общероссийской общественной
                <a class="a-spacing2"/>организации «Российский<a class="a-spacing3" /> Студенческие Отряды»
            </p>
            <a target="_blank" class="competition__documents-button" @click.prevent="downloadDocument">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
                    <path
                        d="M23.9988 6.79313V26.2502C23.9988 28.3212 22.3199 30 20.249 30H3.74981C1.67885 30 0 28.3212 0 26.2502V3.75132C0 1.68035 1.67885 0.00150349 3.74981 0.00150349H17.2072C17.4063 -0.0111251 17.6135 0.0552602 17.7794 0.221163L23.7791 6.22086C23.945 6.38676 24.0114 6.59402 23.9988 6.79313ZM16.4992 1.50143H3.74981C2.50723 1.50143 1.49992 2.50874 1.49992 3.75132V26.2502C1.49992 27.4928 2.50723 28.5001 3.74981 28.5001H20.249C21.4916 28.5001 22.4989 27.4928 22.4989 26.2502V7.50113H17.2491C16.8349 7.50113 16.4992 7.16536 16.4992 6.75116V1.50143ZM17.9991 2.56204V6.0012H21.4383L17.9991 2.56204ZM11.9994 21.4398L15.2189 18.2203C15.5118 17.9274 15.9866 17.9274 16.2795 18.2203C16.5724 18.5131 16.5724 18.988 16.2795 19.2809L11.8791 23.6812C11.7455 23.8874 11.5134 24.0237 11.2494 24.0237C10.9855 24.0237 10.7534 23.8874 10.6197 23.6812L6.21936 19.2809C5.92648 18.988 5.92648 18.5131 6.21936 18.2203C6.51224 17.9274 6.98709 17.9274 7.27997 18.2203L10.4995 21.4398V11.2509C10.4995 10.8367 10.8352 10.501 11.2494 10.501C11.6636 10.501 11.9994 10.8367 11.9994 11.2509V21.4398Z"
                        fill="#1F7CC0" />
                </svg>
                Скачать документ</a>
        </div>



        <div class="d-flex  competition__school-wrapper" v-if="
            roleStore.status.is_commander_detachment ||
            roleStore.status.is_commissar_detachment ||
            roleStore.roles.regionalheadquarter_commander ||
            roleStore.roles.centralheadquarter_commander
        ">
            <img src="@app/assets/competition/bgSchool.png" alt="bg" />
            <div class="competition__school">
                <p>
                    В рамках конкурса «Лучший студенческий отряд» с 11 марта по
                    10 апреля состоится
                    <span>Школа командных составов линейных студенческих отрядов
                        РСО</span>
                </p>

                <router-link :to="{
                    name: 'CorpUniver',
                }"><Button class="competition__school_btn"
                        label="Обучение в Корпоративном университете" /></router-link>
            </div>
        </div>

        <div class="d-flex competition__safety-wrapper">

            <div class="competition__safety-text">
                <p>
                    В рамках конкурса «Лучший студенческий отряд» с 22
                    по 28 апреля состоится обучение по охране труда и пожарной
                    безопасности.
                    <span>Школа командных составов линейных студенческих отрядов
                        РСО</span>
                </p>

                <router-link :to="{
                    name: 'Safety',
                }"><Button class="competition__safety-text_btn"
                        label="Обучение по охране труда и технике безопасности" /></router-link>
            </div>

            <img src="@app/assets/bg_safety.jpg" alt="bg" />
        </div>
        <router-link :to="{
            name: 'CompetitionParticipants',
            params: { id: competition.id },
        }">
            <h2 class="subtitle subtitle--link">Участники конкурса</h2>
        </router-link>

        <!--Модальные окна-->
        <ModalCompetition v-if="isSendApplication" @close-pop-up="closeSendApplication" @sucsess="onSucsess"
            :squad="squad"></ModalCompetition>

        <div class="competition__overlay" v-if="errorIsNoCommander" @click="errorIsNoCommander = !errorIsNoCommander">
        </div>
        <div v-if="errorIsNoCommander" class="competition__info">
            <button type="button" @click="errorIsNoCommander = !errorIsNoCommander" class="competition__button-close">
                x
            </button>
            <p class="competition__message">
                Подать заявку на&nbsp;участие в&nbsp;Конкурсе может только
                Командир отряда. Вы&nbsp;можете стать Командиром, создав свой
                отряд. Для этого перейдите в&nbsp;блок
                &laquo;Структура&raquo;&nbsp;&mdash; &laquo;ЛСО&raquo;
                и&nbsp;нажмите на&nbsp;кнопку &laquo;Создать отряд&raquo;.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Button } from '@shared/components/buttons';
import { ModalCompetition } from '@features/Competition';
import { useRoleStore } from '@layouts/store/role';
import { useUserStore } from '@features/store/index';
import { useSquadsStore } from '@features/store/squads';
import { HTTP } from '@app/http';
// import { useRoute } from 'vue-router';
// const route = useRoute();
import { usePage } from '@shared';

usePage({ isHidden: true });
const roleStore = useRoleStore();
const isAuth = ref(!!localStorage.getItem('jwt_token'));
const squadsStore = useSquadsStore();
const userStore = useUserStore();
const userCommander = ref({});



const getUserCommander = async () => {
    try {
        const response = await HTTP.get(`rsousers/me_commander/`,);

        userCommander.value = response.data;
        // console.log('конкурс', response);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const squad = ref({});
const getMeSquad = async () => {
    try {
        const response = await HTTP.get(
            `detachments/${userCommander.value.detachment_commander.id}/`,

        );

        squad.value = response.data;
        // console.log('конкурс', response);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const downloadDocument = async () => {
    HTTP.get('competitions/download_regulation_file/', {
        responseType: 'blob',
    })
        .then((response) => {
            var FILE = window.URL.createObjectURL(response.data);

            var docUrl = document.createElement('a');
            docUrl.href = FILE;
            docUrl.setAttribute('target', '_blank');
            docUrl.setAttribute('type', 'application/pdf');
            document.body.appendChild(docUrl);
            docUrl.click();
            // console.log(response, 'success');
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};

//------Компонент для адаптивного изображения при загрузке и ресайзе-----------------------------------------

let sizeImage = ref('desktop');

const getSizeImage = () => {
    // console.log('ширина экрана', window.innerWidth);
    if (window.innerWidth <= 360) {
        sizeImage.value = 'mobile';
    }
    if (window.innerWidth > 360 && window.innerWidth <= 768) {
        sizeImage.value = 'tablet';
    }
    if (window.innerWidth > 768 && window.innerWidth <= 1024) {
        sizeImage.value = 'laptop';
    }
    if (window.innerWidth > 1024) {
        sizeImage.value = 'desktop';
    }
};

//----------------------------------------------------------------------------------------------------------

//--id конкурса на лучший отряд--------------------------------
// let id = route.params.id;
let id = 1;

const competition = ref({});
const currentStatus = ref({});
const isSendApplication = ref(false);
const errorIsNoCommander = ref(false);

const getCompetition = async () => {
    try {
        const response = await HTTP.get(`competitions/${id}/`, {
            // headers: {
            //     'Content-Type': 'application/json',
            //      Authorization: 'JWT ' + localStorage.getItem('jwt_token'),
            // },
        });

        competition.value = response.data;
        // console.log('конкурс', response);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const getSquadStatus = async () => {
    try {
        const response = await HTTP.get(
            `competitions/${id}/check_detachment_status/`,

        );

        currentStatus.value = response.data;
        // console.log('конкурс', response);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};

const onSendApplication = () => {
    if (!userCommander.value.detachment_commander) {
        errorIsNoCommander.value = true;
    } else isSendApplication.value = true;
};

if (squadsStore.squad.nomination) {
    squadsStore.getSquadMembers();
}

// const isCompetitonMember = computed(() => {
//    return squad
// })

const onSucsess = () => {
    getSquadStatus();
};

const closeSendApplication = () => {
    isSendApplication.value = false;
};

onMounted(async () => {
    if (isAuth.value) {
        await getUserCommander();
    }

    await getCompetition();
    if (isAuth.value) {
        await getSquadStatus();
    }
    if (isAuth.value) {
        await getMeSquad();
    }
    
    getSizeImage();
    window.addEventListener('resize', getSizeImage);
});

onUnmounted(() => {
    window.removeEventListener('resize', getSizeImage);
});
</script>
<style lang="scss">
@media screen and (max-width: 320px) and (max-height:462px) {
.text-column{
    // margin: -5px;
    word-spacing: 0px;

}
.a-spacing{
    // margin-left: 1px;
}
.a-spacing1{
    // margin-left: -4px;
}
.a-spacing2{
    // margin-right: -57px;
}
.a-spacing3{
    // margin-left: -17px;
    
}
}
</style>
