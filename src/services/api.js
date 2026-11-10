const API_BASE = import.meta.env.REACT_APP_API_URL || "http://localhost:3344";

async function request(path, { method = "GET", params, body } = {}) {
  const url = new URL(`${API_BASE}/api/v1${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json?.message || json?.error || res.statusText || "Request failed";
    throw new Error(message);
  }
  return json;
}

const unwrap = (json) => json?.data ?? json;

export const api = {
  getFeaturedProperties: () => request("/properties/featured").then(unwrap),

  getProperties: (params = {}) =>
    request("/properties", { params }).then((res) => ({
      data: res.data ?? [],
      total: res.pagination?.total ?? 0,
      page: res.pagination?.page ?? 1,
      limit: res.pagination?.limit ?? 12,
    })),

  getProperty: (id) => request(`/properties/${id}`).then(unwrap),

  createProperty: (payload) => request("/properties", { method: "POST", body: payload }).then(unwrap),

  approveProperty: (id) => request(`/properties/${id}/approve`, { method: "PATCH" }).then(unwrap),

  getDashboard: (wallet) => request(`/dashboard/${wallet}`).then(unwrap),

  getProfile: (wallet) => request(`/profile/${wallet}`).then(unwrap),

  updateProfile: (wallet, payload) =>
    request(`/profile/${wallet}`, { method: "PATCH", body: payload }).then(unwrap),

  getInvestments: (wallet) => request(`/investments/${wallet}`).then(unwrap),

  createInvestment: (wallet, payload) =>
    request(`/investments/${wallet}`, { method: "POST", body: payload }).then(unwrap),

  sellInvestment: (wallet, investmentId, payload) =>
    request(`/investments/${wallet}/${investmentId}/sell`, {
      method: "POST",
      body: payload,
    }).then(unwrap),

  getKycStatus: (wallet) => request(`/kyc/${wallet}/status`).then(unwrap),

  submitKyc: (wallet, payload) =>
    request(`/kyc/${wallet}/submit`, { method: "POST", body: payload }).then(unwrap),

  listPendingKyc: () => request("/kyc/pending").then(unwrap),

  reviewKyc: (id, payload) =>
    request(`/kyc/${id}/review`, { method: "PATCH", body: payload }).then(unwrap),

  getAdminAnalytics: () => request("/admin/analytics").then(unwrap),

  getAdminProperties: (params) =>
    request("/admin/properties", { params }).then((res) => ({
      data: res.data ?? [],
      total: res.pagination?.total ?? 0,
    })),

  getAdminUsers: (params) =>
    request("/admin/users", { params }).then((res) => ({
      data: res.data ?? [],
      total: res.pagination?.total ?? 0,
    })),

  getAdminTransactions: (params) =>
    request("/admin/transactions", { params }).then((res) => ({
      data: res.data ?? [],
      total: res.pagination?.total ?? 0,
    })),

  getFavorites: (wallet) => request(`/favorites/${wallet}`).then(unwrap),

  addFavorite: (wallet, propertyId) =>
    request(`/favorites/${wallet}`, { method: "POST", body: { propertyId } }).then(unwrap),

  removeFavorite: (wallet, propertyId) =>
    request(`/favorites/${wallet}/${propertyId}`, { method: "DELETE" }).then(unwrap),

  checkFavorite: (wallet, propertyId) =>
    request(`/favorites/${wallet}/${propertyId}`).then(unwrap),

  subscribeNewsletter: (email) =>
    request("/newsletter/subscribe", { method: "POST", body: { email } }).then(unwrap),
};
