import React from 'react';
import Appointments from './Appointments';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AssistantDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f0f0f0' }}>
                <h1>Dashboard de Asistente</h1>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </header>
            
            <main style={{ padding: '1rem' }}>
                <p>Bienvenido, {user?.nombre}!</p>

                <section>
                    <Appointments />
                </section>
                
                {/* Aquí irán otros paneles como Control Documental y Atención al Cliente */}
            </main>
        </div>
    );
};

export default AssistantDashboard; 