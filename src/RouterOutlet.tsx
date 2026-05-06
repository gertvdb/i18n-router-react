import { type FC, useEffect } from "react";
import { useRouteLanguage } from "@/Hooks/Route/useRouteLanguage";
import { Outlet as TanstackOutlet } from "@tanstack/react-router";
import { useRouterI18n } from "@/Hooks/Router/useRouterI18n";

export const RouterOutlet: FC = () => {
  const language = useRouteLanguage();
  const i18n = useRouterI18n();

  useEffect(() => {
    if (i18n.current() !== language) {
      i18n.activate(language);
    }
  }, [i18n, language]);

  return <TanstackOutlet />;
};
