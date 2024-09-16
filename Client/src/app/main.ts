import { createApp } from 'vue';
import './css/app.scss';
import App from './App.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import PrimeVue from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import { createPinia } from 'pinia';
import { MaskInput } from 'vue-3-mask';
import DatePicker from 'vue-datepicker-next'; // npm install vue-datepicker-next --save
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/ru.es';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as icons from 'vuetify/iconsets/mdi';
import router from './router';
import { HTTP } from '@app/http';

const vuetify = createVuetify({
    components,
    directives,
    icons,
});


const app = createApp(App)

app.use(vuetify)
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
    .component('DatePicker', DatePicker)
    .mount('#app');


app.config.errorHandler = (err: any, _instance, info) => {
    if (localStorage.getItem('jwt_token')) {
        HTTP.post('/services/front_errors/', {
            url: window.location.href,
            error_code: 0,
            error_description: 'Where: ' + JSON.stringify(info) + '. Error: ' + err.toString(),
            method: 'Vue Error',
        }).then().catch()
    }
    console.error('ERROR ERROR', err);
}