import React, { useState } from 'react';
import axios from 'axios';

const CreateGenre = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        console.log('Form data being sent:', { name, image });  // Log para verificar los datos enviados

        setIsSubmitting(true);  // Indicar que el envío está en proceso

        try {
            const response = await axios.post('http://localhost:3001/genres', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Server response:', response.data);  // Log de la respuesta del servidor

            alert('Género creado con éxito!');
            setName('');
            setImage(null);
        } catch (error) {
            console.error('Error al crear el género:', error);
            alert('Hubo un error al crear el género.');
        } finally {
            setIsSubmitting(false);  // Restablecer el estado de envío
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del Género:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Imagen del Género:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando...' : 'Crear Género'}
            </button>
        </form>
    );
};

export default CreateGenre;
