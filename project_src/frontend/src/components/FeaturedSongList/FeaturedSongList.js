import './FeaturedSongList.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlay, FaPause } from 'react-icons/fa'
import CardPlayControls from '../CardPlayControls'
import FeaturedSongElement from './FeaturedSongElement'


const FeaturedSonglist = ({album, playlist}) =>{

    const musicPlayer = useSelector(state=>state.musicPlayer)

    const handlePauseClick = e =>{

    }

    const handlePlayClick = e =>{

    }

    return(
        <>
            <div className='featured-list-main-container'>
                <div className='featured-list-container'>
                    <div className='featured-list-img-song-list-container'>
                        <div className='featured-list-img-bundle'>
                            <img src={album.previewImage} className='featured-list-img'/>
                            <CardPlayControls album={album} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>
                        </div>
                        <div className='featured-list-song-list'>
                            {

                                    album ? album.Songs.map((song, i) =>{
                                        return(
                                            <>
                                                <FeaturedSongElement song={song} i={i} />
                                            </>
                                        )
                                    })
                                    :
                                    playlist.Songs.map(song =>{
                                        return(
                                            <>

                                            </>
                                        )
                                    })


                            }

                        </div>

                    </div>


                </div>
                <div className='featured-list-link'>
                    <div className='featured-list-link-button mix-neb-button mix-neb-confirm'>
                        go to playlist
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedSonglist
