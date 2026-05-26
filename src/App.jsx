import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { getEspacios } from './services/espaciosService'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Administrador from './pages/Administrador'

// Componente de menú hamburguesa
const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={toggleMenu}
        className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-lg"
      >
        <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div className={`absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl transition-all duration-200 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        <a href="/login" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors duration-150 rounded-t-lg">Iniciar Sesión</a>
        <a href="/administrador" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors duration-150 rounded-b-lg">Panel de Administración</a>
      </div>
    </div>
  );
};

// Componente para la página principal
const HomePage = () => {
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    fetchEspacios();
  }, []);

  const fetchEspacios = async () => {
    try {
      const data = await getEspacios();
      setEspacios(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar espacios:', err);
      setError('No se pudieron cargar los espacios. Verifica la configuración de Firebase.');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredEspacios = () => {
    if (filter === 'disponible') {
      return espacios.filter(e => e.available);
    }
    if (filter === 'oficina') {
      return espacios.filter(e => e.type === 'oficina');
    }
    if (filter === 'reuniones') {
      return espacios.filter(e => e.type === 'sala_reuniones');
    }
    if (filter === 'eventos') {
      return espacios.filter(e => e.type === 'area_comun');
    }
    return espacios;
  };

  const filteredEspacios = getFilteredEspacios();

  // Iconos SVG para las tarjetas
  const getRoomIcon = (type) => {
    switch(type) {
      case 'oficina':
        return `<svg class="room-thumb-icon" viewBox="0 0 64 64" fill="none" stroke="#2D5A4E" stroke-width="1.5"><rect x="8" y="20" width="48" height="36" rx="2"/><path d="M8 28h48M20 28V56M44 28V56"/><rect x="24" y="36" width="16" height="20" rx="1"/><path d="M16 8h32v12H16z"/></svg>`;
      case 'sala_reuniones':
        return `<svg class="room-thumb-icon" viewBox="0 0 64 64" fill="none" stroke="#2D3A5A" stroke-width="1.5"><ellipse cx="32" cy="38" rx="22" ry="12"/><circle cx="14" cy="32" r="3"/><circle cx="32" cy="28" r="3"/><circle cx="50" cy="32" r="3"/><circle cx="20" cy="42" r="3"/><circle cx="44" cy="42" r="3"/><rect x="16" y="12" width="32" height="20" rx="2"/><path d="M24 12v20M40 12v20"/></svg>`;
      case 'desk':
        return `<svg class="room-thumb-icon" viewBox="0 0 64 64" fill="none" stroke="#5A2D2D" stroke-width="1.5"><rect x="10" y="18" width="44" height="34" rx="2"/><rect x="18" y="30" width="12" height="16" rx="1"/><rect x="34" y="30" width="12" height="16" rx="1"/><path d="M10 28h44M26 18v34"/></svg>`;
      default:
        return `<svg class="room-thumb-icon" viewBox="0 0 64 64" fill="none" stroke="#4A2D5A" stroke-width="1.5"><rect x="4" y="16" width="56" height="38" rx="2"/><path d="M4 28h56M16 16V54M48 16V54"/><rect x="20" y="34" width="24" height="14" rx="1"/><path d="M32 16V8M24 8h16"/></svg>`;
    }
  };

  return (
    <div className="min-h-screen bg-background-50 text-gray-900">
      <MenuDropdown />
      
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-br from-white via-background-100 to-background-50 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-4 animate-fade-in">
            Espacios de trabajo
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Office Work
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-blue-600"></span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Casas reformadas en el corazón de la ciudad, convertidas en espacios de trabajo flexibles para profesionales y equipos.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <line x1="12" y1="20" x2="12.01" y2="20"/>
              </svg>
              WiFi de alta velocidad
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
              Aire acond. frío/calor
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 2h18M3 6h18M9 2v4M15 2v4M12 10v4M12 14l-2 2M12 14l2 2M4 20h16a1 1 0 0 0 1-1v-9H3v9a1 1 0 0 0 1 1z"/>
              </svg>
              Cocina equipada
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              2 baños compartidos
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/>
                <path d="M12 2v6"/>
              </svg>
              Dispenser de agua
            </div>
          </div>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="py-16 px-6 text-center">
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
          Nuestros espacios
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
          Encontrá el lugar ideal para vos
        </h2>
      </div>

      {/* FILTER BAR */}
      <div className="px-6 pb-8">
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          <button 
            onClick={() => setFilter('todos')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'todos' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('oficina')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'oficina' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Oficinas privadas
          </button>
          <button 
            onClick={() => setFilter('reuniones')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'reuniones' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Sala de reuniones
          </button>
          <button 
            onClick={() => setFilter('eventos')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'eventos' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Sala de eventos
          </button>
          <button 
            onClick={() => setFilter('disponible')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'disponible' 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/25' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Solo disponibles
          </button>
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Cargando espacios...
              </div>
            </div>
          )}
          
          {error && (
            <div className="col-span-full text-center py-12">
              <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 inline-block">
                {error}
              </div>
            </div>
          )}
          
          {!loading && !error && filteredEspacios.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-sm">
                No hay espacios que coincidan con el filtro seleccionado.
              </div>
            </div>
          )}
          
          {!loading && !error && filteredEspacios.map(espacio => (
            <div key={espacio.id} className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-card-hover transition-all duration-300 ${!espacio.available ? 'opacity-75' : ''}`}>
              <div className="relative mb-4">
                <div 
                  className="h-32 rounded-lg flex items-center justify-center relative overflow-hidden"
                  style={{ background: espacio.color || '#3b82f6' }}
                >
                  <div dangerouslySetInnerHTML={{ __html: getRoomIcon(espacio.type) }} />
                  <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
                    espacio.available 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {espacio.available ? 'Disponible' : 'Ocupado'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                  {espacio.typeLabel}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 font-display">
                  {espacio.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {espacio.desc}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                    {espacio.dim}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    {espacio.cap}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {espacio.features && espacio.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200">
                      {feature}
                    </span>
                  ))}
                  {espacio.features && espacio.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200">
                      +{espacio.features.length - 3} más
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="bg-white border-t border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">
            ¿Querés saber más?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactanos para consultar tarifas, recorrer el espacio o reservar una visita sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+543564472828" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 17z"/>
              </svg>
              Llamanos
            </a>
            <a href="mailto:mauriciomonzoni@hotmail.com" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 border border-gray-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Escribinos
            </a>
            <a href="https://www.google.com/maps/place/Espa%C3%B1a+219,+San+Francisco,+C%C3%B3rdoba/@-31.4267348,-62.0896043,19z/data=!3m1!4b1!4m6!3m5!1s0x95cb283d64e87f37:0xa74fc0b21828a5ad!8m2!3d-31.4267348!4d-62.0889606!16s%2Fg%2F11vb_9gf3_?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 border border-gray-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/administrador" 
            element={
              <AdminRoute>
                <Administrador />
              </AdminRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
