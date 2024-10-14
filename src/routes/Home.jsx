import { NavLink } from 'react-router-dom'
import { Nav } from '../components/Nav'

export const Home = () => {
  return (
    <div className="min-h-100svh flex flex-col bg-cover bg-center">
        <Nav name={"PORTAL DE DENUNCIAS"} color='#006eb5'></Nav>
        <div className='flex flex-col md:flex-row h-[80vh] md:h-[70vh] justify-center items-center gap-10'>
            <NavLink to="/denuncia">
                <button  className='bg-gray-300  rounded p-3 w-[250px] text-gray-800'>
                    <p>Registrar denuncia</p>
                </button>
            </NavLink>
            <NavLink to="/seguimiento">
            <button  className='bg-gray-300  rounded p-3 w-[250px] text-gray-800'>
                    <p>Seguimiento a denuncia</p>
                </button>
            </NavLink>
        </div>
    </div>
  )
}
