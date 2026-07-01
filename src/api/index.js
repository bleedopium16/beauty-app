const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api";
export function getToken() {
  return localStorage.getItem("veloure_token");
}
export function setToken(token) {
  localStorage.setItem("veloure_token", token);
}
export function clearToken() {
  localStorage.removeItem("veloure_token");
}

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const authApi = {
  register: (name, email, password) =>
    request("/auth/register", { method: "POST", body: { name, email, password } }),
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),
  me: () => request("/auth/me"),
};

export const productApi = {
  getAll: (category) =>
    request(category ? `/products?category=${category}` : "/products"),
  getBestsellers: () => request("/products/bestsellers"),
  search: (query) => request(`/products?search=${encodeURIComponent(query)}`),
  getOne: (id) => request(`/products/${id}`),
};

export const cartApi = {
  get: () => request("/cart"),
  add: (productId, qty = 1) =>
    request("/cart", { method: "POST", body: { productId, qty } }),
  decrease: (productId) =>
    request("/cart/decrease", { method: "PATCH", body: { productId } }),
  remove: (productId) => request(`/cart/${productId}`, { method: "DELETE" }),
};

export const orderApi = {
  place: () => request("/orders", { method: "POST" }),
  history: () => request("/orders"),
};

export const wishlistApi = {
  get: () => request("/wishlist"),
  toggle: (productId) =>
    request("/wishlist", { method: "POST", body: { productId } }),
};