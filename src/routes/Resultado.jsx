import coppelBlue from '../assets/coppelBlue.png';
import coppelWhite from '../assets/coppelWhite.png';
import { useState } from 'react';

export const Resultado = () => {

    const [denuncia, setDenuncia] = useState({
        folio: "12345",
        comentario: "Su denuncia finalizo con exito",
        estatus: "Finalizada"

    });


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
              className='outline-none rounded text-center p-2 border-gray-300 border-2'
              name="folio"
              value={denuncia.folio}
              required
              readOnly 
            />
          </div>

          <div className='w-full flex flex-col'>
          <label className='px-3 py-2 text-black'>Comentario</label>
            <input
              className='outline-none rounded text-center p-2 border-gray-300 border-2'
              name="folio"
              value={denuncia.comentario}
              required
              readOnly 
            />
          </div>

          <div className='w-full flex flex-col'>
          <label className='px-3 py-2 text-black'>Estatus</label>
            <input
              className='outline-none rounded text-center p-2 border-gray-300 border-2'
              name="folio"
              value={denuncia.estatus}
              required
              readOnly 
            />
          </div>

        </div>
      </div>
    </div>
  )
}
