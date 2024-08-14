export type DistrictHeadquarter = {
    id: number;
    name: string;
    emblem: string | null;
    founding_date: string;
    members_count: number;
    participants_count: number | null;
    events_count: number | null;
};

export type GetDistrictHeadquartersParams = {
    search?: string;
    ordering?: keyof DistrictHeadquarter;
    limit?: number;
    offset?: number;
};
