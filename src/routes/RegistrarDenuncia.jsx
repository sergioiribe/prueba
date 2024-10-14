
import { FormularioProvider } from '../context/FormularioProvider'; // No usar useFormulario aquí aún
import { FormularioSteps } from '../components/FormularioSteps'; // No usar useFormulario aquí aún

export const RegistrarDenuncia = () => {
    return (
        <FormularioProvider>  {/* Aquí comienza el contexto */}
            <FormularioSteps /> {/* Aquí usamos un componente separado */}
        </FormularioProvider>
    );
};


