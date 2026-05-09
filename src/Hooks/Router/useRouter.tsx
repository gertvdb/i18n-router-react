import { useContext } from "react";
import type { IRouter } from "@/Types";
import { RouterContext } from "@/Context/RouterContext";

export const useRouter = (): { router: IRouter } => {
  const routerContext = useContext(RouterContext);
  if (!routerContext) {
    throw new Error("useRouter must be used within a <Router> Provider");
  }
  return { router: routerContext };
};
