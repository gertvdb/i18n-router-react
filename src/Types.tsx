import React from "react";
import type {
  ErrorComponentProps,
  NotFoundRouteProps,
} from "@tanstack/react-router";

export type IRouteContextId = string;
export type IRouteId = string;
export type IRouteLocale = string; // nl-nl, en-nl, ...
export type IRouteRegion = string; // be , fr
export type IRouteLanguage = string; // nl, fr

export type IRoutePath = string;

export interface IRouteComponent<TLoaderData = any, TContext = any> {
  component: () => React.ReactNode;
  contextId?: IRouteContextId;
  loader?: (
    params: any,
    opts: { context: TContext },
    language: IRouteLanguage,
    region: IRouteRegion,
  ) => Promise<TLoaderData> | TLoaderData;
}

export type IRouteComponents<TContext = any> = Record<
  IRouteId,
  IRouteComponent<any, TContext>
>;

export interface ILocaleRoute {
  id: IRouteId;
  locale: IRouteLocale;
}

export interface IRoute {
  id: IRouteId;
  language: IRouteLanguage;
  regions: IRouteRegion[];
  path: IRoutePath;
}

export interface IRouteContext<TRouteContext = any, TContext = any> {
  id: IRouteContextId;
  contextId?: IRouteContextId;
  beforeLoad?: (opts: {
    context: TContext;
  }) => Promise<TRouteContext> | TRouteContext | void;
}

export type IRoutes = IRoute[];
export type IRouteContexts = IRouteContext[];

export interface IRouteEntry {
  id: IRouteId;
  localeOrLanguage: IRouteLanguage | IRouteLocale;
}

export interface ILayoutRoute<TRouteContext = any, TContext = any> {
  id: IRouteId;
  beforeLoad?: (opts: {
    context: TContext;
  }) => Promise<TRouteContext> | TRouteContext | void;
}

export interface IRouterConfig<TContext = any> {
  components: IRouteComponents<TContext>;
  routes: IRoutes;
  contexts: IRouteContexts;
  entryRoute: IRouteEntry;
  notFoundComponent: (props: NotFoundRouteProps) => React.ReactNode;
  errorComponent: (props: ErrorComponentProps) => React.ReactNode;
}

export interface IRouter {
  reload(): void;
  canGoBack(): boolean;
  goBack(): Promise<void>;
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
  href({ id, locale, query, params, hash }: HrefParams): string;
  relative({ id, locale, query, params, hash }: HrefParams): string;
  absolute({
    baseUrl,
    id,
    locale,
    query,
    params,
    hash,
  }: AbsoluteHrefParams): string;
  path(id: IRouteId, locale: IRouteLocale): string;
  path(id: IRouteId, language: IRouteLanguage, region: IRouteRegion): string;
  getRouteHierarchy(id: IRouteId): IRoute[];
  hasRoute(id: IRouteId, locale: IRouteLocale): boolean;
  defaultLanguage(): IRouteLanguage;
  languages(): IRouteLanguage[];
  regionsByLanguage(): Record<IRouteLanguage, IRouteRegion[]>;
  isBootstrapped(): boolean;
}

export type NavigateMethod = "replace" | "push";
export type NavigateTarget = "_blank" | "_self";

export type NavigateParams<T> = {
  to: IRouteEntry;
  from?: string;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
  hash?: string;
  method?: NavigateMethod;
  state?: T;
  target?: NavigateTarget;
};

export type AbsoluteHrefParams = {
  baseUrl: string;
} & HrefParams;

export type HrefParams = {
  id: IRouteId;
  locale: IRouteLocale;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
  hash?: string;
};

export interface IRouteI18N {
  trans: (
    key: string,
    variables: Record<string, unknown>,
  ) => React.ReactElement | null;
  t: (key: string, variables?: Record<string, unknown>) => string;
  activate(language: IRouteLanguage): void;
  current(): IRouteLanguage;
  subscribe(listener: () => void): () => void;
  isLoaded(language: IRouteLanguage): boolean;
  load(language: IRouteLanguage, messages: ITranslations): void;
}

export type ITranslations = Record<string, string>;

export interface RouterProps<TContext = Record<string, unknown>> {
  context: TContext;
  config: IRouterConfig<TContext>;
  translations(
    language: IRouteLanguage,
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
