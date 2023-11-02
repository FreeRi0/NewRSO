<template>
    <section class="squad-participants">
        <section class="squad-tabs">
            <div class="container">
                <!--  Контейнер c вкладками   -->
                <nav class="squad__navigation">
                    <h3 class="squad-participants__title">Участники</h3>
                    <input checked id="tab-btn-1" name="tab-btn" type="radio" value="">
                    <label class="tab-position" for="tab-btn-1">Уже в отряде</label>
                    <input id="tab-btn-2" name="tab-btn" type="radio" value="">
                    <label class="position-tab" for="tab-btn-2">Ожидают одобрения</label>
                    <div class="tab-content" id="content-1">
                        <section class="squad-participants__list">
                            <div class="container">
                                <ul class="already_in_squad">
                                    <li class="squad-participant" v-for="participant in participants.slice(0,6)">
                                        <div class="squad-participant_box" v-if="participant.category == 1">
                                            <img :src="'./assets/lso/'+participant.image" alt="avatar"/>
                                            <h5 id="name_length">{{ participant.name }}
                                            </h5>
                                            <p>{{ participant.status }}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="squad-participants__link">
                                    <a href="#">Показать всех</a>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="tab-content" id="content-2">
                        <section class="squad-participants__list">
                            <div class="container">
                                <ul class="already_in_squad" >
                                    <li class="squad-participant" v-for="participant in participants.slice(lastCategoryIndex,lastCategoryIndex+6)">
                                        <div class="squad-participant_box" v-if="participant.category == 2">
                                            <img :src="'./assets/lso/'+participant.image" alt="avatar"/>
                                            <h5 id="name_length">{{ participant.name }}
                                            </h5>
                                            <p>{{ participant.status }}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="squad-participants__link">
                                    <a href="#">Показать всех</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </nav>
            </div>
        </section>
    </section>
</template>

<script setup>
import {ref} from "vue"
const participants = ref([
    {
        name:"Андрей",
        status:"Командир",
        image:'squad-participant.png',
        category: 2
    },
    {
        name:"Мария",
        status:"Комиссар",
        image: 'squad-participant2.png',
        category: 1
    },
    {
        name:"Екатерина",
        status:"Мастер",
        image: 'squad-participant3.png',
        category: 1
    },
    {
        name:"Иван",
        status:"Медик",
        image: 'squad-participant4.png',
        category: 1
    },
    {
        name:"Елена",
        status:"Флагоносец",
        image: 'squad-participant5.png',
        category: 1
    },
    {
        name:"Анна",
        status:"Боец",
        image: 'squad-participant6.png',
        category: 1
    },
    {
        name:"Артём",
        status:"Боец",
        image: 'squad-participant.png',
        category: 2
        
    },
    {
        name:"Алла",
        status:"Боец",
        image: 'squad-participant2.png',
        category: 2
        
    },
    {
        name:"Маргарита",
        status:"Боец",
        image: 'squad-participant3.png',
        category: 2
    },
    {
        name:"Сергей",
        status:"Боец",
        image: 'squad-participant4.png',
        category: 2
    },
    {
        name:"Алёна",
        status:"Боец",
        image: 'squad-participant5.png',
        category: 2
    },
    {
        name:"Виктория",
        status:"Боец",
        image: 'squad-participant6.png',
        category: 1
    }

    ])
    participants.value = participants.value.sort((a, b) => a.category - b.category)
    const lastCategoryIndex = participants.value.findIndex(item => item.category === 2)
</script>

<style scoped lang="scss">
    /* Табы */
section.squad-tabs {
    margin-bottom: 40px;
}

section.squad-tabs .container {
    display: flex;
    /* justify-content: space-between; */
    flex-direction: column;
}

.squad-participants__title {
    color: #212121;
    font-family: "Akrobat";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 40px;

}






.squad__navigation ul {
    list-style: none;
    display: flex;
    /* display: grid; */
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fit, minmax(48px, 1fr));
    /* grid-template-rows: 48px; */
    column-gap: 10px;
    row-gap: 10px;
    /* justify-content: end; */
    justify-items: center;
    align-content: center;
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
.squad__navigation>input[type='radio'] {
    display: none;
}


#tab-btn-1:checked~#content-1,
#tab-btn-2:checked~#content-2 {
    display: block;
}

.tab-content {
    display: none;
    width: 100%;
    margin-top: 40px;
}

.squad__navigation>label {
    /*  */
    font-size: 20px;
    font-weight: 500;
    font-family: "BertSans";
    color: #1F7CC0;
    text-decoration: none;
    /*  */
    padding: 6px 24px;
    cursor: pointer;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
    border: 2px solid #1F7CC0;
    border-radius: 30px;
}

.squad__navigation>input[type="radio"]:checked+label {
    cursor: default;
    color: #fff;
    background-color: #1C5C94;
    /*  */
    border-radius: 30px;
    border: 2px solid #1C5C94;

}

nav {
    position: relative;
}

.tab-position {
    position: absolute;
    top: 1px;
    right: 255px;
    margin-right: 8px;
}

.position-tab {
    position: absolute;
    top: 1px;
    right: 1px;
}

.squad-participant {
    list-style: none;
    /* padding: 19.5px 20.5px 11.5px 20.5px; */
}

.squad-participants__list {
    margin-bottom: 40px;
}

.already_in_squad {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 16px;
    padding: 24px;
}

.squad-participants__list .container {

    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.squad-participant_box {
    align-items: center;
    display: flex;
    flex-direction: column;
}

.squad-participant_box img {
    margin-bottom: 32px;
    padding: 19.5px 20.5px 0px 20.5px;
}

.squad-participant_box h5 {
    color: #35383F;
    text-align: center;
    font-family: "BertSans";
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /* max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */

}

.squad-participant_box p {
    color: #676767;
    font-family: "BertSans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.48px;
}

.squad-participants__link {
    display: flex;
    justify-content: center;
}

.squad-participants__link a {
    /* оформление ссылки */
    color: #5E5C5C;
    font-family: "Montserrat";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.4px;
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    /* расстояние */
    margin-bottom: 24px;
}

</style>