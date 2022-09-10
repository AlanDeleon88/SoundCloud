import EditSongForm from './EditSongForm';
import './EditSong.css'
import { Modal } from "../../context/Modal";
import { useState } from "react";

const EditSongModal = ({song}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="edit-song-button-container" >

                 <button className="edit-song-button"  onClick={() => setShowModal(true)}>
                    Edit
                </button>

            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <EditSongForm showModal={setShowModal} song={song}/>
                    </Modal>
                </>
            )}
        </>
    )

}

export default EditSongModal;
