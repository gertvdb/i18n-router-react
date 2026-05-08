import { useSyncExternalStore } from "react";
import { useRouteLanguage } from "@/Hooks/Route/useRouteLanguage";
import { useRouter } from "@/Hooks/Router/useRouter";

export const useTranslationLoaded = (): boolean => {
  const { i18n } = useRouter();
  const language = useRouteLanguage();

  return useSyncExternalStore(
    (callback) => i18n.subscribe(callback),
    () => i18n.isLoaded(language),
    () => false,
  );
};
