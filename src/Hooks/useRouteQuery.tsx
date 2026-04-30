import {useEffect, useMemo, useRef, useState } from "react";
import { IRouteQueryProps } from "@/Types";
import isEqual from "fast-deep-equal";
import {useSearch} from "@tanstack/react-router";
import {pickKeys} from "@/Utils/pickKeys";

export function useRouteQuery({ router, route, keys }: IRouteQueryProps): any {
    const prevRoute = useRef(route);

    const path = useMemo(() => {
        return router.path(route.id, route.locale);
    }, [isEqual(route, prevRoute)]); // Using deep comparison for objects

    useEffect(() => {
        if (!isEqual(route, prevRoute.current)) {
            prevRoute.current = route;
        }
    }, [router, route]);

    // Local state to store memoized params
    const [params, setParams] = useState<any>(null);
    const fetchedParams = useSearch({ from: path });

    useEffect(() => {
        // As long as the fetchedParams are not null, and the params are null, we don't need to update the state.
        if (!fetchedParams && !params) return;

        const compare = keys ? pickKeys(fetchedParams, keys) : fetchedParams;

        // Only update state if params have changed
        if (!isEqual(compare, params)) {
            setParams(compare);
        }
    }, [fetchedParams]);

    return params;
}