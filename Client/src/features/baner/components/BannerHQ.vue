<template>
    <div class="hq-metric" v-if="headquarter">
        <hqBanner :banner="headquarter.banner"></hqBanner>
        <hqAvatar :emblem="headquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ headquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p
                        v-if="
                            headquarter.slogan && headquarter.slogan != 'null'
                        "
                    >
                        {{ headquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__university">
                            <p>{{ edict.short_name }}</p>
                        </li>
                        <li class="Squad-HQ__date">
                            <p>Дата создания штаба</p>
                            <SvgIcon iconName="calendar" />
                            <time datetime="2022-09-10">{{
                                headquarter.founding_date
                            }}</time>
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__participant-counter-HQ">
                            <span
                                >{{ headquarter.participants_count }}
                                {{ ending }}</span
                            >
                        </div>
                        <div class="hq-data__social-network">
                            <div
                                class="hq-data__link-vk"
                                v-if="
                                    headquarter.social_vk &&
                                    headquarter.social_vk != 'null'
                                "
                            >
                                <a
                                    :href="headquarter.social_vk"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="vk" />
                                </a>
                            </div>
                            <div
                                class="hq-data__link-telegram"
                                v-if="
                                    headquarter.social_tg &&
                                    headquarter.social_tg != 'null'
                                "
                            >
                                <a
                                    :href="headquarter.social_tg"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="telegram" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a @click="copyL">
                                    <SvgIcon icon-name="share-link" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                            <!-- <pre>{{ userId }} {{ headquarter.commander.id }}</pre> -->
                        </div>
                    </div>
                    <div class="overlay" v-if="showModal"></div>
                    <AddModal
                        v-show="showModal === true"
                        :is-commander="
                            roleStore.roles.detachment_commander !== null
                        "
                        :is-new="
                            userStore.currentUser.educational_headquarter_id ===
                                null &&
                            userStore.currentUser.detachment_id === null &&
                            userStore.currentUser.local_headquarter_id ===
                                null &&
                            userStore.currentUser.regional_headquarter_id ===
                                null &&
                            userStore.currentUser.district_headquarter_id ===
                                null
                        "
                        @close="closeModalW()"
                        @add="
                            AddApplication('educationals', props.headquarter.id)
                        "
                    >
                    </AddModal>

                    <router-link
                        v-if="
                            userId &&
                            (userId == headquarter?.commander?.id ||
                                roles.roles.value.regionalheadquarter_commander
                                    ?.id ===
                                    headquarter?.regional_headquarter ||
                                roles.roles.value.localheadquarter_commander
                                    ?.id === headquarter?.local_headquarter ||
                                roles.roles.value
                                    .centralheadquarter_commander ||
                                isTrusted.length > 0)
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'EditHQ',
                            params: { id: headquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >
                    <Button
                        v-else-if="
                            userStore.currentUser.educational_headquarter_id !==
                                props.headquarter.id &&
                            Object.keys(applications).length === 0 &&
                            userStore.currentUser.educational_headquarter_id ===
                                null &&
                            isRegion
                        "
                        @click="showModalW()"
                        label="Вступить в штаб"
                        class="AddApplication"
                    ></Button>
                    <div
                        v-else-if="Object.keys(applications).length !== 0"
                        class="d-flex"
                    >
                        <div class="AddApplication mr-2">
                            Заявка на рассмотрении
                        </div>
                        <Button
                            @click="
                                DeleteApplication(
                                    'educationals',
                                    props.headquarter.id,
                                )
                            "
                            label="Удалить заявку"
                            class="AddApplication"
                        ></Button>
                    </div>

                    <div
                        v-else-if="
                            userStore.currentUser.educational_headquarter_id ===
                            props.headquarter.id
                        "
                        class="AddApplication"
                    >
                        Вы участник
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="localHeadquarter">
        <hqBanner :banner="localHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="localHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ localHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p
                        v-if="
                            localHeadquarter.slogan &&
                            localHeadquarter.slogan != 'null'
                        "
                    >
                        {{ localHeadquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Local">
                        <li class="Squad-HQ__date-local">
                            <time datetime="2022-09-10"
                                >{{ localHeadquarter.founding_date }} — дата
                                проведения первого Общего собрания МШ</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{ localHeadquarter.participants_count }}
                                {{ ending }}</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{ localHeadquarter.members_count }}
                                {{ endingMember }}</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div
                                class="hq-data__link-vk"
                                v-if="
                                    localHeadquarter.social_vk &&
                                    localHeadquarter.social_vk != 'null'
                                "
                            >
                                <a
                                    :href="localHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="vk" />
                                </a>
                            </div>
                            <div
                                class="hq-data__link-telegram"
                                v-if="
                                    localHeadquarter.social_tg &&
                                    localHeadquarter.social_tg != 'null'
                                "
                            >
                                <a
                                    :href="localHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="telegram" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a @click="copyL">
                                    <SvgIcon icon-name="share-link" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddModal
                        v-show="showModal === true"
                        :is-commander="
                            (roleStore.roles.detachment_commander ||
                                roleStore.roles
                                    .educationalheadquarter_commander) !== null
                        "
                        :is-new="
                            userStore.currentUser.educational_headquarter_id ===
                                null &&
                            userStore.currentUser.detachment_id === null &&
                            userStore.currentUser.local_headquarter_id ===
                                null &&
                            userStore.currentUser.regional_headquarter_id ===
                                null &&
                            userStore.currentUser.district_headquarter_id ===
                                null
                        "
                        @close="closeModalW()"
                        @add="
                            AddApplication('locals', props.localHeadquarter.id)
                        "
                    >
                    </AddModal>
                    <router-link
                        v-if="
                            userId &&
                            (userId == localHeadquarter?.commander?.id ||
                                roles.roles.value.regionalheadquarter_commander
                                    ?.id ===
                                    localHeadquarter.regional_headquarter ||
                                roles.roles.value
                                    .centralheadquarter_commander ||
                                isTrusted.length > 0)
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'FormLocal',
                            params: { id: localHeadquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >
                    <Button
                        v-else-if="
                            userStore.currentUser.local_headquarter_id !==
                                props.localHeadquarter.id &&
                            Object.keys(applications).length === 0 &&
                            userStore.currentUser.local_headquarter_id === null
                        "
                        @click="showModalW()"
                        label="Вступить в штаб"
                        class="AddApplication"
                    ></Button>
                    <div
                        v-else-if="Object.keys(applications).length !== 0"
                        class="d-flex"
                    >
                        <div class="AddApplication mr-2">
                            Заявка на рассмотрении
                        </div>
                        <Button
                            @click="
                                DeleteApplication(
                                    'locals',
                                    props.localHeadquarter.id,
                                )
                            "
                            label="Удалить заявку"
                            class="AddApplication"
                        ></Button>
                    </div>

                    <div
                        v-else-if="
                            userStore.currentUser.local_headquarter_id ===
                            props.localHeadquarter.id
                        "
                        class="AddApplication"
                    >
                        Вы участник
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="districtHeadquarter">
        <hqBanner :banner="districtHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="districtHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ districtHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p
                        v-if="
                            districtHeadquarter.slogan &&
                            districtHeadquarter.slogan != 'null'
                        "
                    >
                        {{ districtHeadquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Reg">
                        <li class="Squad-HQ__date-Reg">
                            <time datetime="2022-09-10"
                                >{{ districtHeadquarter.founding_date }} — дата
                                начала функционирования ОШ</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{ districtHeadquarter.participants_count }}
                                {{ ending }}</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{ districtHeadquarter.members_count }}
                                {{ endingMember }}</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div
                                class="hq-data__link-vk"
                                v-if="
                                    districtHeadquarter.social_vk &&
                                    districtHeadquarter.social_vk != 'null'
                                "
                            >
                                <a
                                    :href="districtHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="vk" />
                                </a>
                            </div>
                            <div
                                class="hq-data__link-telegram"
                                v-if="
                                    districtHeadquarter.social_tg &&
                                    districtHeadquarter.social_tg != 'null'
                                "
                            >
                                <a
                                    :href="districtHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="telegram" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a @click="copyL">
                                    <SvgIcon icon-name="share-link" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddModal
                        v-show="showModal === true"
                        @close="closeModalW()"
                        :is-commander="
                            (roleStore.roles.detachment_commander ||
                                roleStore.roles
                                    .educationalheadquarter_commander ||
                                roleStore.roles.regionalHeadquarter_commander ||
                                roleStore.roles.localheadquarter_commander) !==
                            null
                        "
                        :is-new="
                            userStore.currentUser.educational_headquarter_id ===
                                null &&
                            userStore.currentUser.detachment_id === null &&
                            userStore.currentUser.local_headquarter_id ===
                                null &&
                            userStore.currentUser.regional_headquarter_id ===
                                null &&
                            userStore.currentUser.district_headquarter_id ===
                                null
                        "
                        @add="
                            AddApplication(
                                'districts',
                                props.districtHeadquarter.id,
                            )
                        "
                    >
                    </AddModal>
                    <router-link
                        v-if="
                            userId &&
                            (userId == districtHeadquarter?.commander?.id ||
                                roles.roles.value
                                    .centralheadquarter_commander ||
                                isTrusted.length > 0)
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'FormDH',
                            params: { id: districtHeadquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >
                    <Button
                        v-else-if="
                            userStore.currentUser.district_headquarter_id !==
                                props.districtHeadquarter.id &&
                            Object.keys(applications).length === 0 &&
                            userStore.currentUser.district_headquarter_id ===
                                null
                        "
                        @click="showModalW()"
                        label="Вступить в штаб"
                        class="AddApplication"
                    ></Button>
                    <div
                        v-else-if="Object.keys(applications).length !== 0"
                        class="d-flex"
                    >
                        <div class="AddApplication mr-2">
                            Заявка на рассмотрении
                        </div>
                        <Button
                            @click="
                                DeleteApplication(
                                    'districts',
                                    props.districtHeadquarter.id,
                                )
                            "
                            label="Удалить заявку"
                            class="AddApplication"
                        ></Button>
                    </div>
                    <div
                        v-else-if="
                            userStore.currentUser.district_headquarter_id ===
                            props.districtHeadquarter.id
                        "
                        class="AddApplication"
                    >
                        Вы участник
                    </div>
                    

                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else-if="regionalHeadquarter">
        <hqBanner :banner="regionalHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="regionalHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ regionalHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p
                        v-if="
                            regionalHeadquarter.slogan &&
                            regionalHeadquarter.slogan != 'null'
                        "
                    >
                        {{ regionalHeadquarter.slogan }}
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list-Reg">
                        <li class="Squad-HQ__date-Reg">
                            <time datetime="2022-09-10"
                                >{{ regionalHeadquarter.conference_date }} —
                                дата учредительной конференции РШ</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{ regionalHeadquarter.participants_count }}
                                {{ ending }}</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{ regionalHeadquarter.members_count }}
                                {{ endingMember }}</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts">
                        <div class="hq-data__social-network-Reg">
                            <div
                                class="hq-data__link-vk"
                                v-if="
                                    regionalHeadquarter.social_vk &&
                                    regionalHeadquarter.social_vk != 'null'
                                "
                            >
                                <a
                                    :href="regionalHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="vk" />
                                </a>
                            </div>
                            <div
                                class="hq-data__link-telegram"
                                v-if="
                                    regionalHeadquarter.social_tg &&
                                    regionalHeadquarter.social_tg != 'null'
                                "
                            >
                                <a
                                    :href="regionalHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="telegram" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a @click="copyL">
                                    <SvgIcon icon-name="share-link" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddModal
                        v-show="showModal === true"
                        :is-commander="
                            (roleStore.roles.detachment_commander ||
                                roleStore.roles
                                    .educationalheadquarter_commander ||
                                roleStore.roles.localheadquarter_commander) !==
                            null
                        "
                        :is-new="
                            userStore.currentUser.educational_headquarter_id ===
                                null &&
                            userStore.currentUser.detachment_id === null &&
                            userStore.currentUser.local_headquarter_id ===
                                null &&
                            userStore.currentUser.regional_headquarter_id ===
                                null &&
                            userStore.currentUser.district_headquarter_id ===
                                null
                        "
                        @close="closeModalW()"
                        @add="
                            AddApplication(
                                'regionals',
                                props.regionalHeadquarter.id,
                            )
                        "
                    >
                    </AddModal>
                    <router-link
                        v-if="
                            userId &&
                            (userId == regionalHeadquarter?.commander?.id ||
                                roles.roles.value.districtheadquarter_commander
                                    ?.id ==
                                    regionalHeadquarter.district_headquarter ||
                                roles.roles.value.centralheadquarter_commander)
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'EditingOfRS',
                            params: { id: regionalHeadquarter.id },
                        }"
                        >Редактировать штаб</router-link
                    >

                    <Button
                        v-else-if="
                            userStore.currentUser.regional_headquarter_id !==
                                props.regionalHeadquarter.id &&
                            Object.keys(applications).length === 0 &&
                            userStore.currentUser.regional_headquarter_id ===
                                null
                        "
                        @click="showModalW()"
                        label="Вступить в штаб"
                        class="AddApplication"
                    ></Button>
                    <div
                        v-else-if="Object.keys(applications).length !== 0"
                        class="d-flex"
                    >
                        <div class="AddApplication mr-2">
                            Заявка на рассмотрении
                        </div>
                        <Button
                            @click="
                                DeleteApplication(
                                    'regionals',
                                    props.regionalHeadquarter.id,
                                )
                            "
                            label="Удалить заявку"
                            class="AddApplication"
                        ></Button>
                    </div>

                    <div
                        v-else-if="
                            userStore.currentUser.regional_headquarter_id ==
                            props.regionalHeadquarter.id
                        "
                        class="AddApplication"
                    >
                        Вы участник
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hq-metric" v-else>
        <hqBanner :banner="centralHeadquarter.banner"></hqBanner>
        <hqAvatar :emblem="centralHeadquarter.emblem"></hqAvatar>
        <div class="hq-metric__bottom">
            <div class="hq-data__wrapper">
                <div class="Squad-HQ__name">
                    <h4>{{ centralHeadquarter.name }}</h4>
                </div>
                <div class="slogan">
                    <p
                        v-if="
                            centralHeadquarter.slogan &&
                            centralHeadquarter.slogan != 'null'
                        "
                    >
                        {{ centralHeadquarter.slogan }}
                    </p>
                </div>
                <div class="working_slogan">
                    <p>
                        {{ centralHeadquarter.working_years }} лет на благо
                        страны!
                    </p>
                </div>
                <div class="hq__list-wrapper">
                    <ul class="Squad-HQ__list">
                        <li class="Squad-HQ__date-central">
                            <time datetime="2022-09-10"
                                >{{
                                    centralHeadquarter.rso_founding_congress_date
                                }}
                                — дата первого Учредительного Съезда РСО</time
                            >
                        </li>
                        <li class="hq-data__participant-counter">
                            <span
                                >{{ centralHeadquarter.participants_count }}
                                {{ ending }}</span
                            >
                        </li>
                        <li class="hq-data__participant-counter-">
                            <span
                                >{{ centralHeadquarter.members_count }}
                                {{ endingMember }}</span
                            >
                        </li>
                    </ul>
                </div>
                <div class="hq-data__contacts-wrapper">
                    <div class="hq-data__contacts-central">
                        <div class="hq-data__social-network-central">
                            <div
                                class="hq-data__link-vk"
                                v-if="
                                    centralHeadquarter.social_vk &&
                                    centralHeadquarter.social_vk != 'null'
                                "
                            >
                                <a
                                    :href="centralHeadquarter.social_vk"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="vk" />
                                </a>
                            </div>
                            <div
                                class="hq-data__link-telegram"
                                v-if="
                                    centralHeadquarter.social_tg &&
                                    centralHeadquarter.social_tg != 'null'
                                "
                            >
                                <a
                                    :href="centralHeadquarter.social_tg"
                                    target="_blank"
                                >
                                    <SvgIcon icon-name="telegram" />
                                </a>
                            </div>
                            <div class="hq-data__link-share-link">
                                <a @click="copyL">
                                    <SvgIcon icon-name="share-link" />
                                </a>
                                <div class="copy-message" hidden>
                                    Ссылка скопирована
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddModal
                        v-show="showModal === true"
                        @close="closeModalW()"
                        :is-commander="
                            (roleStore.roles.detachment_commander ||
                                roleStore.roles
                                    .educationalheadquarter_commander ||
                                roleStore.roles.regionalHeadquarter_commander ||
                                roleStore.roles.localheadquarter_commander ||
                                roleStore.roles
                                    .districtheadquarter_commander) !== null
                        "
                        :is-new="
                            userStore.currentUser.educational_headquarter_id ===
                                null &&
                            userStore.currentUser.detachment_id === null &&
                            userStore.currentUser.local_headquarter_id ===
                                null &&
                            userStore.currentUser.regional_headquarter_id ===
                                null &&
                            userStore.currentUser.district_headquarter_id ===
                                null
                        "
                        @add="
                            AddApplication(
                                'centrals',
                                props.centralHeadquarter.id,
                            )
                        "
                    >
                    </AddModal>
                    <router-link
                        v-if="
                            userId &&
                            (userId == centralHeadquarter?.commander?.id ||
                                isTrusted.length > 0)
                        "
                        class="hq-data__link"
                        :to="{
                            name: 'FormCentral',
                        }"
                        >Редактировать штаб</router-link
                    >
                    <Button
                        v-else-if="
                            roleStore.myPositions
                                .usercentralheadquarterposition === null &&
                            Object.keys(applications).length === 0
                        "
                        @click="showModalW()"
                        label="Вступить в штаб"
                        class="AddApplication"
                    ></Button>
                    <div
                        v-else-if="Object.keys(applications).length !== 0"
                        class="d-flex"
                    >
                        <div class="AddApplication mr-2">
                            Заявка на рассмотрении
                        </div>
                        <Button
                            @click="
                                DeleteApplication(
                                    'centrals',
                                    props.centralHeadquarter.id,
                                )
                            "
                            label="Удалить заявку"
                            class="AddApplication"
                        ></Button>
                    </div>

                    <div v-if="isAuth">
                        <router-link v-if="
                            userId &&
                            (userId == centralHeadquarter?.commander?.id ||
                                isTrusted.length > 0)
                        " class="hq-data__link" :to="{
                            name: 'FormCentral',
                        }">Редактировать штаб</router-link>
                        <Button v-else-if="
                            roleStore.myPositions
                                .usercentralheadquarterposition === null &&
                            Object.keys(applications).length === 0
                        " @click="showModalW()" label="Вступить в штаб" class="AddApplication"></Button>
                        <div v-else-if="Object.keys(applications).length !== 0" class="d-flex">
                            <div class="AddApplication mr-2">
                                Заявка на рассмотрении
                            </div>
                            <Button @click="
                                DeleteApplication(
                                    'centrals',
                                    props.centralHeadquarter.id,
                                )
                                " label="Удалить заявку" class="AddApplication"></Button>
                        </div>

                    <div
                        v-else-if="
                            roleStore.myPositions
                                .usercentralheadquarterposition !== null
                        "
                        class="AddApplication"
                    >
                        Вы участник
                        <div v-else-if="
                            roleStore.myPositions
                                .usercentralheadquarterposition !== null
                        " class="AddApplication">
                            Вы участник
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, inject } from 'vue';
import { hqAvatar } from '@shared/components/imagescomp';
import { hqBanner } from '@shared/components/imagescomp';
import { HTTP } from '@app/http';
import { useRoute } from 'vue-router';
import { useRoleStore } from '@layouts/store/role';
import { useRegionalsStore } from '@features/store/regionals';
import { useUserStore } from '@features/store/index';
import { storeToRefs } from 'pinia';
import { AddModal } from '@shared/components/dropdown';
import { Button } from '@shared/components/buttons';
import SvgIcon from '@shared/ui/SvgIcon/SvgIcon.vue';
const roleStore = useRoleStore();
const regionalsStore = useRegionalsStore();
const userStore = useUserStore();
const user = storeToRefs(userStore);
const edict = ref({});
const applications = ref({});
const isTrusted = ref([]);
const isError = ref([]);
const data = ref({});
const route = useRoute();
const showModal = ref(false);
const deletedId = ref(null);
const roles = storeToRefs(roleStore);
const isAuth = ref(!!localStorage.getItem('jwt_token'));
let educComId = roles.roles.value.educationalheadquarter_commander;
let regionComId = roles.roles.value.regionalheadquarter_commander;
let districtComId = roles.roles.value.districtheadquarter_commander;
let centralComId = roles.roles.value.centralheadquarter_commander;
let localComId = roles.roles.value.localheadquarter_commander;
const props = defineProps({
    banner: {
        type: String,
    },
    emblem: {
        type: String,
    },
    headquarter: {
        type: Object,
        required: false,
    },
    districtHeadquarter: {
        type: Object,
        required: false,
    },
    localHeadquarter: {
        type: Object,
        required: false,
    },
    regionalHeadquarter: {
        type: Object,
        required: false,
    },
    centralHeadquarter: {
        type: Object,
        required: false,
    },
    edict: {
        type: Object,
    },
    member: {
        type: Object,
    },
    ending: {
        type: String,
    },
    endingMember: {
        type: String,
    },
});

