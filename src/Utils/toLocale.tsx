import type { IRouteLanguage, IRouteLocale, IRouteRegion } from "@/Types.tsx";

export const toLocale = ({
  language,
  region,
}: {
  language: IRouteLanguage;
  region: IRouteRegion;
}): IRouteLocale => {
  return (language.toLowerCase() + "-" + region.toLowerCase()) as IRouteLocale;
};
