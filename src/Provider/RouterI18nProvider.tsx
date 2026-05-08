import { IRouter, ITranslations, Router18nProviderProps } from "@/Types";
import { useEffect, useMemo } from "react";
import {
  type AnyRoute,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
  RouterProvider as TanstackRouterProvider,
} from "@tanstack/react-router";
import { RouterContext } from "@/Context/RouterContext";
import { createSafeRouterPath } from "@/Utils/createSafeRouterPath";
import { createRouterCore } from "@/Utils//Router/createRouterCore";
import { I18n as LinguiI18n, type Messages } from "@lingui/core";
import { createRouterI18n } from "@/Utils/Router/createRouterI18n";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { RouterI18nContext } from "@/Context/RouterI18nContext";
import { RouterOutlet } from "@/Components/RouterOutlet";
import { extractRouteLocale } from "@/Utils/Route/extractRouteLocale";
import { ServiceContainer } from "react-service-container";
import { compileMessage } from "@lingui/message-utils/compileMessage";
import { createLocale, IRegionString } from "@gertvdb/locale";

/**
 * The Router component is the entry point for the localized routing system.
 * It wraps the TanStack Router and provides i18n support via Lingui.
 *
 * @param props - The props for the Router component.
 * @returns A RouterProvider wrapped with I18n and Context providers.
 */
