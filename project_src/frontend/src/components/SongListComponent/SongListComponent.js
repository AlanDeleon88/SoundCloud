import './SongListComponent.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import{FaPlay, FaPause} from 'react-icons/fa'
import SongListElement from './SongListElement'
import PlaylistImage from '../PlaylistImage'
import { pausePlayer, playPlayer } from '../../store/musicPlayer'
import { setListTrack } from '../../store/musicPlayer'
import {FiPlusSquare} from 'react-icons/fi'

const SongListComponent = ({album, playlist, username}) =>{
    const [currentSongIndex, setCurrentSongIndex] = useState(0) // set initial song index
    const {is_playing, current_track} = useSelector(state => state.musicPlayer)
    const {Songs, userId} = album ? album : playlist
    const dispatch = useDispatch();
    const current_user = useSelector(state=>state.session.user)

    const handlePlayClick = e =>{
        /*
            let trackObj ={
            trackIndex : num -1
            tracks : []
        }
        */
        if(!playlist) playlist = {}
        if(!album) album = {}

       let trackObj = {
            trackIndex : currentSongIndex,
            tracks : Songs
       }
        if(trackObj.trackIndex){
            if(current_track['playlistId'] !== playlist['id'] || (album['id'] !== current_track['albumId']))  {
                dispatch(pausePlayer()).then(res =>{
                    trackObj.trackIndex = 0;
                    dispatch(setListTrack(trackObj))
                    setCurrentSongIndex(0)
                })
            }
            else{
                dispatch(playPlayer())

            }

        }
        else{
            dispatch(pausePlayer()).then(res =>{
                dispatch(setListTrack(trackObj))
            })

        }

    }

    const handlePauseClick = e =>{
        dispatch(pausePlayer())
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



                <div className='song-list-play-list-container'>
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

                            {((album) && (current_user) && (current_user.id === userId)) &&

                                <div className='song-list-add-song-container'>
                                    <div className='song-list-add-icon'>
                                        <FiPlusSquare />
                                    </div>
                                    Add song to play list
                                </div>

                            }
                            { ((playlist) && (current_user) && (current_user.id === userId)) &&
                                <div className='song-list-add-song-container'>
                                    play list test
                                </div>
                            }

                    </div>


                </div>


            </div>

        </>
    )


}


export default SongListComponent
