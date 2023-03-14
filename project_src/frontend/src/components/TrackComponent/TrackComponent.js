import './TrackComponent.css'
import{FaPlay, FaPause} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTracks, pausePlayer } from '../../store/musicPlayer'
import {FiPlusSquare} from 'react-icons/fi'
import {IoSettingsSharp} from 'react-icons/io5'
import { Modal } from '../../context/Modal'
import EditSongForm from '../EditSongModal/EditSongForm'
import AddToPlaylistComponent from '../AddToPlaylistComponent'

const TrackComponent = ({song}) =>{
    const [play, setPlay] = useState(false)
    const dispatch = useDispatch();
    const [showButtons, setShowButtons] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddPlaylist, setShowAddPlaylist] = useState(false)
    const currentUser = useSelector(state=>state.session.user)
    const musicPlayer = useSelector(state=>state.musicPlayer)
    const {current_track, is_playing} = musicPlayer
    const albumCover = song.Album ? song.Album.previewImage : song.previewImage
    //use select currentplay store to compare to title / id to see if pause or play is rendered.
    //useEffect to dispatch to musicPlayer Store.
    // console.log(current_track);
    const handlePlay= e =>{
        dispatch(pausePlayer()).then(res =>{
            dispatch(setTracks([song]))
        })
    }
    const handlePause = e =>{
        dispatch(pausePlayer());
    }

    const onEnter = e =>{
        setShowButtons(true)
    }

    const onLeave = e =>{
        setShowButtons(false)
    }

    return(
        <>
            <div className="track-main-container" onMouseEnter={onEnter} onMouseLeave={onLeave}>

                <div className="track-img-container">
                    <img className="track-album-img" src={albumCover}/>
                </div>

                <div className="track-button-title-container">
                    <div className="track-button" id={play ? 'track-pause' : 'track-play'} >
                    {current_track && (current_track.id === song.id) && is_playing ?
                        (
                            <>
                                <div className='track-pause-button' onClick={handlePause}>

                                    <FaPause />

                                </div>

                            </>
                        )
                        :
                        (
                            <>
                                <div className='track-play-button' onClick={handlePlay}>
                                    <FaPlay />
                                </div>

                            </>
                        )

                    }

                </div>
                        <div className="track-title-container">
                            {/* {song.title} */}
                            <div className='track-artist'>
                                <div style={{'marginRight' : '10px'}}>
                                    { song.Album ?
                                        (
                                            <>
                                                Album: {song.Album.title}
                                            </>
                                        )
                                        :
                                        (
                                            <>

                                                {`single: ${song.title}` }
                                            </>
                                        )

                                    }


                                </div>
                                <div>
                                    By: {song.User.username}
                                </div>
                            </div>
                            <div className='track-title'>
                                {song.title}
                            </div>

                        </div>
                    </div>
                        <div className='edit-delete-container'>
                            {currentUser &&
                                <>

                                    {currentUser.id === song.User.id && showButtons &&
                                        <>
                                            <div className='track-ud track-u' onClick={() => {setShowEditModal(true)}}>
                                                <IoSettingsSharp />
                                            </div>
                                        </>

                                    }

                                </>
                                    }
                            { showButtons && currentUser &&
                                <div className='track-comp-add-to-playlist' onClick={() =>{setShowAddPlaylist(true)}}>
                                    <FiPlusSquare />
                                </div>

                            }

                    </div>

                    {showEditModal &&
                        <Modal onClose={() => {setShowEditModal(false)}}>
                            <EditSongForm song={song} setShowEditModal={setShowEditModal}/>
                        </Modal>
                    }

                    { showAddPlaylist &&

                        <Modal onClose={() =>
                            {
                            setShowAddPlaylist(false)
                            setShowButtons(false)
                        }
                        }>
                            <AddToPlaylistComponent user={currentUser} song={song}/>
                        </Modal>

                  }


            </div>


        </>
    )

}

export default TrackComponent
