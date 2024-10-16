import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';
import axios from 'axios';

export const FinalizadoModal = ({ selectedFolio, closeModal, updateFolioFinalizado }) => {
  const [comment, setComment] = useState("");

  const handleSave = async (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      Swal.fire({
        icon: 'error',
        text: 'El comentario no puede estar vacío',
        confirmButtonColor: '#d33',
      });
      return;
    }

    try {
      const response = await axios.put(
        `https://java-railway-portal-denuncias-production.up.railway.app/api/denuncias/${selectedFolio.folio}/actualizar`,
        {
          comentarios: [...selectedFolio.comentarios, comment], // Agrega el nuevo comentario al historial
          estatus: selectedFolio.estatus, // Mantén el estatus actual
        }
      );

      if (response.status === 200) {
        updateFolioFinalizado(selectedFolio.id_denuncia, [...selectedFolio.comentarios, comment], comment);
        setComment('');
        Swal.fire({
          icon: 'success',
          text: 'Comentario guardado correctamente',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Hubo un problema al guardar el comentario',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-[80%] md:w-[40%] relative">
        <h2 className="text-lg md:text-2xl font-bold mb-2">Folio {selectedFolio.folio}</h2>
        <p><strong>Empresa:</strong> {selectedFolio.empresa}</p>

        {/* Mostrar detalles adicionales de la denuncia */}
        <div >
          <p><strong>Centro:</strong> {selectedFolio.centro}</p>
          <p><strong>Detalle:</strong> {selectedFolio.detalle}</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Historial de comentarios</h3>
          <ul className="list-disc ml-5">
            {Array.isArray(selectedFolio.comentarios) && selectedFolio.comentarios.length > 0 ? (
              selectedFolio.comentarios.map((comentario, index) => (
                <li key={index}>{comentario}</li>
              ))
            ) : (
              <p>No hay comentarios anteriores</p>
            )}
          </ul>
        </div>

        <div className="mt-4 mb-7">
          <label className="block font-bold mb-2">Agregar comentario</label>
          <textarea
            className="w-full p-2 border rounded outline-gray-300 resize-none h-32"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Agregar comentario"
            rows={4}
          />
        </div>

        <button className="absolute top-4 right-4" onClick={closeModal}>
          <RxCross2 color="gray" size="25px" />
        </button>

        <div className="absolute bottom-3 right-4 px-2">
          <button className="bg-[#3085d6] text-white p-2 rounded mr-2 outline-none" onClick={handleSave}>
            Guardar comentario
          </button>
        </div>
      </div>
    </div>
  );
};
