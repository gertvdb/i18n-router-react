import { useMemo } from "react";
import { IRoute } from "@/Types";
import { useRouter } from "@/Hooks/useRouter";

export const useRouteHierarchy = (id: string): IRoute[] => {
  const router = useRouter();

  return useMemo(() => {
    return router.getRouteHierarchy(id);
  }, [id, router]);
};
