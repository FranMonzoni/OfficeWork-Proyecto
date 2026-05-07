import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { getEspacios } from './services/espaciosService'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Administrador from './pages/Administrador'
import './App.css'

// Componente de menú hamburguesa
const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="header">
      <button className="menu-toggle" onClick={toggleMenu}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      <div className={`menu-dropdown ${isOpen ? 'open' : ''}`}>
        <a href="/login" className="menu-item">Iniciar Sesión</a>
        <a href="/administrador" className="menu-item">Panel de Administración</a>
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
    <div className="app">
      <MenuDropdown />
      
      {/* HERO SECTION */}
      <div className="hero">
        <p className="hero-eyebrow">Espacios de trabajo</p>
        <h1>Office Work<br/><em></em></h1>
        <p className="hero-desc">
          Una casa reformada en el corazón de la ciudad, convertida en espacios de trabajo flexibles para profesionales y equipos.
        </p>
        <div className="hero-amenities">
          <span className="amenity-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
              <line x1="12" y1="20" x2="12.01" y2="20"/>
            </svg>
            WiFi de alta velocidad
          </span>
          <span className="amenity-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
            Aire acond. frío/calor
          </span>
          <span className="amenity-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 2h18M3 6h18M9 2v4M15 2v4M12 10v4M12 14l-2 2M12 14l2 2M4 20h16a1 1 0 0 0 1-1v-9H3v9a1 1 0 0 0 1 1z"/>
            </svg>
            Cocina equipada
          </span>
          <span className="amenity-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            2 baños compartidos
          </span>
          <span className="amenity-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/>
              <path d="M12 2v6"/>
            </svg>
            Dispenser de agua
          </span>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="section-header">
        <p className="section-label">Nuestros espacios</p>
        <h2 className="section-title">Encontrá el lugar ideal para vos</h2>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <button 
          className={`filter-btn ${filter === 'todos' ? 'active' : ''}`}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button 
          className={`filter-btn ${filter === 'oficina' ? 'active' : ''}`}
          onClick={() => setFilter('oficina')}
        >
          Oficinas privadas
        </button>
        <button 
          className={`filter-btn ${filter === 'reuniones' ? 'active' : ''}`}
          onClick={() => setFilter('reuniones')}
        >
          Sala de reuniones
        </button>
        <button 
          className={`filter-btn ${filter === 'eventos' ? 'active' : ''}`}
          onClick={() => setFilter('eventos')}
        >
          Sala de eventos
        </button>
        <button 
          className={`filter-btn ${filter === 'disponible' ? 'active' : ''}`}
          onClick={() => setFilter('disponible')}
        >
          Solo disponibles
        </button>
      </div>

      {/* ROOMS GRID */}
      <div className="rooms-grid">
        {loading && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Cargando espacios...
          </div>
        )}
        
        {error && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            {error}
          </div>
        )}
        
        {!loading && !error && filteredEspacios.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontSize: '14px' }}>
            No hay espacios que coincidan con el filtro seleccionado.
          </div>
        )}
        
        {!loading && !error && filteredEspacios.map(espacio => (
          <div key={espacio.id} className={`room-card ${!espacio.available ? 'unavailable' : ''}`}>
            <div className="room-thumb" style={{ background: espacio.color || '#E8F0EE' }}>
              <div dangerouslySetInnerHTML={{ __html: getRoomIcon(espacio.type) }} />
              <span className={`status-badge ${espacio.available ? 'available' : 'unavailable'}`}>
                {espacio.available ? 'Disponible' : 'Ocupado'}
              </span>
            </div>
            <div className="room-body">
              <p className="room-type">{espacio.typeLabel}</p>
              <h3 className="room-name">{espacio.name}</h3>
              <p className="room-desc">{espacio.desc}</p>
              <div className="room-meta">
                <span className="meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                  {espacio.dim}
                </span>
                <span className="meta-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {espacio.cap}
                </span>
              </div>
              <div className="room-features">
                {espacio.features && espacio.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="feat-tag">{feature}</span>
                ))}
                {espacio.features && espacio.features.length > 3 && (
                  <span className="feat-tag">+{espacio.features.length - 3} más</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER INFO */}
      <div className="info-strip">
        <h3>¿Querés saber más?</h3>
        <p>Contactanos para consultar tarifas, recorrer el espacio o reservar una visita sin compromiso.</p>
        <div className="contact-row">
          <a href="tel:+543564472828" className="info-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 17z"/>
            </svg>
            Llamanos
          </a>
          <a href="mailto:mauriciomonzoni@hotmail.com" className="info-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Escribinos
          </a>
          <a href="https://www.google.com/maps/place/Espa%C3%B1a+219,+San+Francisco,+C%C3%B3rdoba/@-31.4267348,-62.0896043,19z/data=!3m1!4b1!4m6!3m5!1s0x95cb283d64e87f37:0xa74fc0b21828a5ad!8m2!3d-31.4267348!4d-62.0889606!16s%2Fg%2F11vb_9gf3_?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="info-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Cómo llegar
          </a>
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
