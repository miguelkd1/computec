import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.tipo !== 'admin') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.tipo !== 'admin') {
    return null; // Evita parpadeo de contenido
  }

  return (
    <div>
      <h1>Bienvenido, Administrador</h1>
      <p>Has iniciado sesión como <strong>admin</strong>.</p>
    </div>
  );
};

export default AdminPage; 