import { useFormulario } from "../context/FormularioProvider";

export const PasoDos = () => {

    const { formData, handleChange } = useFormulario();

    // Función para manejar el cambio de anonimato, convierte a booleano
    const handleAnonimatoChange = (e) => {
        const value = e.target.value === 'true'; // Convertir a booleano
        handleChange({ target: { name: 'anonimato', value } });
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
            <div className="w-full h-4/5 md:px-10 flex flex-col items-center gap-5 text-sm md:text-base justify-center">
                <div className="w-full flex flex-col">
                    <label className="p-2">¿Quiere permanecer anónimo?</label>
                    <div className="flex items-start gap-4">
                        <label className="flex items-center px-3">
                            <input
                                type="radio"
                                name="anonimato"
                                value="true"
                                checked={formData.anonimato === true}
                                onChange={handleAnonimatoChange} // Usar handleAnonimatoChange aquí
                                className="form-radio h-5 w-5 text-blue-600 text-sm md:text-base"
                            />
                            <span className="ml-2">Sí</span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="anonimato"
                                value="false"
                                checked={formData.anonimato === false} // Verificar si es falso
                                onChange={handleAnonimatoChange} // Usar handleAnonimatoChange aquí
                                className="form-radio h-5 w-5 text-blue-600 text-sm md:text-base"
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>

                    {/* Mostrar los campos adicionales si el anonimato es falso */}
                    {formData.anonimato === false && (
                        <div className="w-full flex flex-col pt-5 ">
                            <div className='w-full flex flex-col'>
                                <label className="px-3 py-2">Nombre completo</label>
                                <input
                                    className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2 text-sm md:text-base"
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange} // Usar handleChange para estos campos
                                />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label className="px-3 py-2">Correo electrónico</label>
                                <input
                                    className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2 text-sm md:text-base"
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange} // Usar handleChange para estos campos
                                />
                            </div>
                            <div className='w-full flex flex-col mb-8 md:mb-0'>
                                <label className='px-3 py-2'>Teléfono</label>
                                <input
                                    className='outline-blue-500 rounded text-center p-2 border-gray-300 border-2 text-sm md:text-base' 
                                    type="text"
                                    name="telefono"
                                    pattern="\d*"  // Este patrón solo permitirá ingresar dígitos
                                    maxLength="15" 
                                    value={formData.telefono}
                                    onChange={handleChange} // Usar handleChange para estos campos
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
