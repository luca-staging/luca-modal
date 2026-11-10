import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const cache = new Map();
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());

const keyOf = (queryKey) => JSON.stringify(queryKey);

const matches = (fullKey, partialKey) => {
  if (!partialKey?.length) return true;
  try {
    const full = JSON.parse(fullKey);
    return partialKey.every((part, i) => full[i] === part);
  } catch {
    return false;
  }
};

export function useQuery({ queryKey, queryFn, enabled = true, staleTime = 0 }) {
  const key = keyOf(queryKey);
  const [, bump] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const onChange = () => bump((n) => n + 1);
    listeners.add(onChange);
    return () => {
      mounted.current = false;
      listeners.delete(onChange);
    };
  }, []);

  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  useEffect(() => {
    if (!enabled) return undefined;
    const entry = cache.get(key);
    const fresh = entry && Date.now() - entry.at < staleTime;
    if (fresh) return undefined;

    let cancelled = false;
    cache.set(key, { ...(entry || {}), status: "loading", at: entry?.at || 0 });
    emit();

    Promise.resolve()
      .then(() => queryFnRef.current())
      .then((data) => {
        if (cancelled) return;
        cache.set(key, { status: "success", data, error: null, at: Date.now() });
        emit();
      })
      .catch((error) => {
        if (cancelled) return;
        cache.set(key, { status: "error", data: entry?.data, error, at: Date.now() });
        emit();
      });

    return () => {
      cancelled = true;
    };
  }, [key, enabled, staleTime, bump]);

  const entry = cache.get(key);
  return {
    data: entry?.data,
    error: entry?.error,
    isLoading: enabled && (!entry || entry.status === "loading") && entry?.data === undefined,
    isFetching: entry?.status === "loading",
    refetch: () => {
      cache.delete(key);
      emit();
      bump((n) => n + 1);
    },
  };
}

export function useQueryClient() {
  const invalidateQueries = useCallback(({ queryKey } = {}) => {
    for (const key of [...cache.keys()]) {
      if (matches(key, queryKey)) cache.delete(key);
    }
    emit();
  }, []);

  return { invalidateQueries };
}

/** Optional provider kept for API compatibility — no React context needed */
export function QueryClientProvider({ children }) {
  useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
    () => 0,
    () => 0
  );
  return children;
}
