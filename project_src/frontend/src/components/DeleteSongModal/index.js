import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import DeleteSong from './DeleteSong';
import './DeleteSong.css';

const DeleteSongModal = ({song}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="delete-song-button" onClick={() => setShowModal(true)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <DeleteSong showModal={setShowModal} song={song}/>
                    </Modal>
                </>
            )}
        </>
    )
}

export default DeleteSongModal;
