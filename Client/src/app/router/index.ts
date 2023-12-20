import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((from, to, next) => {
//     if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//     else next()
// });

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Register'  && to.name !== 'RecoveryPassword' && !localStorage.getItem('Token')) {
      next({ name: 'Login' })
    } else next()
  })

export default router;
