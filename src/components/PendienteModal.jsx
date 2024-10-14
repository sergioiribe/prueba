import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';

export const PendienteModal = ({ selectedFolio, closeModal, updateFolio }) => {
  // Estado para manejar el comentario y el estatus editable
  const [comment, setComment] = useState("");
  const [tempStatus, setTempStatus] = useState(selectedFolio.estatus);



  const handleSave = () => {
    if (!comment.trim()) {
      Swal.fire({
          icon: 'error',
          text: 'El comentario no puede estar vacío',
          confirmButtonColor: '#d33',
      });
      return; // Salimos de la función si el comentario está vacío
  }
    // Actualiza el folio con el nuevo comentario y estatus
    updateFolio(selectedFolio.id, comment, tempStatus);
    setComment("");; // Solo cierra el modal después de guardar
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-[80%] md:w-[40%] relative">
        <h2 className="text-lg md:text-2xl font-bold mb-2">Editar Folio {selectedFolio.folio}</h2>
        <p><strong>Empresa:</strong> {selectedFolio.empresa}</p>

        <div className="mt-4">
          <h3 className="font-bold mb-2">Historial de Comentarios</h3>
          <ul className="list-disc ml-5">
            {selectedFolio.historialDeComentarios && selectedFolio.historialDeComentarios.length > 0 ? (
              selectedFolio.historialDeComentarios.map((comentario, index) => (
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
            className="w-full p-2 border rounded outline-gray-300"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Agregar comentario"
          />
        </div>

        <div className="mt-4">
          <label className="block font-bold mb-2">Cambiar Estatus</label>
          <select
            className="w-full p-2 border rounded mb-10 outline-gray-300"
            name='estatus'
            value={tempStatus}
            onChange={(e) => setTempStatus(e.target.value)}
          >
            <option className="bg-gray-100" value="Pendiente">Pendiente</option>
            <option className="bg-gray-100" value="Finalizada">Finalizada</option>
            <option className="bg-gray-100" value="Cancelada">Cancelada</option>
          </select>
        </div>

        <button className="absolute top-4 right-4" onClick={closeModal}>
          <RxCross2 color="gray" size="25px" />
        </button>

        <div className="absolute bottom-4 right-4 px-2">
          <button
            className="bg-[#3085d6] text-white p-2 rounded mr-2 outline-none"
            onClick={handleSave}
      
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
