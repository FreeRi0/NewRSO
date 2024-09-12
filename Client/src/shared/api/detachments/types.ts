export type DetachmentHeadquarter =
    {
        id: number;
        name: string;
        emblem: string | null;
        founding_date: string;
        members_count: number;
        participants_count: number | null;
        events_count: number | null;
        educational_headquarter: number | null;
        local_headquarter: number | null;
        regional_headquarter: number | null;
        region: number;
        educational_institution: number | null;
    }


export type GetDetachmentHeadquartersParams = {
    search?: string;
    area__name?: string;
    educational_institution__name?: string;
    district_headquarter__name?: string;
    regional_headquarter__name?: string;
    local_headquarter__name?: string;
    educational_headquarter__name?: string;
    ordering?: keyof DetachmentHeadquarter;
    limit?: number;
    offset?: number;
};
