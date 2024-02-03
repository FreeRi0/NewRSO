import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    if (
        to.name !== 'Login' &&
        to.name !== 'Register' &&
        to.name !== 'RecoveryPassword' &&
        to.name !== 'CreaturePassword' &&
        to.name !== 'Competition' &&
        to.name !== 'faq' &&
        // to.name !== 'redoc' &&
        // to.name !== 'swagger' &&
        !localStorage.getItem('Token')
    )
        next({ name: 'Login' });
    else next();
});

export default router;
