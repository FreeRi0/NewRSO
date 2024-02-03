import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        meta: {
            //
            redirectTo: 'Login',
        },
        children: [
            {
                path: '',
                name: 'Login',
                meta: {
                    hiddenBreadcrumbs: true,
                },
                component: () =>
                    import('@pages/LoginPage/components/LoginPage.vue'),
            },
            {
                path: '/Register',
                name: 'Register',
                meta: {
                    hiddenBreadcrumbs: true,
                },
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
            //----------------------Начало Структуры - ЛСО/Штабы/Создание/Редактирование---------------------------------------------------------
            {
                path: '/',
                meta: {
                    label: 'Структура',
                },
                children: [
                    // ЛСО
                    {
                        path: '/AllSquads',
                        meta: {
                            requiresAuth: true,
                            redirectTo: 'allsquads',
                            label: 'ЛСО',
                        },
                        children: [
                            {
                                path: '',
                                name: 'allsquads',
                                component: () =>
                                    import(
                                        '@pages/AllSquadsPage/components/AllSquadsPage.vue'
                                    ),
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

                            {
                                path: ':id',
                                meta: {
                                    label: 'squad.name',
                                    redirectTo: 'lso',
                                    isObject: true,
                                },
                                children: [
                                    {
                                        path: '',
                                        name: 'lso',
                                        component: () =>
                                            import(
                                                '@pages/lsoPage/lsoPage.vue'
                                            ),
                                    },
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
                                    {
                                        path: 'AllParticipants/:id',
                                        name: 'allparticipants',
                                        component: () =>
                                            import(
                                                '@pages/ParticipantsAllPage.vue/components/ParticipantsAll.vue'
                                            ),
                                        meta: {
                                            label: 'Участники отряда',
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
                            // {
                            //     path: 'AllParticipants/:id',
                            //     name: 'allparticipants',
                            //     component: () =>
                            //         import(
                            //             '@pages/ParticipantsAllPage.vue/components/ParticipantsAll.vue'
                            //         ),
                            //     meta: {
                            //         label: 'Участники отряда',
                            //     },
                            // },
                        ],
                    },
                    // Штабы СО ОО
                    {
                        path: '/AllHeadquarters',
                        meta: {
                            requiresAuth: true,
                            redirectTo: 'AllHeadquarters',
                            label: 'Штабы СО ОО',
                        },
                        children: [
                            {
                                path: '',
                                name: 'AllHeadquarters',
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
                                    label: 'headquarter.name',
                                    redirectTo: 'HQ',
                                    isObject: true,
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
                            redirectTo: 'LocalHeadquarters',
                            label: 'Местные штабы',
                        },
                        children: [
                            {
                                path: '',
                                name: 'LocalHeadquarters',
                                component: () =>
                                    import(
                                        '@pages/AllHeadquartersPage/components/LocalHeadquartersPage.vue'
                                    ),
                            },
                            {
                                path: ':id',
                                meta: {
                                    label: 'localHeadquarter.name',
                                    redirectTo: 'LocalHQ',
                                    isObject: true,
                                },
                                children: [
                                    {
                                        path: '',
                                        name: 'LocalHQ',
                                        component: () =>
                                            import(
                                                '@pages/LocalHQPage/LocalHQPage.vue'
                                            ),
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
                            redirectTo: 'regionalHeadquarters',
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
                                    label: 'regionalHeadquarter.name',
                                    redirectTo: 'RegionalHQ',
                                    isObject: true,
                                },
                                children: [
                                    {
                                        path: '',
                                        name: 'RegionalHQ',
                                        component: () =>
                                            import(
                                                '@pages/RegionalHQPage/RegionalHQPage.vue'
                                            ),
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
                            redirectTo: 'districtHeadquarters',
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
                                    label: 'districtHeadquarter.name',
                                    redirectTo: 'DistrictHQ',
                                    isObject: true,
                                },
                                children: [
                                    {
                                        path: '',
                                        name: 'DistrictHQ',
                                        component: () =>
                                            import(
                                                '@pages/DistrictHQPage/DistrictHQPage.vue'
                                            ),
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
                            label: 'centralHeadquarter.name',
                            redirectTo: 'CentralHQ',
                            isObject: true,
                        },
                        children: [
                            {
                                path: '',
                                name: 'CentralHQ',
                                component: () =>
                                    import(
                                        '@pages/CentralHQPage/CentralHQPage.vue'
                                    ),
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
                ],
            },
            //----------------------Конец Структуры - ЛСО/Штабы/Создание/Редактирование---------------------------------------------------------96cb9a («.»)
            
            //Мероприятия
            {
                path: '/actionSquads',
                name: 'actionSquads',
                component: () => import('@pages/actionSquadsPade/components/actionSquadsPage.vue')
                //component: () => import('@entities/Actions/components/SeeYouLater.vue')
            },
            {
                path: '/actionSquads/:id',
                name: 'Action',
                component: () => import('@pages/Event/components/Event.vue'),
            },
            {
                path: "/createAction",
                name: "createAction",
                component: () => import("@pages/CreationActionsPage/components/CreationActionsPage.vue")
            },

            {
                path: "/actionSquads/:id/EditAction",
                name: "editAction",
                component: () => import("@pages/EditActionPage/components/EditActionPage.vue"),
            }, 
            {
                path: '/AllParticipants/:id',
                name: 'allParticipants',
                component: () =>
                    import(
                        '@pages/ParticipantsAllPage.vue/components/ParticipantsAll.vue'
                    ),
                meta: {
                    label: 'Участники мероприятия',
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
            //Реестр участников
            {
                path: '/roster',
                name: 'Roster',
                component: () => import('@pages/reestrPage/components/rosterPage.vue'),
            },

            {
                path: '/Competition',
                meta: {
                    redirectTo: 'Competition',
                    label: 'Конкурс',
                },
                children: [
                    {
                        path: '',
                        name: 'Competition',
                        component: () =>
                            import(
                                '@pages/BestSquadCompetition/components/BestSquadCompetition.vue'
                            ),
                    },
                    {
                        path: '/CompetitionParticipants',
                        name: 'CompetitionParticipants',
                        component: () =>
                            import(
                                '@pages/CompetitionParticipantsPage/components/CompetitionParticipants.vue'
                            ),
                        meta: {
                            requiresAuth: true,
                            label: 'Участники конкурса',
                        },
                    },
                ],
            },
            // {
            //     path: '/CompetitionParticipants',
            //     name: 'CompetitionParticipants',
            //     component: () =>
            //         import(
            //             '@pages/CompetitionParticipantsPage/components/CompetitionParticipants.vue'
            //         ),
            //     meta: {
            //         requiresAuth: true,
            //     },
            // },
        ],
    },
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        meta: {
            label: 'Личный кабинет',
        },
        children: [
            {
                path: ':id',
                meta: {
                    redirectTo: 'userpage',
                    label: 'Страница пользователя',
                },
                children: [
                    {
                        path: '',
                        name: 'userpage',
                        component: () =>
                            import('@pages/UserPage/components/UserPage.vue'),
                    },
                ],
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
                path: '/references',
                meta: {
                    label: 'Оформление справок',
                    redirectTo: 'references',
                },
                children: [
                    {
                        path: '',
                        name: 'references',
                        component: () =>
                            import(
                                '@pages/ReferencePage/components/references.vue'
                            ),
                    },
                    {
                        path: 'reference',
                        name: 'reference',
                        component: () =>
                            import(
                                '@pages/ReferencePage/components/reference.vue'
                            ),
                        meta: {
                            label: 'Справка о членстве в РСО(для работодателя)',
                        },
                    },
                    {
                        path: 'referenceForYou',
                        name: 'referenceForYou',
                        component: () =>
                            import(
                                '@pages/ReferencePage/components/referenceForYou.vue'
                            ),
                        meta: {
                            label: 'Справка о членстве в РСО(для личного пользования)',
                        },
                    },
                ],
            },
        ],
    },
];

export default routes;