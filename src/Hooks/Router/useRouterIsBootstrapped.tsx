import { useRouterState } from "@tanstack/react-router";
import { useRouter } from "@/Hooks/Router/useRouter";

export const useRouterIsBootstrapped = (): boolean => {
  const { router } = useRouter();

  return useRouterState({
    select: () => router.isBootstrapped(),
  });
};
