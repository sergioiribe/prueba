import { TbReportSearch } from "react-icons/tb";
import { useState } from 'react';
import { AiFillQuestionCircle } from "react-icons/ai";
import { PendienteModal } from "../components/PendienteModal";
import { FinalizadoModal } from "../components/FinalizadoModal";
import Swal from 'sweetalert2';


export const PortalAdministrador = () => {
    // Datos simulados de folios de denuncias
    const [folios, setFolios] = useState([
        {
            id: 1,
            folio: '12345',
            empresa: 'Afore Coppel',
            estatus: 'Pendiente',
            comentario: '',
            historialDeComentarios: []  // Agregar historial de comentarios
        },
        {
            id: 2,
            folio: '67890',
            empresa: 'BanCoppel',
            estatus: 'Finalizada',
            comentario: 'Se encontraron pruebas',
            historialDeComentarios: ['Se encontraron pruebas']
        },
        {
            id: 3,
            folio: '54321',
            empresa: 'Coppel',
            estatus: 'Cancelada',
            comentario: 'No se encontraron pruebas',
            historialDeComentarios: ['No se encontraron pruebas']
        },
    ]);


    // Estado para manejar el folio seleccionado y la visibilidad del modal
    const [selectedFolio, setSelectedFolio] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal y seleccionar el folio
    const openModal = (folio) => {
        setSelectedFolio(folio);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFolio(null);
    };

    const updateFolio = (id, newComment, newStatus) => {


        setFolios((prevFolios) =>
            prevFolios.map((folio) =>
                folio.id === id
                    ? {
                        ...folio,
                        comentario: newComment, // Actualizamos el comentario actual
                        estatus: newStatus,
                        historialDeComentarios: [...folio.historialDeComentarios, newComment], // Añadimos el nuevo comentario al historial
                    }
                    : folio
            )
        );
        
        Swal.fire({
            icon: 'success',
            text: 'Cambio guardado correctamente',
            confirmButtonColor: '#3085d6',
        });
        return;

    };

    const updateFolioFinalizado = (id, updatedComments, newComment) => {

        if (!newComment.trim()) {
            Swal.fire({
                icon: 'error',
                text: 'El comentario no puede estar vacío',
                confirmButtonColor: '#d33',
            });
            return; // Salimos de la función si el comentario está vacío
            
        }
       

        setFolios((prevFolios) =>
            prevFolios.map((folio) =>
                folio.id === id
                    ? {
                        ...folio,
                        historialDeComentarios: updatedComments, // Actualizamos el historial
                    }
                    : folio
            )
        );

        
        closeModal();
        Swal.fire({
            icon: 'success',
            text: 'Comentario guardado correctamente',
            confirmButtonColor: '#3085d6',
        });
        return;


    };

    return (
        <div className="w-screen">
            {/* Header */}
            <div className="bg-gray-500 flex h-[20vh] md:h-[10vh] w-100 justify-center items-center gap-5">
                <TbReportSearch color='white' size="40px" />
                <p className="text-white font-bold text-[20px]">FOLIOS DE DENUNCIA</p>
            </div>

            {/* Contenido dividido en dos columnas */}
            <div className="min-h-[80svh] md:h-[90vh] flex md:justify-around items-start flex-col md:flex-row bg-white p-2 md:p-10 md:bg-gray-300 gap-5 md:gap-0">

                {/* Columna Izquierda: Folios Pendientes */}
                <div className="w-full md:w-[45%] flex flex-col items-center gap-5 text-sm md:text-base md:p-2 md:rounded">
                    <h2 className="font-bold text-lg">Folios pendientes</h2>
                    {folios.filter(folio => folio.estatus === 'Pendiente').map((folio) => (
                        <div key={folio.id} className="w-full flex flex-row bg-gray-200 justify-around md:border-black md:border-2 p-2 rounded-md">
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Folio</h1>
                                <p>{folio.folio}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Empresa</h1>
                                <p>{folio.empresa}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Estatus</h1>
                                <p>{folio.estatus}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <h1 className="font-bold">Ver detalle</h1>
                                <AiFillQuestionCircle color="#6b7280" size="25px" className="ml-2 cursor-pointer" onClick={() => openModal(folio)} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Columna Derecha: Folios Finalizados/Cancelados */}
                <div className="w-full md:w-[45%] flex flex-col items-center gap-5 text-sm md:text-base md:p-2 md:rounded">
                    <h2 className="font-bold text-lg">Folios finalizados / cancelados</h2>
                    {folios.filter(folio => folio.estatus === 'Finalizada' || folio.estatus === 'Cancelada').map((folio) => (
                        <div key={folio.id} className="w-full flex flex-row bg-gray-200 justify-around md:border-black md:border-2 p-2 rounded-md">
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Folio</h1>
                                <p>{folio.folio}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Empresa</h1>
                                <p>{folio.empresa}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold">Estatus</h1>
                                <p>{folio.estatus}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <h1 className="font-bold">Ver detalle</h1>
                                <AiFillQuestionCircle color="#6b7280" size="25px" className="ml-2 cursor-pointer" onClick={() => openModal(folio)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mostrar el modal adecuado según el estatus */}
            {isModalOpen && selectedFolio && (
                <>
                    {selectedFolio.estatus === 'Pendiente' ? (
                        <PendienteModal
                            selectedFolio={selectedFolio}
                            closeModal={closeModal}
                            updateFolio={updateFolio}
                        />
                    ) : (
                        <FinalizadoModal
                            selectedFolio={selectedFolio}
                            closeModal={closeModal}
                            updateFolioFinalizado={updateFolioFinalizado}
                        />
                    )}
                </>
            )}


        </div>
    );
};
