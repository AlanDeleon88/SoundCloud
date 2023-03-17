import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUserPlaylistWithSong, addSongToPlaylist } from "../../../store/userPlaylist"
//TODO need to create thunk action for creating a playlist.

const CreateNewPlaylistComponent = ({song, user, setShowModal}) =>{
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const dispatch = useDispatch()

    const handleCreate = e =>{
        const playlistObj = {
            name: name,
            description: desc,
            userId: user.id

        }
        // console.log(playlistObj);
        dispatch(addUserPlaylistWithSong(playlistObj)).then(res =>{
            dispatch(addSongToPlaylist(res, song)).then(res =>{
                setShowModal(false)
            })
        })
        .catch(async (res) =>{
            if(res){
                const data = await res.json()
                const errors = data.errors

                if(data.errors && data){
                    setValidationErrors(errors)
                }

            }
        })
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
                { validationErrors &&
                    <>
                        {validationErrors.map(error =>{
                            return(
                                <div className='create-album-errors error'>
                                    {error}
                                </div>
                            )
                        })}
                    </>

                }
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
                            <div className="create-playlist-button mix-neb-button mix-neb-confirm" onClick={handleCreate}>
                                Create
                            </div>
                            <div className="create-playlist-button mix-neb-button mix-neb-cancel" onClick={handleCancel}>
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
