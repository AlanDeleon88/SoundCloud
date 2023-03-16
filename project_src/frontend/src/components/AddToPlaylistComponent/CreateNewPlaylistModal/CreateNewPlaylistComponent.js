import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUserPlaylistWithSong } from "../../../store/userPlaylist"
//TODO need to create thunk action for creating a playlist.

const CreateNewPlaylistComponent = ({song, user, setShowModal}) =>{
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch()

    const handleCreate = e =>{

    }

    const handleCancel = e =>{
        setShowModal(false)
    }

    return(
        <>
            <div className="create-playlist-container mix-neb-modal">
                <div className="create-playlist-header">
                    Create a new playlist
                </div>
                <div className="create-playlist-form-container">
                    <div className="create-playlist-from-bundle">
                        <label className="create-playlist-form-label">
                            Name
                        </label>
                        <input className="create-playlist-input mix-neb-input" type='text' value={name} onChange={(e) =>{setName(e.target.value)}}/>
                    </div>
                    <div className="create-playlist-from-bundle">
                    <label className="create-playlist-form-label">
                            Description
                        </label>
                        <input className="create-playlist-input mix-neb-input" type='text' value={desc} onChange={(e) =>{setDesc(e.target.value)}}/>
                    </div>
                </div>
                <div className="create-playlist-button-background mix-neb-button-background">
                    <div className="create-playlist-button-container">
                        <div className="create-playlist-button-bundle">
                            <div className="create-playlist-button mix-neb-button mix-neb-confirm">
                                Create
                            </div>
                            <div className="create-playlist-button mix-neb-button mix-neb-cancel">
                                Cancel
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default CreateNewPlaylistComponent
