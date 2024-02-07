import RegistrationForm from './Registration.vue';
import { createApp } from 'vue';
import { VueMaskDirective } from 'v-mask';

const app = createApp(RegistrationForm);
app.config.productionTip = false;
app.directive('mask', VueMaskDirective);

export { RegistrationForm };
