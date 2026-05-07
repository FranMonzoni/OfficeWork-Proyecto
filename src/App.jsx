import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { getEspacios } from './services/espaciosService'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Administrador from './pages/Administrador'
import FirebaseDebug from './components/FirebaseDebug'
import './App.css'

// Componente para la página principal
const HomePage = () => {
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="app">
      <header>
        <h1>Sistema de Espacios Coworking</h1>
        <nav style={{ marginTop: '20px' }}>
          <a 
            href="/administrador" 
            style={{ 
              color: '#28a745', 
              textDecoration: 'none',
              padding: '8px 16px',
              border: '1px solid #28a745',
              borderRadius: '4px'
            }}
          >
            Panel de Administración
          </a>
        </nav>
      </header>

      <section className="hero">
        <h2>Transforma tu Espacio de Trabajo</h2>
        <p>
          Descubre los espacios coworking más innovadores diseñados para potenciar tu creatividad y productividad.
          Cada rincón está pensado para inspirarte y ayudarte a alcanzar tus metas profesionales.
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center',
            minWidth: '150px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
            <div style={{ fontWeight: '600' }}>Innovación</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center',
            minWidth: '150px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💡</div>
            <div style={{ fontWeight: '600' }}>Creatividad</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center',
            minWidth: '150px'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <div style={{ fontWeight: '600' }}>Productividad</div>
          </div>
        </div>
      </section>
      
      <main>
        <section className="status">
          {loading && <p>Cargando espacios...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <p>Explora nuestros {espacios.length} espacios de coworking disponibles.</p>
          )}
        </section>

        <section className="espacios">
          <h2>Espacios Disponibles</h2>
          {espacios.length > 0 ? (
            <div className="espacios-grid">
              {espacios.map(espacio => (
                <div key={espacio.id} className="espacio-card" style={{ backgroundColor: espacio.color }}>
                  <h3>{espacio.name}</h3>
                  <p className="type">{espacio.typeLabel}</p>
                  <p className="desc">{espacio.desc}</p>
                  <div className="details">
                    <span className="dim">{espacio.dim}</span>
                    <span className="cap">{espacio.cap}</span>
                  </div>
                  <div className="status">
                    <span className={`available ${espacio.available ? 'yes' : 'no'}`}>
                      {espacio.available ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                  {espacio.features && espacio.features.length > 0 && (
                    <div className="features">
                      <h4>Características:</h4>
                      <ul>
                        {espacio.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            !loading && !error && <p>No hay espacios configurados aún.</p>
          )}
        </section>
      </main>
      
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>🏢 Sobre Nosotros</h3>
            <p>
              Ofrecemos espacios de coworking innovadores diseñados para impulsar tu éxito profesional.
              Cada espacio está equipado con tecnología de punta y un ambiente inspirador.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>📞 Contacto</h3>
            <p>
              <a href="mailto:info@coworking.com" style={{ color: 'inherit' }}>
                info@coworking.com
              </a>
            </p>
            <p>
              <a href="tel:+541234567890" style={{ color: 'inherit' }}>
                +54 123 456 7890
              </a>
            </p>
          </div>
          
          <div className="footer-section">
            <h3>🕐 Horarios</h3>
            <p>Lunes a Viernes: 8:00 - 20:00</p>
            <p>Sábados: 9:00 - 18:00</p>
          </div>
          
          <div className="footer-section">
            <h3>📍 Ubicación</h3>
            <p>Av. Innovación #1234</p>
            <p>Centro de Creatividad y Productividad</p>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <p>© 2024 Sistema de Espacios Coworking. Todos los derechos reservados.</p>
          <p style={{ marginTop: '0.5rem' }}>
            Hecho con ❤️ y creatividad para profesionales modernos
          </p>
        </div>
      </footer>
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
