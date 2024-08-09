export type LocalHeadquarter = {
    id: number;
    name: string;
    emblem: string | null;
    founding_date: string;
    members_count: number;
    participants_count: number | null;
    events_count: number | null;
    regional_headquarter: number;
};

export type GetLocalHeadquartersParams = {
    search?: string;
    regional_headquarter__name?: string;
    district_headquarter__name?: string;
    ordering?: keyof LocalHeadquarter;
    limit?: number;
    offset?: number;
};
