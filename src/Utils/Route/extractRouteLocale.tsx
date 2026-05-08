import { ILocaleString } from "@gertvdb/locale";

export const extractRouteLocale = ({
  pathname,
}: {
  pathname: string;
}): ILocaleString => {
  return pathname.split("/")[1] as ILocaleString;
};
