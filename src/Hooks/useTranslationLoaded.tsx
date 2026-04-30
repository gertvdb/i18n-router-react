import { useSyncExternalStore } from "react";
import { useRouteI18n } from "@/Hooks/useRouteI18n";
import { useRouteLanguage } from "@/Hooks/useRouteLanguage";

export const useTranslationLoaded = (): boolean => {
  const i18n = useRouteI18n();
  const language = useRouteLanguage();

  return useSyncExternalStore(
    (callback) => i18n.subscribe(callback),
    () => i18n.isLoaded(language),
    () => false,
  );
};
