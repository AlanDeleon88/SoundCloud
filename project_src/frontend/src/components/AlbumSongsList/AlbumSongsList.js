import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadAlbumSongs } from "../../store/songs";
import { getArtist } from "../../store/artist";
import './AlbumSongsList.css'

const AlbumSongsList = ({album}) =>{
    const {id, userId, title} = album;
    const [isLoaded, setIsLoaded] = useState(false);
    let albumSongs = Object.values(useSelector(state=>state.songs));
    const artist = useSelector(state=>state.artist);
    const dispatch = useDispatch();
    //TODO add a back button to user's albums;
    useEffect(() =>{
        dispatch(loadAlbumSongs(id))
        .then(() => dispatch(getArtist(userId)))
        .then(()=>setIsLoaded(true));

    },[dispatch])

    // console.log(Object.values(albumSongs));
    // console.log(isLoaded);
    // console.log(artist);
    return(
        <>
            <h2>
                TESTING SONGS ROUTE.
            </h2>
            <div className='album-header'>
                <h1 className="album-title"> {title}</h1>
                <h2>by {artist.username} click this later to go to user info page with a link to all his albums later</h2>
            </div>
            <div className="album-songs-container">
                <table className="album-song-table">
                    <tbody>
                        {
                        isLoaded ? (
                            albumSongs.map(song =>{
                                return(
                                    <tr key={song.id} className='song-item'>
                                        <td>
                                            {song.title}
                                        </td>
                                    </tr>
                                )
                            })
                        ) : null
                    }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default AlbumSongsList;
