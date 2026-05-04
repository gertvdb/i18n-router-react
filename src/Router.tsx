import {
  IRoute,
  IRouter,
  IRouteRegion,
  ITranslations,
  RouterProps,
} from "@/Types";
import { useMemo, type FC, useEffect } from "react";
import {
  type AnyRoute,
  createRootRouteWithContext,
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

export const Router = <TContext extends Record<string, unknown>>(
  props: RouterProps<TContext>,
) => {
  const { config, translations, context } = props;

  const { routes, components, entryRoute } = config;

  const rootRoute = useMemo(
    () =>
      createRootRouteWithContext<TContext>()({
        component: () => <RouterOutlet />,
        notFoundComponent: config.notFoundComponent,
        errorComponent: config.errorComponent,
        context: () => context,
      }),
    [config.notFoundComponent, config.errorComponent, context],
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

  const routeChildren: AnyRoute[] = useMemo(() => {
    const children: AnyRoute[] = [];
    const languageFirstRegion: Record<string, string> = {};

    const entry = routes.find(
      (route: { id: any; language: string }) =>
        route.id === entryRoute.id &&
        route.language ===
          extractLanguage({ locale: entryRoute.localeOrLanguage }),
    );

    if (entry) {
      const redirectTo = createSafeRouterPath({
        localeOrLanguage: entryRoute.localeOrLanguage,
        path: entry.path,
      });

      // Entry Route
      children.push(
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

        children.push(
          createRoute({
            getParentRoute: () => rootRoute,
            path: createSafeRouterPath({
              localeOrLanguage: locale,
              path: route.path,
            }),
            component: routeConfig.component,
            beforeLoad: ({ context }) => {
              if (routeConfig.beforeLoad) {
                routeConfig.beforeLoad({ context }, route.language, region);
              }
            },
            loader: async ({ params, context }) => {
              if (routeConfig.loader) {
                routeConfig.loader(params, { context }, route.language, region);
              }
            },
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
          children.push(
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

    return children;
  }, [rootRoute, routes, components, entryRoute]);

  const routeTree = useMemo(
    () => rootRoute.addChildren(routeChildren),
    [rootRoute, routeChildren],
  );

  const tanstackRouter = useMemo(
    () =>
      createRouter({
        routeTree,
        trailingSlash: "never",
        defaultNotFoundComponent: config.notFoundComponent,
        defaultErrorComponent: config.errorComponent,
        context: context,
      }),
    [routeTree, config.notFoundComponent, config.errorComponent, context],
  );

  const router: IRouter = useMemo(
    () =>
      createRouterCore<TContext, typeof tanstackRouter>({
        config: config,
        router: tanstackRouter,
      }),
    [tanstackRouter, config],
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

      const messages = await translations(lang);
      const compiledMessages = toCompiledMessages(messages);
      linguiI18N.load(lang, compiledMessages as ITranslations);
      linguiI18N.activate(lang);
      i18n.load(lang, compiledMessages as ITranslations);
    })();
  }, [i18n, linguiI18N, translations, router]);

  useEffect(() => {
    router.languages().forEach(async (lang) => {
      const messages = await translations(lang);
      const compiledMessages = toCompiledMessages(messages);
      i18n.load(lang, compiledMessages as ITranslations);
    });
  }, [i18n, translations, router]);

  return (
    <RouteI18nContext.Provider value={i18n}>
      <LinguiI18nProvider i18n={linguiI18N}>
        <RouterCoreContext.Provider value={router}>
          <RouterProvider router={tanstackRouter} />
        </RouterCoreContext.Provider>
      </LinguiI18nProvider>
    </RouteI18nContext.Provider>
  );
};
