import { TbReportSearch } from "react-icons/tb";
import { useState, useEffect } from 'react';
import { AiFillQuestionCircle } from "react-icons/ai";
import { PendienteModal } from "../components/PendienteModal";
import { FinalizadoModal } from "../components/FinalizadoModal";
import Swal from 'sweetalert2';
import axios from 'axios'; 

export const PortalAdministrador = () => {
    const [folios, setFolios] = useState([]);
    const [selectedFolio, setSelectedFolio] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Abrir modal
    const openModal = (folio) => {
        setSelectedFolio(folio);
        setIsModalOpen(true);
    };

    // Cerrar modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFolio(null);
    };

    // Función para actualizar un folio pendiente
    const updateFolio = (id, newComment, newStatus) => {
        setFolios((prevFolios) =>
            prevFolios.map((folio) =>
                folio.id === id
                    ? {
                        ...folio,
                        comentarios: [...(folio.comentarios || []), newComment], // Verifica si comentarios es un array
                        estatus: newStatus, // Actualiza solo el estatus del folio seleccionado
                    }
                    : folio // Dejar los folios que no coincidan intactos
            )
        );

        Swal.fire({
            icon: 'success',
            text: 'Cambio guardado correctamente',
            confirmButtonColor: '#3085d6',
        });
    };

    // Función para actualizar folios finalizados/cancelados
    const updateFolioFinalizado = (id, updatedComments, newComment) => {
        if (!newComment.trim()) {
            Swal.fire({
                icon: 'error',
                text: 'El comentario no puede estar vacío',
                confirmButtonColor: '#d33',
            });
            return;
        }

        setFolios((prevFolios) =>
            prevFolios.map((folio) =>
                folio.id === id
                    ? {
                        ...folio,
                        comentarios: updatedComments, // Actualizar el historial de comentarios
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
    };

    // Solicitar folios desde la API
    useEffect(() => {
        const fetchFolios = async () => {
            try {
                const response = await axios.get('https://java-railway-portal-denuncias-production.up.railway.app/api/denuncias/todas');
                setFolios(response.data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Hubo un problema al obtener las denuncias',
                    confirmButtonColor: '#d33',
                });
            }
        };

        fetchFolios();
    }, []);

    return (
        <div className="w-screen">
            {/* Header */}
            <div className="bg-gray-500 flex h-[20vh] md:h-[10vh]  md:min-h-[60px] w-100 justify-center items-center gap-5">
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
                <div>
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
                </div>
            )}
        </div>
    );
};
