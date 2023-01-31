import './SongCard.css'
import { NavLink, Switch, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUrl } from '../../store/songUrl';
import { getAlbum } from '../../store/currentAlbum';

const SongCard = ({song}) => {
    const {title} = song;

    const dispatch= useDispatch()
    const handleClick = () => {
        // dispatch(getAlbum(song.albumId))
    }
    // console.log(match.url);
    return (
        <>
            <NavLink to={`/albums/${song.albumId}/songs/${song.id}`} className='song-card-link' onClick={handleClick}>

                <div className="song-card">
                    <div className="image-container">
                        <img className='song-img'src={song.previewImage} alt={`${song.previewImage}`}/>
                    </div>
                    <div className='song-title-card'>
                        {title}
                    </div>

                </div>

            </NavLink>

        </>
    )

}

export default SongCard;
