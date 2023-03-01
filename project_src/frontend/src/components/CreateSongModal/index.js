import CreateSongForm from "./CreateSongForm";
import { Modal } from "../../context/Modal";
import './CreateSong.css'
import { useState } from "react";

const CreateSongModal = () =>{
    const [showModal, setShowModal] = useState(false)

    return(
        <>
            <div className="create-song-button" onClick={()=>{setShowModal(true)}}>
                Upload a new song
            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateSongForm setShowModal={setShowModal}/>
                    </Modal>
                </>
            )}


        </>
    )

}

export default CreateSongModal