const userId = localStorage.getItem('user');

const swal = inject('$swal');
const filterApplications = async (name, id) => {
    try {
        const response = await HTTP.get(
            `/${name}/${id}/applications/?user_id=${userId}`,
        );
    if (isAuth.value) {
        try {
        const response = await HTTP.get(`/${name}/${id}/applications/?user_id=${userId}`);
        applications.value = response.data;
        console.log(applications.value);
    } catch (error) {
        console.log('an error occured ' + error);
    }
};
    }
}

const filtereIsTrusted = async (name, id) => {
    try {
        const response = await HTTP.get(
            `/${name}/${id}/members/?trusted_user_id=${userId}`,
        );
    if (isAuth.value) {
        try {
        const response = await HTTP.get(`/${name}/${id}/members/?trusted_user_id=${userId}`);
        isTrusted.value = response.data.results;
    } catch (error) {
        console.log('an error occured' + error);
    }
};
    }
}
const aboutEduc = async () => {
    let id = props.headquarter?.educational_institution.id;
    if (typeof id !== 'undefined') {
        try {
            const response = await HTTP.get(
                `/eduicational_institutions/${id}/`,
            );

            edict.value = response.data;
        } catch (error) {
            console.log(error);
        }
    }
};

const showModalW = () => {
    showModal.value = !showModal.value;
};
const closeModalW = () => {
    showModal.value = false;
};

