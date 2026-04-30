import React from "react";
import type { NotFoundRouteProps } from "@tanstack/react-router";

export type IRouteId = string;
export type IRouteLocale = string; // nl-nl, en-nl, ...
export type IRouteRegion = string; // be , fr
export type IRouteLanguage = string; // nl, fr

export type IRoutePath = string;

export interface IRouteComponent {
  component: () => React.ReactNode;
}
export type IRouteComponents = Record<IRouteId, IRouteComponent>;

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
export type IRoutes = IRoute[];

export interface IRouteEntry {
  id: IRouteId;
  localeOrLanguage: IRouteLanguage | IRouteLocale;
}

export interface IRouterConfig {
  entry: IRouteEntry;
  components: IRouteComponents;
  routes: IRoutes;
  notFoundComponent: (props: NotFoundRouteProps) => React.ReactNode;
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
  //isActive(id: IRouteId, localeOrLanguage: IRouteLocale|IRouteLanguage): boolean;
  hasRoute(id: IRouteId, locale: IRouteLocale): boolean;
  defaultLanguage(): IRouteLanguage;
  languages(): IRouteLanguage[];
  regionsByLanguage(): Record<IRouteLanguage, IRouteRegion[]>;
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
  isLoaded(language: IRouteLanguage): boolean;
  load(language: IRouteLanguage, messages: ITranslations): void;
}

export type ITranslations = Record<string, string>;

export interface RouterProps {
  config: IRouterConfig;
  loadTranslation(
    language: IRouteLanguage,
  ): ITranslations | Promise<ITranslations>;
}

export interface RouteParamsProps {
  router: IRouter;
  route: ILocaleRoute;
}

export interface IRouteQueryProps extends RouteParamsProps {
  keys?: string[];
}