import DeleteSongModal from "../DeleteSongModal";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUrl } from "../../store/songUrl";
import { getAlbum } from "../../store/currentAlbum";

const SongDetail = ({song, album, artist}) => {
    //TODO add song details
    //TODO add a placeholder for song image
    //TODO add buttons to delete and edit song.
    const dispatch = useDispatch();

    const handleAlbumClick = () =>{
        // dispatch(setUrl({
        //     songId: song.id,
        //     albumId: album.id
        // }))
        // dispatch(getAlbum(album.id));
    }

    return(
        <div className="song-detail-container">

            <div className="song-image-detail">

                <div className='song-text-detail'>

                        <div className="song-title">
                            <p> {song.title} </p>
                        </div>

                         <div className='song-detial-album-title'>
                           <div onClick={handleAlbumClick}>{album.title} </div>
                        </div>
                        <div className="artist-username">
                            by: {artist.username}
                        </div>
                 </div>

                <div className='image-div'>
                    preview image place holder
                </div>

            </div>


            <div className="song-buttons-container">
                <div className="button-bundle">
                   {/*Render delete song modal here and pass songs into it*/}
                    {/* <button className='delete'>Delete</button> */}
                    {/*Render edit modal here. */}
                    <button className='edit'>Edit</button>
                    <DeleteSongModal song={song}/>
                </div>
            </div>

        </div>
    )
}

export default SongDetail;
