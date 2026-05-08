import type { IRouteLocale, IRouteRegion } from "@/Types.tsx";

export const extractRouteRegion = ({
  locale,
}: {
  locale: IRouteLocale;
}): IRouteRegion => {
  const region = new Intl.Locale(locale).region;
  if (!region) {
    throw new Error("a locale must contain a region");
  }

  return region.toLowerCase() as IRouteRegion;
};
