import { RouteContextProps } from "@/Types";
import { useRouteContext as TanstackUseRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRoutePath<T, TSelected = T>({
  router,
  route,
}: RouteContextProps<T, TSelected>): string {
  return useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.path(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);
}
