import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadUserAlbums } from "../../../store/albums"
import SongListComponent from "../../SongListComponent/SongListComponent"


const UserAlbumList = ({userId,username}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums))

    useEffect(() =>{
        dispatch(loadUserAlbums(userId)).then((res) =>{
            setIsLoaded(true)
        })
    },[dispatch])



    return(
        <>
            <div className="album-list-main-container">

                    { isLoaded &&
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

                    }


            </div>
        </>
    )
}

export default UserAlbumList
