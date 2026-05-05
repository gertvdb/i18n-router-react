import { RouteContextProps } from "@/Types";
import { useRouteContext as TanstackUseRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRouteContext<T, TSelected = T>({
  router,
  route,
  select,
}: RouteContextProps<T, TSelected>): TSelected | T {
  const path = useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.path(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);

  if (select) {
    return TanstackUseRouteContext({
      from: path,
      select: select as any,
    }) as TSelected;
  }

  return TanstackUseRouteContext({ from: path }) as T;
}
