import {IRouteLocale} from "@/Types";

export const SystemLocale: IRouteLocale = Intl.DateTimeFormat().resolvedOptions().locale;
