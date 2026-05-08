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
export { useRouteContext } from "@/Hooks/Route/useRouteContext";

// -- Router
export { useRouter } from "./Hooks/Router/useRouter";
export { useRouterService } from "@/Hooks/Router/useRouterService";
export { useRouterBootstrapped } from "./Hooks/Router/useRouterBootstrapped";
export { useRouterIsTransitioning } from "./Hooks/Router/useRouterIsTransitioning";

// -- I18N
export { useTranslationLoaded } from "./Hooks/useTranslationLoaded";

// Utils
export { createRouterConfig } from "./Utils/Router/createRouterConfig";
