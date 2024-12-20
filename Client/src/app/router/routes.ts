import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        meta: {
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
                path: '/recovery-pass',
                name: 'RecoveryPassword',
                component: () =>
                    import(
                        '@pages/RecoveryPassword/components/RecoveryPasswordPage.vue'
                    ),
            },
            {
                path: '/password/reset/confirm/:uid/:token',
                name: 'CreaturePassword',
                component: () =>
                    import(
                        '@pages/CreaturePassword/components/CreaturePasswordPage.vue'
                    ),
            },
            {
                path: '/terms-of-use',
                name: 'terms_of_use',
                component: () =>
                    import('@pages/terms_of_use/components/termsPage.vue'),
            },
            {
                path: '/privacy-policy',
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
                    {
                        path: '/all-squads',
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
                                path: '/create-lso',
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
                                        path: 'reporting',

                                        meta: {
                                            redirectTo: 'debut',
                                            label: 'Отчетность',
                                        },

                                        children: [
                                            {
                                                path: '',
                                                name: 'debut',
                                                component: () =>
                                                    import(
                                                        '@pages/DetachmentReport/components/DetachmentReport.vue'
                                                    ),
                                            },

                                            {
                                                path: 'report/:competition_pk',
                                                meta: {
                                                    label: 'Редактирование данных по показателям',
                                                },
                                                name: 'Report',
                                                component: () =>
                                                    import(
                                                        '@pages/ReportPage/components/ReportPage.vue'
                                                    ),
                                            },
                                        ],
                                    },
                                    {
                                        path: '',
                                        name: 'lso',
                                        component: () =>
                                            import(
                                                '@pages/lsoPage/lsoPage.vue'
                                            ),
                                    },
                                    {
                                        path: 'edit-lso',
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
                                        path: 'all-participants',
                                        meta: {
                                            label: 'Участники отряда',
                                        },
                                        children: [
                                            {
                                                path: '',
                                                name: 'allparticipants',
                                                component: () =>
                                                    import(
                                                        '@pages/ParticipantsAllPage.vue/components/ParticipantsAll.vue'
                                                    ),
                                            },
                                            {
                                                path: ':id',
                                                meta: {
                                                    redirectTo: 'userpage',
                                                    label: 'Страница участника',
                                                },
                                                children: [
                                                    {
                                                        path: '',
                                                        name: 'userpage',
                                                        component: () =>
                                                            import(
                                                                '@pages/UserPage/components/UserPage.vue'
                                                            ),
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    // Штабы СО ОО
                    {
                        path: '/all-headquarters',
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
                                path: '/create-hq',
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
                                        path: 'edit-hq',
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
                        path: '/local-headquarters',
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
                                path: '/create-lhq',
                                name: 'CreateLHQ',
                                component: () =>
                                    import(
                                        '@pages/CreationOfLHQ/components/CreationOfLHQ.vue'
                                    ),
                                meta: {
                                    requiresAuth: true,
                                    label: 'Создание местного штаба',
                                },
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
                                        path: 'editing-local',
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
                        path: '/regional-headquarters',
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
                                path: '/creation-rs',
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
                                        path: 'editing-rs',
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
                        path: '/district-headquarters',
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
                                        path: 'editing-dh',
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
                        path: '/central-hq/:id',
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
                                path: 'editing-central',
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
                path: '/action-squads',
                meta: {
                    redirectTo: 'actionSquads',
                    label: 'Мероприятия',
                },
                //component: () => import('@entities/Actions/components/SeeYouLater.vue')
                children: [
                    {
                        path: '',
                        name: 'actionSquads',
                        component: () =>
                            import(
                                '@pages/actionSquadsPade/components/actionSquadsPage.vue'
                            ),
                    },
                    {
                        path: ':id',
                        meta: {
                            requiresAuth: true,
                            redirectTo: 'Action',
                            label: 'event.name',
                            isObject: true,
                        },
                        children: [
                            {
                                path: '',
                                name: 'Action',
                                component: () =>
                                    import('@pages/Event/components/Event.vue'),
                            },
                            {
                                path: 'edit-action',
                                name: 'editAction',
                                component: () =>
                                    import(
                                        '@pages/EditActionPage/components/EditActionPage.vue'
                                    ),
                            },

                            {
                                path: 'action-participants',
                                meta: {
                                    label: 'Участники мероприятия',
                                },
                                children: [
                                    {
                                        path: '',
                                        name: 'actionparticipants',
                                        component: () =>
                                            import(
                                                '@pages/ParticipantsAllPage.vue/components/ParticipantsActions.vue'
                                            ),
                                    },
                                    {
                                        path: ':id',
                                        meta: {
                                            redirectTo: 'userpage',
                                            label: 'Страница участника',
                                        },
                                        children: [
                                            {
                                                path: '',
                                                name: 'userpage',
                                                component: () =>
                                                    import(
                                                        '@pages/UserPage/components/UserPage.vue'
                                                    ),
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                path: 'verification',
                                meta: {
                                    redirectTo: 'IndividualRequest',
                                    label: 'Заявка на участие',
                                },
                                children: [
                                    {
                                        path: 'individualrequest/:applicationId',
                                        name: 'IndividualRequest',
                                        component: () =>
                                            import(
                                                '@pages/IndividualRequestPage/components/IndividualRequestPage.vue'
                                            ),
                                        meta: {
                                            requiresAuth: true,
                                        },
                                    },
                                    {
                                        path: 'grouprequest/:applicationId',
                                        name: 'GroupRequest',
                                        component: () =>
                                            import(
                                                '@pages/GroupRequestPage/components/GroupRequestPage.vue'
                                            ),
                                        meta: {
                                            requiresAuth: true,
                                        },
                                    },
                                    {
                                        path: 'multistagerequest/:applicationId',
                                        name: 'MultiStageRequest',
                                        component: () =>
                                            import(
                                                '@pages/MultiStageRequestPage/components/MultiStageRequestPage.vue'
                                            ),
                                        meta: {
                                            requiresAuth: true,
                                        },
                                    },
                                ],
                            },
                            {
                                path: 'submit',
                                meta: {
                                    redirectTo: 'IndividualSubmit',
                                    label: 'Заявка на участие',
                                },
                                children: [
                                    {
                                        path: 'individualsubmit',
                                        name: 'IndividualSubmit',
                                        component: () =>
                                            import(
                                                '@pages/IndividualRequestPage/components/IndividualSubmitPage.vue'
                                            ),
                                        meta: {
                                            requiresAuth: true,
                                        },
                                    },
                                    {
                                        path: 'groupsubmit',
                                        name: 'GroupSubmit',
                                        component: () =>
                                            import(
                                                '@pages/GroupRequestPage/components/GroupSubmitPage.vue'
                                            ),
                                        meta: {
                                            requiresAuth: true,
                                        },
                                    },
                                    {
                                        path: 'multistagesubmit',
                                        name: 'MultiStageSubmit',
                                        component: () =>
                                            import(
                                                '@pages/MultiStageRequestPage/components/MultiStageSubmitPage.vue'
                                            ),
                                        meta: {
                                            requiresAuth: true,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: 'create-action',
                name: 'createAction',
                component: () =>
                    import(
                        '@pages/CreationActionsPage/components/CreationActionsPage.vue'
                    ),
            },
            {
                path: '/all-participants/:id',
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
                path: '/faq',
                name: 'faq',
                component: () =>
                    import('@pages/HelpInfoData/components/helpInfoData.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            //Реестр участников

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
                        path: '/competition-participants',
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
                    {
                        path: '/competition-winners',
                        name: 'CompetitionWinners',
                        component: () =>
                            import('@pages/CompetitionWinnersPage/components/CompetitionWinners.vue'),
                        meta: {
                            requiresAuth: true,
                            label: 'Победители конкурса',
                        },
                    },
                ],
            },

            {
                path: '/corp-univer',
                meta: {
                    redirectTo: 'CorpUniver',
                    label: 'Корпоративный университет',
                },
                children: [
                    {
                        path: '',
                        name: 'CorpUniver',
                        component: () =>
                            import(
                                '@pages/CorpUniverPage/component/CorpUniverPage.vue'
                            ),
                    },
                ],
            },
        ],
    },
    {
        path: '/',
        component: () =>
            import('@layouts/MainLayout/components/MainLayout.vue'),
        meta: {
            label: 'Личный кабинет',
            redirectTo: 'mypage',
        },
        children: [
            {
                path: '/my-page',
                meta: {
                    redirectTo: 'mypage',
                    label: 'Моя страница',
                },
                children: [
                    {
                        path: '',
                        name: 'mypage',
                        component: () =>
                            import('@pages/UserPage/components/MyUserPage.vue'),
                    },
                ],
            },
            {
                path: '/userpage/:id',
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
                path: '/personal-data',
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
                path: '/contributor-pay',
                meta: {
                    label: 'Членский взнос',
                    redirectTo: 'contributorPay',
                },
                children: [
                    {
                        path: '',
                        name: 'contributorPay',
                        meta: {},
                        component: () =>
                            import(
                                '@pages/ContributionPage/components/ContributorPay.vue'
                            ),
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                path: 'personal',
                                meta: {
                                    label: 'Персональные данные пользователя',
                                },
                                name: 'PersonalDataUserContributor',
                                component: () =>
                                    import(
                                        '@pages/PersonalDataPage/components/PersonalDataID.vue'
                                    ),
                            },
                        ],
                    },
                ],
            },

            {
                path: '/roster',
                meta: {
                    redirectTo: 'Roster',
                    label: 'Реестр участников',
                },
                children: [
                    {
                        path: '',
                        name: 'Roster',
                        component: () =>
                            import(
                                '@pages/reestrPage/components/newRosterPage.vue'
                            ),
                    },
                ],
            },

            {
                path: '/corp-univer',
                meta: {
                    redirectTo: 'CorpUniver',
                    label: 'Корпоративный университет',
                },
                children: [
                    {
                        path: '',
                        name: 'CorpUniver',
                        component: () =>
                            import(
                                '@pages/CorpUniverPage/component/CorpUniverPage.vue'
                            ),
                    },
                ],
            },
            {
                path: '/safety',
                meta: {
                    redirectTo: 'Safety',
                    label: 'Охрана труда и техника безопасности',
                },
                children: [
                    {
                        path: '',
                        name: 'Safety',
                        component: () =>
                            import(
                                '@pages/SafetyPage/components/SafetyPage.vue'
                            ),
                    },
                    {
                        path: 'test',
                        meta: {
                            redirectTo: 'testPage',
                            label: 'Тестирование по охране труда',
                        },
                        children: [
                            {
                                name: 'testPage',
                                path: ':name',
                                component: () =>
                                    import(
                                        '@pages/TestingPages/components/TestingPages.vue'
                                    ),
                            },
                        ],
                    },
                ],
            },
            {
                path: '/reporting-ro',
                meta: {
                    label: 'Рейтинг РО',
                    redirectTo: 'reportingRo',
                },
                children: [
                    {
                        name: 'reportingRo',
                        path: 'reporting',
                        component: () =>
                            import(
                                '@pages/RatingRoReporting/components/RatingRoReporting.vue'
                            ),
                        meta: {
                            label: 'Отчетность',
                            redirectTo: 'reportingRo',
                        },

                    },
                    {
                        path: 'report-regional-one',
                        name: 'ReportRegionalPartOne',
                        component: () =>
                            import(
                                '@pages/ReportRegionalHQPartOnePage/ReportRegionalHQPartOne.vue'
                            ),
                        meta: {
                            label: 'Отчет о деятельности регионального отделения РСО за 2024 год. Часть 1',
                            redirectTo: 'rating-ro-reporting',
                        },
                    },
                    {
                        path: 'report-regional-two',
                        name: 'ReportRegionalPartTwo',
                        component: () =>
                            import(
                                '@pages/ReportRegionalHQPartTwoPage/ReportRegionalHQPartTwo.vue'
                            ),
                        meta: {
                            label: 'Отчет о деятельности регионального отделения РСО за 2024 год. Часть 2',
                            redirectTo: 'rating-ro-reporting',
                        },
                    },
                ],
            },
            {
                path: '/rating-ro',
                meta: {
                    label: 'Рейтинг РО',
                    redirectTo: 'rating-ro',
                },
                children: [
                    {
                        path: '',
                        name: 'rating-ro',
                        component: () =>
                            import('@pages/RatingRO/components/RatingRo.vue'),
                    },
                    {
                        path: 'reporting',
                        meta: {
                            label: 'Отчеты РО',
                            redirectTo: 'rating-ro-reporting',
                        },
                        children: [
                            {
                                path: ':part',
                                name: 'rating-ro-reporting',
                                component: () =>
                                    import(
                                        '@pages/RatingRoReporting/components/RatingRoReportingHeadquarters.vue'
                                    ),
                                props: true,
                            },
                            {
                                path: 'report-regional-one-comander/:part',
                                name: 'ReportRegionalPartOneComander',
                                component: () =>
                                    import(
                                        '@pages/ReportRegionalHQPartOnePage/ReportRegionalHQPartOne.vue'
                                    ),
                                meta: {
                                    label: 'Отчет о деятельности регионального отделения РСО за 2024 год. Часть 1',
                                },
                                props: true,
                            },
                            {
                                path: 'report-regional-two-comander/:part',
                                name: 'ReportRegionalPartTwoComander',
                                component: () =>
                                    import(
                                        '@pages/ReportRegionalHQPartTwoPage/ReportRegionalHQPartTwo.vue'
                                    ),
                                meta: {
                                    label: 'Отчет о деятельности регионального отделения РСО за 2024 год. Часть 2',
                                },
                                props: true,
                            },

                        ],
                    },
                    {
                        path: 'places',
                        meta: {
                            label: 'Места РО по показателям',
                            redirectTo: 'places',
                        },
                        children: [
                            {
                                path: '',
                                name: 'places',
                                component: () =>
                                    import(
                                        '@pages/RoPlaces/components/RoPlaces.vue'
                                    ),
                            },
                            {
                                path: ':id',
                                meta: {
                                    requiresAuth: true,
                                    redirectTo: 'places',
                                    label: 'PlaceId.title',
                                    isObject: true,
                                },
                                children: [
                                    {
                                        path: '',
                                        name: 'Place',
                                        component: () =>
                                            import(
                                                '@pages/RatingRoPlace/components/RatingRoPlace.vue'
                                            ),
                                    },
                                    {
                                        path: ':id_event',
                                        name: 'EventPlace',
                                        component: () =>
                                            import(
                                                '@pages/RatingRoPlace/components/RatingRoPlace.vue'
                                            ),
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'place-ro',
                        meta: {
                            label: 'Места РО',
                            redirectTo: 'place-ro',
                        },
                        children: [
                            {
                                path: '',
                                name: 'place-ro',
                                component: () =>
                                    import(
                                        '@pages/PlaceRO/components/PlaceRO.vue'
                                    ),
                            },
                        ]
                    }
                ],
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
                            label: 'Справка о членстве в РСО (для работодателя)',
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
                            label: 'Справка о членстве в РСО (для личного пользования)',
                        },
                    },
                ],
            },
            {
                path: '/active',
                meta: {
                    redirectTo: 'active',
                    label: 'Активные заявки',
                },
                children: [
                    {
                        path: '',
                        name: 'active',
                        meta: {},
                        component: () =>
                            import(
                                '@pages/ActiveApplicationsData/components/ActiveApplicationsData.vue'
                            ),
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                path: 'personal',
                                meta: {
                                    label: 'Персональные данные пользователя',
                                },
                                name: 'PersonalDataUser',
                                component: () =>
                                    import(
                                        '@pages/PersonalDataPage/components/PersonalDataID.vue'
                                    ),
                            },
                            {
                                path: 'action',
                                meta: {
                                    label: 'Данные мероприятия',
                                },
                                name: 'ActionData',
                                component: () =>
                                    import('@pages/Event/components/Event.vue'),
                            },
                            {
                                path: 'detachment',
                                meta: {
                                    label: 'Данные отряда',
                                },
                                name: 'DetachmentData',
                                component: () =>
                                    import('@pages/lsoPage/lsoPage.vue'),
                            },
                            {
                                path: 'indicator',
                                children: [
                                    {
                                        path: ':applicationId',
                                        meta: {
                                            label: 'Показатели пользователя',
                                        },
                                        name: 'indicatorPage',
                                        component: () =>
                                            import(
                                                '@pages/indicatorPages/components/IndicatorsPage.vue'
                                            ),
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default routes;
