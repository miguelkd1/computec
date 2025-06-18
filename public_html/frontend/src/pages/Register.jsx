import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import './Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post(API_ENDPOINTS.REGISTER, {
                nombre,
                apellido,
                email,
                password
            });

            if (response.status === 201) {
                setSuccess('¡Registro exitoso! Redirigiendo al login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(response.data.message || 'Error en el registro.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error de conexión o en el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-background">
                <div className="register-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>
            
            <div className="register-card">
                <div className="register-header">
                    <h1>Crear Cuenta</h1>
                    <p>Únete a nosotros y comienza tu experiencia</p>
                </div>
                
                <form onSubmit={handleRegister} className="register-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                id="nombre"
                                type="text" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                placeholder="Tu nombre"
                                required 
                                className="form-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input 
                                id="apellido"
                                type="text" 
                                value={apellido} 
                                onChange={(e) => setApellido(e.target.value)} 
                                placeholder="Tu apellido"
                                required 
                                className="form-input"
                            />
                        </div>
                    </div>
                    
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
                        <span className="password-hint">Mínimo 8 caracteres</span>
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
                    
                    {success && (
                        <div className="success-message">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {success}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className={`register-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Registrando...
                            </>
                        ) : (
                            'Crear Cuenta'
                        )}
                    </button>
                </form>
                
                <div className="register-footer">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link to="/login" className="login-link">
                        Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register; 