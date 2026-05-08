import type { IRouteLanguage, IRouteLocale } from "@/Types.tsx";

export const extractRouteLanguage = ({
  locale,
}: {
  locale: IRouteLocale;
}): IRouteLanguage => {
  return new Intl.Locale(locale).language.toLowerCase() as IRouteLanguage;
};
