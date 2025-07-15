import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AxiliarPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.tipo !== 'axiliar') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.tipo !== 'axiliar') {
    return null; // Evita parpadeo de contenido
  }

  return (
    <div>
      <h1>Bienvenido, Auxiliar</h1>
      <p>Has iniciado sesión como <strong>axiliar</strong>.</p>
    </div>
  );
};

export default AxiliarPage; 