export const RouterI18nProvider = <TServices extends Record<string, unknown>>(
  props: Router18nProviderProps<TServices>,
) => {
  const { config, translations, services } = props;

  const {
    routes: routesConfig,
    routeContexts: routeContextsConfig,
    routeRedirects: routeRedirectsConfig, // TODO: Implement this later on...
    components,
    routeEntry,
    errorComponent,
    notFoundComponent,
  } = config;

  let routeContexts: Record<string, AnyRoute> = {};
  let routes: Record<string, AnyRoute> = {};
  let routeRedirects: Record<string, AnyRoute> = {};

  // REGISTER ROOT ROUTE
  const rootRoute = useMemo(
    () =>
      createRootRouteWithContext<TServices>()({
        component: () => <RouterOutlet />, // TODO : Check if we want to offer Layout outside of router ?
        notFoundComponent: notFoundComponent,
        errorComponent: errorComponent,
        context: () => services, // Pass the initial services to the router, in tanstack these are called context.
      }),
    [notFoundComponent, errorComponent, services],
  );
  // END REGISTER ROOT ROUTE

  // REGISTER CONTEXT ROUTES
  if (routeContextsConfig) {
    routeContextsConfig.forEach((route) => {
      routeContexts[route.id] = createRoute({
        // Can be registered under another context route (ex: auth + role)
        getParentRoute: () => {
          if (route.contextId) {
            return routeContexts[route.contextId];
          }
          return rootRoute;
        },
        id: route.id,
        beforeLoad: (opts) => {
          if (route.beforeLoad) {
            return route.beforeLoad({
              ...opts,
              services: opts.context as TServices,
            });
          }
        },
        component: () => <RouterOutlet />, // TODO : Check if we want to offer Layout outside of router ?
      });
    });
  }
  // END REGISTER CONTEXT ROUTES

  // REGISTER ROUTES
  const languageFirstRegion: Record<string, string> = {};

  routesConfig.forEach((route) => {
    // Build array with first defined region per language.
    if (!languageFirstRegion[route.language] && route.regions.length > 0) {
      languageFirstRegion[route.language] = route.regions[0];
    }

    // Skip this route if no configuration is found, should not happen
    const currentRouteConfig = components[route.id];
    if (!currentRouteConfig) {
      return;
    }

    // Make sure at least one region is defined.
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

    // For each region pr language create the routes.
    regions.forEach((region: IRegionString) => {
      const locale = createLocale({
        languageOrLocale: route.language,
        region: region,
      });
      const isFirstRegion = languageFirstRegion[route.language] === region;

      const path = createSafeRouterPath({
        locale: locale,
        path: route.path,
      });

      routes[path] = createRoute({
        // When a route is marked under a context, we put it there, else we add it to the root.
        // It only makes sence to add a under another route when it requires a context beforeLoad to run.
        getParentRoute: () => {
          if (currentRouteConfig.contextId) {
            return routeContexts[currentRouteConfig.contextId];
          }
          return rootRoute;
        },
        path: path,
        component: currentRouteConfig.component,
        loader: async ({ params, context }) => {
          if (currentRouteConfig.loader) {
            return currentRouteConfig.loader(
              params,
              { services: context },
              locale,
            );
          }
        },
      }) as AnyRoute;

      // Provide redirect to the language route in
      if (isFirstRegion) {
        const redirectPath = createSafeRouterPath({
          locale: createLocale({ languageOrLocale: route.language }),
          path: route.path,
        });

        const targetPath = createSafeRouterPath({
          locale: locale,
          path: route.path,
        });

        routeRedirects[redirectPath] = createRoute({
          getParentRoute: () => {
            return rootRoute;
          },
          path: redirectPath,
          loader: async () => {
            throw redirect({ to: targetPath });
          },
        });
      }

      // entryRoute
      if (
        routeEntry.id === route.id &&
        routeEntry.language === route.language &&
        routeEntry.region === region
      ) {
        const entryPath = "/";
        const redirectToEntry = createSafeRouterPath({
          locale: createLocale({
            languageOrLocale: route.language,
            region: region,
          }),
          path: route.path,
        });

        routeRedirects[entryPath] = createRoute({
          getParentRoute: () => {
            if (currentRouteConfig.contextId) {
              return routeContexts[currentRouteConfig.contextId];
            }
            return rootRoute;
          },
          path: entryPath,
          loader: async () => {
            throw redirect({ to: redirectToEntry });
          },
        });
      }
    });
  });
  // END REGISTER ROUTES

  const routeList = [
    ...Object.values(routeContexts),
    ...Object.values(routes),
    ...Object.values(routeRedirects),
  ];

  // BUILD ROUTER
  const routeTree = useMemo(() => {
    return rootRoute.addChildren(routeList);
  }, [rootRoute, routeList]);

  const tanstackRouter = useMemo(
    () =>
      createRouter({
        routeTree,
        trailingSlash: "never",
        defaultNotFoundComponent: notFoundComponent,
        defaultErrorComponent: errorComponent,
        context: services,
      }),
    [routeTree, notFoundComponent, errorComponent, services],
  );

  const router: IRouter = useMemo(
    () =>
      createRouterCore<TServices, typeof tanstackRouter>({
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
          return key;
        },
      }),
    [],
  );

  const i18n = useMemo(
    () => createRouterI18n({ i18n: linguiI18N }),
    [linguiI18N],
  );

  // Active so we render through in <LinguiI18nProvider>, loading is handle by <RouteLoadingContext>
  linguiI18N.loadAndActivate({
    locale: router.defaultLanguage(),
    messages: {},
  });

  const providers = useMemo(() => {
    return Object.entries(services).map(([key, value]) => ({
      provide: key,
      useValue: value,
    }));
  }, [services]);

  // Extract locale only on first load or refresh.
  useEffect(() => {
    (async () => {
      const loc = extractRouteLocale({
        pathname: window.location.pathname,
      });

      const extractedLocale =
        loc !== ""
          ? createLocale({ languageOrLocale: loc })
          : createLocale({ languageOrLocale: router.defaultLanguage() });
      const lang = extractedLocale.language;

      const messages = await translations(lang, services);
      const compiledMessages = toCompiledMessages(messages);
      linguiI18N.load(lang, compiledMessages as ITranslations);
      linguiI18N.activate(lang);
      i18n.load(lang, compiledMessages as ITranslations);
    })();
  }, [i18n, linguiI18N, translations, router, services]);

  useEffect(() => {
    router.languages().forEach(async (lang) => {
      const messages = await translations(lang, services);
      const compiledMessages = toCompiledMessages(messages);
      i18n.load(lang, compiledMessages as ITranslations);
    });
  }, [i18n, translations, router, services]);

  return (
    <ServiceContainer providers={providers}>
      <RouterI18nContext.Provider value={i18n}>
        <LinguiI18nProvider i18n={linguiI18N}>
          <RouterContext.Provider value={router}>
            <TanstackRouterProvider router={tanstackRouter} />
          </RouterContext.Provider>
        </LinguiI18nProvider>
      </RouterI18nContext.Provider>
    </ServiceContainer>
  );
};

function toCompiledMessages(rawMessages: Record<string, string>): Messages {
  const compiledMessages: Messages = {};

  Object.keys(rawMessages).forEach((key) => {
    const message = rawMessages[key];
    compiledMessages[key] = compileMessage(message);
  });

  return compiledMessages;
}
