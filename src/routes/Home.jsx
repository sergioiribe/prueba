import { NavLink } from 'react-router-dom'
import coppelBlue from '../assets/coppelBlue.png'

export const Home = () => {
    return (
        <div className="min-h-[100svh]">
            <div className="bg-[#006eb5] flex h-[20vh] md:h-[10vh] w-100 justify-center items-center gap-2 md:gap-10">
                <NavLink to="/">
                    <picture className='w-1/4 md:w-1/6'>
                        {/* Imagen para pantallas grandes */}
                        <source srcSet={coppelBlue} media="(min-width: 768px)" />
                        {/* Imagen para pantallas pequeñas */}
                        <img src={coppelBlue} alt="Coppel" className=" h-[10vh] md:h-[9vh]" />
                    </picture>
                </NavLink>
                <p className="text-white font-bold md:text-[20px] text-[20px] ">LÍNEA DE DENUNCIA</p>
            </div>
            <div className='flex flex-col md:flex-row h-[70svh] md:h-[80svh] justify-center items-center gap-10'>
                <NavLink to="/denuncia">
                    <button className='bg-gray-300  rounded p-3 w-[250px] text-gray-800'>
                        <p>Registrar denuncia</p>
                    </button>
                </NavLink>
                <NavLink to="/seguimiento">
                    <button className='bg-gray-300  rounded p-3 w-[250px] text-gray-800'>
                        <p>Seguimiento a denuncia</p>
                    </button>
                </NavLink>
            </div>
        </div>
    )
}
