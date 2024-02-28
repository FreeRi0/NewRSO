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
    // else if (localStorage.getItem('Token'))
    //        next({ name: 'mypage' });
    else if (
        to.name === 'PersonalDataUser' &&
        localStorage.getItem('user') !== to.params.id
    ) {
        next({ name: 'userpage', params:{id: to.params.id} });

    }else next();
});

export default router;
