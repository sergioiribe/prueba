import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Swal from 'sweetalert2';



// Crear el contexto
const FormularioContext = createContext();

// Hook personalizado para acceder al contexto
export const useFormulario = () => useContext(FormularioContext);

//Proveedor del contexto
export const FormularioProvider = ({ children }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        empresa: '',
        pais: '',
        estados: '',
        centro: '',
        anonimato: true,
        nombre: '',
        correo: '',
        telefono: '',
        detalle: '',
        fecha: '',
        password: '',
        confirmPassword: ''
    });

    const [step, setStep] = useState(1); // Estado para rastrear el paso actual

    // Función para manejar el envío del formulario final (solo paso 3)
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validar campos del Paso 3
        if (!formData.detalle || !formData.fecha || !formData.password || !formData.confirmPassword) {
            Swal.fire({
                icon: 'info',
                text: 'Por favor completa todos los campos',
                confirmButtonColor: '#3085d6',
            });
            return;
        }
    
        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'info',
                text: 'Las contraseñas no coinciden!',
            });
            return;
        }
    
        // Validar que la longitud de la contraseña sea de al menos 8 caracteres
        if (formData.password.length < 8) {
            Swal.fire({
                icon: 'info',
                text: 'La contraseña debe tener al menos 8 caracteres!',
            });
            return;
        }
    
        // Generar folio de 5 dígitos
        const folio = Math.floor(10000 + Math.random() * 90000); // Genera un número aleatorio de 5 dígitos
    
        // Agregar el folio generado a los datos del formulario
        const updatedFormData = { ...formData, folio: folio.toString() };
    
        // Simular envío de la denuncia
        console.log('Datos de denuncia enviados:', updatedFormData);
        Swal.fire({
            icon: 'success',
            title: 'Denuncia enviada',
            text: `Tu folio es: ${updatedFormData.folio}`,
            confirmButtonColor: '#3085d6'
        });
    
        // Reiniciar el formulario
        setFormData({
            empresa: '',
            pais: '',
            estados: '',
            centro: '',
            anonimato: true,
            nombre: '',
            correo: '',
            telefono: '',
            detalle: '',
            fecha: '',
            password: '',
            confirmPassword: ''
        });
    
        navigate('/'); // Redirigir a la página de inicio
    };
    

    // Función para manejar los cambios de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        console.log(formData);
    };

    // Función para avanzar al siguiente paso con validación manual al hacer clic en "Siguiente"
    const nextStep = (e) => {
        e.preventDefault();

        // Validar campos del Paso 1
        if (step === 1) {

            const centroNumber = parseFloat(formData.centro); // Convertir a número

            // Validar que el campo de "Número de Centro" sea un número positivo
           
            if (!formData.empresa || !formData.pais || !formData.estados || !formData.centro) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor completa todos los campos',
                    confirmButtonColor: '#3085d6'
                });
                return; // Detener si hay errores
            }

            if (isNaN(centroNumber) || centroNumber <= 0) {
                Swal.fire({
                    icon: 'info',
                    text: 'Por favor ingresa un número de centro válido',
                    confirmButtonColor: '#3085d6',
                });
                return; // Detener si hay errores
            }
        }

        

        // Validar campos del Paso 2 (si es necesario)
        if (step === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
            const nameRegex = /^[a-zA-Z\s]+$/; // Expresión regular para validar nombres

            if (formData.anonimato === false) {
                // Verificar si el nombre contiene caracteres no válidos
                if (!formData.nombre || !nameRegex.test(formData.nombre)) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Por favor ingresa un nombre válido',
                        confirmButtonColor: '#3085d6',
                    });
                    return;
                }

                // Verificar si el correo tiene un formato válido
                if (!formData.correo || !emailRegex.test(formData.correo)) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Por favor ingresa un correo electrónico válido',
                        confirmButtonColor: '#3085d6',
                    });
                    return;
                }

                // Verificar si el teléfono es un número válido
                if (!formData.telefono || isNaN(formData.telefono)) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Por favor ingresa un número de teléfono válido',
                        confirmButtonColor: '#3085d6',
                    });
                    return;
                }
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