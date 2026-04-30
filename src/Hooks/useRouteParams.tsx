import { useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { RouteParamsProps} from "@/Types";
import isEqual from "fast-deep-equal";

export function useRoutingParams({ router, route }: RouteParamsProps): any {
    const prevRouter = useRef(router);
    const prevRoute = useRef(route);

    const path = useMemo(() => {
        return router.path(route.id, route.locale);
    }, [isEqual(route, prevRoute)]); // Using deep comparison for objects

    useEffect(() => {
        if (!isEqual(router, prevRouter.current)) {
            prevRouter.current = router;
        }
    }, [route]);

    // Local state to store memoized params
    const [params, setParams] = useState<any>(null);
    const fetchedParams = useParams({ from: path });

    useEffect(() => {
        // As long as the fetchedParams are not null, and the params are null, we don't need to update the state.
        if (!fetchedParams && !params) return;

        // Only update state if params have changed
        if (!isEqual(fetchedParams, params)) {
            setParams(fetchedParams);
        }
    }, [fetchedParams]);

    return params;
}

