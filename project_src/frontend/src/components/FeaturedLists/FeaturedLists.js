import { csrfFetch } from "../../store/csrf";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeaturedSongList from "../FeaturedSongList";
import { loadFeaturedAlbums } from '../../store/albums'
import { loadFeaturedPlaylists } from "../../store/userPlaylist";
import './FeaturedLists.css'

const FeaturedLists = ({album, playlist}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const albums = Object.values(useSelector(state => state.albums))
    const playlists = Object.values(useSelector(state => state.userPlaylists))
    const dispatch = useDispatch()

    useEffect(() =>{
        if(album){
            dispatch(loadFeaturedAlbums()).then(res =>{
            setIsLoaded(true)
            })
            // dispatch(loadFeaturedPlaylists()).then(res =>{
            //     setIsLoaded(true)
            // })
        }
        else{
            dispatch(loadFeaturedPlaylists()).then(res =>{
                setIsLoaded(true)
            })
        }

    },[dispatch])



    return(
        <>
            <div className="featured-albums-container">
                <div className="featured-albums-header">
                    { album ?
                        <>
                            Featured Albums
                        </>
                        :
                        <>
                            Featured Playlists
                        </>

                    }
                </div>
                {isLoaded &&


                        <>
                           {
                               album ?

                                        albums.map(el =>{
                                            return(
                                                <>
                                                    <FeaturedSongList album ={el} key={el.id}/>
                                                </>
                                            )
                                        })


                                :


                                        playlists.map(el =>{
                                            return(
                                                <>
                                                    <FeaturedSongList playlist ={el} key={el.id} />
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


export default FeaturedLists;
