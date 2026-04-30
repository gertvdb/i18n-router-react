import { useRouterState } from "@tanstack/react-router";

export const useRouteIsTransitioning = (): boolean => {
  const { isTransitioning } = useRouterState({
    select: (state) => ({
      isTransitioning: state.isTransitioning,
    }),
  });

  return isTransitioning;
};
