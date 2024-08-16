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
    | 'close-modal'
    | 'commandir'
    | 'commisar'
    | 'cross'
    | 'dashboard-active'
    | 'dashboard-disabled'
    | 'file'
    | 'group-light'
    | 'link-ref'
    | 'mail'
    | 'people'
    | 'phone'
    | 'search'
    | 'telegram'
    | 'share-link'
    | 'vk'
    | 'file-pdf'
    | 'file-jpg'
    | 'file-png';

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
    commandir: {
        width: 18,
        height: 18,
        color: '#FFFF00',
    },
    commisar: {
        width: 18,
        height: 18,
        color: '#FFFF00',
    },
    cross: {
        width: 32,
        height: 32,
        color: '#898989',
    },
    'dashboard-active': {
        width: 32,
        height: 32,
        color: '#ffffff',
    },
    'dashboard-disabled': {
        width: 32,
        height: 32,
        color: '#35383F',
    },
    file: {
        width: 24,
        height: 24,
        color: '#35383F',
    },
    'group-light': {
        width: 24,
        height: 24,
        color: '#35383F',
    },
    'link-ref': {
        width: 16,
        height: 16,
        color: '#1F7CC0',
    },
    mail: {
        width: 19,
        height: 13,
        color: '#35383F',
    },
    people: {
        width: 24,
        height: 24,
        color: '#6A6A6A',
    },
    phone: {
        width: 18,
        height: 19,
        color: '#35383F',
    },
    search: {
        width: 18,
        height: 18,
        color: '#898989',
    },
    telegram: {
        width: 26,
        height: 26,
        color: '#1F7CC0',
    },
    'share-link': {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    vk: {
        width: 24,
        height: 24,
        color: '#1F7CC0',
    },
    'file-pdf': {
        width: 48,
        height: 24,
        color: '#ff8a00',
    },
    'file-jpg': {
        width: 48,
        height: 24,
        color: '#16a086',
    },
    'file-png': {
        width: 48,
        height: 24,
        color: '#16a086',
    },
};
