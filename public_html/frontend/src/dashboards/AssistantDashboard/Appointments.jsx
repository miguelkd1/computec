import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost/proyectoTecnica/public_html/backend/api/appointments/read.php');
                setAppointments(response.data.records || []);
            } catch (err) {
                setError(err.response?.data?.message || 'No se pudo cargar la lista de citas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <p>Cargando citas...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Gestión de Citas</h2>

            {/* Aquí podría ir un formulario para crear nuevas citas */}
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Técnico</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appt) => (
                            <tr key={appt.id_cita}>
                                <td>{appt.id_cita}</td>
                                <td>{new Date(appt.fecha_cita).toLocaleDateString()}</td>
                                <td>{appt.hora_inicio}</td>
                                <td>{appt.cliente}</td>
                                <td>{appt.tecnico}</td>
                                <td>{appt.tipo_cita}</td>
                                <td>{appt.estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No hay citas programadas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments; 