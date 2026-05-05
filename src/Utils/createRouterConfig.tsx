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
  entryRoute,
  components,
  routes,
  contexts,
  notFoundComponent,
  errorComponent,
}: {
  entryRoute: IRouteEntry;
  components: IRouteComponents;
  routes: IRoutes;
  contexts: IRouteContexts;
  notFoundComponent: (props: NotFoundRouteProps) => React.ReactNode;
  errorComponent: (props: ErrorComponentProps) => React.ReactNode;
}): IRouterConfig => {
  return {
    entryRoute,
    components,
    routes,
    contexts,
    notFoundComponent,
    errorComponent,
  };
};
