import { Modal } from "../../context/Modal";
import { useState } from "react";
import CreateAlbumForm from "./CreateAlbumForm";
import './CreateAlbum.css'

const CreateAlbumModal = ({album}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="create-album-modal-button" onClick={() => setShowModal(true)}>

                 Create a new Album

            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateAlbumForm setShowModal={setShowModal}/>
                    </Modal>
                </>
            )}
        </>
    )

}

export default CreateAlbumModal
