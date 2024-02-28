import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// let user = JSON.parse(localStorage.getItem('user'));
// let user: any = JSON.parse(localStorage.getItem('user') as string);
console.log('params', router);
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
        to.name === 'active' &&
        localStorage.getItem('user') !== to.params.id
    )
        console.log();
  
    else next();
});

export default router;
