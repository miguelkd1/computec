import React, { useState, useEffect } from 'react';
import API_ENDPOINTS from '../../config/api';
import './UsersPanel.css';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    id_tipo_usuario: ''
  });

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.USERS_LIST);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.records || []);
      } else {
        setError(data.message || 'Error al cargar usuarios');
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear usuario
  const createUser = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Usuario creado exitosamente');
        setShowModal(false);
        fetchUsers();
        resetForm();
      } else {
        alert(data.message || 'Error al crear usuario');
      }
    } catch (err) {
      alert('Error de conexión al servidor');
    }
  };

  // Función para actualizar usuario
  const updateUser = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS_UPDATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id_usuario: editingUser.id_usuario
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Usuario actualizado exitosamente');
        setShowModal(false);
        fetchUsers();
        resetForm();
      } else {
        alert(data.message || 'Error al actualizar usuario');
      }
    } catch (err) {
      alert('Error de conexión al servidor');
    }
  };

  // Función para eliminar usuario
  const deleteUser = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este usuario?')) return;
    
    try {
      const response = await fetch(API_ENDPOINTS.USERS_DELETE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario: id })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Usuario eliminado exitosamente');
        fetchUsers();
      } else {
        alert(data.message || 'Error al eliminar usuario');
      }
    } catch (err) {
      alert('Error de conexión al servidor');
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingUser(null);
    resetForm();
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: '',
      id_tipo_usuario: user.id_tipo_usuario || ''
    });
    setShowModal(true);
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      id_tipo_usuario: ''
    });
    setEditingUser(null);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser();
    } else {
      createUser();
    }
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="users-panel">
      <div className="panel-header">
        <h2>Gestión de Usuarios</h2>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nuevo Usuario
        </button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No hay usuarios registrados</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id_usuario}>
                  <td>{user.id_usuario}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td className="actions">
                    <button 
                      className="btn btn-sm btn-edit" 
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-delete" 
                      onClick={() => deleteUser(user.id_usuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para crear/editar usuario */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={editingUser ? 'Dejar en blanco para mantener la actual' : ''}
                  required={!editingUser}
                />
              </div>

              <div className="form-group">
                <label>Tipo de Usuario:</label>
                <select
                  name="id_tipo_usuario"
                  value={formData.id_tipo_usuario}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="1">Administrador</option>
                  <option value="2">Técnico</option>
                  <option value="3">Ventas</option>
                  <option value="4">Asistente</option>
                  <option value="5">Supervisor</option>
                  <option value="6">Cliente</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPanel; 