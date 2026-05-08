import {IRouteRegion} from "@/Types";
import {SystemLocale} from "@/Domain/System/SystemLocale";

export const SystemRegion: IRouteRegion|undefined = new Intl.Locale(SystemLocale).region;