import React, { useContext } from "react";
import { RouterI18nContext } from "@/Context/RouterI18nContext";
import { ILanguageString } from "@gertvdb/locale";

export const useI18n = (): {
  t: (key: string, variables?: Record<string, unknown>) => string;
  trans: (
    key: string,
    variables: Record<string, unknown>,
  ) => React.ReactElement | null;
  currentLanguage: ILanguageString;
} => {
  const i18n = useContext(RouterI18nContext);
  if (!i18n) {
    throw new Error("useRouter must be used within a <Router> Provider");
  }

  return { trans: i18n.trans, t: i18n.t, currentLanguage: i18n.current() };
};
