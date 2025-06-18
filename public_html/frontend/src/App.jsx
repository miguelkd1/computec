import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Dashboards
import AdminDashboard from './dashboards/AdminDashboard/AdminDashboard';
import TechnicianDashboard from './dashboards/TechnicianDashboard/TechnicianDashboard';
import ClientDashboard from './dashboards/ClientDashboard/ClientDashboard';
import AssistantDashboard from './dashboards/AssistantDashboard/AssistantDashboard';
import SalesDashboard from './dashboards/SalesDashboard/SalesDashboard';

function App() {
  return (
    <Router basename="/proyectoTecnica/public_html/frontend/dist">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['administrador']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['técnico']} />}>
            <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['cliente']} />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['asistente administrativo']} />}>
            <Route path="/assistant/dashboard" element={<AssistantDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['vendedor']} />}>
            <Route path="/sales/dashboard" element={<SalesDashboard />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
