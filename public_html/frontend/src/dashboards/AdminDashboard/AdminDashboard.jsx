import React, { useState } from 'react';
import UsersPanel from './UsersPanel';
import ReportsPanel from './ReportsPanel';
import SettingsPanel from './SettingsPanel';
import PanelControl from './PanelControl';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState('overview');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Componente temporal para vistas en desarrollo
    const ComingSoon = ({ title, features }) => (
        <div className="coming-soon">
            <div className="panel-header">
                <h2>{title}</h2>
                <p>Esta sección está en desarrollo</p>
            </div>
            <div className="features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <h3>{feature.name}</h3>
                        <p>{feature.description}</p>
                        <button className="btn-preview">Próximamente</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activePanel) {
            case 'panel-control':
                return <PanelControl />;
            
            case 'users':
                return <UsersPanel />;
            
            case 'estadisticas':
                return (
                    <ComingSoon 
                        title="Estadísticas"
                        features={[
                            { name: "Gráficos de Ventas", description: "Visualización de ventas por período" },
                            { name: "Servicios por Categoría", description: "Análisis de servicios más solicitados" },
                            { name: "Rendimiento de Departamentos", description: "KPIs por departamento" },
                            { name: "Tendencias del Negocio", description: "Análisis predictivo y tendencias" }
                        ]}
                    />
                );
            
            case 'supervision':
                return (
                    <ComingSoon 
                        title="Supervisión"
                        features={[
                            { name: "Actividad de Técnicos", description: "Monitoreo en tiempo real" },
                            { name: "Servicios en Proceso", description: "Estado actual de reparaciones" },
                            { name: "Sistema de Alertas", description: "Notificaciones importantes" },
                            { name: "Inventario en Tiempo Real", description: "Control de stock actualizado" }
                        ]}
                    />
                );
            
            case 'servicios':
                return (
                    <ComingSoon 
                        title="Servicios"
                        features={[
                            { name: "Registro de Servicio", description: "Crear nuevo servicio técnico" },
                            { name: "Agenda de Reparaciones", description: "Calendario de servicios" },
                            { name: "Facturación y Garantías", description: "Gestión de pagos y garantías" }
                        ]}
                    />
                );
            
            case 'inventario':
                return (
                    <ComingSoon 
                        title="Inventario"
                        features={[
                            { name: "Lista de Productos", description: "Catálogo completo de productos" },
                            { name: "Ingreso de Inventario", description: "Registrar nuevos productos" },
                            { name: "Salida de Inventario", description: "Control de ventas y salidas" },
                            { name: "Reportes de Stock", description: "Informes de inventario" }
                        ]}
                    />
                );
            
            case 'reports':
                return <ReportsPanel />;
            
            case 'settings':
                return <SettingsPanel />;
            
            case 'overview':
            default:
                return (
                    <div className="dashboard-container">
                        <div className="dashboard-header-main">
                            <h1>PANEL DE ADMINISTRADOR</h1>
                            <p>bienvenido {user?.nombre || '(nombre del usuario)'}</p>
                        </div>
                        
                        <div className="dashboard-grid">
                            <div className="dashboard-card" onClick={() => setActivePanel('panel-control')}>
                                <h3>panel de control</h3>
                                <div className="card-items">
                                    <p>VentasTotales</p>
                                    <p>ServiciosActivos</p>
                                    <p>InventarioResumen</p>
                                    <p>UsuariosActivos</p>
                                </div>
                            </div>

                            <div className="dashboard-card" onClick={() => setActivePanel('users')}>
                                <h3>usuarios</h3>
                                <div className="card-items">
                                    <p>ListaUsuarios</p>
                                    <p>CrearUsuario</p>
                                    <p>EditarUsuario</p>
                                    <p>AsignarRoles</p>
                                    <p>HistorialActividades</p>
                                </div>
                            </div>

                            <div className="dashboard-card" onClick={() => setActivePanel('estadisticas')}>
                                <h3>estadisticas</h3>
                                <div className="card-items">
                                    <p>GraficosVentas</p>
                                    <p>ServiciosCategoria</p>
                                    <p>RendimientoDeptos</p>
                                    <p>TendenciasNegocio</p>
                                </div>
                            </div>

                            <div className="dashboard-card" onClick={() => setActivePanel('supervision')}>
                                <h3>Supervision</h3>
                                <div className="card-items">
                                    <p>ActividadTecnicos</p>
                                    <p>ServiciosProceso</p>
                                    <p>Alertas</p>
                                    <p>InventarioTiempoReal</p>
                                </div>
                            </div>

                            <div className="dashboard-card" onClick={() => setActivePanel('servicios')}>
                                <h3>servicios</h3>
                                <div className="card-items">
                                    <p>RegistroServicio</p>
                                    <p>AgendaReparaciones</p>
                                    <p>Facturacion Garantias</p>
                                </div>
                            </div>

                            <div className="dashboard-card" onClick={() => setActivePanel('inventario')}>
                                <h3>inventario</h3>
                                <div className="card-items">
                                    <p>ListaProductos</p>
                                    <p>IngresoInventario</p>
                                    <p>SalidaInventario</p>
                                    <p>ReportesStock</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="admin-dashboard">
            {activePanel !== 'overview' && (
                <header className="dashboard-header">
                    <div className="header-content">
                        <div className="header-left">
                            <button 
                                className="back-btn"
                                onClick={() => setActivePanel('overview')}
                            >
                                ← Volver
                            </button>
                            <h2>{activePanel === 'users' ? 'Gestión de Usuarios' : 
                                 activePanel === 'panel-control' ? 'Panel de Control' :
                                 activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}</h2>
                        </div>
                        <div className="header-right">
                            <button className="user-menu">
                                <span className="user-avatar">
                                    {user?.nombre?.charAt(0) || 'U'}
                                </span>
                                <span className="user-name">{user?.nombre || 'Usuario'}</span>
                            </button>
                            <button className="logout-btn" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </header>
            )}

            <main className="dashboard-main">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard; 