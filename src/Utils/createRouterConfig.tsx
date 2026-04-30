import type {
  IRouteComponents,
  IRouteEntry,
  IRouterConfig,
  IRoutes,
} from "@/Types.tsx";
import type { NotFoundRouteProps } from "@tanstack/react-router";
import React from "react";

export const createRouterConfig = ({
  entry,
  components,
  routes,
  notFoundComponent,
}: {
  entry: IRouteEntry;
  components: IRouteComponents;
  routes: IRoutes;
  notFoundComponent: (props: NotFoundRouteProps) => React.ReactNode;
}): IRouterConfig => {
  return {
    entry,
    components,
    routes,
    notFoundComponent,
  };
};
