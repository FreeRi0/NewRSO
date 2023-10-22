<template>
  <div class="footer">
    <div class="container">
                <!-- Вехний контейнер футера -->
                <div class="footer__top-container">
                    <!-- Первая колонка  -->
                    <!-- Логотип РСО -->
                    <div class="footer__logo-wrapper">
                        <div class="footer__logo-rso">
                            <img src="../../../app/assets/logo/rso-white.svg" width="80" height="72" alt="Логотип сайта РСО">
                        </div>
                        <!-- Иконки соцсетей -->
                        <ul class="footer__social-list">
                          <li class="footer__social-item">
                            <a href="https://vk.com/rso_official" target="_blank">
                              <img src="../../../app/assets/logo/vk-white.svg" width="28" height="28" alt="Логотип группы Вконтакте">
                            </a>
                          </li>
                          <li class="footer__social-item">
                            <a href="https://t.me/rso_official" target="_blank">
                              <img src="../../../app/assets/logo/telegram-white.svg" width="28" height="28" alt="Логотип канала в Телеграмм">
                            </a>
                          </li>
                        </ul>
                    </div>
                    <!-- Вторая колонка Адрес-->
                    <!-- <div class="footer__contacts-address"> -->
                        <p class="footer__contacts-address">105005, г. Москва, Лефортовский переулок, 8, строение 1</p>
                    <!-- </div> -->
                    <!-- Третья колонка Контакты-->
                    <ul class="footer__contacts">
                        <li class="footer__contacts-telephone">
                            <a href="tel:+74992613345">8 499 261 33 45</a>
                        </li>
                        <li class="footer__contacts-telephone">
                            <p class="footer__text-p">Горячая линия РСО:</p>
                            <a href="tel:+78007700117">8 800 770 0 117</a>
                        </li>
                        <li class="footer__contacts-email">
                            <a href="mailto:r.s.o@mail.ru">r.s.o@mail.ru</a>
                        </li>
                    </ul>
                    <!-- Четвёртая колонка Политика конфиденциальности Пользовательское соглашение -->
                    <ul class="footer__privacy-policy-list">
                      <li class="footer__privacy-policy-item">
                          <a href="#">Политика конфиденциальности</a>
                      </li>
                      <li class="footer__user-agreement">
                          <a href="#">Пользовательское соглашение</a>
                      </li>
                    </ul>
                </div>
                <!-- Нижний контейнер футера -->
                <div class="footer__bottom-container">
                    <!-- Левая часть футера -->
                    <div class="footer__all-rights-reserved">
                        <p>&copy; 1959-2023 РОССИЙСКИЕ СТУДЕНЧЕСКИЕ ОТРЯДЫ.</p>
                        <p>Все права защищены.</p>
                    </div>
                    <!-- Правая часть футера-->
                    <div class="footer__developed">
                      <p>Сделано в</p>
                      <!-- Логотип 1Т | Teamcode -->
                      <!-- <div class="footer__logo-teamcode"> -->
                        <a class="footer__logo-teamcode-link" href="https://club.1t.ru/work" target="_blank">
                            <img src="../../../app/assets/logo/logo-1t-club-white.svg" width="80" height="24" alt="Логотип команда 1Т Клуб">
                            <span>Teamcode</span>
                        </a>
                      <!-- </div> -->
                    </div>
                </div>
            </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">

body div[id="app"] {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
  padding: 48px 0 32px;
  color: #ffffff;
  background-color: #1c5c94;
}

.footer__top-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 88px;
  margin-bottom: 40px;
}

.footer a {
  color: #ffffff;
}

.footer__logo-rso {
  margin-bottom: 32px;
}

.footer__social-list {
  display: flex;
}

.footer__social-item {
  margin-right: 12px;
}

.footer__bottom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__developed {
  display: flex;

  p {
    margin-right: 16px;
    color: #90959d;
  }
}

.footer__logo-teamcode-link {
  text-transform: uppercase;
  display: flex;
  align-items: center;
  position: relative;

  img {
    margin-right: 24px;
  }

  &::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 16px;
    top: calc(50% - 8px);
    left: 92px;
    border-radius: 0.5px;
    background-color: #ffffff;
  }
}

</style>