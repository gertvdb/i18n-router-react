import { useRouterState } from "@tanstack/react-router";
import { useRef } from "react";

export const useRouterBootstrapped = (): boolean => {
  const routerReady = useRouterState({
    select: (s) => s.status === "idle",
  });

  const bootstrapped = useRef(false);

  if (!bootstrapped.current && routerReady) {
    bootstrapped.current = true;
  }

  return bootstrapped.current;
};
