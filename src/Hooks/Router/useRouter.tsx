import { useContext } from "react";
import type { IRouter } from "@/Types";
import { RouterCoreContext } from "@/RouterCoreContext";

export const useRouter = (): IRouter => {
  const context = useContext(RouterCoreContext);
  if (!context) {
    throw new Error("useRouter must be used within a <Router> Provider");
  }
  return context;
};