const isRegion = computed(() => {
    let res = regionalsStore.filteredMyRegional.find(
        (item) => item?.id == props.headquarter?.regional_headquarter,
    );
    return res !== undefined;
});

const AddApplication = async (name, id) => {
    try {
        const sendResponse = await HTTP.post(
            `/${name}/${id}/apply/`,
            data.value,
        );
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        applications.value = sendResponse.data;
        showModal.value = false;
    } catch (error) {
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

const DeleteApplication = async (name, id) => {
    try {
        const delApplyResp = await HTTP.delete(`/${name}/${id}/apply/`);
        swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'успешно',
            showConfirmButton: false,
            timer: 1500,
        });
        applications.value = {};
    } catch (error) {
        console.error('There was an error!', error);
        if (isError.value) {
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `ошибка`,
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }
};

watch(
    () => props.headquarter,

    (newheadquarter) => {
        if (Object.keys(props.headquarter).length === 0) {
            return;
        }
        aboutEduc();

        filterApplications('educationals', props.headquarter.id);
        filtereIsTrusted('educationals', props.headquarter.id);
    },
);

watch(
    () => props.localHeadquarter,

    (newheadquarter) => {
        if (Object.keys(props.localHeadquarter).length === 0) {
            return;
        }

        filterApplications('locals', props.localHeadquarter.id);
        filtereIsTrusted('locals', props.localHeadquarter.id);
    },
);
watch(
    () => props.regionalHeadquarter,

    (newheadquarter) => {
        if (Object.keys(props.regionalHeadquarter).length === 0) {
            return;
        }

        filterApplications('regionals', props.regionalHeadquarter.id);
        filtereIsTrusted('regionals', props.regionalHeadquarter.id);
    },
);

watch(
    () => props.districtHeadquarter,

    (newheadquarter) => {
        if (Object.keys(props.districtHeadquarter).length === 0) {
            return;
        }

        filterApplications('districts', props.districtHeadquarter.id);
        filtereIsTrusted('districts', props.districtHeadquarter.id);
    },
);

watch(
    () => props.centralHeadquarter,

    (newheadquarter) => {
        if (Object.keys(props.centralHeadquarter).length === 0) {
            return;
        }

        filterApplications('centrals', props.centralHeadquarter.id);
        filtereIsTrusted('centrals', props.centralHeadquarter.id);
    },
);

onMounted(() => {
    roleStore.getMyPositions();
});

const copyL = () => {
    navigator.clipboard.writeText(window.location.href);
    const copyMessage = document.querySelector('.copy-message');
    copyMessage.hidden = false;
    setTimeout(() => {
        copyMessage.hidden = true;
    }, 2000);
};
</script>
<style lang="scss" scoped>
.hq-metric {
    display: grid;
    grid-template-columns: 30px 135px 135px 2fr 16px;
    grid-template-rows: 100px 100px 112px auto;
    margin-bottom: 40px;
    /*  */
    border-radius: 10px 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(244, 244, 244, 0);

    &__bottom {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 3;
        grid-row-end: 5;
    }
}

.ps__title {
    margin: 40px 0;
}

.ps__title h2 {
    /* Desktop/H-1 */
    font-family: 'Akrobat';
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #35383f;
}

/* Данные пользователя */
.hq-data__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 32px 0 16px 300px;
}

