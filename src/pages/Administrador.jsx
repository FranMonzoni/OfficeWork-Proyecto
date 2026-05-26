import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEspacios, addEspacio, updateEspacio, deleteEspacio } from '../services/espaciosService';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';

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
    color: '#E8F0EE',
    direccion: 'Fleming',
    horarios: [],
    occupiedDates: []
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
      color: '#E8F0EE',
      direccion: 'Fleming',
      horarios: [],
      occupiedDates: []
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
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span className="text-lg">Cargando espacios...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header del Admin */}
      <div className="bg-gradient-to-r from-white via-background-100 to-white border-b border-gray-200 sticky top-0 z-40 shadow-xl backdrop-blur-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Panel de Administración
                </h1>
                <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  Bienvenido, {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="group relative px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-gray-200"
              >
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11l-9-7-9 7z"/>
                  <path d="M21 9l-9-7-9 7v11l9-7 9 7z"/>
                </svg>
                <span className="font-medium">Inicio</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="group relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span className="font-medium">Nuevo Espacio</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </button>
              <button
                onClick={handleLogout}
                className="group relative px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-background-100 border border-gray-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 animate-slide-up">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {editingEspacio ? (
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    ) : (
                      <>
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {editingEspacio ? 'Editar Espacio' : 'Nuevo Espacio'}
                </h3>
              </div>
              <button
                onClick={resetForm}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-blue-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                    placeholder="Nombre del espacio"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-purple-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="9" y1="9" x2="15" y2="9"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                    Tipo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  >
                    <option value="oficina">Oficina</option>
                    <option value="sala_reuniones">Sala de Reuniones</option>
                    <option value="desk">Escritorio</option>
                    <option value="area_comun">Área Común</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-cyan-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Dirección (Casa)
                  </label>
                  <select
                    value={formData.direccion || 'Fleming'}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  >
                    <option value="Fleming">Fleming</option>
                    <option value="Iturraspe">Iturraspe</option>
                    <option value="España">España</option>
                    <option value="Colón">Colón</option>
                  </select>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-green-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  Descripción
                </label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 resize-none"
                  placeholder="Describe el espacio..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-yellow-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                    Dimensiones
                  </label>
                  <input
                    type="text"
                    value={formData.dim}
                    onChange={(e) => setFormData({ ...formData, dim: e.target.value })}
                    placeholder="Ej: 18 m²"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-orange-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Capacidad
                  </label>
                  <input
                    type="text"
                    value={formData.cap}
                    onChange={(e) => setFormData({ ...formData, cap: e.target.value })}
                    placeholder="Ej: Hasta 4 personas"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-pink-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
                    />
                    <span className="text-xs text-gray-500 font-mono">{formData.color}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-cyan-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    Orientación
                  </label>
                  <input
                    type="text"
                    value={formData.orientation}
                    onChange={(e) => setFormData({ ...formData, orientation: e.target.value })}
                    placeholder="Ej: Frente norte"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-indigo-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 8.96l4.24 4.24m12.44 0l4.24 4.24M1.54 15.04l4.24-4.24"/>
                    </svg>
                    Iluminación
                  </label>
                  <input
                    type="text"
                    value={formData.light}
                    onChange={(e) => setFormData({ ...formData, light: e.target.value })}
                    placeholder="Ej: Luz natural"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-emerald-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  Características (separadas por comas)
                </label>
                <input
                  type="text"
                  value={formData.features.join(', ')}
                  onChange={(e) => handleFeaturesChange(e.target.value)}
                  placeholder="WiFi, Aire acondicionado, Escritorio"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                />
              </div>

              {/* Horarios y Calendario de Disponibilidad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                {/* Checkboxes de Horarios */}
                <div className="group">
                  <label className="block text-sm font-medium text-orange-600 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    Horarios Disponibles
                  </label>
                  <div className="space-y-3">
                    {['mañana', 'mediodia', 'tarde'].map((turno) => {
                      const label = turno === 'mañana' ? 'Mañana (08:00 - 12:00)' : 
                                    turno === 'mediodia' ? 'Mediodía (12:00 - 15:00)' : 
                                    'Tarde (15:00 - 20:00)';
                      const isChecked = (formData.horarios || []).includes(turno);
                      return (
                        <label key={turno} className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const newHorarios = e.target.checked
                                ? [...(formData.horarios || []), turno]
                                : (formData.horarios || []).filter(h => h !== turno);
                              setFormData({ ...formData, horarios: newHorarios });
                            }}
                            className="w-5 h-5 text-orange-600 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                          />
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Calendario de Días Ocupados */}
                <div className="group">
                  <label className="block text-sm font-medium text-rose-600 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Marcar Días Ocupados
                  </label>
                  <Calendar
                    selectedDates={formData.occupiedDates || []}
                    onChange={(newDates) => setFormData({ ...formData, occupiedDates: newDates })}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Haz clic en los días ocupados (se pintarán de rojo).
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border border-gray-200">
                <label className="flex items-center gap-3 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-5 h-5 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Disponible
                  </span>
                </label>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  formData.available 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {formData.available ? 'Activo' : 'Inactivo'}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {editingEspacio ? (
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    ) : (
                      <>
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <polyline points="17,21 17,13 7,13 7,21"/>
                        <polyline points="7,3 7,8 15,8"/>
                      </>
                    )}
                  </svg>
                  {editingEspacio ? 'Actualizar' : 'Guardar'}
                </button>
                <button type="button" onClick={resetForm} className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Espacios */}
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lista de Espacios ({espacios.length})
              </h3>
              <p className="text-gray-600 text-sm mt-1">Gestiona todos tus espacios de trabajo</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                {espacios.filter(e => e.available).length} Disponibles
              </div>
              <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium border border-red-200">
                {espacios.filter(e => !e.available).length} Ocupados
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {espacios.map(espacio => (
            <div key={espacio.id} className="group relative bg-gradient-to-br from-white to-background-100 border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                {/* Header de la card */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full shadow-lg animate-pulse"
                        style={{ backgroundColor: espacio.color || '#3b82f6' }}
                      ></div>
                      <h4 className="text-lg font-bold text-gray-900 font-display group-hover:text-blue-600 transition-colors duration-200">
                        {espacio.name}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full border border-blue-200">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                        </svg>
                        {espacio.typeLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium text-purple-600 bg-purple-100 rounded-full border border-purple-200">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {espacio.direccion || 'Fleming'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${
                      espacio.available 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-red-100 text-red-700 border-red-200'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        espacio.available ? 'bg-green-600' : 'bg-red-600'
                      } ${espacio.available ? 'animate-pulse' : ''}`}></div>
                      {espacio.available ? 'Disponible' : 'Ocupado'}
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{espacio.desc}</p>
                
                {/* Metadatos */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-lg">
                    <svg className="w-4 h-4 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                    <span className="font-medium">{espacio.dim}</span>
                  </span>
                  <span className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-lg">
                    <svg className="w-4 h-4 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span className="font-medium">{espacio.cap}</span>
                  </span>
                  {espacio.occupiedDates && espacio.occupiedDates.length > 0 && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-150 font-semibold shadow-sm">
                      <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {espacio.occupiedDates.length} d
                    </span>
                  )}
                </div>

                {/* Horarios */}
                {espacio.horarios && espacio.horarios.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      Horarios Disponibles
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {espacio.horarios.map(h => (
                        <span key={h} className="px-2.5 py-0.5 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-200/60 capitalize font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Características */}
                {espacio.features && espacio.features.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                        <line x1="7" y1="7" x2="7.01" y2="7"/>
                      </svg>
                      Características
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {espacio.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          {feature}
                        </span>
                      ))}
                      {espacio.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200">
                          +{espacio.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(espacio)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 1 9.5-9.5z"/>
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggleAvailable(espacio)}
                    className={`flex-1 px-3 py-2 text-white text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-1 ${
                      espacio.available 
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                    }`}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22,12 18,12 15,9 12,12 9,9 6,12 2,12"/>
                      <path d="M5.45 5.11L2 12v6l3.09-3.74A2 2 0 0 1 5.45 5.11z"/>
                    </svg>
                    {espacio.available ? 'Ocupar' : 'Liberar'}
                  </button>
                  <button
                    onClick={() => handleDelete(espacio.id)}
                    className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-1"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Administrador;
