import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const ADMIN_EMAIL = "mauriciomonzoni@hotmail.com";

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
