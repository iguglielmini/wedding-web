import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage, ExpensesPage, ExpensesTypesPage, GuestPage } from "../pages";
import DashboardLayout from "../layout/dashboardLayout";
import { useAuth } from "../context";

export default function PrivateRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/inicio" element={<DashboardPage />} />
        <Route path="/guests" element={<GuestPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/expensesTypes" element={<ExpensesTypesPage />} />
        {/* outras rotas internas */}
      </Routes>
    </DashboardLayout>
  );
}
