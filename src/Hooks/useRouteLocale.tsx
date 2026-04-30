import type { IRouteLocale } from "@/Types";
import { useRouterState } from "@tanstack/react-router";
import { extractLocale } from "@/Utils/extractLocale";

export const useRouteLocale = (): IRouteLocale =>
  useRouterState({
    select: (state) => extractLocale({ pathname: state.location.pathname }),
  });
