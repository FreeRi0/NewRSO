export type IconName =
    | 'download'
    | 'file-dock'
    | 'wrap'
    | 'user-avatar'
    | 'add-file'
    | 'arrow-down'
    | 'arrow-right'
    | 'basket'
    | 'bell-light'
    | 'calendar'
    | 'close-location'
    | 'close-modal';

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
    wrap: {
        width: 32,
        height: 32,
        color: '#1F7CC0',
    },
    'user-avatar': {
        width: 56,
        height: 56,
        color: '#35383F',
    },
    'add-file': {
        width: 16,
        height: 17,
        color: '#1F7CC0',
    },
    'arrow-down': {
        width: 24,
        height: 24,
        color: '#ffffff',
    },
    'arrow-right': {
        width: 24,
        height: 24,
        color: '#ffffff',
    },
    basket: {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    'bell-light': {
        width: 36,
        height: 36,
        color: '#35383F',
    },
    calendar: {
        width: 20,
        height: 21,
        color: '#35383F',
    },
    'close-location': {
        width: 24,
        height: 24,
        color: '#939393',
    },
    'close-modal': {
        width: 24,
        height: 24,
        color: '#898989',
    },
};
