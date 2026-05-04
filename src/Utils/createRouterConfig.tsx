import type {
  IRouteComponents,
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
  entryRoute,
  components,
  routes,
  notFoundComponent,
  errorComponent,
}: {
  entryRoute: IRouteEntry;
  components: IRouteComponents;
  routes: IRoutes;
  notFoundComponent: (props: NotFoundRouteProps) => React.ReactNode;
  errorComponent: (props: ErrorComponentProps) => React.ReactNode;
}): IRouterConfig => {
  return {
    entryRoute,
    components,
    routes,
    notFoundComponent,
    errorComponent,
  };
};
