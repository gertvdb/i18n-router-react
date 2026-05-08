import { useContext } from "react";
import type { IRouterI18N } from "@/Types";
import { RouterI18nContext } from "@/Context/RouterI18nContext";

export const useRouterI18n = (): IRouterI18N => {
  const context = useContext(RouterI18nContext);
  if (!context) {
    throw new Error("useRouteI18n must be used within a <Router> Provider");
  }
  return context;
};
