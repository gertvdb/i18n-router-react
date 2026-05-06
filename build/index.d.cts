import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import { NotFoundRouteProps, ErrorComponentProps } from '@tanstack/react-router';

/**
 * ID of a route context.
 */
type IRouteContextId = string;
/**
 * ID of a route.
 */
type IRouteId = string;
/**
 * Locale string in the format "language-region" (e.g., "nl-be").
 */
type IRouteLocale = string;
/**
 * Region identifier (e.g., "be", "fr").
 */
type IRouteRegion = string;
/**
 * Language identifier (e.g., "nl", "fr").
 */
type IRouteLanguage = string;
/**
 * Path string for a route.
 */
type IRoutePath = string;
/**
 * Configuration for a route component.
 */
interface IRouteComponent<TLoaderData = any, TContext = any> {
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
        context: TContext;
    }, language: IRouteLanguage, region: IRouteRegion) => Promise<TLoaderData> | TLoaderData;
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
    locale: IRouteLocale;
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
    language: IRouteLanguage;
    /**
     * List of regions supported by this route definition.
     */
    regions: IRouteRegion[];
    /**
     * The URL path for this route.
     */
    path: IRoutePath;
}
/**
 * Definition of a context route, typically used for wrapping other routes with shared logic or data.
 */
interface IContextRoute<TRouteContext = any, TContext = any> {
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
        context: TContext;
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
    language: IRouteLanguage;
    region: IRouteRegion;
}
interface IRouteTo {
    id: IRouteId;
    localeOrLanguage: IRouteLanguage | IRouteLocale;
}
/**
 * Layout route definition.
 */
interface ILayoutRoute<TRouteContext = any, TContext = any> {
    id: IRouteId;
    beforeLoad?: (opts: {
        context: TContext;
    }) => Promise<TRouteContext> | TRouteContext | void;
}
/**
 * Main configuration object for the Router.
 */
interface IRouterConfig<TContext = any> {
    /**
     * Mapping of route IDs to their components and loaders.
     */
    components: IRouteComponents<TContext>;
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
    path(id: IRouteId, locale: IRouteLocale): string;
    path(id: IRouteId, language: IRouteLanguage, region: IRouteRegion): string;
    /**
     * Gets the internal TanStack route ID.
     */
    id(id: IRouteId, locale: IRouteLocale): string;
    id(id: IRouteId, language: IRouteLanguage, region: IRouteRegion): string;
    /**
     * Checks if a route exists for the given ID and locale.
     */
    hasRoute(id: IRouteId, locale: IRouteLocale): boolean;
    /**
     * Gets the default application language.
     */
    defaultLanguage(): IRouteLanguage;
    /**
     * Gets all supported languages.
     */
    languages(): IRouteLanguage[];
    /**
     * Gets a mapping of languages to their supported regions.
     */
    regionsByLanguage(): Record<IRouteLanguage, IRouteRegion[]>;
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
    locale: IRouteLocale;
    query?: Record<string, unknown>;
    params?: Record<string, unknown>;
    hash?: string;
};
/**
 * Interface for i18n support within the router.
 */
interface IRouteI18N {
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
    activate(language: IRouteLanguage): void;
    /**
     * Gets the current language.
     */
    current(): IRouteLanguage;
    /**
     * Subscribes to language changes.
     */
    subscribe(listener: () => void): () => void;
    /**
     * Checks if a language's translations are loaded.
     */
    isLoaded(language: IRouteLanguage): boolean;
    /**
     * Loads translations for a language.
     */
    load(language: IRouteLanguage, messages: ITranslations): void;
}
/**
 * Record of translation keys and their values.
 */
type ITranslations = Record<string, string>;
/**
 * Props for the Router component.
 */
interface RouterProps<TContext = Record<string, unknown>> {
    /**
     * Initial context for the router.
     */
    context: TContext;
    /**
     * Router configuration.
     */
    config: IRouterConfig<TContext>;
    /**
     * Function to load translations for a given language.
     */
    translations(language: IRouteLanguage, context: TContext): ITranslations | Promise<ITranslations>;
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

/**
 * The Router component is the entry point for the localized routing system.
 * It wraps the TanStack Router and provides i18n support via Lingui.
 *
 * @param props - The props for the Router component.
 * @returns A RouterProvider wrapped with I18n and Context providers.
 */
declare const Router: <TContext extends Record<string, unknown>>(props: RouterProps<TContext>) => react_jsx_runtime.JSX.Element;

declare const RouterCoreContext: React.Context<IRouter | undefined>;

declare const RouteI18nContext: React.Context<IRouteI18N | undefined>;

declare const useRouter: () => IRouter;

declare const useRouteI18n: () => IRouteI18N;

declare const useRouteLanguage: () => IRouteLanguage;

declare const useRouteLocale: () => IRouteLocale;

declare const useRouteRegion: () => IRouteRegion | null;

declare function useRouteParams<T, TSelected = T>({ router, route, select, }: RouteParamsProps<T, TSelected>): TSelected | T;

declare function useRouteQuery<T, TSelected = T>({ router, route, select, }: IRouteQueryProps<T, TSelected>): TSelected;

declare function useRouteLoaderData<T, TSelected = T>({ router, route, select, }: RouteLoaderDataProps<T, TSelected>): TSelected | T;

declare const useRouteIsTransitioning: () => boolean;

declare const useTranslationLoaded: () => boolean;

declare const useRouterBootstrapped: () => boolean;

declare const createRouterConfig: ({ routeEntry, components, routes, routeContexts, notFoundComponent, errorComponent, }: {
    routeEntry: IRouteEntry;
    components: IRouteComponents;
    routes: IRoutes;
    routeContexts: IRouteContexts;
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

export { type AbsoluteHrefParams, type HrefParams, type IContextRoute, type ILayoutRoute, type ILocaleRoute, type IRoute, type IRouteComponent, type IRouteComponents, type IRouteContextId, type IRouteContexts, type IRouteEntry, type IRouteI18N, type IRouteId, type IRouteLanguage, type IRouteLocale, type IRoutePath, type IRouteQueryProps, type IRouteRedirect, type IRouteRedirects, type IRouteRegion, type IRouteTo, type IRouter, type IRouterConfig, type IRoutes, type ITranslations, type NavigateMethod, type NavigateParams, type NavigateTarget, type RouteContextProps, RouteI18nContext, type RouteLoaderDataProps, type RouteParamsProps, type RoutePathProps, Router, RouterCoreContext, type RouterProps, createRouterConfig, extractLanguage, extractRegion, toLocale, useRouteI18n, useRouteIsTransitioning, useRouteLanguage, useRouteLoaderData, useRouteLocale, useRouteParams, useRouteQuery, useRouteRegion, useRouter, useRouterBootstrapped, useTranslationLoaded };
