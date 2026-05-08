import {IRouteLanguage} from "@/Types";
import {SystemLocale} from "@/Domain/System/SystemLocale";

export const SystemLanguage: IRouteLanguage = new Intl.Locale(SystemLocale).language;