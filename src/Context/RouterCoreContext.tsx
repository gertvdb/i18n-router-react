import type { IRouter } from "@/Types";
import { createContext } from "react";

export const RouterCoreContext = createContext<IRouter | undefined>(undefined);
