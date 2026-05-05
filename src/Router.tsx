import {
  ILayoutRoute,
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
  const {
    routes,
    contexts,
    components,
    entryRoute,
    errorComponent,
    notFoundComponent,
  } = config;

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

  const contextChildren: Record<string, AnyRoute> = useMemo(() => {
    const children: Record<string, AnyRoute> = {};

    contexts.forEach((route) => {
      children[route.id] = createRoute({
        getParentRoute: () => {
          if (route.contextId && children[route.contextId]) {
            return children[route.contextId];
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
      }) as AnyRoute;
    });

    return children;
  }, [contexts, rootRoute]);

  const routeChildren: AnyRoute[] = useMemo(() => {
    const children: AnyRoute[] = [];
    const contextChildrenMap: Record<string, AnyRoute[]> = {};

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

    // Initialize contextChildrenMap
    Object.keys(contextChildren).forEach((id) => {
      contextChildrenMap[id] = [];
    });

    // Sort contexts: those with contextId go to their parent, those without go to children
    contexts.forEach((contextConfig) => {
      const route = contextChildren[contextConfig.id];
      if (contextConfig.contextId && contextChildren[contextConfig.contextId]) {
        contextChildrenMap[contextConfig.contextId].push(route);
      } else {
        children.push(route);
      }
    });

    const languageFirstRegion: Record<string, string> = {};

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

        const r = createRoute({
          getParentRoute: () => {
            if (
              routeConfig.contextId &&
              contextChildren[routeConfig.contextId]
            ) {
              return contextChildren[routeConfig.contextId];
            }
            return rootRoute;
          },
          path: createSafeRouterPath({
            localeOrLanguage: locale,
            path: route.path,
          }),
          component: routeConfig.component,
          loader: async ({ params, context }) => {
            if (routeConfig.loader) {
              return routeConfig.loader(
                params,
                { context },
                route.language,
                region,
              );
            }
          },
        }) as AnyRoute;

        if (routeConfig.contextId && contextChildren[routeConfig.contextId]) {
          contextChildrenMap[routeConfig.contextId].push(r);
        } else {
          children.push(r);
        }
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

    // Add children to context routes
    Object.entries(contextChildrenMap).forEach(([id, subChildren]) => {
      if (subChildren.length > 0) {
        contextChildren[id].addChildren(subChildren);
      }
    });

    return children;
  }, [rootRoute, routes, components, entryRoute, contexts, contextChildren]);

  const routeTree = useMemo(
    () => rootRoute.addChildren(routeChildren),
    [rootRoute, routeChildren],
  );

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
