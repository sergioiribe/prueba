import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';
import axios from 'axios';

export const PendienteModal = ({ selectedFolio, closeModal, updateFolio }) => {
  const [comment, setComment] = useState("");
  const [tempStatus, setTempStatus] = useState(selectedFolio.estatus);

  const handleSave = async (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      Swal.fire({
        icon: 'info',
        text: 'El comentario no puede estar vacío',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    try {
      const response = await axios.put(
        `https://java-railway-portal-denuncias-production.up.railway.app/api/denuncias/${selectedFolio.folio}/actualizar`,
        {
          comentarios: comment,
          estatus: tempStatus,
        }
      );

      if (response.status === 200) {
        updateFolio(selectedFolio.id_denuncia, comment, tempStatus);
        setComment('');
        Swal.fire({
          icon: 'success',
          text: 'Cambios guardados correctamente',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Hubo un problema al guardar los cambios',
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
        <div>
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

        <div className="mt-4">
          <label className="block font-bold mb-2">Comentario</label>
          <textarea
            className="w-full p-2 border rounded outline-gray-300 resize-none h-16"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Agregar comentario"
            rows={4}
          />
        </div>

        <div className="mt-4">
          <label className="block font-bold mb-2">Cambiar estatus</label>
          <select
            className="w-full p-2 border rounded mb-10 outline-gray-300"
            value={tempStatus}
            onChange={(e) => setTempStatus(e.target.value)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Finalizada">Finalizada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <button className="absolute top-4 right-4" onClick={closeModal}>
          <RxCross2 color="gray" size="25px" />
        </button>

        <div className="absolute bottom-4 right-4 px-2">
          <button className="bg-[#3085d6] text-white p-2 rounded mr-2 outline-none" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};
