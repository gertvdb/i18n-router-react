import type { IRouteLocale } from "@/Types";
import { useRouterState } from "@tanstack/react-router";
import { extractRouteLocale } from "@/Utils/Route/extractRouteLocale";

export const useRouteLocale = (): IRouteLocale =>
  useRouterState({
    select: (state) =>
      extractRouteLocale({ pathname: state.location.pathname }),
  });
