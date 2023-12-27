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
            // {
            //     path: '/lso/:id',
            //     name: 'lso',
            //     component: () => import('@pages/lsoPage/lsoPage.vue'),
            //     meta: {
            //         requiresAuth: true
            //     }
            // },
            {
                path: '/lso',
                meta: {
                    requiresAuth: true,
                },

                children: [
                    {
                        path: ':id/:name',
                        meta: {
                            label: 'title',
                        },
                        children: [
                            {
                                path: '',
                                name: 'lso',
                                component: () =>
                                    import('@pages/lsoPage/lsoPage.vue'),
                            },
                            {
                                path: 'EditLSO',
                                name: 'EditLSO',
                                component: () =>
                                    import(
                                        '@pages/EditingDetachment/components/EditingDetachment.vue'
                                    ),
                            },
                        ],
                    },
                ],
            },
            // {
            //     path: '/HQ',
            //     name: 'HQ',
            //     component: () => import('@pages/HQPage/HQPage.vue'),
            //     meta: {
            //         requiresAuth: true
            //     }
            // },
            {
                path: '/HQ',
                meta: {
                    requiresAuth: true,
                },
                children: [
                    {
                        path: ':id/:name',
                        meta: {
                            label: 'title',
                        },
                        children: [
                            {
                                path: '',
                                name: 'HQ',
                                component: () =>
                                    import('@pages/HQPage/HQPage.vue'),
                            },
                            {
                                path: 'EditHQ',
                                name: 'EditHQ',
                                component: () =>
                                    import(
                                        '@pages/EditingHQ/components/EditingHQ.vue'
                                    ),
                            },
                        ],
                    },
                ],
            },
            {
                path: '/DistrictHQ',
                name: 'DistrictHQ',
                component: () =>
                    import('@pages/DistrictHQPage/DistrictHQPage.vue'),
            },
            {
                path: '/CentralHQ',
                name: 'CentralHQ',
                component: () =>
                    import('@pages/CentralHQPage/CentralHQPage.vue'),
            },
            {
                path: '/RegionalHQ',
                name: 'RegionalHQ',
                component: () =>
                    import('@pages/RegionalHQPage/RegionalHQPage.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/LocalHQ',
                name: 'LocalHQ',
                component: () => import('@pages/LocalHQPage/LocalHQPage.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/UserPage',
                name: 'userpaage',
                component: () =>
                    import('@pages/UserPage/components/UserPage.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/UserPage/:id',
                name: 'userpage',
                component: () =>
                    import('@pages/UserPage/components/UserPage.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/CreateLSO',
                name: 'CreateLSO',
                component: () =>
                    import(
                        '@pages/CreationOfDetachment/components/CreationOfDetachment.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },

            {
                path: '/AllSquads',
                name: 'allsquads',
                component: () =>
                    import('@pages/AllSquadsPage/components/AllSquadsPage.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            // {
            //     // path: '/lso/:id/EditLSO',
            //     path: '/:id',
            //     name: 'EditLSO',
            //     component: () =>
            //         import(
            //             '@pages/EditingDetachment/components/EditingDetachment.vue'
            //         ),
            //         meta: {
            //             requiresAuth: true
            //         }
            // },
            {
                path: '/AllHeadquarters',
                name: 'allheadquarters',
                component: () =>
                    import(
                        '@pages/AllHeadquartersPage/components/AllHeadquartersPage.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/LocalHeadquarters',
                name: 'localHeadquarters',
                component: () =>
                    import(
                        '@pages/AllHeadquartersPage/components/LocalHeadquartersPage.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/RegionalHeadquarters',
                name: 'regionalHeadquarters',
                component: () =>
                    import(
                        '@pages/AllHeadquartersPage/components/RegionalHeadquarters.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/DistrictHeadquarters',
                name: 'districtHeadquarters',
                component: () =>
                    import(
                        '@pages/AllHeadquartersPage/components/DistrictsHeadquartersPage.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/AllParticipants/:id',
                name: 'allparticipants',
                component: () =>
                    import(
                        '@pages/ParticipantsAllPage.vue/components/ParticipantsAll.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/PersonalData',
                name: 'personaldata',
                component: () =>
                    import(
                        '@pages/PersonalDataPage/components/PersonalData.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/PersonalData/:id',
                name: 'PersonalData',
                component: () =>
                    import(
                        '@pages/PersonalDataPage/components/PersonalData.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/createhq',
                name: 'createhq',
                component: () =>
                    import('@pages/CreationOfHQ/components/CreationOfHQ.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            // {
            //     path: '/edithq/:id',
            //     name: 'edithq',
            //     component: () =>
            //         import('@pages/EditingHQ/components/EditingHQ.vue'),
            //         meta: {
            //             requiresAuth: true
            //         }
            // },
            {
                path: '/reference',
                name: 'reference',
                component: () =>
                    import('@pages/ReferencePage/components/reference.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/referenceForYou',
                name: 'referenceForYou',
                component: () =>
                    import(
                        '@pages/ReferencePage/components/referenceForYou.vue'
                    ),
                meta: {
                    requiresAuth: true,
                },
            },

            {
                path: '/references',
                name: 'references',
                component: () =>
                    import('@pages/ReferencePage/components/references.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/contributorPay',
                name: 'contributorPay',
                component: () =>
                    import(
                        '@pages/ContributionPage/components/ContributorPay.vue'
                    ),
            },
            {
                path: '/CreationOfRS',
                name: 'CreationOfRS',
                component: () =>
                    import('@pages/CreationOfRS/components/CreationOfRS.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/FAQ',
                name: 'faq',
                component: () =>
                    import('@pages/HelpInfoData/components/helpInfoData.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
        ],
    },
];

export default routes;
