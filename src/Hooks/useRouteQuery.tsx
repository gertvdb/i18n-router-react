import { useMemo } from "react";
import { IRouteQueryProps } from "@/Types";
import { useSearch } from "@tanstack/react-router";
import { pickKeys } from "@/Utils/pickKeys";

export function useRouteQuery({ router, route, keys }: IRouteQueryProps): any {
  const path = useMemo(() => {
    return router.path(route.id, route.locale);
  }, [route.id, route.locale, router]);

  const fetchedParams = useSearch({ from: path });

  return useMemo(() => {
    return keys ? pickKeys(fetchedParams, keys) : fetchedParams;
  }, [fetchedParams, keys]);
}
