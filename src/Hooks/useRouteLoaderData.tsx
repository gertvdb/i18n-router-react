import { RouteLoaderDataProps } from "@/Types";
import { useLoaderData } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRouteLoaderData<T, TSelected = T>({
  router,
  route,
  select,
}: RouteLoaderDataProps<T, TSelected>): TSelected {
  const path = useMemo(() => {
    return router.path(route.id, route.locale);
  }, [route.id, route.locale, router]);

  return useLoaderData({ from: path, select: select as any }) as TSelected;
}
