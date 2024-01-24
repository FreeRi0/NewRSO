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
        to.name !== 'RecoveryPassword' &&
        to.name !== 'Competition' &&
        !localStorage.getItem('Token')
    )
        next({ name: 'Login' });
    else next();
});

export default router;
