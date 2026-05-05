import { useState, useEffect } from 'react'
import { getEspacios } from './services/espaciosService'
import './App.css'

function App() {
  const [espacios, setEspacios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEspacios()
  }, [])

  const fetchEspacios = async () => {
    try {
      setLoading(true)
      const data = await getEspacios()
      setEspacios(data)
      setError(null)
    } catch (err) {
      console.error('Error al cargar espacios:', err)
      setError('No se pudieron cargar los espacios. Verifica la configuración de Firebase.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Sistema de Espacios Coworking</h1>
      </header>
      
      <main>
        <section className="status">
          {loading && <p>Cargando espacios...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <p>Conexión exitosa con Firebase. {espacios.length} espacios encontrados.</p>
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
  )
}

export default App
