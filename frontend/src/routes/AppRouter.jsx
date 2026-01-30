import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

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
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/forbidden" element={<Forbidden />} />
      </Route>

      {/* ADMIN */}
      <Route
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
