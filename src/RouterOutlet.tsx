import { type FC, useEffect } from "react";
import { useRouteLanguage } from "@/Hooks/useRouteLanguage";
import { Outlet as TanstackOutlet } from "@tanstack/react-router";
import { useRouteI18n } from "@/Hooks/useRouteI18n";
import { RouteLoadingContext } from "@/RouteLoadingContext";

export const RouterOutlet: FC = () => {
  const language = useRouteLanguage();
  const i18n = useRouteI18n();

  useEffect(() => {
    if (i18n.current() !== language) {
      i18n.activate(language);
    }
  }, [i18n, language]);

  return <TanstackOutlet />;
};
