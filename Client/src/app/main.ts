import { createApp } from 'vue';
import './css/app.scss';
import App from './App.vue';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as icons from 'vuetify/iconsets/mdi';

import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';

const vuetify = createVuetify({
    components,
    directives,
    icons,
});

createApp(App)
    .use(vuetify)
    .use(router)
    .use(store)
    .use(PrimeVue, {
        locale: {
            emptyFilterMessage: 'Ничего не найдено',
        },
    })
    .mount('#app');
