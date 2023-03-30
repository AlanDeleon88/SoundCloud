import './FeaturedSongList.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlay, FaPause } from 'react-icons/fa'


const FeaturedSonglist = ({album, playlist}) =>{

    const musicPlayer = useSelector(state=>state.musicPlayer)

    const handlePauseClick = e =>{

    }

    const handlePlayClick = e =>{

    }

    return(
        <>
            <div className='featured-list-container'>
                <div className='featured-list-img-songs-bundle'>
                    <img src={album.previewImage} className='featured-list-img'/>

                    <div className='featured-list-pause-play'>

                        { (musicPlayer.current_track.albumId === album.id) && musicPlayer.is_playing ?
                            (
                                <>
                                    <div className='featured-list-pause-background featured-list-control' onClick={handlePauseClick}>
                                        <div className='featured-list-pause'>
                                            <FaPause />
                                        </div>
                                    </div>

                                </>
                            )
                            :
                            (
                                <>
                                <div className='featured-list-play-background featured-list-control' onClick={handlePlayClick}>
                                    <div className='featured-list-play'>
                                        <FaPlay />
                                    </div>
                                </div>

                                </>
                            )

                        }

                    </div>


                </div>

            </div>
        </>
    )
}

export default FeaturedSonglist
