import type { IRouteLanguage, IRouteLocale } from "@/Types.tsx";

export const extractLanguage = ({
  locale,
}: {
  locale: IRouteLocale;
}): IRouteLanguage => {
  return new Intl.Locale(locale).language.toLowerCase() as IRouteLanguage;
};
