import { useContext } from "react";
import type { IRouteI18N } from "@/Types";
import { RouteI18nContext } from "@/RouteI18nContext";

export const useRouteI18n = (): IRouteI18N => {
  const context = useContext(RouteI18nContext);
  if (!context) {
    throw new Error("useRouteI18n must be used within a <Router> Provider");
  }
  return context;
};
