import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import { NotFoundRouteProps, ErrorComponentProps } from '@tanstack/react-router';

type IRouteId = string;
type IRouteLocale = string;
type IRouteRegion = string;
type IRouteLanguage = string;
type IRoutePath = string;
interface IRouteComponent<TLoaderData = any, TRouteContext = any, TContext = any> {
    component: () => React__default.ReactNode;
    beforeLoad?: (opts: {
        context: TContext;
    }, language: IRouteLanguage, region: IRouteRegion) => Promise<TRouteContext> | TRouteContext | void;
    loader?: (params: any, opts: {
        context: TContext;
    }, language: IRouteLanguage, region: IRouteRegion) => Promise<TLoaderData> | TLoaderData;
}
type IRouteComponents<TContext = any> = Record<IRouteId, IRouteComponent<any, any, TContext>>;
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
interface IRouterConfig<TContext = any> {
    components: IRouteComponents<TContext>;
    routes: IRoutes;
    entryRoute: IRouteEntry;
    notFoundComponent: (props: NotFoundRouteProps) => React__default.ReactNode;
    errorComponent: (props: ErrorComponentProps) => React__default.ReactNode;
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
    isBootstrapped(): boolean;
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
interface RouterProps<TContext = Record<string, unknown>> {
    context: TContext;
    config: IRouterConfig<TContext>;
    translations(language: IRouteLanguage): ITranslations | Promise<ITranslations>;
}
interface RouteParamsProps<T, TSelected = T> {
    router: IRouter;
    route: ILocaleRoute;
    select?: (match: T) => TSelected;
}
interface RouteLoaderDataProps<T, TSelected = T> {
    router: IRouter;
    route: ILocaleRoute;
    select?: (match: T) => TSelected;
}
interface IRouteQueryProps<T, TSelected = T> {
    router: IRouter;
    route: ILocaleRoute;
    select?: (match: T) => TSelected;
}

declare const Router: <TContext extends Record<string, unknown>>(props: RouterProps<TContext>) => react_jsx_runtime.JSX.Element;

declare const RouterCoreContext: React.Context<IRouter | undefined>;

declare const RouteI18nContext: React.Context<IRouteI18N | undefined>;

declare const useRouter: () => IRouter;

declare const useRouteI18n: () => IRouteI18N;

declare const useRouteLanguage: () => IRouteLanguage;

declare const useRouteLocale: () => IRouteLocale;

declare const useRouteRegion: () => IRouteRegion | null;

declare function useRouteParams<T, TSelected = T>({ router, route, select, }: RouteParamsProps<T, TSelected>): TSelected;

declare function useRouteQuery<T, TSelected = T>({ router, route, select, }: IRouteQueryProps<T, TSelected>): TSelected;

declare function useRouteLoaderData<T, TSelected = T>({ router, route, select, }: RouteLoaderDataProps<T, TSelected>): TSelected;

declare const useRouteHierarchy: (id: string) => IRoute[];

declare const useRouteIsTransitioning: () => boolean;

declare const useTranslationLoaded: () => boolean;

declare const useRouterBootstrapped: () => boolean;

declare const createRouterConfig: ({ entryRoute, components, routes, notFoundComponent, errorComponent, }: {
    entryRoute: IRouteEntry;
    components: IRouteComponents;
    routes: IRoutes;
    notFoundComponent: (props: NotFoundRouteProps) => React__default.ReactNode;
    errorComponent: (props: ErrorComponentProps) => React__default.ReactNode;
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

export { type AbsoluteHrefParams, type HrefParams, type ILocaleRoute, type IRoute, type IRouteComponent, type IRouteComponents, type IRouteEntry, type IRouteI18N, type IRouteId, type IRouteLanguage, type IRouteLocale, type IRoutePath, type IRouteQueryProps, type IRouteRegion, type IRouter, type IRouterConfig, type IRoutes, type ITranslations, type NavigateMethod, type NavigateParams, type NavigateTarget, RouteI18nContext, type RouteLoaderDataProps, type RouteParamsProps, Router, RouterCoreContext, type RouterProps, createRouterConfig, extractLanguage, extractRegion, toLocale, useRouteHierarchy, useRouteI18n, useRouteIsTransitioning, useRouteLanguage, useRouteLoaderData, useRouteLocale, useRouteParams, useRouteQuery, useRouteRegion, useRouter, useRouterBootstrapped, useTranslationLoaded };
