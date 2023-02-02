import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadAlbumSongs } from "../../store/songs";
import { getArtist } from "../../store/artist";
import AddSongModal from "../AddSongModal";
import SongDetailModal from "../SongDetailModal";
import './AlbumSongsList.css'
import { loadUserAlbums } from "../../store/albums";

const AlbumSongsList = ({album}) =>{
    const {id, userId, title, description} = album;

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
        .then(() => setIsLoaded(true));

    },[dispatch, id, userId])

    useEffect(() =>{
        if(currentUser){
            console.log('HEY IM BEING CALLED');
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
            <h1 className="album-title">Album: {title}</h1>
            <img className='album-img'src='https://i.imgur.com/NVTyWnX.png'/>
            <p className='album-desc'>{description}</p>
            <NavLink to={`/${artist.id}/albums`}> <h2 className='artist-header'>by: {artist.username}</h2> </NavLink>
        </div>
        <div className="album-songs-container">
            { /*might have to render songs in the modal componenent instead of here. i should make a new branch for this feature.*/}
            <table className="album-song-table">
                <tbody>
                        <tr>
                            <td>
                                Songs
                            </td>
                        </tr>
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
            {myAlbum && isLoaded && (
                    <>
                        <AddSongModal album={album}/>
                            <div>
                                Add Song
                            </div>
                    </>
            )}


        </>
    )
}

export default AlbumSongsList;
