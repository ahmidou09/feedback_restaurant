import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import GlobalStyles from './styles/GlobalStyles';
import FeedbackPage from './pages/FeedbackPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminTablesPage from './pages/AdminTablesPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Placeholder components
const Home = () => <h1>Welcome to Resto Feedback</h1>;

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
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
