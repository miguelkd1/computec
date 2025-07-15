import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TecnicoAccesoriosPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.tipo !== 'tecnico-accesorios') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.tipo !== 'tecnico-accesorios') {
    return null; // Evita parpadeo de contenido
  }

  return (
    <div>
      <h1>Bienvenido, Técnico de Accesorios</h1>
      <p>Has iniciado sesión como <strong>tecnico-accesorios</strong>.</p>
    </div>
  );
};

export default TecnicoAccesoriosPage; 