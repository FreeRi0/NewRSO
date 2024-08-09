export type CurrentUser = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    patronymic_name: string;
    date_of_birth: string;
    is_adult: boolean;
    last_name_lat: string | null;
    first_name_lat: string | null;
    patronymic_lat: string | null;
    phone_number: string;
    gender: Gender;
    region: Region;
    address: string | null;
    bio: string;
    social_vk: string;
    social_tg: string;
    membership_fee: boolean;
    is_verified: boolean;
    is_rso_member: boolean;
    user_region: UserRegion;
    documents: Documents;
    statement: Statement;
    media: UserMedia;
    education: Education;
    privacy: Privacy;
    parent: ParentInfo;
    professional_education: string[];
    central_headquarter_id: number;
    district_headquarter_id: number | null;
    regional_headquarter_id: number | null;
    local_headquarter_id: number | null;
    educational_headquarter_id: number | null;
    detachment_id: number | null;
    sent_verification: boolean;
};

export type Gender = 'male' | 'female' | '';

export type Region = {
    id: number;
    name: string;
    code: number;
};

export type UserRegion = {
    reg_region: string | null;
    reg_town: string | null;
    reg_house: string | null;
    reg_fact_same_address: boolean;
    fact_region: string | null;
    fact_town: string | null;
    fact_house: string | null;
    reg_region_id: number | null;
    fact_region_id: number | null;
};

export type Documents = {
    snils: string | null;
    russian_passport: boolean;
    inn: string | null;
    pass_ser_num: string | null;
    pass_town: string;
    pass_whom: string | null;
    pass_date: string | null;
    pass_code: string | null;
    pass_address: string | null;
    work_book_num: number | null;
    international_pass: string | null;
    mil_reg_doc_type: string | null;
    mil_reg_doc_ser_num: number | null;
};

export type Statement = {
    statement: string | null;
    consent_personal_data: string | null;
    consent_personal_data_representative: string | null;
    passport: string | null;
    passport_representative: string | null;
    snils_file: string | null;
    inn_file: string | null;
    employment_document: string | null;
    military_document: string | null;
    international_passport: string | null;
    additional_document: string | null;
    rso_info_from: string | null;
    personal_data_agreement: boolean;
};

export type UserMedia = Record<
    'banner' | 'photo' | 'photo1' | 'photo2' | 'photo3' | 'photo4',
    string | null
>;

export type Education = {
    study_institution: string | null;
    study_faculty: string | null;
    study_form: string | null;
    study_year: number | null;
    study_specialty: string | null;
};

export type Privacy = {
    privacy_telephone: 'all';
    privacy_email: 'all';
    privacy_social: 'all';
    privacy_about: 'all';
    privacy_photo: 'all';
};

export type ParentInfo = {
    parent_last_name: string | null;
    parent_first_name: string | null;
    parent_patronymic_name: string | null;
    parent_date_of_birth: string | null;
    relationship: string | null;
    parent_phone_number: string;
    russian_passport: boolean;
    passport_number: string | null;
    passport_date: string | null;
    passport_authority: string | null;
    region: string | null;
    city: string | null;
    address: string | null;
};

export type UserHeadquarters = {
    centralheadquarter_commander: Headquarter | null;
    districtheadquarter_commander: Headquarter | null;
    regionalheadquarter_commander: Headquarter | null;
    localheadquarter_commander: Headquarter | null;
    educationalheadquarter_commander: Headquarter | null;
    detachment_commander: Headquarter | null;
};

export type Headquarter = {
    id: number;
    name: string;
    banner: string | null;
    emblem: string | null;
};

export type GetUsersParams = {
    search?: string;
    date_of_birth?: string;
    date_of_birth_gte?: string;
    date_of_birth_lte?: string;
    central_headquarter__name?: string;
    district_headquarter__name?: string;
    regional_headquarter__name?: string;
    local_headquarter__name?: string;
    educational_headquarter__name?: string;
    detachment__name?: string;
    gender?: Gender;
    is_verified?: boolean;
    membership_fee?: boolean;
    region?: string;
    ordering?: keyof CurrentUser;
    limit?: number;
    offset?: number;
};

export type User = {
    avatar: {
        photo: string | null;
    };
    date_of_birth: string | null;
    email: string;
    first_name: string;
    id: number;
    is_verified: boolean;
    last_name: string;
    membership_fee: boolean;
    patronymic_name: string;
    phone_number: string;
    username: string;
};
