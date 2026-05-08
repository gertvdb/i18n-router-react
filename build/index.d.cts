import * as React from 'react';
import React__default from 'react';
import { NotFoundRouteProps, ErrorComponentProps } from '@tanstack/react-router';
import { ILocale, ILanguageString, IRegionString, ILocaleString } from '@gertvdb/locale';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * ID of a route context.
 */
type IRouteContextId = string;
/**
 * ID of a route.
 */
type IRouteId = string;
/**
 * Path string for a route.
 */
type IRoutePath = string;
/**
 * Configuration for a route component.
 */
interface IRouteComponent<TLoaderData = any, TServices = any> {
    /**
     * The React component to render for this route.
     */
    component: () => React__default.ReactNode;
    /**
     * Optional context ID if this route should be nested under a specific context.
     */
    contextId?: IRouteContextId;
    /**
     * Optional loader function to fetch data for this route.
     */
    loader?: (params: any, opts: {
        services: TServices;
    }, locale: ILocale) => Promise<TLoaderData> | TLoaderData;
}
/**
 * A record of route components indexed by their route ID.
 */
type IRouteComponents<TContext = any> = Record<IRouteId, IRouteComponent<any, TContext>>;
/**
 * Represents a route identified by its ID and locale.
 */
interface ILocaleRoute {
    id: IRouteId;
    locale: ILocale;
}
/**
 * Definition of a route including its path and supported languages/regions.
 */
interface IRoute {
    /**
     * Unique ID for the route.
     */
    id: IRouteId;
    /**
     * Language of this route definition.
     */
    language: ILanguageString;
    /**
     * List of regions supported by this route definition.
     */
    regions: IRegionString[];
    /**
     * The URL path for this route.
     */
    path: IRoutePath;
}
/**
 * Definition of a context route, typically used for wrapping other routes with shared logic or data.
 */
interface IContextRoute<TRouteContext = any, TServices = any> {
    /**
     * Unique ID for the context route.
     */
    id: IRouteContextId;
    /**
     * Optional parent context ID.
     */
    contextId?: IRouteContextId;
    /**
     * Function called before the route is loaded, often used for authentication or data pre-fetching.
     */
    beforeLoad?: (opts: {
        services: TServices;
    }) => Promise<TRouteContext> | TRouteContext | void;
}
/**
 * Redirect configuration.
 */
interface IRouteRedirect {
    from: IRoutePath;
    to: ILocaleRoute;
}
type IRoutes = IRoute[];
type IRouteContexts = IContextRoute[];
type IRouteRedirects = IRouteRedirect[];
/**
 * Defines the initial entry point of the application.
 */
interface IRouteEntry {
    id: IRouteId;
    language: ILanguageString;
    region: IRegionString;
}
interface IRouteTo {
    id: IRouteId;
    locale: ILocale;
}
/**
 * Main configuration object for the Router.
 */
interface IRouterConfig<TServices = any> {
    /**
     * Mapping of route IDs to their components and loaders.
     */
    components: IRouteComponents<TServices>;
    /**
     * List of route definitions.
     */
    routes: IRoutes;
    /**
     * The default entry route.
     */
    routeEntry: IRouteEntry;
    /**
     * Optional list of context routes.
     */
    routeContexts?: IRouteContexts;
    /**
     * Optional list of redirects.
     */
    routeRedirects?: IRouteRedirects;
    /**
     * Component to render when no route is found.
     */
    notFoundComponent: (props: NotFoundRouteProps) => React__default.ReactNode;
    /**
     * Component to render when an error occurs during routing.
     */
    errorComponent: (props: ErrorComponentProps) => React__default.ReactNode;
}
/**
 * The core Router interface providing navigation and path utilities.
 */
interface IRouter {
    /**
     * Reloads the current route.
     */
    reload(): void;
    /**
     * Checks if there is a history to go back to.
     */
    canGoBack(): boolean;
    /**
     * Navigates back in history.
     */
    goBack(): Promise<void>;
    /**
     * Navigates to a specific route.
     */
    navigate<T>({ to, from, query, params, hash, method, state, target, }: NavigateParams<T>): Promise<void>;
    /**
     * Generates a href for a given route.
     */
    href({ id, locale, query, params, hash }: HrefParams): string;
    /**
     * Generates a relative path for a given route.
     */
    relative({ id, locale, query, params, hash }: HrefParams): string;
    /**
     * Generates an absolute URL for a given route.
     */
    absolute({ baseUrl, id, locale, query, params, hash, }: AbsoluteHrefParams): string;
    /**
     * Gets the path for a route ID and locale or language/region.
     */
    path(id: IRouteId, locale: ILocale): string;
    /**
     * Gets the internal TanStack route ID.
     */
    id(id: IRouteId, locale: ILocale): string;
    /**
     * Checks if a route exists for the given ID and locale.
     */
    hasRoute(id: IRouteId, locale: ILocale): boolean;
    /**
     * Gets the default application language.
     */
    defaultLanguage(): ILanguageString;
    /**
     * Gets all supported languages.
     */
    languages(): ILanguageString[];
    /**
     * Gets a mapping of languages to their supported regions.
     */
    regionsByLanguage(): Partial<Record<ILanguageString, IRegionString[]>>;
    /**
     * Checks if the router has finished bootstrapping.
     */
    isBootstrapped(): boolean;
}
type NavigateMethod = "replace" | "push";
type NavigateTarget = "_blank" | "_self";
/**
 * Parameters for the navigate function.
 */
