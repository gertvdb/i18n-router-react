import React from "react";
import type {
  ErrorComponentProps,
  NotFoundRouteProps,
} from "@tanstack/react-router";

/**
 * ID of a route context.
 */
export type IRouteContextId = string;

/**
 * ID of a route.
 */
export type IRouteId = string;

/**
 * Locale string in the format "language-region" (e.g., "nl-be").
 */
export type IRouteLocale =
    | `${IRouteLanguage}-${IRouteRegion}`
    | (string & {});

/**
 * Region identifier (e.g., "be", "fr").
 */
export type IRouteRegion =
    | (string & {})
    | "BE" // Belgium
    | "NL" // Netherlands
    | "FR" // France
    | "DE" // Germany
    | "IT" // Italy
    | "ES" // Spain
    | "PT" // Portugal
    | "PL" // Poland
    | "CZ" // Czech Republic
    | "SK" // Slovakia
    | "AT" // Austria
    | "CH" // Switzerland
    | "LU" // Luxembourg
    | "LI" // Liechtenstein
    | "DK" // Denmark
    | "SE" // Sweden
    | "NO" // Norway
    | "FI" // Finland
    | "IS" // Iceland
    | "IE" // Ireland
    | "GB" // United Kingdom
    | "EE" // Estonia
    | "LV" // Latvia
    | "LT" // Lithuania
    | "HU" // Hungary
    | "RO" // Romania
    | "BG" // Bulgaria
    | "GR" // Greece
    | "HR" // Croatia
    | "SI" // Slovenia
    | "RS" // Serbia
    | "BA" // Bosnia and Herzegovina
    | "ME" // Montenegro
    | "MK" // North Macedonia
    | "AL" // Albania
    | "UA" // Ukraine
    | "MD" // Moldova
    | "TR"; // Turkey

/**
 * Language identifier (e.g., "nl", "fr").
 */
export type IRouteLanguage =
    | (string & {})
    | "sq" // Albanian
    | "de" // German
    | "en" // English
    | "fr" // French
    | "nl" // Dutch
    | "it" // Italian
    | "es" // Spanish
    | "pt" // Portuguese
    | "pl" // Polish
    | "cs" // Czech
    | "sk" // Slovak
    | "sl" // Slovenian
    | "hr" // Croatian
    | "sr" // Serbian
    | "bs" // Bosnian
    | "mk" // Macedonian
    | "bg" // Bulgarian
    | "ro" // Romanian
    | "hu" // Hungarian
    | "el" // Greek
    | "sv" // Swedish
    | "da" // Danish
    | "no" // Norwegian
    | "fi" // Finnish
    | "is" // Icelandic
    | "et" // Estonian
    | "lv" // Latvian
    | "lt" // Lithuanian
    | "ga" // Irish
    | "mt" // Maltese
    | "cy" // Welsh
    | "eu" // Basque
    | "ca" // Catalan
    | "gl"; // Galician

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
    language: IRouteLanguage,
    region: IRouteRegion,
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
  locale: IRouteLocale;
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
  language: IRouteLanguage;
  region: IRouteRegion;
}

export interface IRouteTo {
  id: IRouteId;
  localeOrLanguage: IRouteLanguage | IRouteLocale;
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
  locale: IRouteLocale;
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
    language: IRouteLanguage,
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
