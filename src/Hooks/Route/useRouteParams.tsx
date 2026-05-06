import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { RouteParamsProps } from "@/Types";

export function useRouteParams<T, TSelected = T>({
  router,
  route,
  select,
}: RouteParamsProps<T, TSelected>): TSelected | T {
  const id = useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.id(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);

  if (select) {
    return useParams({ from: id, select: select as any }) as TSelected;
  }

  return useParams({ from: id }) as T;
}
