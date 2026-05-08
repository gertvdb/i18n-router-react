import type { IRouter, IRouterConfig } from "@/Types.tsx";
import { RouterCore } from "@/Domain/RouterCore";

import type { AnyRoute, AnyRouter } from "@tanstack/react-router";

export const createRouterCore = <
  TContext extends Record<string, unknown>,
  TRouter extends AnyRouter,
>({
  config,
  router,
  routes,
}: {
  config: IRouterConfig<TContext>;
  router: TRouter;
  routes: AnyRoute[];
}): IRouter => {
  return RouterCore.new(config, router, routes);
};
