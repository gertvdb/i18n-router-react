import { useSyncExternalStore } from "react";
import { useRouterI18n } from "@/Hooks/Router/useRouterI18n";
import { useRouteLanguage } from "@/Hooks/Route/useRouteLanguage";

export const useTranslationLoaded = (): boolean => {
  const i18n = useRouterI18n();
  const language = useRouteLanguage();

  return useSyncExternalStore(
    (callback) => i18n.subscribe(callback),
    () => i18n.isLoaded(language),
    () => false,
  );
};
