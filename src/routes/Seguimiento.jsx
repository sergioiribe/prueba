import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coppelBlue from '../assets/coppelBlue.png';
import coppelWhite from '../assets/coppelWhite.png';
import { useAuth } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const Seguimiento = () => {
  const [denuncia, setDenuncia] = useState({
    folio: "",
    contrasena: ""
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDenuncia({
      ...denuncia,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    // Validar que no estén vacíos
    if (denuncia.folio === "" || denuncia.contrasena === "") {
      Swal.fire({
        icon: 'info',
        text: 'Por favor completa todos los campos',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    try {
      // Limpiar localStorage antes de una nueva consulta
      localStorage.removeItem('denuncia');

      // Realizar la solicitud POST a la API con folio y contraseña
      const response = await axios.post('https://java-railway-portal-denuncias-production.up.railway.app/api/denuncias/consultar', {
        folio: denuncia.folio,
        contrasena: denuncia.contrasena
      });

      // Si la respuesta es exitosa, almacena los datos en localStorage
      if (response.status === 200) {
        const denunciaData = response.data;

        // Guardar la información de la denuncia en localStorage
        localStorage.setItem('denuncia', JSON.stringify(denunciaData));

        login(); // Llama a login para marcar al usuario como autenticado
        navigate("/resultado"); // Redirige si los datos son correctos
      }
    } catch (error) {
      // Manejar error si la API devuelve un error 404 o 401
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          text: 'Folio no encontrado',
          confirmButtonColor: '#d33',
        });

        setDenuncia({
          usuario: "",
          contrasena: ""
        });
      } else if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          text: 'Contraseña incorrecta',
          confirmButtonColor: '#d33',
        });

        // limpiar campos de texto
        setDenuncia({
          usuario: "",
          contrasena: ""
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Hubo un problema al consultar la denuncia, intenta nuevamente más tarde',
          confirmButtonColor: '#d33',
        });

        setDenuncia({
          usuario: "",
          contrasena: ""
        });
        console.error('Error al consultar la denuncia:', error);
      }
    }
  };

  return (
    <div >
      <div className="bg-[#006eb5] md:bg-white flex h-[20vh] md:h-[10vh] w-100 justify-center items-center gap-2 md:gap-10">
        <NavLink to="/">
          <picture className='w-1/4 md:w-1/6'>
            {/* Imagen para pantallas grandes */}
            <source srcSet={coppelWhite} media="(min-width: 768px)" />
            {/* Imagen para pantallas pequeñas */}
            <img src={coppelBlue} alt="Coppel" className=" h-[10vh] md:h-[9vh]" />
          </picture>
        </NavLink>
        <p className="text-white md:text-[#005fa8] font-bold md:text-[20px] text-[20px] ">SEGUIMIENTO A DENUNCIA</p>
      </div>

      <div className="min-h-[80svh] md:min-h-[90svh] flex md:justify-center items-center flex-col bg-white p-10 md:bg-[#006eb5]">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center gap-5 text-sm md:text-base md:bg-white md:p-5 rounded-md md:shadow-lg">

          <div className='w-full flex flex-col'>
            <label className='px-3 py-2 text-black'>Folio</label>
            <input
              className='outline-blue-500 rounded text-center p-2 border-gray-300 border-2'
              name="folio"
              value={denuncia.folio}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full flex flex-col'>
            <label className='md:px-3 py-2 text-black'>Contraseña</label>
            <input
              type="password"
              className='outline-blue-500 rounded text-center p-2 border-gray-300 border-2'
              name="contrasena"
              value={denuncia.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className='w-full flex flex-col'>
            <button
              onClick={handleSubmit}
              className='flex justify-center bg-[#006eb5] md:font-bold text-white p-2 rounded-md'
            >
              CONSULTAR
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
