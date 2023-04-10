import './SongListComponent.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import{FaPlay, FaPause} from 'react-icons/fa'
import SongListElement from './SongListElement'
import PlaylistImage from '../PlaylistImage'
import { pausePlayer, playPlayer, setListTrack } from '../../store/musicPlayer'
import {FiPlusSquare} from 'react-icons/fi'
import CreateSongInAlbumModal from '../CreateSongInAlbumModal'
import { Modal } from '../../context/Modal'
import CreateSongInAlbumForm from '../CreateSongInAlbumModal/CreateSongInAlbumForm'
import {BiEdit} from 'react-icons/bi'
import {IoSettingsSharp} from 'react-icons/io5'
import EditAlbumPlaylistForm from '../EditAlbumPlaylistModal'
import { handleBigPlayClick } from '../../utils/handleSongList'

const SongListComponent = ({album, playlist, username}) =>{
    const [currentSongIndex, setCurrentSongIndex] = useState(0) // set initial song index
    const [showAdd, setShowAdd] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const {is_playing, current_track} = useSelector(state => state.musicPlayer)
    const {Songs, userId} = album ? album : playlist
    const dispatch = useDispatch();
    const current_user = useSelector(state=>state.session.user)

    const handlePlayClick = e =>{
        handleBigPlayClick(currentSongIndex, setCurrentSongIndex, current_track, dispatch, album, playlist)
    //     if(!playlist) playlist = {}
    //     if(!album) album = {}
    //     // if( (album && !album.Songs.length < 1) || (playlist && playlist.Songs.length < 1)){
    //     //     return null
    //     //    }

    //     if(album.Songs){
    //         if(album.Songs.length < 1) return null
    //     }

    //     if(playlist.Songs){
    //         if(playlist.Songs.length < 1) return null;
    //     }

    //    let trackObj = {
    //         trackIndex : currentSongIndex,
    //         tracks : Songs
    //    }



    //     if(trackObj.trackIndex){
    //         if(current_track['playlistId'] !== playlist['id'] || (album['id'] !== current_track['albumId']))  {
    //             dispatch(pausePlayer()).then(res =>{
    //                 trackObj.trackIndex = 0;
    //                 dispatch(setListTrack(trackObj))
    //                 setCurrentSongIndex(0)
    //             })
    //         }
    //         else{
    //             dispatch(playPlayer())

    //         }

    //     }
    //     else{
    //         dispatch(pausePlayer()).then(res =>{
    //             dispatch(setListTrack(trackObj))
    //         })

    //     }

    }

    const handlePauseClick = e =>{
        dispatch(pausePlayer())
    }

    const mouseEnter = e =>{
        setShowAdd(true)
    }

    const mouseLeave = e =>{
        setShowAdd(false)
    }


    return(
        <>
            <div className='song-list-main-container'>
                <div className='song-list-img-container'>
                    { album ?
                        (
                            <>
                                <img src={album.previewImage} className='song-list-img'/>
                            </>
                        )
                        :
                        (
                            <>
                                <PlaylistImage songs={Songs}/>
                            </>
                        )

                    }


                </div>



                <div className='song-list-play-list-container' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                    <div className='song-list-control-title-container'>
                        <div className='song-list-control-container'>
                            { album ?
                                (
                                    <>
                                        { is_playing && (current_track.albumId === album.id) ?

                                            (
                                                <div className='song-list-pause' onClick={handlePauseClick}>
                                                    <FaPause />
                                                </div>
                                            )
                                            :
                                            (
                                                <div onClick={handlePlayClick}>
                                                    <FaPlay />
                                                </div>
                                            )

                                        }

                                    </>
                                )
                                :

                                (

                                    <>

                                        { is_playing && current_track.PlaylistSong && (current_track.PlaylistSong.playlistId === playlist.id) ?

                                            (
                                                <div className='song-list-pause' onClick={handlePauseClick}>
                                                    <FaPause />
                                                </div>
                                            )
                                            :
                                            (
                                                <div onClick={handlePlayClick}>
                                                    <FaPlay />
                                                </div>
                                            )

                                        }
                                    </>
                                )

                            }
                        </div>

                        <div className='song-list-title-artist-container'>
                            <div className='song-list-artist'>
                                {username}
                            </div>
                            <div className='song-list-title'>
                                { album ?
                                    (
                                        <>
                                            {album.title}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {playlist.name}
                                        </>
                                    )

                                }

                            </div>
                        </div>
                        <div>
                                {((album) && (current_user) && (current_user.id === userId)) && (showAdd) ?
                                    (
                                        <div className='song-list-edit' onClick={() =>{setShowEditModal(true)}}>
                                            <IoSettingsSharp/>

                                        </div>

                                    )
                                    :
                                    (
                                    <div className='song-list-edit-placeholder'>
                                        <IoSettingsSharp/>
                                    </div>
                                    )

                                }

                                {((playlist) && (current_user) && (current_user.id === userId)) && (showAdd) ?
                                    (

                                        <div className='song-list-edit' onClick={() =>{setShowEditModal(true)}}>
                                            <IoSettingsSharp/>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='song-list-edit-placeholder'>
                                            <IoSettingsSharp/>
                                        </div>
                                    )

                                }
                        </div>
                    </div>

                    <div className='song-list-song-element-container'>
                        { Songs.map((song, i) =>{
                                    return(
                                        <>
                                            { album ?
                                                (
                                                    <>
                                                        <SongListElement song={song} key={song.id} num={i+1} img={album.previewImage} album={album} setCurrentSongIndex={setCurrentSongIndex}/>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <SongListElement song={song} key={song.id} num={i+1} playlist={playlist} setCurrentSongIndex={setCurrentSongIndex}/>
                                                    </>
                                                )

                                            }


                                        </>
                                    )
                                })

                                }

                            {((album) && (current_user) && (current_user.id === userId)) && (showAdd) &&

                                <div className='song-list-add-song-container' onClick={() =>{setShowAddModal(true)}}>
                                    <div className='song-list-add-icon'>
                                        <FiPlusSquare />
                                    </div>
                                    <div>
                                        Add song to album
                                    </div>
                                </div>
                                // <CreateSongInAlbumModal />

                            }
                            { ((album) && (current_user) && (current_user.id === userId))  && (!showAdd) &&
                                <div className='song-list-add-song-container-placeholder'>
                                    <div className='song-list-add-icon'>
                                        <FiPlusSquare />
                                    </div>
                                    <div>
                                        Add song to album
                                    </div>
                                </div>
                            }

                    </div>


                </div>

                {showAddModal &&
                    <Modal onClose={() => setShowAddModal(false)}>
                        <CreateSongInAlbumForm album={album} setShowModal={setShowAddModal}/>
                    </Modal>

                }
                {(showEditModal && album) &&

                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditAlbumPlaylistForm album={album} setShowModal={setShowEditModal}/>
                    </Modal>
                }
                { showEditModal && playlist &&
                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditAlbumPlaylistForm playlist={playlist} setShowModal={setShowEditModal}/>
                    </Modal>

                }


            </div>

        </>
    )


}


export default SongListComponent
