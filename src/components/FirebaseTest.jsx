import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState('loading');
  const [config, setConfig] = useState({});

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      // Verificar que las variables de entorno estén cargadas
      const envVars = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Cargado' : '❌ No encontrado',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Cargado' : '❌ No encontrado',
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Cargado' : '❌ No encontrado',
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ Cargado' : '❌ No encontrado',
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ Cargado' : '❌ No encontrado',
        appId: import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Cargado' : '❌ No encontrado',
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? '✅ Cargado' : '❌ No encontrado'
      };

      setConfig(envVars);

      // Probar conexión a Firestore
      const testCollection = collection(db, 'espacios');
      const snapshot = await getDocs(testCollection);
      
      setTestResult('success');
      console.log('✅ Conexión exitosa a Firebase Firestore');
      console.log('📊 Documentos encontrados:', snapshot.docs.length);
      
    } catch (error) {
      setTestResult('error');
      console.error('❌ Error en la conexión a Firebase:', error);
      
      // Identificar tipo de error común
      if (error.code === 'permission-denied') {
        console.error('🔒 Error de permisos: Revisa las reglas de seguridad de Firestore');
      } else if (error.code === 'unavailable') {
        console.error('🌐 Error de red: Verifica tu conexión a internet');
      } else if (error.message.includes('projectId')) {
        console.error('🆔 Error de proyecto: Verifica el projectId en tu configuración');
      }
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🔍 Validación de Firebase</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>📋 Variables de Entorno:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(config).map(([key, value]) => (
            <li key={key} style={{ marginBottom: '5px' }}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>🔗 Estado de la Conexión:</h4>
        {testResult === 'loading' && <p>⏳ Probando conexión...</p>}
        {testResult === 'success' && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            ✅ Conexión exitosa a Firebase Firestore
          </p>
        )}
        {testResult === 'error' && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            ❌ Error en la conexión. Revisa la consola para más detalles.
          </p>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>💡 Si hay errores, verifica:</p>
        <ul>
          <li>Que el archivo .env esté en la raíz del proyecto</li>
          <li>Que las credenciales sean correctas</li>
          <li>Que Firestore esté habilitado en tu proyecto Firebase</li>
          <li>Las reglas de seguridad permitan la lectura</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseTest;
