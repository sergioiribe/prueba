import { PasoUno } from '../components/PasoUno';
import { PasoDos } from '../components/PasoDos';
import { PasoTres } from '../components/PasoTres';
import { useFormulario } from '../context/FormularioProvider';
import coppelBlue from '../assets/coppelBlue.png';
import coppelWhite from '../assets/coppelWhite.png';
import { NavLink } from 'react-router-dom';


export const FormularioSteps = () => {

    const { step, handleSubmit, steps, nextStep, prevStep } = useFormulario();


    return (
        <div>
            {/* Encabezado de la página */}
            <div className="bg-[#006eb5] md:bg-white flex h-[20vh] md:h-[10vh] w-100 justify-center items-center">
                <NavLink to="/">
                    <picture className='w-1/4 md:w-1/6'>
                        {/* Imagen para pantallas grandes */}
                        <source srcSet={coppelWhite} media="(min-width: 768px)" />
                        {/* Imagen para pantallas pequeñas */}
                        <img src={coppelBlue} alt="Coppel" className=" h-[5vh] md:h-[9vh]" />
                    </picture>
                </NavLink>
                <p className="text-white md:text-[#005fa8] font-bold text-[20px]">LÍNEA DE DENUNCIA</p>
            </div>

            {/* Contenedor principal */}
            <div className="min-h-[80svh] md:min-h-[90vh] flex justify-start md:justify-center items-center flex-col md:bg-[#006eb5] bg-white relative py-10">
                <div className="bg-white w-[100%] md:w-[600px] md:rounded flex flex-col p-5 ">
                    {/* Barra de navegación para los pasos */}
                    <div className="flex justify-center gap-3 mb-6">
                        {steps.map((stepNum) => (
                            <div
                                key={stepNum}
                                className={`px-4 py-2 rounded-md font-semibold border cursor-pointer transition-colors ${step === stepNum
                                    ? 'bg-blue-500 font-bold text-white'
                                    : 'bg-gray-300 text-gray-600'
                                    }`}
                            >
                                Paso {stepNum}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="pt-4" noValidate>
                        {/* Contenido del formulario basado en el paso */}
                        {step === 1 && <PasoUno />}
                        {step === 2 && <PasoDos />}
                        {step === 3 && <PasoTres />}


                        {/* Botón para el paso 1: solo el botón "Siguiente" */}
                        {step === 1 && (
                            <div className="flex justify-end md:justify-end absolute md:relative bottom-0 right-0 md:px-10 md:mt-5 m-5 md:m-0">
                                <button
                                    onClick={nextStep}
                                    className="flex bg-blue-500 text-white p-2 rounded"

                                >
                                    Siguiente
                                </button>
                            </div>
                        )}

                        {/* Botones para el paso 2: "Atrás" y "Siguiente" */}
                        {step === 2 && (
                            <div className="flex justify-end md:justify-end absolute md:relative bottom-0 right-0 gap-5 md:px-10 md:mt-5 m-5 md:m-0">
                                <button
                                    onClick={prevStep}
                                    className="bg-gray-300 p-2 rounded"
                                >
                                    Atrás
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="bg-blue-500 text-white p-2 rounded"

                                >
                                    Siguiente
                                </button>
                            </div>
                        )}

                        {/* Botones para el paso 3: "Atrás" y "Enviar" */}
                        {step === 3 && (
                            <div className="flex justify-end md:justify-end absolute md:relative bottom-0 right-0 m-5 md:m-0 gap-5 md:px-10 md:mt-5">
                                <button
                                    onClick={prevStep}
                                    className="bg-gray-300 p-2 rounded"
                                >
                                    Atrás
                                </button>
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                                    Enviar
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
