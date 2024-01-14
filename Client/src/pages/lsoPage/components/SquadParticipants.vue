<template>
    <section class="squad-participants">
        <section class="squad-tabs">
            <!--  Контейнер c вкладками   -->
            <nav class="squad__navigation">
                <h3 class="squad-participants__title">Участники</h3>
                <input
                    checked
                    id="tab-btn-1"
                    name="tab-btn"
                    type="radio"
                    value=""
                />
                <label class="tab-position" for="tab-btn-1">Уже в отряде</label>
                <input id="tab-btn-2" name="tab-btn" type="radio" value="" />
                <label class="position-tab" for="tab-btn-2"
                    >Ожидают одобрения</label
                >
                <div class="tab-content" id="content-1">
                    <section class="squad-participants__list">
                        <ul class="already_in_squad">
                            <li
                                class="squad-participant"
                                v-for="participant in member.slice(0, 6)"
                                v-if="member.length > 0"
                            >
                                <div
                                    class="squad-participant_box"
                                    v-if="participant.is_trusted == true"
                                >
                                    <img
                                        :src="participant.user.avatar.photo"
                                        alt="photo"
                                        v-if="participant.user.avatar"
                                    />
                                    <img
                                        src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                                        alt="photo"
                                        v-else
                                    />
                                    <h5 id="name_length">
                                        {{ participant.user.username }}
                                    </h5>
                                    <p>{{ position.name }}</p>
                                </div>
                            </li>
                            <h2 v-else>Участников не найдено...</h2>
                        </ul>
                        <router-link
                            :to="{
                                name: 'allparticipants',
                                params: { id: squad.id },
                            }"
                        >
                            <div class="squad-participants__link">
                                Показать всех
                            </div></router-link
                        >
                    </section>
                </div>
                <div class="tab-content" id="content-2">
                    <section class="squad-participants__list">
                        <ul class="wait_squad">
                            <li
                                class="squad-participant"
                                v-for="participant in member.slice(0, 6)"
                                v-if="member.length > 0"
                            >
                                <div
                                    class="squad-participant_box"
                                    v-if="participant.is_trusted == false"
                                >
                                    <img
                                        :src="participant.user.avatar.photo"
                                        alt="photo"
                                        v-if="participant.user.avatar"
                                    />
                                    <img
                                        src="@app/assets/foto-leader-squad/foto-leader-squad-01.png"
                                        alt="photo"
                                        v-else
                                    />
                                    <h5 id="name_length">
                                        {{ participant.user.last_name }}
                                    </h5>
                                    <p>{{ position.name }}</p>
                                </div>
                            </li>
                            <h2 v-else>Участников не найдено...</h2>
                        </ul>
                    </section>
                </div>
            </nav>
        </section>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
;
const position = ref({});
const route = useRoute();
const id = route.params.id;

const props = defineProps({
    // name: {
    //     type: String
    // },

    member: {
        type: Array,
    },
    squad: {
        type: Object,
        required: true,
    },
    position: {
        type: Object,
    },
});

// const aboutMembers = async () => {
//     await HTTP.get(`/detachments/${id}/members/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             member.value = response.data;
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };
// const aboutSquad = async () => {
//     await HTTP.get(`/detachments/${id}/`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Token ' + localStorage.getItem('Token'),
//         },
//     })
//         .then((response) => {
//             squad.value = response.data;
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log('an error occured ' + error);
//         });
// };

