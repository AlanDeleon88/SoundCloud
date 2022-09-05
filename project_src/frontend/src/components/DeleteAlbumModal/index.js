import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import DeleteAlbum from './DeleteAlbum';
import './DeleteAlbum.css';

const DeleteAlbumModal = ({album}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="delete-album-button" onClick={() => setShowModal(true)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteAlbum showModal={setShowModal} album={album}/>
                    </Modal>
                </>
            )}
        </>
    )
}

export default DeleteAlbumModal;
