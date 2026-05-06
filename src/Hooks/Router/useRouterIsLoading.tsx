import { useRouterState } from "@tanstack/react-router";

export const useRouterIsLoading = (): boolean => {
  const { isLoading } = useRouterState({
    select: (state) => ({
      isLoading: state.isLoading,
    }),
  });

  return isLoading;
};
