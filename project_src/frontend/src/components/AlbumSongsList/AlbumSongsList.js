import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadAlbumSongs } from "../../store/songs";
import { getArtist } from "../../store/artist";
import AddSongModal from "../AddSongModal";
import SongDetailModal from "../SongDetailModal";
import './AlbumSongsList.css'

const AlbumSongsList = ({album}) =>{
    const {id, userId, title} = album;
    const [isLoaded, setIsLoaded] = useState(false);
    const [myAlbum, setMyAlbum] = useState(false);

    let albumSongs = Object.values(useSelector(state=>state.songs));
    const artist = useSelector(state=>state.artist);
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    //TODO add a back button to user's albums;
    //TODO add functionality for adding / deleting songs bonus for updating songs.
    useEffect(() =>{
        dispatch(loadAlbumSongs(id))
        .then(() => dispatch(getArtist(userId)))
        .then(()=>setIsLoaded(true));

    },[dispatch, id, userId])

    useEffect(() =>{
        if(currentUser){
            if(userId === currentUser.id){
                setMyAlbum(true);
            }
            else{
                setMyAlbum(false);
            }
        }
    },[userId, currentUser])

    // console.log(Object.values(albumSongs));
    // console.log(isLoaded);
    // console.log(artist);
    return(
        <>
        {!isLoaded ? (
            <h1>Loading</h1>
        )
        :

        (
        <>
            <div className='album-header'>
            <h1 className="album-title"> {title}</h1>
            <h2>by {artist.username} click this later to go to user info page with a link to all his albums later</h2>
        </div>
        <div className="album-songs-container">
            { /*might have to render songs in the modal componenent instead of here. i should make a new branch for this feature.*/}
            <table className="album-song-table">
                <tbody>
                    {
                    isLoaded ? (
                        albumSongs.map(song =>{
                            return(
                                <tr key={song.id} className='song-item'>
                                    <td>
                                        <SongDetailModal song={song} album={album} artist={artist}/>
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

        )}
            {myAlbum && (

                    <AddSongModal album={album}/>

            )}


        </>
    )
}

export default AlbumSongsList;
