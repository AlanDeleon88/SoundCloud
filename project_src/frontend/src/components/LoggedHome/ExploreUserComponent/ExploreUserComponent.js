import './ExploreUserComponent.css'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExploreArtists } from '../../../store/exploreArtists'
import ArtistListElement from '../ArtistListElement'
const ExploreUserComponent = () =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const exploreArtists = Object.values(useSelector(state=>state.exploreArtists))
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getExploreArtists()).then(res =>{
            setIsLoaded(true)
        })
        return () => setIsLoaded(false)
    },[dispatch])

    return(
        <div className='explore-user-container'>
            <div>
                Check out these Artists
            </div>
            {/* Artist list component will go here */}
            { isLoaded &&

                exploreArtists.map(el =>{
                    return(
                        <ArtistListElement artists={el} />
                    )
                })

            }
        </div>
    )

}

export default ExploreUserComponent
