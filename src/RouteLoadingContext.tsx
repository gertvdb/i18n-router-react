import { createContext } from "react";

export const RouteLoadingContext = createContext<boolean | undefined>(
  undefined,
);
