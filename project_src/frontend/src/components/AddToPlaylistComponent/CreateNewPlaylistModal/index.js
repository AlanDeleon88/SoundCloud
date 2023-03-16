import { Modal } from "../../../context/Modal"
import './CreateNewPlaylistComponent.css'
import CreateNewPlaylistComponent from "./CreateNewPlaylistComponent"
import { useState } from "react"
import {BiPlus} from 'react-icons/bi'

const CreateNewPlaylistModal = ({song, user}) =>{
    const [showModal, setShowModal] = useState(false)


    return(
        <>
                <div className='add-play-list-new-playlist-bundle' onClick={() =>{
                    setShowModal(true)
                }}>
                    <div>
                        <BiPlus className='add-playlist-font-plus-font'/>
                    </div>
                    <div className='add-playlist-new-playlist-button'>
                        Create new playlist
                    </div>
                </div>
                { showModal &&
                    <Modal onClose={()=>{
                        setShowModal(false)
                    }}>
                        <CreateNewPlaylistComponent song={song} user={user} setShowModal={setShowModal}/>
                    </Modal>
                }
        </>
    )

}

export default CreateNewPlaylistModal
