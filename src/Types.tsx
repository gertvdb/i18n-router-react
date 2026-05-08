import React from "react";
import type {
  ErrorComponentProps,
  NotFoundRouteProps,
} from "@tanstack/react-router";
import { ILanguageString, ILocale, IRegionString } from "@gertvdb/locale";

/**
 * ID of a route context.
 */
export type IRouteContextId = string;

/**
 * ID of a route.
 */
export type IRouteId = string;

/**
 * Path string for a route.
 */
export type IRoutePath = string;

/**
 * Configuration for a route component.
 */
export interface IRouteComponent<TLoaderData = any, TServices = any> {
  /**
   * The React component to render for this route.
   */
  component: () => React.ReactNode;
  /**
   * Optional context ID if this route should be nested under a specific context.
   */
  contextId?: IRouteContextId;

  /**
   * Optional loader function to fetch data for this route.
   */
  loader?: (
    params: any,
    opts: { services: TServices },
    locale: ILocale,
  ) => Promise<TLoaderData> | TLoaderData;
}

/**
 * A record of route components indexed by their route ID.
 */
export type IRouteComponents<TContext = any> = Record<
  IRouteId,
  IRouteComponent<any, TContext>
>;

/**
 * Represents a route identified by its ID and locale.
 */
export interface ILocaleRoute {
  id: IRouteId;
  locale: ILocale;
}

/**
 * Definition of a route including its path and supported languages/regions.
 */
export interface IRoute {
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
export interface IContextRoute<TRouteContext = any, TServices = any> {
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
export interface IRouteRedirect {
  from: IRoutePath;
  to: ILocaleRoute;
}

export type IRoutes = IRoute[];
export type IRouteContexts = IContextRoute[];
export type IRouteRedirects = IRouteRedirect[];

/**
 * Defines the initial entry point of the application.
 */
export interface IRouteEntry {
  id: IRouteId;
  language: ILanguageString;
  region: IRegionString;
}

export interface IRouteTo {
  id: IRouteId;
  locale: ILocale;
}

/**
 * Main configuration object for the Router.
 */
export interface IRouterConfig<TServices = any> {
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
  notFoundComponent: (props: NotFoundRouteProps) => React.ReactNode;
  /**
   * Component to render when an error occurs during routing.
   */
  errorComponent: (props: ErrorComponentProps) => React.ReactNode;
}

/**
 * The core Router interface providing navigation and path utilities.
 */
export interface IRouter {
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
  navigate<T>({
    to,
    from,
    query,
    params,
    hash,
    method,
    state,
    target,
  }: NavigateParams<T>): Promise<void>;
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
  absolute({
    baseUrl,
    id,
    locale,
    query,
    params,
    hash,
  }: AbsoluteHrefParams): string;
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

export type NavigateMethod = "replace" | "push";
export type NavigateTarget = "_blank" | "_self";

/**
 * Parameters for the navigate function.
 */
export type NavigateParams<T> = {
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

export type AbsoluteHrefParams = {
  baseUrl: string;
} & HrefParams;

/**
 * Parameters for generating a href.
 */
export type HrefParams = {
  id: IRouteId;
  locale: ILocale;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
  hash?: string;
};

/**
 * Interface for i18n support within the router.
 */
export interface IRouterI18N {
  /**
   * Translates a key to a React element.
   */
  trans: (
    key: string,
    variables: Record<string, unknown>,
  ) => React.ReactElement | null;
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
export type ITranslations = Record<string, string>;

/**
 * Props for the Router component.
 */
export interface Router18nProviderProps<TServices = Record<string, unknown>> {
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
  translations(
    language: ILanguageString,
    services: TServices,
  ): ITranslations | Promise<ITranslations>;
}

export interface RoutePathProps {
  router: IRouter;
  route: ILocaleRoute;
}

export interface RouteParamsProps<T, TSelected = T> extends RoutePathProps {
  select?: (match: T) => TSelected;
}

export interface RouteContextProps<T, TSelected = T> extends RoutePathProps {
  select?: (match: T) => TSelected;
}

export interface RouteLoaderDataProps<T, TSelected = T> extends RoutePathProps {
  select?: (match: T) => TSelected;
}

export interface IRouteQueryProps<T, TSelected = T> extends RoutePathProps {
  select?: (match: T) => TSelected;
}

export interface UseRouterServiceProps<T, R = any> {
  serviceToken: T;
}
