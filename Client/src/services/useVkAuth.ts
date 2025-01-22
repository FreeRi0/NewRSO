import * as VKID from '@vkid/sdk';

declare module '@vkid/sdk' {
    interface ConfigData {
        codeVerifier?: string;
        scope?: string;
    }
}

export function useVkAuth() {
    const CLIENT_ID = 51915086;
    const REDIRECT_URL = 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/my-page/';

    const initVkAuth = (): void => {
        VKID.Config.set({
            app: CLIENT_ID,
            redirectUrl: REDIRECT_URL,
            state: 'dj29fnsadjsd82',
            codeVerifier: 'FGH767Gd65',
            scope: 'email phone'
        });

        const container = document.getElementById('VkIdSdkOAuthList');
        if (container) {
            const oauthList = new VKID.OAuthList();
            const oauthListNames = [
                VKID.OAuthName.VK,
                VKID.OAuthName.MAIL,
                VKID.OAuthName.OK,
            ];
            oauthList.render({
                container: container,
                oauthList: oauthListNames,
                scheme: VKID.Scheme.LIGHT,
                lang: VKID.Languages.RUS,
                styles: { height: 44, borderRadius: 8 }
            }).on(VKID.WidgetEvents.ERROR, (error: Error) => {
                console.error('VK OAuth error:', error);
            });
        }
    };

    return { initVkAuth };
}