import { useState } from 'react'
import { RiAdminFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';




export const LoginAdministador = () => {

  const [data, setData] = useState({
    usuario: "",
    contrasena: ""
  })

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = () => {

    //Validar que no esten vacios
    if (data.usuario === "" || data.contrasena === "") {
      Swal.fire({
        icon: 'info',
        text: 'Por favor completa todos los campos',
        confirmButtonColor: '#3085d6',
    });
    return;
    }

    if (data.usuario === "admin" && data.contrasena === "12345") {
      login(); // Llama a login para marcar al usuario como autenticado
      navigate("/portalAdministrador"); // Redirige si los datos son correctos
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Folio o contraseña incorrectos',
        confirmButtonColor: '#3085d6',
    });
    return;
    }
  };

  return (
    <div>
      <div className="bg-gray-500  flex h-[20vh] md:h-[10vh] w-100 justify-center items-center gap-5">
        <RiAdminFill color='white' size="40px"/>
        <p className="text-white  font-bold text-[20px]">PORTAL ADMINISTRADOR</p>
      </div>

      <div className="min-h-[80svh] md:h-[90vh] flex md:justify-center items-center flex-col bg-white p-10 md:bg-gray-300">
      <div className="w-full md:w-[450px] flex flex-col items-center gap-5 text-sm md:text-base md:bg-white p-5 rounded-md md:shadow-lg md:mb-40">
          {/* <div className=''>
            <h1 className='text-black text-2xl'>Iniciar sesion</h1>
          </div> */}
          <div className='w-full flex flex-col'>
            <label className='px-3 py-2 text-black'>Usuario</label>
            <input
              className='outline-gray-500 rounded text-center p-2 border-gray-300 border-2'
              name="usuario"
              value={data.usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full flex flex-col'>
            <label className='px-3 py-2 text-black'>Contraseña</label>
            <input
              type="password"
              className='outline-gray-500 rounded text-center p-2 border-gray-300 border-2'
              name="contrasena"
              value={data.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full flex flex-col'>
            <button
              onClick={handleSubmit}
              className='flex justify-center bg-gray-500 md:font-bold text-white p-2 rounded-md'
            >
              Iniciar sesion
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
