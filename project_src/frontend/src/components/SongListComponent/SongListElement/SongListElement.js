import './SongListElement.css'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setListTrack, pausePlayer } from '../../../store/musicPlayer'
import {IoSettingsSharp} from 'react-icons/io5'
import { Modal } from '../../../context/Modal'
import EditSongForm from '../../EditSongModal/EditSongForm'
import {FiPlusSquare} from 'react-icons/fi'
import { handleElementListClick } from '../../../utils/handleSongList'

const SongListElement = ({song, num, setCurrentSongIndex, img, album, playlist}) =>{
    const {is_playing, current_track} = useSelector(state => state.musicPlayer)
    const [showSettings, setShowSettings] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const current_user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()

    const handleSongClick = e =>{
        handleElementListClick(setCurrentSongIndex, num, dispatch, album, playlist)
        // let trackObj ={
        //     trackIndex : num -1
        // }
        // if(album){

        //     trackObj['tracks'] = album.Songs;

        //     dispatch(pausePlayer()).then(res =>{
        //         setCurrentSongIndex(trackObj.trackIndex)
        //         dispatch(setListTrack(trackObj))
        //     })

        // }
        // else{
        //     trackObj['tracks'] = playlist.Songs
        //     dispatch(pausePlayer()).then(res =>{
        //         setCurrentSongIndex(trackObj.trackIndex)
        //         dispatch(setListTrack(trackObj))
        //     })
        // }

    }

    return(
        <>
            <div className= {(current_track.id === song.id) ?'song-list-el-main-container song-active' : 'song-list-el-main-container'}  onMouseEnter={() =>{setShowSettings(true)}} onMouseLeave={() =>{setShowSettings(false)}} >
                <div className='song-list-el-bundle' onClick={handleSongClick}>
                    <div className='song-list-el-img-container'>
                        { album ?
                            (
                                <>
                                    <img src={img} className='song-list-el-img'/>
                                </>
                            )
                            :
                            (
                                <>
                                    <img src={song.Album? song.Album.previewImage : song.previewImage} className='song-list-el-img'/>
                                </>
                            )

                        }


                    </div>
                    <div className='song-list-el-num'>
                        {num}
                    </div>
                    <div className='song-list-el-title'>
                        {song.title}
                    </div>

                </div>
                <div className='song-list-hover-buttons'>
                    {
                        (current_user) && (current_user.id === song.userId) && showSettings &&

                        <div className='song-list-settings-button' onClick={() =>{setShowEditModal(true)}}>
                            <IoSettingsSharp />
                        </div>

                    }
                    {showSettings &&
                        <div className='song-list-add-playlist-button'>
                            <FiPlusSquare />
                        </div>
                    }

                </div>

            </div>
            { showEditModal &&
                <Modal onClose={() =>{setShowEditModal(false)}}>
                    <EditSongForm setShowEditModal={setShowEditModal} song={song}/>
                </Modal>

            }

        </>
    )

}

export default SongListElement
