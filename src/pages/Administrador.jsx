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
    <div className="admin-container">
      {/* Header del Admin */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-info">
            <h1 className="admin-title">Panel de Administración</h1>
            <p className="admin-subtitle">Bienvenido, {user?.email}</p>
          </div>
          <div className="admin-actions">
            <button
              onClick={() => navigate('/')}
              className="admin-btn admin-btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11l-9-7-9 7z"/>
                <path d="M21 9l-9-7-9 7v11l9-7 9 7z"/>
              </svg>
              Inicio
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="admin-btn admin-btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Nuevo Espacio
            </button>
            <button
              onClick={handleLogout}
              className="admin-btn admin-btn-danger"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <div className="admin-form-header">
            <h3>{editingEspacio ? 'Editar Espacio' : 'Nuevo Espacio'}</h3>
            <button onClick={resetForm} className="admin-form-close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="admin-input"
                />
              </div>
              
              <div className="admin-form-group">
                <label className="admin-label">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="admin-select"
                >
                  <option value="oficina">Oficina</option>
                  <option value="sala_reuniones">Sala de Reuniones</option>
                  <option value="desk">Escritorio</option>
                  <option value="area_comun">Área Común</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Descripción</label>
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                required
                rows="3"
                className="admin-textarea"
              />
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Dimensiones</label>
                <input
                  type="text"
                  value={formData.dim}
                  onChange={(e) => setFormData({ ...formData, dim: e.target.value })}
                  placeholder="Ej: 18 m²"
                  className="admin-input"
                />
              </div>
              
              <div className="admin-form-group">
                <label className="admin-label">Capacidad</label>
                <input
                  type="text"
                  value={formData.cap}
                  onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                  placeholder="Ej: Hasta 4 personas"
                  className="admin-input"
                />
              </div>
              
              <div className="admin-form-group">
                <label className="admin-label">Color</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="admin-color-input"
                />
              </div>
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Orientación</label>
                <input
                  type="text"
                  value={formData.orientation}
                  onChange={(e) => setFormData({ ...formData, orientation: e.target.value })}
                  placeholder="Ej: Frente norte"
                  className="admin-input"
                />
              </div>
              
              <div className="admin-form-group">
                <label className="admin-label">Iluminación</label>
                <input
                  type="text"
                  value={formData.light}
                  onChange={(e) => setFormData({ ...formData, light: e.target.value })}
                  placeholder="Ej: Luz natural"
                  className="admin-input"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Características (separadas por comas)</label>
              <input
                type="text"
                value={formData.features.join(', ')}
                onChange={(e) => handleFeaturesChange(e.target.value)}
                placeholder="WiFi, Aire acondicionado, Escritorio"
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="admin-checkbox"
                />
                Disponible
              </label>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn admin-btn-primary">
                {editingEspacio ? 'Actualizar' : 'Guardar'}
              </button>
              <button type="button" onClick={resetForm} className="admin-btn admin-btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Espacios */}
      <div className="admin-content">
        <div className="admin-section-header">
          <h3 className="admin-section-title">Lista de Espacios ({espacios.length})</h3>
        </div>

        <div className="admin-spaces-grid">
          {espacios.map(espacio => (
            <div key={espacio.id} className="admin-space-card">
              <div className="admin-space-header">
                <div className="admin-space-info">
                  <h4 className="admin-space-name">{espacio.name}</h4>
                  <span className="admin-space-type">{espacio.typeLabel}</span>
                </div>
                <div className="admin-space-status">
                  <span className={`admin-status-badge ${espacio.available ? 'available' : 'occupied'}`}>
                    {espacio.available ? 'Disponible' : 'Ocupado'}
                  </span>
                </div>
              </div>

              <p className="admin-space-desc">{espacio.desc}</p>
              
              <div className="admin-space-meta">
                <div className="admin-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                  {espacio.dim}
                </div>
                <div className="admin-meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {espacio.cap}
                </div>
              </div>

              {espacio.features && espacio.features.length > 0 && (
                <div className="admin-space-features">
                  <div className="admin-features-label">Características:</div>
                  <div className="admin-features-list">
                    {espacio.features.map((feature, index) => (
                      <span key={index} className="admin-feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="admin-space-actions">
                <button
                  onClick={() => handleEdit(espacio)}
                  className="admin-btn admin-btn-warning"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 1 9.5-9.5z"/>
                  </svg>
                  Editar
                </button>
                <button
                  onClick={() => handleToggleAvailable(espacio)}
                  className={`admin-btn ${espacio.available ? 'admin-btn-danger' : 'admin-btn-success'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22,12 18,12 15,9 12,12 9,9 6,12 2,12"/>
                    <path d="M5.45 5.11L2 12v6l3.09-3.74A2 2 0 0 1 5.45 5.11z"/>
                  </svg>
                  {espacio.available ? 'Marcar Ocupado' : 'Marcar Disponible'}
                </button>
                <button
                  onClick={() => handleDelete(espacio.id)}
                  className="admin-btn admin-btn-danger"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2"/>
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Administrador;
