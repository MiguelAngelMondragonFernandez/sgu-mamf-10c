
import React, { useState, useEffect } from 'react';
import * as fetching from './modules/userFunctions.js';

export default function App() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [pageLoad, setPageLoad] = useState(false);
const [modalData, setModalData] = useState(null);
const [showModal, setShowModal] = useState(false);
const [typePush, setTypePush] = useState('POST');


const armarTabla = async () => {
    try {
        const { data } = await fetching.getAllUsers();
        setUsers(data);
    } catch (err) {
        console.error('Error al armar la tabla:', err);
    }
}

const openModal = (userId=null) => {
    if(userId) {
        const user = users.find(u => u.id === userId);
        setTypePush('PUT');
        setModalData(user);
    } else {
        setTypePush('POST');
        setModalData({ id: null, name: '', email: '', phoneNumber: '' });
    }
    setShowModal(true);
}

const setFormData = async () => {
    switch(typePush) {
        case 'POST':
            try {
                await fetching.postUserData(modalData);
                armarTabla();
                setShowModal(false);
            } catch (err) {
                console.error('Error al crear usuario:', err);
            }
            break;
        case 'PUT':
            try {
                await fetching.updateUserData(modalData);
                armarTabla();
                setShowModal(false);
            } catch (err) {
                console.error('Error al actualizar usuario:', err);
            }
            break;
        default:
            console.error('Tipo de operación no reconocido:', typePush);
            break;
    }
}

const deleteUser = async (userId) => {
    try {
        await fetching.deleteUserData(userId);
        armarTabla();
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
    }
}



useEffect(()=>{
    if (!pageLoad) {
        setPageLoad(true);
    }
},[])

useEffect(() => {
    if (pageLoad) {
        armarTabla();
    }
}, [pageLoad]);

    return (
    <>
        <h1>Usuarios</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>Agregar Usuario</button>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                            <button className="btn btn-sm btn-warning" onClick={() => openModal(user.id)}>Editar</button>
                            <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {showModal && (
            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalData.id ? 'Editar Usuario' : 'Agregar Usuario'}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" value={modalData.name} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={modalData.email} onChange={(e) => setModalData({ ...modalData, email: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input type="text" className="form-control" value={modalData.phoneNumber} onChange={(e) => setModalData({ ...modalData, phoneNumber: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={() => setFormData(modalData)}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}