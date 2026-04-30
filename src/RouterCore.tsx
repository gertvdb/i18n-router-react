import type {
  AbsoluteHrefParams,
  HrefParams,
  IRoute,
  IRouteId,
  IRouteLanguage,
  IRouteLocale,
  IRouter,
  IRouterConfig,
  IRouteRegion,
  NavigateParams,
} from "@/Types";
import { Route } from "@tanstack/react-router";
import type { AnyRouter } from "@tanstack/react-router";
import { toLocale } from "@/Utils/toLocale";
import { createSafeRouterPath } from "@/Utils/createSafeRouterPath";
import { extractLanguage } from "@/Utils/extractLanguage";

export class RouterCore<TRouter extends AnyRouter> implements IRouter {
  private readonly _router: TRouter;
  private readonly _config: IRouterConfig;
  private readonly _routeMap: Map<IRouteId, IRoute[]>;

  constructor(config: IRouterConfig, router: TRouter) {
    this._config = config;
    this._router = router;
    this._routeMap = this._buildRouteMap(config.routes);
  }

  public static new<TRouter extends AnyRouter>(
    config: IRouterConfig,
    router: TRouter,
  ) {
    return new RouterCore(config, router);
  }

  reload() {
    window.location.reload();
  }

  canGoBack() {
    return this._router.history.canGoBack();
  }

  async goBack() {
    this._router.history.back();
  }

  async navigate<T>({
    to,
    from,
    query,
    params,
    hash,
    method = "push",
    state,
    target = "_self",
  }: NavigateParams<T>) {
    const toRoute = this._route(to.id, to.localeOrLanguage);
    if (!toRoute) {
      return Promise.reject(
        new Error(
          `Route (to) for id "${to.id}" and locale "${to.localeOrLanguage}" not found.`,
        ),
      );
    }

    if (target === "_blank") {
      const href = this.href({
        id: to.id,
        locale: to.localeOrLanguage,
        query: query,
        params: params,
        hash: hash,
      });

      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      const replace = method !== "push";
      const options = {
        to: toRoute.fullPath,
        ...(from && {
          from: from,
        }),
        ...(query && { search: query }),
        ...(params && { params }),
        ...(hash && { hash }),
        replace: replace,
        ...(state && { state }),
      };

      await this._router.navigate(options);
    }
  }

  path(id: IRouteId, locale: IRouteLocale): string;
  path(id: IRouteId, language: IRouteLanguage, region: IRouteRegion): string;
  path(
    id: IRouteId,
    localeOrLanguage: IRouteLocale | IRouteLanguage,
    region?: IRouteRegion,
  ): string {
    let locale: IRouteLocale;
    if (region !== undefined) {
      locale = toLocale({
        language: localeOrLanguage as IRouteLanguage,
        region,
      });
    } else {
      locale = localeOrLanguage as IRouteLocale;
    }

    const toRoute = this._route(id, locale);
    if (!toRoute) {
      console.warn(
        `Route (to) for id "${id}" and locale "${locale}" not found.`,
      );
      return "";
    }
    this._router.buildLocation({ to: toRoute.fullPath });
    return toRoute.fullPath;
  }

  href({ id, locale, query, params, hash }: HrefParams) {
    const toRoute = this._route(id, locale);
    if (!toRoute) {
      console.warn(
        `Route (to) for id "${id}" and locale "${locale}" not found.`,
      );
      return "";
    }

    const options = {
      to: toRoute.fullPath,
      ...(query && { search: query }),
      ...(params && { params: params }),
      ...(hash && { hash: hash }),
    };

    const parsedLocation = this._router.buildLocation(options);
    return parsedLocation.href;
  }

  relative({ id, locale, query, params, hash }: HrefParams) {
    return this.href({
      id: id,
      locale: locale,
      query: query,
      params: params,
      hash: hash,
    });
  }

