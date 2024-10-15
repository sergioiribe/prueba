import { useFormulario } from '../context/FormularioProvider';

export const PasoUno = () => {

    const { formData, handleChange } = useFormulario();

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
            <div className="w-full h-4/5 md:px-10 flex flex-col items-center gap-5 text-sm md:text-base justify-center">
                
                {/* Selección de Empresa */}
                <div className="w-full flex flex-col">
                    <label className="p-2">Empresa/Organización</label>
                    <select
                        className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                        name="id_empresa"
                        value={formData.id_empresa}
                        onChange={handleChange}
                    >
                        <option className='p-2' value={0}>Selecciona una empresa</option>
                        <option className='p-2' value={1}>Afore Coppel</option>
                        <option className='p-2' value={2}>BanCoppel</option>
                        <option className='p-2' value={3}>Coppel</option>
                    </select>
                </div>

                {/* Selección de País */}
                <div className="w-full flex flex-col">
                    <label className="p-2">País</label>
                    <select
                        className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                        name="id_pais"
                        value={formData.id_pais}
                        onChange={handleChange}
                    >
                        <option className='p-2' value={0}>Selecciona un país</option>
                        <option className='p-2' value={1}>Argentina</option>
                        <option className='p-2' value={2}>Estados Unidos</option>
                        <option className='p-2' value={3}>México</option>
                    </select>
                </div>

                {/* Selección de Estado basada en el país seleccionado */}
                {formData.id_pais === 1 && (
                    <div className='w-full flex flex-col'>
                        <label className='p-2'>Estado</label>
                        <select
                            className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                            name="id_estado"
                            value={formData.id_estado}
                            onChange={handleChange}
                        >
                            <option className='p-2' value={0}>Selecciona un estado</option>
                            <option className='p-2' value={1}>Buenos Aires</option>
                        </select>
                    </div>
                )}
                {formData.id_pais === 2 && (
                    <div className='w-full flex flex-col'>
                        <label className='p-2'>Estado</label>
                        <select
                            className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                            name="id_estado"
                            value={formData.id_estado}
                            onChange={handleChange}
                        >
                            <option className='p-2' value={0}>Selecciona un estado</option>
                            <option className='p-2' value={2}>California</option>
                        </select>
                    </div>
                )}
                {formData.id_pais === 3 && (
                    <div className='w-full flex flex-col'>
                        <label className='p-2'>Estado</label>
                        <select
                            className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                            name="id_estado"
                            value={formData.id_estado}
                            onChange={handleChange}
                        >
                            <option className='p-2' value={0}>Selecciona un estado</option>
                            <option className='p-2' value={3}>Aguascalientes</option>
                            <option className='p-2' value={4}>Campeche</option>
                            <option className='p-2' value={5}>Cdmx</option>
                        </select>
                    </div>
                )}

                {/* Campo para el Número de Centro */}
                <div className='w-full flex flex-col mb-14 md:mb-0'>
                    <label className='px-3 py-2'>Número de Centro</label>
                    <input
                        className='outline-blue-500 rounded text-center p-2 border-gray-300 border-2 text-sm md:text-base'
                        type="number"
                        name="centro"
                        value={formData.centro}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
