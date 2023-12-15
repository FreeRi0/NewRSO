<template lang>
    <div class='postcard'>
        <img src="@app/assets/actions/action_1.png" class='postcard-image' alt='Изображение'/>
        <p class='postcard-title'>Спевка</p>
        <p class='postcard-title'>Важное мероприятие. Быть всем!</p>
        <section class='postcard-counts'>
            <div class='postcard-date'>29 февраля 2023</div>
            <div class='postcard-group'>20<img src="@app/assets/actions/Group_light.svg" alt=''/></div>
        </section>
        <section class='postcard-counts'>
            <div class='postcard-tag'>Всероссийское</div>
            <div class='postcard-tag'>Образовательное</div>
        </section>
    </div>
</template>

<script setup>
//Параметры модели
const props = defineProps({
    action:{
        id: 1,
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        groupReq: {
            type: Number,
            required: true
        },
        tags: {
            type: String,
            required: true
        }
    }
})
</script>

<style lang='scss' scoped>
.postcard{
  width: 280px;
  margin: 5px 5px 5px 5px;
  &-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &-image{
    height:210px;
    border: 1px solid black;
    border-radius: 5px;
  }
  &-title{
    height: 52px;
  }
  &-counts{
    display: flex;
    justify-content: space-between;
  }
  &-date, &-group{
    display: flex;
    flex-direction: row;
  }
  &-date img{
    width: 24px;
    height: 24px;
  }
  &-group img{
    width: 24px;
    height: 24px;
  }
  &-tag{
    width: 100%;
    margin-top: 15px;
    border: 1px solid black;
    font-family: Bert Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 20px;
    text-align: center;
  }
}
</style>