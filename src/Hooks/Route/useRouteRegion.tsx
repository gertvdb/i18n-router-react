import type { IRouteRegion } from "@/Types";
import { extractRouteRegion } from "@/Utils/Route/extractRouteRegion";
import { useRouteLocale } from "@/Hooks/Route/useRouteLocale";

// Redirect url's are created for every language to the first region of that language
// Due to this, extractRegion could throw an error during the redirect (/nl => /nl-be)
// This is why we need to make this hook nullable, since this is not an error and this
// way the implementor can handle null.

export const useRouteRegion = (): IRouteRegion | null => {
  const locale = useRouteLocale();
  if (!locale) {
    return null;
  }

  try {
    return extractRouteRegion({ locale }) as IRouteRegion;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return null;
  }
};
