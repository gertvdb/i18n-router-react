import { useRouterState } from "@tanstack/react-router";

export const useRouterIsTransitioning = (): boolean => {
  const { isTransitioning } = useRouterState({
    select: (state) => ({
      isTransitioning: state.isTransitioning,
    }),
  });

  return isTransitioning;
};
