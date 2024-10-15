import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Swal from 'sweetalert2';
import axios from 'axios';

// Crear el contexto
const FormularioContext = createContext();

// Hook personalizado para acceder al contexto
export const useFormulario = () => useContext(FormularioContext);

// Proveedor del contexto
export const FormularioProvider = ({ children }) => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        id_empresa: 0,
        id_pais: 0,
        id_estado: 0,
        centro: '',
        detalle: '',
        fecha_hechos: '',
        contrasena: '',
        confirmContrasena: '', // Solo para validación en el frontend
        anonimato: true,
        nombre: '',
        correo: '',
        telefono: '',
        comentarios: [],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();



        // Validar campos del Paso 3
        if (!formData.detalle || !formData.fecha_hechos || !formData.contrasena || !formData.confirmContrasena) {
            Swal.fire({
                icon: 'info',
                text: 'Por favor completa todos los campos',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        // Validar que las contraseñas coincidan
        if (formData.contrasena !== formData.confirmContrasena) {
            Swal.fire({
                icon: 'info',
                text: 'Las contraseñas no coinciden',
            });
            return;
        }

        // Validar que la longitud de la contraseña sea de al menos 8 caracteres
        if (formData.contrasena.length < 8) {
            Swal.fire({
                icon: 'info',
                text: 'La contraseña debe tener al menos 8 caracteres',
            });
            return;
        }

        // Remover campos innecesarios y ajustar payload
        const { confirmContrasena, comentarios, ...dataToSend } = formData;

        // Eliminar campos si anonimato es verdadero
        if (formData.anonimato) {
            delete dataToSend.nombre;
            delete dataToSend.correo;
            delete dataToSend.telefono;
        }

        try {
            // Realizar la solicitud POST a la API
            const response = await axios.post(
                'https://java-railway-portal-denuncias-production.up.railway.app/api/denuncias',
                dataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json' // Asegurar que se envía como JSON
                    }
                }
            );

            const folioGenerado = response.data.folio; // Capturar el folio de la respuesta

            Swal.fire({
                icon: 'success',
                title: 'Denuncia enviada',
                text: `Tu folio es: ${folioGenerado}`,
                confirmButtonColor: '#3085d6'
            });

            console.log('Respuesta de la API:', response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar la denuncia, intenta nuevamente más tarde',
                confirmButtonColor: '#d33',
            });
            console.error('Error al enviar la denuncia:', error);
            if (error.response) {
                console.log('Detalles del error:', error.response.data); // Capturar el detalle del error que devuelve el backend
            }
        }

        // Reiniciar el formulario
        setFormData({
            id_empresa: 0,
            id_pais: 0,
            id_estado: 0,
            centro: '',
            detalle: '',
            fecha_hechos: '',
            contrasena: '',
            confirmContrasena: '',
            anonimato: true,
            nombre: '',
            correo: '',
            telefono: '',
            comentarios: [],
        });

        navigate('/'); // Redirigir a la página de inicio
    };

    // Función para manejar los cambios de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convertir a entero si es un campo numérico
        const parsedValue = ['id_empresa', 'id_pais', 'id_estado'].includes(name) ? parseInt(value, 10) : value;

        // Actualizar el estado asegurando que siempre se refleja el último valor
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: parsedValue,
        }));

        // Imprimir el estado actualizado
        console.log('Form Data:', formData);
    };

    // Función para avanzar al siguiente paso con validación manual al hacer clic en "Siguiente"
    const nextStep = (e) => {
        e.preventDefault();

        // Validar campos del Paso 1
        if (step === 1) {
            const centroNumber = parseFloat(formData.centro); // Convertir a número

            // Validar el número del campo centro
            if (isNaN(centroNumber) || centroNumber <= 0) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor ingresa un número de centro válido',
                    confirmButtonColor: '#3085d6',
                });
                return; // Detener si hay errores
            }

            // Validar que los campos de empresa, país, estado y centro estén completos
            if (formData.id_empresa === 0 || formData.id_pais === 0 || formData.id_estado === 0 || !formData.centro) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor completa todos los campos',
                    confirmButtonColor: '#3085d6'
                });
                return; // Detener si hay errores
            }

            
        }

        // Validar campos del Paso 2
        if (step === 2 && !formData.anonimato) {
            // Validar que el form no esté vacío
            if (!formData.nombre || !formData.correo || !formData.telefono) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor completa todos los campos',
                    confirmButtonColor: '#3085d6',
                });
                return; // Detener si hay errores
            }

            //Validar nombre
            const namePattern = /^[a-zA-Z\s]*$/;
            if (!namePattern.test(formData.nombre)) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor ingresa un nombre válido',
                    confirmButtonColor: '#3085d6',
                });
                return; // Detener si hay errores
            }

            // Validar el formato del correo electrónico
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(formData.correo)) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor ingresa un correo electrónico válido',
                    confirmButtonColor: '#3085d6',
                });
                return; // Detener si hay errores
            }

            // Validar el formato del número de teléfono
            const phonePattern = /^\d+$/;
            if (!phonePattern.test(formData.telefono)) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor ingresa un número de teléfono válido',
                    confirmButtonColor: '#3085d6',
                });
                return; // Detener si hay errores
            }


        }

        // Si todo es válido, avanzar al siguiente paso
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const steps = [1, 2, 3];

    return (
        <FormularioContext.Provider value={{ formData, handleChange, step, nextStep, prevStep, steps, setStep, handleSubmit, setFormData }}>
            {children}
        </FormularioContext.Provider>
    );
};
