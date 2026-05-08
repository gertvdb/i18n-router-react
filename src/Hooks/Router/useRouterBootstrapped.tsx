import { useRouterState } from "@tanstack/react-router";
import { useRouter } from "@/Hooks/Router/useRouter";

export const useRouterBootstrapped = (): boolean => {
  const { router } = useRouter();

  return useRouterState({
    select: () => router.isBootstrapped(),
  });
};
