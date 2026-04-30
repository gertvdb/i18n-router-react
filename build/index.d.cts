import * as React from 'react';
import React__default, { FC } from 'react';
import { NotFoundRouteProps } from '@tanstack/react-router';

type IRouteId = string;
type IRouteLocale = string;
type IRouteRegion = string;
type IRouteLanguage = string;
type IRoutePath = string;
interface IRouteComponent {
    component: () => React__default.ReactNode;
}
type IRouteComponents = Record<IRouteId, IRouteComponent>;
interface ILocaleRoute {
    id: IRouteId;
    locale: IRouteLocale;
}
interface IRoute {
    id: IRouteId;
    language: IRouteLanguage;
    regions: IRouteRegion[];
    path: IRoutePath;
    parentId?: IRouteId;
}
type IRoutes = IRoute[];
interface IRouteEntry {
    id: IRouteId;
    localeOrLanguage: IRouteLanguage | IRouteLocale;
}
interface IRouterConfig {
    entry: IRouteEntry;
    components: IRouteComponents;
    routes: IRoutes;
    notFoundComponent: (props: NotFoundRouteProps) => React__default.ReactNode;
}
interface IRouter {
    reload(): void;
    canGoBack(): boolean;
    goBack(): Promise<void>;
    navigate<T>({ to, from, query, params, hash, method, state, target, }: NavigateParams<T>): Promise<void>;
    href({ id, locale, query, params, hash }: HrefParams): string;
    relative({ id, locale, query, params, hash }: HrefParams): string;
    absolute({ baseUrl, id, locale, query, params, hash, }: AbsoluteHrefParams): string;
    path(id: IRouteId, locale: IRouteLocale): string;
    path(id: IRouteId, language: IRouteLanguage, region: IRouteRegion): string;
    getRouteHierarchy(id: IRouteId): IRoute[];
    hasRoute(id: IRouteId, locale: IRouteLocale): boolean;
    defaultLanguage(): IRouteLanguage;
    languages(): IRouteLanguage[];
    regionsByLanguage(): Record<IRouteLanguage, IRouteRegion[]>;
}
type NavigateMethod = "replace" | "push";
type NavigateTarget = "_blank" | "_self";
type NavigateParams<T> = {
    to: IRouteEntry;
    from?: string;
    query?: Record<string, unknown>;
    params?: Record<string, unknown>;
    hash?: string;
    method?: NavigateMethod;
    state?: T;
    target?: NavigateTarget;
};
type AbsoluteHrefParams = {
    baseUrl: string;
} & HrefParams;
type HrefParams = {
    id: IRouteId;
    locale: IRouteLocale;
    query?: Record<string, unknown>;
    params?: Record<string, unknown>;
    hash?: string;
};
interface IRouteI18N {
    trans: (key: string, variables: Record<string, unknown>) => React__default.ReactElement | null;
    t: (key: string, variables?: Record<string, unknown>) => string;
    activate(language: IRouteLanguage): void;
    current(): IRouteLanguage;
    subscribe(listener: () => void): () => void;
    isLoaded(language: IRouteLanguage): boolean;
    load(language: IRouteLanguage, messages: ITranslations): void;
}
type ITranslations = Record<string, string>;
interface RouterProps {
    config: IRouterConfig;
    loadTranslation(language: IRouteLanguage): ITranslations | Promise<ITranslations>;
}
interface RouteParamsProps {
    router: IRouter;
    route: ILocaleRoute;
}
interface IRouteQueryProps extends RouteParamsProps {
    keys?: string[];
}

declare const Router: FC<RouterProps>;

declare const RouterCoreContext: React.Context<IRouter | undefined>;

declare const RouteI18nContext: React.Context<IRouteI18N | undefined>;

declare const useRouter: () => IRouter;

declare const useRouteI18n: () => IRouteI18N;

declare const useRouteLanguage: () => IRouteLanguage;

declare const useRouteLocale: () => IRouteLocale;

declare const useRouteRegion: () => IRouteRegion | null;

declare function useRouteParams({ router, route }: RouteParamsProps): any;

declare function useRouteQuery({ router, route, keys }: IRouteQueryProps): any;

declare const useRouteHierarchy: (id: string) => IRoute[];

declare const useRouteIsTransitioning: () => boolean;

declare const useTranslationLoaded: () => boolean;

declare const useRouterBootstrapped: () => boolean;

declare const createRouterConfig: ({ entry, components, routes, notFoundComponent, }: {
    entry: IRouteEntry;
    components: IRouteComponents;
    routes: IRoutes;
    notFoundComponent: (props: NotFoundRouteProps) => React__default.ReactNode;
}) => IRouterConfig;

declare const extractLanguage: ({ locale, }: {
    locale: IRouteLocale;
}) => IRouteLanguage;

declare const extractRegion: ({ locale, }: {
    locale: IRouteLocale;
}) => IRouteRegion;

declare const toLocale: ({ language, region, }: {
    language: IRouteLanguage;
    region: IRouteRegion;
}) => IRouteLocale;

export { type AbsoluteHrefParams, type HrefParams, type ILocaleRoute, type IRoute, type IRouteComponent, type IRouteComponents, type IRouteEntry, type IRouteI18N, type IRouteId, type IRouteLanguage, type IRouteLocale, type IRoutePath, type IRouteQueryProps, type IRouteRegion, type IRouter, type IRouterConfig, type IRoutes, type ITranslations, type NavigateMethod, type NavigateParams, type NavigateTarget, RouteI18nContext, type RouteParamsProps, Router, RouterCoreContext, type RouterProps, createRouterConfig, extractLanguage, extractRegion, toLocale, useRouteHierarchy, useRouteI18n, useRouteIsTransitioning, useRouteLanguage, useRouteLocale, useRouteParams, useRouteQuery, useRouteRegion, useRouter, useRouterBootstrapped, useTranslationLoaded };
