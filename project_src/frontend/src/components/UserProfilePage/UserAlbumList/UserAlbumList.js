import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadUserAlbums } from "../../../store/albums"
import SongListComponent from "../../SongListComponent/SongListComponent"
import './UserAlbumList.css'
import CreateAlbumModal from "../../CreateAlbumModal"


const UserAlbumList = ({userId,username}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums))
    const current_user = useSelector(state=>state.session.user)


    useEffect(() =>{
        dispatch(loadUserAlbums(userId)).then((res) =>{
            setIsLoaded(true)
        })
    },[dispatch,userId])



    return(
        <>
            <div className="album-list-main-container">
                <div>
                    {
                        current_user && current_user.id === userId &&
                        <CreateAlbumModal />
                    }
                </div>

                    { isLoaded &&
                            <>

                                { albums.length > 0 ?
                                    (
                                        <>
                                            {
                                                albums.map((album) =>{
                                                    return(
                                                    <>
                                                        <SongListComponent album={album} username={username}/>
                                                    </>
                                                    )
                                                    })
                                            }

                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <div className="album-list-placeholder">
                                                <div>
                                                    Looks like there are no albums to be found D=
                                                </div>
                                            { (current_user && current_user.id === userId) &&
                                                <div className="album-list-new-container">
                                                    <div>
                                                        lets fix that
                                                    </div>
                                                </div>
                                            }
                                            </div>
                                        </>
                                    )
                                }
                            </>



                    }


            </div>
        </>
    )
}

export default UserAlbumList
