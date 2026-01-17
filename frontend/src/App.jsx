import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import GlobalStyles from './styles/GlobalStyles';
import FeedbackPage from './pages/FeedbackPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminTablesPage from './pages/AdminTablesPage';
import MenuPage from './pages/MenuPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MenuPage />} />
          <Route path="feedback/:restaurantId/:tableId" element={<FeedbackPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="admin/tables" element={<AdminTablesPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
