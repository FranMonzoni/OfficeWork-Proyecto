import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEspacios, addEspacio, updateEspacio, deleteEspacio } from '../services/espaciosService';
import { useNavigate } from 'react-router-dom';

const Administrador = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEspacio, setEditingEspacio] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'oficina',
    typeLabel: 'Oficina privada',
    desc: '',
    available: true,
    dim: '',
    cap: '',
    orientation: '',
    light: '',
    features: [],
    color: '#E8F0EE'
  });

  useEffect(() => {
    fetchEspacios();
  }, []);

  const fetchEspacios = async () => {
    try {
      const data = await getEspacios();
      setEspacios(data);
    } catch (error) {
      console.error('Error al cargar espacios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEspacio) {
        await updateEspacio(editingEspacio.id, formData);
      } else {
        await addEspacio(formData);
      }
      resetForm();
      fetchEspacios();
    } catch (error) {
      console.error('Error al guardar espacio:', error);
    }
  };

  const handleEdit = (espacio) => {
    setEditingEspacio(espacio);
    setFormData(espacio);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este espacio?')) {
      try {
        await deleteEspacio(id);
        fetchEspacios();
      } catch (error) {
        console.error('Error al eliminar espacio:', error);
      }
    }
  };

  const handleToggleAvailable = async (espacio) => {
    try {
      await updateEspacio(espacio.id, { ...espacio, available: !espacio.available });
      fetchEspacios();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'oficina',
      typeLabel: 'Oficina privada',
      desc: '',
      available: true,
      dim: '',
      cap: '',
      orientation: '',
      light: '',
      features: [],
      color: '#E8F0EE'
    });
    setEditingEspacio(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleFeaturesChange = (value) => {
    const features = value.split(',').map(f => f.trim()).filter(f => f);
    setFormData({ ...formData, features });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Cargando espacios...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        borderBottom: '2px solid #eee',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>Panel de Administración</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Bienvenido, {user?.email}
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            + Nuevo Espacio
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #ddd'
        }}>
          <h3>{editingEspacio ? 'Editar Espacio' : 'Nuevo Espacio'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Nombre:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Tipo:
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="oficina">Oficina</option>
                  <option value="sala_reuniones">Sala de Reuniones</option>
                  <option value="desk">Escritorio</option>
                  <option value="area_comun">Área Común</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Descripción:
              </label>
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                required
                rows="3"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Dimensiones:
                </label>
                <input
                  type="text"
                  value={formData.dim}
                  onChange={(e) => setFormData({ ...formData, dim: e.target.value })}
                  placeholder="Ej: 18 m²"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Capacidad:
                </label>
                <input
                  type="text"
                  value={formData.cap}
                  onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                  placeholder="Ej: Hasta 4 personas"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Color:
                </label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  style={{ width: '100%', height: '36px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Orientación:
                </label>
                <input
                  type="text"
                  value={formData.orientation}
                  onChange={(e) => setFormData({ ...formData, orientation: e.target.value })}
                  placeholder="Ej: Frente norte"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Iluminación:
                </label>
                <input
                  type="text"
                  value={formData.light}
                  onChange={(e) => setFormData({ ...formData, light: e.target.value })}
                  placeholder="Ej: Luz natural"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Características (separadas por comas):
              </label>
              <input
                type="text"
                value={formData.features.join(', ')}
                onChange={(e) => handleFeaturesChange(e.target.value)}
                placeholder="WiFi, Aire acondicionado, Escritorio"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                Disponible
              </label>
            </div>

            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                {editingEspacio ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h3>Lista de Espacios ({espacios.length})</h3>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {espacios.map(espacio => (
          <div
            key={espacio.id}
            style={{
              backgroundColor: espacio.color,
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{espacio.name}</h4>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {espacio.typeLabel}
                </span>
              </div>
              <div>
                <span style={{
                  backgroundColor: espacio.available ? '#28a745' : '#dc3545',
                  color: 'white',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginRight: '5px'
                }}>
                  {espacio.available ? 'Disponible' : 'Ocupado'}
                </span>
              </div>
            </div>

            <p style={{ margin: '0 0 10px 0', color: '#555' }}>{espacio.desc}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '14px' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '2px 6px', borderRadius: '3px' }}>
                📏 {espacio.dim}
              </span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '2px 6px', borderRadius: '3px' }}>
                👥 {espacio.cap}
              </span>
            </div>

            {espacio.features && espacio.features.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Características:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {espacio.features.map((feature, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.4)',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontSize: '11px'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEdit(espacio)}
                style={{
                  backgroundColor: '#ffc107',
                  color: '#000',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Editar
              </button>
              <button
                onClick={() => handleToggleAvailable(espacio)}
                style={{
                  backgroundColor: espacio.available ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {espacio.available ? 'Marcar Ocupado' : 'Marcar Disponible'}
              </button>
              <button
                onClick={() => handleDelete(espacio.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Administrador;
