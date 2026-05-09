export * from "./Types";

// Provider
export { RouterI18nProvider } from "./Provider/RouterI18nProvider";

// Contexts
export { RouterContext } from "./Context/RouterContext";
export { RouterI18nContext } from "./Context/RouterI18nContext";

// Hooks
// -- Route
export { useRouteLocale } from "./Hooks/Route/useRouteLocale";
export { useRouteParams } from "./Hooks/Route/useRouteParams";
export { useRouteQuery } from "./Hooks/Route/useRouteQuery";
export { useRouteLoaderData } from "@/Hooks/Route/useRouteLoaderData";

// TODO : look at these with useSevice
export { useRouteContext } from "@/Hooks/Route/useRouteContext";

// -- Router
export { useRouter } from "./Hooks/Router/useRouter";
export { useRouterIsBootstrapped } from "./Hooks/Router/useRouterIsBootstrapped";
export { useRouterIsTransitioning } from "./Hooks/Router/useRouterIsTransitioning";

// -- I18N
export { useI18nIsLoaded } from "./Hooks/I18n/useI18nIsLoaded";
export { useI18n } from "@/Hooks/I18n/useI18n";

// -- Service Container
export { useService } from "@/Hooks/ServiceContainer/useService";

// Utils
export { createRouterConfig } from "./Utils/Router/createRouterConfig";
