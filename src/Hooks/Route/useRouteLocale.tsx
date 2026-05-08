import { useRouterState } from "@tanstack/react-router";
import { extractRouteLocale } from "@/Utils/Route/extractRouteLocale";
import {
  createLocale,
  ILocale,
  ILocaleString,
  IRegionString,
} from "@gertvdb/locale";

export const useRouteLocale = (): {
  locale: ILocale;
  language: ILocaleString;
  region: IRegionString | undefined;
} => {
  const locale = useRouterState({
    select: (state) =>
      createLocale({
        languageOrLocale: extractRouteLocale({
          pathname: state.location.pathname,
        }),
      }),
  });

  return {
    locale: locale,
    language: locale.language,
    region: locale.region,
  };
};
