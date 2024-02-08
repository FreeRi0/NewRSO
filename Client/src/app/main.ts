import { createApp } from 'vue';
import './css/app.scss';
import App from './App.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import PrimeVue from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import { createPinia } from 'pinia';
import { MaskInput } from 'vue-3-mask';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as icons from 'vuetify/iconsets/mdi';

import router from './router';

const vuetify = createVuetify({
    components,
    directives,
    icons,
});

createApp(App)
    .use(vuetify)
    .use(createPinia())
    .use(VueSweetalert2)
    .use(MaskInput)
    .use(PrimeVue, {
        locale: {
            emptyFilterMessage: 'Ничего не найдено',
        },
    })
    .use(router)
    .component('FileUpload', FileUpload)
    .component('MaskInput', MaskInput)
    .mount('#app');
