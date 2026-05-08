import type { IRouteLocale } from "@/Types.tsx";

export const extractRouteLocale = ({
  pathname,
}: {
  pathname: string;
}): IRouteLocale => {
  return pathname.split("/")[1].toLowerCase() as IRouteLocale;
};
