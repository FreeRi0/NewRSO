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
                path: '/RecoveryPass',
                name: 'RecoveryPassword',
                component: () =>
                    import(
                        '@pages/RecoveryPassword/components/RecoveryPasswordPage.vue'
                    ),
            },
            {
                path: '/CreaturePass',
                name: 'CreaturePassword',
                component: () =>
                    import(
                        '@pages/СreaturePassword/components/CreaturePasswordPage.vue'
                    ),
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
                path: '/lso/:id',
                name: 'lso',
                component: () => import('@pages/lsoPage/lsoPage.vue'),
            },
            {
                path: '/HQ',
                name: 'HQ',
                component: () => import('@pages/HQPage/HQPage.vue'),
            },
            {
                path: '/RegionalHQ',
                name: 'RegionalHQ',
                component: () =>
                    import('@pages/RegionalHQPage/RegionalHQPage.vue'),
            },
            {
                path: '/UserPage',
                name: 'userpagemY',
                component: () =>
                    import('@pages/UserPage/components/UserPage.vue'),
                    meta: {
                        requiresAuth: true
                    }
            },
            {
                path: '/UserPage/:id',
                name: 'userpage',
                component: () =>
                    import('@pages/UserPage/components/UserPage.vue'),
                    meta: {
                        requiresAuth: true
                    }
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
            {
                path: '/actionSquads',
                name: 'actionSquads',
                component: () => import('@pages/actionSquadsPade/components/actionSquadsPage.vue')
            },
            {
                path: "/createAction",
                name: "createAction",
                component: () => import("@pages/CreationActionsPage/components/CreationActionsPage.vue")
            },
            {
                path: '/EditLSO',
                name: 'EditLSO',
                component: () =>
                    import(
                        '@pages/EditingDetachment/components/EditingDetachment.vue'
                    ),
            },
            {
                path: '/AllHeadquarters',
                name: 'allheadquarters',
                component: () =>
                    import(
                        '@pages/AllHeadquartersPage/components/AllHeadquartersPage.vue'
                    ),
            },
            {
                path: '/AllParticipants/:id',
                name: 'allparticipants',
                component: () =>
                    import(
                        '@pages/ParticipantsAllPage.vue/components/ParticipantsAll.vue'
                    ),
            },
            {
                path: '/PersonalData',
                name: 'personaldata',
                component: () =>
                    import(
                        '@pages/PersonalDataPage/components/PersonalData.vue'
                    ),
            },
            {
                path: '/createhq',
                name: 'createhq',
                component: () =>
                    import('@pages/CreationOfHQ/components/CreationOfHQ.vue'),
            },
            {
                path: '/edithq',
                name: 'edithq',
                component: () =>
                    import('@pages/EditingHQ/components/EditingHQ.vue'),
            },
            {
                path: '/reference',
                name: 'reference',
                component: () =>
                    import('@pages/ReferencePage/components/reference.vue'),
            },
            {
                path: '/referenceForYou',
                name: 'referenceForYou',
                component: () =>
                    import('@pages/ReferencePage/components/referenceForYou.vue'),
            },

            {
                path: '/references',
                name: 'references',
                component: () =>
                    import('@pages/ReferencePage/components/references.vue'),
            },
            {
                path: '/contributorPay',
                name: 'contributorPay',
                component: () =>
                    import('@pages/ContributionPage/components/ContributorPay.vue'),
            },

        ],
    },
];

export default routes;
