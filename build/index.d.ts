import * as React from 'react';
import React__default, { FC } from 'react';
import { NotFoundRouteProps, AnyRouter } from '@tanstack/react-router';

type IRouteId = string;
type IRouteLocale = string;
type IRouteRegion = string;
type IRouteLanguage = string;
type IRoutePath = string;
interface IRouteComponent {
    component: () => React__default.ReactNode;
}
type IRouteComponents = Record<IRouteId, IRouteComponent>;
interface IRouteTo {
    id: IRouteId;
    localeOrLanguage: IRouteLocale;
}
interface IRoute {
    id: IRouteId;
    language: IRouteLanguage;
    regions: IRouteRegion[];
    path: IRoutePath;
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
    hasRoute(id: IRouteId, locale: IRouteLocale): boolean;
    defaultLanguage(): IRouteLanguage;
    languages(): IRouteLanguage[];
    regionsByLanguage(): Record<IRouteLanguage, IRouteRegion[]>;
}
type NavigateMethod = "replace" | "push";
type NavigateTarget = "_blank" | "_self";
type NavigateParams<T> = {
    to: IRouteTo;
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
    isLoaded(language: IRouteLanguage): boolean;
    load(language: IRouteLanguage, messages: ITranslations): void;
}
type ITranslations = Record<string, string>;

interface RouterProps {
    config: IRouterConfig;
    loadTranslation(language: IRouteLanguage): ITranslations | Promise<ITranslations>;
}
declare const Router: FC<RouterProps>;

declare class RouterCore<TRouter extends AnyRouter> implements IRouter {
    private readonly _router;
    private readonly _config;
    constructor(config: IRouterConfig, router: TRouter);
    static new<TRouter extends AnyRouter>(config: IRouterConfig, router: TRouter): RouterCore<TRouter>;
    reload(): void;
    canGoBack(): any;
    goBack(): Promise<void>;
    navigate<T>({ to, from, query, params, hash, method, state, target, }: NavigateParams<T>): Promise<undefined>;
    path(id: IRouteId, locale: IRouteLocale): string;
    path(id: IRouteId, language: IRouteLanguage, region: IRouteRegion): string;
    href({ id, locale, query, params, hash }: HrefParams): string;
    relative({ id, locale, query, params, hash }: HrefParams): string;
    absolute({ baseUrl, id, locale, query, params, hash }: AbsoluteHrefParams): string;
    hasRoute(id: IRouteId, locale: IRouteLocale): boolean;
    defaultLanguage(): IRouteLanguage;
    languages(): IRouteLanguage[];
    regionsByLanguage(): Record<IRouteLanguage, IRouteRegion[]>;
    private _route;
}

declare const RouterOutlet: FC;

declare const RouterCoreContext: React.Context<IRouter | undefined>;

declare const RouteI18nContext: React.Context<IRouteI18N | undefined>;

declare const RouteLoadingContext: React.Context<boolean | undefined>;

declare const useRouter: () => IRouter;

declare const useRouteI18n: () => IRouteI18N;

declare const useRouteLanguage: () => IRouteLanguage;

declare const useRouteLocale: () => IRouteLocale;

declare const useRouteRegion: () => IRouteRegion | null;

declare const useRouteLoading: () => boolean;

export { type AbsoluteHrefParams, type HrefParams, type IRoute, type IRouteComponent, type IRouteComponents, type IRouteEntry, type IRouteI18N, type IRouteId, type IRouteLanguage, type IRouteLocale, type IRoutePath, type IRouteRegion, type IRouteTo, type IRouter, type IRouterConfig, type IRoutes, type ITranslations, type NavigateMethod, type NavigateParams, type NavigateTarget, RouteI18nContext, RouteLoadingContext, Router, RouterCore, RouterCoreContext, RouterOutlet, type RouterProps, useRouteI18n, useRouteLanguage, useRouteLoading, useRouteLocale, useRouteRegion, useRouter };
