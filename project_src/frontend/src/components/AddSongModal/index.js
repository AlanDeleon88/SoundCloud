import AddSongForm from "./AddSongForm";
import './AddSong.css'
import { Modal } from "../../context/Modal";
import { useState } from "react";

const AddSongModal = ({album}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="add-song-button" onClick={() => setShowModal(true)}>

                 <i className="fa fa-plus" aria-hidden="true"></i>

            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <AddSongForm showModal={setShowModal} album={album}/>
                    </Modal>
                </>
            )}
        </>
    )

}

export default AddSongModal;
