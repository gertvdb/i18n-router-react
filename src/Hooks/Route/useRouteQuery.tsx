import { useMemo } from "react";
import { IRouteQueryProps } from "@/Types";
import { useSearch } from "@tanstack/react-router";

export function useRouteQuery<T, TSelected = T>({
  router,
  route,
  select,
}: IRouteQueryProps<T, TSelected>): TSelected {
  const id = useMemo(() => {
    return router.id(route.id, route.locale);
  }, [route.id, route.locale, router]);

  return useSearch({ from: id, select: select as any }) as TSelected;
}
