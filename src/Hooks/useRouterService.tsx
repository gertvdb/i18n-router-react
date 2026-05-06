import { RouteContextProps } from "@/Types";
import { useRouteContext as TanstackUseRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRouterService<T, TSelected = T>({
  router,
  route,
  select,
}: RouteContextProps<T, TSelected>): TSelected | T {
  const id = useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.id(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);

  if (select) {
    return TanstackUseRouteContext({
      from: id,
      select: select as any,
    }) as TSelected;
  }

  return TanstackUseRouteContext({ from: id }) as T;
}
