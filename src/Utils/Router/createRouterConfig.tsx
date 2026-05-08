import type {
  IRouteComponents,
  IRouteContexts,
  IRouteEntry,
  IRouterConfig,
  IRoutes,
} from "@/Types.tsx";
import type {
  ErrorComponentProps,
  NotFoundRouteProps,
} from "@tanstack/react-router";
import React from "react";

export const createRouterConfig = ({
  routeEntry,
  components,
  routes,
  routeContexts,
  notFoundComponent,
  errorComponent,
}: {
  routeEntry: IRouteEntry;
  components: IRouteComponents;
  routes: IRoutes;
  routeContexts: IRouteContexts;
  notFoundComponent: (props: NotFoundRouteProps) => React.ReactNode;
  errorComponent: (props: ErrorComponentProps) => React.ReactNode;
}): IRouterConfig => {
  return {
    routeEntry,
    components,
    routes,
    routeContexts,
    notFoundComponent,
    errorComponent,
  };
};
