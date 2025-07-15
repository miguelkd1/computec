import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TecnicoPCPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.tipo !== 'tecnico-PC') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.tipo !== 'tecnico-PC') {
    return null; // Evita parpadeo de contenido
  }

  return (
    <div>
      <h1>Bienvenido, Técnico de PC</h1>
      <p>Has iniciado sesión como <strong>tecnico-PC</strong>.</p>
    </div>
  );
};

export default TecnicoPCPage; 