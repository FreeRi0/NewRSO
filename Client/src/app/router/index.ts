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
        !localStorage.getItem('Token')
    )
        next({ name: 'Login' });
    // else if (to.name == 'Login' && localStorage.getItem('Token'))
    //     next({ name: 'mypage' });
    else next();
});

export default router;
