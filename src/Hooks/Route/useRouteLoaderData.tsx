import { RouteLoaderDataProps } from "@/Types";
import { useLoaderData } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRouteLoaderData<T, TSelected = T>({
  router,
  route,
  select,
}: RouteLoaderDataProps<T, TSelected>): TSelected | T {
  const id = useMemo(() => {
    if (router.hasRoute(route.id, route.locale)) {
      return router.id(route.id, route.locale);
    }
    return route.id;
  }, [route.id, route.locale, router]);

  if (select) {
    return useLoaderData({ from: id, select: select as any }) as TSelected;
  }

  return useLoaderData({ from: id }) as T;
}
