import { RouteLoaderDataProps } from "@/Types";
import { useLoaderData } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRouteLoaderData<T>({
  router,
  route,
  select,
}: RouteLoaderDataProps<T>): any {
  const path = useMemo(() => {
    return router.path(route.id, route.locale);
  }, [route.id, route.locale, router]);

  return useLoaderData({ from: path, select: select });
}
