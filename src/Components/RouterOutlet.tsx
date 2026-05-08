import { type FC, useEffect } from "react";
import { Outlet as TanstackOutlet } from "@tanstack/react-router";
import { useRouter } from "@/Hooks/Router/useRouter";
import { useRouteLocale } from "@/Hooks/Route/useRouteLocale";

export const RouterOutlet: FC = () => {
  const { language } = useRouteLocale();
  const { i18n } = useRouter();

  useEffect(() => {
    if (i18n.current() !== language) {
      i18n.activate(language);
    }
  }, [i18n, language]);

  return <TanstackOutlet />;
};
