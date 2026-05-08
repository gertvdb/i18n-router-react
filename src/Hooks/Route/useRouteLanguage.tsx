import type { IRouteLanguage } from "@/Types";
import { useRouterState } from "@tanstack/react-router";
import { extractRouteLanguage } from "@/Utils/Route/extractRouteLanguage";

export const useRouteLanguage = (): IRouteLanguage =>
  useRouterState({
    select: (state) =>
      extractRouteLanguage({
        locale: state.location.pathname.split("/")[1],
      }) as IRouteLanguage,
  });
