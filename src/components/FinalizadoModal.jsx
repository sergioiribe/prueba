import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';

export const FinalizadoModal = ({ selectedFolio, closeModal, updateFolioFinalizado }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      Swal.fire({
        icon: 'error',
        text: 'El comentario no puede estar vacío',
        confirmButtonColor: '#d33',
      });
      return;
    }

    // Añadir el nuevo comentario al historial de comentarios
    const updatedComments = [...(selectedFolio.historialDeComentarios || []), newComment];
    updateFolioFinalizado(selectedFolio.id, updatedComments, newComment);

    // Limpiar el comentario después de agregarlo
    setNewComment(""); 

    Swal.fire({
      icon: 'success',
      text: 'Comentario agregado correctamente',
      confirmButtonColor: '#3085d6',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-[80%] md:w-[40%] relative">
        <h2 className="text-lg md:text-2xl font-bold mb-2">Detalles del Folio {selectedFolio.folio}</h2>
        <p><strong>Empresa:</strong> {selectedFolio.empresa}</p>
        <p><strong>Estatus:</strong> {selectedFolio.estatus}</p>

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
          <label className="block font-bold mb-2">Agregar nuevo comentario</label>
          <textarea
            className="w-full p-2 border rounded outline-gray-300 mb-8"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario"
          />
        </div>

        <div className="absolute bottom-4 right-4 px-2">
          <button
            className="bg-[#3085d6] text-white p-2 rounded mr-2 outline-none"
            onClick={handleAddComment}
          >
            Agregar comentario
          </button>
        </div>

        <button className="absolute top-4 right-4" onClick={closeModal}>
          <RxCross2 color="gray" size="25px" />
        </button>
      </div>
    </div>
  );
};
