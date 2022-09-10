import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useParams, useRouteMatch, NavLink } from "react-router-dom";
import { getAlbum } from "../../store/currentAlbum";
import { getArtist } from "../../store/artist";

import AlbumSongsList from "../AlbumSongsList/AlbumSongsList";
import './SongAlbumList.css'
const SongAlbumList = () => {
    const params = useParams();
    const match = useRouteMatch();
    let {albumId, songId} = params;
    albumId = Number(albumId);
    songId = Number(songId);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSong, setCurrentSong] = useState('');
    const currentAlbum = useSelector(state=>state.currentAlbum);
    const currentArtist = useSelector(state=>state.artist);


    // console.log(Number(albumId), Number(songId));
    // console.log(albumId, songId);

    useEffect(() => {
        dispatch(getAlbum(albumId)).then((res) =>{
            console.log(res);
            setCurrentSong(res.songs[songId])
            setIsLoaded(true);
        })
        .catch(async(res) =>{
            const data = await res.json();
            const errors = data.errors;
            console.log(errors);
        })

        return () => {};
    }, [dispatch])

    // console.log(currentAlbum.Songs)

    // console.log('TESTTT', currentSong);
    return(
        <>
        <div className="song-header">
            <div className="song-title-header">

                {isLoaded ? (
                    <>
                        <div className='song-artist-header'>

                            <div className='song-title-main'>
                                {currentSong.title}

                            </div>

                            <div>
                                {currentSong.description}
                            </div>

                            <div className='song-artist-header'>
                               by: <NavLink to={`/${currentArtist.id}/albums`}> {currentArtist.username} </NavLink>

                            </div>

                        </div>

                    </>
                )
                :
                (
                    <>
                        Loading
                    </>
                )

            }
            </div>
            <div>
                <img className='song-img-header'src='https://i.imgur.com/Xglo6qf.jpg'/>
            </div>
        </div>

        <div className='album-song-list'>
            {isLoaded && (

                <AlbumSongsList album={currentAlbum.album}/>

            )}


        </div>

        </>
    )
}

export default SongAlbumList;