const aboutPosition = async () => {
    await HTTP.get(`/positions/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + localStorage.getItem('Token'),
        },
    })
        .then((response) => {
            position.value = response.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log('an error occured ' + error);
        });
};
onMounted(() => {
    // aboutMembers();
    // aboutSquad();
    aboutPosition();
});

// member.value = member.value.sort((a, b) => a.is_trusted - b.is_trusted);
// const lastCategoryIndex = member.value.findIndex(
//     (item) => item.is_trusted === false,
// );

// member.value = member.value.filter((item) => item.is_trusted === false)
</script>

<style scoped lang="scss">
/* Табы */
section.squad-tabs {
    margin-bottom: 40px;
}
.squad__navigation {
    margin-top: 60px;
}
section.squad-tabs .container {
    display: flex;
    flex-direction: column;
}
.squad-participants__list {
    border-radius: 10px;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.squad-participants__title {
    color: #212121;
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 40px;
}

.squad__navigation ul {
    list-style: none;
    justify-items: center;
}

.squad__navigation a {
    display: block;
    text-decoration: none;
    text-align: center;
    font-family: 'BertSans';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
}

/* ****************************************************************************************** */
.squad__navigation > input[type='radio'] {
    display: none;
}

#tab-btn-1:checked ~ #content-1,
#tab-btn-2:checked ~ #content-2 {
    display: block;
}

.tab-content {
    display: none;
    width: 100%;
    margin-top: 40px;
}

.squad__navigation > label {
    /*  */
    font-size: 20px;
    font-weight: 500;
    font-family: 'BertSans';
    color: #1f7cc0;
    text-decoration: none;
    line-height: 100%;
    /*  */
    padding: 6px 24px;
    cursor: pointer;
    transition:
        color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out;
    border: 2px solid #1f7cc0;
    border-radius: 30px;
}

.squad__navigation > input[type='radio']:checked + label {
    cursor: default;
    color: #fff;
    background-color: #1c5c94;
    /*  */
    border-radius: 30px;
    border: 2px solid #1c5c94;
}

nav {
    position: relative;
}

.tab-position {
    position: absolute;
    top: 1px;
    right: 255px;
    margin-right: -18px;
}

.position-tab {
    position: absolute;
    top: 1px;
    right: 1px;
}

.squad-participant {
    list-style: none;
}

.squad-participants__list {
    margin-bottom: 40px;
}

.already_in_squad,
.wait_squad {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(183.2px, 1fr));
    margin-bottom: 40px;
    padding: 24px;
    height: 252px;
    overflow: hidden;
}

.squad-participants__list .container {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.squad-participant_box {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.squad-participant_box img {
    margin-bottom: 32px;
    width: 120px;
    height: 120px;
    border-radius: 100%;
}

.squad-participant_box h5 {
    color: #35383f;
    text-align: center;
    font-family: 'BertSans';
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /* видимость текста */
    width: 161px;
    overflow: hidden;
    text-overflow: ellipsis;
    //
    margin-bottom: 5px;
}

.squad-participant_box p {
    color: #676767;
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.48px;
}

.squad-participants__link {
    display: flex;
    justify-content: center;
    color: #5e5c5c;
    font-family: 'Montserrat';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.4px;
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    /* расстояние */
    padding-bottom: 24px;
}

@media (max-width: 660px) {
    .position-tab,
    .tab-position {
        position: static;
        margin-right: 8px;
    }
}
@media (max-width: 646px) {
    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        height: 253px;
    }
}

@media (max-width: 612px) {
    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        height: 212px;
    }
    .squad-participant_box img {
        padding: 8px 16px 0px 16px;
        max-width: 130px;
    }
    .squad-participant_box h5 {
        font-size: 20px;
        width: 130px;
    }
}

@media (max-width: 493px) {
    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
        height: 169px;
        padding: 16px;
    }
    .squad-participant_box h5 {
        font-size: 20px;
        width: 95.5px;
    }

    .squad-participant_box p {
        font-size: 13px;
    }

    .squad-participant_box img {
        padding: 8px 16px 0px 16px;
        max-width: 95.5px;
    }
}
@media (max-width: 450px) {
    .squad__navigation > label {
        font-size: 16px;
        padding: 8px 15px;
    }
}
@media (max-width: 393px) {
    .already_in_squad,
    .wait_squad {
        grid-template-columns: repeat(auto-fill, minmax(95.5px, 1fr));
        padding: 16px 7.5px;
    }
}

// /////////////////////////////////////////////////////////////////////////////////////
</style>
