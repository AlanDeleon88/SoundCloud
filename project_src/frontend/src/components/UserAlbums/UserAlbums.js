import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadUserAlbums } from "../../store/albums";
import AlbumDetail from "../AlbumDetail";
import './UserAlbums.css'


const UserAlbums = ({id}) =>{ //? accepts user id from what ever is gonna render it, will check ids to see if albums belong to current user.
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const albums = useSelector(state=>state.albums);
    //const albums = useSelector(state=>state.albums);
    console.log('user', id);

    useEffect(()=>{
        dispatch(loadUserAlbums(id)).then(()=>setIsLoaded(true));
    },[dispatch])
    //! change thunk action to make fetch to /artists/id/albums

    return(
        <>
            {isLoaded &&
            (
            <div className='album-list'>
                <ul className='album-list-style'>

                    {
                        albums.map(album =>{
                            return(
                                <li key={album.id}>
                                    <AlbumDetail album={album}/>
                                </li>
                            )
                        })
                    }
                    </ul>

            </div>

            )}


        </>
    )
}

export default UserAlbums;
