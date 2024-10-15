import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coppelBlue from '../assets/coppelBlue.png';
import coppelWhite from '../assets/coppelWhite.png';

export const Resultado = () => {
  const [denuncia, setDenuncia] = useState(null);
  const navigate = useNavigate();

  // Cargar los datos almacenados en localStorage
  useEffect(() => {
    const storedDenuncia = JSON.parse(localStorage.getItem('denuncia'));
    if (!storedDenuncia) {
      navigate('/'); // Redirigir si no hay denuncia almacenada
      return;
    }
    setDenuncia(storedDenuncia); // Actualizar estado con los datos almacenados
  }, [navigate]);

  if (!denuncia) {
    return <div>Cargando...</div>; // Mostrar un estado de carga si no hay denuncia
  }

  return (
    <div>
      <div className="bg-[#006eb5] md:bg-white flex h-[20vh] md:h-[10vh] w-100 justify-center items-center">
        <picture className='w-1/4 md:w-1/6'>
          <source srcSet={coppelWhite} media="(min-width: 768px)" />
          <img src={coppelBlue} alt="Coppel" className="md:h-[9vh]" />
        </picture>
        <p className="text-white md:text-[#005fa8] font-bold text-[20px]">SEGUIMIENTO A DENUNCIA</p>
      </div>

      <div className="min-h-[80svh] flex md:justify-center items-center flex-col bg-white p-10 md:bg-[#006eb5]">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center gap-5 text-sm md:text-base md:bg-white md:p-5  rounded-md md:shadow-lg">
          
          <div className='w-full flex flex-col '>
            <label className='px-3 py-2 text-black'>Folio</label>
            <input
              className='outline-none rounded text-center p-2 border-gray-300 border-2'
              value={denuncia.folio}
              readOnly 
            />
          </div>

          <div className='w-full flex flex-col items-left'>
            <label className='px-3 py-2 text-black'>Comentarios</label>
            {denuncia.comentarios && denuncia.comentarios.length > 0 ? (
              <div className='border-gray-300 border-2 rounded w-[100%] flex justify-center'>
                <ul className=' text-left p-2  list-disc list-inside'>
                {denuncia.comentarios.map((comentario, index) => (
                  <li className='' key={index}>{comentario}</li>
                ))}
              </ul>
              </div>
            ) : (
              <div className='rounded text-center p-2 border-gray-300 border-2'>
                No hay comentarios disponibles
              </div>
            )}
          </div>

          <div className='w-full flex flex-col'>
            <label className='px-3 py-2 text-black'>Estatus</label>
            <input
              className='outline-none rounded text-center p-2 border-gray-300 border-2'
              value={denuncia.estatus}
              readOnly 
            />
          </div>

        </div>
      </div>
    </div>
  );
};
