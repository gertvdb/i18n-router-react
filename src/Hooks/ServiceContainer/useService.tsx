import { useService as useReactServiceContainerService } from "react-service-container";

export function useService<T, R = any>(serviceToken: T): R {
  return useReactServiceContainerService<T, R>(serviceToken);
}
