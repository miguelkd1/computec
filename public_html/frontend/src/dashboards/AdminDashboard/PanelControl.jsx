import React from 'react';
import './PanelControl.css';

const PanelControl = () => {
    const handleFeatureClick = (feature) => {
        alert(`Funcionalidad "${feature}" en desarrollo`);
    };

    return (
        <div className="panel-control">
            <div className="panel-header">
                <h2>Panel de Control</h2>
                <p>Vista general del sistema</p>
            </div>

            <div className="control-grid">
                <div className="control-card" onClick={() => handleFeatureClick('Ventas Totales')}>
                    <div className="card-icon">💰</div>
                    <h3>Ventas Totales</h3>
                    <p>Resumen de ventas del día, semana y mes</p>
                    <button className="btn-action">Ver Detalles →</button>
                </div>

                <div className="control-card" onClick={() => handleFeatureClick('Servicios Activos')}>
                    <div className="card-icon">🔧</div>
                    <h3>Servicios Activos</h3>
                    <p>Servicios en proceso y pendientes</p>
                    <button className="btn-action">Ver Detalles →</button>
                </div>

                <div className="control-card" onClick={() => handleFeatureClick('Inventario Resumen')}>
                    <div className="card-icon">📦</div>
                    <h3>Inventario Resumen</h3>
                    <p>Estado actual del inventario</p>
                    <button className="btn-action">Ver Detalles →</button>
                </div>

                <div className="control-card" onClick={() => handleFeatureClick('Usuarios Activos')}>
                    <div className="card-icon">👥</div>
                    <h3>Usuarios Activos</h3>
                    <p>Usuarios conectados actualmente</p>
                    <button className="btn-action">Ver Detalles →</button>
                </div>
            </div>
        </div>
    );
};

export default PanelControl; 