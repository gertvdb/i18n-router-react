import type {
  IRoute,
  IRouteLanguage,
  IRouter,
  IRouterConfig,
  IRouteRegion,
  ITranslations,
  RouterProps,
} from "@/Types";
import { useMemo, type FC, useEffect, useState } from "react";
import {
  type AnyRoute,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  RouterProvider,
} from "@tanstack/react-router";
import { RouterCoreContext } from "@/RouterCoreContext";
import { toLocale } from "@/Utils/toLocale";
import { createSafeRouterPath } from "@/Utils/createSafeRouterPath";
import { createRouterCore } from "@/Utils/createRouterCore";
import { extractLanguage } from "@/Utils/extractLanguage";
import { I18n as LinguiI18n } from "@lingui/core";
import { createRouteI18n } from "@/Utils/createRouteI18n";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { RouteI18nContext } from "@/RouteI18nContext";
import { RouterOutlet } from "@/RouterOutlet";
import { extractLocale } from "@/Utils/extractLocale";
import { toCompiledMessages } from "@/Utils/toCompiledMessages";
import { RouteLoadingContext } from "@/RouteLoadingContext";

export const Router: FC<RouterProps> = (props: RouterProps) => {
  const { config, loadTranslation } = props;
  const { routes, components, entry } = config;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const rootRoute = createRootRoute({
    component: () => <RouterOutlet />,
    notFoundComponent: config.notFoundComponent,
  });

  const routeChildren: AnyRoute[] = [];
  const languageFirstRegion: Record<string, string> = {};

  const entryRoute = routes.find(
    (route) =>
      route.id === entry.id &&
      route.language === extractLanguage({ locale: entry.localeOrLanguage }),
  );

  if (entryRoute) {
    const redirectTo = createSafeRouterPath({
      localeOrLanguage: entry.localeOrLanguage,
      path: entryRoute.path,
    });

    // Entry Route
    routeChildren.push(
      createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        loader: async () => {
          throw redirect({ to: redirectTo });
        },
      }) as AnyRoute,
    );
  }

  // Other Routes
  routes.forEach((route: IRoute) => {
    if (!languageFirstRegion[route.language] && route.regions.length > 0) {
      languageFirstRegion[route.language] = route.regions[0];
    }

    const routeConfig = components[route.id];
    if (!routeConfig) {
      return; // Skip this route if no configuration is found.
    }

    const regions = route.regions;
    if (regions.length === 0) {
      throw new Error(
        "IRoutes config for route: " +
          route.id +
          " - " +
          route.language +
          " must at least contain one region",
      );
    }

    regions.forEach((region: IRouteRegion) => {
      const locale = toLocale({ language: route.language, region: region });

      routeChildren.push(
        createRoute({
          getParentRoute: () => rootRoute,
          path: createSafeRouterPath({
            localeOrLanguage: locale,
            path: route.path,
          }),
          notFoundComponent: config.notFoundComponent,
          component: routeConfig.component,
          /*
                TODO : generic way of translation metadata
                loader: async () => {
                    document.title = route.title(locale, language, region);
                    return {};
                },
                */
        }) as AnyRoute,
      );
    });

    // Redirect from /language/path to /language-firstRegion/path
    const firstRegion = languageFirstRegion[route.language];
    if (firstRegion) {
      const firstLocale = toLocale({
        language: route.language,
        region: firstRegion,
      });
      const languagePath =
        "/" +
        route.language.toLowerCase() +
        (route.path === "/" ? "" : route.path.toLowerCase());
      const targetPath = createSafeRouterPath({
        localeOrLanguage: firstLocale,
        path: route.path,
      });

      if (languagePath !== targetPath) {
        routeChildren.push(
          createRoute({
            getParentRoute: () => rootRoute,
            path: languagePath,
            loader: async () => {
              throw redirect({ to: targetPath });
            },
          }) as AnyRoute,
        );
      }
    }
  });

  const routeTree = rootRoute.addChildren(routeChildren);

  const tanstackRouter = useMemo(
    () =>
      createRouter({
        routeTree,
        trailingSlash: "never",
        defaultNotFoundComponent: config.notFoundComponent,
      }),
    [routeTree, config.notFoundComponent],
  );

  const router: IRouter = useMemo(
    () =>
      createRouterCore({
        config,
        router: tanstackRouter,
      }),
    [tanstackRouter, config],
  );

  const linguiI18N = useMemo(
    () =>
      new LinguiI18n({
        missing: (locale, key) => {
          console.warn(`MISSING TRANSLATION: ${key} in ${locale}`);
          return "";
        },
      }),
    [],
  );

  const i18n = useMemo(
    () => createRouteI18n({ i18n: linguiI18N }),
    [linguiI18N],
  );

  // Active so we render through in <LinguiI18nProvider>, loading is handle by <RouteLoadingContext>
  linguiI18N.activate(router.defaultLanguage());

  // Extract locale only on first load or refresh.
  useEffect(() => {
    (async () => {
      const extractedLocale = extractLocale({
        pathname: window.location.pathname,
      });
      const lang = extractedLocale
        ? extractLanguage({ locale: extractedLocale })
        : router.defaultLanguage();

      const messages = await loadTranslation(lang);
      const compiledMessages = toCompiledMessages(messages);
      linguiI18N.load(lang, compiledMessages as ITranslations);
      linguiI18N.activate(lang);
      setIsLoaded(true);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    router.languages().forEach(async (lang) => {
      const messages = await loadTranslation(lang);
      const compiledMessages = toCompiledMessages(messages);
      i18n.load(lang, compiledMessages as ITranslations);
    });
  }, [i18n, loadTranslation, router]);

  return (
    <RouteI18nContext.Provider value={i18n}>
      <LinguiI18nProvider i18n={linguiI18N}>
        <RouterCoreContext.Provider value={router}>
          <RouteLoadingContext.Provider value={!isLoaded}>
            <RouterProvider router={tanstackRouter} />
          </RouteLoadingContext.Provider>
        </RouterCoreContext.Provider>
      </LinguiI18nProvider>
    </RouteI18nContext.Provider>
  );
};
