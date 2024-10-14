import { useFormulario } from "../context/FormularioProvider";

export const PasoTres = () => {

    const { formData, handleChange } = useFormulario();

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
            <div className="w-full h-4/5 md:px-10 flex flex-col items-center gap-5 text-sm md:text-base justify-center">
                <div className='w-full flex flex-col'>
                    <label className='px-3 py-2'>Detalle de la denuncia</label>
                    <textarea
                        className='outline-blue-500 rounded text-center p-2 border-gray-300 border-2 resize-none'
                        name="detalle"
                        value={formData.detalle}
                        onChange={handleChange}
                        rows="10"
                        required
                    />
                </div>
                <div className='w-full flex flex-col'>
                    <label className="px-3 py-2">Fecha en la que sucedieron los hechos</label>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded outline-blue-500"
                        required
                    />
                </div>
                <div className='w-full flex flex-col'>
                    <label className="px-3 py-2">Crear contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded outline-blue-500"
                        minLength="8"
                        required
                    />
                </div>

                {/* Campo de confirmar contraseña */}
                <div className='w-full flex flex-col mb-14 md:mb-0'>
                    <label className="px-3 py-2">Confirmar contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded outline-blue-500"
                        minLength="8"
                        required
                    />
                </div>
            </div>
        </div>
    )
}
