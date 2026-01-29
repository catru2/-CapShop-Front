import { http } from "./http";

export const categoriesApi = {
  list: () => http.get("/categories"),
  create: (payload) => http.post("/categories", payload),
  update: (id, payload) => http.put(`/categories/${id}`, payload),
  remove: (id) => http.del(`/categories/${id}`),
};
    
