<template>
    <div class="container">
        <div class="event event-empty">Если что это читаете, то страницы мероприятий ещё не доделаны. Отдел разработки активно работает над этим недоразумением</div>
    </div>
</template>

<script setup></script>

<style lang="scss">
.event{
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    &-cols-2{
        display: flex;
        flex-direction: row;
        justify-content: start;
        width: 48%;
        margin-left: 1%;
        margin-right: 1%;
        height: 40px;
    }
    &-empty{
        height: 60px;
        margin-top: 20px;
        margin-bottom: 20px;
        color: white;
        border-radius: 20px;
        background-color: rgba(28, 92, 148, 1);;
        justify-content: center;
        align-items: center;
    }
}
</style>