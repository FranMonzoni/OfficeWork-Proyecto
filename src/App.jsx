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
