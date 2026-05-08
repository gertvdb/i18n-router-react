import { useSyncExternalStore } from "react";
import { useRouter } from "@/Hooks/Router/useRouter";
import { useRouteLocale } from "@/Hooks/Route/useRouteLocale";

export const useTranslationLoaded = (): boolean => {
  const { i18n } = useRouter();
  const { language } = useRouteLocale();

  return useSyncExternalStore(
    (callback) => i18n.subscribe(callback),
    () => i18n.isLoaded(language),
    () => false,
  );
};
