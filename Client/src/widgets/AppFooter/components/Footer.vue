<template>
  <div class="footer">
    <div class="container">
      <div class="footer__top-container">
        <div class="footer__logo-wrapper">
          <div class="footer__logo-rso">
            <img
              src="@app/assets/logo/new-logo-rso-white.svg"
              width="129"
              height="58"
              alt="Логотип сайта РСО"
            />
          </div>

          <ul class="footer__social-list">
            <li class="footer__social-item">
              <a href="https://vk.com/rso_official" target="_blank">
                <img
                  src="@app/assets/logo/vk-white.svg"
                  width="28"
                  height="28"
                  alt="Логотип группы Вконтакте"
                />
              </a>
            </li>

            <li class="footer__social-item">
              <a href="https://t.me/rso_official" target="_blank">
                <img
                  src="@app/assets/logo/telegram-white.svg"
                  width="28"
                  height="28"
                  alt="Логотип канала в Телеграмм"
                />
              </a>
            </li>
          </ul>
        </div>

        <p class="footer__contacts-address footer__text-color">
          105005, г. Москва, Лефортовский переулок, 8, строение&nbsp;1
        </p>

        <ul class="footer__contacts">
          <li class="footer__contacts-telephone">
            <a href="tel:+74992613345">8&nbsp;499&nbsp;261 33 45</a>
          </li>
          <li class="footer__contacts-telephone">
            <p class="footer__text-p footer__text-color">Горячая линия РСО:</p>
            <a href="tel:+78007700117">8&nbsp;800&nbsp;770 0&nbsp;117</a>
          </li>
          <li class="footer__contacts-email">
            <a href="mailto:r.s.o@mail.ru">r.s.o@mail.ru</a>
          </li>
        </ul>

        <ul class="footer__privacy-policy-list">
          <li class="footer__privacy-policy-item">
            <router-link to="/privacy-policy">Политика конфиденциальности</router-link>
          </li>
          <li class="footer__user-agreement">
            <router-link to="/terms-of-use">Пользовательское соглашение</router-link>
          </li>
        </ul>
      </div>

      <div class="footer__bottom-container">
        <div class="footer__all-rights-reserved">
          <p class="footer__text-color">
            &copy; 1959-2026 РОССИЙСКИЕ СТУДЕНЧЕСКИЕ ОТРЯДЫ.
          </p>
          <p class="footer__text-color">Все права защищены.</p>
        </div>

        <div class="footer__developed">
          <p class="footer__text-color">Сделано в</p>
          <a
            class="footer__logo-teamcode-link"
            href="https://club.1t.ru/work"
            target="_blank"
          >
            <img src="@app/assets/logo/logo.svg" width="29" height="24" alt="Логотип" />
            <div class="footer__logo-image">
              <img
                src="@app/assets/logo/logo-soyus-rf.svg"
                width="70"
                height="11"
                alt="Логотип Союз РФ"
              />
              <img
                src="@app/assets/logo/logo-team-code.svg"
                width="70"
                height="16"
                alt="Логотип ТИМ КОД"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  padding: 48px 0 32px;
  color: #ffffff;
  background-color: #1c5c94;

  &__top-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;

    @media (max-width: 768px) {
      margin: 0 auto 32px;
      width: fit-content;
      align-items: center;
    }
  }

  &__text-color,
  a {
    color: #ffffff;
  }

  &__logo-rso {
    margin-bottom: 32px;

    @media (max-width: 1024px) {
      width: 100px;
      height: 45px;
    }

    @media (max-width: 768px) {
      width: 129px;
      height: 58px;
      margin-bottom: 24px;
    }
  }

  &__social-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 12px;

    @media (max-width: 768px) {
      column-gap: 24px;
    }
  }

  &__social-item {
    width: fit-content;

    @media (max-width: 768px) {
      img {
        width: 32px;
        height: 32px;
      }
    }
  }

  &__contacts-address {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    max-width: 212px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__contacts {
    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 8px;
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      max-width: 156px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__privacy-policy-list {
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    max-width: 233px;

    @media (max-width: 768px) {
      margin-top: 24px;
      font-size: 14px;
    }
  }

  &__bottom-container {
    display: grid;
    grid-template-columns: 55% 45%;
    align-items: center;

    @media (max-width: 768px) {
      align-items: flex-start;
      grid-template-columns: 1fr;
      row-gap: 32px;
    }
  }

  &__contacts-email a {
    text-decoration: underline;
  }

  &__developed {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    line-height: 19px;
    font-weight: 500;

    @media (max-width: 768px) {
      grid-row: 1 / 2;
      font-size: 14px;
      max-width: 450px;
    }

    p {
      min-width: 62px;
      margin-left: auto;
      color: #90959d;

      @media (max-width: 768px) {
        margin-left: 0;
      }
    }
  }

  &__all-rights-reserved {
    line-height: 20px;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 360px) {
      font-size: 12px;
    }
  }

  &__logo-teamcode-link {
    display: flex;
    column-gap: 8px;
    align-items: center;
  }

  &__logo-image {
    display: flex;
    align-items: center;
    column-gap: 24px;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      width: 1px;
      height: 16px;
      top: calc(50% - 8px);
      left: 82px;
      border-radius: 0.5px;
      background-color: #ffffff;
    }

    img:first-child {
      margin-top: 2px;
    }
  }
}
</style>
