import type { IRouteLanguage } from "@/Types";
import { useRouterState } from "@tanstack/react-router";
import { extractLanguage } from "@/Utils/extractLanguage";

export const useRouteLanguage = (): IRouteLanguage =>
  useRouterState({
    select: (state) =>
      extractLanguage({
        locale: state.location.pathname.split("/")[1],
      }) as IRouteLanguage,
  });
