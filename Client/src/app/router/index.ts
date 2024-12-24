import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
});

const publicRoutes: string[] = [
  'Login',
  'Register',
  'RecoveryPassword',
  'CreaturePassword',
  'Competition',
  'faq',
  'actionSquads',
  'allsquads',
  'AllHeadquarters',
  'LocalHeadquarters',
  'regionalHeadquarters',
  'districtHeadquarters',
  'CentralHQ',
  'privacy_policy',
  'terms_of_use',
  'mypage'
];

router.beforeEach((to, _from, next) => {
  const isPublicRoute = publicRoutes.includes(to.name as string);
  const isAuthenticated = localStorage.getItem('jwt_token') !== null;

  if (!isPublicRoute && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'mypage' });
  } else {
    next();
  }
});

export default router;