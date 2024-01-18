
import { reactive } from 'vue';
import {
    RouteLocationNormalizedLoaded,
    RouteParams,
    RouteRecordName,
    LocationQuery,
    RouteLocationMatched,
} from 'vue-router';
// import { findRouteByName } from '..';

export interface Breadcrumb {
    path: string;
    name: RouteRecordName | undefined;
    params: RouteParams | undefined;
    query: LocationQuery;
    label: string | string[];
}

interface Params {
    route?: RouteLocationNormalizedLoaded;
    targetObjects?: object[];
}


    if (!obj) return '';

    const arrayProperties = stringProperties.split('.');
    const nextParams = arrayProperties;
    let res = '';

    for (const property of arrayProperties) {
        nextParams.splice(0, 1);

        if (property.includes('&')) {
            for (const andParam of property.split('&')) {
                if (typeof obj[andParam] === 'object') {
                    res += `${bypassObject(
                        nextParams.join('.'),
                        obj[andParam],
                    )} `;
                } else {
                    res += `${obj[andParam]} `;
                }
            }

            return res;
        }
        if (typeof obj[property] === 'object') {
            return bypassObject(nextParams.join('.'), obj[property]);
        } else {
            return obj[property];
        }
    }
}

function getObjectBreadcrumb(
    props: string,
    obj: object | null | undefined,
): string | object {
    if (!obj) return '';

    if (typeof obj === 'object') return bypassObject(props, obj);
    return obj;
}

function getElementParams(element: RouteLocationMatched, params: RouteParams) {
    const keys = Object.keys(params).filter((key) =>
        element.path.includes(`:${key}`),
    );

    if (!keys?.length) return undefined;


        acc[key] = params[key];

        return acc;
    }, {});
}

export default function useBreadcrumbs(params: Params = {}) {
    const { route } = params;
    const breadcrumbs = reactive<Array<Breadcrumb>>([]);

    if (!route) {
        return breadcrumbs;
    }

    const objectsForLabels = params.targetObjects ?? [];
    const matchedRoutes = route.matched;


    matchedRoutes.forEach((el) => {
        const metaLabel = el.meta.label as string | null;

        if (!metaLabel) return;

        const isParamLabel = el.path.toLowerCase().indexOf(metaLabel) !== -1;
        const isQueryLabel = metaLabel.indexOf('?') !== -1;
        const isObjectLabel = el.meta.isObject;

        const finalMetaLabel =
            isParamLabel || isQueryLabel ? metaLabel.slice(1) : metaLabel;

        if (isParamLabel) {

        } else if (isQueryLabel) {
            const properties = finalMetaLabel.split('.');
            const curr = route.query[properties[0]];


        } else if (isObjectLabel) {
            const properties = finalMetaLabel.split('.');
            const curr = objectsForLabels.shift();


        }
    });

    return breadcrumbs;
}
