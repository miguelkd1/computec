import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const response = await axios.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            });

            if (response.data && response.data.user) {
                login(response.data.user);
                
                // Redireccionar según el rol
                const role = response.data.user.rol.toLowerCase();
                switch (role) {
                    case 'administrador':
                        navigate('/admin/dashboard');
                        break;
                    case 'técnico':
                        navigate('/technician/dashboard');
                        break;
                    case 'cliente':
                        navigate('/client/dashboard');
                        break;
                    case 'asistente administrativo':
                        navigate('/assistant/dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError(response.data.message || 'Error en el login.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error de conexión o en el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>
            
            <div className="login-card">
                <div className="login-header">
                    <h1>Bienvenido</h1>
                    <p>Inicia sesión en tu cuenta</p>
                </div>
                
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input 
                            id="email"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="correo@ejemplo.com"
                            required 
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            id="password"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••"
                            required 
                            className="form-input"
                        />
                    </div>
                    
                    {error && (
                        <div className="error-message">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            {error}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className={`login-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Iniciando sesión...
                            </>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>¿No tienes cuenta?</p>
                    <Link to="/register" className="register-link">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login; 