export type RegionalHeadquarter = {
    id: number;
    name: string;
    emblem: string | null;
    founding_date: string;
    members_count: number;
    participants_count: number | null;
    events_count: number | null;
    district_headquarter: number;
};

export type GetRegionalHeadquartersParams = {
    search?: string;
    district_headquarter__name?: string;
    ordering?: keyof RegionalHeadquarter;
    limit?: number;
    offset?: number;
};
