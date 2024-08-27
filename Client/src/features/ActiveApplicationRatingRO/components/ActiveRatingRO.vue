<template>
    <div class="grid_field">
        <div class="form__field-group" v-for="application in applications" :key = application.id>
            <div class="data_field">
                <img class="left_img div1" src="@app/assets/folder-img.png" alt="folder">
                <div class="right_block div2">
                    <p class="indicator_name">{{ application.name }}</p>
                    <p class="indicator_name">{{ application.part }}</p>
                    <div class="headquarter_block">
                        <img  class="headquarter_img" v-if="application.headquarter.media.avatar" :src=application.headquarter.media.avatar>
                        <p>{{ application.headquarter.name }}</p>
                    </div>
                </div>
                <div class="hr div3"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const applications = ref([
    {
        id: 1,
        name: 'Отчет о деятельности РО РСО за 2024 год.',
        part: '2 часть',
        headquarter: {
            id:1,
            name: 'Региональный республиканский штаб Алтайского РО',
            media: {
                avatar: '123.png',
            },
        }
    },
    {
        id: 2,
        name: 'Отчет о деятельности РО РСО за 2024 год.',
        part: '2 часть',
        headquarter: {
            id:1,
            name: 'Региональный республиканский штаб Алтайского РО',
            media: {
                avatar: undefined,
            },
        }
    },
    {
        id: 3,
        name: 'Отчет о деятельности РО РСО за 2024 год.',
        part: '2 часть',
        headquarter: {
            id:1,
            name: 'Региональный республиканский штаб Алтайского РО',
            media: {
                avatar: '123.png',
            },
        }
    },
    {
        id: 4,
        name: 'Отчет о деятельности РО РСО за 2024 год.',
        part: '2 часть',
        headquarter: {
            id:1,
            name: 'Региональный республиканский штаб Алтайского РО',
            media: {
                avatar: '123.png',
            },
        }
    },
    {
        id: 5,
        name: 'Отчет о деятельности РО РСО за 2024 год.',
        part: '2 часть',
        headquarter: {
            id:1,
            name: 'Региональный республиканский штаб Алтайского РО',
            media: {
                avatar: undefined,
            },
        }
    },
    {
        id: 6,
        name: 'Отчет о деятельности РО РСО за 2024 год.',
        part: '2 часть',
        headquarter: {
            id:1,
            name: 'Региональный республиканский штаб Алтайского РО',
            media: {
                avatar: '123.png',
            },
        }
    },
    {
        id: 7,
        name: 'Отчет о деятельности РО РСО за 2024 год.',
        part: '2 часть',
        headquarter: {
            id:1,
            name: 'Региональный республиканский штаб Алтайского РО',
            media: {
                avatar: '123.png',
            },
        }
    }
]);

</script>

<style scoped>
.headquarter_img {
    float: left;
    margin-right: 16px;
    width: 48px;
    height: 48px;
}

.headquarter_block{
    padding-top: 32px;
}

.headquarter_name {
    font-family: Akrobat;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.6px;
    text-align: left;
    color: #6D6D6D;
}

.indicator_name {
    font-family: Akrobat;
    font-size: 24px;
    font-weight: 600;
    line-height: 28.8px;
    text-align: left;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 2 / 1 / 3 / 3; }

.data_field {
    padding: 32px;
    display: grid;
    grid-template-columns: 48px 1fr;
    grid-template-rows: 1fr 1px;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
}

.grid_field {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
}

.form__field-group {
    background: #F3F4F5;
    border: none;
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 0;
}

.hr {
    width: 100%;
    border-top: 1px solid #B6B6B6;

    @media (max-width: 568px) {
        width: 340px;
        margin: 0 auto;
    }
}
</style>