import { csrfFetch } from "../../store/csrf";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeaturedSongList from "../FeaturedSongList";
import { loadFeaturedAlbums } from '../../store/albums'
import './FeaturedAlbums.css'

const FeaturedAlbums = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const albums = Object.values(useSelector(state => state.albums))
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(loadFeaturedAlbums()).then(res =>{
            setIsLoaded(true)
        })
    },[dispatch])



    return(
        <>
            <div className="featured-albums-container">
                <div className="featured-albums-header">
                    Featured Albums
                </div>
                {isLoaded &&
                    albums.map(el =>{
                        return(
                            <>
                                <FeaturedSongList album ={el} key={el.id}/>
                            </>
                        )
                    })

                }

            </div>
        </>
    )
}


export default FeaturedAlbums;
