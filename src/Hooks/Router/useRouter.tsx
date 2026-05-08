import { useContext } from "react";
import type { IRouter, IRouterI18N } from "@/Types";
import { RouterContext } from "@/Context/RouterContext";
import { RouterI18nContext } from "@/Context/RouterI18nContext";

export const useRouter = (): { router: IRouter; i18n: IRouterI18N } => {
  const routerContext = useContext(RouterContext);
  if (!routerContext) {
    throw new Error("useRouter must be used within a <Router> Provider");
  }

  const i18nContext = useContext(RouterI18nContext);
  if (!i18nContext) {
    throw new Error("useRouter must be used within a <Router> Provider");
  }

  return { router: routerContext, i18n: i18nContext };
};
