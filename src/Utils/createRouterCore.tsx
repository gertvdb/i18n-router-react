import type { IRouter, IRouterConfig } from "@/Types.tsx";
import { RouterCore } from "@/RouterCore";

import type { AnyRouter } from "@tanstack/react-router";

export const createRouterCore = <TRouter extends AnyRouter>({
  config,
  router,
}: {
  config: IRouterConfig;
  router: TRouter;
}): IRouter => {
  return RouterCore.new(config, router);
};
