import type { IRouterI18N } from "@/Types";
import { createContext } from "react";

export const RouterI18nContext = createContext<IRouterI18N | undefined>(
  undefined,
);
