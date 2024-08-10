export type EducationalHeadquarter = {
    id: number;
    name: string;
    emblem: string | null;
    founding_date: string;
    educational_institution: number;
    members_count: number;
    participants_count: number | null;
    events_count: number | null;
    local_headquarter: number | null;
    regional_headquarter: number;
};

export type GetEducationalHeadquartersParams = {
    search?: string;
    local_headquarter__name?: string;
    regional_headquarter__name?: string;
    district_headquarter__name?: string;
    ordering?: keyof EducationalHeadquarter;
    limit?: number;
    offset?: number;
};
