import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import AddAlbumForm from './AddAlbumForm';
import './AddAlbumForm.css';

const AddAlbumFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-album-button" onClick={() => setShowModal(true)}>
                 <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
                <p style={{fontSize:'40px'}}> Add Album </p>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <AddAlbumForm showModal={setShowModal}/>
                    </Modal>
                </>
            )}
        </>
    )
}

export default AddAlbumFormModal;
