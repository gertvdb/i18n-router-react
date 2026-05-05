import {
  IRoute,
  IRouter,
  IRouteRegion,
  ITranslations,
  RouterProps,
} from "@/Types";
import { useEffect, useMemo } from "react";
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
  const {
    routes,
    contexts,
    components,
    entryRoute,
    errorComponent,
    notFoundComponent,
  } = config;

  let idRoutes: Record<string, AnyRoute> = {};
  let realRoutes: Record<string, AnyRoute> = {};
  let redirectRoutes: Record<string, AnyRoute> = {};

  // REGISTER ROOT ROUTE
  const rootRoute = useMemo(
    () =>
      createRootRouteWithContext<TContext>()({
        component: () => <RouterOutlet />,
        notFoundComponent: notFoundComponent,
        errorComponent: errorComponent,
        context: () => context,
      }),
    [notFoundComponent, errorComponent, context],
  );
  // END REGISTER ROOT ROUTE

  // REGISTER CONTEXT ROUTES
  contexts.forEach((route) => {
    idRoutes[route.id] = createRoute({
      getParentRoute: () => {
        if (route.contextId) {
          return idRoutes[route.contextId];
        }
        return rootRoute;
      },
      id: route.id,
      beforeLoad: (opts) => {
        if (route.beforeLoad) {
          return route.beforeLoad({
            ...opts,
            context: opts.context as TContext,
          });
        }
      },
      component: () => <RouterOutlet />,
    });
  });
  // END REGISTER CONTEXT ROUTES

  // REGISTER ROUTES
  const languageFirstRegion: Record<string, string> = {};

  routes.forEach((route) => {
    if (!languageFirstRegion[route.language] && route.regions.length > 0) {
      languageFirstRegion[route.language] = route.regions[0];
    }

    const currentRouteConfig = components[route.id];
    if (!currentRouteConfig) {
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

      const isFirstRegion = languageFirstRegion[route.language] === region;

      const path = createSafeRouterPath({
        localeOrLanguage: locale,
        path: route.path,
      });

      realRoutes[path] = createRoute({
        getParentRoute: () => {
          if (currentRouteConfig.contextId) {
            return idRoutes[currentRouteConfig.contextId];
          }
          return rootRoute;
        },
        path: path,
        component: currentRouteConfig.component,
        loader: async ({ params, context }) => {
          if (currentRouteConfig.loader) {
            return currentRouteConfig.loader(
              params,
              { context },
              route.language,
              region,
            );
          }
        },
      }) as AnyRoute;

      if (isFirstRegion) {
        const redirectPath = createSafeRouterPath({
          localeOrLanguage: route.language,
          path: route.path,
        });

        const targetPath = createSafeRouterPath({
          localeOrLanguage: locale,
          path: route.path,
        });

        redirectRoutes[redirectPath] = createRoute({
          getParentRoute: () => {
            if (currentRouteConfig.contextId) {
              return idRoutes[currentRouteConfig.contextId];
            }
            return rootRoute;
          },
          path: redirectPath,
          loader: async () => {
            throw redirect({ to: targetPath });
          },
        });
      }
    });
  });
  // END REGISTER ROUTES

  const routeList = [
    ...Object.values(idRoutes),
    ...Object.values(realRoutes),
    ...Object.values(redirectRoutes),
  ];

  // BUILD ROUTER
  const routeTree = useMemo(() => {
    return rootRoute.addChildren(routeList);
  }, [rootRoute, routeList]);

  console.log(routeTree);

  const tanstackRouter = useMemo(
    () =>
      createRouter({
        routeTree,
        trailingSlash: "never",
        defaultNotFoundComponent: notFoundComponent,
        defaultErrorComponent: errorComponent,
        context: context,
      }),
    [routeTree, notFoundComponent, errorComponent, context],
  );

  const router: IRouter = useMemo(
    () =>
      createRouterCore<TContext, typeof tanstackRouter>({
        config: config,
        router: tanstackRouter,
        routes: routeList,
      }),
    [tanstackRouter, config],
  );
  // END BUILD ROUTER

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

/*
TODO !!!!!

// REDIRECT ENTRY ROUTE
const findEntry = routes.find(
    (route: { id: any; language: string }) =>
        route.id === entryRoute.id &&
        route.language ===
        extractLanguage({ locale: entryRoute.localeOrLanguage }),
);

if (!findEntry) {
  throw new Error(
      "entryRoute not found: " +
      entryRoute.id +
      " - " +
      entryRoute.localeOrLanguage
  );
}

const redirectToEntry = createSafeRouterPath({
  localeOrLanguage: findEntry.language,
  path: findEntry.path,
});

allRoutes['entry'] = createRoute({
      getParentRoute: () => {
        return rootRoute;
      },
      path: "/",
      loader: async () => {
        throw redirect({to: redirectToEntry});
      },
    }
);

*/