type NavigateParams<T> = {
    /**
     * The target route entry.
     */
    to: IRouteTo;
    /**
     * Optional "from" path.
     */
    from?: string;
    /**
     * Optional search query parameters.
     */
    query?: Record<string, unknown>;
    /**
     * Optional path parameters.
     */
    params?: Record<string, unknown>;
    /**
     * Optional URL hash.
     */
    hash?: string;
    /**
     * Navigation method ("push" or "replace").
     */
    method?: NavigateMethod;
    /**
     * Optional state to pass to the target route.
     */
    state?: T;
    /**
     * Optional target for the link (e.g., "_blank").
     */
    target?: NavigateTarget;
};
type AbsoluteHrefParams = {
    baseUrl: string;
} & HrefParams;
/**
 * Parameters for generating a href.
 */
type HrefParams = {
    id: IRouteId;
    locale: ILocale;
    query?: Record<string, unknown>;
    params?: Record<string, unknown>;
    hash?: string;
};
/**
 * Interface for i18n support within the router.
 */
interface IRouterI18N {
    /**
     * Translates a key to a React element.
     */
    trans: (key: string, variables: Record<string, unknown>) => React__default.ReactElement | null;
    /**
     * Translates a key to a string.
     */
    t: (key: string, variables?: Record<string, unknown>) => string;
    /**
     * Activates a specific language.
     */
    activate(language: ILanguageString): void;
    /**
     * Gets the current language.
     */
    current(): ILanguageString;
    /**
     * Subscribes to language changes.
     */
    subscribe(listener: () => void): () => void;
    /**
     * Checks if a language's translations are loaded.
     */
    isLoaded(language: ILanguageString): boolean;
    /**
     * Loads translations for a language.
     */
    load(language: ILanguageString, messages: ITranslations): void;
}
/**
 * Record of translation keys and their values.
 */
type ITranslations = Record<string, string>;
/**
 * Props for the Router component.
 */
interface Router18nProviderProps<TServices = Record<string, unknown>> {
    /**
     * Initial services for the router.
     */
    services: TServices;
    /**
     * Router configuration.
     */
    config: IRouterConfig<TServices>;
    /**
     * Function to load translations for a given language.
     */
    translations(language: ILanguageString, services: TServices): ITranslations | Promise<ITranslations>;
}
interface RoutePathProps {
    router: IRouter;
    route: ILocaleRoute;
}
interface RouteParamsProps<T, TSelected = T> extends RoutePathProps {
    select?: (match: T) => TSelected;
}
interface RouteContextProps<T, TSelected = T> extends RoutePathProps {
    select?: (match: T) => TSelected;
}
interface RouteLoaderDataProps<T, TSelected = T> extends RoutePathProps {
    select?: (match: T) => TSelected;
}
interface IRouteQueryProps<T, TSelected = T> extends RoutePathProps {
    select?: (match: T) => TSelected;
}
interface UseRouterServiceProps<T, R = any> {
    serviceToken: T;
}

/**
 * The Router component is the entry point for the localized routing system.
 * It wraps the TanStack Router and provides i18n support via Lingui.
 *
 * @param props - The props for the Router component.
 * @returns A RouterProvider wrapped with I18n and Context providers.
 */
declare const RouterI18nProvider: <TServices extends Record<string, unknown>>(props: Router18nProviderProps<TServices>) => react_jsx_runtime.JSX.Element;

declare const RouterContext: React.Context<IRouter | undefined>;

declare const RouterI18nContext: React.Context<IRouterI18N | undefined>;

declare const useRouteLocale: () => {
    locale: ILocale;
    language: ILocaleString;
    region: IRegionString | undefined;
};

declare function useRouteParams<T, TSelected = T>({ router, route, select, }: RouteParamsProps<T, TSelected>): TSelected | T;

declare function useRouteQuery<T, TSelected = T>({ router, route, select, }: IRouteQueryProps<T, TSelected>): TSelected;

declare function useRouteLoaderData<T, TSelected = T>({ router, route, select, }: RouteLoaderDataProps<T, TSelected>): TSelected | T;

declare function useRouteContext<T, TSelected = T>({ router, route, select, }: RouteContextProps<T, TSelected>): TSelected | T;

declare const useRouter: () => {
    router: IRouter;
    i18n: IRouterI18N;
};

declare function useRouterService<T, R = any>(serviceToken: T): R;

declare const useRouterBootstrapped: () => boolean;

declare const useRouterIsTransitioning: () => boolean;

declare const useTranslationLoaded: () => boolean;

declare const createRouterConfig: ({ routeEntry, components, routes, routeContexts, notFoundComponent, errorComponent, }: {
    routeEntry: IRouteEntry;
    components: IRouteComponents;
    routes: IRoutes;
    routeContexts: IRouteContexts;
    notFoundComponent: (props: NotFoundRouteProps) => React__default.ReactNode;
    errorComponent: (props: ErrorComponentProps) => React__default.ReactNode;
}) => IRouterConfig;

export { type AbsoluteHrefParams, type HrefParams, type IContextRoute, type ILocaleRoute, type IRoute, type IRouteComponent, type IRouteComponents, type IRouteContextId, type IRouteContexts, type IRouteEntry, type IRouteId, type IRoutePath, type IRouteQueryProps, type IRouteRedirect, type IRouteRedirects, type IRouteTo, type IRouter, type IRouterConfig, type IRouterI18N, type IRoutes, type ITranslations, type NavigateMethod, type NavigateParams, type NavigateTarget, type RouteContextProps, type RouteLoaderDataProps, type RouteParamsProps, type RoutePathProps, type Router18nProviderProps, RouterContext, RouterI18nContext, RouterI18nProvider, type UseRouterServiceProps, createRouterConfig, useRouteContext, useRouteLoaderData, useRouteLocale, useRouteParams, useRouteQuery, useRouter, useRouterBootstrapped, useRouterIsTransitioning, useRouterService, useTranslationLoaded };
