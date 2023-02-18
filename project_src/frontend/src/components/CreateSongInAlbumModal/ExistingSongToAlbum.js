import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getUserSongs } from "../../store/songs"
import './CreateSongInAlbum.css'



const ExistingSongToAlbum = ({setSongId}) =>{
    const [isLoaded,setIsLoaded] = useState(false)
    const [selectedSong, setSelectedSong] = useState(0)
    const user = useSelector(state => state.session.user)
    const singles = Object.values(useSelector(state => state.songs)).filter(song =>{
        if(!song.albumId){
            return true
        }
    })
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getUserSongs(user.id)).then(res =>{
            setIsLoaded(true)
        })
    },[dispatch])


    return(
        <>
        <div className="create-song-album-sing-list">
            {isLoaded &&
                <>

                            { singles.map(song =>{
                                return(
                                    <>
                                        <div className={selectedSong === song.id ? 'create-song-album-single-container song-album-single-active' : "create-song-album-single-container"} onClick={() =>{
                                            if(!selectedSong){
                                                setSelectedSong(song.id)
                                                setSongId(song.id)
                                            }
                                            else{
                                                setSelectedSong(0)
                                                setSongId(0)
                                            }
                                        }}>
                                            <img src={song.previewImage} className='create-song-album-single-img'/>
                                            <div className="create-song-album-single-title">
                                                {song.title}
                                            </div>

                                        </div>

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

 export default ExistingSongToAlbum
