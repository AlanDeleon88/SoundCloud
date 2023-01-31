import DeleteSongModal from "../DeleteSongModal";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditSongModal from "../EditSongModal";
import ReactAudioPlayer from 'react-audio-player';

const SongDetail = ({song, album, artist}) => {


    const [mySong, setMySong] = useState(false);
    const currentUser = useSelector(state=>state.session.user);
    useEffect(() =>{
        if((song) && (currentUser)){
            // console.log('IM RUNNNING!!');
            if(song.userId === currentUser.id){

                setMySong(true);

            }
            else{
                setMySong(false);
            }
        }

    },[currentUser, song])

    return(
        <div className="song-detail-container">

            <div className="song-image-detail">

                <div className='song-text-detail'>

                        <div className="song-title">
                            <p> {song.title} </p>
                        </div>

                         <div className='song-detial-album-title'>
                           <div>{album.title} </div>
                        </div>
                        <div className="artist-username">
                            by: <NavLink to={`/${artist.id}/albums`}> {artist.username} </NavLink>
                        </div>
                 </div>

                <div className='image-div'>
                    <img src={`${song.previewImage}`} alt={`${song.previewImage}`}/>
                </div>

            </div>


            <div className="song-buttons-container">
                {mySong &&(

                    <div className="button-bundle">
                    {/*Render delete song modal here and pass songs into it*/}
                        {/* <button className='delete'>Delete</button> */}
                        {/*Render edit modal here. */}
                        <EditSongModal song={song} />
                        <DeleteSongModal song={song}/>
                    </div>

                )}
            </div>
            <div>
                    <ReactAudioPlayer src={song.url} controls/>
                    test
            </div>

        </div>
    )
}

export default SongDetail;
