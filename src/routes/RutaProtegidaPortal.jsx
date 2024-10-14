
import { useAuth } from '../context/AuthProvider'; // Importar el contexto de autenticación
import { Navigate } from 'react-router-dom'; // Importar redirección de React Router


export const RutaProtegidaPortal = ({children}) => {
    const { isAuthenticated } = useAuth();

    // Si el usuario no está autenticado, redirige al login
    if (!isAuthenticated) {
      return <Navigate to="/loginAdministador" replace />;
    }
  
    // Si está autenticado, permite el acceso a la ruta protegida
    return children;
}


