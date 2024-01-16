
import { type RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        meta: {
            label: 'Структура',
        },
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
            //----------------------Начало----------------Штабы/Создание/Редактирование---------------------------------------------------------
            // Штабы ЛСО
            {
                path: '/AllSquads',
                name: 'allsquads',
                component: () =>
                    import('@pages/AllSquadsPage/components/AllSquadsPage.vue'),
                meta: {
                    requiresAuth: true,
                    label: 'ЛСО',
                },
            },
            {
                path: '/AllSquads',
                meta: {
                    requiresAuth: true,
                    label: 'ЛСО',
                },
                children: [
                    {
                        path: ':id',
                        meta: {
                            label: 'Отряд',
                        },
                        name: 'lso',
                        component: () => import('@pages/lsoPage/lsoPage.vue'),
                    },
                    {
                        path: ':id',
                        meta: {
                            label: 'Отряд',
                        },
                        children: [
                            {
                                path: 'EditLSO',
                                name: 'EditLSO',
                                component: () =>
                                    import(
                                        '@pages/EditingDetachment/components/EditingDetachment.vue'
                                    ),
                                meta: {
                                    label: 'Редактирование',
                                },
                            },
                        ],
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
                            label: 'Создание ЛСО',
                        },
                    },
                ],
            },
            // Штабы СО ОО
            {
                path: '/AllHeadquarters',
                meta: {
                    requiresAuth: true,
                    label: 'Штабы СО ОО',
                },
                children: [
                    {
                        path: '',
                        name: 'allheadquarters',
                        component: () =>
                            import(
                                '@pages/AllHeadquartersPage/components/AllHeadquartersPage.vue'
                            ),
                    },
                    {
                        path: '/createhq',
                        name: 'createhq',
                        component: () =>
                            import(
                                '@pages/CreationOfHQ/components/CreationOfHQ.vue'
                            ),
                        meta: {
                            requiresAuth: true,
                            label: 'Создание штаба СО ОО',
                        },
                    },
                    {
                        path: ':id',
                        meta: {
                            // здесь нужна будет передача через объект
                            label: '{Name}',
                            // namedRoute: 'HQ',
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
                                meta: {
                                    label: 'Редактирование',
                                },
                            },
                        ],
                    },
                ],
            },
            // Местные штабы
            {
                path: '/LocalHeadquarters',
                meta: {
                    requiresAuth: true,
                    label: 'Местные штабы',
                },
                children: [
                    {
                        path: '',
                        name: 'localHeadquarters',
                        component: () =>
                            import(
                                '@pages/AllHeadquartersPage/components/LocalHeadquartersPage.vue'
                            ),
                    },
                    {
                        path: ':id',
                        meta: {
                            // здесь нужна будет передача через объект
                            label: '{Name}',
                            // namedRoute: 'HQ',
                        },
                        children: [
                            {
                                path: '',
                                name: 'LocalHQ',
                                component: () =>
                                    import('@pages/LocalHQPage/LocalHQPage.vue'),
                            },
                            {
                                path: 'EditingOfLocal',
                                name: 'FormLocal',
                                component: () =>
                                    import(
                                        '@pages/EditingOfLocal/components/EditingOfLocal.vue'
                                    ),
                                meta: {
                                    label: 'Редактирование',
                                },
                            },
                        ],
                    },
                ],
            },
            // Региональные штабы
            {
                path: '/RegionalHeadquarters',
                meta: {
                    requiresAuth: true,
                    label: 'Региональные штабы',
                },
                children: [
                    {
                        path: '',
                        name: 'regionalHeadquarters',
                        component: () =>
                            import(
                                '@pages/AllHeadquartersPage/components/RegionalHeadquarters.vue'
                            ),
                    },
                    {
                        path: '/CreationOfRS',
                        name: 'CreationOfRS',
                        component: () =>
                            import(
                                '@pages/CreationOfRS/components/CreationOfRS.vue'
                            ),
                        meta: {
                            requiresAuth: true,
                            label: 'Создание регионального штаба',
                        },
                    },
                    {
                        path: ':id',
                        meta: {
                            // здесь нужна будет передача через объект
                            label: '{Name}',
                            // namedRoute: 'HQ',
                        },
                        children: [
                            {
                                path: '',
                                name: 'RegionalHQ',
                                component: () =>
                                    import('@pages/RegionalHQPage/RegionalHQPage.vue'),
                            },
                            {
                                path: 'EditingOfRS',
                                name: 'EditingOfRS',
                                component: () =>
                                    import(
                                        '@pages/EditingOfRS/components/EditingOfRS.vue'
                                    ),
                                meta: {
                                    label: 'Редактирование',
                                },
                            },
                        ],
                    },
                ],
            },
            // Окружные штабы
            {
                path: '/DistrictHeadquarters',
                meta: {
                    requiresAuth: true,
                    label: 'Окружные штабы',
                },
                children: [
                    {
                        path: '',
                        name: 'districtHeadquarters',
                        component: () =>
                            import(
                                '@pages/AllHeadquartersPage/components/DistrictsHeadquartersPage.vue'
                            ),
                    },
                    {
                        path: ':id',
                        meta: {
                            // здесь нужна будет передача через объект
                            label: '{Name}',
                            // namedRoute: 'HQ',
                        },
                        children: [
                            {
                                path: '',
                                name: 'DistrictHQ',
                                component: () =>
                                    import('@pages/DistrictHQPage/DistrictHQPage.vue'),
                            },
                            {
                                path: 'EditingOfDH',
                                name: 'FormDH',
                                component: () =>
                                    import(
                                        '@pages/EditingOfDH/components/EditingOfDH.vue'
                                    ),
                                meta: {
                                    label: 'Редактирование',
                                },
                            },
                        ],
                    },
                ],
            },
            // Центральный штаб
            {
                path: '/CentralHQ/:id',
                meta: {
                    label: 'Центральный штаб',
                },
                children: [
                    {
                        path: '',
                        name: 'CentralHQ',
                        component: () =>
                            import('@pages/CentralHQPage/CentralHQPage.vue'),
                    },
                    {
                        path: 'EditingOfCentral',
                        name: 'FormCentral',
                        component: () =>
                            import(
                                '@pages/EditingOfCentral/components/EditingOfCentral.vue'
                            ),
                        meta: {
                            label: 'Редактирование',
                        },
                    },
                ],
            },

            //----------------------Конец----------------Штабы/Создание/Редактирование---------------------------------------------------------
            // {
            //     path: '/UserPage',
            //     name: 'userpaage',
            //     component: () =>
            //         import('@pages/UserPage/components/UserPage.vue'),
            //     meta: {
            //         label: 'Моя страница',
            //     },
            // },
            {
                path: '/UserPage/:id',
                name: 'userpage',
                component: () =>
                    import('@pages/UserPage/components/UserPage.vue'),
                meta: {
                    label: 'Страница пользователя',
                },
            },
            {
                path: '/actionSquads',
                name: 'actionSquads',

                component: () =>
                    import(
                        '@pages/actionSquadsPade/components/actionSquadsPage.vue'
                    ),
            },
            {
                path: '/actionSquads/:id',
                name: 'Action',
                component: () =>
                    import('@pages/ActionPage/components/ActionPage.vue'),
            },
            {
                path: '/createAction',
                name: 'createAction',
                component: () =>
                    import(
                        '@pages/CreationActionsPage/components/CreationActionsPage.vue'
                    ),
            },
            {
                path: '/EditAction',
                name: 'editAction',
                component: () =>
                    import(
                        '@pages/EditActionPage/components/EditActionPage.vue'
                    ),
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
                    label: 'Участнки отряда',
                },
            },
            {
                path: '/AllParticipants/:id',
                name: 'allEventMembers',
                component: () =>
                    import(
                        '@pages/ParticipantsAllPage.vue/components/ParticipantsAll.vue'
                    ),
                meta: {
                    requiresAuth: true,
                    label: 'Участники мероприятия',
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
                    label: 'Персональные данные',
                },
            },
            // {
            //     path: '/PersonalData/:id',
            //     name: 'PersonalData',
            //     component: () =>
            //         import(
            //             '@pages/PersonalDataPage/components/PersonalData.vue'
            //         ),
            //     meta: {
            //         requiresAuth: true,
            //     },
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
                meta: {
                    label: 'Членский взнос',
                },
            },
            {
                path: '/activeInvents/accountVerification',
                name: 'accountVerification',
                component: () =>
                    import(
                        '@entities/Invents/components/AccountVerification.vue'
                    ),
            },
            {
                path: '/activeInvents/inventActions',
                name: 'inventActions',
                component: () =>
                    import('@entities/Invents/components/InventActions.vue'),
            },
            {
                path: '/activeInvents/inventSquads',
                name: 'inventSquads',
                component: () =>
                    import('@entities/Invents/components/InventSquads.vue'),
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
            // ИНДИВИДУАЛЬНОЕ МЕРОПРИЯТИЕ
            {
                path: '/Event',
                name: 'event',
                component: () => import('@pages/Event/components/Event.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/active',
                name: 'active',
                component: () =>
                    import(
                        '@pages/ActiveApplicationsData/components/ActiveApplicationsData.vue'
                    ),
                meta: {
                    label: 'Активные заявки',
                },
            },
        ],
    },
];

export default routes;
