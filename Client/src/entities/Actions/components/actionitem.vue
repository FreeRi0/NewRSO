<template>
    <div class='postcard' @click='RouteToAction'>
        <img src="{{action.banner}}" class='postcard-image' alt='Изображение'/>
        <p class='postcard-title'>{{action.name}}</p>
        <p class='postcard-title'>{{action.description}}</p>
        <section class='postcard-counts'>
            <div class='postcard-date'>{{action.time_data.start_date + " - " + action.time_data.start_time}}</div>
            <div class='postcard-group'>{{action.participants_number}}<img src="@app/assets/actions/Group_light.svg" alt=''/></div>
        </section>
        <section class='postcard-counts'>
            <div class='postcard-tag'>{{action.direction}}</div>
            <div class='postcard-tag'>{{action.format}}</div>
        </section>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();
//Параметры модели
const props = defineProps({
    action:{
        id: Number,
        author: String,
        format: String,
        direction: String,
        status: String,
        scale: String,
        created_at: String,
        name: String,
        banner: String,
        conference_link: String,
        address: String,
        description: String,
        application_type: String,
        available_structural_units: String,
        participants_number: String,
        time_data: {
            start_date: String,
            start_time: String
        }
    }
})

//Функция обработки перехода
function RouteToAction(){
    router.push("/");
}
</script>

<style lang='scss' scoped>
.postcard{
  width: 280px;
  margin: 5px 5px 5px 5px;
  border-radius: 5px;
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

.postcard:hover{
  cursor: pointer;
  border: 1px solid black;
}
</style>