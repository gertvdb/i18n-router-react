import { useMemo } from "react";
import { IRouteQueryProps } from "@/Types";
import { useSearch } from "@tanstack/react-router";

export function useRouteQuery<T>({
  router,
  route,
  select,
}: IRouteQueryProps<T>): any {
  const path = useMemo(() => {
    return router.path(route.id, route.locale);
  }, [route.id, route.locale, router]);

  return useSearch({ from: path, select: select });
}
