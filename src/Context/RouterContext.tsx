import type { IRouter } from "@/Types";
import { createContext } from "react";

export const RouterContext = createContext<IRouter | undefined>(undefined);
