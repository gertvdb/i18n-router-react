import { useContext } from "react";
import { RouteLoadingContext } from "@/RouteLoadingContext";

export const useRouteLoading = (): boolean => {
  const context = useContext(RouteLoadingContext);
  if (context === undefined) {
    throw new Error("useRouteLoading must be used within a <Router> Provider");
  }
  return context;
};
