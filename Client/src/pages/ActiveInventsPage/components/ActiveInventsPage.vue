<template>
    <div class='container'>
        <Breadcrumbs></Breadcrumbs>
        <div class='title'>Активные заявки</div>
        <div class='menu'>
            <router-link to='/activeInvents/accountVerification'><segment class='menu-block'>Верификация аккаунтов</segment></router-link>
            <router-link to='/activeInvents/inventActions'><segment class='menu-block'>Заявка на вступление в отряд</segment></router-link>
                <router-link to='/activeInvents/inventSquads'><segment class='menu-block'>Заявка на участие в мероприятии</segment></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import Breadcrumbs from '@shared/components/breadcrumbs/Breadcrumbs.vue';
</script>

<style lang='scss' scoped>
    .menu{
      display: flex;
      width: 100%;
      align-items: flex-start;
      margin-top: 40px;
      margin-bottom: 40px;

      &-block{
        height: 40px;
        display: flex;
        padding: 10px 24px;
        margin-right: 20px;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        color: #1C5C94;
        border: 2px solid #1C5C94;
        background: #FFF;
      }
      &-block-active{
        color: #FFF;
        background: #1C5C94;
        border: 2px solid #FFF;
      }
    }

</style>