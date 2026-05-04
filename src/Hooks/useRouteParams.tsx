import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { RouteParamsProps } from "@/Types";

export function useRouteParams({
  router,
  route,
  select,
}: RouteParamsProps): any {
  const path = useMemo(() => {
    return router.path(route.id, route.locale);
  }, [route.id, route.locale, router]);

  return useParams({ from: path, select: select });
}
