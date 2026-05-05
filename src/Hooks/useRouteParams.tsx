import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { RouteParamsProps } from "@/Types";

export function useRouteParams<T, TSelected = T>({
  router,
  route,
  select,
}: RouteParamsProps<T, TSelected>): TSelected | T {
  const path = useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.path(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);

  if (select) {
    return useParams({ from: path, select: select as any }) as TSelected;
  }

  return useParams({ from: path }) as T;
}
