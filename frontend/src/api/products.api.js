import { http } from "./http";

// lista productos con filtros opcionales: q, categoryId
async function list(params = {}) {
  // params puede ser {} o { q: "gorra", categoryId: 2 }
  const qs = new URLSearchParams();

  if (params.q) qs.set("q", params.q);
  if (params.categoryId) qs.set("categoryId", params.categoryId);

  const url = qs.toString() ? `/products?${qs.toString()}` : "/products";
  return http.get(url);
}

export const productsApi = {
  list,
  getById: (id) => http.get(`/products/${id}`),
  create: (payload) => http.post("/products", payload),
  update: (id, payload) => http.put(`/products/${id}`, payload),
  remove: (id) => http.del(`/products/${id}`),
};
