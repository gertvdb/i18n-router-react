import { I18n as LinguiI18n } from "@lingui/core";
import type { IRouterI18N } from "@/Types";
import { RouterI18n } from "@/Domain/RouterI18n";

export const createRouterI18n = ({
  i18n,
}: {
  i18n: LinguiI18n;
}): IRouterI18N => {
  return RouterI18n.new(i18n);
};
