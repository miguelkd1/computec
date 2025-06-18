import React from 'react';
import MyServices from './MyServices';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f0f0f0' }}>
                <h1>Portal del Cliente</h1>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </header>
            
            <main style={{ padding: '1rem' }}>
                <p>Bienvenido, {user?.nombre}!</p>

                <section>
                    <MyServices />
                </section>

                {/* Aquí irán los otros paneles: Historial de Compras, Comunicación, etc. */}
            </main>
        </div>
    );
};

export default ClientDashboard; 