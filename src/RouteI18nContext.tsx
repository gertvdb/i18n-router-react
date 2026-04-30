import type { IRouteI18N } from "@/Types";
import { createContext } from "react";

export const RouteI18nContext = createContext<IRouteI18N | undefined>(
  undefined,
);
