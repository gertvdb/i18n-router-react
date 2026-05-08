import { ILocale } from "@gertvdb/locale";

export const createSafeRouterPath = ({
  locale,
  path,
}: {
  locale: ILocale;
  path: string;
}): string => {
  const safePath = path === "/" ? "" : path;
  return (
    "/" +
    locale.language +
    (locale.region ? "-" + locale.region : "") +
    safePath.toLowerCase()
  );
};
