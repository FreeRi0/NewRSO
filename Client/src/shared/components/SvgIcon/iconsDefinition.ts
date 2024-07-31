export type IconName = 'download' | 'file-dock';

type IconsRecord = Record<
    IconName,
    { width: number; height: number; color: string }
>;

export const defaultIconSizes: IconsRecord = {
    download: {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    'file-dock': {
        color: '#33363F',
        width: 24,
        height: 24,
    },
};
