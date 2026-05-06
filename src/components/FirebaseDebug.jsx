import { useEffect, useState } from 'react';

const FirebaseDebug = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const envVars = {
      'VITE_FIREBASE_API_KEY': import.meta.env.VITE_FIREBASE_API_KEY,
      'VITE_FIREBASE_AUTH_DOMAIN': import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      'VITE_FIREBASE_PROJECT_ID': import.meta.env.VITE_FIREBASE_PROJECT_ID,
      'VITE_FIREBASE_STORAGE_BUCKET': import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      'VITE_FIREBASE_MESSAGING_SENDER_ID': import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      'VITE_FIREBASE_APP_ID': import.meta.env.VITE_FIREBASE_APP_ID,
      'VITE_FIREBASE_MEASUREMENT_ID': import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    };

    setConfig(envVars);
  }, []);

  const testApiKey = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        })
      });
      
      const data = await response.json();
      console.log('API Key Test Response:', data);
      
      if (response.ok) {
        alert('API Key parece válida');
      } else {
        alert(`Error: ${data.error?.message || 'API Key inválida'}`);
      }
    } catch (error) {
      console.error('Error testing API key:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#fff',
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxWidth: '300px',
      fontSize: '12px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🔍 Debug Firebase</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Variables de Entorno:</strong>
        {Object.entries(config).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '5px' }}>
            <small>{key}:</small>
            <div style={{
              wordBreak: 'break-all',
              background: value ? '#e8f5e8' : '#ffebee',
              padding: '2px 5px',
              borderRadius: '3px',
              marginTop: '2px'
            }}>
              {value || 'NO ENCONTRADO'}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={testApiKey}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '11px',
          width: '100%'
        }}
      >
        Probar API Key
      </button>

      <div style={{ marginTop: '10px', fontSize: '10px', color: '#666' }}>
        <strong>Solución posible:</strong><br/>
        1. Verifica que la API key sea correcta<br/>
        2. Regenera la key en Firebase Console<br/>
        3. Asegúrate de que el proyecto esté activo
      </div>
    </div>
  );
};

export default FirebaseDebug;
