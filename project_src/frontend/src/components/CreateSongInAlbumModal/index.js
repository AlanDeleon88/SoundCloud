import CreateSongInAlbumForm from "./CreateSongInAlbumForm";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import './CreateSongInAlbum.css'
import {FiPlusSquare} from 'react-icons/fi'


const CreateSongInAlbumModal = ({albumId}) =>{
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='create-song-album-button-container' onClick={() => setShowModal(true)}>
                <div className='song-list-add-icon'>
                    <FiPlusSquare />
                </div>
                <div>
                    Add song to album
                </div>
            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateSongInAlbumForm setShowModal={setShowModal} albumId={albumId}/>
                    </Modal>
                </>
            )}
        </>
    )

}

export default CreateSongInAlbumModal
