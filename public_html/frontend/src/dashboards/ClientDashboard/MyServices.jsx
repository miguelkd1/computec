import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const MyServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !user.id_cliente) {
            setLoading(false);
            setError('No se pudo verificar la información del cliente.');
            return;
        }

        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost/proyectoTecnica/public_html/backend/api/services/read_by_client.php?client_id=${user.id_cliente}`);
                setServices(response.data.records || []);
            } catch (err) {
                setError(err.response?.data?.message || 'No se pudo cargar el historial de servicios.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [user]);

    if (loading) return <p>Cargando servicios...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Mis Servicios y Reparaciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Servicio</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Fecha Ingreso</th>
                        <th>Estado</th>
                        <th>Técnico Asignado</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <tr key={service.id_servicio}>
                                <td>{service.id_servicio}</td>
                                <td>{service.tipo_servicio}</td>
                                <td>{service.descripcion}</td>
                                <td>{new Date(service.fecha_ingreso).toLocaleDateString()}</td>
                                <td>{service.estado}</td>
                                <td>{service.tecnico}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No tienes servicios registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyServices; 