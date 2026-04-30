import type { IRouteLanguage, IRouteLocale } from "@/Types.tsx";

export const createSafeRouterPath = ({
  localeOrLanguage,
  path,
}: {
  localeOrLanguage: IRouteLocale | IRouteLanguage;
  path: string;
}): string => {
  const safePath = path === "/" ? "" : path;
  return "/" + localeOrLanguage.toLowerCase() + safePath.toLowerCase();
};
