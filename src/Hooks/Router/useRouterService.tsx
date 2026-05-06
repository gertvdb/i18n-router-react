import { useService } from "react-service-container";

export function useRouterService<T, R = any>(serviceToken: T): R {
  return useService<T, R>(serviceToken);
}
