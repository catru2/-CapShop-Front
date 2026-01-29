import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import AdminDashboard from "../pages/AdminDashboard";
import Forbidden from "../pages/Forbidden";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/forbidden" element={<Forbidden />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div className="p-6">404</div>} />
    </Routes>
  );
}
