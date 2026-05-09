import { useContext, useSyncExternalStore } from "react";
import { RouterI18nContext } from "@/Context/RouterI18nContext";

export const useI18nIsLoaded = (): boolean => {
  const i18n = useContext(RouterI18nContext);
  if (!i18n) {
    throw new Error(
      "useI18nTranslationLoaded must be used within a <Router> Provider",
    );
  }

  return useSyncExternalStore(
    (callback) => i18n.subscribe(callback),
    () => i18n.isLoaded(i18n.current()),
    () => false,
  );
};
