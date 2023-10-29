import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        children: [
            {
                path: '',
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
                path: 'UserPage',
                name: 'userpage',
                component: () =>
                    import('@pages/UserPage/components/UserPage.vue'),
            },
            {
                path: '/CreateLSO',
                name: 'CreateLSO',
                component: () =>
                    import(
                        '@pages/CreationOfDetachment/components/CreationOfDetachment.vue'
                    ),
            },
            {
                path: '/AllSquads',
                name: 'allsquads',
                component: () =>
                    import('@pages/AllSquadsPage/components/AllSquadsPage.vue'),
            },
        ],
    },
];

export default routes;
