import { useRouteI18n } from "@/Hooks/useRouteI18n";
import { useRouteLanguage } from "@/Hooks/useRouteLanguage";

export const useRouteLoading = (): boolean => {
  const i18n = useRouteI18n();
  const language = useRouteLanguage();
  return !i18n.isLoaded(language);
};
