import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () =>
                    import('@pages/HomePage/components/HomePage.vue'),
            },
            {
                path: '/Login',
                name: 'Login',
                component: () =>
                    import('@pages/LoginPage/components/LoginPage.vue'),
            },
            {
                path: '/Register',
                name: 'Register',
                component: () =>
                    import('@pages/RegisterPage/components/RegisterPage.vue'),
            },
            {
                path: '/terms_of_use',
                name: 'terms_of_use',
                component: () =>
                    import('@pages/terms_of_use/components/termsPage.vue'),
            },
            {
                path: '/privacy_policy',
                name: 'privacy_policy',
                component: () =>
                    import('@pages/privacy_policy/components/PolicyPage.vue'),
            },
            {
                path: ':catchAll(.*)*',
                name: '404',
                component: () =>
                    import('@pages/404Page/components/404Page.vue'),
            },
            {
                path: '/lso',
                name: 'lso',
                component: () => import('@pages/lsoPage/lsoPage.vue'),
            },
        ],
    },
];

export default routes;
