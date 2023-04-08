import './FeaturedSongList.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FaPlay, FaPause } from 'react-icons/fa'
import CardPlayControls from '../CardPlayControls'
import FeaturedSongElement from './FeaturedSongElement'


const FeaturedSonglist = ({album, playlist}) =>{

    // const musicPlayer = useSelector(state=>state.musicPlayer)
    const history = useHistory();

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
                    <div className='featured-list-user'>

                        <div className='featured-list-title-bundle'>
                            <div className='featured-list-title'>
                                {album.title}
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