.hq-data__name {
    margin-bottom: 32px;
}

.hq-data__name h4 {
    color: #35383f;
    /* Desktop/H-3 */
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #35383f;
}

.hq-data__list-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 700px;
    margin-bottom: 32px;
}

.hq-data__list-wrapper ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}

.AddApplication {
    margin: 0px;
    display: block;
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'Bert Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}

.hq-data__list-wrapper li {
    border-right: 1px solid #35383f;
    height: 20px;
    margin: auto 5px;
}

.hq-data__list p,
.hq-data__list time {
    color: #35383f;
    /*  */
    font-family: 'BertSans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 5px;
}

.hq-data__introductions {
    display: flex;
    align-items: center;
}

.hq-data__introductions p,
.hq-data__introductions img {
    margin-right: 5px;
}

.Squad-HQ__name {
    font-family: 'Akrobat';
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.slogan {
    margin-top: 28px;
    margin-bottom: 9.5px;
}

.working_slogan {
    margin-bottom: 9.5px;
}

.Squad-HQ__list {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.Squad-HQ__list-Reg {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.Squad-HQ__list-Local {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.Squad-HQ__list li,
.Squad-HQ__list-Local li,
.Squad-HQ__list-Reg li {
    border-right: none;
    margin: 0;
}

.Squad-HQ__university p {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.Squad-HQ__date,
.Squad-HQ__date-local,
.Squad-HQ__date-Reg {
    display: flex;
}

.Squad-HQ__date-local time,
.Squad-HQ__date-Reg time,
.Squad-HQ__date-central time {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.Squad-HQ__date p {
    width: 100%;
    margin-right: 12px;
}

.hq-data__participant-counter-HQ span {
    border-right: none;
}

.hq-data__participant-counter span {
    border-right: 1px solid #35383f;
    margin-right: 8px;
    padding-right: 8px;
}

.hq-data__link {
    border-radius: 10px;
    background: #39bfbf;
    align-self: end;
    text-align: center;
    font-family: 'Bert Sans';
    letter-spacing: 1.2px;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: white;
    padding: 16px 32px;
}

.hq-data__link-share-link a {
    cursor: pointer;
}

.hq-data__contacts-wrapper {
    display: flex;
    justify-content: space-between;
}

.hq-data__contacts {
    display: flex;
    flex-direction: column;
}

.hq-data__social-network {
    display: flex;
    column-gap: 12px;
    margin: 12px 0 0;
}

.hq-data__social-network-Reg,
.hq-data__social-network-central {
    display: flex;
    // justify-content: space-between;
    margin: 12px 0 0;
    column-gap: 12px;
}

.copy-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #35383f;
    border-radius: 10px;
    color: #35383f;
    font-size: 16px;
    font-family: 'Bert Sans';
    text-align: center;
}

@media ((max-width: 1095px)) {
    .Squad-HQ__university p {
        border-right: none;
    }

    .hq-data__wrapper {
        margin: 22px 0 16px 260px;
    }
}

@media ((max-width: 841px)) {
    .Squad-HQ__date-local time,
    .Squad-HQ__date-central time {
        border-right: none;
    }
}

@media ((max-width: 768px)) {
    .hq-metric {
        grid-template-columns: 10px 135px 135px 2fr 16px;
    }

    .hq-data__wrapper {
        margin: 22px 0 16px 240px;
    }

    .hq-data__contacts-wrapper {
        display: grid;
        row-gap: 20px;
    }

    .hq-data__contacts {
        align-items: start;
    }

    .hq-data__social-network {
        column-gap: 12px;
    }

    .Squad-HQ__date-Reg time {
        border-right: none;
    }
}

@media ((max-width: 590px)) {
    .hq-metric {
        display: block;
    }

    .hq-data__wrapper {
        margin: 0px 0 16px 0;
        align-items: center;
    }

    .user-metric__avatar-wrapper {
        grid-template-columns: 125px 125px;
        margin-left: 64px;
    }

    .hq-metric__bottom {
        grid-row-start: 4;
    }

    .Squad-HQ__date p {
        margin-right: 6px;
    }

    .hq-data__contacts {
        align-items: center;
    }

    .Squad-HQ__list,
    .Squad-HQ__list-Local,
    .Squad-HQ__list-Reg {
        display: block;
        text-align: center;
    }

    .Squad-HQ__name {
        text-align: center;
    }
}
</style>
@shared/components/inputs/imagescomp@shared/components/inputs/imagescomp
