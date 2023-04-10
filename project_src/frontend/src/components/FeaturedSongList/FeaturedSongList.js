import './FeaturedSongList.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pausePlayer, playPlayer, setListTrack } from '../../store/musicPlayer'
import { useHistory } from 'react-router-dom'
// import { FaPlay, FaPause } from 'react-icons/fa'
import PlaylistImage from '../PlaylistImage'
import CardPlayControls from '../CardPlayControls'
import FeaturedSongElement from './FeaturedSongElement'
import { handleBigPlayClick } from '../../utils/handleSongList'


const FeaturedSonglist = ({album, playlist}) =>{

    // const musicPlayer = useSelector(state=>state.musicPlayer)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const history = useHistory();
    const dispatch = useDispatch()
    const {current_track} = useSelector(state => state.musicPlayer)
    // console.log(playlist.Songs);

    const handlePauseClick = e =>{

        dispatch(pausePlayer())

    }

    const handlePlayClick = e =>{
        handleBigPlayClick(currentSongIndex, setCurrentSongIndex, current_track, dispatch, album, playlist)
    }

    return(
        <>
            <div className='featured-list-main-container'>
                <div className={album ? 'featured-list-container' : 'featured-playlist-container'}>
                    <div className='featured-list-img-song-list-container'>
                        <div className='featured-list-img-bundle'>
                            {album ?
                                <img src={album.previewImage} className='featured-list-img'/>
                            :
                                <div className='featured-playlist-img'>
                                    <PlaylistImage songs={playlist.Songs} forFeaturedList={true}/>

                                </div>
                            }
                            <CardPlayControls album={album} playlist={playlist} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>
                        </div>
                        <div className='featured-list-song-list'>
                            {

                                    album ? album.Songs.map((song, i) =>{
                                        return(
                                            <>
                                                <FeaturedSongElement song={song} num={i + 1} key={song.id} setCurrentSongIndex={setCurrentSongIndex} album={album}/>
                                            </>
                                        )
                                    })
                                    :
                                    playlist.Songs.map((song, i) =>{
                                        return(
                                            <>
                                                <FeaturedSongElement song={song} num ={i + 1} key={song.id} setCurrentSongIndex={setCurrentSongIndex} playlist={playlist}/>
                                            </>
                                        )
                                    })


                            }

                        </div>

                    </div>


                </div>
                <div className='featured-list-link'>
                    <div className='featured-list-user'>

                        <div className='featured-list-title-bundle'>
                            <div className='featured-list-title'>
                                { album ?
                                    <>
                                        {album.title}

                                    </>

                                    :
                                    <>
                                        {playlist.name}

                                    </>

                                }
                            </div>
                            <div style={{fontSize : '1.3vw'}}>
                                by:
                            </div>
                        </div>

                        <div className='featured-list-user-pic-bundle' onClick={() => history.push(`/${album ? album.Songs[0].User.username : playlist.User.username}/${album ? album.userId : playlist.userId}`)}>

                        <img  className='featured-list-user-picture' src={album ? album.Songs[0].User.profile_picture : playlist.User.profile_picture}/>
                            <div className='featured-list-username'>
                                {album ? album.Songs[0].User.username : playlist.User.username}
                            </div>
                        </div>

                    </div>
                    <div className='featured-list-link-button mix-neb-button mix-neb-confirm'>
                        {album ?
                        <>
                            Go to album
                        </>
                        :
                        <>
                            Go to playlist
                        </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedSonglist
