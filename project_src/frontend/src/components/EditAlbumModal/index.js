import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import EditAlbumForm from './EditAlbumForm';
import './EditAlbum.css';

const EditAlbumFormModal = ({album}) => {
    const [showModal, setShowModal] = useState(false);



    return (
        <>
            <div className="edit-album-button-container">

                <button className="edit-album-button"onClick={() => setShowModal(true)}>Edit</button>

            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <EditAlbumForm showModal={setShowModal} album={album}/>
                    </Modal>
                </>
            )}
        </>
    )
}

export default EditAlbumFormModal;
