import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import SongDetail from './AddAlbumForm';
import './AddAlbumForm.css';

const SongDetailModal = () => {
    const [showModal, setShowModal] = useState(false);
    //!might have to render the songs in here instead of on the album song list page.
    return (
        <>
            <div className="add-album-button" onClick={() => setShowModal(true)}>

                 <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <SongDetail showModal={setShowModal} />
                    </Modal>
                </>
            )}
        </>
    )
}

export default SongDetailModal;
