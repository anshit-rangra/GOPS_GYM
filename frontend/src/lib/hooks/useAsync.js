import { useCallback, useEffect, useRef, useState } from "react";
import { getApiErrorMessage } from "../api/errors";

/**
 * Small data-fetching helper for pages that simply load a resource and expose
 * loading / error / refetch without pulling in a heavier cache library.
 *
 * `asyncFn` is read through a ref so it can be passed inline; `deps` controls
 * when the resource is re-fetched (serialised so the effect dependency stays a
 * stable primitive).
 */
const useAsync = (asyncFn, deps = []) => {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });
  const [reloadKey, setReloadKey] = useState(0);

  const asyncRef = useRef(asyncFn);
  useEffect(() => {
    asyncRef.current = asyncFn;
  });

  const depsKey = JSON.stringify(deps);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await asyncRef.current();
        if (active) setState({ status: "success", data, error: null });
      } catch (error) {
        if (active) {
          setState({
            status: "error",
            data: null,
            error: getApiErrorMessage(error),
          });
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [depsKey, reloadKey]);

  const refetch = useCallback(() => {
    setState({ status: "loading", data: null, error: null });
    setReloadKey((key) => key + 1);
  }, []);

  return { ...state, refetch };
};

export default useAsync;
