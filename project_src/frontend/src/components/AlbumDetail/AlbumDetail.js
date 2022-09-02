import './AlbumDetail.css'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AlbumDetail = ({album}) => {
    const {title, id, previewImage, userId} = album;
    const [showSongs, setShowSongs] = useState(false);
    //TODO get songs state after we dispatch for get album songs.

    //TODO when you click on the element change the icon arrow to an arrow pointing down.
    //TODO when a user clicks on the album a drop down of its songs will render.
    const handleAlbumClick = (e) =>{

        setShowSongs(!showSongs);
    }
    console.log(showSongs);
    return(
        <>
            <div className="album-container" onClick={handleAlbumClick}>
                <div className='chevron'>
                    {showSongs ? <i class="fas fa-chevron-down"></i> : <i className="fas fa-chevron-right"></i>}


                </div>
                <div className='album-title'>
                    {title}
                </div>
                <div className='edit-album'>
                    Edit
                </div>
            </div>
            {showSongs && (
                            <div className='songs-container'>
                            <ul className='songs-list'>
                                <li>
                                    place holder song.
                                </li>
                                <li>
                                    place holder song.
                                </li>
                                <li>
                                    place holder song.
                                </li>

                            </ul>
                    </div>
                        )}


        </>
    )

}

export default AlbumDetail;
