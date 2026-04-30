import { I18n as LinguiI18n } from "@lingui/core";
import type { IRouteI18N } from "@/Types";
import { RouteI18n } from "@/RouteI18n";

export const createRouteI18n = ({ i18n }: { i18n: LinguiI18n }): IRouteI18N => {
  return RouteI18n.new(i18n);
};
