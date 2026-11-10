import { useCallback } from "react";
import { useQuery } from "../lib/query";
import { api } from "../services/api";

export function useFeaturedProperties() {
  const queryFn = useCallback(() => api.getFeaturedProperties(), []);
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn,
    staleTime: 60_000,
  });
}

export function useProperties(filters) {
  const queryFn = useCallback(() => api.getProperties(filters), [filters]);
  return useQuery({
    queryKey: ["properties", filters],
    queryFn,
    staleTime: 30_000,
  });
}

export function useProperty(id) {
  const queryFn = useCallback(() => api.getProperty(id), [id]);
  return useQuery({
    queryKey: ["property", id],
    queryFn,
    enabled: Boolean(id),
  });
}

export function useDashboard(wallet) {
  const queryFn = useCallback(() => api.getDashboard(wallet), [wallet]);
  return useQuery({
    queryKey: ["dashboard", wallet],
    queryFn,
    enabled: Boolean(wallet),
  });
}

export function useProfile(wallet) {
  const queryFn = useCallback(() => api.getProfile(wallet), [wallet]);
  return useQuery({
    queryKey: ["profile", wallet],
    queryFn,
    enabled: Boolean(wallet),
  });
}

export function useInvestments(wallet) {
  const queryFn = useCallback(() => api.getInvestments(wallet), [wallet]);
  return useQuery({
    queryKey: ["investments", wallet],
    queryFn,
    enabled: Boolean(wallet),
  });
}
