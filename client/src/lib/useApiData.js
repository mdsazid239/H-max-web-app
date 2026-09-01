import { useCallback, useEffect, useState } from 'react';

/**
 * Loads data from the API once (and again whenever `deps` change).
 *
 * `fallback` is rendered if the API cannot be reached, so the site still
 * shows meaningful content when the backend or database is offline.
 */
export function useApiData(loader, fallback, deps = []) {
  const [data, setData] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(loader, deps);

  useEffect(() => {
    let isCurrent = true;

    setIsLoading(true);

    load()
      .then((result) => {
        if (!isCurrent) return;
        setData(result);
        setIsOffline(false);
      })
      .catch(() => {
        if (!isCurrent) return;
        setData(fallback);
        setIsOffline(true);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return { data, isLoading, isOffline };
}
