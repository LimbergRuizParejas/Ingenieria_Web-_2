import React, { useState } from 'react';
import axios from 'axios';

const CreateGenre = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:3001/genres', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Género creado con éxito!');
            setName('');
            setImage(null);
        } catch (error) {
            console.error('Error al crear el género:', error);
            alert('Hubo un error al crear el género.');
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
            <button type="submit">Crear Género</button>
        </form>
    );
};

export default CreateGenre;
