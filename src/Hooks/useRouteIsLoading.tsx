import { useRouterState } from "@tanstack/react-router";

export const useRouteIsLoading = (): boolean => {
  const { isLoading } = useRouterState({
    select: (state) => ({
      isLoading: state.isLoading,
    }),
  });

  return isLoading;
};
