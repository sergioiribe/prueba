import { useFormulario } from '../context/FormularioProvider';

export const PasoUno = () => {

    const { formData, handleChange } = useFormulario();

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
            <div className="w-full h-4/5 md:px-10 flex flex-col items-center gap-5 text-sm md:text-base justify-center">
                <div className="w-full flex flex-col">
                    <label className="p-2">Empresa/Organizacion</label>
                    <select
                        className=" outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}

                    >
                        <option value="">Selecciona una empresa</option>
                        <option value="Afore Coppel">Afore Coppel</option>
                        <option value="BanCoppel">BanCoppel</option>
                        <option value="Coppel">Coppel</option>
                    </select>
                </div>
                <div className="w-full flex flex-col">
                    <label className="p-2">Pais</label>
                    <select
                        className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un pais</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="Mexico">Mexico</option>
                    </select>
                </div>
                {formData.pais === 'Argentina' && (
                    <div className='w-full flex flex-col'>
                        <label className='p-2'>Estado</label>
                        <select
                            className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                            name="estados"
                            value={formData.estados}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                        </select>
                    </div>
                )}
                {formData.pais === 'Estados Unidos' && (
                    <div className='w-full flex flex-col'>
                        <label className='p-2'>Estado</label>
                        <select
                            className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                            name="estados"
                            value={formData.estados}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="California">California</option>
                        </select>
                    </div>
                )}
                {formData.pais === 'Mexico' && (
                    <div className='w-full flex flex-col'>
                        <label className='p-2'>Estado</label>
                        <select
                            className="outline-blue-500 rounded text-center p-2 border-gray-300 border-2"
                            name="estados"
                            value={formData.estados}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="Aguascalientes">Aguascalientes</option>
                            <option value="Campeche">Campeche</option>
                            <option value="Cdmx">Cdmx</option>
                        </select>
                    </div>
                )}
                <div className='w-full flex flex-col mb-14 md:mb-0'>
                    <label className='px-3 py-2'>Número de Centro</label>
                    <input
                        className='outline-blue-500 rounded text-center p-2 border-gray-300 border-2'
                        type="number"
                        name="centro"
                        value={formData.centro}
                        onChange={handleChange}
                    />
                </div>
            </div>

        </div>
    )
}
