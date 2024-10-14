import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import coppelBlue from '../assets/coppelBlue.png';
import coppelWhite from '../assets/coppelWhite.png';
import { useAuth } from '../context/AuthProvider';
import Swal from 'sweetalert2'; 


export const Seguimiento = () => {
  const validFolio = "12345";
  const validContrasena = "12345678";

  const [denuncia, setDenuncia] = useState({
    folio: "",
    contrasena: ""
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Utiliza el método login del contexto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDenuncia({
      ...denuncia,
      [name]: value
    });
  };

  const handleSubmit = () => {

    //Validar que no esten vacios
    if (denuncia.folio === "" || denuncia.contrasena === "") {
      Swal.fire({
        icon: 'info',
        text: 'Por favor completa todos los campos',
        confirmButtonColor: '#3085d6',
    });
    return;
    }

    if (denuncia.folio === validFolio && denuncia.contrasena === validContrasena) {
      login(); // Llama a login para marcar al usuario como autenticado
      navigate("/resultado"); // Redirige si los datos son correctos
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
      <div className="bg-[#006eb5] md:bg-white flex h-[20vh] md:h-[10vh] w-100 justify-center items-center">
        <picture className='w-1/4 md:w-1/6'>
          <source srcSet={coppelWhite} media="(min-width: 768px)" />
          <img src={coppelBlue} alt="Coppel" className="w-20" />
        </picture>
        <p className="text-white md:text-[#005fa8] font-bold text-[20px]">SEGUIMIENTO A DENUNCIA</p>
      </div>

      <div className="min-h-[80svh] flex md:justify-center items-center flex-col bg-white p-10 md:bg-[#006eb5]">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center gap-5 text-sm md:text-base md:bg-white p-5 rounded-md md:shadow-lg">
          
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
            <label className='px-3 py-2 text-black'>Contraseña</label>
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
