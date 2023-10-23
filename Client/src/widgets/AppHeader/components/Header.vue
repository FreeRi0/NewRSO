<template>
  <div class="container">
    <header class="header">

      <ul class="header__logo">
        <li class="header__logo-rso">
          <a href="https://трудкрут.рф/" target="_blank">
            <img src="../../../app/assets/logo/logo-rso-tablet.svg" width="60" height="58" alt="Логотип сайта трудкрут.рф">
          </a>
        </li>

        <li class="header__logo-labor-cool">
          <a href="https://trudkrutshop.ru/" target="_blank">
            <img src="../../../app/assets/logo/logo-shop-tablet.svg" width="56" height="56" alt="Логотип сайта trudkrutshop.ru">
          </a>
        </li>
      </ul>

      <nav class="header__nav nav-menu">        
        <button class="header__button-mobile-menu" type="button"></button>
        <ul class="header__nav-list no-visible">
            <li class="header__nav-item">
              <div class="dropdown nav-menu">
                <Dropdown/>
              </div>
            </li>
            <li class="header__nav-item">
              <a class="header__nav-link" href="#">Мероприятия</a>
            </li>
            <li class="header__nav-item">
              <a class="header__nav-link" href="#">Полезная информация</a>
            </li>
        </ul>
      </nav>

      <nav class="header__nav nav-user">
        <div class="application-count">
          <a href=""><!--КОЛОКОЛЬЧИК ЭТО ССЫЛКА?? ЧТО ПРОИСХОДИТ ПРИ НАЖАТИИ??-->
            <img src="../../../app/assets/icon/bell-light.svg" width="36" height="36" alt="Иконка уведомления">
          </a>
          <div class="quantity"></div>
        </div>

        <button class="nav-user__location">
          <!--прописать в span кнопки логику изменения ее названия-->
          <span>Карачаево-Черкесское региональное отделение</span>
        </button>

        <div class="dropdown user-menu">
          <button type="button">
            <img src="../../../app/assets/avatar-user.svg" alt="Фотография пользователя" width="56" height="56">
          </button>
          <ul>
            <li class=""><a href="#">Моя страница</a></li>
            <li class=""><a href="#">Мой отряд</a></li>
            <li class=""><a href="#">Штаб СО ОО</a></li>
            <li class=""><a href="#">Местный штаб</a></li>
            <li class=""><a href="#">Региональный штаб</a></li>
            <li class=""><a href="#">Окружной штаб</a></li>
            <li class=""><a href="#">Активные заявки</a></li>
            <li class=""><a href="#">Поиск участников</a></li>
            <li class=""><a href="#">Членский взнос</a></li>
            <li class=""><a href="#">Оформление справок</a></li>
            <li class=""><a href="#">Настройки профиля</a></li>
            <li class=""><a href="#">Выйти из ЛК</a></li>
          </ul>
        </div>
      </nav> 
    </header>
  </div>
</template>

<script>

import { Dropdown } from '@shared/components/dropdown'

export default {
  components: {
    Dropdown,
  },
}
</script>

<style scoped lang="scss">

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  color: #35383f;
  position: relative;

  a {
    color: #35383f;
  }
}

.header__logo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  max-width: 146px;
}

.nav-menu {
  @media(max-width: 1024px) {
    order: 3;
  }
}

.header__nav-list {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 32px;
  max-width: 445px;

  @media(max-width: 1024px) {
    position: absolute;
    right: 0;
    top: calc(100%);
    padding: 28px;
    border-radius: 10px;
    grid-template-columns: 1fr;
    row-gap: 8px;
    background-color: #1f7cc0;

  a {
    color: #ffffff;
  }
  }
}

.header__nav-list.no-visible {
  @media(max-width: 1024px) {
    display: none;
  }
}

.header__button-mobile-menu {
  display: none;
  position: relative;

  @media(max-width: 1024px) {
    display: block;
    width: 36px;
    height: 36px;
    margin-left: 60px;
    padding: 6px 4px;

    &::before {
      position: absolute;
      content: "";
      width: 24px;
      height: 1px;
      top: 8px;
      left: 6px;
      right: 6px;
      background-color: #35383f;
      box-shadow: 0 10px 0 0#35383f,0 20px 0 0#35383f;
    }
  }
}

.header__nav-item {
  @media(max-width: 1024px) {
    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.header__nav-link {
  display: block;
  padding: 11px 0;
}

.nav-user {
  display: grid;
  grid-template-columns: 36px min-content 82px;
  column-gap: 48px;
  align-items: center;

  &__location {
    min-width: 190px;//скорректировать после шрифтов
  }

  @media(max-width: 1024px) {
    margin-left: auto;
    column-gap: 60px;
  }
}

// .nav-menu {
//   display: none;
// }

.user-menu ul {
  display: none;
}

.application-count a {
  display: block;
  width: 36px;
  height: 36px;
  background-image: url('../../../app/assets/icon/bell-light.svg');
}
</style>