import { type FC, useEffect } from "react";
import { Outlet as TanstackOutlet } from "@tanstack/react-router";
import { useRouteLocale } from "@/Hooks/Route/useRouteLocale";
import { RouterI18nContext } from "@/Context/RouterI18nContext";
import { useContext } from "react";

export const RouterOutlet: FC = () => {
  const { language } = useRouteLocale();
  const i18n = useContext(RouterI18nContext);

  useEffect(() => {
    if (i18n && i18n.current() !== language) {
      i18n.activate(language);
    }
  }, [i18n, language]);

  if (!i18n) {
    throw new Error("RouterOutlet must be used within a <Router> Provider");
  }

  return <TanstackOutlet />;
};
