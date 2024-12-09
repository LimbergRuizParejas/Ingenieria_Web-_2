import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user, onDelete }) => {
    return (
        <li>
            {user.email}
            <Link to={`/admin/users/edit/${user.id}`}><button>Editar</button></Link>
            <Link to={`/admin/users/change-password/${user.id}`}><button>Cambiar Contraseña</button></Link>
            <button onClick={() => onDelete(user.id)}>Eliminar</button>
        </li>
    );
};

export default UserItem;