  absolute({ baseUrl, id, locale, query, params, hash }: AbsoluteHrefParams) {
    const href = this.href({
      id: id,
      locale: locale,
      query: query,
      params: params,
      hash: hash,
    });
    const strippedHref = href.startsWith("/") ? href.slice(1) : href;
    const strippedBaseUrl = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;
    return `${strippedBaseUrl}/${strippedHref}`;
  }

  /*
    isActive(id: IRouteId, localeOrLanguage: IRouteLocale | IRouteLanguage): boolean {
        const currentLocation = this._router.stores.__store.get().location;

        const extractedLocale = extractLocale({pathname: currentLocation.pathname});
        if (extractedLocale === localeOrLanguage) {
            const route = this._route(id, extractedLocale);
            if (route) {
                return currentLocation.pathname === route.fullPath;
            }
            return false;
        }

        const extractedLanguage = extractLanguage({locale: extractedLocale});
        if (extractedLanguage === localeOrLanguage) {
            const regions = this.regionsByLanguage()[extractedLanguage];
            return regions.some(region => {
                const buildLocale = toLocale({language: extractedLanguage, region: region});
                const route = this._route(id, buildLocale);
                return route && currentLocation.pathname === route.fullPath;
            });
        }

        return false;
    }*/

  getRouteHierarchy(id: IRouteId): IRoute[] {
    return this._routeMap.get(id) ?? [];
  }

  hasRoute(id: IRouteId, locale: IRouteLocale) {
    const route = this._route(id, locale);
    return !!route;
  }

  defaultLanguage(): IRouteLanguage {
    return extractLanguage({
      locale: this._config.entry.localeOrLanguage,
    }) as IRouteLanguage;
  }

  languages(): IRouteLanguage[] {
    const languages = this._config.routes.map((route) => route.language);
    return Array.from(new Set(languages));
  }

  regionsByLanguage(): Record<IRouteLanguage, IRouteRegion[]> {
    const result: Record<IRouteLanguage, Set<IRouteRegion>> = {};

    this._config.routes.forEach((route) => {
      const language = route.language;
      const regions = route.regions;

      if (!result[language]) {
        result[language] = new Set();
      }
      regions.forEach((region) => result[language].add(region));
    });

    const regions: Record<IRouteLanguage, IRouteRegion[]> = {};
    for (const language in result) {
      regions[language] = Array.from(result[language]);
    }

    return regions;
  }

  private _buildRouteMap(routes: IRoute[]): Map<IRouteId, IRoute[]> {
    const routeMap = new Map<IRouteId, IRoute[]>();

    routes.forEach((route) => {
      const hierarchy: IRoute[] = [route];
      let currentRoute = route;

      while (currentRoute.parentId) {
        const parent = routes.find(
          (r) =>
            r.id === currentRoute.parentId &&
            r.language === currentRoute.language,
        );
        if (parent) {
          hierarchy.unshift(parent);
          currentRoute = parent;
        } else {
          break;
        }
      }

      routeMap.set(route.id, hierarchy);
    });

    return routeMap;
  }

  private _route(
    id: IRouteId,
    localeOrLanguage: IRouteLocale | IRouteLanguage,
  ): Route | null {
    const { components, routes } = this._config;

    const routeConfig = components[id] ?? null;
    if (!routeConfig) {
      return null;
    }

    let route = routes.find((route) =>
      route.regions.some(
        (region) =>
          route.id === id &&
          toLocale({ language: route.language, region }) === localeOrLanguage,
      ),
    );

    // Check for language only link (will redirect to locale link [with first region]).
    if (!route) {
      route = routes.find(
        (route) => route.id === id && route.language === localeOrLanguage,
      );
    }

    if (!route) {
      return null;
    }

    const path = createSafeRouterPath({
      localeOrLanguage: localeOrLanguage,
      path: route.path,
    });

    const routesByPath = this._router.routesByPath;
    return routesByPath[path] ?? null;
  }
}
